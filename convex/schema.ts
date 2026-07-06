import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const menuKind = v.union(v.literal("food"), v.literal("spirit"), v.literal("beverage"))
export const sitePageKey = v.union(
  v.literal("home"),
  v.literal("about"),
  v.literal("contact"),
  v.literal("our-staff"),
)

export default defineSchema({
  ...authTables,

  menuItems: defineTable({
    kind: menuKind,
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    price: v.string(),
    category: v.string(),
    likes: v.number(),
    sortOrder: v.number(),
    imageId: v.optional(v.id("_storage")),
    hidden: v.optional(v.boolean()),
  })
    .index("by_kind_and_slug", ["kind", "slug"])
    .index("by_kind_and_category_and_sortOrder", ["kind", "category", "sortOrder"])
    .index("by_kind", ["kind"]),

  menuComments: defineTable({
    itemId: v.id("menuItems"),
    name: v.string(),
    body: v.string(),
    status: v.optional(v.union(v.literal("pending"), v.literal("approved"))),
    featured: v.optional(v.boolean()),
    approvedAt: v.optional(v.number()),
  })
    .index("by_item", ["itemId"])
    .index("by_status", ["status"])
    .index("by_featured", ["featured"]),

  siteConfig: defineTable({
    key: v.literal("singleton"),
    foodPdfId: v.optional(v.id("_storage")),
    spiritsPdfId: v.optional(v.id("_storage")),
    beveragesPdfId: v.optional(v.id("_storage")),
    commonFields: v.optional(v.record(v.string(), v.string())),
    commonUpdatedAt: v.optional(v.number()),
  }).index("by_key", ["key"]),

  sitePages: defineTable({
    key: sitePageKey,
    fields: v.record(v.string(), v.string()),
    images: v.optional(v.record(v.string(), v.id("_storage"))),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
})
