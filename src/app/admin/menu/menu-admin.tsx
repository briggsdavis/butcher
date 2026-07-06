"use client"

import { useMutation, useQuery } from "convex/react"
import { ArrowLeft, Eye, EyeOff, FileText, Pencil, Plus, Trash2, Upload, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"

type Kind = "food" | "spirit" | "beverage"

type Props = {
  kind: Kind
  title: string
  eyebrow: string
  basePath: string
}

export function MenuAdmin({ kind, title, eyebrow, basePath }: Props) {
  const items = useQuery(api.menu.list, { kind, includeHidden: true })
  const remove = useMutation(api.menu.remove)
  const setHidden = useMutation(api.menu.setHidden)

  const [busy, setBusy] = useState<Id<"menuItems"> | null>(null)

  async function onDelete(id: Id<"menuItems">, name: string) {
    if (!confirm(`Delete "${name}" and its comments?`)) return
    setBusy(id)
    try {
      await remove({ id })
    } finally {
      setBusy(null)
    }
  }

  return (
    <main data-admin className="min-h-screen bg-oxblood px-8 py-16 md:px-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-xs text-tan/60 uppercase transition-colors hover:text-amber"
        >
          <ArrowLeft className="size-3.5" />
          Admin
        </Link>

        <div className="mt-6 flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-xs text-amber uppercase">{eyebrow}</span>
            </div>
            <h1 className="heading-emboss mt-3 font-display text-5xl text-cream md:text-6xl">
              {title}
            </h1>
          </div>

          <Link
            href={`${basePath}/new`}
            className="flex items-center gap-2 border border-amber px-6 py-3 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)]"
          >
            <Plus className="size-3.5" />
            New item
          </Link>
        </div>

        <MenuPdfPanel kind={kind} />

        {items === undefined ? (
          <p className="mt-12 text-sm text-tan/60">Loading…</p>
        ) : items.length === 0 ? (
          <div className="mt-12 border border-amber/30 p-8">
            <p className="text-tan">No items yet.</p>
          </div>
        ) : (
          <div className="mt-12 divide-y divide-cream/10 border-t border-cream/10">
            {items.map((item) => (
              <div
                key={item._id}
                className={`flex items-center gap-5 py-4 text-cream ${item.hidden ? "opacity-40" : ""}`}
              >
                <div className="relative size-14 shrink-0 overflow-hidden border border-cream/10 bg-charcoal">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-tan/30 uppercase">
                      None
                    </div>
                  )}
                </div>
                <div className="w-32 shrink-0 text-xs text-amber/70 uppercase">{item.category}</div>
                <div className="flex-1">
                  <div className="font-subhead text-base">{item.name}</div>
                  <div className="mt-1 text-xs text-tan/60">{item.description || "—"}</div>
                </div>
                <div className="w-16 shrink-0 text-right font-subhead text-amber">
                  ${item.price}
                </div>
                <div className="w-16 shrink-0 text-right text-xs text-cream/45">♥ {item.likes}</div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => setHidden({ id: item._id, hidden: !item.hidden })}
                    className="border border-amber/40 p-2 text-amber transition-colors hover:border-amber hover:text-cream"
                    aria-label={item.hidden ? `Show ${item.name}` : `Hide ${item.name}`}
                    title={item.hidden ? "Show on site" : "Hide from site"}
                  >
                    {item.hidden ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  </button>
                  <Link
                    href={`${basePath}/${item._id}`}
                    className="border border-amber/40 p-2 text-amber transition-colors hover:border-amber hover:text-cream"
                    aria-label={`Edit ${item.name}`}
                  >
                    <Pencil className="size-3.5" />
                  </Link>
                  <button
                    onClick={() => onDelete(item._id, item.name)}
                    disabled={busy === item._id}
                    className="border border-amber/40 p-2 text-amber transition-colors hover:border-amber hover:text-cream disabled:opacity-40"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function MenuPdfPanel({ kind }: { kind: Kind }) {
  const pdfUrl = useQuery(api.site.getMenuPdfUrl, { kind })
  const generatePdfUploadUrl = useMutation(api.site.generatePdfUploadUrl)
  const setMenuPdf = useMutation(api.site.setMenuPdf)
  const clearMenuPdf = useMutation(api.site.clearMenuPdf)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      setError("Please choose a PDF.")
      return
    }
    setError(null)
    setUploading(true)
    try {
      const url = await generatePdfUploadUrl({})
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/pdf" },
        body: file,
      })
      if (!res.ok) throw new Error("Upload failed.")
      const { storageId } = (await res.json()) as {
        storageId: Id<"_storage">
      }
      await setMenuPdf({ kind, storageId })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.")
    } finally {
      setUploading(false)
    }
  }

  async function onRemove() {
    if (!confirm("Remove the menu PDF?")) return
    await clearMenuPdf({ kind })
  }

  return (
    <div className="mt-10 flex items-center justify-between gap-6 border border-amber/30 px-6 py-5">
      <div className="flex items-center gap-4">
        <FileText className="size-5 text-amber" />
        <div>
          <p className="text-xs text-amber uppercase">Menu PDF</p>
          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-sm text-cream underline decoration-amber/30 decoration-dotted underline-offset-4 hover:text-amber"
            >
              View current PDF
            </a>
          ) : (
            <p className="mt-1 text-sm text-tan/60">No PDF uploaded.</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          aria-label="PDF file"
          onChange={onPick}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 border border-amber px-4 py-2 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream disabled:opacity-50"
        >
          <Upload className="size-3.5" />
          {uploading ? "Uploading…" : pdfUrl ? "Replace" : "Upload"}
        </button>
        {pdfUrl && (
          <button
            onClick={onRemove}
            className="flex items-center gap-2 text-xs text-tan/60 uppercase transition-colors hover:text-amber"
          >
            <X className="size-3.5" />
            Remove
          </button>
        )}
      </div>

      {error && <p className="ml-4 font-subhead text-sm text-amber">{error}</p>}
    </div>
  )
}
