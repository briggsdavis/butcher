"use client"

import { useState } from "react"
import { ImageUpload } from "~/components/admin/image-upload"
import { EditorHeader, Field, FieldRow, Textarea } from "~/components/admin/ui"

type StaffMember = {
  id: string
  name: string
  role: string
  quote: string
  years: string
  initials: string
  specialty: string
  headshot: string
}

const uid = () => Math.random().toString(36).slice(2, 9)

const INITIAL_STAFF: StaffMember[] = [
  {
    id: uid(),
    name: "Marcus Chen",
    role: "Executive Chef",
    quote: "Every cut tells a story. We make sure it's a great one.",
    years: "12 years",
    initials: "MC",
    specialty: "Dry-aged beef & modern American cuisine",
    headshot: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    id: uid(),
    name: "Elena Vasquez",
    role: "Sous Chef",
    quote: "Precision and passion: you need both in equal measure.",
    years: "8 years",
    initials: "EV",
    specialty: "Braises & whole-animal butchery",
    headshot: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    id: uid(),
    name: "James O'Brien",
    role: "Head Butcher",
    quote: "I've spent my life learning the art of the cut.",
    years: "15 years",
    initials: "JO",
    specialty: "Prime and Wagyu beef selection",
    headshot: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    id: uid(),
    name: "Sophia Reeves",
    role: "Bar Director",
    quote: "A great cocktail starts long before it reaches the glass.",
    years: "10 years",
    initials: "SR",
    specialty: "Whiskey-forward cocktails & house infusions",
    headshot: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    id: uid(),
    name: "Dominic Rossi",
    role: "Wine & Spirits Director",
    quote: "The right pour can transform an entire evening.",
    years: "9 years",
    initials: "DR",
    specialty: "Old World wine & American single-malt",
    headshot: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    id: uid(),
    name: "Amara Washington",
    role: "General Manager",
    quote: "Hospitality isn't a job. It's a calling.",
    years: "11 years",
    initials: "AW",
    specialty: "Guest experience & team development",
    headshot: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: uid(),
    name: "Claire Fontaine",
    role: "Pastry Chef",
    quote: "Dessert should be the memory that lingers longest.",
    years: "7 years",
    initials: "CF",
    specialty: "Seasonal tarts, chocolate & house ice cream",
    headshot: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: uid(),
    name: "Theo Nakamura",
    role: "Head Server",
    quote: "Every table is someone's special night. We never forget that.",
    years: "6 years",
    initials: "TN",
    specialty: "Wine pairing & elevated front-of-house service",
    headshot: "https://randomuser.me/api/portraits/men/22.jpg",
  },
]

const EMPTY_MEMBER = (): StaffMember => ({
  id: uid(),
  name: "",
  role: "",
  quote: "",
  years: "",
  initials: "",
  specialty: "",
  headshot: "",
})

function StaffModal({
  member,
  onClose,
  onSave,
  isNew,
}: {
  member: StaffMember
  onClose: () => void
  onSave: (m: StaffMember) => void
  isNew: boolean
}) {
  const [draft, setDraft] = useState<StaffMember>({ ...member })

  function set(field: keyof StaffMember, val: string) {
    setDraft((prev) => ({ ...prev, [field]: val }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border border-black/[0.1] bg-white shadow-xl">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-black/[0.08] px-6 py-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/50">
            {isNew ? "Add Staff Member" : "Edit Staff Member"}
          </h2>
          <button
            onClick={onClose}
            className="text-black/30 transition-colors hover:text-black"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          <FieldRow>
            <Field
              label="Full Name"
              value={draft.name}
              onChange={(v) => set("name", v)}
              placeholder="Marcus Chen"
            />
            <Field
              label="Role / Title"
              value={draft.role}
              onChange={(v) => set("role", v)}
              placeholder="Executive Chef"
            />
          </FieldRow>
          <FieldRow>
            <Field
              label="Initials"
              value={draft.initials}
              onChange={(v) => set("initials", v)}
              placeholder="MC"
            />
            <Field
              label="Years at Restaurant"
              value={draft.years}
              onChange={(v) => set("years", v)}
              placeholder="12 years"
            />
          </FieldRow>
          <Field
            label="Specialty"
            value={draft.specialty}
            onChange={(v) => set("specialty", v)}
            placeholder="Dry-aged beef & modern American cuisine"
          />
          <Textarea
            label="Quote"
            value={draft.quote}
            onChange={(v) => set("quote", v)}
            rows={2}
            placeholder="Every cut tells a story..."
          />
          <ImageUpload
            label="Headshot"
            currentSrc={draft.headshot || undefined}
            hint="Portrait photo of the staff member"
          />
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-end gap-3 border-t border-black/[0.08] px-6 py-4">
          <button
            onClick={onClose}
            className="px-5 py-2 text-[11px] uppercase tracking-widest text-black/40 transition-colors hover:text-black"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(draft)}
            className="bg-black px-6 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black/80"
          >
            {isNew ? "Add Member" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}

export function StaffEditor() {
  const [saved, setSaved] = useState(false)
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF)
  const [modal, setModal] = useState<{
    member: StaffMember
    isNew: boolean
  } | null>(null)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function openAdd() {
    setModal({ member: EMPTY_MEMBER(), isNew: true })
  }

  function openEdit(m: StaffMember) {
    setModal({ member: m, isNew: false })
  }

  function handleModalSave(m: StaffMember) {
    if (modal?.isNew) {
      setStaff((prev) => [...prev, m])
    } else {
      setStaff((prev) => prev.map((s) => (s.id === m.id ? m : s)))
    }
    setModal(null)
  }

  function handleDelete(id: string) {
    setStaff((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="flex flex-col">
      <EditorHeader title="Staff" saved={saved} onSave={handleSave} />

      <div className="p-8">
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[11px] text-black/40">
            {staff.length} staff member{staff.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={openAdd}
            className="bg-black px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-black/80"
          >
            + Add Member
          </button>
        </div>

        {/* Staff grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {staff.map((member) => (
            <div
              key={member.id}
              className="border border-black/[0.08] bg-white"
            >
              {/* Photo */}
              <div className="relative aspect-square w-full overflow-hidden bg-black/[0.04]">
                {member.headshot ? (
                  <img
                    src={member.headshot}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-3xl font-light text-black/20">
                      {member.initials || "?"}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-sm font-semibold leading-tight text-black">
                  {member.name || (
                    <span className="text-black/30">Unnamed</span>
                  )}
                </p>
                <p className="mt-0.5 text-[11px] text-black/40">
                  {member.role}
                </p>
                <p className="mt-1 text-[10px] text-black/25">{member.years}</p>
              </div>

              {/* Actions */}
              <div className="flex border-t border-black/[0.06]">
                <button
                  onClick={() => openEdit(member)}
                  className="flex-1 py-2.5 text-[10px] uppercase tracking-widest text-black/40 transition-colors hover:bg-black/[0.04] hover:text-black"
                >
                  Edit
                </button>
                <div className="w-px bg-black/[0.06]" />
                <button
                  onClick={() => handleDelete(member.id)}
                  className="flex-1 py-2.5 text-[10px] uppercase tracking-widest text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {staff.length === 0 && (
          <div className="flex h-48 items-center justify-center border border-dashed border-black/15">
            <div className="text-center">
              <p className="text-sm text-black/30">No staff members yet.</p>
              <button
                onClick={openAdd}
                className="mt-3 text-[11px] uppercase tracking-widest text-black underline underline-offset-2 hover:no-underline"
              >
                Add the first member
              </button>
            </div>
          </div>
        )}
      </div>

      {modal && (
        <StaffModal
          member={modal.member}
          isNew={modal.isNew}
          onClose={() => setModal(null)}
          onSave={handleModalSave}
        />
      )}
    </div>
  )
}
