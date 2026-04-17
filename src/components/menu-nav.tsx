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
    <div className="sticky top-0 z-40 flex justify-center gap-12 border-b border-cream/10 bg-charcoal/90 px-8 py-4 backdrop-blur-sm">
      {MENU_PAGES.map(({ href, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`pb-1 text-xs tracking-[0.25em] uppercase transition-colors ${
              active
                ? "border-b border-amber text-cream"
                : "text-tan/50 hover:text-cream"
            }`}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
