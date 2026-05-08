import slugify from "@sindresorhus/slugify"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { TiltCard } from "~/components/tilt-card"
export const metadata: Metadata = {
  title: "Food",
}

const FOOD = [
  {
    category: "Starters",
    label: "To Begin",
    items: [
      {
        name: "Bone Marrow",
        notes: "Roasted split bones, gremolata, grilled sourdough",
        price: "18",
      },
      {
        name: "Beef Tartare",
        notes: "Hand-cut tenderloin, cured egg yolk, capers, mustard seed",
        price: "22",
      },
      {
        name: "Charred Octopus",
        notes: "Romesco, fingerling potatoes, chorizo vinaigrette",
        price: "24",
      },
      {
        name: "Burrata",
        notes: "Heirloom tomato, basil oil, aged balsamic, grilled bread",
        price: "16",
      },
      {
        name: "Oysters on the Half Shell",
        notes: "Half dozen, mignonette, cocktail sauce, fresh horseradish",
        price: "21",
      },
    ],
  },
  {
    category: "Entrées",
    label: "From the Fire",
    items: [
      {
        name: "Bone-In Ribeye",
        notes: "Dry-aged 45 days, roasted marrow butter",
        price: "68",
      },
      {
        name: "Braised Short Rib",
        notes: "Red wine reduction, root vegetables, horseradish gremolata",
        price: "42",
      },
      {
        name: "Pan-Seared Duck Breast",
        notes: "Cherry gastrique, wild rice, charred broccolini",
        price: "38",
      },
      {
        name: "Grilled Lamb Chops",
        notes: "Herb crust, mint chimichurri, fingerling potatoes",
        price: "54",
      },
      {
        name: "Berkshire Pork Chop",
        notes: "Brined and grilled, apple mostarda, braised greens",
        price: "36",
      },
      {
        name: "Seared Scallops",
        notes: "Cauliflower purée, brown butter, crispy capers, pancetta",
        price: "44",
      },
      {
        name: "Whole Branzino",
        notes: "Wood-grilled, lemon, herbs, olive oil, roasted fennel",
        price: "40",
      },
    ],
  },
  {
    category: "Sides",
    label: "Alongside",
    items: [
      {
        name: "Truffle Fries",
        notes: "Parmesan, chive, black truffle",
        price: "12",
      },
      {
        name: "Creamed Spinach",
        notes: "Slow-stewed, nutmeg, cream",
        price: "10",
      },
      {
        name: "Roasted Bone Marrow Mashed Potatoes",
        notes: "Yukon gold, marrow butter, sea salt",
        price: "14",
      },
      {
        name: "Charred Broccolini",
        notes: "Lemon, chili, garlic",
        price: "11",
      },
      {
        name: "Brussels Sprouts",
        notes: "Bacon, balsamic glaze",
        price: "12",
      },
      {
        name: "Mac & Cheese",
        notes: "Gruyère, white cheddar, breadcrumb crust",
        price: "13",
      },
    ],
  },
  {
    category: "Desserts",
    label: "To Finish",
    items: [
      {
        name: "Bourbon Crème Brûlée",
        notes: "Woodford Reserve custard, torched sugar, shortbread",
        price: "14",
      },
      {
        name: "Chocolate Torte",
        notes: "Flourless, espresso crème, candied hazelnuts",
        price: "15",
      },
      {
        name: "Bread Pudding",
        notes: "Brioche, salted caramel, vanilla bean ice cream",
        price: "13",
      },
    ],
  },
]

export default function Food() {
  return (
    <>
      <div className="h-20 md:h-24" />

      <section className="bg-charcoal pt-16 pb-16 md:pt-24 md:pb-24">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {[
              { src: "/steak.jpg", alt: "Bone-in ribeye", rotate: -2.5 },
              {
                src: "/charcuterie-board.jpg",
                alt: "Charcuterie board",
                rotate: 1.5,
              },
              {
                src: "/plated-entree.jpg",
                alt: "Plated entrée",
                rotate: -1.5,
              },
              {
                src: "/mussels-cream-sauce.jpg",
                alt: "Mussels in cream sauce",
                rotate: 2.5,
              },
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
              className="inline-block border border-cream/30 px-10 py-4 text-xs tracking-[0.3em] text-cream uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-amber hover:text-amber hover:shadow-[0_4px_24px_rgba(213,137,54,0.18)]"
            >
              View Menu PDF
            </Link>
          </div>
        </div>
      </section>

      {FOOD.map(({ category, label, items }, bi) => {
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
                {items.map((item, i) => {
                  const slug = slugify(item.name)
                  return (
                    <Link
                      key={item.name}
                      href={`/food/${slug}`}
                      data-animate=""
                      data-delay={String(180 + i * 60)}
                      className="group flex items-center gap-5 py-4"
                    >
                      <div className="relative size-14 shrink-0 transition-all duration-700 ease-in-out group-hover:size-36">
                        <Image
                          src={`/food/${slug}.jpg`}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
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
                            {item.notes}
                          </span>
                        </div>
                        <span
                          className={`font-subhead text-sm ${dark ? "text-oxblood" : "text-amber"}`}
                        >
                          ${item.price}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
