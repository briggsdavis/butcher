"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export type AnnouncementContent = {
  text: string
  linkLabel: string
  linkUrl: string
  dismissible?: boolean
}

const STORAGE_KEY = "announcement-dismissed:v1"

export function AnnouncementBar({
  content,
  preview = false,
}: {
  content: AnnouncementContent
  preview?: boolean
}) {
  const signature = JSON.stringify([content.text, content.linkLabel, content.linkUrl])
  const [dismissal, setDismissal] = useState<{ signature: string; dismissed: boolean } | null>(null)

  useEffect(() => {
    if (preview || !content.dismissible) return
    function syncDismissal() {
      let dismissed = false
      try {
        dismissed = window.localStorage.getItem(STORAGE_KEY) === signature
      } catch {}
      setDismissal({ signature, dismissed })
    }
    syncDismissal()
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) syncDismissal()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [signature, content.dismissible, preview])

  function dismiss() {
    if (preview) return
    setDismissal({ signature, dismissed: true })
    try {
      window.localStorage.setItem(STORAGE_KEY, signature)
    } catch {}
  }

  if (
    !preview &&
    content.dismissible &&
    (dismissal?.signature !== signature || dismissal.dismissed)
  )
    return null

  return (
    <div
      className={`relative border-b border-charcoal/15 bg-amber py-3 text-center text-xs leading-relaxed text-charcoal md:text-sm ${content.dismissible ? "px-12 md:px-16" : "px-4 md:px-16"}`}
    >
      <p className="break-words">
        {content.text}
        {content.linkLabel && content.linkUrl && (
          <>
            {" "}
            <Link
              href={content.linkUrl}
              className="ml-1 font-bold underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {content.linkLabel}
            </Link>
          </>
        )}
      </p>
      {content.dismissible && (
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 md:right-4"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
