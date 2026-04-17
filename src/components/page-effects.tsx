"use client"

import { useEffect } from "react"

export function PageEffects() {
  useEffect(() => {
    // Fade-in on scroll via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.transitionDelay = `${el.dataset.delay ?? "0"}ms`
            el.classList.add("in-view")
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 },
    )

    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el))

    // Parallax on scroll
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    )

    const onScroll = () => {
      const viewMid = window.innerHeight / 2

      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed ?? "0.15")

        if (el.dataset.parallax === "hero-bg") {
          // Hero image moves down slower than scroll (classic parallax)
          el.style.transform = `translateY(${window.scrollY * speed}px)`
        } else {
          // General sections: move relative to viewport center for depth
          const rect = el.getBoundingClientRect()
          const elMid = rect.top + rect.height / 2
          el.style.transform = `translateY(${(viewMid - elMid) * speed}px)`
        }
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return null
}
