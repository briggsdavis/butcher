import { createClient, type GenericCtx } from "@convex-dev/better-auth"
import { convex } from "@convex-dev/better-auth/plugins"
import { betterAuth } from "better-auth"
import { APIError, createAuthMiddleware } from "better-auth/api"
import { components } from "./_generated/api"
import type { DataModel } from "./_generated/dataModel"
import { query } from "./_generated/server"
import authConfig from "./auth.config"

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000"

// Comma-separated list of emails that are permitted to hold an admin account.
// The only way an account exists in the system is by being seeded via the
// sign-up endpoint with an email on this list (see README in /admin).
const adminEmails = () =>
  (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)

export const authComponent = createClient<DataModel>(components.betterAuth)

export const createAuth = (ctx: GenericCtx<DataModel>) =>
  betterAuth({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      // Sign-up endpoint stays reachable so admins can be seeded via curl,
      // but the before-hook below rejects any email not in ADMIN_EMAILS.
      autoSignIn: false,
      requireEmailVerification: false,
      minPasswordLength: 12,
    },
    hooks: {
      before: createAuthMiddleware(async (hookCtx) => {
        if (hookCtx.path !== "/sign-up/email") return
        const email = String(hookCtx.body?.email ?? "").toLowerCase()
        const allowed = adminEmails()
        if (allowed.length === 0) {
          throw new APIError("FORBIDDEN", {
            message: "Sign-up is disabled (ADMIN_EMAILS not configured).",
          })
        }
        if (!allowed.includes(email)) {
          throw new APIError("FORBIDDEN", {
            message: "This email is not permitted to create an account.",
          })
        }
      }),
    },
    plugins: [convex({ authConfig })],
  })

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => authComponent.safeGetAuthUser(ctx),
})

// Admin check. Mirror this in any mutation/query that touches admin data.
// We re-verify the email against the live allowlist on every call, so
// revoking an admin is as simple as removing their email from ADMIN_EMAILS.
export const requireAdmin = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx)
    if (!user) throw new Error("Not authenticated")
    const email = (user.email ?? "").toLowerCase()
    if (!adminEmails().includes(email)) {
      throw new Error("Not authorized")
    }
    return user
  },
})
