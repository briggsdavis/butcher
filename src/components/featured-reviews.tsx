"use client"

import { useEffect, useState } from "react"

type FeaturedReview = {
  _id: string
  name: string
  body: string
  itemName: string | null
}

export function FeaturedReviews({ reviews }: { reviews: FeaturedReview[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [timerResetKey, setTimerResetKey] = useState(0)
  const active = reviews[activeIndex]

  useEffect(() => {
    if (reviews.length <= 1) return
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % reviews.length)
    }, 10000)
    return () => window.clearInterval(timer)
  }, [reviews.length, timerResetKey])

  useEffect(() => {
    if (activeIndex >= reviews.length) setActiveIndex(0)
  }, [activeIndex, reviews.length])

  if (!active) return null

  return (
    <section data-wipe className="bg-charcoal px-8 py-12 md:px-16 md:py-16">
      <div data-animate="" className="mx-auto max-w-4xl text-center">
        <div className="flex items-center justify-center gap-6">
          <span className="block h-px w-12 shrink-0 bg-amber/30" />
          <span className="text-sm text-amber uppercase">Featured Reviews</span>
          <span className="block h-px w-12 shrink-0 bg-amber/30" />
        </div>

        <div className="mt-6">
          <blockquote key={active._id}>
            <p className="heading-emboss font-display text-3xl text-cream md:text-5xl">
              &ldquo;{active.body}&rdquo;
            </p>
            <cite className="mt-4 block text-xs text-tan/70 uppercase not-italic">
              {active.name}
              {active.itemName ? ` · ${active.itemName}` : ""}
            </cite>
          </blockquote>
        </div>

        {reviews.length > 1 && (
          <div className="mt-10 flex items-center justify-center" aria-label="Featured review">
            {reviews.map((review, index) => (
              <button
                key={review._id}
                type="button"
                aria-label={`Show review ${index + 1}`}
                aria-pressed={index === activeIndex}
                onClick={() => {
                  setActiveIndex(index)
                  setTimerResetKey((key) => key + 1)
                }}
                className="grid place-items-center p-2.5"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    index === activeIndex ? "w-8 bg-amber" : "w-1.5 bg-tan/35 hover:bg-tan/60"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
