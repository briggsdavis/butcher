import slugify from "@sindresorhus/slugify"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { TiltCard } from "~/components/tilt-card"
export const metadata: Metadata = {
  title: "Spirits",
}

const SPIRITS = [
  {
    category: "Whiskey",
    label: "The Cellar",
    items: [
      {
        name: "Pappy Van Winkle 15yr",
        notes: "Buffalo, Kentucky",
        price: "65",
      },
      {
        name: "Blanton's Original",
        notes: "Buffalo Trace, Kentucky",
        price: "22",
      },
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
      {
        name: "Diplomatico Reserva Exclusiva",
        notes: "Venezuela, 12yr",
        price: "16",
      },
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
      <div className="h-20 md:h-24" />

      <section className="bg-charcoal pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {[
              { src: "/whiskey-pour.jpg", alt: "Whiskey pour", rotate: -2.5 },
              {
                src: "/bar-brass-glow.jpg",
                alt: "Brass-lit bar",
                rotate: 1.5,
              },
              {
                src: "/bartender-at-work.jpg",
                alt: "Bartender at work",
                rotate: -1.5,
              },
              { src: "/barmood.jpg", alt: "Bar mood", rotate: 2.5 },
            ].map((img) => (
              <TiltCard
                key={img.src}
                initialRotate={img.rotate}
                maxTilt={5}
                className="bg-cream p-2 pb-8 shadow-2xl md:p-3 md:pb-10"
              >
                <div className="img-inset-shadow relative aspect-square overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="img-zoom object-cover"
                  />
                </div>
              </TiltCard>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="#"
              className="inline-block border border-amber px-10 py-4 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)]"
            >
              View Menu PDF
            </Link>
          </div>
        </div>
      </section>

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
                  className={`text-xs uppercase ${dark ? "text-oxblood" : "text-amber"}`}
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
                  <span
                    key={item.name}
                    data-animate=""
                    data-delay={String(180 + i * 60)}
                    className="block"
                  >
                    <Link
                      href={`/spirits/${slugify(item.name)}`}
                      className={`group flex items-baseline justify-between py-5 transition-all duration-300 hover:translate-x-2 ${
                        dark ? "hover:text-oxblood" : "hover:text-amber"
                      }`}
                    >
                      <div>
                        <span
                          className={`font-subhead text-base transition-colors duration-500 ${
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
                        className={`font-subhead text-sm ${dark ? "text-oxblood" : "text-amber"}`}
                      >
                        ${item.price}
                      </span>
                    </Link>
                  </span>
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
