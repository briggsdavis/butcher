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
    <div className="sticky top-0 z-40 grid grid-cols-[1fr_auto_1fr] items-center gap-10 border-y border-cream/10 bg-charcoal px-8 py-4">
      {MENU_PAGES.map(({ href, label }, i) => {
        const active = pathname === href
        const align =
          i === 0
            ? "justify-self-end"
            : i === 2
              ? "justify-self-start"
              : "justify-self-center"
        return (
          <Link
            key={href}
            href={href}
            className={`${align} border-b-2 pb-0.5 text-xs tracking-[0.25em] uppercase transition-colors ${
              active
                ? "border-amber text-cream"
                : "border-transparent text-tan/50 hover:text-cream"
            }`}
          >
            <span className="-mr-[0.25em]">{label}</span>
          </Link>
        )
      })}
    </div>
  )
}
