"use client"

import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { parseStaffOrder } from "~/lib/site-content"
import { useEditor } from "./editable"

type MemberDraft = {
  id: string
  name: string
  role: string
  years: string
  headshotUrl: string
}

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `m-${crypto.randomUUID()}`
  return `m-${Math.random().toString(36).slice(2)}`
}

export function StaffManager() {
  const editor = useEditor()
  const order = parseStaffOrder(editor.getField("staff.order"))
  const [editing, setEditing] = useState<{ member: MemberDraft; isNew: boolean } | null>(null)

  function headshotFor(id: string) {
    const key = `staff.${id}.headshot`
    if (editor.hasImageOverride(key)) return editor.getImageUrl(key)
    return editor.getField(`staff.${id}.headshotUrl`)
  }

  function setOrder(ids: string[]) {
    editor.setField("staff.order", ids.join(","))
  }

  function move(id: string, delta: number) {
    const index = order.indexOf(id)
    const target = index + delta
    if (target < 0 || target >= order.length) return
    const next = [...order]
    ;[next[index], next[target]] = [next[target]!, next[index]!]
    setOrder(next)
  }

  function toggleHidden(id: string) {
    const key = `staff.${id}.hidden`
    editor.setField(key, editor.getField(key) === "1" ? "" : "1")
  }

  function remove(id: string, name: string) {
    if (
      !window.confirm(
        `Delete ${name || "this staff member"}? This can still be undone with Discard until you publish.`,
      )
    ) {
      return
    }
    setOrder(order.filter((memberId) => memberId !== id))
    editor.removeKeys([
      `staff.${id}.name`,
      `staff.${id}.role`,
      `staff.${id}.years`,
      `staff.${id}.hidden`,
      `staff.${id}.headshotUrl`,
      `staff.${id}.headshot`,
    ])
  }

  function openEdit(id: string) {
    setEditing({
      isNew: false,
      member: {
        id,
        name: editor.getField(`staff.${id}.name`),
        role: editor.getField(`staff.${id}.role`),
        years: editor.getField(`staff.${id}.years`),
        headshotUrl: headshotFor(id),
      },
    })
  }

  function openAdd() {
    setEditing({
      isNew: true,
      member: { id: newId(), name: "", role: "", years: "", headshotUrl: "" },
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-2xl text-cream">Staff members</h3>
          <p className="mt-1 text-xs text-tan/50">
            {order.length} {order.length === 1 ? "member" : "members"} · hidden members stay in the
            system but don&rsquo;t appear on the site.
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 rounded-full bg-amber px-4 py-2.5 text-sm font-medium text-charcoal transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          Add staff
        </button>
      </div>

      <div className="mt-6 space-y-2">
        {order.length === 0 && (
          <p className="rounded-md border border-dashed border-amber/25 py-10 text-center text-sm text-tan/50">
            No staff yet. Click “Add staff” to create the first one.
          </p>
        )}
        {order.map((id, index) => {
          const hidden = editor.getField(`staff.${id}.hidden`) === "1"
          const name = editor.getField(`staff.${id}.name`)
          const role = editor.getField(`staff.${id}.role`)
          const years = editor.getField(`staff.${id}.years`)
          const headshot = headshotFor(id)
          return (
            <div
              key={id}
              className={`flex items-center gap-3 rounded-md border border-amber/15 bg-oxblood/40 p-3 ${
                hidden ? "opacity-55" : ""
              }`}
            >
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => move(id, -1)}
                  disabled={index === 0}
                  aria-label="Move up"
                  className="text-tan/50 transition-colors hover:text-amber disabled:opacity-25"
                >
                  <ArrowUp className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(id, 1)}
                  disabled={index === order.length - 1}
                  aria-label="Move down"
                  className="text-tan/50 transition-colors hover:text-amber disabled:opacity-25"
                >
                  <ArrowDown className="size-4" />
                </button>
              </div>

              <div className="relative size-12 shrink-0 overflow-hidden rounded-sm bg-charcoal">
                {headshot ? (
                  <Image
                    src={headshot}
                    alt={name || "Staff headshot"}
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                    unoptimized
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-[8px] text-tan/40 uppercase">
                    None
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-cream">{name || "Unnamed"}</p>
                <p className="truncate text-xs text-amber">{role || "—"}</p>
                <p className="truncate text-[11px] text-tan/50">{years}</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleHidden(id)}
                  aria-label={hidden ? "Show on site" : "Hide from site"}
                  title={hidden ? "Hidden — click to show" : "Visible — click to hide"}
                  className={`rounded-sm p-2 transition-colors ${
                    hidden ? "text-tan/40 hover:text-amber" : "text-amber hover:text-cream"
                  }`}
                >
                  {hidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(id)}
                  aria-label="Edit"
                  className="rounded-sm p-2 text-tan/60 transition-colors hover:text-cream"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(id, name)}
                  aria-label="Delete"
                  className="rounded-sm p-2 text-tan/60 transition-colors hover:text-red-400"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {editing && (
        <StaffModal
          key={editing.member.id}
          initial={editing.member}
          isNew={editing.isNew}
          onClose={() => setEditing(null)}
          onSave={(member, image) => {
            editor.setFields({
              [`staff.${member.id}.name`]: member.name,
              [`staff.${member.id}.role`]: member.role,
              [`staff.${member.id}.years`]: member.years,
            })
            if (image) editor.setImage(`staff.${member.id}.headshot`, image.storageId, image.url)
            if (editing.isNew) setOrder([...order, member.id])
            setEditing(null)
          }}
        />
      )}
    </div>
  )
}

function StaffModal({
  initial,
  isNew,
  onClose,
  onSave,
}: {
  initial: MemberDraft
  isNew: boolean
  onClose: () => void
  onSave: (member: MemberDraft, image: { storageId: string; url: string } | null) => void
}) {
  const editor = useEditor()
  const [name, setName] = useState(initial.name)
  const [role, setRole] = useState(initial.role)
  const [years, setYears] = useState(initial.years)
  const [preview, setPreview] = useState(initial.headshotUrl)
  const [pendingImage, setPendingImage] = useState<{ storageId: string; url: string } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function onPick(file: File) {
    setUploading(true)
    setError(null)
    try {
      const uploaded = await editor.uploadFile(file)
      setPendingImage(uploaded)
      setPreview(uploaded.url)
    } catch {
      setError("Upload failed. Try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 p-4">
      <div className="w-full max-w-md rounded-lg border border-amber/25 bg-oxblood p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl text-cream">
            {isNew ? "Add staff member" : "Edit staff member"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-tan/60 transition-colors hover:text-cream"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-6 flex items-start gap-4">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-sm border border-amber/25 bg-charcoal">
            {preview ? (
              <Image
                src={preview}
                alt="Headshot preview"
                fill
                sizes="96px"
                className="object-cover object-top"
                unoptimized
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-[9px] text-tan/40 uppercase">
                No photo
              </span>
            )}
          </div>
          <div>
            <p className="text-xs text-tan/60 uppercase">Headshot</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              aria-label="Headshot file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                e.target.value = ""
                if (file) void onPick(file)
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="mt-2 flex items-center gap-2 border border-amber px-3 py-2 text-xs text-amber uppercase transition-colors hover:border-cream hover:text-cream disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <ImagePlus className="size-3.5" />
              )}
              {uploading ? "Uploading" : preview ? "Replace" : "Upload"}
            </button>
            {error && <p className="mt-2 text-xs text-amber">{error}</p>}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <Field label="Name" value={name} onChange={setName} placeholder="Marcus Chen" />
          <Field label="Role" value={role} onChange={setRole} placeholder="Executive Chef" />
          <Field label="Experience" value={years} onChange={setYears} placeholder="12 years" />
        </div>

        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-amber/40 px-5 py-2.5 text-sm text-amber transition-colors hover:border-cream hover:text-cream"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave({ ...initial, name, role, years }, pendingImage)}
            disabled={uploading}
            className="rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-charcoal transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isNew ? "Add member" : "Save member"}
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-amber uppercase">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border border-amber/40 bg-transparent px-3 py-2.5 text-cream transition-colors outline-none placeholder:text-tan/30 focus:border-amber"
      />
    </label>
  )
}
