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

const PDF_FIELD: Record<Kind, "foodPdfId" | "spiritsPdfId" | "beveragesPdfId"> =
  {
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

async function setPdf(
  ctx: MutationCtx,
  kind: Kind,
  storageId: Id<"_storage"> | undefined,
) {
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
