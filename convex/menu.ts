import slugify from "@sindresorhus/slugify"
import { Infer, v } from "convex/values"
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server"
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

async function uniqueSlug(ctx: QueryCtx, kind: Kind, name: string, ignoreId?: string) {
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

async function withImageUrl<T extends { imageId?: string }>(ctx: QueryCtx, doc: T) {
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
    return [...seen].sort((a, b) => categoryRank(kind, a) - categoryRank(kind, b))
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
    const comments = await ctx.db
      .query("menuComments")
      .withIndex("by_item", (q) => q.eq("itemId", itemId))
      .order("desc")
      .take(200)
    return comments
      .filter((comment) => comment.status === "approved" || comment.status === undefined)
      .sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
  },
})

export const listReviewsForAdmin = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx)
    const comments = await ctx.db.query("menuComments").order("desc").take(500)
    const rows = await Promise.all(
      comments.map(async (comment) => {
        const item = await ctx.db.get(comment.itemId)
        return {
          ...comment,
          status: comment.status ?? "approved",
          featured: comment.featured ?? false,
          itemName: item?.name ?? "Deleted item",
          itemKind: item?.kind ?? null,
          itemSlug: item?.slug ?? null,
        }
      }),
    )
    return rows
  },
})

export const listFeaturedReviews = query({
  args: {},
  handler: async (ctx) => {
    const comments = await ctx.db
      .query("menuComments")
      .withIndex("by_featured", (q) => q.eq("featured", true))
      .order("desc")
      .take(5)
    const approved = comments.filter(
      (comment) => comment.status === "approved" || comment.status === undefined,
    )
    return await Promise.all(
      approved.map(async (comment) => {
        const item = await ctx.db.get(comment.itemId)
        return {
          _id: comment._id,
          _creationTime: comment._creationTime,
          name: comment.name,
          body: comment.body,
          itemName: item?.name ?? null,
          itemKind: item?.kind ?? null,
          itemSlug: item?.slug ?? null,
        }
      }),
    )
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
      status: "pending",
      featured: false,
    })
  },
})

export const approveReview = mutation({
  args: { id: v.id("menuComments") },
  handler: async (ctx, { id }) => {
    await assertAdmin(ctx)
    const review = await ctx.db.get(id)
    if (!review) throw new Error("Review not found.")
    await ctx.db.patch(id, {
      status: "approved",
      approvedAt: Date.now(),
    })
  },
})

export const setReviewFeatured = mutation({
  args: { id: v.id("menuComments"), featured: v.boolean() },
  handler: async (ctx, { id, featured }) => {
    await assertAdmin(ctx)
    const review = await ctx.db.get(id)
    if (!review) throw new Error("Review not found.")
    if (featured && review.status !== "approved" && review.status !== undefined) {
      throw new Error("Only approved reviews can be featured.")
    }
    if (featured) {
      const featuredReviews = await ctx.db
        .query("menuComments")
        .withIndex("by_featured", (q) => q.eq("featured", true))
        .take(6)
      const otherFeatured = featuredReviews.filter((comment) => comment._id !== id)
      if (otherFeatured.length >= 5) {
        throw new Error("Only five reviews can be featured.")
      }
    }
    await ctx.db.patch(id, { featured })
  },
})

export const removeReview = mutation({
  args: { id: v.id("menuComments") },
  handler: async (ctx, { id }) => {
    await assertAdmin(ctx)
    await ctx.db.delete(id)
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

async function deleteImageIfPresent(ctx: MutationCtx, imageId: string | undefined) {
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
    imageUpdate: v.optional(v.union(v.null(), v.object({ imageId: v.id("_storage") }))),
  },
  handler: async (ctx, { id, name, description, price, category, imageUpdate }) => {
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
