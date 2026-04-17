import slugify from "@sindresorhus/slugify"
import { Heart } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { DESSERTS, MAINS, MenuItem, SIDES, STARTERS } from "~/data/food"

export const metadata: Metadata = {
  title: "Food",
}

function MenuCard({ item }: { item: MenuItem }) {
  const slug = slugify(item.name)
  return (
    <Link href={`/food/${slug}`} className="group">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={`/food/${slug}.jpg`}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-charcoal/70 px-3 py-1 text-sm text-cream/80">
          <Heart className="size-3.5" />
          {item.likes}
        </span>
      </div>
      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-2xl text-cream transition-colors group-hover:text-amber">
            {item.name}
          </h3>
          <span className="font-display text-xl text-amber">
            ${item.price}
          </span>
        </div>
        {item.description && (
          <p className="mt-1 text-sm text-tan">{item.description}</p>
        )}
      </div>
    </Link>
  )
}

function MenuSection({
  label,
  title,
  items,
}: {
  label: string
  title: string
  items: MenuItem[]
}) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="block h-px w-8 shrink-0 bg-amber/50" />
        <span className="text-xs tracking-[0.3em] text-amber uppercase">
          {label}
        </span>
      </div>
      <h2 className="mt-4 font-display text-5xl text-cream md:text-7xl">
        {title}
      </h2>
      <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {items.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}

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

      {/* ── Menu Sections ── */}
      <section className="bg-charcoal py-24 md:py-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-32 px-8 md:px-16">
          <MenuSection label="To Begin" title="Starters" items={STARTERS} />
          <MenuSection label="The Main Event" title="Entrées" items={MAINS} />
          <MenuSection label="On the Side" title="Sides" items={SIDES} />
          <MenuSection label="To Finish" title="Desserts" items={DESSERTS} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8 text-center md:px-16">
          <h2 className="font-display text-4xl text-charcoal md:text-6xl">
            Ready to <span className="italic text-oxblood">dine</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-md text-charcoal/60">
            Pair your meal with something from our cocktail bar or curated
            spirits collection.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-6 [&>a]:w-60 [&>a]:text-center">
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
