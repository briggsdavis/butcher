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

async function resolveImageUrls(ctx: QueryCtx, images: Record<string, Id<"_storage">>) {
  const imageUrls: Record<string, string | null> = {}
  for (const [key, imageId] of Object.entries(images)) {
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

// Delete every storage id that used to be referenced but no longer is, so that
// replaced draft/published images don't leak. An id stays alive as long as it
// is referenced by either the published set or the draft set.
async function cleanupUnreferencedImages(
  ctx: MutationCtx,
  previous: Record<string, Id<"_storage">>[],
  next: Record<string, Id<"_storage">>[],
) {
  const stillReferenced = new Set(next.flatMap((map) => Object.values(map)))
  const wasReferenced = new Set(previous.flatMap((map) => Object.values(map)))
  for (const id of wasReferenced) {
    if (!stillReferenced.has(id)) await deleteFileIfPresent(ctx, id)
  }
}

function recordsEqual(a: Record<string, string>, b: Record<string, string>) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const key of keys) {
    if (a[key] !== b[key]) return false
  }
  return true
}

function imageMapsEqual(a: Record<string, Id<"_storage">>, b: Record<string, Id<"_storage">>) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const key of keys) {
    if (a[key] !== b[key]) return false
  }
  return true
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
      imageUrls: await resolveImageUrls(ctx, page.images ?? {}),
      updatedAt: page.updatedAt,
    }
  },
})

// Returns the current working state for the editor: the private draft if one
// exists, otherwise the published content. `hasUnpublishedChanges` tells the
// editor whether the working draft differs from what the public site shows.
export const getPageForAdmin = query({
  args: { key: sitePageKey },
  handler: async (ctx, { key }) => {
    await assertAdmin(ctx)
    const page = await getPageDoc(ctx, key)
    if (!page) {
      return {
        key,
        fields: {},
        images: {},
        imageUrls: {},
        hasUnpublishedChanges: false,
        updatedAt: null,
        draftUpdatedAt: null,
      }
    }

    const hasDraft = page.draftFields !== undefined
    const workingFields = hasDraft ? page.draftFields! : page.fields
    const workingImages = hasDraft ? (page.draftImages ?? {}) : (page.images ?? {})
    const hasUnpublishedChanges =
      hasDraft &&
      (!recordsEqual(workingFields, page.fields) ||
        !imageMapsEqual(workingImages, page.images ?? {}))

    return {
      key: page.key,
      fields: workingFields,
      images: workingImages,
      imageUrls: await resolveImageUrls(ctx, workingImages),
      hasUnpublishedChanges,
      updatedAt: page.updatedAt,
      draftUpdatedAt: page.draftUpdatedAt ?? null,
    }
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

// Auto-save: persist the editor's working state as a private draft. Never
// touches the published fields/images, so the public site is unaffected.
export const savePageDraft = mutation({
  args: {
    key: sitePageKey,
    fields: v.record(v.string(), v.string()),
    images: v.record(v.string(), v.id("_storage")),
  },
  handler: async (ctx, { key, fields, images }) => {
    await assertAdmin(ctx)
    const existing = await getPageDoc(ctx, key)
    const draftUpdatedAt = Date.now()

    if (existing) {
      // Old draft images that are neither in the new draft nor published are orphaned.
      await cleanupUnreferencedImages(
        ctx,
        [existing.draftImages ?? {}],
        [images, existing.images ?? {}],
      )
      await ctx.db.patch(existing._id, {
        draftFields: fields,
        draftImages: images,
        draftUpdatedAt,
      })
    } else {
      await ctx.db.insert("sitePages", {
        key,
        fields: {},
        images: {},
        updatedAt: draftUpdatedAt,
        draftFields: fields,
        draftImages: images,
        draftUpdatedAt,
      })
    }
  },
})

// Publish: promote the working state onto the published fields/images so it
// goes live, then clear the draft. Accepts the latest working state so a final
// in-flight edit is captured even if auto-save hasn't flushed yet.
export const publishPage = mutation({
  args: {
    key: sitePageKey,
    fields: v.record(v.string(), v.string()),
    images: v.record(v.string(), v.id("_storage")),
  },
  handler: async (ctx, { key, fields, images }) => {
    await assertAdmin(ctx)
    const existing = await getPageDoc(ctx, key)
    const updatedAt = Date.now()

    if (existing) {
      // The new published set is authoritative; drop any image no longer used.
      await cleanupUnreferencedImages(
        ctx,
        [existing.images ?? {}, existing.draftImages ?? {}],
        [images],
      )
      await ctx.db.replace(existing._id, { key, fields, images, updatedAt })
    } else {
      await ctx.db.insert("sitePages", { key, fields, images, updatedAt })
    }
  },
})

// Discard: throw away the working draft and revert to the published content.
// Returns the published state so the editor can reset its local buffer.
export const discardPageDraft = mutation({
  args: { key: sitePageKey },
  handler: async (ctx, { key }) => {
    await assertAdmin(ctx)
    const existing = await getPageDoc(ctx, key)
    if (!existing) return { fields: {}, images: {}, imageUrls: {} }

    if (existing.draftFields !== undefined) {
      // Draft-only images (not referenced by the published set) are orphaned.
      await cleanupUnreferencedImages(ctx, [existing.draftImages ?? {}], [existing.images ?? {}])
      await ctx.db.replace(existing._id, {
        key: existing.key,
        fields: existing.fields,
        images: existing.images,
        updatedAt: existing.updatedAt,
      })
    }

    return {
      fields: existing.fields,
      images: existing.images ?? {},
      imageUrls: await resolveImageUrls(ctx, existing.images ?? {}),
    }
  },
})
