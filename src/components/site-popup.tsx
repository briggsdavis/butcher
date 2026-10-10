"use client"

import { useQuery } from "convex/react"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { api } from "../../convex/_generated/api"

export type PopupContent = {
  heading: string
  body: string
  imageUrl: string | null
  imageAlt: string
  buttonEnabled: boolean
  buttonLabel: string
  buttonUrl: string
  buttonNewTab: boolean
}

const STORAGE_PREFIX = "popup-dismissed:"

export function SitePopup() {
  const popup = useQuery(api.popup.getActive, {})
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const dismissedRef = useRef<string | null>(null)

  useEffect(() => {
    if (!popup || open) return
    if (dismissedRef.current === popup.version) return
    if (popup.pages === "home" && pathname !== "/") return

    const now = Date.now()
    if (popup.startsAt !== undefined && now < popup.startsAt) return
    if (popup.endsAt !== undefined && now > popup.endsAt) return

    const key = `${STORAGE_PREFIX}${popup.version}`
    const store = getStore(popup.frequency)
    if (store?.getItem(key)) return

    const timer = window.setTimeout(() => setOpen(true), popup.delaySeconds * 1000)
    return () => window.clearTimeout(timer)
  }, [popup, pathname, open])

  function dismiss() {
    if (!popup) return
    dismissedRef.current = popup.version
    getStore(popup.frequency)?.setItem(`${STORAGE_PREFIX}${popup.version}`, "1")
    setClosing(true)
    window.setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 300)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  if (!popup || !open) return null

  return (
    <div
      data-lenis-prevent
      className={`${closing ? "overlay-out" : "overlay-in"} fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/80 p-4 backdrop-blur-sm`}
    >
      <button
        type="button"
        aria-label="Dismiss popup"
        onClick={dismiss}
        className="absolute inset-0 cursor-default"
      />
      <PopupCard content={popup} onClose={dismiss} />
    </div>
  )
}

export function PopupCard({ content, onClose }: { content: PopupContent; onClose?: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (onClose) closeRef.current?.focus()
  }, [onClose])

  return (
    <dialog
      open
      aria-modal="true"
      aria-labelledby="site-popup-heading"
      className="relative m-0 max-h-[90vh] w-full max-w-lg overflow-y-auto border border-amber/40 bg-oxblood p-0 text-cream shadow-2xl"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center bg-charcoal/60 text-cream transition-colors hover:text-amber"
      >
        <X className="size-5" />
      </button>

      {content.imageUrl && (
        <Image
          src={content.imageUrl}
          alt={content.imageAlt}
          width={512}
          height={512}
          sizes="(min-width: 640px) 512px, 100vw"
          className="block h-auto w-full bg-charcoal"
          unoptimized={content.imageUrl.startsWith("blob:")}
        />
      )}

      <div className="p-8 text-center">
        {content.heading && (
          <h2 id="site-popup-heading" className="font-display text-4xl text-cream">
            {content.heading}
          </h2>
        )}
        {content.body && (
          <p className="mt-4 text-sm whitespace-pre-line text-tan">{content.body}</p>
        )}
        {content.buttonEnabled && content.buttonLabel && content.buttonUrl && (
          <Link
            href={content.buttonUrl}
            target={content.buttonNewTab ? "_blank" : undefined}
            rel={content.buttonNewTab ? "noopener noreferrer" : undefined}
            onClick={onClose}
            className="mt-6 inline-block border border-amber px-8 py-3 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream"
          >
            {content.buttonLabel}
          </Link>
        )}
      </div>
    </dialog>
  )
}

function getStore(frequency: "once" | "session" | "always") {
  try {
    if (frequency === "once") return window.localStorage
    if (frequency === "session") return window.sessionStorage
  } catch {}
  return null
}
