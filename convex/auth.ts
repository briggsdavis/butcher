import { Password } from "@convex-dev/auth/providers/Password"
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server"
import { ConvexError } from "convex/values"
import { query, type MutationCtx, type QueryCtx, env } from "./_generated/server"

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function adminEmails() {
  return new Set((env.ADMIN_EMAILS ?? "").split(",").map(normalizeEmail).filter(Boolean))
}

const AdminPassword = Password({
  profile(params) {
    const emailParam = params.email
    if (typeof emailParam !== "string") {
      throw new ConvexError("Email is required.")
    }

    const email = normalizeEmail(emailParam)
    const allowedEmails = adminEmails()
    if (!allowedEmails.has(email)) {
      throw new ConvexError({
        code: "UNAUTHORIZED_ADMIN_EMAIL",
        message: "This email is not approved for admin access.",
      })
    }

    return { email }
  },
})

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [AdminPassword],
})

export async function assertAdmin(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx)
  if (userId === null) {
    throw new ConvexError("Not authenticated.")
  }
  return userId
}

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    return userId === null ? null : await ctx.db.get(userId)
  },
})
