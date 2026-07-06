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

export default async function SpiritDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <Suspense>
      <MenuDetail
        kind="spirit"
        slug={slug}
        basePath="/spirits"
        backLabel="Back to spirits"
        priceLabel="Pour"
        notePlaceholder="Leave a note about this pour…"
      />
    </Suspense>
  )
}
