import { Metadata } from "next"
import { Suspense } from "react"
import { MenuDetail } from "~/components/menu-detail"

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
  return (
    <Suspense>
      <MenuDetail
        kind="food"
        slug={slug}
        basePath="/food"
        backLabel="Back to food"
        notePlaceholder="Leave a note about this dish…"
      />
    </Suspense>
  )
}
