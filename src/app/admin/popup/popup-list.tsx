"use client"

import { useMutation, useQuery } from "convex/react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"

export function PopupList() {
  const popups = useQuery(api.popup.list, {})
  const setEnabled = useMutation(api.popup.setEnabled)
  const remove = useMutation(api.popup.remove)
  const [busy, setBusy] = useState<Id<"popups"> | null>(null)
  const [now] = useState(() => Date.now())

  async function run(id: Id<"popups">, action: () => Promise<unknown>) {
    setBusy(id)
    try {
      await action()
    } finally {
      setBusy(null)
    }
  }

  return (
    <main className="min-h-screen px-8 py-12 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="heading-emboss font-display text-5xl text-cream md:text-6xl">Popups</h1>
            <p className="mt-4 max-w-xl text-sm text-tan/70">
              Announcements shown to visitors. Only one popup can be on at a time.
            </p>
          </div>
          <Link
            href="/admin/popup/new"
            className="flex items-center gap-2 self-start border border-amber px-6 py-3 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream md:self-auto"
          >
            <Plus className="size-3.5" />
            New popup
          </Link>
        </div>

        {popups === undefined ? (
          <p className="mt-12 text-sm text-tan/60">Loading...</p>
        ) : popups.length === 0 ? (
          <p className="mt-12 text-sm text-tan/60">No popups yet.</p>
        ) : (
          <ul className="mt-10 space-y-3">
            {popups.map((popup) => {
              const status = getStatus(popup, now)
              const title = popup.heading || "Untitled popup"
              return (
                <li
                  key={popup._id}
                  className={`flex items-center gap-5 border p-4 transition-colors ${
                    popup.enabled ? "border-amber bg-amber/5" : "border-amber/25"
                  }`}
                >
                  <div className="relative size-16 shrink-0 overflow-hidden border border-amber/25 bg-charcoal">
                    {popup.imageUrl && (
                      <Image
                        src={popup.imageUrl}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <Link href={`/admin/popup/${popup._id}`} className="min-w-0 flex-1">
                    <p className="truncate font-display text-2xl text-cream hover:text-amber">
                      {title}
                    </p>
                    {status && <p className="mt-1 text-xs text-amber uppercase">{status}</p>}
                  </Link>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={popup.enabled}
                    aria-label={popup.enabled ? `Turn off ${title}` : `Turn on ${title}`}
                    disabled={busy === popup._id}
                    onClick={() =>
                      run(popup._id, () => setEnabled({ id: popup._id, enabled: !popup.enabled }))
                    }
                    className="flex shrink-0 items-center gap-3 disabled:opacity-50"
                  >
                    <span className="text-xs text-tan/70 uppercase">
                      {popup.enabled ? "On" : "Off"}
                    </span>
                    <span
                      className={`relative h-6 w-11 border transition-colors ${
                        popup.enabled ? "border-amber bg-amber/30" : "border-amber/50"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 size-4 transition-transform ${
                          popup.enabled ? "translate-x-5 bg-amber" : "bg-tan"
                        }`}
                      />
                    </span>
                  </button>

                  <Link
                    href={`/admin/popup/${popup._id}`}
                    aria-label={`Edit ${title}`}
                    className="shrink-0 p-2 text-tan/60 transition-colors hover:text-amber"
                  >
                    <Pencil className="size-4" />
                  </Link>
                  <button
                    type="button"
                    aria-label={`Delete ${title}`}
                    disabled={busy === popup._id}
                    onClick={() => {
                      if (!confirm(`Delete "${title}"?`)) return
                      void run(popup._id, () => remove({ id: popup._id }))
                    }}
                    className="shrink-0 p-2 text-tan/60 transition-colors hover:text-amber disabled:opacity-50"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </main>
  )
}

function getStatus(popup: { enabled: boolean; startsAt?: number; endsAt?: number }, now: number) {
  if (!popup.enabled) return null
  if (popup.endsAt !== undefined && now > popup.endsAt) return "Ended"
  if (popup.startsAt !== undefined && now < popup.startsAt) return "Scheduled"
  return "Live"
}
