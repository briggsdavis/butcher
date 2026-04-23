"use client"

import { useState } from "react"
import { ImageUpload } from "~/components/admin/image-upload"
import {
  Divider,
  EditorHeader,
  Field,
  FieldRow,
  SectionPanel,
  Textarea,
} from "~/components/admin/ui"

type Value = { title: string; body: string }
type FeaturedMember = { name: string; role: string }

const INITIAL_VALUES: Value[] = [
  {
    title: "Excellence",
    body: "We hold every plate and every pour to the same exacting standard. No table is less important than another. No dish leaves our kitchen without meeting the mark. Excellence isn't an aspiration here. It's the minimum.",
  },
  {
    title: "Craft",
    body: "Every technique here is learned the slow way. Our chefs apprenticed under demanding kitchens. Our bartenders spent years studying whiskey before touching our bar. There are no shortcuts, and we wouldn't have it any other way.",
  },
  {
    title: "Hospitality",
    body: "The meal is the occasion. The experience is the memory. We study our guests: their preferences, their celebrations, their habits. Hospitality at Butcher and the Rye means you never have to ask twice.",
  },
]

const INITIAL_FEATURED: FeaturedMember[] = [
  { name: "Marcus Chen", role: "Executive Chef" },
  { name: "Sophia Reeves", role: "Bar Director" },
  { name: "James O'Brien", role: "Head Butcher" },
  { name: "Amara Washington", role: "General Manager" },
]

export function AboutEditor() {
  const [saved, setSaved] = useState(false)

  // Hero
  const [heroEyebrow, setHeroEyebrow] = useState("Pittsburgh, PA · Est. 2013")
  const [heroLine1, setHeroLine1] = useState("Where Craft")
  const [heroLine2, setHeroLine2] = useState("Meets Tradition")
  const [heroSubtext, setHeroSubtext] = useState(
    "A storied table in Pittsburgh's Penn Avenue corridor, built on the belief that extraordinary evenings begin with extraordinary people and uncompromising craft.",
  )

  // Story
  const [storyEyebrow, setStoryEyebrow] = useState("Our Story")
  const [storyLine1, setStoryLine1] = useState("Born from")
  const [storyLine2, setStoryLine2] = useState("a reverence")
  const [storyLine3, setStoryLine3] = useState("for craft")
  const [storyPara1, setStoryPara1] = useState(
    "Butcher and the Rye opened on Penn Avenue in 2013 with a single conviction: Pittsburgh deserved a restaurant that honored the full depth of American culinary tradition: the slow char of a barrel-aged bourbon, the patience of a 45-day dry-aged cut, and the art of a dining room that feels like home.",
  )
  const [storyPara2, setStoryPara2] = useState(
    "Every choice made here, from the beef we source to the glass we pour, is deliberate. We are not chasing trends. We are building something that lasts.",
  )
  const [storyBlockquote, setStoryBlockquote] = useState(
    "The kind of place you come back to not just for the food, but for how it makes you feel.",
  )

  // Values
  const [values, setValues] = useState<Value[]>(INITIAL_VALUES)

  // Image Break
  const [imageBreakQuote, setImageBreakQuote] = useState(
    "Every evening is its own occasion.",
  )

  // The Team
  const [teamEyebrow, setTeamEyebrow] = useState("The People")
  const [teamLine1, setTeamLine1] = useState("The people")
  const [teamLine2, setTeamLine2] = useState("behind")
  const [teamLine3, setTeamLine3] = useState("the craft")
  const [teamPara, setTeamPara] = useState(
    "Our team brings decades of combined experience from some of the country's finest kitchens, bars, and dining rooms. They are passionate, rigorously trained, and united by one shared devotion: excellence at every table, every night.",
  )
  const [teamCta, setTeamCta] = useState("Meet the full team")
  const [featured, setFeatured] = useState<FeaturedMember[]>(INITIAL_FEATURED)

  // Pull Quote
  const [quoteEyebrow, setQuoteEyebrow] = useState("Our Philosophy")
  const [quote, setQuote] = useState(
    "The pursuit of extraordinary starts with refusing to accept ordinary.",
  )
  const [quoteCta, setQuoteCta] = useState("Meet the team behind it")

  // Closing CTA
  const [ctaEyebrow, setCtaEyebrow] = useState("Join Us")
  const [ctaLine1, setCtaLine1] = useState("Reserve your")
  const [ctaLine2, setCtaLine2] = useState("evening")
  const [ctaSubtext, setCtaSubtext] = useState(
    "Whether it's a quiet dinner for two or a gathering worth remembering, we'll set the table.",
  )
  const [ctaBtnText, setCtaBtnText] = useState("Book a Table")

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function updateValue(i: number, field: keyof Value, val: string) {
    setValues((prev) =>
      prev.map((v, idx) => (idx === i ? { ...v, [field]: val } : v)),
    )
  }

  function updateFeatured(i: number, field: keyof FeaturedMember, val: string) {
    setFeatured((prev) =>
      prev.map((m, idx) => (idx === i ? { ...m, [field]: val } : m)),
    )
  }

  return (
    <div className="flex flex-col">
      <EditorHeader title="About" saved={saved} onSave={handleSave} />

      <div className="space-y-6 p-8">
        {/* Hero */}
        <SectionPanel
          title="Hero"
          description="Full-screen header with background image"
        >
          <Field
            label="Eyebrow Text"
            value={heroEyebrow}
            onChange={setHeroEyebrow}
          />
          <FieldRow>
            <Field
              label="Heading — Line 1"
              value={heroLine1}
              onChange={setHeroLine1}
            />
            <Field
              label="Heading — Line 2 (amber italic)"
              value={heroLine2}
              onChange={setHeroLine2}
            />
          </FieldRow>
          <Textarea
            label="Subtext"
            value={heroSubtext}
            onChange={setHeroSubtext}
            rows={2}
          />
          <ImageUpload
            label="Background Image"
            currentSrc="/about-background.jpg"
            hint="Full-screen parallax background"
          />
        </SectionPanel>

        {/* Story */}
        <SectionPanel
          title="Our Story"
          description="Long-form narrative with image collage"
        >
          <Field
            label="Eyebrow Label"
            value={storyEyebrow}
            onChange={setStoryEyebrow}
          />
          <div className="grid grid-cols-3 gap-4">
            <Field
              label="Heading — Line 1"
              value={storyLine1}
              onChange={setStoryLine1}
            />
            <Field
              label="Heading — Line 2"
              value={storyLine2}
              onChange={setStoryLine2}
            />
            <Field
              label="Heading — Line 3 (italic tan)"
              value={storyLine3}
              onChange={setStoryLine3}
            />
          </div>
          <Textarea
            label="Paragraph 1"
            value={storyPara1}
            onChange={setStoryPara1}
            rows={3}
          />
          <Textarea
            label="Paragraph 2"
            value={storyPara2}
            onChange={setStoryPara2}
            rows={2}
          />
          <Textarea
            label="Blockquote"
            value={storyBlockquote}
            onChange={setStoryBlockquote}
            rows={2}
          />
          <Divider label="Images" />
          <div className="grid grid-cols-2 gap-6">
            <ImageUpload
              label="Primary Image"
              currentSrc="/candlelit-tables.jpg"
            />
            <ImageUpload
              label="Secondary Image (overlapping)"
              currentSrc="/entree-frame.png"
            />
          </div>
        </SectionPanel>

        {/* Values */}
        <SectionPanel
          title="Our Values"
          description="Three values displayed with title, body, and image"
        >
          {values.map((v, i) => (
            <div
              key={i}
              className="rounded border border-black/[0.06] bg-black/[0.02] p-4"
            >
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-black/30">
                Value {i + 1}
              </p>
              <div className="space-y-3">
                <Field
                  label="Title"
                  value={v.title}
                  onChange={(val) => updateValue(i, "title", val)}
                />
                <Textarea
                  label="Body Text"
                  value={v.body}
                  onChange={(val) => updateValue(i, "body", val)}
                  rows={3}
                />
                <ImageUpload
                  label="Section Image"
                  currentSrc={
                    ["/barmood1.jpg", "/bardecor1.jpg", "/candlelit-tables.jpg"][i]
                  }
                  compact
                />
              </div>
            </div>
          ))}
        </SectionPanel>

        {/* Image Break */}
        <SectionPanel
          title="Full-Width Image Break"
          description="Parallax banner with centred quote overlay"
        >
          <ImageUpload
            label="Background Image"
            currentSrc="/parallax-wide.jpg"
            hint="Full-width parallax image"
          />
          <Textarea
            label="Overlay Quote"
            value={imageBreakQuote}
            onChange={setImageBreakQuote}
            rows={2}
          />
        </SectionPanel>

        {/* The Team */}
        <SectionPanel
          title="The Team"
          description="Four featured staff members shown on the about page"
        >
          <Field
            label="Eyebrow Label"
            value={teamEyebrow}
            onChange={setTeamEyebrow}
          />
          <div className="grid grid-cols-3 gap-4">
            <Field
              label="Heading — Line 1"
              value={teamLine1}
              onChange={setTeamLine1}
            />
            <Field
              label="Heading — Line 2"
              value={teamLine2}
              onChange={setTeamLine2}
            />
            <Field
              label="Heading — Line 3 (italic tan)"
              value={teamLine3}
              onChange={setTeamLine3}
            />
          </div>
          <Textarea
            label="Paragraph"
            value={teamPara}
            onChange={setTeamPara}
            rows={3}
          />
          <Field label="CTA Link Text" value={teamCta} onChange={setTeamCta} />
          <Divider label="Featured Members (4)" />
          <div className="grid grid-cols-2 gap-4">
            {featured.map((m, i) => (
              <div
                key={i}
                className="rounded border border-black/[0.06] bg-black/[0.02] p-4"
              >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-black/30">
                  Member {i + 1}
                </p>
                <div className="space-y-3">
                  <Field
                    label="Name"
                    value={m.name}
                    onChange={(v) => updateFeatured(i, "name", v)}
                  />
                  <Field
                    label="Role"
                    value={m.role}
                    onChange={(v) => updateFeatured(i, "role", v)}
                  />
                  <ImageUpload
                    label="Photo"
                    currentSrc={
                      [
                        "/food/bone-in-ribeye.jpg",
                        "/craft-old-fashioned.jpg",
                        "/food/bone-marrow.jpg",
                        "/candlelit-tables.jpg",
                      ][i]
                    }
                    compact
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionPanel>

        {/* Pull Quote */}
        <SectionPanel
          title="Pull Quote"
          description="Philosophy statement on cream background"
        >
          <Field
            label="Eyebrow Label"
            value={quoteEyebrow}
            onChange={setQuoteEyebrow}
          />
          <Textarea
            label="Quote"
            value={quote}
            onChange={setQuote}
            rows={2}
          />
          <Field label="CTA Link Text" value={quoteCta} onChange={setQuoteCta} />
        </SectionPanel>

        {/* Closing CTA */}
        <SectionPanel
          title="Closing CTA"
          description="Final reservation call-to-action"
        >
          <Field
            label="Eyebrow Label"
            value={ctaEyebrow}
            onChange={setCtaEyebrow}
          />
          <FieldRow>
            <Field
              label="Heading — Line 1"
              value={ctaLine1}
              onChange={setCtaLine1}
            />
            <Field
              label="Heading — Line 2 (italic tan)"
              value={ctaLine2}
              onChange={setCtaLine2}
            />
          </FieldRow>
          <Textarea
            label="Subtext"
            value={ctaSubtext}
            onChange={setCtaSubtext}
            rows={2}
          />
          <Field
            label="Button Text"
            value={ctaBtnText}
            onChange={setCtaBtnText}
          />
        </SectionPanel>
      </div>
    </div>
  )
}
