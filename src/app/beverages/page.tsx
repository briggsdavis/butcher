import slugify from "@sindresorhus/slugify"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MenuNav } from "~/components/menu-nav"

export const metadata: Metadata = {
  title: "Beverages",
}

const CATEGORY_IMAGES: Record<string, string> = {
  Cocktails: "/craft-old-fashioned.jpg",
  "Wine — Red": "/whiskey-pour.jpg",
  "White & Sparkling": "/barmood1.jpg",
  "Non-Alcoholic": "/barmood.jpg",
}

const BEVERAGES = [
  {
    category: "Cocktails",
    label: "Crafted",
    items: [
      {
        name: "Old Fashioned",
        notes: "Bourbon, demerara, Angostura, orange",
        price: "16",
      },
      {
        name: "Rye Negroni",
        notes: "Rye, Campari, sweet vermouth, expressed orange",
        price: "15",
      },
      {
        name: "Smoked Manhattan",
        notes: "Bulleit Rye, Carpano Antica, cherry bitters",
        price: "18",
      },
      {
        name: "Paper Plane",
        notes: "Bourbon, Aperol, Amaro Nonino, lemon",
        price: "16",
      },
      {
        name: "Butcher's Mule",
        notes: "Vodka, ginger beer, lime, house bitters",
        price: "13",
      },
      {
        name: "Seasonal Spritz",
        notes: "Ask your server for today's selection",
        price: "14",
      },
    ],
  },
  {
    category: "Wine — Red",
    label: "The Cellar",
    items: [
      {
        name: "Caymus Cabernet Sauvignon",
        notes: "Napa Valley, 2021",
        price: "24",
      },
      {
        name: "Château Pichon Baron",
        notes: "Pauillac, Bordeaux, 2018",
        price: "38",
      },
      { name: "Meiomi Pinot Noir", notes: "California, 2022", price: "15" },
    ],
  },
  {
    category: "White & Sparkling",
    label: "Light & Bright",
    items: [
      {
        name: "Rombauer Chardonnay",
        notes: "Carneros, Napa, 2022",
        price: "18",
      },
      {
        name: "Whispering Angel Rosé",
        notes: "Provence, France, 2023",
        price: "16",
      },
      {
        name: "Ruinart Blanc de Blancs",
        notes: "Champagne, France, NV",
        price: "32",
      },
    ],
  },
  {
    category: "Non-Alcoholic",
    label: "Zero Proof",
    items: [
      {
        name: "House Lemonade",
        notes: "Fresh-squeezed, thyme, sea salt",
        price: "7",
      },
      { name: "Sparkling Water", notes: "San Pellegrino, 750ml", price: "6" },
      {
        name: "Cold Brew Coffee",
        notes: "Single origin, unsweetened",
        price: "6",
      },
    ],
  },
]

export default function Beverages() {
  return (
    <>
      <section className="flex flex-col justify-end bg-oxblood px-8 pt-32 pb-20 md:px-16 md:pt-48 md:pb-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 shrink-0 bg-amber/50" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              The Bar
            </span>
          </div>
          <h1 className="mt-4 font-display text-6xl leading-none text-cream md:text-9xl">
            Beverages
          </h1>
          <p className="mt-6 max-w-lg text-lg text-tan">
            Cocktails crafted with intention, wines chosen for the table, and
            non-alcoholic options that stand on their own.
          </p>
        </div>
      </section>

      <MenuNav />

      {BEVERAGES.map(({ category, label, items }, bi) => {
        const dark = bi % 2 === 0
        const thumb = CATEGORY_IMAGES[category] ?? "/barmood.jpg"
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
                <span
                  className={`text-xs tracking-[0.3em] uppercase ${dark ? "text-oxblood" : "text-amber"}`}
                >
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
                {items.map((item, i) => (
                  <Link
                    key={item.name}
                    href={`/beverages/${slugify(item.name)}`}
                    data-animate=""
                    data-delay={String(180 + i * 60)}
                    className="group flex items-center gap-5 py-4"
                  >
                    {/* Square thumbnail — container grows 30% on hover */}
                    <div className="relative size-14 shrink-0 transition-all duration-300 ease-out group-hover:size-[73px]">
                      <Image
                        src={thumb}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Name + notes */}
                    <div className="flex flex-1 items-baseline justify-between">
                      <div>
                        <span
                          className={`font-display text-base transition-colors duration-200 ${
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
                          {item.notes}
                        </span>
                      </div>
                      <span
                        className={`font-display text-[0.9rem] ${dark ? "text-oxblood" : "text-amber"}`}
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
