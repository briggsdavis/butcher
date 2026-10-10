"use client"

import { useMutation, useQuery } from "convex/react"
import { ArrowLeft, ImagePlus, Save, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useRef, useState, type ReactNode } from "react"
import { PopupCard } from "~/components/site-popup"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"

type Frequency = "once" | "session" | "always"
type Pages = "all" | "home"

type FormState = {
  enabled: boolean
  heading: string
  body: string
  imageId: Id<"_storage"> | undefined
  imageUrl: string | null
  imageAlt: string
  buttonEnabled: boolean
  buttonLabel: string
  buttonUrl: string
  buttonNewTab: boolean
  frequency: Frequency
  delaySeconds: number
  pages: Pages
  startsAt: string
  endsAt: string
}

const DEFAULTS: FormState = {
  enabled: false,
  heading: "",
  body: "",
  imageId: undefined,
  imageUrl: null,
  imageAlt: "",
  buttonEnabled: true,
  buttonLabel: "Reserve a table",
  buttonUrl: "",
  buttonNewTab: false,
  frequency: "once",
  delaySeconds: 2,
  pages: "all",
  startsAt: "",
  endsAt: "",
}

const INPUT =
  "border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"

export function PopupEditor({ id }: { id?: Id<"popups"> }) {
  const router = useRouter()
  const saved = useQuery(api.popup.getForAdmin, id ? { id } : "skip")
  const create = useMutation(api.popup.create)
  const update = useMutation(api.popup.update)
  const generateUploadUrl = useMutation(api.popup.generateImageUploadUrl)

  const [form, setForm] = useState<FormState>(DEFAULTS)
  const [uploading, setUploading] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const [loaded, setLoaded] = useState(false)

  const loading = id !== undefined && saved === undefined

  if (saved !== undefined && !loaded) {
    setLoaded(true)
    if (saved) {
      const { _id, _creationTime, updatedAt: _updatedAt, name: _name, ...p } = saved.popup
      setForm({
        ...DEFAULTS,
        ...p,
        imageUrl: saved.imageUrl,
        startsAt: toLocalInput(p.startsAt),
        endsAt: toLocalInput(p.endsAt),
      })
    }
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function onPickFile(file: File) {
    setUploading(true)
    setError(null)
    try {
      const url = await generateUploadUrl({})
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })
      if (!res.ok) throw new Error("Upload failed.")
      const { storageId } = (await res.json()) as { storageId: Id<"_storage"> }
      setForm((current) => ({
        ...current,
        imageId: storageId,
        imageUrl: URL.createObjectURL(file),
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.")
    } finally {
      setUploading(false)
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const startsAt = fromLocalInput(form.startsAt)
    const endsAt = fromLocalInput(form.endsAt)
    if (startsAt !== undefined && endsAt !== undefined && endsAt <= startsAt) {
      setError("End date must be after the start date.")
      return
    }
    if (form.buttonEnabled && (!form.buttonLabel.trim() || !form.buttonUrl.trim())) {
      setError("Add a button label and link, or turn the button off.")
      return
    }

    if (!form.heading.trim()) {
      setError("Add a header for this popup.")
      return
    }

    setPending(true)
    try {
      const popup = {
        heading: form.heading.trim(),
        body: form.body.trim(),
        imageId: form.imageId,
        imageAlt: form.imageAlt.trim(),
        buttonEnabled: form.buttonEnabled,
        buttonLabel: form.buttonLabel.trim(),
        buttonUrl: form.buttonUrl.trim(),
        buttonNewTab: form.buttonNewTab,
        frequency: form.frequency,
        delaySeconds: Number.isFinite(form.delaySeconds) ? form.delaySeconds : 0,
        pages: form.pages,
        startsAt,
        endsAt,
      }
      if (id) await update({ id, popup, enabled: form.enabled })
      else await create({ popup, enabled: form.enabled })
      router.push("/admin/popup")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.")
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="min-h-screen px-8 py-12 md:px-12">
      <form onSubmit={onSubmit} className="mx-auto max-w-6xl">
        <Link
          href="/admin/popup"
          className="flex items-center gap-2 text-xs text-tan/60 uppercase transition-colors hover:text-amber"
        >
          <ArrowLeft className="size-3.5" />
          Popups
        </Link>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="heading-emboss font-display text-5xl text-cream md:text-6xl">
              {id ? "Edit popup" : "New popup"}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-tan/70">
              Saving changes shows the popup again to everyone, even if they dismissed an earlier
              version.
            </p>
          </div>
          <button
            type="submit"
            disabled={pending || uploading || loading}
            className="flex items-center gap-2 self-start border border-amber px-6 py-3 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream disabled:opacity-50 md:self-auto"
          >
            <Save className="size-3.5" />
            {pending ? "Saving..." : "Save popup"}
          </button>
        </div>

        {loading ? (
          <p className="mt-12 text-sm text-tan/60">Loading...</p>
        ) : saved === null ? (
          <p className="mt-12 text-sm text-tan/60">This popup no longer exists.</p>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)]">
            <div className="space-y-8">
              <Section title="Status">
                <Toggle
                  label="Show popup on the site"
                  checked={form.enabled}
                  onChange={(v) => set("enabled", v)}
                />
                <p className="text-xs text-tan/50">
                  Only one popup can be on at a time. Turning this on turns off any other popup.
                </p>
              </Section>

              <Section title="Content">
                <Field label="Image">
                  <div className="flex items-center gap-4">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      aria-label="Popup image"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        e.target.value = ""
                        if (file) void onPickFile(file)
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2 border border-amber px-4 py-2 text-xs text-amber uppercase transition-colors hover:border-cream hover:text-cream disabled:opacity-50"
                    >
                      <ImagePlus className="size-3.5" />
                      {uploading ? "Uploading..." : form.imageUrl ? "Replace" : "Upload"}
                    </button>
                    {form.imageUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setForm((c) => ({ ...c, imageId: undefined, imageUrl: null }))
                        }
                        className="flex items-center gap-2 text-xs text-tan/60 uppercase transition-colors hover:text-amber"
                      >
                        <X className="size-3.5" />
                        Remove
                      </button>
                    )}
                  </div>
                </Field>
                {form.imageUrl && (
                  <Field label="Image description" help="Read aloud by screen readers.">
                    <input
                      value={form.imageAlt}
                      onChange={(e) => set("imageAlt", e.target.value)}
                      className={INPUT}
                    />
                  </Field>
                )}
                <Field label="Header">
                  <input
                    value={form.heading}
                    onChange={(e) => set("heading", e.target.value)}
                    className={INPUT}
                  />
                </Field>
                <Field label="Body">
                  <textarea
                    rows={4}
                    value={form.body}
                    onChange={(e) => set("body", e.target.value)}
                    className={`${INPUT} resize-none`}
                  />
                </Field>
              </Section>

              <Section title="Button">
                <Toggle
                  label="Show button"
                  checked={form.buttonEnabled}
                  onChange={(v) => set("buttonEnabled", v)}
                />
                {form.buttonEnabled && (
                  <>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Field label="Button label">
                        <input
                          value={form.buttonLabel}
                          onChange={(e) => set("buttonLabel", e.target.value)}
                          className={INPUT}
                        />
                      </Field>
                      <Field label="Button link" help="A page like /food or a full https:// URL.">
                        <input
                          value={form.buttonUrl}
                          onChange={(e) => set("buttonUrl", e.target.value)}
                          placeholder="/contact"
                          className={INPUT}
                        />
                      </Field>
                    </div>
                    <Toggle
                      label="Open link in a new tab"
                      checked={form.buttonNewTab}
                      onChange={(v) => set("buttonNewTab", v)}
                    />
                  </>
                )}
              </Section>

              <Section title="Display">
                <div className="grid gap-6 md:grid-cols-3">
                  <Field label="Show on">
                    <select
                      value={form.pages}
                      onChange={(e) => set("pages", e.target.value as Pages)}
                      className={`${INPUT} bg-oxblood`}
                    >
                      <option value="all">Every page</option>
                      <option value="home">Home page only</option>
                    </select>
                  </Field>
                  <Field label="How often">
                    <select
                      value={form.frequency}
                      onChange={(e) => set("frequency", e.target.value as Frequency)}
                      className={`${INPUT} bg-oxblood`}
                    >
                      <option value="once">Once per visitor</option>
                      <option value="session">Once per visit</option>
                      <option value="always">Every page load</option>
                    </select>
                  </Field>
                  <Field label="Delay (seconds)">
                    <input
                      type="number"
                      min={0}
                      max={120}
                      value={form.delaySeconds}
                      onChange={(e) => set("delaySeconds", e.target.valueAsNumber)}
                      className={INPUT}
                    />
                  </Field>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Start showing" help="Optional. Leave blank to start now.">
                    <input
                      type="datetime-local"
                      value={form.startsAt}
                      onChange={(e) => set("startsAt", e.target.value)}
                      className={`${INPUT} [color-scheme:dark]`}
                    />
                  </Field>
                  <Field label="Stop showing" help="Optional. Leave blank to run until turned off.">
                    <input
                      type="datetime-local"
                      value={form.endsAt}
                      onChange={(e) => set("endsAt", e.target.value)}
                      className={`${INPUT} [color-scheme:dark]`}
                    />
                  </Field>
                </div>
              </Section>

              {error && <p className="font-subhead text-sm text-amber">{error}</p>}
            </div>

            <div className="lg:sticky lg:top-12 lg:self-start">
              <p className="mb-3 text-xs text-tan/50 uppercase">Preview</p>
              <div className="pointer-events-none flex justify-center bg-charcoal p-6">
                <PopupCard content={form} />
              </div>
            </div>
          </div>
        )}
      </form>
    </main>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-6 border border-amber/25 p-6">
      <h2 className="font-display text-3xl text-cream">{title}</h2>
      {children}
    </section>
  )
}

function Field({ label, help, children }: { label: string; help?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs text-amber uppercase">{label}</span>
      {children}
      {help && <span className="text-xs text-tan/50">{help}</span>}
    </label>
  )
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span className="relative h-6 w-11 shrink-0 border border-amber/50 transition-colors peer-checked:bg-amber/30 peer-focus-visible:ring-2 peer-focus-visible:ring-amber after:absolute after:top-0.5 after:left-0.5 after:size-4 after:bg-tan after:transition-transform peer-checked:after:translate-x-5 peer-checked:after:bg-amber" />
      <span className="text-sm text-cream">{label}</span>
    </label>
  )
}

function toLocalInput(ms: number | undefined) {
  if (ms === undefined) return ""
  const d = new Date(ms)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function fromLocalInput(value: string) {
  if (!value) return undefined
  const ms = new Date(value).getTime()
  return Number.isNaN(ms) ? undefined : ms
}
