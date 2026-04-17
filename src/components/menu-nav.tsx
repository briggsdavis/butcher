"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const MENU_PAGES = [
  { href: "/food", label: "Food" },
  { href: "/spirits", label: "Spirits" },
  { href: "/beverages", label: "Beverages" },
]

export function MenuNav() {
  const pathname = usePathname()
  return (
    <div className="sticky top-0 z-40 flex justify-center border-y border-cream/10 bg-charcoal px-8 py-4">
      <div className="grid w-72 grid-cols-3 justify-items-center">
      {MENU_PAGES.map(({ href, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`border-b-2 pb-0.5 text-xs tracking-[0.25em] uppercase transition-colors ${
              active
                ? "border-amber text-cream"
                : "border-transparent text-tan/50 hover:text-cream"
            }`}
          >
            {label}
          </Link>
        )
      })}
      </div>
    </div>
  )
}
