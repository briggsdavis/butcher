import { fetchQuery } from "convex/nextjs"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { MenuDetail } from "~/components/menu-detail"
import { api } from "../../../../convex/_generated/api"

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const pretty = slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ")
    return { title: pretty }
  })
}

export default async function FoodDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // Fetch on the server so the item renders in the initial HTML (no
  // post-hydration content swap → no layout shift, faster LCP).
  const [item, allItems, savedValues] = await Promise.all([
    fetchQuery(api.menu.getBySlug, { kind: "food", slug }),
    fetchQuery(api.menu.list, { kind: "food" }),
    fetchQuery(api.site.getCommonValues, {}),
  ])
  if (item === null) notFound()
  return (
    <MenuDetail
      slug={slug}
      basePath="/food"
      backLabel="Back to food"
      notePlaceholder="Leave a review about this dish…"
      item={item}
      allItems={allItems}
      savedValues={savedValues}
    />
  )
}
