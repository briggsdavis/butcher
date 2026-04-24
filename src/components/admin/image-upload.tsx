"use client"

import { useRef, useState } from "react"

interface Props {
  label?: string
  currentSrc?: string
  hint?: string
  compact?: boolean
  onChange?: (dataUrl: string) => void
}

export function ImageUpload({ label, currentSrc, hint, compact = false, onChange }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const ref = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target?.result as string
      setPreview(url)
      onChange?.(url)
    }
    reader.readAsDataURL(file)
  }

  const src = preview ?? currentSrc

  return (
    <div>
      {label && (
        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-black/40">
          {label}
        </label>
      )}
      <div className="flex items-center gap-4">
        <div
          className={`relative shrink-0 overflow-hidden border border-black/10 bg-black/[0.04] ${
            compact ? "h-14 w-20" : "h-20 w-28"
          }`}
        >
          {src ? (
            <img
              src={src}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-[9px] uppercase tracking-widest text-black/20">
              No image
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="border border-black/20 px-4 py-2 text-[11px] uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
          >
            Upload Image
          </button>
          {fileName ? (
            <span className="max-w-[200px] truncate text-[10px] text-black/40">
              {fileName}
            </span>
          ) : hint ? (
            <span className="text-[10px] text-black/30">{hint}</span>
          ) : null}
        </div>
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  )
}
