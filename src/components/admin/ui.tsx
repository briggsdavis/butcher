"use client"

import type { ReactNode } from "react"

export function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  mono = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  mono?: boolean
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold tracking-widest text-black/40 uppercase">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border border-black/[0.12] bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none ${mono ? "font-mono" : ""}`}
      />
    </div>
  )
}

export function Textarea({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold tracking-widest text-black/40 uppercase">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full resize-none border border-black/[0.12] bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
      />
    </div>
  )
}

export function SectionPanel({
  title,
  description,
  children,
  actions,
}: {
  title: string
  description?: string
  children: ReactNode
  actions?: ReactNode
}) {
  return (
    <div className="border border-black/[0.08] bg-white">
      <div className="flex items-start justify-between border-b border-black/[0.08] px-6 py-4">
        <div>
          <h2 className="text-sm font-semibold text-black">{title}</h2>
          {description && (
            <p className="mt-0.5 text-xs text-black/40">{description}</p>
          )}
        </div>
        {actions && <div className="ml-4 shrink-0">{actions}</div>}
      </div>
      <div className="space-y-5 p-6">{children}</div>
    </div>
  )
}

export function EditorHeader({
  title,
  saved,
  onSave,
}: {
  title: string
  saved: boolean
  onSave: () => void
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/[0.08] bg-[#f2e8d8] px-8 py-4">
      <h1 className="text-[11px] font-semibold tracking-[0.22em] text-black/50 uppercase">
        {title}
      </h1>
      <button
        onClick={onSave}
        className={`px-5 py-2 text-[11px] font-semibold tracking-widest uppercase transition-colors ${
          saved
            ? "bg-black/10 text-black/40"
            : "bg-black text-white hover:bg-black/80"
        }`}
      >
        {saved ? "Saved ✓" : "Save Changes"}
      </button>
    </div>
  )
}

export function FieldRow({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>
}

export function FieldRow3({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-3 gap-4">{children}</div>
}

export function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-black/[0.07]" />
      {label && (
        <span className="shrink-0 text-[10px] tracking-widest text-black/30 uppercase">
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-black/[0.07]" />
    </div>
  )
}

export function useSaveState() {
  return { saved: false, onSave: () => {} }
}
