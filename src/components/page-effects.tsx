"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function PageEffects() {
  const pathname = usePathname()

  useEffect(() => {
    // ── Fade-in on scroll ──────────────────────────────────────────────────
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.transitionDelay = `${el.dataset.delay ?? "0"}ms`
            el.classList.add("in-view")
            fadeObserver.unobserve(el)
          }
        })
      },
      { threshold: 0.12 },
    )

    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => fadeObserver.observe(el))

    // ── Wipe-up section reveal ─────────────────────────────────────────────
    const wipeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add("wiped")
            wipeObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.04 },
    )

    document
      .querySelectorAll("[data-wipe]")
      .forEach((el) => wipeObserver.observe(el))

    // ── Parallax on scroll ─────────────────────────────────────────────────
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    )

    const onScroll = () => {
      const viewMid = window.innerHeight / 2

      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed ?? "0.15")

        if (el.dataset.parallax === "hero-bg") {
          // Simple translateY — no scale needed (parent uses % overflow for buffer)
          el.style.transform = `translateY(${window.scrollY * speed}px)`
        } else {
          const rect = el.getBoundingClientRect()
          const elMid = rect.top + rect.height / 2
          el.style.transform = `translateY(${(viewMid - elMid) * speed}px)`
        }
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      fadeObserver.disconnect()
      wipeObserver.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [pathname])

  return null
}
