"use client"

import { type ReactNode, useLayoutEffect, useRef } from "react"

export function EqualWidthStack({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false

    const equalize = () => {
      if (cancelled) return
      const els = Array.from(container.querySelectorAll<HTMLElement>("[data-equal-word]"))
      if (els.length === 0) return

      for (const el of els) el.style.fontSize = ""

      const measurements = els.map((el) => ({
        el,
        width: el.getBoundingClientRect().width,
        size: parseFloat(getComputedStyle(el).fontSize),
      }))
      const target = Math.max(...measurements.map((m) => m.width))
      if (!target) return

      for (const { el, width, size } of measurements) {
        el.style.fontSize = `${size * (target / width)}px`
        const visibilityHost = el.closest<HTMLElement>("[style*='visibility']")
        if (visibilityHost) visibilityHost.style.visibility = "visible"
        else el.style.visibility = "visible"
      }
    }

    const run = () => requestAnimationFrame(equalize)

    run()
    document.fonts?.ready.then(run)

    const ro = new ResizeObserver(run)
    ro.observe(container)

    return () => {
      cancelled = true
      ro.disconnect()
    }
  })

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
