"use client"

/* eslint-disable jsx-a11y/prefer-tag-over-role -- contentEditable is a rich-text control, not a plain input/textarea */

import { ImagePlus, Loader2 } from "lucide-react"
import Image from "next/image"
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react"

export type UploadedFile = { storageId: string; url: string }

// The editor API shared with every editable primitive and the staff manager.
// All mutations write to an in-memory working draft; nothing is persisted to
// the live site until the shell auto-saves (draft) or publishes.
export type EditorApi = {
  getField: (key: string) => string
  setField: (key: string, value: string, opts?: { lowercase?: boolean }) => void
  setFields: (partial: Record<string, string>) => void
  removeKeys: (keys: string[]) => void
  /** Working url for an image key, falling back to its static default. */
  getImageUrl: (key: string) => string
  hasImageOverride: (key: string) => boolean
  /** Open a file picker and upload straight into the given image key. */
  uploadInto: (key: string) => void
  removeImage: (key: string) => void
  /** Upload a file to storage without touching content (used by the modal). */
  uploadFile: (file: File) => Promise<UploadedFile>
  setImage: (key: string, storageId: string, url: string) => void
  uploadingKey: string | null
}

const EditorContext = createContext<EditorApi | null>(null)

export function EditorProvider({ value, children }: { value: EditorApi; children: ReactNode }) {
  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export function useEditor(): EditorApi {
  const ctx = useContext(EditorContext)
  if (!ctx) throw new Error("useEditor must be used within an EditorProvider")
  return ctx
}

// ── Click-to-edit text ──────────────────────────────────────────────────────
// Uncontrolled contentEditable: content is set imperatively from the committed
// value, and only read back on blur. This keeps the caret stable while typing
// (React never re-writes the node mid-edit) and preserves inline typography.
export function EditableText({
  fieldKey,
  block = false,
  className = "",
  multiline = false,
  lowercase = false,
  placeholder = "Empty",
}: {
  fieldKey: string
  block?: boolean
  className?: string
  multiline?: boolean
  lowercase?: boolean
  placeholder?: string
}) {
  const { getField, setField } = useEditor()
  const value = getField(fieldKey)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (el && el.innerText !== value) {
      el.innerText = value
      el.dataset.empty = value.trim() ? "false" : "true"
    }
  }, [value])

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      role="textbox"
      aria-label={`Edit ${placeholder}`}
      tabIndex={0}
      data-editable="true"
      data-empty={value.trim() ? "false" : "true"}
      data-placeholder={placeholder}
      className={`editable-text ${block ? "block" : "inline-block"} ${className}`}
      onInput={(e) => {
        e.currentTarget.dataset.empty = e.currentTarget.innerText.trim() ? "false" : "true"
      }}
      onBlur={(e) => {
        setField(fieldKey, e.currentTarget.innerText.replace(/\n+$/, ""), { lowercase })
      }}
      onKeyDown={(e) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault()
          e.currentTarget.blur()
        }
      }}
    />
  )
}

// ── Click-to-edit image ─────────────────────────────────────────────────────
// Shows the working image at a fixed aspect ratio with a hover overlay to
// replace it. `aspectClass` should encode the ratio the image is shown at on
// the real site so the preview stays faithful.
export function EditableImage({
  imageKey,
  alt,
  aspectClass,
  className = "",
  rounded = "rounded-sm",
  sizes = "400px",
}: {
  imageKey: string
  alt: string
  aspectClass: string
  className?: string
  rounded?: string
  sizes?: string
}) {
  const { getImageUrl, uploadInto, uploadingKey } = useEditor()
  const url = getImageUrl(imageKey)
  const uploading = uploadingKey === imageKey

  return (
    <button
      type="button"
      onClick={() => uploadInto(imageKey)}
      disabled={uploading}
      aria-label={`Replace image: ${alt}`}
      className={`group/img relative block w-full overflow-hidden ${aspectClass} ${rounded} ${className} ring-1 ring-transparent transition-all hover:ring-2 hover:ring-amber`}
    >
      {url ? (
        <Image src={url} alt={alt} fill sizes={sizes} className="object-cover" unoptimized />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-charcoal text-[10px] tracking-wide text-tan/40 uppercase">
          No image
        </span>
      )}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-charcoal/0 opacity-0 transition-all group-hover/img:bg-charcoal/45 group-hover/img:opacity-100">
        <span className="flex items-center gap-2 border border-cream/70 bg-charcoal/60 px-3 py-1.5 text-[11px] tracking-wide text-cream uppercase">
          {uploading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <ImagePlus className="size-3.5" />
          )}
          {uploading ? "Uploading" : "Replace"}
        </span>
      </span>
    </button>
  )
}
