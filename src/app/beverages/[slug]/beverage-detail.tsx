"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface BeverageItem {
  name: string
  notes: string
  price: string
  category: string
}

interface Props {
  item: BeverageItem
  image: string
  nextSlug: string | null
}

export function BeverageDetail({ item, image, nextSlug }: Props) {
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("dir") !== "next") return
    const el = wrapperRef.current
    if (!el) return
    el.classList.add("food-enter")
    const onEnd = () => el.classList.remove("food-enter")
    el.addEventListener("animationend", onEnd, { once: true })
  }, [])

  function handleNext() {
    if (!nextSlug || exiting) return
    setExiting(true)
    setTimeout(() => {
      router.push(`/beverages/${nextSlug}?dir=next`)
    }, 350)
  }

  return (
    <div ref={wrapperRef} className={exiting ? "food-exit" : ""}>
      {/* ── Split layout: image left / details right ── */}
      <section className="bg-charcoal flex min-h-screen flex-col justify-center px-8 pt-28 pb-10 md:px-16">
        <div className="grid md:grid-cols-2 md:gap-16">

          {/* ── Left: image ── */}
          <div className="relative min-h-[55vw] md:min-h-0">
            <Image
              src={image}
              alt={item.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          </div>

          {/* ── Right: details ── */}
          <div className="flex flex-col justify-center pt-10 md:pt-0">

            {/* Back / Next on the same row */}
            <div className="mb-10 flex items-center justify-between">
              <Link
                href="/beverages"
                className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/50 uppercase transition-colors hover:text-amber"
              >
                <ArrowLeft className="size-3.5" />
                Back to beverages
              </Link>
              {nextSlug && (
                <button
                  onClick={handleNext}
                  disabled={exiting}
                  className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/50 uppercase transition-colors hover:text-amber disabled:pointer-events-none"
                >
                  Next item
                  <ArrowRight className="size-3.5" />
                </button>
              )}
            </div>

            {/* Name */}
            <h1 className="font-display text-[1.8rem] leading-tight text-cream md:text-[2.4rem] lg:text-[3rem]">
              {item.name}
            </h1>

            {/* Notes */}
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-tan">
              {item.notes}
            </p>

            {/* Detail rows */}
            <div className="mt-10 border-t border-cream/10">
              <div className="flex items-center justify-between border-b border-cream/10 py-5">
                <span className="text-xs tracking-[0.2em] text-cream/45 uppercase">
                  Price
                  <span className="mx-3 text-cream/20">—</span>
                  ${item.price}
                </span>
                <span className="text-lg text-cream/20">+</span>
              </div>
              <div className="flex items-center justify-between border-b border-cream/10 py-5">
                <span className="text-xs tracking-[0.2em] text-cream/45 uppercase">
                  Category
                  <span className="mx-3 text-cream/20">—</span>
                  {item.category}
                </span>
                <span className="text-lg text-cream/20">+</span>
              </div>
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
    </div>
  )
}
