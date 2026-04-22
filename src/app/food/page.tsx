import slugify from "@sindresorhus/slugify"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MenuNav } from "~/components/menu-nav"
import { DESSERTS, MAINS, MenuItem, SIDES, STARTERS } from "~/data/food"

export const metadata: Metadata = {
  title: "Food",
}

function MenuCard({ item, dark }: { item: MenuItem; dark: boolean }) {
  const slug = slugify(item.name)
  return (
    <Link
      href={`/food/${slug}`}
      className={`group -mx-3 flex items-start gap-5 rounded-sm p-3 transition-colors duration-200 ${
        dark ? "hover:bg-white/[0.05]" : "hover:bg-black/[0.05]"
      }`}
    >
      {/* Square thumbnail */}
      <div className="relative size-[88px] shrink-0 overflow-hidden rounded-sm">
        <Image
          src={`/food/${slug}.jpg`}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Text */}
      <div className="flex-1 pt-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={`font-display text-base leading-snug ${dark ? "text-cream" : "text-charcoal"}`}
          >
            {item.name}
          </h3>
          <span
            className={`shrink-0 font-display text-sm ${dark ? "text-amber" : "text-oxblood"}`}
          >
            ${item.price}
          </span>
        </div>
        {item.description && (
          <p
            className={`mt-1.5 text-xs leading-relaxed ${dark ? "text-tan/80" : "text-charcoal/55"}`}
          >
            {item.description}
          </p>
        )}
      </div>
    </Link>
  )
}

const MENU_SECTIONS = [
  { label: "To Begin", title: "Starters", items: STARTERS, dark: false },
  { label: "The Main Event", title: "Entrées", items: MAINS, dark: true },
  { label: "On the Side", title: "Sides", items: SIDES, dark: false },
  { label: "To Finish", title: "Desserts", items: DESSERTS, dark: true },
]

export default function Food() {
  return (
    <>
      {/* ── Header ── */}
      <section className="flex flex-col justify-end bg-oxblood px-8 pt-32 pb-20 md:px-16 md:pt-48 md:pb-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 shrink-0 bg-amber/50" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              The Menu
            </span>
          </div>
          <h1 className="mt-4 font-display text-6xl leading-none text-cream md:text-9xl">
            Food
          </h1>
          <p className="mt-6 max-w-lg text-lg text-tan">
            Honest ingredients, patient preparation, bold flavors. Every dish
            tells the story of where it came from.
          </p>
        </div>
      </section>

      <MenuNav />

      {/* ── Menu Sections — alternating oxblood / cream ── */}
      {MENU_SECTIONS.map(({ label, title, items, dark }) => (
        <section
          key={title}
          data-wipe
          className={`py-24 md:py-32 ${dark ? "bg-oxblood" : "bg-cream"}`}
        >
          <div className="mx-auto max-w-7xl px-8 md:px-16">
            <div data-animate="" className="flex items-center gap-4">
              <span
                className={`block h-px w-8 shrink-0 ${dark ? "bg-amber/50" : "bg-oxblood/30"}`}
              />
              <span
                className={`text-xs tracking-[0.3em] uppercase ${dark ? "text-amber" : "text-oxblood"}`}
              >
                {label}
              </span>
            </div>
            <h2
              data-animate=""
              data-delay="100"
              className={`mt-4 font-display text-5xl md:text-7xl ${dark ? "text-cream" : "text-charcoal"}`}
            >
              {title}
            </h2>
            <div className="mt-12 grid gap-x-6 gap-y-2 md:grid-cols-2">
              {items.map((item, i) => (
                <div
                  key={item.name}
                  data-animate=""
                  data-delay={String(180 + i * 70)}
                >
                  <MenuCard item={item} dark={dark} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section data-wipe className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8 text-center md:px-16">
          <h2
            data-animate=""
            className="font-display text-4xl text-charcoal md:text-6xl"
          >
            Ready to <span className="text-oxblood italic">dine</span>?
          </h2>
          <p
            data-animate=""
            data-delay="100"
            className="mx-auto mt-6 max-w-md text-charcoal/60"
          >
            Pair your meal with something from our cocktail bar or curated
            spirits collection.
          </p>
          <div
            data-animate=""
            data-delay="220"
            className="mt-12 flex flex-wrap justify-center gap-6 [&>a]:w-60 [&>a]:text-center"
          >
            <Link
              href="/beverages"
              className="border border-charcoal/20 px-8 py-4 text-xs tracking-[0.3em] text-charcoal uppercase transition-colors hover:border-oxblood hover:text-oxblood"
            >
              Beverages
            </Link>
            <Link
              href="/spirits"
              className="border border-charcoal/20 px-8 py-4 text-xs tracking-[0.3em] text-charcoal uppercase transition-colors hover:border-oxblood hover:text-oxblood"
            >
              Spirits
            </Link>
            <Link
              href="#"
              className="border border-amber bg-amber px-8 py-4 text-xs tracking-[0.3em] text-charcoal uppercase transition-colors hover:bg-amber/80"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
