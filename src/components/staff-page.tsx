"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { STAFF } from "~/data/staff"

export function StaffPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    Array.from({ length: STAFF.length }, () => false),
  )
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index)
              setRevealed((prev) => {
                if (prev[index]) return prev
                const next = [...prev]
                next[index] = true
                return next
              })
            }
          })
        },
        { threshold: 0.45 },
      )
      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((obs) => obs?.disconnect())
    }
  }, [])

  const activeMember = STAFF[activeIndex]

  return (
    <>
      <main className="flex flex-col md:flex-row">
        {/* ── LEFT STICKY PANEL ── */}
        {/*
         * px-8 md:px-16 aligns content left edge with the nav hamburger button.
         * pt-24 clears the absolute-positioned nav bar (~62px tall).
         */}
        <aside className="relative overflow-hidden bg-oxblood px-8 pt-24 pb-16 md:sticky md:top-0 md:flex md:h-screen md:w-[42%] md:flex-col md:justify-center md:px-16 md:pt-24 md:pb-16">
          {/* Top content */}
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                Our Staff
              </span>
            </div>

            <h1
              className="font-display leading-tight text-cream"
              style={{ fontSize: "clamp(2.185rem, 4.025vw, 2.76rem)" }}
            >
              The People
              <br />
              <span
                className="font-cursive text-amber"
                style={{ fontSize: "0.88em" }}
              >
                Behind
              </span>
              <br />
              the Craft
            </h1>

            <div
              className="mt-2 h-px w-14 bg-amber/35"
              style={{
                animation: "drawLine 1s ease 0.7s both",
                transformOrigin: "left",
              }}
            />

            <p className="mt-8 text-sm leading-relaxed text-tan">
              Every dish, cocktail, and evening at Butcher and the Rye is shaped
              by people who have devoted their lives to their craft. Rigorously
              trained, endlessly inspired, and driven by one goal: to give you
              something extraordinary.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-tan">
              From our Executive Chef to our floor staff, everyone here shares
              the same relentless commitment to excellence. We don't settle for
              good. We pursue perfect, every single night.
            </p>
          </div>

          {/* Progress indicator — desktop only */}
          <div className="relative z-10 mt-12 hidden items-end gap-6 md:flex">
            <div className="flex flex-col items-center gap-[5px]">
              {STAFF.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-500 ease-out ${
                    i === activeIndex
                      ? "h-7 w-[3px] bg-amber"
                      : i < activeIndex
                        ? "h-[5px] w-[3px] bg-amber/40"
                        : "h-[5px] w-[3px] bg-cream/20"
                  }`}
                />
              ))}
            </div>
            <div>
              <p className="font-display">
                <span
                  className="text-amber"
                  style={{ fontSize: "clamp(1.4rem, 2vw, 1.9rem)" }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="ml-2 text-xs text-cream/30">
                  / {String(STAFF.length).padStart(2, "0")}
                </span>
              </p>
              <p className="mt-1 text-xs tracking-[0.2em] text-tan/60 uppercase">
                {activeMember.role}
              </p>
            </div>
          </div>
        </aside>

        {/* ── RIGHT SCROLLABLE PANEL ── */}
        <div className="flex-1 bg-charcoal">
          {STAFF.map((member, i) => (
            <section
              key={member.name}
              ref={(el) => {
                sectionRefs.current[i] = el
              }}
              className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-10 py-24"
            >
              {/* Top rule */}
              <div
                className={`mb-8 h-px w-14 origin-left bg-amber/30 transition-all duration-700 ${
                  revealed[i]
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0"
                }`}
              />

              {/* Headshot — 20% larger than original (h-72 w-56 → h-[22rem] w-[17rem]) */}
              <div
                className={`transition-all duration-700 ${
                  revealed[i]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: "80ms" }}
              >
                <div className="relative mx-auto mb-8 h-[22rem] w-[17rem] md:h-96 md:w-[19rem]">
                  {/* Outer accent border */}
                  <div
                    className={`absolute -inset-[7px] rounded-sm border border-amber/20 transition-all duration-700 ${
                      revealed[i]
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-0"
                    }`}
                    style={{ transitionDelay: "320ms" }}
                  />
                  {/* Ambient glow */}
                  <div
                    className={`absolute -inset-5 rounded-sm bg-amber/[0.04] blur-sm transition-all duration-1000 ${
                      revealed[i] ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "500ms" }}
                  />
                  {/* Headshot image */}
                  <div className="relative h-full w-full overflow-hidden rounded-sm">
                    <Image
                      src={member.headshot}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                    {/* Bottom fade */}
                    <div className="absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t from-charcoal/20 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Name — 20% smaller than original text-4xl md:text-5xl */}
              <div
                className={`transition-all duration-700 ${
                  revealed[i]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <h2 className="text-center font-display text-3xl text-cream md:text-4xl">
                  {member.name}
                </h2>
              </div>

              {/* Role */}
              <div
                className={`transition-all duration-700 ${
                  revealed[i]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: "320ms" }}
              >
                <p className="mt-3 text-center text-xs tracking-[0.3em] text-amber uppercase">
                  {member.role}
                </p>
              </div>

              {/* Experience badge */}
              <div
                className={`mt-5 transition-all duration-500 ${
                  revealed[i] ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: "440ms" }}
              >
                <div className="inline-flex items-center gap-3 border border-cream/10 px-5 py-2">
                  <span className="text-xs tracking-[0.25em] text-cream/30 uppercase">
                    Experience
                  </span>
                  <span className="h-3 w-px bg-cream/10" />
                  <span className="text-xs tracking-wider text-amber/70">
                    {member.years}
                  </span>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* ── RESERVE CTA ── */}
      <section className="flex items-center justify-center bg-cream py-32 text-center md:py-48">
        <div className="max-w-xl px-8 md:px-16">
          <div className="mb-8 flex items-center justify-center gap-6">
            <span className="block h-px w-12 shrink-0 bg-oxblood/20" />
            <span className="text-xs tracking-[0.3em] text-oxblood/50 uppercase">
              Join Us
            </span>
            <span className="block h-px w-12 shrink-0 bg-oxblood/20" />
          </div>
          <h2 className="font-display text-5xl leading-tight text-charcoal md:text-7xl">
            Reserve your
            <br />
            <span className="text-oxblood italic">evening</span>
          </h2>
          <p className="mx-auto mt-8 max-w-md text-lg text-charcoal/60">
            Our team is ready to welcome you. Book your table at Butcher and the
            Rye.
          </p>
          <Link
            href="/#reservations"
            className="mt-12 inline-block bg-oxblood px-12 py-5 text-xs font-medium tracking-[0.3em] text-cream uppercase transition-colors hover:bg-charcoal"
          >
            Reserve Now
          </Link>
        </div>
      </section>
    </>
  )
}
