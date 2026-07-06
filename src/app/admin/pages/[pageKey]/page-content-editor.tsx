"use client"

import { useMutation, useQuery } from "convex/react"
import { ImagePlus, RotateCcw, Save, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  getContentFields,
  getDefaultImageFields,
  getDefaultTextFields,
  type ContentField,
  type ImageField,
  type SitePageDefinition,
  type TextField,
} from "~/lib/site-content"
import { api } from "../../../../../convex/_generated/api"
import type { Id } from "../../../../../convex/_generated/dataModel"

type AdminPageContent = {
  fields: Record<string, string>
  images?: Record<string, Id<"_storage">>
  imageUrls: Record<string, string | null>
} | null

export function PageContentEditor({ definition }: { definition: SitePageDefinition }) {
  const router = useRouter()
  const savedPage = useQuery(api.site.getPageForAdmin, {
    key: definition.key,
  }) as AdminPageContent | undefined
  const savePage = useMutation(api.site.savePage)
  const generateUploadUrl = useMutation(api.site.generatePageImageUploadUrl)

  const defaultFields = useMemo(() => getDefaultTextFields(definition), [definition])
  const defaultImages = useMemo(() => getDefaultImageFields(definition), [definition])

  const [fields, setFields] = useState<Record<string, string>>({})
  const [images, setImages] = useState<Record<string, Id<"_storage">>>({})
  const [previews, setPreviews] = useState<Record<string, string>>({})
  const [uploadingKey, setUploadingKey] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    if (savedPage === undefined) return
    setFields({ ...defaultFields, ...savedPage?.fields })
    setImages(savedPage?.images ?? {})
    setPreviews({})
  }, [defaultFields, savedPage])

  function updateField(field: TextField, value: string) {
    setFields((current) => ({
      ...current,
      [field.key]: field.lowercase ? value.toLowerCase() : value,
    }))
  }

  async function uploadImage(field: ImageField, file: File) {
    setError(null)
    setNotice(null)
    setUploadingKey(field.key)
    try {
      const url = await generateUploadUrl({})
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })
      if (!res.ok) throw new Error("Upload failed.")
      const { storageId } = (await res.json()) as { storageId: Id<"_storage"> }
      setImages((current) => ({ ...current, [field.key]: storageId }))
      setPreviews((current) => ({ ...current, [field.key]: URL.createObjectURL(file) }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.")
    } finally {
      setUploadingKey(null)
    }
  }

  function removeImage(field: ImageField) {
    setImages((current) => {
      const next = { ...current }
      delete next[field.key]
      return next
    })
    setPreviews((current) => {
      const next = { ...current }
      if (next[field.key]) URL.revokeObjectURL(next[field.key])
      delete next[field.key]
      return next
    })
  }

  function restoreDefaults() {
    setFields(defaultFields)
    setImages({})
    setPreviews({})
    setNotice("Defaults staged. Save to publish them.")
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    setNotice(null)
    try {
      const textFields = getContentFields(definition).filter(
        (field): field is TextField => field.kind === "text" || field.kind === "textarea",
      )
      const nextFields = Object.fromEntries(
        textFields.map((field) => {
          const value = fields[field.key] ?? ""
          return [field.key, field.lowercase ? value.toLowerCase() : value]
        }),
      )
      await savePage({
        key: definition.key,
        fields: nextFields,
        images,
      })
      setNotice("Page saved.")
      router.refresh()
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
            <div className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-xs text-amber uppercase">Website Page</span>
            </div>
            <h1 className="heading-emboss mt-3 font-display text-5xl text-cream md:text-6xl">
              {definition.label}
            </h1>
            <Link
              href={definition.publicHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs text-tan/60 uppercase transition-colors hover:text-amber"
            >
              View public page
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={restoreDefaults}
              className="flex items-center gap-2 border border-amber/40 px-4 py-3 text-xs text-amber uppercase transition-colors hover:border-cream hover:text-cream"
            >
              <RotateCcw className="size-3.5" />
              Restore defaults
            </button>
            <button
              type="submit"
              disabled={pending || uploadingKey !== null}
              className="flex items-center gap-2 border border-amber px-6 py-3 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream disabled:opacity-50"
            >
              <Save className="size-3.5" />
              {pending ? "Saving..." : "Save page"}
            </button>
          </div>
        </div>

        {savedPage === undefined ? (
          <p className="mt-12 text-sm text-tan/60">Loading...</p>
        ) : (
          <div className="mt-10 space-y-10">
            {definition.sections.map((section) => (
              <section key={section.title} className="border border-amber/25 p-6">
                <h2 className="font-display text-3xl text-cream">{section.title}</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {section.fields.map((field) => (
                    <FieldEditor
                      key={field.key}
                      field={field}
                      value={fields[field.key] ?? ""}
                      imageUrl={
                        field.kind === "image"
                          ? (previews[field.key] ??
                            savedPage?.imageUrls?.[field.key] ??
                            defaultImages[field.key] ??
                            "")
                          : ""
                      }
                      hasImageOverride={field.kind === "image" && Boolean(images[field.key])}
                      uploading={uploadingKey === field.key}
                      onTextChange={updateField}
                      onImageUpload={uploadImage}
                      onImageRemove={removeImage}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {error && <p className="mt-6 font-subhead text-sm text-amber">{error}</p>}
        {notice && <p className="mt-6 text-sm text-tan">{notice}</p>}
      </form>
    </main>
  )
}

function FieldEditor({
  field,
  value,
  imageUrl,
  hasImageOverride,
  uploading,
  onTextChange,
  onImageUpload,
  onImageRemove,
}: {
  field: ContentField
  value: string
  imageUrl: string
  hasImageOverride: boolean
  uploading: boolean
  onTextChange: (field: TextField, value: string) => void
  onImageUpload: (field: ImageField, file: File) => void
  onImageRemove: (field: ImageField) => void
}) {
  if (field.kind === "image") {
    return (
      <ImageFieldEditor
        field={field}
        imageUrl={imageUrl}
        hasImageOverride={hasImageOverride}
        uploading={uploading}
        onImageUpload={onImageUpload}
        onImageRemove={onImageRemove}
      />
    )
  }

  return (
    <label className={`flex flex-col gap-2 ${field.kind === "textarea" ? "md:col-span-2" : ""}`}>
      <span className="text-xs text-amber uppercase">{field.label}</span>
      {field.kind === "textarea" ? (
        <textarea
          value={value}
          rows={4}
          onChange={(e) => onTextChange(field, e.target.value)}
          className="resize-none border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onTextChange(field, e.target.value)}
          className="border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"
        />
      )}
      {field.help && <span className="text-xs text-tan/50">{field.help}</span>}
    </label>
  )
}

function ImageFieldEditor({
  field,
  imageUrl,
  hasImageOverride,
  uploading,
  onImageUpload,
  onImageRemove,
}: {
  field: ImageField
  imageUrl: string
  hasImageOverride: boolean
  uploading: boolean
  onImageUpload: (field: ImageField, file: File) => void
  onImageRemove: (field: ImageField) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-amber uppercase">{field.label}</span>
      <div className="flex items-center gap-4">
        <div className="relative aspect-square w-28 shrink-0 overflow-hidden border border-amber/40 bg-charcoal">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={field.alt}
              fill
              sizes="112px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-tan/40 uppercase">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            aria-label={`${field.label} image file`}
            onChange={(e) => {
              const file = e.target.files?.[0]
              e.target.value = ""
              if (file) onImageUpload(field, file)
            }}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 border border-amber px-4 py-2 text-xs text-amber uppercase transition-colors hover:border-cream hover:text-cream disabled:opacity-50"
          >
            <ImagePlus className="size-3.5" />
            {uploading ? "Uploading..." : hasImageOverride ? "Replace" : "Upload"}
          </button>
          {hasImageOverride && (
            <button
              type="button"
              onClick={() => onImageRemove(field)}
              className="flex items-center gap-2 text-xs text-tan/60 uppercase transition-colors hover:text-amber"
            >
              <X className="size-3.5" />
              Use default
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
