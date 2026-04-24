"use client"

import { useState } from "react"
import { ImageUpload } from "~/components/admin/image-upload"
import {
  Divider,
  EditorHeader,
  Field,
  FieldRow,
  SectionPanel,
} from "~/components/admin/ui"

type NavLink = { id: string; label: string; href: string; num: string }

const uid = () => Math.random().toString(36).slice(2, 9)

const INITIAL_NAV: NavLink[] = [
  { id: uid(), label: "Home", href: "/", num: "01" },
  { id: uid(), label: "About", href: "/about", num: "02" },
  { id: uid(), label: "Our Staff", href: "/our-staff", num: "03" },
  { id: uid(), label: "Food", href: "/food", num: "04" },
  { id: uid(), label: "Spirits", href: "/spirits", num: "05" },
  { id: uid(), label: "Beverages", href: "/beverages", num: "06" },
  { id: uid(), label: "Reserve", href: "/#reservations", num: "07" },
]

export function GlobalEditor() {
  const [saved, setSaved] = useState(false)

  // Site identity
  const [siteTitle, setSiteTitle] = useState("Butcher and the Rye")
  const [titleTemplate, setTitleTemplate] = useState("%s · Butcher and the Rye")
  const [navTitle, setNavTitle] = useState("Butcher & the Rye")

  // Nav links
  const [navLinks, setNavLinks] = useState<NavLink[]>(INITIAL_NAV)

  // Footer — contact
  const [phone, setPhone] = useState("(412) 391-2752")
  const [email, setEmail] = useState("info@butcherandtherye.com")
  const [instagram, setInstagram] = useState("#")
  const [facebook, setFacebook] = useState("#")

  // Footer — location
  const [addressLine1, setAddressLine1] = useState("2195 Penn Avenue")
  const [addressLine2, setAddressLine2] = useState("Pittsburgh, PA 15222")
  const [directionsUrl, setDirectionsUrl] = useState("#")

  // Footer — hours
  const [hours, setHours] = useState([
    { id: uid(), days: "Monday – Thursday", time: "5pm – 11pm" },
    { id: uid(), days: "Friday – Saturday", time: "5pm – 12am" },
    { id: uid(), days: "Sunday", time: "4pm – 10pm" },
  ])

  // Footer — bottom bar
  const [copyright, setCopyright] = useState(
    "© {year} Butcher and the Rye. All rights reserved.",
  )
  const [creditText, setCreditText] = useState("Made by Briggs Davis")
  const [creditUrl, setCreditUrl] = useState("https://briggsdavis.com")

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function updateNavLink(id: string, field: keyof NavLink, val: string) {
    setNavLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: val } : l)),
    )
  }

  function deleteNavLink(id: string) {
    setNavLinks((prev) => prev.filter((l) => l.id !== id))
  }

  function addNavLink() {
    const next = String(navLinks.length + 1).padStart(2, "0")
    setNavLinks((prev) => [
      ...prev,
      { id: uid(), label: "New Link", href: "/", num: next },
    ])
  }

  function updateHour(id: string, field: "days" | "time", val: string) {
    setHours((prev) =>
      prev.map((h) => (h.id === id ? { ...h, [field]: val } : h)),
    )
  }

  function deleteHour(id: string) {
    setHours((prev) => prev.filter((h) => h.id !== id))
  }

  function addHour() {
    setHours((prev) => [...prev, { id: uid(), days: "", time: "" }])
  }

  return (
    <div className="flex flex-col">
      <EditorHeader title="Global" saved={saved} onSave={handleSave} />

      <div className="space-y-6 p-8">
        {/* Site Identity */}
        <SectionPanel
          title="Site Identity"
          description="Browser tab title, SEO metadata, and favicon"
        >
          <FieldRow>
            <Field
              label="Site Title (default)"
              value={siteTitle}
              onChange={setSiteTitle}
              placeholder="Butcher and the Rye"
            />
            <Field
              label="Title Template"
              value={titleTemplate}
              onChange={setTitleTemplate}
              placeholder="%s · Butcher and the Rye"
            />
          </FieldRow>
          <ImageUpload
            label="Favicon"
            hint="Recommended: 32×32px or 64×64px .ico / .png"
          />
        </SectionPanel>

        {/* Navigation */}
        <SectionPanel
          title="Navigation"
          description="The main site nav bar and full-screen menu overlay"
        >
          <Field
            label="Centered Nav Title"
            value={navTitle}
            onChange={setNavTitle}
            placeholder="Butcher & the Rye"
          />
          <Divider label="Menu Links" />
          <div className="space-y-2">
            {navLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center gap-3 rounded border border-black/[0.06] bg-black/[0.02] px-3 py-2"
              >
                <span className="w-6 shrink-0 font-mono text-[10px] text-black/25">
                  {link.num}
                </span>
                <input
                  value={link.label}
                  onChange={(e) =>
                    updateNavLink(link.id, "label", e.target.value)
                  }
                  placeholder="Label"
                  className="w-32 shrink-0 border-b border-black/[0.1] bg-transparent px-0 py-0.5 text-sm text-black focus:border-black focus:outline-none"
                />
                <input
                  value={link.href}
                  onChange={(e) =>
                    updateNavLink(link.id, "href", e.target.value)
                  }
                  placeholder="/path"
                  className="flex-1 border-b border-black/[0.1] bg-transparent px-0 py-0.5 font-mono text-xs text-black/50 focus:border-black focus:text-black focus:outline-none"
                />
                <button
                  onClick={() => deleteNavLink(link.id)}
                  className="shrink-0 text-[10px] tracking-widest text-red-400 uppercase transition-colors hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addNavLink}
            className="text-[11px] tracking-widest text-black/40 uppercase underline underline-offset-2 transition-colors hover:text-black hover:no-underline"
          >
            + Add Link
          </button>
        </SectionPanel>

        {/* Footer — Contact */}
        <SectionPanel
          title="Footer — Contact"
          description="Phone, email, and social media links shown in the footer"
        >
          <FieldRow>
            <Field
              label="Phone Number"
              value={phone}
              onChange={setPhone}
              placeholder="(412) 391-2752"
            />
            <Field
              label="Email Address"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="info@butcherandtherye.com"
            />
          </FieldRow>
          <Divider label="Social Links" />
          <FieldRow>
            <Field
              label="Instagram URL"
              value={instagram}
              onChange={setInstagram}
              placeholder="https://instagram.com/…"
              mono
            />
            <Field
              label="Facebook URL"
              value={facebook}
              onChange={setFacebook}
              placeholder="https://facebook.com/…"
              mono
            />
          </FieldRow>
        </SectionPanel>

        {/* Footer — Location */}
        <SectionPanel
          title="Footer — Location"
          description="Address and directions link shown in the footer"
        >
          <FieldRow>
            <Field
              label="Address Line 1"
              value={addressLine1}
              onChange={setAddressLine1}
              placeholder="2195 Penn Avenue"
            />
            <Field
              label="Address Line 2"
              value={addressLine2}
              onChange={setAddressLine2}
              placeholder="Pittsburgh, PA 15222"
            />
          </FieldRow>
          <Field
            label="Directions URL"
            value={directionsUrl}
            onChange={setDirectionsUrl}
            placeholder="https://maps.google.com/…"
            mono
          />
        </SectionPanel>

        {/* Footer — Hours */}
        <SectionPanel
          title="Footer — Hours"
          description="Operating hours shown in the footer"
        >
          <div className="space-y-2">
            {hours.map((h) => (
              <div key={h.id} className="flex items-center gap-3">
                <input
                  value={h.days}
                  onChange={(e) => updateHour(h.id, "days", e.target.value)}
                  placeholder="Monday – Thursday"
                  className="flex-1 border border-black/[0.12] bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
                />
                <input
                  value={h.time}
                  onChange={(e) => updateHour(h.id, "time", e.target.value)}
                  placeholder="5pm – 11pm"
                  className="w-36 shrink-0 border border-black/[0.12] bg-white px-3 py-2 text-sm text-black focus:border-black focus:outline-none"
                />
                <button
                  onClick={() => deleteHour(h.id)}
                  className="shrink-0 text-[10px] tracking-widest text-red-400 uppercase transition-colors hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addHour}
            className="text-[11px] tracking-widest text-black/40 uppercase underline underline-offset-2 transition-colors hover:text-black hover:no-underline"
          >
            + Add Row
          </button>
        </SectionPanel>

        {/* Footer — Bottom Bar */}
        <SectionPanel
          title="Footer — Bottom Bar"
          description="Copyright notice and attribution shown at the very bottom"
        >
          <Field
            label="Copyright Text"
            value={copyright}
            onChange={setCopyright}
            placeholder="© {year} Butcher and the Rye. All rights reserved."
          />
          <FieldRow>
            <Field
              label="Credit Text"
              value={creditText}
              onChange={setCreditText}
              placeholder="Made by Briggs Davis"
            />
            <Field
              label="Credit URL"
              value={creditUrl}
              onChange={setCreditUrl}
              placeholder="https://briggsdavis.com"
              mono
            />
          </FieldRow>
        </SectionPanel>
      </div>
    </div>
  )
}
