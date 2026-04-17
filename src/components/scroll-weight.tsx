"use client"

import { useEffect } from "react"

export function ScrollWeight() {
  useEffect(() => {
    if ("ontouchstart" in window) return

    let targetY = window.scrollY
    let currentY = window.scrollY
    let active = false

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (!active) currentY = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      targetY = Math.max(0, Math.min(targetY + e.deltaY * 0.85, max))
      if (!active) {
        active = true
        requestAnimationFrame(loop)
      }
    }

    const loop = () => {
      currentY = lerp(currentY, targetY, 0.09)
      window.scrollTo(0, currentY)
      if (Math.abs(targetY - currentY) > 0.5) {
        requestAnimationFrame(loop)
      } else {
        currentY = targetY
        active = false
      }
    }

    // Keep in sync with keyboard/scrollbar scrolling
    const onScroll = () => {
      if (!active) {
        targetY = window.scrollY
        currentY = window.scrollY
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return null
}
