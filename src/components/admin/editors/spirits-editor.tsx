"use client"

import { useState } from "react"
import { EditorHeader, Field, FieldRow, SectionPanel, Textarea } from "~/components/admin/ui"

type SpiritItem = { id: string; name: string; notes: string; price: string }
type SpiritSection = { id: string; category: string; label: string; items: SpiritItem[] }

const uid = () => Math.random().toString(36).slice(2, 9)

const INITIAL_SECTIONS: SpiritSection[] = [
  {
    id: uid(),
    category: "Whiskey",
    label: "The Cellar",
    items: [
      { id: uid(), name: "Pappy Van Winkle 15yr", notes: "Buffalo, Kentucky", price: "65" },
      { id: uid(), name: "Blanton's Original", notes: "Buffalo Trace, Kentucky", price: "22" },
      { id: uid(), name: "Hibiki 17yr", notes: "Suntory, Japan", price: "38" },
      { id: uid(), name: "Ardbeg 10yr", notes: "Islay, Scotland", price: "18" },
      { id: uid(), name: "Buffalo Trace", notes: "Buffalo Trace, Kentucky", price: "12" },
    ],
  },
  {
    id: uid(),
    category: "Gin",
    label: "Botanical",
    items: [
      { id: uid(), name: "Hendrick's", notes: "Scotland", price: "14" },
      { id: uid(), name: "The Botanist", notes: "Islay, Scotland", price: "16" },
      { id: uid(), name: "Monkey 47", notes: "Black Forest, Germany", price: "18" },
    ],
  },
  {
    id: uid(),
    category: "Rum & Mezcal",
    label: "Smoke & Cane",
    items: [
      { id: uid(), name: "Diplomatico Reserva Exclusiva", notes: "Venezuela, 12yr", price: "16" },
      { id: uid(), name: "El Silencio Espadin", notes: "Oaxaca, Mexico", price: "13" },
      { id: uid(), name: "Banhez Ensemble", notes: "Oaxaca, Mexico", price: "15" },
    ],
  },
  {
    id: uid(),
    category: "Cognac & Armagnac",
    label: "Aged & Noble",
    items: [
      { id: uid(), name: "Rémy Martin VSOP", notes: "Cognac, France", price: "18" },
      { id: uid(), name: "Château de Laubade XO", notes: "Armagnac, France", price: "28" },
    ],
  },
]

function ItemRow({
  item,
  onEdit,
  onDelete,
}: {
  item: SpiritItem
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex items-center gap-3 border-b border-black/[0.06] py-3 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-black">
          {item.name || <span className="text-black/30">Unnamed</span>}
        </p>
        {item.notes && (
          <p className="mt-0.5 truncate text-[11px] text-black/35">{item.notes}</p>
        )}
      </div>
      <span className="shrink-0 text-xs font-medium text-black/50">
        ${item.price}
      </span>
      <button
        onClick={onEdit}
        className="shrink-0 border border-black/15 px-3 py-1.5 text-[10px] uppercase tracking-widest text-black/50 transition-colors hover:border-black hover:text-black"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="shrink-0 border border-red-300/60 px-3 py-1.5 text-[10px] uppercase tracking-widest text-red-400 transition-colors hover:bg-red-500 hover:text-white"
      >
        Delete
      </button>
    </div>
  )
}

function ItemForm({
  item,
  onSave,
  onCancel,
  isNew,
}: {
  item: SpiritItem
  onSave: (i: SpiritItem) => void
  onCancel: () => void
  isNew: boolean
}) {
  const [draft, setDraft] = useState({ ...item })
  const set = (f: keyof SpiritItem, v: string) =>
    setDraft((p) => ({ ...p, [f]: v }))

  return (
    <div className="my-2 border border-black/[0.1] bg-[#f2e8d8]/40 p-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-black/35">
        {isNew ? "New Spirit" : "Editing Spirit"}
      </p>
      <div className="space-y-3">
        <FieldRow>
          <Field
            label="Name"
            value={draft.name}
            onChange={(v) => set("name", v)}
            placeholder="Pappy Van Winkle 15yr"
          />
          <Field
            label="Price ($)"
            value={draft.price}
            onChange={(v) => set("price", v)}
            placeholder="65"
          />
        </FieldRow>
        <Field
          label="Origin / Notes"
          value={draft.notes}
          onChange={(v) => set("notes", v)}
          placeholder="Buffalo, Kentucky"
        />
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onSave(draft)}
          className="bg-black px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black/80"
        >
          {isNew ? "Add Spirit" : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-[11px] uppercase tracking-widest text-black/40 transition-colors hover:text-black"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function SectionBlock({
  section,
  onUpdate,
  onDelete,
}: {
  section: SpiritSection
  onUpdate: (s: SpiritSection) => void
  onDelete: () => void
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [addingNew, setAddingNew] = useState(false)

  function saveItem(item: SpiritItem) {
    onUpdate({
      ...section,
      items: section.items.map((i) => (i.id === item.id ? item : i)),
    })
    setEditingId(null)
  }

  function addItem(item: SpiritItem) {
    onUpdate({ ...section, items: [...section.items, item] })
    setAddingNew(false)
  }

  function deleteItem(id: string) {
    onUpdate({ ...section, items: section.items.filter((i) => i.id !== id) })
  }

  return (
    <div className="border border-black/[0.08] bg-white">
      {/* Section header */}
      <div className="flex items-center justify-between border-b border-black/[0.08] px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-black">{section.category}</h3>
          <p className="mt-0.5 text-[10px] text-black/30">Label: {section.label}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-black/30">
            {section.items.length} item{section.items.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={onDelete}
            className="text-[10px] uppercase tracking-widest text-red-400 transition-colors hover:text-red-600"
          >
            Delete Section
          </button>
        </div>
      </div>

      {/* Section metadata */}
      <div className="grid grid-cols-2 gap-4 border-b border-black/[0.06] px-5 py-4">
        <Field
          label="Category Name"
          value={section.category}
          onChange={(v) => onUpdate({ ...section, category: v })}
        />
        <Field
          label="Section Label"
          value={section.label}
          onChange={(v) => onUpdate({ ...section, label: v })}
        />
      </div>

      {/* Items */}
      <div className="px-5">
        {section.items.map((item) =>
          editingId === item.id ? (
            <ItemForm
              key={item.id}
              item={item}
              isNew={false}
              onSave={saveItem}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <ItemRow
              key={item.id}
              item={item}
              onEdit={() => setEditingId(item.id)}
              onDelete={() => deleteItem(item.id)}
            />
          ),
        )}

        {addingNew && (
          <ItemForm
            item={{ id: uid(), name: "", notes: "", price: "" }}
            isNew
            onSave={addItem}
            onCancel={() => setAddingNew(false)}
          />
        )}

        <div className="py-4">
          {!addingNew && (
            <button
              onClick={() => setAddingNew(true)}
              className="text-[11px] uppercase tracking-widest text-black/40 underline underline-offset-2 transition-colors hover:text-black hover:no-underline"
            >
              + Add Spirit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function SpiritsEditor() {
  const [saved, setSaved] = useState(false)
  const [pageHeading, setPageHeading] = useState("Spirits")
  const [pageSubtext, setPageSubtext] = useState(
    "A thoughtfully assembled collection of world-class whiskeys, gins, and rare pours, served neat, on rocks, or in classic form.",
  )
  const [pageEyebrow, setPageEyebrow] = useState("The Bar")
  const [sections, setSections] = useState<SpiritSection[]>(INITIAL_SECTIONS)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function updateSection(updated: SpiritSection) {
    setSections((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
  }

  function deleteSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id))
  }

  function addSection() {
    setSections((prev) => [
      ...prev,
      { id: uid(), category: "New Category", label: "Label", items: [] },
    ])
  }

  return (
    <div className="flex flex-col">
      <EditorHeader title="Spirits" saved={saved} onSave={handleSave} />

      <div className="space-y-6 p-8">
        {/* Page hero */}
        <SectionPanel
          title="Page Header"
          description="Displayed at the top of the spirits page"
        >
          <FieldRow>
            <Field
              label="Eyebrow Label"
              value={pageEyebrow}
              onChange={setPageEyebrow}
            />
            <Field
              label="Page Heading"
              value={pageHeading}
              onChange={setPageHeading}
            />
          </FieldRow>
          <Textarea
            label="Subtitle / Description"
            value={pageSubtext}
            onChange={setPageSubtext}
            rows={2}
          />
        </SectionPanel>

        {/* Sections */}
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-black/40">
            Spirit Sections
          </p>

          {sections.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              onUpdate={updateSection}
              onDelete={() => deleteSection(section.id)}
            />
          ))}
        </div>

        <button
          onClick={addSection}
          className="flex w-full items-center justify-center gap-2 border border-dashed border-black/20 py-4 text-[11px] uppercase tracking-widest text-black/40 transition-colors hover:border-black/40 hover:text-black"
        >
          + Add New Section
        </button>
      </div>
    </div>
  )
}
