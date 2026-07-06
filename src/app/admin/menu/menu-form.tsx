"use client"

import { useMutation, useQuery } from "convex/react"
import { ArrowLeft, ImagePlus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"

type Kind = "food" | "spirit" | "beverage"

type Props =
  | {
      mode: "create"
      kind: Kind
      basePath: string
      titleLabel: string
      id?: undefined
    }
  | {
      mode: "edit"
      kind: Kind
      basePath: string
      titleLabel: string
      id: Id<"menuItems">
    }

type ImageState =
  | { kind: "keep" }
  | { kind: "clear" }
  | { kind: "new"; storageId: Id<"_storage">; previewUrl: string }

export function MenuForm(props: Props) {
  const router = useRouter()
  const create = useMutation(api.menu.create)
  const update = useMutation(api.menu.update)
  const generateUploadUrl = useMutation(api.menu.generateUploadUrl)

  const existing = useQuery(
    api.menu.list,
    props.mode === "edit" ? { kind: props.kind, includeHidden: true } : "skip",
  )
  const knownCategories = useQuery(api.menu.listCategories, {
    kind: props.kind,
  })
  const editing = props.mode === "edit" ? existing?.find((i) => i._id === props.id) : undefined

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [imageState, setImageState] = useState<ImageState>({ kind: "keep" })
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const datalistId = useId()

  useEffect(() => {
    if (editing) {
      setName(editing.name)
      setDescription(editing.description)
      setPrice(editing.price)
      setCategory(editing.category)
    }
  }, [editing])

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
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
      const { storageId } = (await res.json()) as {
        storageId: Id<"_storage">
      }
      setImageState({
        kind: "new",
        storageId,
        previewUrl: URL.createObjectURL(file),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.")
    } finally {
      setUploading(false)
    }
  }

  function onClearImage() {
    if (imageState.kind === "new") {
      URL.revokeObjectURL(imageState.previewUrl)
    }
    setImageState({ kind: "clear" })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)
    try {
      if (props.mode === "create") {
        await create({
          kind: props.kind,
          name,
          description,
          price,
          category,
          imageId: imageState.kind === "new" ? imageState.storageId : undefined,
        })
      } else {
        const imageUpdate =
          imageState.kind === "keep"
            ? undefined
            : imageState.kind === "clear"
              ? null
              : { imageId: imageState.storageId }
        await update({
          id: props.id,
          name,
          description,
          price,
          category,
          imageUpdate,
        })
      }
      router.push(props.basePath)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.")
    } finally {
      setPending(false)
    }
  }

  const loading = props.mode === "edit" && !editing

  const previewUrl =
    imageState.kind === "new"
      ? imageState.previewUrl
      : imageState.kind === "clear"
        ? null
        : (editing?.imageUrl ?? null)

  return (
    <main data-admin className="min-h-screen bg-oxblood px-8 py-16 md:px-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href={props.basePath}
          className="flex items-center gap-2 text-xs text-tan/60 uppercase transition-colors hover:text-amber"
        >
          <ArrowLeft className="size-3.5" />
          {props.titleLabel}
        </Link>

        <h1 className="heading-emboss mt-6 font-display text-5xl text-cream md:text-6xl">
          {props.mode === "create" ? "New item" : "Edit item"}
        </h1>

        {loading ? (
          <p className="mt-12 text-sm text-tan/60">Loading…</p>
        ) : (
          <form onSubmit={onSubmit} className="mt-12 flex flex-col gap-6">
            <Field label="Image">
              <div className="flex items-center gap-5">
                <div className="relative aspect-square w-32 shrink-0 overflow-hidden border border-amber/40 bg-charcoal">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Item image"
                      fill
                      sizes="128px"
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
                    aria-label="Image file"
                    onChange={onPickFile}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 border border-amber px-4 py-2 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream disabled:opacity-50"
                  >
                    <ImagePlus className="size-3.5" />
                    {uploading ? "Uploading…" : previewUrl ? "Replace" : "Upload"}
                  </button>
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={onClearImage}
                      className="flex items-center gap-2 text-xs text-tan/60 uppercase transition-colors hover:text-amber"
                    >
                      <X className="size-3.5" />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </Field>

            <Field label="Name">
              <input
                required
                aria-label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"
              />
            </Field>

            <Field label="Description">
              <textarea
                aria-label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="resize-none border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"
              />
            </Field>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Price">
                <input
                  required
                  aria-label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 24"
                  className="border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"
                />
              </Field>

              <Field label="Category">
                <input
                  required
                  aria-label="Category"
                  list={datalistId}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Pick or type a new category"
                  className="border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"
                />
                <datalist id={datalistId}>
                  {(knownCategories ?? []).map((c) => (
                    <option key={c} value={c} aria-label={c} />
                  ))}
                </datalist>
              </Field>
            </div>

            {error && <p className="font-subhead text-sm text-amber">{error}</p>}

            <div className="mt-2 flex items-center gap-4">
              <button
                type="submit"
                disabled={pending || uploading}
                className="border border-amber px-10 py-4 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)] disabled:opacity-50"
              >
                {pending ? "Saving…" : props.mode === "create" ? "Create item" : "Save changes"}
              </button>
              <Link
                href={props.basePath}
                className="text-xs text-tan/60 uppercase transition-colors hover:text-amber"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs text-amber uppercase">{label}</span>
      {children}
    </label>
  )
}
