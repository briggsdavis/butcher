import { Metadata } from "next"
import { MenuNav } from "~/components/menu-nav"

export const metadata: Metadata = {
  title: "Beverages",
}

const BEVERAGES = [
  {
    category: "Cocktails",
    items: [
      { name: "Old Fashioned", notes: "Bourbon, demerara, Angostura, orange", price: "16" },
      { name: "Rye Negroni", notes: "Rye, Campari, sweet vermouth, expressed orange", price: "15" },
      { name: "Smoked Manhattan", notes: "Bulleit Rye, Carpano Antica, cherry bitters", price: "18" },
      { name: "Paper Plane", notes: "Bourbon, Aperol, Amaro Nonino, lemon", price: "16" },
      { name: "Butcher's Mule", notes: "Vodka, ginger beer, lime, house bitters", price: "13" },
      { name: "Seasonal Spritz", notes: "Ask your server for today's selection", price: "14" },
    ],
  },
  {
    category: "Wine — Red",
    items: [
      { name: "Caymus Cabernet Sauvignon", notes: "Napa Valley, 2021", price: "24" },
      { name: "Château Pichon Baron", notes: "Pauillac, Bordeaux, 2018", price: "38" },
      { name: "Meiomi Pinot Noir", notes: "California, 2022", price: "15" },
    ],
  },
  {
    category: "Wine — White & Sparkling",
    items: [
      { name: "Rombauer Chardonnay", notes: "Carneros, Napa, 2022", price: "18" },
      { name: "Whispering Angel Rosé", notes: "Provence, France, 2023", price: "16" },
      { name: "Ruinart Blanc de Blancs", notes: "Champagne, France, NV", price: "32" },
    ],
  },
  {
    category: "Non-Alcoholic",
    items: [
      { name: "House Lemonade", notes: "Fresh-squeezed, thyme, sea salt", price: "7" },
      { name: "Sparkling Water", notes: "San Pellegrino, 750ml", price: "6" },
      { name: "Cold Brew Coffee", notes: "Single origin, unsweetened", price: "6" },
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
            Cocktails crafted with intention, wines chosen for the table,
            and non-alcoholic options that stand on their own.
          </p>
        </div>
      </section>

      <MenuNav />

      <section className="bg-charcoal py-24 md:py-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-24 px-8 md:px-16">
          {BEVERAGES.map(({ category, items }) => (
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
