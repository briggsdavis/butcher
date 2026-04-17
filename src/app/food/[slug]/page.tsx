import slugify from "@sindresorhus/slugify"
import { ArrowLeft, Heart } from "lucide-react"
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

  const details = [
    { label: "Course", value: item.category },
    { label: "Price", value: `$${item.price}` },
    { label: "Guests Loved", value: `${item.likes}` },
  ]

  return (
    <>
      {/* ── Split layout: image left / details right ── */}
      <section className="bg-charcoal px-8 pt-28 pb-16 md:px-16 md:pt-36 md:pb-24">
        <div className="grid md:grid-cols-2 md:gap-16">
          {/* ── Left: image ── */}
          <div className="relative min-h-[55vw] md:min-h-0">
            <Image
              src={`/food/${slug}.jpg`}
              alt={item.name}
              fill
              priority
              className="object-cover"
            />
            {/* Bottom gradient for caption legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="font-cursive text-xl text-cream md:text-2xl">
                {item.name}
              </p>
              <span className="mt-2 block text-amber/70">✦</span>
            </div>
          </div>

          {/* ── Right: details ── */}
          <div className="flex flex-col justify-center pt-10 md:pt-0">
            {/* Back */}
            <Link
              href="/food"
              className="mb-10 flex w-fit items-center gap-2 text-xs tracking-[0.2em] text-tan/50 uppercase transition-colors hover:text-amber"
            >
              <ArrowLeft className="size-3.5" />
              Back to menu
            </Link>

            {/* Category with decorative line */}
            <div className="flex items-center gap-4">
              <span className="block h-px w-8 shrink-0 bg-amber/50" />
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                {item.category}
              </span>
            </div>

            {/* Name */}
            <h1 className="mt-4 font-display text-[1.8rem] leading-tight text-cream md:text-[2.4rem] lg:text-[3rem]">
              {item.name}
            </h1>

            {/* Description */}
            {item.description && (
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-tan">
                {item.description}
              </p>
            )}

            {/* Detail rows */}
            <div className="mt-10 border-t border-cream/10">
              {details.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-cream/10 py-5"
                >
                  <span className="text-xs tracking-[0.2em] text-cream/45 uppercase">
                    {label}
                    <span className="mx-3 text-cream/20">—</span>
                    {value}
                  </span>
                  <span className="text-lg text-cream/20">+</span>
                </div>
              ))}
            </div>

            {/* Reserve CTA */}
            <div className="mt-10">
              <Link
                href="/#reservations"
                className="flex w-fit items-center gap-3 border border-cream/25 px-8 py-3.5 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
              >
                Reserve a Table
                <Heart className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comments ── */}
      <section className="bg-oxblood px-8 py-16 md:px-16 md:py-24">
        <div>
          {/* Section label */}
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 shrink-0 bg-amber/40" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              Guest Notes
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl text-cream">Comments</h2>

          {/* Comment input */}
          <div className="mt-8 border-b border-cream/10 pb-8">
            <textarea
              placeholder="Share your thoughts on this dish..."
              className="w-full resize-none bg-transparent text-cream placeholder:text-tan/40 focus:outline-none"
              rows={3}
            />
            <div className="mt-4 flex justify-end">
              <button className="bg-amber px-6 py-2 text-xs tracking-[0.3em] text-charcoal uppercase transition-colors hover:bg-cream">
                Post
              </button>
            </div>
          </div>

          {/* Placeholder comments */}
          <div className="mt-8 space-y-0">
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
              <div key={comment.name} className="border-b border-cream/10 py-8">
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
