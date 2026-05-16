"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let raf: number

    let visible = false
    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`
      if (!visible) {
        ringX = mouseX
        ringY = mouseY
        ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`
        dot.style.visibility = "visible"
        ring.style.visibility = "visible"
        visible = true
      }
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.2
      ringY += (mouseY - ringY) * 0.2
      ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`
      raf = requestAnimationFrame(loop)
    }

    const onEnter = () => {
      ring.style.width = "52px"
      ring.style.height = "52px"
      ring.style.borderColor = "var(--color-amber)"
      ring.style.opacity = "0.65"
      dot.style.opacity = "0"
    }

    const onLeave = () => {
      ring.style.width = "32px"
      ring.style.height = "32px"
      ring.style.borderColor = "var(--color-cream)"
      ring.style.opacity = "0.3"
      dot.style.opacity = "1"
    }

    window.addEventListener("mousemove", move)
    raf = requestAnimationFrame(loop)

    const interactives = document.querySelectorAll("a, button")
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)
    })

    return () => {
      window.removeEventListener("mousemove", move)
      cancelAnimationFrame(raf)
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot invisible" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring invisible" aria-hidden="true" />
    </>
  )
}
