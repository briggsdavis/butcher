"use client"

import type { FunctionReturnType } from "convex/server"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
import { api } from "../../convex/_generated/api"
import { TiltCard } from "./tilt-card"

// react-pdf touches DOM/worker globals at module load, so it can't be part of
// the server render. Loading it client-only keeps the rest of this list (the
// polaroids and menu rows) server-rendered for CLS while the PDF hydrates.
const MenuPdfEmbed = dynamic(() => import("./menu-pdf-embed").then((m) => m.MenuPdfEmbed), {
  ssr: false,
})

const POLAROID_ROTATIONS = [-2.5, 1.5, -1.5, 2.5]

type MenuItems = FunctionReturnType<typeof api.menu.list>

type Config = {
  basePath: string
  categoryLabels?: Record<string, string>
  inlinePdf?: boolean
  // Fetched on the server and passed in as plain data so the menu is part of
  // the initial HTML. This is what removes the post-hydration content pop-in
  // (CLS); it mirrors the homepage's server fetchQuery pattern.
  items: MenuItems
  menuPdfUrl: FunctionReturnType<typeof api.site.getMenuPdfUrl>
}

// Deterministic 32-bit hash so the featured "polaroid" picks are stable. A
// Math.random() shuffle would diverge between the SSR render and hydration,
// causing both a React hydration mismatch and a layout shift as the client
// re-picked — the very thing we're removing here.
function hashId(id: string): number {
  let h = 2166136261
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function pickFeatured<T extends { _id: string }>(arr: readonly T[], n: number): T[] {
  return [...arr].sort((a, b) => hashId(a._id) - hashId(b._id)).slice(0, n)
}

export function MenuList({ basePath, categoryLabels, inlinePdf, items, menuPdfUrl }: Config) {
  const grouped = useMemo(() => {
    const map = new Map<string, MenuItems>()
    for (const it of items ?? []) {
      const arr = map.get(it.category) ?? []
      arr.push(it)
      map.set(it.category, arr)
    }
    return [...map.entries()].map(([category, rows]) => ({
      category,
      label: categoryLabels?.[category] ?? category,
      items: rows ?? [],
    }))
  }, [items, categoryLabels])

  const polaroids = useMemo(() => {
    const withImages = (items ?? []).filter((it) => it.imageUrl)
    return pickFeatured(withImages, 4)
  }, [items])

  return (
    <>
      <div className="h-20 md:h-24" />

      <section className="bg-charcoal pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {polaroids.map((item, i) => (
              <Link key={item._id} href={`${basePath}/${item.slug}`}>
                <TiltCard
                  initialRotate={POLAROID_ROTATIONS[i] ?? 0}
                  maxTilt={5}
                  className="bg-cream p-2 pb-0 shadow-2xl md:p-3 md:pb-0"
                >
                  <div className="img-inset-shadow relative aspect-square overflow-hidden">
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(min-width: 768px) 22vw, 45vw"
                        className="img-zoom object-cover"
                      />
                    )}
                  </div>
                  <div className="flex h-14 items-center justify-center px-2 md:h-20">
                    <p className="text-center font-handwritten text-2xl text-charcoal md:text-3xl">
                      {item.name}
                    </p>
                  </div>
                </TiltCard>
              </Link>
            ))}
          </div>
          {menuPdfUrl && inlinePdf ? (
            <div className="mt-10">
              <MenuPdfEmbed url={menuPdfUrl} />
            </div>
          ) : (
            menuPdfUrl && (
              <div className="mt-10 flex justify-center">
                <a
                  href={menuPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-plaque inline-block px-10 py-4 text-xs uppercase"
                >
                  View Menu PDF
                </a>
              </div>
            )
          )}
        </div>
      </section>

      {grouped.map(({ category, label, items: rows }, bi) => {
        if (rows.length === 0) return null
        const dark = bi % 2 === 0
        return (
          <section
            key={category}
            data-wipe
            className={`py-24 md:py-32 ${dark ? "bg-cream" : "bg-oxblood"}`}
          >
            <div className="mx-auto max-w-7xl px-8 md:px-16">
              <div data-animate="" className="flex items-center gap-4">
                <span
                  className={`block h-px w-8 shrink-0 ${dark ? "bg-oxblood/30" : "bg-amber/50"}`}
                />
                <span className={`text-sm uppercase ${dark ? "text-oxblood" : "text-amber"}`}>
                  {label}
                </span>
              </div>
              <h2
                data-animate=""
                data-delay="100"
                className={`mt-4 font-display text-5xl md:text-7xl ${dark ? "text-charcoal" : "text-cream"}`}
              >
                {category}
              </h2>
              <div
                className={`mt-10 divide-y border-t ${dark ? "divide-charcoal/10 border-charcoal/10" : "divide-cream/10 border-cream/10"}`}
              >
                {rows.map((item, i) => (
                  <Link
                    key={item._id}
                    href={`${basePath}/${item.slug}`}
                    data-animate=""
                    data-delay={String(180 + i * 60)}
                    className="group flex items-center gap-5 py-4"
                  >
                    <div
                      className={`relative size-14 shrink-0 overflow-hidden transition-all duration-700 ease-in-out group-hover:size-36 ${dark ? "bg-charcoal/10" : "bg-cream/5"}`}
                    >
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="144px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex flex-1 items-baseline justify-between">
                      <div>
                        <span
                          className={`font-subhead text-base transition-colors duration-200 ${
                            dark
                              ? "text-charcoal group-hover:text-oxblood"
                              : "text-cream group-hover:text-amber"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span
                          className={`ml-4 text-xs ${dark ? "text-charcoal/45" : "text-tan/50"}`}
                        >
                          {item.description}
                        </span>
                      </div>
                      <span
                        className={`font-subhead text-sm ${dark ? "text-oxblood" : "text-amber"}`}
                      >
                        ${item.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
