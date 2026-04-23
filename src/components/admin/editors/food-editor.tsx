"use client"

import { useState } from "react"
import { ImageUpload } from "~/components/admin/image-upload"
import { EditorHeader, Field, FieldRow, SectionPanel, Textarea } from "~/components/admin/ui"

type FoodItem = {
  id: string
  name: string
  description: string
  price: string
}

type FoodSection = {
  id: string
  name: string
  items: FoodItem[]
}

const uid = () => Math.random().toString(36).slice(2, 9)

const INITIAL_SECTIONS: FoodSection[] = [
  {
    id: uid(),
    name: "Starters",
    items: [
      { id: uid(), name: "Bone Marrow", description: "Roasted split bones, gremolata, grilled sourdough", price: "18" },
      { id: uid(), name: "Beef Tartare", description: "Hand-cut tenderloin, cured egg yolk, capers, mustard seed", price: "22" },
      { id: uid(), name: "Charred Octopus", description: "Romesco, fingerling potatoes, chorizo vinaigrette", price: "24" },
      { id: uid(), name: "Burrata", description: "Heirloom tomato, basil oil, aged balsamic, grilled bread", price: "16" },
      { id: uid(), name: "Oysters on the Half Shell", description: "Half dozen, mignonette, cocktail sauce, fresh horseradish", price: "21" },
    ],
  },
  {
    id: uid(),
    name: "Entrées",
    items: [
      { id: uid(), name: "Bone-In Ribeye", description: "Dry-aged 45 days, roasted marrow butter", price: "68" },
      { id: uid(), name: "Braised Short Rib", description: "Red wine reduction, root vegetables, horseradish gremolata", price: "42" },
      { id: uid(), name: "Pan-Seared Duck Breast", description: "Cherry gastrique, wild rice, charred broccolini", price: "38" },
      { id: uid(), name: "Grilled Lamb Chops", description: "Herb crust, mint chimichurri, fingerling potatoes", price: "54" },
      { id: uid(), name: "Berkshire Pork Chop", description: "Brined and grilled, apple mostarda, braised greens", price: "36" },
      { id: uid(), name: "Seared Scallops", description: "Cauliflower purée, brown butter, crispy capers, pancetta", price: "44" },
      { id: uid(), name: "Whole Branzino", description: "Wood-grilled, lemon, herbs, olive oil, roasted fennel", price: "40" },
    ],
  },
  {
    id: uid(),
    name: "Sides",
    items: [
      { id: uid(), name: "Truffle Fries", description: "", price: "12" },
      { id: uid(), name: "Creamed Spinach", description: "", price: "10" },
      { id: uid(), name: "Roasted Bone Marrow Mashed Potatoes", description: "", price: "14" },
      { id: uid(), name: "Charred Broccolini", description: "", price: "11" },
      { id: uid(), name: "Brussels Sprouts", description: "Bacon, balsamic glaze", price: "12" },
      { id: uid(), name: "Mac & Cheese", description: "Gruyère, white cheddar, breadcrumb crust", price: "13" },
    ],
  },
  {
    id: uid(),
    name: "Desserts",
    items: [
      { id: uid(), name: "Bourbon Crème Brûlée", description: "Woodford Reserve custard, torched sugar, shortbread", price: "14" },
      { id: uid(), name: "Chocolate Torte", description: "Flourless, espresso crème, candied hazelnuts", price: "15" },
      { id: uid(), name: "Bread Pudding", description: "Brioche, salted caramel, vanilla bean ice cream", price: "13" },
    ],
  },
]

function ItemRow({
  item,
  onEdit,
  onDelete,
}: {
  item: FoodItem
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex items-center gap-3 border-b border-black/[0.06] py-3 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-black">
          {item.name || <span className="text-black/30">Unnamed item</span>}
        </p>
        {item.description && (
          <p className="mt-0.5 truncate text-[11px] text-black/35">
            {item.description}
          </p>
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
  item: FoodItem
  onSave: (i: FoodItem) => void
  onCancel: () => void
  isNew: boolean
}) {
  const [draft, setDraft] = useState({ ...item })
  const set = (f: keyof FoodItem, v: string) =>
    setDraft((p) => ({ ...p, [f]: v }))

  return (
    <div className="my-2 border border-black/[0.1] bg-[#f2e8d8]/40 p-4">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-black/35">
        {isNew ? "New Item" : "Editing Item"}
      </p>
      <div className="space-y-3">
        <FieldRow>
          <Field
            label="Name"
            value={draft.name}
            onChange={(v) => set("name", v)}
            placeholder="Item name"
          />
          <Field
            label="Price ($)"
            value={draft.price}
            onChange={(v) => set("price", v)}
            placeholder="18"
          />
        </FieldRow>
        <Textarea
          label="Description"
          value={draft.description}
          onChange={(v) => set("description", v)}
          rows={2}
          placeholder="Ingredients and preparation notes"
        />
        <ImageUpload label="Item Image" compact />
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onSave(draft)}
          className="bg-black px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black/80"
        >
          {isNew ? "Add Item" : "Save"}
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
  section: FoodSection
  onUpdate: (s: FoodSection) => void
  onDelete: () => void
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [addingNew, setAddingNew] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [nameVal, setNameVal] = useState(section.name)

  function saveItem(item: FoodItem) {
    onUpdate({
      ...section,
      items: section.items.map((i) => (i.id === item.id ? item : i)),
    })
    setEditingId(null)
  }

  function addItem(item: FoodItem) {
    onUpdate({ ...section, items: [...section.items, item] })
    setAddingNew(false)
  }

  function deleteItem(id: string) {
    onUpdate({ ...section, items: section.items.filter((i) => i.id !== id) })
  }

  function saveName() {
    onUpdate({ ...section, name: nameVal })
    setEditingName(false)
  }

  return (
    <div className="border border-black/[0.08] bg-white">
      {/* Section header */}
      <div className="flex items-center justify-between border-b border-black/[0.08] px-5 py-4">
        {editingName ? (
          <div className="flex flex-1 items-center gap-2">
            <input
              autoFocus
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              className="flex-1 border-b border-black px-0 py-0.5 text-sm font-semibold text-black focus:outline-none"
            />
            <button
              onClick={saveName}
              className="text-[10px] uppercase tracking-widest text-black"
            >
              Done
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="group flex items-center gap-2"
          >
            <h3 className="text-sm font-semibold text-black">{section.name}</h3>
            <span className="text-[10px] text-black/25 opacity-0 transition-opacity group-hover:opacity-100">
              rename
            </span>
          </button>
        )}
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
            item={{ id: uid(), name: "", description: "", price: "" }}
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
              + Add Item
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function FoodEditor() {
  const [saved, setSaved] = useState(false)
  const [pageHeading, setPageHeading] = useState("Food")
  const [pageSubtext, setPageSubtext] = useState(
    "Heritage sourcing, meticulous preparation, and a commitment to the season on every plate.",
  )
  const [sections, setSections] = useState<FoodSection[]>(INITIAL_SECTIONS)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function updateSection(updated: FoodSection) {
    setSections((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
  }

  function deleteSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id))
  }

  function addSection() {
    setSections((prev) => [
      ...prev,
      { id: uid(), name: "New Section", items: [] },
    ])
  }

  return (
    <div className="flex flex-col">
      <EditorHeader title="Food" saved={saved} onSave={handleSave} />

      <div className="space-y-6 p-8">
        {/* Page hero */}
        <SectionPanel
          title="Page Header"
          description="Displayed at the top of the food menu page"
        >
          <FieldRow>
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
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-black/40">
              Menu Sections
            </p>
          </div>

          {sections.map((section) => (
            <SectionBlock
              key={section.id}
              section={section}
              onUpdate={updateSection}
              onDelete={() => deleteSection(section.id)}
            />
          ))}
        </div>

        {/* Add section */}
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
