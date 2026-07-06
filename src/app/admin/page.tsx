import Link from "next/link"
import { SITE_PAGE_DEFINITIONS } from "~/lib/site-content"

export default function AdminPage() {
  return (
    <main className="min-h-screen px-8 py-16 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-4">
          <span className="block h-px w-10 shrink-0 bg-amber/50" />
          <span className="text-xs text-amber uppercase">Back of House</span>
        </div>
        <h1 className="heading-emboss mt-4 font-display text-6xl text-cream md:text-7xl">Admin</h1>

        <section className="mt-12">
          <h2 className="font-display text-3xl text-cream">Site Settings</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Link
              href="/admin/common"
              className="group block cursor-pointer select-none border border-amber/30 p-6 transition-colors hover:border-amber"
            >
              <p className="cursor-pointer text-xs text-amber uppercase">Common</p>
              <p className="mt-3 cursor-pointer font-display text-3xl text-cream group-hover:text-amber">
                Common Values
              </p>
              <p className="mt-2 cursor-pointer text-sm text-tan">
                Email, phone, address, hours, and links.
              </p>
            </Link>
            <Link
              href="/admin/reviews"
              className="group block cursor-pointer select-none border border-amber/30 p-6 transition-colors hover:border-amber"
            >
              <p className="cursor-pointer text-xs text-amber uppercase">Moderation</p>
              <p className="mt-3 cursor-pointer font-display text-3xl text-cream group-hover:text-amber">
                Reviews
              </p>
              <p className="mt-2 cursor-pointer text-sm text-tan">
                Approve guest reviews and choose featured quotes.
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl text-cream">Website Pages</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {SITE_PAGE_DEFINITIONS.map((page) => (
              <Link
                key={page.key}
                href={`/admin/pages/${page.key}`}
                className="group block cursor-pointer select-none border border-amber/30 p-6 transition-colors hover:border-amber"
              >
                <p className="cursor-pointer text-xs text-amber uppercase">Page</p>
                <p className="mt-3 cursor-pointer font-display text-3xl text-cream group-hover:text-amber">
                  {page.label}
                </p>
                <p className="mt-2 cursor-pointer text-sm text-tan">
                  Edit page text and image slots.
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-3xl text-cream">Menus</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Link
              href="/admin/food"
              className="group block cursor-pointer select-none border border-amber/30 p-8 transition-colors hover:border-amber"
            >
              <p className="cursor-pointer text-xs text-amber uppercase">Menu</p>
              <p className="mt-3 cursor-pointer font-display text-3xl text-cream group-hover:text-amber">
                Food
              </p>
              <p className="mt-2 cursor-pointer text-sm text-tan">Add, edit, or remove dishes.</p>
            </Link>
            <Link
              href="/admin/spirits"
              className="group block cursor-pointer select-none border border-amber/30 p-8 transition-colors hover:border-amber"
            >
              <p className="cursor-pointer text-xs text-amber uppercase">Bar</p>
              <p className="mt-3 cursor-pointer font-display text-3xl text-cream group-hover:text-amber">
                Spirits
              </p>
              <p className="mt-2 cursor-pointer text-sm text-tan">
                Manage whiskey, gin, and the rest of the back bar.
              </p>
            </Link>
            <Link
              href="/admin/beverages"
              className="group block cursor-pointer select-none border border-amber/30 p-8 transition-colors hover:border-amber"
            >
              <p className="cursor-pointer text-xs text-amber uppercase">Bar</p>
              <p className="mt-3 cursor-pointer font-display text-3xl text-cream group-hover:text-amber">
                Beverages
              </p>
              <p className="mt-2 cursor-pointer text-sm text-tan">
                Cocktails, wine, and non-alcoholic offerings.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
