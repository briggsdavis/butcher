import { Metadata } from "next"
import { MenuNav } from "~/components/menu-nav"

export const metadata: Metadata = {
  title: "Spirits",
}

const SPIRITS = [
  {
    category: "Whiskey",
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
    items: [
      { name: "Hendrick's", notes: "Scotland", price: "14" },
      { name: "The Botanist", notes: "Islay, Scotland", price: "16" },
      { name: "Monkey 47", notes: "Black Forest, Germany", price: "18" },
    ],
  },
  {
    category: "Rum & Mezcal",
    items: [
      { name: "Diplomatico Reserva Exclusiva", notes: "Venezuela, 12yr", price: "16" },
      { name: "El Silencio Espadin", notes: "Oaxaca, Mexico", price: "13" },
      { name: "Banhez Ensemble", notes: "Oaxaca, Mexico", price: "15" },
    ],
  },
  {
    category: "Cognac & Armagnac",
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
            A thoughtfully assembled collection of world-class whiskeys,
            gins, and rare pours — served neat, on rocks, or in classic form.
          </p>
        </div>
      </section>

      <MenuNav />

      <section className="bg-charcoal py-24 md:py-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-24 px-8 md:px-16">
          {SPIRITS.map(({ category, items }) => (
            <div key={category}>
              <div className="flex items-center gap-4">
                <span className="block h-px w-8 shrink-0 bg-amber/50" />
                <span className="text-xs tracking-[0.3em] text-amber uppercase">
                  {category}
                </span>
              </div>
              <div className="mt-8 divide-y divide-cream/10 border-t border-cream/10">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-baseline justify-between py-5"
                  >
                    <div>
                      <span className="font-display text-xl text-cream">
                        {item.name}
                      </span>
                      <span className="ml-4 text-xs text-tan/50">{item.notes}</span>
                    </div>
                    <span className="font-display text-lg text-amber">
                      ${item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
