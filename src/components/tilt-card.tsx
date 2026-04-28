"use client"

import { HTMLAttributes, MouseEvent, useRef } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Initial 2-D rotation angle in degrees — restored on mouse leave */
  initialRotate?: number
  /** Max tilt degrees for the 3-D perspective effect */
  maxTilt?: number
}

export function TiltCard({
  children,
  className = "",
  style,
  initialRotate = 0,
  maxTilt = 9,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  ...divProps
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rest = `rotate(${initialRotate}deg)`

  function handleEnter(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (el) {
      // Disable transform transition so mouse tracking feels instant
      el.style.transition = "filter 0.3s ease"
      el.style.filter = "drop-shadow(0 20px 40px rgba(0,0,0,0.6))"
    }
    onMouseEnter?.(e)
  }

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    const rx = (0.5 - y) * maxTilt
    const ry = (x - 0.5) * maxTilt
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`
    onMouseMove?.(e)
  }

  function handleLeave(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (el) {
      // Spring back to initial tilt
      el.style.transition =
        "transform 0.65s cubic-bezier(0.34,1.56,0.64,1), filter 0.4s ease"
      el.style.transform = rest
      el.style.filter = ""
    }
    onMouseLeave?.(e)
  }

  return (
    <div
      {...divProps}
      ref={ref}
      className={className}
      style={{ ...style, transform: rest }}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
