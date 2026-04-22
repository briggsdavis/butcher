import slugify from "@sindresorhus/slugify"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { SpiritDetail } from "./spirit-detail"

const CATEGORY_IMAGES: Record<string, string> = {
  Whiskey: "/whiskey-pour.jpg",
  Gin: "/barmood1.jpg",
  "Rum & Mezcal": "/barmood.jpg",
  "Cognac & Armagnac": "/craft-old-fashioned.jpg",
}

const ALL_SPIRITS = [
  {
    name: "Pappy Van Winkle 15yr",
    notes: "Buffalo, Kentucky",
    price: "65",
    category: "Whiskey",
  },
  {
    name: "Blanton's Original",
    notes: "Buffalo Trace, Kentucky",
    price: "22",
    category: "Whiskey",
  },
  {
    name: "Hibiki 17yr",
    notes: "Suntory, Japan",
    price: "38",
    category: "Whiskey",
  },
  {
    name: "Ardbeg 10yr",
    notes: "Islay, Scotland",
    price: "18",
    category: "Whiskey",
  },
  {
    name: "Buffalo Trace",
    notes: "Buffalo Trace, Kentucky",
    price: "12",
    category: "Whiskey",
  },
  { name: "Hendrick's", notes: "Scotland", price: "14", category: "Gin" },
  {
    name: "The Botanist",
    notes: "Islay, Scotland",
    price: "16",
    category: "Gin",
  },
  {
    name: "Monkey 47",
    notes: "Black Forest, Germany",
    price: "18",
    category: "Gin",
  },
  {
    name: "Diplomatico Reserva Exclusiva",
    notes: "Venezuela, 12yr",
    price: "16",
    category: "Rum & Mezcal",
  },
  {
    name: "El Silencio Espadin",
    notes: "Oaxaca, Mexico",
    price: "13",
    category: "Rum & Mezcal",
  },
  {
    name: "Banhez Ensemble",
    notes: "Oaxaca, Mexico",
    price: "15",
    category: "Rum & Mezcal",
  },
  {
    name: "Rémy Martin VSOP",
    notes: "Cognac, France",
    price: "18",
    category: "Cognac & Armagnac",
  },
  {
    name: "Château de Laubade XO",
    notes: "Armagnac, France",
    price: "28",
    category: "Cognac & Armagnac",
  },
]

function getItem(slug: string) {
  return ALL_SPIRITS.find((item) => slugify(item.name) === slug)
}

export function generateStaticParams() {
  return ALL_SPIRITS.map((item) => ({ slug: slugify(item.name) }))
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

export default async function SpiritDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getItem(slug)
  if (!item) notFound()

  const image = CATEGORY_IMAGES[item.category] ?? "/whiskey-pour.jpg"
  const currentIndex = ALL_SPIRITS.findIndex((i) => slugify(i.name) === slug)
  const prevItem = ALL_SPIRITS[currentIndex - 1] ?? null
  const nextItem = ALL_SPIRITS[currentIndex + 1] ?? null
  const prevSlug = prevItem ? slugify(prevItem.name) : null
  const nextSlug = nextItem ? slugify(nextItem.name) : null

  return (
    <Suspense>
      <SpiritDetail
        item={item}
        image={image}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
      />
    </Suspense>
  )
}
