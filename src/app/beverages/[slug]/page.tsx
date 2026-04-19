import slugify from "@sindresorhus/slugify"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const CATEGORY_IMAGES: Record<string, string> = {
  Cocktails: "/craft-old-fashioned.jpg",
  "Wine — Red": "/whiskey-pour.jpg",
  "White & Sparkling": "/barmood1.jpg",
  "Non-Alcoholic": "/barmood.jpg",
}

const ALL_BEVERAGES = [
  {
    name: "Old Fashioned",
    notes: "Bourbon, demerara, Angostura, orange",
    price: "16",
    category: "Cocktails",
  },
  {
    name: "Rye Negroni",
    notes: "Rye, Campari, sweet vermouth, expressed orange",
    price: "15",
    category: "Cocktails",
  },
  {
    name: "Smoked Manhattan",
    notes: "Bulleit Rye, Carpano Antica, cherry bitters",
    price: "18",
    category: "Cocktails",
  },
  {
    name: "Paper Plane",
    notes: "Bourbon, Aperol, Amaro Nonino, lemon",
    price: "16",
    category: "Cocktails",
  },
  {
    name: "Butcher's Mule",
    notes: "Vodka, ginger beer, lime, house bitters",
    price: "13",
    category: "Cocktails",
  },
  {
    name: "Seasonal Spritz",
    notes: "Ask your server for today's selection",
    price: "14",
    category: "Cocktails",
  },
  {
    name: "Caymus Cabernet Sauvignon",
    notes: "Napa Valley, 2021",
    price: "24",
    category: "Wine — Red",
  },
  {
    name: "Château Pichon Baron",
    notes: "Pauillac, Bordeaux, 2018",
    price: "38",
    category: "Wine — Red",
  },
  {
    name: "Meiomi Pinot Noir",
    notes: "California, 2022",
    price: "15",
    category: "Wine — Red",
  },
  {
    name: "Rombauer Chardonnay",
    notes: "Carneros, Napa, 2022",
    price: "18",
    category: "White & Sparkling",
  },
  {
    name: "Whispering Angel Rosé",
    notes: "Provence, France, 2023",
    price: "16",
    category: "White & Sparkling",
  },
  {
    name: "Ruinart Blanc de Blancs",
    notes: "Champagne, France, NV",
    price: "32",
    category: "White & Sparkling",
  },
  {
    name: "House Lemonade",
    notes: "Fresh-squeezed, thyme, sea salt",
    price: "7",
    category: "Non-Alcoholic",
  },
  {
    name: "Sparkling Water",
    notes: "San Pellegrino, 750ml",
    price: "6",
    category: "Non-Alcoholic",
  },
  {
    name: "Cold Brew Coffee",
    notes: "Single origin, unsweetened",
    price: "6",
    category: "Non-Alcoholic",
  },
]

function getItem(slug: string) {
  return ALL_BEVERAGES.find((item) => slugify(item.name) === slug)
}

export function generateStaticParams() {
  return ALL_BEVERAGES.map((item) => ({ slug: slugify(item.name) }))
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const item = getItem(slug)
    return { title: item?.name ?? "Not Found" }
  })
}

export default async function BeverageDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getItem(slug)
  if (!item) notFound()

  const image = CATEGORY_IMAGES[item.category] ?? "/barmood.jpg"

  return (
    <>
      {/* Full-width image */}
      <div className="relative h-[65vh] w-full">
        <Image
          src={image}
          alt={item.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-charcoal" />
      </div>

      {/* Details */}
      <section className="bg-charcoal px-8 pb-16 md:px-16 md:pb-24">
        <div className="mx-auto max-w-2xl pt-10 md:pt-14">

          <Link
            href="/beverages"
            className="mb-10 flex w-fit items-center gap-2 text-xs tracking-[0.2em] text-tan/50 uppercase transition-colors hover:text-amber"
          >
            <ArrowLeft className="size-3.5" />
            Back to beverages
          </Link>

          <div className="flex items-center gap-4">
            <span className="block h-px w-8 shrink-0 bg-amber/50" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              {item.category}
            </span>
          </div>

          <h1 className="mt-4 font-display text-[1.8rem] leading-tight text-cream md:text-[2.4rem] lg:text-[3rem]">
            {item.name}
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-tan">{item.notes}</p>

          <div className="mt-10 border-t border-cream/10">
            <div className="flex items-center justify-between border-b border-cream/10 py-5">
              <span className="text-xs tracking-[0.2em] text-cream/45 uppercase">
                Price
                <span className="mx-3 text-cream/20">—</span>
                ${item.price}
              </span>
              <span className="text-lg text-cream/20">+</span>
            </div>
            <div className="flex items-center justify-between border-b border-cream/10 py-5">
              <span className="text-xs tracking-[0.2em] text-cream/45 uppercase">
                Category
                <span className="mx-3 text-cream/20">—</span>
                {item.category}
              </span>
              <span className="text-lg text-cream/20">+</span>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/#reservations"
              className="flex w-fit items-center gap-3 border border-cream/25 px-8 py-3.5 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
