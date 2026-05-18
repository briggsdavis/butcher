import Link from "next/link"
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

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/food"
            className="group block border border-amber/30 p-8 transition-colors hover:border-amber"
          >
            <p className="text-xs text-amber uppercase">Menu</p>
            <p className="mt-3 font-display text-3xl text-cream group-hover:text-amber">
              Food
            </p>
            <p className="mt-2 text-sm text-tan">
              Add, edit, or remove dishes.
            </p>
          </Link>
          <Link
            href="/admin/spirits"
            className="group block border border-amber/30 p-8 transition-colors hover:border-amber"
          >
            <p className="text-xs text-amber uppercase">Bar</p>
            <p className="mt-3 font-display text-3xl text-cream group-hover:text-amber">
              Spirits
            </p>
            <p className="mt-2 text-sm text-tan">
              Manage whiskey, gin, and the rest of the back bar.
            </p>
          </Link>
          <Link
            href="/admin/beverages"
            className="group block border border-amber/30 p-8 transition-colors hover:border-amber"
          >
            <p className="text-xs text-amber uppercase">Bar</p>
            <p className="mt-3 font-display text-3xl text-cream group-hover:text-amber">
              Beverages
            </p>
            <p className="mt-2 text-sm text-tan">
              Cocktails, wine, and non-alcoholic offerings.
            </p>
          </Link>
        </div>

        <div className="mt-10">
          <SignOutButton />
        </div>
      </div>
    </main>
  )
}
