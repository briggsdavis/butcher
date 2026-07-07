"use client"

import { useEffect, useRef } from "react"
import { preconnect } from "react-dom"

const SCRIPT_SRC =
  "//www.opentable.com/widget/reservation/loader?rid=104590&type=standard&theme=wide&color=3&dark=true&iframe=true&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website&cfe=true"

export function OpenTableWidget() {
  // Establish the OpenTable connections early so the reservation widget loads faster.
  preconnect("https://www.opentable.com")
  preconnect("https://cdn.otstatic.com")

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const script = document.createElement("script")
    script.src = SCRIPT_SRC
    script.async = true
    container.appendChild(script)

    return () => {
      container.replaceChildren()
    }
  }, [])

  // Reserve vertical space up front so the injected reservation iframe
  // doesn't shift the sections below it once it loads (reduces CLS).
  return (
    <div
      ref={containerRef}
      className="flex min-h-[236px] items-center justify-center overflow-hidden sm:min-h-[112px]"
    />
  )
}
