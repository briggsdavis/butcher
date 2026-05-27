import slugify from "@sindresorhus/slugify"
import { Infer, v } from "convex/values"
import type { Id } from "./_generated/dataModel"
import {
  mutation,
  query,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server"
import { assertAdmin } from "./auth"
import { menuKind } from "./schema"

type Kind = Infer<typeof menuKind>

const CATEGORY_ORDER: Record<Kind, string[]> = {
  food: ["Starters", "Entrees", "Sides", "Desserts"],
  spirit: ["Whiskey", "Gin", "Rum & Mezcal", "Cognac & Armagnac"],
  beverage: ["Cocktails", "Red Wine", "White & Sparkling", "Non-Alcoholic"],
}

function categoryRank(kind: Kind, category: string) {
  const order = CATEGORY_ORDER[kind]
  const idx = order.indexOf(category)
  // Unknown categories sort after the known ones, alphabetically.
  return idx === -1 ? order.length + category.charCodeAt(0) / 1000 : idx
}

async function uniqueSlug(
  ctx: QueryCtx,
  kind: Kind,
  name: string,
  ignoreId?: string,
) {
  const base = slugify(name)
  let slug = base
  let n = 2
  while (true) {
    const existing = await ctx.db
      .query("menuItems")
      .withIndex("by_kind_and_slug", (q) => q.eq("kind", kind).eq("slug", slug))
      .unique()
    if (!existing || existing._id === ignoreId) return slug
    slug = `${base}-${n++}`
  }
}

async function withImageUrl<T extends { imageId?: string }>(
  ctx: QueryCtx,
  doc: T,
) {
  const { imageId, ...rest } = doc
  const imageUrl = imageId ? await ctx.storage.getUrl(imageId as never) : null
  return { ...rest, imageId, imageUrl }
}

export const list = query({
  args: { kind: menuKind, includeHidden: v.optional(v.boolean()) },
  handler: async (ctx, { kind, includeHidden }) => {
    if (includeHidden) await assertAdmin(ctx)
    const all = await ctx.db
      .query("menuItems")
      .withIndex("by_kind", (q) => q.eq("kind", kind))
      .take(500)
    const items = includeHidden ? all : all.filter((i) => !i.hidden)
    items.sort((a, b) => {
      const ra = categoryRank(kind, a.category)
      const rb = categoryRank(kind, b.category)
      if (ra !== rb) return ra - rb
      if (a.category !== b.category) return a.category.localeCompare(b.category)
      return a.sortOrder - b.sortOrder
    })
    return await Promise.all(items.map((it) => withImageUrl(ctx, it)))
  },
})

export const listCategories = query({
  args: { kind: menuKind },
  handler: async (ctx, { kind }) => {
    const items = await ctx.db
      .query("menuItems")
      .withIndex("by_kind", (q) => q.eq("kind", kind))
      .take(500)
    const seen = new Set<string>()
    for (const it of items) if (!it.hidden) seen.add(it.category)
    return [...seen].sort(
      (a, b) => categoryRank(kind, a) - categoryRank(kind, b),
    )
  },
})

export const getBySlug = query({
  args: { kind: menuKind, slug: v.string() },
  handler: async (ctx, { kind, slug }) => {
    const item = await ctx.db
      .query("menuItems")
      .withIndex("by_kind_and_slug", (q) => q.eq("kind", kind).eq("slug", slug))
      .unique()
    if (!item || item.hidden) return null
    return await withImageUrl(ctx, item)
  },
})

export const setHidden = mutation({
  args: { id: v.id("menuItems"), hidden: v.boolean() },
  handler: async (ctx, { id, hidden }) => {
    await assertAdmin(ctx)
    await ctx.db.patch(id, { hidden })
  },
})

export const listComments = query({
  args: { itemId: v.id("menuItems") },
  handler: async (ctx, { itemId }) => {
    return await ctx.db
      .query("menuComments")
      .withIndex("by_item", (q) => q.eq("itemId", itemId))
      .order("desc")
      .take(200)
  },
})

export const addComment = mutation({
  args: {
    itemId: v.id("menuItems"),
    name: v.string(),
    body: v.string(),
  },
  handler: async (ctx, { itemId, name, body }) => {
    const trimmedName = name.trim().slice(0, 60)
    const trimmedBody = body.trim().slice(0, 2000)
    if (!trimmedName || !trimmedBody) {
      throw new Error("Name and body are required.")
    }
    const item = await ctx.db.get(itemId)
    if (!item) throw new Error("Item not found.")
    return await ctx.db.insert("menuComments", {
      itemId,
      name: trimmedName,
      body: trimmedBody,
    })
  },
})

export const toggleLike = mutation({
  args: { itemId: v.id("menuItems"), liked: v.boolean() },
  handler: async (ctx, { itemId, liked }) => {
    const item = await ctx.db.get(itemId)
    if (!item) throw new Error("Item not found.")
    const next = liked ? item.likes + 1 : Math.max(0, item.likes - 1)
    await ctx.db.patch(itemId, { likes: next })
    return next
  },
})

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx)
    return await ctx.storage.generateUploadUrl()
  },
})

async function deleteImageIfPresent(
  ctx: MutationCtx,
  imageId: string | undefined,
) {
  if (!imageId) return
  try {
    await ctx.storage.delete(imageId as never)
  } catch {}
}

export const create = mutation({
  args: {
    kind: menuKind,
    name: v.string(),
    description: v.string(),
    price: v.string(),
    category: v.string(),
    imageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx)
    const name = args.name.trim()
    if (!name) throw new Error("Name is required.")
    const category = args.category.trim()
    if (!category) throw new Error("Category is required.")
    const slug = await uniqueSlug(ctx, args.kind, name)
    const last = await ctx.db
      .query("menuItems")
      .withIndex("by_kind_and_category_and_sortOrder", (q) =>
        q.eq("kind", args.kind).eq("category", category),
      )
      .order("desc")
      .take(1)
    const sortOrder = (last[0]?.sortOrder ?? 0) + 10
    return await ctx.db.insert("menuItems", {
      kind: args.kind,
      name,
      slug,
      description: args.description.trim(),
      price: args.price.trim(),
      category,
      likes: 0,
      sortOrder,
      imageId: args.imageId,
    })
  },
})

export const update = mutation({
  args: {
    id: v.id("menuItems"),
    name: v.string(),
    description: v.string(),
    price: v.string(),
    category: v.string(),
    imageUpdate: v.optional(
      v.union(v.null(), v.object({ imageId: v.id("_storage") })),
    ),
  },
  handler: async (
    ctx,
    { id, name, description, price, category, imageUpdate },
  ) => {
    await assertAdmin(ctx)
    const trimmedName = name.trim()
    if (!trimmedName) throw new Error("Name is required.")
    const trimmedCategory = category.trim()
    if (!trimmedCategory) throw new Error("Category is required.")
    const existing = await ctx.db.get(id)
    if (!existing) throw new Error("Item not found.")
    const slug =
      existing.name === trimmedName
        ? existing.slug
        : await uniqueSlug(ctx, existing.kind, trimmedName, id)

    const patch: {
      name: string
      slug: string
      description: string
      price: string
      category: string
      imageId?: typeof existing.imageId
    } = {
      name: trimmedName,
      slug,
      description: description.trim(),
      price: price.trim(),
      category: trimmedCategory,
    }

    if (imageUpdate !== undefined) {
      if (existing.imageId) {
        await deleteImageIfPresent(ctx, existing.imageId)
      }
      patch.imageId = imageUpdate === null ? undefined : imageUpdate.imageId
    }

    await ctx.db.patch(id, patch)
  },
})

export const remove = mutation({
  args: { id: v.id("menuItems") },
  handler: async (ctx, { id }) => {
    await assertAdmin(ctx)
    const item = await ctx.db.get(id)
    if (!item) return
    const comments = await ctx.db
      .query("menuComments")
      .withIndex("by_item", (q) => q.eq("itemId", id))
      .take(500)
    for (const c of comments) await ctx.db.delete(c._id)
    await deleteImageIfPresent(ctx, item.imageId)
    await ctx.db.delete(id)
  },
})

export const setImage = mutation({
  args: { id: v.id("menuItems"), imageId: v.id("_storage") },
  handler: async (ctx, { id, imageId }) => {
    await assertAdmin(ctx)
    const existing = await ctx.db.get(id)
    if (!existing) throw new Error("Item not found.")
    if (existing.imageId) await deleteImageIfPresent(ctx, existing.imageId)
    await ctx.db.patch(id, { imageId })
  },
})

type SeedItem = {
  name: string
  description: string
  price: string
  category: string
}

const FOOD_SEED: SeedItem[] = [
  {
    name: "Bone Marrow",
    description: "Roasted split bones, gremolata, grilled sourdough",
    price: "18",
    category: "Starters",
  },
  {
    name: "Beef Tartare",
    description: "Hand-cut tenderloin, cured egg yolk, capers, mustard seed",
    price: "22",
    category: "Starters",
  },
  {
    name: "Charred Octopus",
    description: "Romesco, fingerling potatoes, chorizo vinaigrette",
    price: "24",
    category: "Starters",
  },
  {
    name: "Burrata",
    description: "Heirloom tomato, basil oil, aged balsamic, grilled bread",
    price: "16",
    category: "Starters",
  },
  {
    name: "Oysters on the Half Shell",
    description: "Half dozen, mignonette, cocktail sauce, fresh horseradish",
    price: "21",
    category: "Starters",
  },
  {
    name: "Bone-In Ribeye",
    description: "Dry-aged 45 days, roasted marrow butter",
    price: "68",
    category: "Entrees",
  },
  {
    name: "Braised Short Rib",
    description: "Red wine reduction, root vegetables, horseradish gremolata",
    price: "42",
    category: "Entrees",
  },
  {
    name: "Pan-Seared Duck Breast",
    description: "Cherry gastrique, wild rice, charred broccolini",
    price: "38",
    category: "Entrees",
  },
  {
    name: "Grilled Lamb Chops",
    description: "Herb crust, mint chimichurri, fingerling potatoes",
    price: "54",
    category: "Entrees",
  },
  {
    name: "Berkshire Pork Chop",
    description: "Brined and grilled, apple mostarda, braised greens",
    price: "36",
    category: "Entrees",
  },
  {
    name: "Seared Scallops",
    description: "Cauliflower purée, brown butter, crispy capers, pancetta",
    price: "44",
    category: "Entrees",
  },
  {
    name: "Whole Branzino",
    description: "Wood-grilled, lemon, herbs, olive oil, roasted fennel",
    price: "40",
    category: "Entrees",
  },
  {
    name: "Truffle Fries",
    description: "Parmesan, chive, black truffle",
    price: "12",
    category: "Sides",
  },
  {
    name: "Creamed Spinach",
    description: "Slow-stewed, nutmeg, cream",
    price: "10",
    category: "Sides",
  },
  {
    name: "Roasted Bone Marrow Mashed Potatoes",
    description: "Yukon gold, marrow butter, sea salt",
    price: "14",
    category: "Sides",
  },
  {
    name: "Charred Broccolini",
    description: "Lemon, chili, garlic",
    price: "11",
    category: "Sides",
  },
  {
    name: "Brussels Sprouts",
    description: "Bacon, balsamic glaze",
    price: "12",
    category: "Sides",
  },
  {
    name: "Mac & Cheese",
    description: "Gruyère, white cheddar, breadcrumb crust",
    price: "13",
    category: "Sides",
  },
  {
    name: "Bourbon Crème Brûlée",
    description: "Woodford Reserve custard, torched sugar, shortbread",
    price: "14",
    category: "Desserts",
  },
  {
    name: "Chocolate Torte",
    description: "Flourless, espresso crème, candied hazelnuts",
    price: "15",
    category: "Desserts",
  },
  {
    name: "Bread Pudding",
    description: "Brioche, salted caramel, vanilla bean ice cream",
    price: "13",
    category: "Desserts",
  },
]

const SPIRIT_SEED: SeedItem[] = [
  {
    name: "Pappy Van Winkle 15yr",
    description: "Buffalo, Kentucky",
    price: "65",
    category: "Whiskey",
  },
  {
    name: "Blanton's Original",
    description: "Buffalo Trace, Kentucky",
    price: "22",
    category: "Whiskey",
  },
  {
    name: "Hibiki 17yr",
    description: "Suntory, Japan",
    price: "38",
    category: "Whiskey",
  },
  {
    name: "Ardbeg 10yr",
    description: "Islay, Scotland",
    price: "18",
    category: "Whiskey",
  },
  {
    name: "Buffalo Trace",
    description: "Buffalo Trace, Kentucky",
    price: "12",
    category: "Whiskey",
  },
  { name: "Hendrick's", description: "Scotland", price: "14", category: "Gin" },
  {
    name: "The Botanist",
    description: "Islay, Scotland",
    price: "16",
    category: "Gin",
  },
  {
    name: "Monkey 47",
    description: "Black Forest, Germany",
    price: "18",
    category: "Gin",
  },
  {
    name: "Diplomatico Reserva Exclusiva",
    description: "Venezuela, 12yr",
    price: "16",
    category: "Rum & Mezcal",
  },
  {
    name: "El Silencio Espadin",
    description: "Oaxaca, Mexico",
    price: "13",
    category: "Rum & Mezcal",
  },
  {
    name: "Banhez Ensemble",
    description: "Oaxaca, Mexico",
    price: "15",
    category: "Rum & Mezcal",
  },
  {
    name: "Rémy Martin VSOP",
    description: "Cognac, France",
    price: "18",
    category: "Cognac & Armagnac",
  },
  {
    name: "Château de Laubade XO",
    description: "Armagnac, France",
    price: "28",
    category: "Cognac & Armagnac",
  },
]

const BEVERAGE_SEED: SeedItem[] = [
  {
    name: "Old Fashioned",
    description: "Bourbon, demerara, Angostura, orange",
    price: "16",
    category: "Cocktails",
  },
  {
    name: "Rye Negroni",
    description: "Rye, Campari, sweet vermouth, expressed orange",
    price: "15",
    category: "Cocktails",
  },
  {
    name: "Smoked Manhattan",
    description: "Bulleit Rye, Carpano Antica, cherry bitters",
    price: "18",
    category: "Cocktails",
  },
  {
    name: "Paper Plane",
    description: "Bourbon, Aperol, Amaro Nonino, lemon",
    price: "16",
    category: "Cocktails",
  },
  {
    name: "Butcher's Mule",
    description: "Vodka, ginger beer, lime, house bitters",
    price: "13",
    category: "Cocktails",
  },
  {
    name: "Seasonal Spritz",
    description: "Ask your server for today's selection",
    price: "14",
    category: "Cocktails",
  },
  {
    name: "Caymus Cabernet Sauvignon",
    description: "Napa Valley, 2021",
    price: "24",
    category: "Red Wine",
  },
  {
    name: "Château Pichon Baron",
    description: "Pauillac, Bordeaux, 2018",
    price: "38",
    category: "Red Wine",
  },
  {
    name: "Meiomi Pinot Noir",
    description: "California, 2022",
    price: "15",
    category: "Red Wine",
  },
  {
    name: "Rombauer Chardonnay",
    description: "Carneros, Napa, 2022",
    price: "18",
    category: "White & Sparkling",
  },
  {
    name: "Whispering Angel Rosé",
    description: "Provence, France, 2023",
    price: "16",
    category: "White & Sparkling",
  },
  {
    name: "Ruinart Blanc de Blancs",
    description: "Champagne, France, NV",
    price: "32",
    category: "White & Sparkling",
  },
  {
    name: "House Lemonade",
    description: "Fresh-squeezed, thyme, sea salt",
    price: "7",
    category: "Non-Alcoholic",
  },
  {
    name: "Sparkling Water",
    description: "San Pellegrino, 750ml",
    price: "6",
    category: "Non-Alcoholic",
  },
  {
    name: "Cold Brew Coffee",
    description: "Single origin, unsweetened",
    price: "6",
    category: "Non-Alcoholic",
  },
]

const SEEDS: Record<Kind, SeedItem[]> = {
  food: FOOD_SEED,
  spirit: SPIRIT_SEED,
  beverage: BEVERAGE_SEED,
}

export const seed = mutation({
  args: { kind: menuKind },
  handler: async (ctx, { kind }) => {
    await assertAdmin(ctx)
    const existing = await ctx.db
      .query("menuItems")
      .withIndex("by_kind", (q) => q.eq("kind", kind))
      .take(1)
    if (existing.length > 0) {
      return { skipped: true as const, items: [] }
    }
    const items: Array<{ id: Id<"menuItems">; slug: string }> = []
    let i = 0
    for (const item of SEEDS[kind]) {
      const slug = slugify(item.name)
      const id = await ctx.db.insert("menuItems", {
        kind,
        name: item.name,
        slug,
        description: item.description,
        price: item.price,
        category: item.category,
        likes: 0,
        sortOrder: i++ * 10,
      })
      items.push({ id, slug })
    }
    return { skipped: false as const, items }
  },
})
