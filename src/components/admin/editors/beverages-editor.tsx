"use client"

import Image from "next/image"
import { useState } from "react"
import { ImageUpload } from "~/components/admin/image-upload"
import {
  EditorHeader,
  Field,
  FieldRow,
  SectionPanel,
  Textarea,
} from "~/components/admin/ui"

type BevItem = {
  id: string
  name: string
  notes: string
  price: string
  image: string
}
type BevSection = {
  id: string
  category: string
  label: string
  items: BevItem[]
}

const uid = () => Math.random().toString(36).slice(2, 9)

const INITIAL_SECTIONS: BevSection[] = [
  {
    id: uid(),
    category: "Cocktails",
    label: "Crafted",
    items: [
      {
        id: uid(),
        name: "Old Fashioned",
        notes: "Bourbon, demerara, Angostura, orange",
        price: "16",
        image: "/craft-old-fashioned.jpg",
      },
      {
        id: uid(),
        name: "Rye Negroni",
        notes: "Rye, Campari, sweet vermouth, expressed orange",
        price: "15",
        image: "",
      },
      {
        id: uid(),
        name: "Smoked Manhattan",
        notes: "Bulleit Rye, Carpano Antica, cherry bitters",
        price: "18",
        image: "",
      },
      {
        id: uid(),
        name: "Paper Plane",
        notes: "Bourbon, Aperol, Amaro Nonino, lemon",
        price: "16",
        image: "",
      },
      {
        id: uid(),
        name: "Butcher's Mule",
        notes: "Vodka, ginger beer, lime, house bitters",
        price: "13",
        image: "",
      },
      {
        id: uid(),
        name: "Seasonal Spritz",
        notes: "Ask your server for today's selection",
        price: "14",
        image: "",
      },
    ],
  },
  {
    id: uid(),
    category: "Red Wine",
    label: "The Cellar",
    items: [
      {
        id: uid(),
        name: "Caymus Cabernet Sauvignon",
        notes: "Napa Valley, 2021",
        price: "24",
        image: "",
      },
      {
        id: uid(),
        name: "Château Pichon Baron",
        notes: "Pauillac, Bordeaux, 2018",
        price: "38",
        image: "",
      },
      {
        id: uid(),
        name: "Meiomi Pinot Noir",
        notes: "California, 2022",
        price: "15",
        image: "",
      },
    ],
  },
  {
    id: uid(),
    category: "White & Sparkling",
    label: "Light & Bright",
    items: [
      {
        id: uid(),
        name: "Rombauer Chardonnay",
        notes: "Carneros, Napa, 2022",
        price: "18",
        image: "",
      },
      {
        id: uid(),
        name: "Whispering Angel Rosé",
        notes: "Provence, France, 2023",
        price: "16",
        image: "",
      },
      {
        id: uid(),
        name: "Ruinart Blanc de Blancs",
        notes: "Champagne, France, NV",
        price: "32",
        image: "",
      },
    ],
  },
  {
    id: uid(),
    category: "Non-Alcoholic",
    label: "Zero Proof",
    items: [
      {
        id: uid(),
        name: "House Lemonade",
        notes: "Fresh-squeezed, thyme, sea salt",
        price: "7",
        image: "",
      },
      {
        id: uid(),
        name: "Sparkling Water",
        notes: "San Pellegrino, 750ml",
        price: "6",
        image: "",
      },
      {
        id: uid(),
        name: "Cold Brew Coffee",
        notes: "Single origin, unsweetened",
        price: "6",
        image: "",
      },
    ],
  },
]

function ItemRow({
  item,
  onEdit,
  onDelete,
}: {
  item: BevItem
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex items-center gap-3 border-b border-black/[0.06] py-3 last:border-0">
      {/* Per-item thumbnail */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden border border-black/[0.08] bg-black/[0.04]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[8px] tracking-wider text-black/20 uppercase">
            No img
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-black">
          {item.name || <span className="text-black/30">Unnamed</span>}
        </p>
        {item.notes && (
          <p className="mt-0.5 truncate text-[11px] text-black/35">
            {item.notes}
          </p>
        )}
      </div>
      <span className="shrink-0 text-xs font-medium text-black/50">
        ${item.price}
      </span>
      <button
        onClick={onEdit}
        className="shrink-0 border border-black/15 px-3 py-1.5 text-[10px] tracking-widest text-black/50 uppercase transition-colors hover:border-black hover:text-black"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="shrink-0 border border-red-300/60 px-3 py-1.5 text-[10px] tracking-widest text-red-400 uppercase transition-colors hover:bg-red-500 hover:text-white"
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
  item: BevItem
  onSave: (i: BevItem) => void
  onCancel: () => void
  isNew: boolean
}) {
  const [draft, setDraft] = useState({ ...item })
  const set = (f: keyof BevItem, v: string) =>
    setDraft((p) => ({ ...p, [f]: v }))

  return (
    <div className="my-2 border border-black/[0.1] bg-[#f2e8d8]/40 p-4">
      <p className="mb-3 text-[10px] font-semibold tracking-widest text-black/35 uppercase">
        {isNew ? "New Item" : "Editing Item"}
      </p>
      <div className="space-y-3">
        <FieldRow>
          <Field
            label="Name"
            value={draft.name}
            onChange={(v) => set("name", v)}
            placeholder="Old Fashioned"
          />
          <Field
            label="Price ($)"
            value={draft.price}
            onChange={(v) => set("price", v)}
            placeholder="16"
          />
        </FieldRow>
        <Field
          label="Notes / Description"
          value={draft.notes}
          onChange={(v) => set("notes", v)}
          placeholder="Bourbon, demerara, Angostura, orange"
        />
        <ImageUpload
          label="Item Image"
          currentSrc={draft.image || undefined}
          hint="Photo shown as thumbnail for this item"
          compact
          onChange={(url) => set("image", url)}
        />
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onSave(draft)}
          className="bg-black px-5 py-2 text-[11px] font-semibold tracking-widest text-white uppercase transition-colors hover:bg-black/80"
        >
          {isNew ? "Add Item" : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-[11px] tracking-widest text-black/40 uppercase transition-colors hover:text-black"
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
  section: BevSection
  onUpdate: (s: BevSection) => void
  onDelete: () => void
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [addingNew, setAddingNew] = useState(false)

  function saveItem(item: BevItem) {
    onUpdate({
      ...section,
      items: section.items.map((i) => (i.id === item.id ? item : i)),
    })
    setEditingId(null)
  }

  function addItem(item: BevItem) {
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
          <h3 className="text-sm font-semibold text-black">
            {section.category}
          </h3>
          <p className="mt-0.5 text-[10px] text-black/30">
            Label: {section.label}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-black/30">
            {section.items.length} item{section.items.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={onDelete}
            className="text-[10px] tracking-widest text-red-400 uppercase transition-colors hover:text-red-600"
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
            item={{ id: uid(), name: "", notes: "", price: "", image: "" }}
            isNew
            onSave={addItem}
            onCancel={() => setAddingNew(false)}
          />
        )}

        <div className="py-4">
          {!addingNew && (
            <button
              onClick={() => setAddingNew(true)}
              className="text-[11px] tracking-widest text-black/40 uppercase underline underline-offset-2 transition-colors hover:text-black hover:no-underline"
            >
              + Add Item
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function BeveragesEditor() {
  const [saved, setSaved] = useState(false)
  const [pageHeading, setPageHeading] = useState("Beverages")
  const [pageSubtext, setPageSubtext] = useState(
    "Cocktails crafted with intention, wines chosen for the table, and non-alcoholic options that stand on their own.",
  )
  const [pageEyebrow, setPageEyebrow] = useState("The Bar")
  const [sections, setSections] = useState<BevSection[]>(INITIAL_SECTIONS)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function updateSection(updated: BevSection) {
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
      <EditorHeader title="Beverages" saved={saved} onSave={handleSave} />

      <div className="space-y-6 p-8">
        {/* Page hero */}
        <SectionPanel
          title="Page Header"
          description="Displayed at the top of the beverages page"
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
          <p className="text-[11px] font-semibold tracking-widest text-black/40 uppercase">
            Beverage Sections
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
          className="flex w-full items-center justify-center gap-2 border border-dashed border-black/20 py-4 text-[11px] tracking-widest text-black/40 uppercase transition-colors hover:border-black/40 hover:text-black"
        >
          + Add New Section
        </button>
      </div>
    </div>
  )
}
