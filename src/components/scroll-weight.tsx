"use client"

import { useEffect } from "react"

export function ScrollWeight() {
  useEffect(() => {
    if ("ontouchstart" in window) return

    let target = window.scrollY
    let current = window.scrollY
    let raf = 0
    let idle = true

    const tick = () => {
      current += (target - current) * 0.18
      window.scrollTo(0, current)
      if (Math.abs(target - current) > 0.5) {
        raf = requestAnimationFrame(tick)
      } else {
        window.scrollTo(0, Math.round(target))
        // Re-sync from actual position so browser max-clamping is respected
        current = window.scrollY
        target = current
        idle = true
      }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      // Only sync from real scroll when we're not mid-animation
      if (idle) {
        current = window.scrollY
        target = current
        idle = false
      }
      target += e.deltaY
      // Floor at 0, no upper clamp — browser handles the max via scrollTo
      target = Math.max(0, target)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", onWheel)
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
