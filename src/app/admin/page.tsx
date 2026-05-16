import { redirect } from "next/navigation"
import { fetchAuthQuery, isAuthenticated } from "~/lib/auth-server"
import { api } from "../../../convex/_generated/api"
import { SignOutButton } from "./sign-out-button"

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }

  // requireAdmin throws if the signed-in user's email isn't in ADMIN_EMAILS.
  try {
    await fetchAuthQuery(api.auth.requireAdmin, {})
  } catch {
    redirect("/admin/login?reason=not-authorized")
  }

  const user = await fetchAuthQuery(api.auth.getCurrentUser, {})

  return (
    <main className="min-h-screen bg-oxblood px-8 py-24 md:px-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-4">
          <span className="block h-px w-10 shrink-0 bg-amber/50" />
          <span className="text-xs text-amber uppercase">Back of House</span>
        </div>
        <h1 className="heading-emboss mt-4 font-display text-6xl text-cream md:text-7xl">
          Admin
        </h1>

        <p className="mt-6 font-subhead text-tan">
          Signed in as <span className="text-cream">{user?.email}</span>
        </p>

        <div className="mt-12 border border-amber/30 p-8">
          <p className="text-tan">
            This is a stub. Drop real admin tooling in here.
          </p>
        </div>

        <div className="mt-10">
          <SignOutButton />
        </div>
      </div>
    </main>
  )
}
