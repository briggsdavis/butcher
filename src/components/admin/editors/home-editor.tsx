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

type Cocktail = { name: string; description: string }

const INITIAL_COCKTAILS: Cocktail[] = [
  {
    name: "The Old Fashioned",
    description: "Buffalo Trace, demerara, Angostura, expressed orange peel",
  },
  {
    name: "Smoke & Rye",
    description: "Rittenhouse rye, mezcal rinse, maple, black walnut bitters",
  },
  {
    name: "The Butcher's Manhattan",
    description: "Woodford Reserve, Carpano Antica, brandied cherry",
  },
]

export function HomeEditor() {
  const [saved, setSaved] = useState(false)

  // Hero
  const [heroLine1, setHeroLine1] = useState("Butcher")
  const [heroLine2, setHeroLine2] = useState("& the Rye")
  const [heroSubtext, setHeroSubtext] = useState(
    "A storied table where craft meets tradition. Fine cuts, rare spirits, and the kind of evening you remember.",
  )
  const [heroCtaText, setHeroCtaText] = useState("Reserve a Table")

  // Story
  const [storyEyebrow, setStoryEyebrow] = useState("Our Story")
  const [storyHeadLine1, setStoryHeadLine1] = useState("Where every")
  const [storyHeadLine2, setStoryHeadLine2] = useState("glass has a")
  const [storyHeadLine3, setStoryHeadLine3] = useState("history")
  const [storyPara1, setStoryPara1] = useState(
    "Butcher and the Rye was born from a reverence for the craft: the slow char of a barrel, the patience of a dry-aged cut, the conversation that only happens around a well-set table.",
  )
  const [storyPara2, setStoryPara2] = useState(
    "We are a place for those who understand that a great evening is not rushed. It is savored, one pour at a time.",
  )
  const [storyCtaText, setStoryCtaText] = useState("Read more")

  // Menu Highlights
  const [menuEyebrow, setMenuEyebrow] = useState("From the Kitchen")
  const [menuHeading, setMenuHeading] = useState("The menu")
  const [menuDescription, setMenuDescription] = useState(
    "Sourced from heritage farms and shaped by old-world technique. Every plate is a reflection of place, season, and craft.",
  )
  const [menuCtaText, setMenuCtaText] = useState("Full Menu")

  // Cocktails
  const [cocktailsEyebrow, setCocktailsEyebrow] = useState(
    "Cocktails & Spirits",
  )
  const [cocktailsLine1, setCocktailsLine1] = useState("Crafted,")
  const [cocktailsLine2, setCocktailsLine2] = useState("never mixed")
  const [cocktailCaption, setCocktailCaption] = useState("The Old Fashioned")
  const [cocktailsCta1, setCocktailsCta1] = useState("Beverages")
  const [cocktailsCta2, setCocktailsCta2] = useState("Spirits")
  const [cocktails, setCocktails] = useState<Cocktail[]>(INITIAL_COCKTAILS)

  // Atmosphere
  const [atmosphereEyebrow, setAtmosphereEyebrow] = useState("The Atmosphere")
  const [atmosphereHeading, setAtmosphereHeading] = useState("A glimpse inside")

  // Reservations
  const [resEyebrow, setResEyebrow] = useState("Join Us")
  const [resLine1, setResLine1] = useState("Reserve your")
  const [resLine2, setResLine2] = useState("evening")
  const [resSubtext, setResSubtext] = useState(
    "Whether it's a quiet dinner for two or a gathering worth remembering, we'll set the table.",
  )
  const [resBtnText, setResBtnText] = useState("Book a Table")

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function updateCocktail(i: number, field: keyof Cocktail, val: string) {
    setCocktails((prev) =>
      prev.map((c, idx) => (idx === i ? { ...c, [field]: val } : c)),
    )
  }

  return (
    <div className="flex flex-col">
      <EditorHeader title="Home" saved={saved} onSave={handleSave} />

      <div className="space-y-6 p-8">
        {/* Hero */}
        <SectionPanel
          title="Hero"
          description="Full-screen opening section with headline and CTA"
        >
          <FieldRow>
            <Field
              label="Headline — Line 1"
              value={heroLine1}
              onChange={setHeroLine1}
              placeholder="Butcher"
            />
            <Field
              label="Headline — Line 2 (amber italic)"
              value={heroLine2}
              onChange={setHeroLine2}
              placeholder="& the Rye"
            />
          </FieldRow>
          <Textarea
            label="Subtext"
            value={heroSubtext}
            onChange={setHeroSubtext}
            rows={2}
          />
          <Field
            label="CTA Button Text"
            value={heroCtaText}
            onChange={setHeroCtaText}
          />
          <ImageUpload
            label="Hero Background Image"
            currentSrc="/warm-dining-room.jpg"
            hint="Displayed full-screen behind headline"
          />
        </SectionPanel>

        {/* Our Story */}
        <SectionPanel
          title="Our Story"
          description="Two-column section with copy and image collage"
        >
          <Field
            label="Eyebrow Label"
            value={storyEyebrow}
            onChange={setStoryEyebrow}
          />
          <FieldRow>
            <Field
              label="Heading — Line 1"
              value={storyHeadLine1}
              onChange={setStoryHeadLine1}
            />
            <Field
              label="Heading — Line 2"
              value={storyHeadLine2}
              onChange={setStoryHeadLine2}
            />
          </FieldRow>
          <Field
            label="Heading — Line 3 (italic tan)"
            value={storyHeadLine3}
            onChange={setStoryHeadLine3}
          />
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
          <Field
            label="CTA Link Text"
            value={storyCtaText}
            onChange={setStoryCtaText}
          />
          <Divider label="Images" />
          <div className="grid grid-cols-2 gap-6">
            <ImageUpload
              label="Primary Image"
              currentSrc="/barmood.jpg"
              hint="Main large image"
            />
            <ImageUpload
              label="Secondary Image"
              currentSrc="/glow-frame.png"
              hint="Small overlapping image"
            />
          </div>
        </SectionPanel>

        {/* Menu Highlights */}
        <SectionPanel
          title="Menu Highlights"
          description="Three-column image grid with menu CTA"
        >
          <FieldRow>
            <Field
              label="Eyebrow Label"
              value={menuEyebrow}
              onChange={setMenuEyebrow}
            />
            <Field
              label="Heading"
              value={menuHeading}
              onChange={setMenuHeading}
            />
          </FieldRow>
          <Textarea
            label="Description Text"
            value={menuDescription}
            onChange={setMenuDescription}
            rows={2}
          />
          <Field
            label="CTA Button Text"
            value={menuCtaText}
            onChange={setMenuCtaText}
          />
          <Divider label="Gallery Images" />
          <div className="grid grid-cols-3 gap-4">
            <ImageUpload
              label="Left Image"
              currentSrc="/meat-board.jpg"
              hint="Square-ish format"
            />
            <ImageUpload
              label="Center Image (tall)"
              currentSrc="/plated-entree.jpg"
              hint="Portrait format"
            />
            <ImageUpload
              label="Right Image"
              currentSrc="/steak.jpg"
              hint="Square-ish format"
            />
          </div>
        </SectionPanel>

        {/* Cocktails & Spirits */}
        <SectionPanel
          title="Cocktails & Spirits"
          description="Featured cocktail image with three listed drinks"
        >
          <FieldRow>
            <Field
              label="Eyebrow Label"
              value={cocktailsEyebrow}
              onChange={setCocktailsEyebrow}
            />
            <ImageUpload
              label="Featured Cocktail Image"
              currentSrc="/craft-old-fashioned.jpg"
              compact
            />
          </FieldRow>
          <FieldRow>
            <Field
              label="Heading — Line 1"
              value={cocktailsLine1}
              onChange={setCocktailsLine1}
            />
            <Field
              label="Heading — Line 2 (italic tan)"
              value={cocktailsLine2}
              onChange={setCocktailsLine2}
            />
          </FieldRow>
          <Field
            label="Image Caption"
            value={cocktailCaption}
            onChange={setCocktailCaption}
          />
          <Divider label="Featured Cocktails" />
          {cocktails.map((c, i) => (
            <div
              key={i}
              className="rounded border border-black/[0.06] bg-black/[0.02] p-4"
            >
              <p className="mb-3 text-[10px] font-semibold tracking-widest text-black/30 uppercase">
                Cocktail {i + 1}
              </p>
              <div className="space-y-3">
                <Field
                  label="Name"
                  value={c.name}
                  onChange={(v) => updateCocktail(i, "name", v)}
                />
                <Field
                  label="Description"
                  value={c.description}
                  onChange={(v) => updateCocktail(i, "description", v)}
                />
              </div>
            </div>
          ))}
          <Divider label="CTA Buttons" />
          <FieldRow>
            <Field
              label="Button 1 Text"
              value={cocktailsCta1}
              onChange={setCocktailsCta1}
            />
            <Field
              label="Button 2 Text"
              value={cocktailsCta2}
              onChange={setCocktailsCta2}
            />
          </FieldRow>
        </SectionPanel>

        {/* Atmosphere Gallery */}
        <SectionPanel
          title="Atmosphere Gallery"
          description="Five-image masonry grid showcasing the restaurant"
        >
          <FieldRow>
            <Field
              label="Eyebrow Label"
              value={atmosphereEyebrow}
              onChange={setAtmosphereEyebrow}
            />
            <Field
              label="Heading"
              value={atmosphereHeading}
              onChange={setAtmosphereHeading}
            />
          </FieldRow>
          <Divider label="Row 1 — 3 images" />
          <div className="grid grid-cols-3 gap-4">
            <ImageUpload label="Row 1 · Image 1" currentSrc="/barmood.jpg" />
            <ImageUpload
              label="Row 1 · Image 2 (wide)"
              currentSrc="/bar-brass-glow.jpg"
            />
            <ImageUpload label="Row 1 · Image 3" currentSrc="/barvibe.jpg" />
          </div>
          <Divider label="Row 2 — 2 images" />
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload
              label="Row 2 · Image 1 (wide)"
              currentSrc="/bardecor.jpg"
            />
            <ImageUpload
              label="Row 2 · Image 2"
              currentSrc="/whiskey-pour.jpg"
            />
          </div>
        </SectionPanel>

        {/* Reservations CTA */}
        <SectionPanel
          title="Reservations CTA"
          description="Closing call-to-action for table reservations"
        >
          <Field
            label="Eyebrow Label"
            value={resEyebrow}
            onChange={setResEyebrow}
          />
          <FieldRow>
            <Field
              label="Heading — Line 1"
              value={resLine1}
              onChange={setResLine1}
            />
            <Field
              label="Heading — Line 2 (italic tan)"
              value={resLine2}
              onChange={setResLine2}
            />
          </FieldRow>
          <Textarea
            label="Subtext"
            value={resSubtext}
            onChange={setResSubtext}
            rows={2}
          />
          <Field
            label="Button Text"
            value={resBtnText}
            onChange={setResBtnText}
          />
        </SectionPanel>
      </div>
    </div>
  )
}
