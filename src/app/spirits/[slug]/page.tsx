import slugify from "@sindresorhus/slugify"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { SpiritDetail } from "~/components/spirit-detail"

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

const ALL_SPIRITS = SPIRITS.flatMap((group) =>
  group.items.map((item) => ({
    ...item,
    category: group.category,
    label: group.label,
  })),
)

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

  const currentIndex = ALL_SPIRITS.findIndex((i) => slugify(i.name) === slug)
  const prevItem = ALL_SPIRITS[currentIndex - 1] ?? null
  const nextItem = ALL_SPIRITS[currentIndex + 1] ?? null
  const prevSlug = prevItem ? slugify(prevItem.name) : null
  const nextSlug = nextItem ? slugify(nextItem.name) : null

  return (
    <Suspense>
      <SpiritDetail item={item} prevSlug={prevSlug} nextSlug={nextSlug} />
    </Suspense>
  )
}
