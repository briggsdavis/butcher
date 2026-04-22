"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

interface SpiritItem {
  name: string
  notes: string
  price: string
  category: string
}

interface Props {
  item: SpiritItem
  image: string
  prevSlug: string | null
  nextSlug: string | null
}

export function SpiritDetail({ item, image, prevSlug, nextSlug }: Props) {
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)
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

  function handleNext() {
    if (!nextSlug || exitDir) return
    setExitDir("next")
    setTimeout(() => router.push(`/spirits/${nextSlug}?dir=next`), 350)
  }

  function handlePrev() {
    if (!prevSlug || exitDir) return
    setExitDir("prev")
    setTimeout(() => router.push(`/spirits/${prevSlug}?dir=prev`), 350)
  }

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
            {/* Nav row */}
            <div className="mb-10 flex items-center justify-between">
              <Link
                href="/spirits"
                className="flex items-center gap-2 text-xs tracking-[0.2em] text-tan/50 uppercase transition-colors hover:text-amber"
              >
                <ArrowLeft className="size-3.5" />
                Back to spirits
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

            {/* Notes */}
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-tan">
              {item.notes}
            </p>

            {/* Detail rows */}
            <div className="mt-10 border-t border-cream/10">
              <div className="flex items-center justify-between border-b border-cream/10 py-5">
                <span className="text-xs tracking-[0.2em] text-cream/45 uppercase">
                  Price
                  <span className="mx-3 text-cream/20">—</span>${item.price}
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
