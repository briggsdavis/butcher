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

export default async function BeverageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <Suspense>
      <MenuDetail
        kind="beverage"
        slug={slug}
        basePath="/beverages"
        backLabel="Back to beverages"
        notePlaceholder="Leave a review about this pour…"
      />
    </Suspense>
  )
}
