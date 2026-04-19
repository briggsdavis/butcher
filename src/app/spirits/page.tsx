import slugify from "@sindresorhus/slugify"
import { Metadata } from "next"
import Link from "next/link"
import { MenuNav } from "~/components/menu-nav"

export const metadata: Metadata = {
  title: "Spirits",
}

const SPIRITS = [
  {
    category: "Whiskey",
    label: "The Cellar",
    items: [
      { name: "Pappy Van Winkle 15yr", notes: "Buffalo, Kentucky", price: "65" },
      { name: "Blanton's Original", notes: "Buffalo Trace, Kentucky", price: "22" },
      { name: "Hibiki 17yr", notes: "Suntory, Japan", price: "38" },
      { name: "Ardbeg 10yr", notes: "Islay, Scotland", price: "18" },
      { name: "Buffalo Trace", notes: "Buffalo Trace, Kentucky", price: "12" },
    ],
  },
  {
    category: "Gin",
    label: "Botanical",
    items: [
      { name: "Hendrick's", notes: "Scotland", price: "14" },
      { name: "The Botanist", notes: "Islay, Scotland", price: "16" },
      { name: "Monkey 47", notes: "Black Forest, Germany", price: "18" },
    ],
  },
  {
    category: "Rum & Mezcal",
    label: "Smoke & Cane",
    items: [
      { name: "Diplomatico Reserva Exclusiva", notes: "Venezuela, 12yr", price: "16" },
      { name: "El Silencio Espadin", notes: "Oaxaca, Mexico", price: "13" },
      { name: "Banhez Ensemble", notes: "Oaxaca, Mexico", price: "15" },
    ],
  },
  {
    category: "Cognac & Armagnac",
    label: "Aged & Noble",
    items: [
      { name: "Rémy Martin VSOP", notes: "Cognac, France", price: "18" },
      { name: "Château de Laubade XO", notes: "Armagnac, France", price: "28" },
    ],
  },
]

export default function Spirits() {
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
            Spirits
          </h1>
          <p className="mt-6 max-w-lg text-lg text-tan">
            A thoughtfully assembled collection of world-class whiskeys, gins,
            and rare pours — served neat, on rocks, or in classic form.
          </p>
        </div>
      </section>

      <MenuNav />

      {SPIRITS.map(({ category, label, items }, si) => {
        const dark = si % 2 === 0
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
                    href={`/spirits/${slugify(item.name)}`}
                    data-animate=""
                    data-delay={String(180 + i * 60)}
                    className={`group flex items-baseline justify-between py-5 transition-colors duration-200 ${
                      dark ? "hover:text-oxblood" : "hover:text-amber"
                    }`}
                  >
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
