"use client"

import { useMutation, useQuery } from "convex/react"
import { RotateCcw, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import {
  COMMON_VALUE_SECTIONS,
  getCommonValueFields,
  getDefaultCommonValues,
  type CommonValueField,
} from "~/lib/common-values"
import { api } from "../../../../convex/_generated/api"

type AdminCommonValues = {
  fields: Record<string, string>
  updatedAt?: number
} | null

export function CommonValuesEditor() {
  const router = useRouter()
  const savedValues = useQuery(api.site.getCommonValuesForAdmin, {}) as
    | AdminCommonValues
    | undefined
  const saveCommonValues = useMutation(api.site.saveCommonValues)
  const defaultFields = useMemo(() => getDefaultCommonValues(), [])

  const [fields, setFields] = useState<Record<string, string>>({})
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    if (savedValues === undefined) return
    setFields({ ...defaultFields, ...savedValues?.fields })
  }, [defaultFields, savedValues])

  function updateField(field: CommonValueField, value: string) {
    setFields((current) => ({ ...current, [field.key]: value }))
  }

  function restoreDefaults() {
    setFields(defaultFields)
    setNotice("Defaults staged. Save to publish them.")
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    setError(null)
    setNotice(null)

    try {
      const nextFields = Object.fromEntries(
        getCommonValueFields().map((field) => [field.key, fields[field.key] ?? ""]),
      )
      await saveCommonValues({ fields: nextFields })
      setNotice("Common values saved.")
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
              <span className="text-xs text-amber uppercase">Site Settings</span>
            </div>
            <h1 className="heading-emboss mt-3 font-display text-5xl text-cream md:text-6xl">
              Common Values
            </h1>
            <p className="mt-4 max-w-xl text-sm text-tan/70">
              Shared details used across the site, including contact information, location, hours,
              reservation links, and social links.
            </p>
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
              disabled={pending}
              className="flex items-center gap-2 border border-amber px-6 py-3 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream disabled:opacity-50"
            >
              <Save className="size-3.5" />
              {pending ? "Saving..." : "Save values"}
            </button>
          </div>
        </div>

        {savedValues === undefined ? (
          <p className="mt-12 text-sm text-tan/60">Loading...</p>
        ) : (
          <div className="mt-10 space-y-10">
            {COMMON_VALUE_SECTIONS.map((section) => (
              <section key={section.title} className="border border-amber/25 p-6">
                <h2 className="font-display text-3xl text-cream">{section.title}</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {section.fields.map((field) => (
                    <CommonFieldEditor
                      key={field.key}
                      field={field}
                      value={fields[field.key] ?? ""}
                      onChange={updateField}
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

function CommonFieldEditor({
  field,
  value,
  onChange,
}: {
  field: CommonValueField
  value: string
  onChange: (field: CommonValueField, value: string) => void
}) {
  return (
    <label className={`flex flex-col gap-2 ${field.kind === "textarea" ? "md:col-span-2" : ""}`}>
      <span className="text-xs text-amber uppercase">{field.label}</span>
      {field.kind === "textarea" ? (
        <textarea
          value={value}
          rows={4}
          onChange={(e) => onChange(field, e.target.value)}
          className="resize-none border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className="border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"
        />
      )}
      {field.help && <span className="text-xs text-tan/50">{field.help}</span>}
    </label>
  )
}
