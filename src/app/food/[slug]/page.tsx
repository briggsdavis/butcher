import slugify from "@sindresorhus/slugify"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ALL_FOOD } from "~/data/food"
import { FoodDetail } from "./food-detail"

function getItem(slug: string) {
  return ALL_FOOD.find((item) => slugify(item.name) === slug)
}

export function generateStaticParams() {
  return ALL_FOOD.map((item) => ({ slug: slugify(item.name) }))
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

export default async function FoodDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getItem(slug)
  if (!item) notFound()

  const currentIndex = ALL_FOOD.findIndex((i) => slugify(i.name) === slug)
  const nextItem = ALL_FOOD[currentIndex + 1] ?? null
  const nextSlug = nextItem ? slugify(nextItem.name) : null

  return (
    <Suspense>
      <FoodDetail item={item} slug={slug} nextSlug={nextSlug} />
    </Suspense>
  )
}
