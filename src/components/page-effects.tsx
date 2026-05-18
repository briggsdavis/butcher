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
      { threshold: 0.15, rootMargin: "0px 0px -18% 0px" },
    )

    const observeFadeTargets = (root: ParentNode) => {
      root.querySelectorAll("[data-animate]").forEach((el) => {
        if (!el.classList.contains("in-view")) fadeObserver.observe(el)
      })
    }
    observeFadeTargets(document)

    // Pick up [data-animate] elements added after first paint (e.g. async
    // queries rendering list rows). Without this, late-arriving content stays
    // at opacity 0 because the IntersectionObserver was never attached to it.
    const mutationObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return
          const el = node as Element
          if (el.matches("[data-animate]")) fadeObserver.observe(el)
          observeFadeTargets(el)
        })
      }
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    // ── Parallax on scroll ─────────────────────────────────────────────────
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    )

    const onScroll = () => {
      const viewMid = window.innerHeight / 2

      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed ?? "0.15")

        if (el.dataset.parallax === "hero-bg") {
          const rotate =
            "parallaxNoRotate" in el.dataset ? "" : "rotate(5deg) scale(1.1) "
          el.style.transform = `${rotate}translateY(${window.scrollY * speed}px)`
        } else {
          const rect = el.getBoundingClientRect()
          const elMid = rect.top + rect.height / 2
          el.style.transform = `translateY(${(viewMid - elMid) * speed}px)`
        }
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    // ── Text cursor glow ───────────────────────────────────────────────────
    const TEXT_SELECTORS = "h1, h2, h3, h4, h5, h6, p, blockquote, cite, li"
    const glow = document.createElement("div")
    glow.style.cssText = [
      "position:fixed",
      "pointer-events:none",
      "width:280px",
      "height:280px",
      "border-radius:50%",
      "background:radial-gradient(circle, rgba(242,232,216,0.07) 0%, transparent 70%)",
      "transform:translate(-50%,-50%)",
      "mix-blend-mode:screen",
      "z-index:9999",
      "opacity:0",
      "transition:opacity 1.4s ease",
      "left:-999px",
      "top:-999px",
    ].join(";")
    document.body.appendChild(glow)

    const onMouseMove = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`
      glow.style.top = `${e.clientY}px`
      const target = document.elementFromPoint(e.clientX, e.clientY)
      const overText = !!(
        target &&
        (target.matches(TEXT_SELECTORS) || target.closest(TEXT_SELECTORS))
      )
      glow.style.opacity = overText ? "1" : "0"
    }

    document.addEventListener("mousemove", onMouseMove)

    return () => {
      fadeObserver.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("mousemove", onMouseMove)
      glow.remove()
    }
  }, [pathname])

  return null
}
