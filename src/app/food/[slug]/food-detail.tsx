"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import type { MenuItem } from "~/data/food"

interface Props {
  item: MenuItem
  slug: string
  prevSlug: string | null
  nextSlug: string | null
}

export function FoodDetail({ item, slug, prevSlug, nextSlug }: Props) {
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [likes, setLikes] = useState(item.likes)
  const [liked, setLiked] = useState(false)
  const [exitDir, setExitDir] = useState<"next" | "prev" | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const dir = params.get("dir")
    const el = wrapperRef.current
    if (!el || (dir !== "next" && dir !== "prev")) return
    const cls = dir === "next" ? "food-enter" : "food-enter-prev"
    el.classList.add(cls)
    const onEnd = () => el.classList.remove(cls)
    el.addEventListener("animationend", onEnd, { once: true })
  }, [])

  function handleLike() {
    if (liked) return
    setLikes((n) => n + 1)
    setLiked(true)
  }

  function handleNext() {
    if (!nextSlug || exitDir) return
    setExitDir("next")
    setTimeout(() => router.push(`/food/${nextSlug}?dir=next`), 350)
  }

  function handlePrev() {
    if (!prevSlug || exitDir) return
    setExitDir("prev")
    setTimeout(() => router.push(`/food/${prevSlug}?dir=prev`), 350)
  }

  const staticDetails = [
    { label: "Course", value: item.category },
    { label: "Price", value: `$${item.price}` },
  ]

  const exitClass =
    exitDir === "next"
      ? "food-exit"
      : exitDir === "prev"
        ? "food-exit-prev"
        : ""

  return (
    <div ref={wrapperRef} className={exitClass}>
      {/* ── Split layout: image left / details right ── */}
      <section className="flex min-h-screen flex-col justify-center bg-charcoal px-8 pt-28 pb-10 md:px-16">
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
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          </div>

          {/* ── Right: details ── */}
          <div className="flex flex-col justify-center pt-10 md:pt-0">
            {/* Nav row */}
            <div className="mb-10 flex items-center justify-between">
              <Link
                href="/food"
                className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/50 uppercase transition-colors hover:text-amber"
              >
                <ArrowLeft className="size-3.5" />
                Back to menu
              </Link>
              <div className="flex items-center gap-6">
                {prevSlug && (
                  <button
                    onClick={handlePrev}
                    disabled={!!exitDir}
                    className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/50 uppercase transition-colors hover:text-amber disabled:pointer-events-none"
                  >
                    <ArrowLeft className="size-3.5" />
                    Prev
                  </button>
                )}
                {nextSlug && (
                  <button
                    onClick={handleNext}
                    disabled={!!exitDir}
                    className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/50 uppercase transition-colors hover:text-amber disabled:pointer-events-none"
                  >
                    Next
                    <ArrowRight className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Name */}
            <h1 className="font-display text-3xl leading-tight text-cream md:text-4xl lg:text-5xl">
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
              {staticDetails.map(({ label, value }) => (
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

              {/* Guests Loved — click to like */}
              <button
                onClick={handleLike}
                className="group flex w-full items-center justify-between border-b border-cream/10 py-5 text-left transition-colors hover:border-amber/20"
              >
                <span
                  className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                    liked ? "text-amber" : "text-cream/45"
                  }`}
                >
                  Guests Loved
                  <span className="mx-3 text-cream/20">—</span>
                  {likes}
                </span>
                <span
                  className={`text-base transition-all duration-300 ${
                    liked
                      ? "scale-110 text-amber"
                      : "text-cream/20 group-hover:text-cream/50"
                  }`}
                >
                  ♥
                </span>
              </button>
            </div>

            {/* Reserve CTA */}
            <div className="mt-10">
              <Link
                href="/#reservations"
                className="flex w-fit items-center gap-3 border border-cream/25 px-8 py-3.5 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
              >
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comments ── */}
      <section className="bg-oxblood px-8 py-16 md:px-16 md:py-24">
        <div>
          <div className="flex items-center gap-4">
            <span className="block h-px w-8 shrink-0 bg-amber/40" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              Guest Notes
            </span>
          </div>
          <h2 className="mt-3 font-display text-3xl text-cream">Comments</h2>

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
    </div>
  )
}
