import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const menuKind = v.union(
  v.literal("food"),
  v.literal("spirit"),
  v.literal("beverage"),
)

export default defineSchema({
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
  })
    .index("by_kind_and_slug", ["kind", "slug"])
    .index("by_kind_and_category_and_sortOrder", [
      "kind",
      "category",
      "sortOrder",
    ])
    .index("by_kind", ["kind"]),

  menuComments: defineTable({
    itemId: v.id("menuItems"),
    name: v.string(),
    body: v.string(),
  }).index("by_item", ["itemId"]),

  siteConfig: defineTable({
    key: v.literal("singleton"),
    foodPdfId: v.optional(v.id("_storage")),
    spiritsPdfId: v.optional(v.id("_storage")),
    beveragesPdfId: v.optional(v.id("_storage")),
  }).index("by_key", ["key"]),
})
