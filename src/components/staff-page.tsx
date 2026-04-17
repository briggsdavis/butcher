"use client"

import { useEffect, useRef, useState } from "react"
import { STAFF } from "~/data/staff"

export function StaffPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    new Array(STAFF.length).fill(false),
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
    <main className="flex flex-col md:flex-row">
      {/* ── LEFT STICKY PANEL ── */}
      <aside className="relative overflow-hidden bg-oxblood px-10 py-20 md:sticky md:top-0 md:flex md:h-screen md:w-[42%] md:flex-col md:justify-between md:px-12 md:py-16">
        {/* Ambient decorative layer */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(213,137,54,0.1)_0%,_transparent_65%)]" />
          <div className="staff-float absolute right-0 top-24 h-56 w-px bg-gradient-to-b from-transparent via-amber/20 to-transparent" />
          <div
            className="staff-float absolute bottom-28 right-8 h-36 w-px bg-gradient-to-b from-transparent via-amber/10 to-transparent"
            style={{ animationDelay: "3.2s" }}
          />
          <div
            className="staff-float absolute bottom-44 left-6 size-2 rotate-45 border border-amber/15"
            style={{ animationDelay: "1.6s" }}
          />
          <div
            className="staff-float absolute right-14 top-52 size-1.5 rotate-45 bg-amber/20"
            style={{ animationDelay: "4.1s" }}
          />
        </div>

        {/* Top content */}
        <div className="relative z-10">
          <div className="mb-8 flex items-center gap-4">
            <span className="block h-px w-10 shrink-0 bg-amber/50" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              Our Staff
            </span>
          </div>

          <h1 className="font-display text-5xl leading-tight text-cream md:text-6xl">
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
            className="mt-2 h-px w-16 bg-amber/35"
            style={{
              animation: "drawLine 1s ease 0.7s both",
              transformOrigin: "left",
            }}
          />

          <p className="mt-10 text-sm leading-relaxed text-tan">
            Every dish, cocktail, and evening at Butcher and the Rye is shaped
            by people who have devoted their lives to their craft — rigorously
            trained, endlessly inspired, and driven by one goal: to give you
            something extraordinary.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-tan">
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
                style={{ fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)" }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="ml-2 text-sm text-cream/30">
                / {String(STAFF.length).padStart(2, "0")}
              </span>
            </p>
            <p className="mt-1 text-[10px] tracking-[0.2em] text-tan/60 uppercase">
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
            {/* Ghost index number */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 select-none font-display leading-none text-cream/[0.03]"
              style={{ fontSize: "clamp(8rem, 22vw, 18rem)" }}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Top rule */}
            <div
              className={`mb-10 h-px w-14 origin-left bg-amber/30 transition-all duration-700 ${
                revealed[i] ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
            />

            {/* Portrait */}
            <div
              className={`transition-all duration-700 ${
                revealed[i]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "80ms" }}
            >
              <div className="relative mx-auto mb-10 h-72 w-56 md:h-80 md:w-64">
                {/* Ambient glow behind portrait */}
                <div
                  className={`absolute -inset-5 rounded-sm bg-amber/[0.04] blur-sm transition-all duration-1000 ${
                    revealed[i] ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: "500ms" }}
                />
                {/* Outer accent border */}
                <div
                  className={`absolute -inset-[7px] rounded-sm border border-amber/20 transition-all duration-700 ${
                    revealed[i] ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}
                  style={{ transitionDelay: "320ms" }}
                />
                {/* Portrait card */}
                <div className="relative h-full w-full overflow-hidden rounded-sm bg-gradient-to-br from-oxblood via-[#2a1015] to-charcoal">
                  {/* SVG grain overlay */}
                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <filter id={`grain-${i}`}>
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.85"
                        numOctaves="4"
                        stitchTiles="stitch"
                      />
                    </filter>
                    <rect
                      width="100%"
                      height="100%"
                      filter={`url(#grain-${i})`}
                    />
                  </svg>
                  {/* Initials */}
                  <div className="flex h-full items-center justify-center">
                    <span className="select-none font-display text-8xl text-amber/50">
                      {member.initials}
                    </span>
                  </div>
                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-charcoal/30 to-transparent" />
                </div>
              </div>
            </div>

            {/* Name */}
            <div
              className={`transition-all duration-700 ${
                revealed[i]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <h2 className="text-center font-display text-4xl text-cream md:text-5xl">
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

            {/* Divider */}
            <div
              className={`my-7 h-px w-12 origin-center bg-amber/30 transition-all duration-700 ${
                revealed[i] ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
              style={{ transitionDelay: "430ms" }}
            />

            {/* Quote */}
            <div
              className={`transition-all duration-700 ${
                revealed[i]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "540ms" }}
            >
              <blockquote className="max-w-xs text-center font-display text-lg italic leading-relaxed text-cream/60">
                &ldquo;{member.quote}&rdquo;
              </blockquote>
            </div>

            {/* Specialty */}
            <div
              className={`transition-all duration-700 ${
                revealed[i]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: "660ms" }}
            >
              <p className="mt-5 text-center text-[10px] tracking-[0.22em] text-tan/50 uppercase">
                {member.specialty}
              </p>
            </div>

            {/* Experience badge */}
            <div
              className={`mt-6 transition-all duration-500 ${
                revealed[i] ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "780ms" }}
            >
              <div className="inline-flex items-center gap-3 border border-cream/10 px-5 py-2">
                <span className="text-[10px] tracking-[0.25em] text-cream/30 uppercase">
                  Experience
                </span>
                <span className="h-3 w-px bg-cream/10" />
                <span className="text-[10px] tracking-wider text-amber/70">
                  {member.years}
                </span>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
