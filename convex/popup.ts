import { v } from "convex/values"
import type { Id } from "./_generated/dataModel"
import { mutation, query, type MutationCtx } from "./_generated/server"
import { assertAdmin } from "./auth"
import { popupSettings } from "./schema"

async function deleteFileIfPresent(ctx: MutationCtx, id: Id<"_storage"> | undefined) {
  if (!id) return
  try {
    await ctx.storage.delete(id)
  } catch {}
}

async function disableOthers(ctx: MutationCtx, keepId: Id<"popups">) {
  const enabled = await ctx.db
    .query("popups")
    .withIndex("by_enabled", (q) => q.eq("enabled", true))
    .take(50)
  for (const popup of enabled) {
    if (popup._id !== keepId) await ctx.db.patch(popup._id, { enabled: false })
  }
}

// Public: the single enabled popup, if any. Schedule windows are checked on
// the client since queries can't read the clock.
export const getActive = query({
  args: {},
  handler: async (ctx) => {
    const popup = await ctx.db
      .query("popups")
      .withIndex("by_enabled", (q) => q.eq("enabled", true))
      .first()
    if (!popup) return null
    const { imageId, _creationTime, enabled: _enabled, name: _name, ...rest } = popup
    return {
      ...rest,
      imageUrl: imageId ? await ctx.storage.getUrl(imageId) : null,
      version: `${popup._id}:${popup.updatedAt}`,
    }
  },
})

export const list = query({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx)
    const popups = await ctx.db.query("popups").order("desc").take(100)
    return await Promise.all(
      popups.map(async (popup) => ({
        _id: popup._id,
        heading: popup.heading,
        enabled: popup.enabled,
        startsAt: popup.startsAt,
        endsAt: popup.endsAt,
        updatedAt: popup.updatedAt,
        imageUrl: popup.imageId ? await ctx.storage.getUrl(popup.imageId) : null,
      })),
    )
  },
})

export const getForAdmin = query({
  args: { id: v.id("popups") },
  handler: async (ctx, { id }) => {
    await assertAdmin(ctx)
    const popup = await ctx.db.get(id)
    if (!popup) return null
    return {
      popup,
      imageUrl: popup.imageId ? await ctx.storage.getUrl(popup.imageId) : null,
    }
  },
})

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await assertAdmin(ctx)
    return await ctx.storage.generateUploadUrl()
  },
})

function clean<T extends { delaySeconds: number }>(popup: T): T {
  return { ...popup, delaySeconds: Math.max(0, Math.min(120, popup.delaySeconds)) }
}

export const create = mutation({
  args: { popup: popupSettings, enabled: v.boolean() },
  handler: async (ctx, { popup, enabled }) => {
    await assertAdmin(ctx)
    const id = await ctx.db.insert("popups", {
      ...clean(popup),
      enabled,
      updatedAt: Date.now(),
    })
    if (enabled) await disableOthers(ctx, id)
    return id
  },
})

export const update = mutation({
  args: { id: v.id("popups"), popup: popupSettings, enabled: v.boolean() },
  handler: async (ctx, { id, popup, enabled }) => {
    await assertAdmin(ctx)
    const existing = await ctx.db.get(id)
    if (!existing) throw new Error("Popup not found.")
    if (existing.imageId && existing.imageId !== popup.imageId) {
      await deleteFileIfPresent(ctx, existing.imageId)
    }
    await ctx.db.replace(id, { ...clean(popup), enabled, updatedAt: Date.now() })
    if (enabled) await disableOthers(ctx, id)
  },
})

export const setEnabled = mutation({
  args: { id: v.id("popups"), enabled: v.boolean() },
  handler: async (ctx, { id, enabled }) => {
    await assertAdmin(ctx)
    const existing = await ctx.db.get(id)
    if (!existing) throw new Error("Popup not found.")
    await ctx.db.patch(id, { enabled })
    if (enabled) await disableOthers(ctx, id)
  },
})

export const remove = mutation({
  args: { id: v.id("popups") },
  handler: async (ctx, { id }) => {
    await assertAdmin(ctx)
    const existing = await ctx.db.get(id)
    if (!existing) return
    await deleteFileIfPresent(ctx, existing.imageId)
    await ctx.db.delete(id)
  },
})
