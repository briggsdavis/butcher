"use client"

import { useEffect, useRef } from "react"

const SCRIPT_SRC =
  "//www.opentable.com/widget/reservation/loader?rid=104590&type=standard&theme=wide&color=3&dark=true&iframe=true&domain=com&lang=en-US&newtab=false&ot_source=Restaurant%20website&cfe=true"

export function OpenTableWidget() {
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

  return (
    <div
      ref={containerRef}
      className="flex h-[150px] justify-center overflow-hidden"
    />
  )
}
