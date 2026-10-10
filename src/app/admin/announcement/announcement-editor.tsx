"use client"

import { useMutation, useQuery } from "convex/react"
import { Save } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { AnnouncementBar } from "~/components/announcement-bar"
import { api } from "../../../../convex/_generated/api"

const DEFAULTS = { enabled: false, dismissible: false, text: "", linkLabel: "", linkUrl: "" }
const INPUT =
  "border border-amber/40 bg-transparent px-4 py-3 text-cream outline-none transition-colors focus:border-amber"

export function AnnouncementEditor() {
  const saved = useQuery(api.site.getAnnouncementForAdmin, {})
  const save = useMutation(api.site.saveAnnouncement)
  const [form, setForm] = useState(DEFAULTS)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const loaded = useRef(false)

  useEffect(() => {
    if (saved === undefined || loaded.current) return
    loaded.current = true
    setForm({ ...DEFAULTS, ...saved, dismissible: saved?.dismissible ?? false })
  }, [saved])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setNotice(null)
    setPending(true)
    try {
      await save({ announcement: form })
      setNotice(
        form.enabled ? "Announcement bar saved and live." : "Saved. The announcement bar is off.",
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.")
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="min-h-screen px-8 py-12 md:px-12">
      <form onSubmit={onSubmit} className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="heading-emboss font-display text-5xl text-cream md:text-6xl">
              Announcement Bar
            </h1>
            <p className="mt-4 text-sm text-tan/70">
              A message and an underlined link above the navigation on every public page.
            </p>
          </div>
          <button
            type="submit"
            disabled={pending || saved === undefined}
            className="flex items-center gap-2 self-start border border-amber px-6 py-3 text-xs text-amber uppercase transition-colors hover:border-cream hover:text-cream disabled:opacity-50 md:self-auto"
          >
            <Save className="size-3.5" />
            {pending ? "Saving..." : "Save announcement"}
          </button>
        </div>

        {saved === undefined ? (
          <p className="mt-12 text-sm text-tan/60">Loading...</p>
        ) : (
          <div className="mt-10 space-y-8">
            <section className="space-y-6 border border-amber/25 p-6">
              <label className="flex cursor-pointer items-center gap-3 select-none">
                <input
                  type="checkbox"
                  checked={form.enabled}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, enabled: e.target.checked }))
                  }
                  className="size-4 accent-amber"
                />
                <span className="text-sm text-cream">Show announcement bar</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 select-none">
                <input
                  type="checkbox"
                  checked={form.dismissible}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, dismissible: e.target.checked }))
                  }
                  className="size-4 accent-amber"
                />
                <span className="text-sm text-cream">Allow visitors to close the bar</span>
              </label>
              <p className="text-xs text-tan/50">
                Closed announcements stay hidden in that browser. Changing the text or link shows
                the updated announcement again.
              </p>
              <label className="flex flex-col gap-2">
                <span className="text-xs text-amber uppercase">Text</span>
                <input
                  value={form.text}
                  onChange={(e) => setForm((current) => ({ ...current, text: e.target.value }))}
                  placeholder="Join us for a special evening."
                  className={INPUT}
                />
              </label>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-xs text-amber uppercase">Link label</span>
                  <input
                    value={form.linkLabel}
                    onChange={(e) =>
                      setForm((current) => ({ ...current, linkLabel: e.target.value }))
                    }
                    placeholder="Learn more"
                    className={INPUT}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs text-amber uppercase">Link URL</span>
                  <input
                    value={form.linkUrl}
                    onChange={(e) =>
                      setForm((current) => ({ ...current, linkUrl: e.target.value }))
                    }
                    placeholder="/contact or https://..."
                    className={INPUT}
                  />
                </label>
              </div>
              <p className="text-xs text-tan/50">
                Leave both link fields blank for a text-only announcement.
              </p>
            </section>
            <section>
              <h2 className="mb-4 font-display text-3xl text-cream">Preview</h2>
              <div inert>
                <AnnouncementBar content={form} preview />
              </div>
            </section>
          </div>
        )}
        {error && (
          <p role="alert" className="mt-6 text-sm text-amber">
            {error}
          </p>
        )}
        {notice && <output className="mt-6 block text-sm text-tan">{notice}</output>}
      </form>
    </main>
  )
}
