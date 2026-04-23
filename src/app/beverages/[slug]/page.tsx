import slugify from "@sindresorhus/slugify"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { BeverageDetail } from "./beverage-detail"

const CATEGORY_IMAGES: Record<string, string> = {
  Cocktails: "/craft-old-fashioned.jpg",
  "Red Wine": "/whiskey-pour.jpg",
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
    category: "Red Wine",
  },
  {
    name: "Château Pichon Baron",
    notes: "Pauillac, Bordeaux, 2018",
    price: "38",
    category: "Red Wine",
  },
  {
    name: "Meiomi Pinot Noir",
    notes: "California, 2022",
    price: "15",
    category: "Red Wine",
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

export default async function BeverageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getItem(slug)
  if (!item) notFound()

  const image = CATEGORY_IMAGES[item.category] ?? "/barmood.jpg"
  const currentIndex = ALL_BEVERAGES.findIndex((i) => slugify(i.name) === slug)
  const prevItem = ALL_BEVERAGES[currentIndex - 1] ?? null
  const nextItem = ALL_BEVERAGES[currentIndex + 1] ?? null
  const prevSlug = prevItem ? slugify(prevItem.name) : null
  const nextSlug = nextItem ? slugify(nextItem.name) : null

  return (
    <Suspense>
      <BeverageDetail
        item={item}
        image={image}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
    </Suspense>
  )
}
