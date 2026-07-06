import { Infer, v } from "convex/values"
import type { Id } from "./_generated/dataModel"
import { mutation, query, type MutationCtx, type QueryCtx } from "./_generated/server"
import { assertAdmin } from "./auth"
import { menuKind, sitePageKey } from "./schema"

type Kind = Infer<typeof menuKind>
type PageKey = Infer<typeof sitePageKey>

const PDF_FIELD: Record<Kind, "foodPdfId" | "spiritsPdfId" | "beveragesPdfId"> = {
  food: "foodPdfId",
  spirit: "spiritsPdfId",
  beverage: "beveragesPdfId",
}

async function getConfig(ctx: QueryCtx | MutationCtx) {
  return await ctx.db
    .query("siteConfig")
    .withIndex("by_key", (q) => q.eq("key", "singleton"))
    .unique()
}

async function getPageDoc(ctx: QueryCtx | MutationCtx, key: PageKey) {
  return await ctx.db
    .query("sitePages")
    .withIndex("by_key", (q) => q.eq("key", key))
    .unique()
}

async function getPageImageUrls(ctx: QueryCtx, page: { images?: Record<string, Id<"_storage">> }) {
  const imageUrls: Record<string, string | null> = {}
  for (const [key, imageId] of Object.entries(page.images ?? {})) {
    imageUrls[key] = await ctx.storage.getUrl(imageId)
  }
  return imageUrls
}

async function deleteFileIfPresent(ctx: MutationCtx, storageId: Id<"_storage"> | undefined) {
  if (!storageId) return
  try {
    await ctx.storage.delete(storageId)
  } catch {}
}

function commonValuesResult(fields: Record<string, string>, updatedAt: number | undefined) {
  if (updatedAt === undefined) return { fields }
  return { fields, updatedAt }
}

export const getMenuPdfUrl = query({
  args: { kind: menuKind },
  handler: async (ctx, { kind }) => {
    const cfg = await getConfig(ctx)
    const id = cfg?.[PDF_FIELD[kind]]
    if (!id) return null
    return await ctx.storage.getUrl(id)
  },
})

export const generatePdfUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx)
    return await ctx.storage.generateUploadUrl()
  },
})

async function setPdf(ctx: MutationCtx, kind: Kind, storageId: Id<"_storage"> | undefined) {
  const field = PDF_FIELD[kind]
  const cfg = await getConfig(ctx)
  if (cfg?.[field]) {
    try {
      await ctx.storage.delete(cfg[field]!)
    } catch {}
  }
  if (cfg) {
    await ctx.db.patch(cfg._id, { [field]: storageId })
  } else if (storageId) {
    await ctx.db.insert("siteConfig", {
      key: "singleton",
      [field]: storageId,
    })
  }
}

export const setMenuPdf = mutation({
  args: { kind: menuKind, storageId: v.id("_storage") },
  handler: async (ctx, { kind, storageId }) => {
    await assertAdmin(ctx)
    await setPdf(ctx, kind, storageId)
  },
})

export const clearMenuPdf = mutation({
  args: { kind: menuKind },
  handler: async (ctx, { kind }) => {
    await assertAdmin(ctx)
    await setPdf(ctx, kind, undefined)
  },
})

export const getPage = query({
  args: { key: sitePageKey },
  handler: async (ctx, { key }) => {
    const page = await getPageDoc(ctx, key)
    if (!page) return null
    return {
      key: page.key,
      fields: page.fields,
      imageUrls: await getPageImageUrls(ctx, page),
      updatedAt: page.updatedAt,
    }
  },
})

export const getPageForAdmin = query({
  args: { key: sitePageKey },
  handler: async (ctx, { key }) => {
    await assertAdmin(ctx)
    const page = await getPageDoc(ctx, key)
    if (!page) return null
    return { ...page, imageUrls: await getPageImageUrls(ctx, page) }
  },
})

export const getCommonValues = query({
  args: {},
  handler: async (ctx) => {
    const cfg = await getConfig(ctx)
    if (!cfg?.commonFields) return null
    return commonValuesResult(cfg.commonFields, cfg.commonUpdatedAt)
  },
})

export const getCommonValuesForAdmin = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx)
    const cfg = await getConfig(ctx)
    if (!cfg?.commonFields) return null
    return commonValuesResult(cfg.commonFields, cfg.commonUpdatedAt)
  },
})

export const saveCommonValues = mutation({
  args: { fields: v.record(v.string(), v.string()) },
  handler: async (ctx, { fields }) => {
    await assertAdmin(ctx)
    const cfg = await getConfig(ctx)
    const commonUpdatedAt = Date.now()

    if (cfg) {
      await ctx.db.patch(cfg._id, { commonFields: fields, commonUpdatedAt })
    } else {
      await ctx.db.insert("siteConfig", {
        key: "singleton",
        commonFields: fields,
        commonUpdatedAt,
      })
    }
  },
})

export const generatePageImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx)
    return await ctx.storage.generateUploadUrl()
  },
})

export const savePage = mutation({
  args: {
    key: sitePageKey,
    fields: v.record(v.string(), v.string()),
    images: v.record(v.string(), v.id("_storage")),
  },
  handler: async (ctx, { key, fields, images }) => {
    await assertAdmin(ctx)
    const existing = await getPageDoc(ctx, key)
    const previousImages = existing?.images ?? {}

    for (const [imageKey, previousId] of Object.entries(previousImages)) {
      if (images[imageKey] !== previousId) {
        await deleteFileIfPresent(ctx, previousId)
      }
    }

    const nextPage = {
      key,
      fields,
      images,
      updatedAt: Date.now(),
    }

    if (existing) {
      await ctx.db.replace(existing._id, nextPage)
    } else {
      await ctx.db.insert("sitePages", nextPage)
    }
  },
})
