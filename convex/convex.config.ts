import { defineApp } from "convex/server"
import { v } from "convex/values"

const app = defineApp({
  env: {
    ADMIN_EMAILS: v.optional(v.string()),
  },
})

export default app
