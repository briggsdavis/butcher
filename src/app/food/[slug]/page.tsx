import slugify from "@sindresorhus/slugify"
import { ArrowLeft, Heart, MessageCircle } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ALL_FOOD } from "~/data/food"

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

export default async function FoodDetail({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getItem(slug)
  if (!item) notFound()

  return (
    <>
      {/* ── Back ── */}
      <div className="bg-charcoal px-8 pt-28 md:px-16">
        <div className="mx-auto flex max-w-5xl">
          <Link
            href="/food"
            className="flex items-center gap-2 text-sm leading-none tracking-[0.2em] text-tan uppercase transition-colors hover:text-cream"
          >
            <ArrowLeft className="size-4" />
            Back to menu
          </Link>
        </div>
      </div>

      {/* ── Hero Image ── */}
      <section className="bg-charcoal px-8 pt-8 md:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={`/food/${slug}.jpg`}
              alt={item.name}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Details ── */}
      <section className="bg-charcoal px-8 pt-12 pb-16 md:px-16">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs tracking-[0.3em] text-amber uppercase">
            {item.category}
          </span>
          <h1 className="mt-3 font-display text-5xl text-cream md:text-7xl">
            {item.name}
          </h1>
          {item.description && (
            <p className="mt-4 max-w-xl text-lg text-tan">
              {item.description}
            </p>
          )}
          <div className="mt-8 flex items-center gap-8">
            <span className="font-display text-3xl text-amber">
              ${item.price}
            </span>
            <button className="flex items-center gap-2 text-tan/60 transition-colors hover:text-amber">
              <Heart className="size-5" />
              <span className="text-sm">{item.likes}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Comments ── */}
      <section className="bg-oxblood px-8 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <MessageCircle className="size-5 text-amber" />
            <h2 className="font-display text-3xl text-cream">Comments</h2>
          </div>

          {/* Comment Input */}
          <div className="mt-8 border-b border-cream/10 pb-8">
            <textarea
              placeholder="Share your thoughts on this dish..."
              className="w-full resize-none bg-transparent text-cream placeholder:text-tan/40 focus:outline-none"
              rows={3}
            />
            <div className="mt-4 flex justify-end">
              <button className="bg-amber px-6 py-2 text-xs tracking-[0.3em] text-charcoal uppercase transition-colors hover:bg-amber/80">
                Post
              </button>
            </div>
          </div>

          {/* Placeholder Comments */}
          <div className="mt-8 space-y-8">
            {[
              {
                name: "Sarah M.",
                time: "2 days ago",
                text: "Absolutely incredible. The preparation was perfect and the flavors were unforgettable.",
              },
              {
                name: "James K.",
                time: "1 week ago",
                text: "This is why we keep coming back. Worth every penny.",
              },
              {
                name: "Elena R.",
                time: "2 weeks ago",
                text: "Had this on our anniversary dinner. The presentation alone was stunning.",
              },
            ].map((comment) => (
              <div
                key={comment.name}
                className="border-b border-cream/10 pb-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-lg text-cream">
                    {comment.name}
                  </span>
                  <span className="text-xs text-tan/40">{comment.time}</span>
                </div>
                <p className="mt-2 text-tan">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
