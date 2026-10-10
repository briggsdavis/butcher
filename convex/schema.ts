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

export const popupFrequency = v.union(v.literal("once"), v.literal("session"), v.literal("always"))
export const popupPages = v.union(v.literal("all"), v.literal("home"))

export const popupSettings = v.object({
  heading: v.string(),
  body: v.string(),
  imageId: v.optional(v.id("_storage")),
  imageAlt: v.string(),
  buttonEnabled: v.boolean(),
  buttonLabel: v.string(),
  buttonUrl: v.string(),
  buttonNewTab: v.boolean(),
  frequency: popupFrequency,
  delaySeconds: v.number(),
  pages: popupPages,
  startsAt: v.optional(v.number()),
  endsAt: v.optional(v.number()),
})

export const announcementSettings = v.object({
  enabled: v.boolean(),
  dismissible: v.optional(v.boolean()),
  text: v.string(),
  linkLabel: v.string(),
  linkUrl: v.string(),
})

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
    announcement: v.optional(announcementSettings),
  }).index("by_key", ["key"]),

  // Only one popup may be enabled at a time; enabling one disables the rest.
  popups: defineTable({
    ...popupSettings.fields,
    // Compatibility with existing documents; new saves omit this legacy field.
    name: v.optional(v.string()),
    enabled: v.boolean(),
    updatedAt: v.number(),
  }).index("by_enabled", ["enabled"]),

  sitePages: defineTable({
    key: sitePageKey,
    // Published content — what the public site renders.
    fields: v.record(v.string(), v.string()),
    images: v.optional(v.record(v.string(), v.id("_storage"))),
    updatedAt: v.number(),
    // Private working draft — auto-saved from the editor, never shown publicly
    // until it is published (copied onto fields/images).
    draftFields: v.optional(v.record(v.string(), v.string())),
    draftImages: v.optional(v.record(v.string(), v.id("_storage"))),
    draftUpdatedAt: v.optional(v.number()),
  }).index("by_key", ["key"]),
})
