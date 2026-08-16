"use client"

import type { ReactNode } from "react"
import { EditableImage, EditableText } from "./editable"

// ── Shared preview building blocks ───────────────────────────────────────────

export function PageCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <p className="mb-6 text-center text-xs text-tan/50">
        Click any text or image below to edit it in place. This is a preview — nothing is public
        until you press <span className="text-tan">Save changes</span>.
      </p>
      <div className="overflow-hidden rounded-lg border border-amber/15 shadow-2xl">{children}</div>
    </div>
  )
}

function Section({
  bg,
  label,
  children,
}: {
  bg: "oxblood" | "charcoal" | "cream"
  label: string
  children: ReactNode
}) {
  const bgClass = bg === "cream" ? "bg-cream" : bg === "oxblood" ? "bg-oxblood" : "bg-charcoal"
  return (
    <section className={`relative ${bgClass} px-6 py-10 md:px-10`}>
      <span className="pointer-events-none absolute top-2 right-2 rounded-sm bg-amber/15 px-2 py-0.5 text-[9px] tracking-wider text-amber/80 uppercase">
        {label}
      </span>
      {children}
    </section>
  )
}

function Eyebrow({ fieldKey, dark = false }: { fieldKey: string; dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className={`block h-px w-8 shrink-0 ${dark ? "bg-oxblood/30" : "bg-amber/50"}`} />
      <EditableText
        fieldKey={fieldKey}
        className={`text-[11px] tracking-wide uppercase ${dark ? "text-amber" : "text-amber"}`}
        placeholder="Eyebrow"
      />
    </span>
  )
}

// ── Home ─────────────────────────────────────────────────────────────────────

export function HomePreview() {
  return (
    <>
      <Section bg="oxblood" label="Hero">
        <div className="relative overflow-hidden rounded-sm">
          <EditableImage
            imageKey="hero.image.1"
            alt="Hero slide 1"
            aspectClass="aspect-[16/7]"
            sizes="800px"
          />
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-charcoal/80 to-transparent pb-6">
            <div className="pointer-events-auto flex flex-wrap justify-center gap-2">
              <EditableText
                fieldKey="hero.reserveLabel"
                className="border border-cream/70 bg-charcoal/40 px-4 py-2 font-display text-xs text-cream uppercase"
                placeholder="Reserve"
              />
              <EditableText
                fieldKey="hero.menuLabel"
                className="border border-cream/70 bg-charcoal/40 px-4 py-2 font-display text-xs text-cream uppercase"
                placeholder="Menu"
              />
              <EditableText
                fieldKey="hero.beveragesLabel"
                className="border border-cream/70 bg-charcoal/40 px-4 py-2 font-display text-xs text-cream uppercase"
                placeholder="Beverages"
              />
            </div>
          </div>
        </div>
        <p className="mt-3 text-[10px] tracking-wide text-tan/40 uppercase">Rotating hero slides</p>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <EditableImage imageKey="hero.image.2" alt="Hero slide 2" aspectClass="aspect-[16/9]" />
          <EditableImage imageKey="hero.image.3" alt="Hero slide 3" aspectClass="aspect-[16/9]" />
        </div>
      </Section>

      <Section bg="oxblood" label="Cocktails & Spirits">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="rounded-sm bg-cream p-3">
              <EditableImage
                imageKey="cocktails.image"
                alt="Craft cocktail"
                aspectClass="aspect-[3/4]"
              />
              <div className="py-3 text-center">
                <EditableText
                  fieldKey="cocktails.caption"
                  className="font-handwritten text-2xl text-charcoal"
                  lowercase
                  placeholder="caption"
                />
              </div>
            </div>
          </div>
          <div>
            <Eyebrow fieldKey="cocktails.eyebrow" />
            <div className="mt-3 text-center font-display text-3xl leading-none text-cream">
              <EditableText fieldKey="cocktails.titleTop" block placeholder="Crafted" />
              <EditableText
                fieldKey="cocktails.titleScript"
                block
                className="font-cursive text-amber"
                lowercase
                placeholder="never"
              />
              <EditableText fieldKey="cocktails.titleBottom" block placeholder="mixed" />
            </div>
            <div className="mt-6 space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n}>
                  <EditableText
                    fieldKey={`cocktail.${n}.name`}
                    className="font-subhead text-lg text-cream"
                    placeholder="Cocktail name"
                  />
                  <EditableText
                    fieldKey={`cocktail.${n}.description`}
                    block
                    multiline
                    className="mt-1 text-sm text-tan"
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section bg="charcoal" label="Story preview">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Eyebrow fieldKey="story.eyebrow" />
            <div className="mt-3 font-display text-3xl leading-tight text-cream">
              <EditableText fieldKey="story.heading.1" block placeholder="Line 1" />
              <EditableText fieldKey="story.heading.2" block placeholder="Line 2" />
              <EditableText
                fieldKey="story.heading.3"
                block
                className="text-tan italic"
                placeholder="Italic word"
              />
            </div>
            <EditableText
              fieldKey="story.body.1"
              block
              multiline
              className="mt-4 text-sm text-tan"
              placeholder="Body 1"
            />
            <EditableText
              fieldKey="story.body.2"
              block
              multiline
              className="mt-3 text-sm text-tan"
              placeholder="Body 2"
            />
            <EditableText
              fieldKey="story.linkLabel"
              className="mt-4 inline-block text-xs text-amber uppercase"
              placeholder="Link label"
            />
          </div>
          <div className="flex items-start gap-3">
            <EditableImage
              imageKey="story.image.1"
              alt="Story large"
              aspectClass="aspect-[4/3]"
              className="flex-1"
            />
            <EditableImage
              imageKey="story.image.2"
              alt="Story small"
              aspectClass="aspect-[3/4]"
              className="w-1/3"
            />
          </div>
        </div>
      </Section>

      <Section bg="oxblood" label="Menu preview">
        <Eyebrow fieldKey="menu.eyebrow" />
        <div className="mt-2 font-display text-3xl text-cream">
          <EditableText fieldKey="menu.heading" placeholder="The menu" />
        </div>
        <EditableText
          fieldKey="menu.buttonLabel"
          className="mt-3 inline-block border border-amber px-4 py-2 text-xs text-amber uppercase"
          placeholder="Button"
        />
        <div className="mt-5 grid grid-cols-3 gap-3">
          <EditableImage imageKey="menu.image.1" alt="Menu 1" aspectClass="aspect-[5/4]" />
          <EditableImage imageKey="menu.image.2" alt="Menu 2" aspectClass="aspect-[3/4]" />
          <EditableImage imageKey="menu.image.3" alt="Menu 3" aspectClass="aspect-[5/4]" />
        </div>
        <EditableText
          fieldKey="menu.body"
          block
          multiline
          className="mt-4 max-w-sm text-sm text-tan"
          placeholder="Body"
        />
      </Section>

      <Section bg="charcoal" label="Quote banner">
        <div className="relative overflow-hidden rounded-sm">
          <EditableImage
            imageKey="quote.image"
            alt="Quote banner"
            aspectClass="aspect-[16/7]"
            sizes="800px"
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-charcoal/60 px-6 text-center">
            <EditableText
              fieldKey="quote.text"
              block
              multiline
              className="pointer-events-auto font-display text-lg text-cream"
              placeholder="Quote"
            />
            <EditableText
              fieldKey="quote.cite"
              className="pointer-events-auto mt-2 text-[10px] text-tan/70 uppercase"
              placeholder="Citation"
            />
          </div>
        </div>
      </Section>

      <Section bg="charcoal" label="Framed gallery">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px flex-1 bg-amber/25" />
          <EditableText
            fieldKey="gallery.eyebrow"
            className="text-[11px] text-amber uppercase"
            placeholder="Gallery eyebrow"
          />
          <span className="h-px flex-1 bg-amber/25" />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <EditableImage
              key={n}
              imageKey={`gallery.frame.${n}`}
              alt={`Frame ${n}`}
              aspectClass="aspect-[4/5]"
            />
          ))}
        </div>
      </Section>

      <Section bg="oxblood" label="Carousel">
        <EditableText
          fieldKey="carousel.eyebrow"
          className="text-[11px] text-amber uppercase"
          placeholder="Carousel eyebrow"
        />
        <div className="mt-3 grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <EditableImage
              key={n}
              imageKey={`carousel.image.${n}`}
              alt={`Carousel ${n}`}
              aspectClass="aspect-square"
              sizes="150px"
            />
          ))}
        </div>
      </Section>

      <Section bg="charcoal" label="Reservations">
        <div className="text-center">
          <EditableText
            fieldKey="reservations.eyebrow"
            className="text-[11px] text-amber uppercase"
            placeholder="Eyebrow"
          />
          <div className="mt-2 font-display text-3xl text-cream">
            <EditableText fieldKey="reservations.heading.1" block placeholder="Line 1" />
            <EditableText
              fieldKey="reservations.heading.2"
              block
              className="text-tan italic"
              placeholder="Italic word"
            />
          </div>
          <EditableText
            fieldKey="reservations.body"
            block
            multiline
            className="mx-auto mt-3 max-w-md text-sm text-tan"
            placeholder="Body"
          />
          <EditableText
            fieldKey="reservations.buttonLabel"
            className="mt-4 inline-block bg-amber px-6 py-2.5 text-xs font-medium text-charcoal uppercase"
            placeholder="Button"
          />
          <div className="mt-6 border-t border-cream/15 pt-5">
            <EditableText
              fieldKey="events.heading"
              block
              className="font-display text-xl text-cream uppercase"
              placeholder="Event heading"
            />
            <EditableText
              fieldKey="events.buttonLabel"
              className="mt-3 inline-block text-xs text-amber uppercase"
              placeholder="Event button"
            />
          </div>
        </div>
      </Section>
    </>
  )
}

// ── About ────────────────────────────────────────────────────────────────────

export function AboutPreview() {
  return (
    <>
      <Section bg="oxblood" label="Hero">
        <div className="relative overflow-hidden rounded-sm">
          <EditableImage
            imageKey="hero.image.1"
            alt="Hero slide 1"
            aspectClass="aspect-[16/7]"
            sizes="800px"
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/85 to-transparent p-6">
            <EditableText
              fieldKey="hero.eyebrow"
              className="pointer-events-auto text-[11px] text-amber uppercase"
              placeholder="Eyebrow"
            />
            <div className="pointer-events-auto mt-2 font-display text-4xl leading-none text-cream">
              <EditableText fieldKey="hero.heading.1" placeholder="Where Craft" />{" "}
              <EditableText
                fieldKey="hero.heading.2"
                className="text-amber italic"
                placeholder="Meets"
              />{" "}
              <EditableText fieldKey="hero.heading.3" placeholder="Tradition" />
            </div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <EditableImage imageKey="hero.image.2" alt="Hero slide 2" aspectClass="aspect-[16/9]" />
          <EditableImage imageKey="hero.image.3" alt="Hero slide 3" aspectClass="aspect-[16/9]" />
        </div>
        <EditableText
          fieldKey="hero.body"
          block
          multiline
          className="mt-4 max-w-lg text-sm text-tan"
          placeholder="Intro"
        />
      </Section>

      <Section bg="charcoal" label="The Chef / Story">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Eyebrow fieldKey="story.eyebrow" />
            <div className="mt-3 font-display text-3xl leading-tight text-cream">
              <EditableText fieldKey="story.heading.1" block placeholder="Line 1" />
              <EditableText fieldKey="story.heading.2" block placeholder="Line 2" />
              <EditableText
                fieldKey="story.heading.3"
                block
                className="text-tan italic"
                placeholder="Italic words"
              />
            </div>
            <EditableText
              fieldKey="story.body.1"
              block
              multiline
              className="mt-4 text-sm text-tan"
              placeholder="Body 1"
            />
            <EditableText
              fieldKey="story.body.2"
              block
              multiline
              className="mt-3 text-sm text-tan"
              placeholder="Body 2"
            />
            <div className="mt-4 border-l-2 border-amber/30 pl-4">
              <EditableText
                fieldKey="story.quote"
                block
                multiline
                className="font-cursive text-xl text-cream/70"
                placeholder="Quote"
              />
            </div>
          </div>
          <div className="flex items-start gap-3">
            <EditableImage
              imageKey="story.image.1"
              alt="Story large"
              aspectClass="aspect-[4/3]"
              className="flex-1"
            />
            <EditableImage
              imageKey="story.image.2"
              alt="Story small"
              aspectClass="aspect-[3/4]"
              className="w-1/3"
            />
          </div>
        </div>
      </Section>

      <Section bg="oxblood" label="Values">
        <Eyebrow fieldKey="values.eyebrow" />
        <div className="mt-5 space-y-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="grid gap-4 border-t border-cream/10 pt-5 md:grid-cols-2">
              <div>
                <EditableText
                  fieldKey={`value.${n}.title`}
                  className="font-display text-2xl text-cream"
                  placeholder="Value title"
                />
                <EditableText
                  fieldKey={`value.${n}.body`}
                  block
                  multiline
                  className="mt-2 text-sm text-tan"
                  placeholder="Value body"
                />
              </div>
              <div className="rounded-sm bg-cream p-2">
                <EditableImage
                  imageKey={`value.${n}.image`}
                  alt={`Value ${n}`}
                  aspectClass="aspect-[5/4]"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="charcoal" label="Image break">
        <div className="relative overflow-hidden rounded-sm">
          <EditableImage
            imageKey="break.image"
            alt="Image break"
            aspectClass="aspect-[16/7]"
            sizes="800px"
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-charcoal/50 px-6 text-center">
            <EditableText
              fieldKey="break.text"
              className="pointer-events-auto font-cursive text-2xl text-cream/80"
              lowercase
              placeholder="overlay text"
            />
          </div>
        </div>
      </Section>

      <Section bg="cream" label="Philosophy">
        <div className="text-center">
          <EditableText
            fieldKey="philosophy.eyebrow"
            className="text-[11px] text-amber uppercase"
            placeholder="Eyebrow"
          />
          <EditableText
            fieldKey="philosophy.quote"
            block
            multiline
            className="mx-auto mt-3 max-w-xl font-display text-2xl text-oxblood"
            placeholder="Philosophy quote"
          />
          <EditableText
            fieldKey="philosophy.linkLabel"
            className="mt-4 inline-block text-xs text-amber uppercase"
            placeholder="Link label"
          />
        </div>
      </Section>

      <Section bg="oxblood" label="Closing CTA">
        <div className="text-center">
          <EditableText
            fieldKey="cta.eyebrow"
            className="text-[11px] text-amber uppercase"
            placeholder="Eyebrow"
          />
          <div className="mt-2 font-display text-3xl text-cream">
            <EditableText fieldKey="cta.heading.1" block placeholder="Line 1" />
            <EditableText
              fieldKey="cta.heading.2"
              block
              className="text-tan italic"
              placeholder="Italic word"
            />
          </div>
          <EditableText
            fieldKey="cta.body"
            block
            multiline
            className="mx-auto mt-3 max-w-md text-sm text-tan"
            placeholder="Body"
          />
          <EditableText
            fieldKey="cta.buttonLabel"
            className="mt-4 inline-block bg-amber px-6 py-2.5 text-xs font-medium text-charcoal uppercase"
            placeholder="Button"
          />
        </div>
      </Section>
    </>
  )
}

// ── Contact ──────────────────────────────────────────────────────────────────

export function ContactPreview() {
  return (
    <>
      <Section bg="oxblood" label="Hero">
        <div className="relative overflow-hidden rounded-sm">
          <EditableImage
            imageKey="hero.image"
            alt="Contact hero"
            aspectClass="aspect-[16/7]"
            sizes="800px"
          />
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/85 to-transparent p-6">
            <EditableText
              fieldKey="hero.eyebrow"
              className="pointer-events-auto text-[11px] text-amber uppercase"
              placeholder="Eyebrow"
            />
            <div className="pointer-events-auto mt-2 font-display text-4xl leading-none text-cream">
              <EditableText fieldKey="hero.heading.1" placeholder="Contact" />{" "}
              <EditableText
                fieldKey="hero.heading.2"
                className="text-amber italic"
                placeholder="the rye"
              />
            </div>
          </div>
        </div>
        <EditableText
          fieldKey="hero.body"
          block
          multiline
          className="mt-4 max-w-lg text-sm text-tan"
          placeholder="Intro"
        />
      </Section>

      <Section bg="charcoal" label="Details">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Eyebrow fieldKey="details.eyebrow" />
            <div className="mt-3 font-display text-3xl leading-tight text-cream">
              <EditableText fieldKey="details.heading.1" block placeholder="Line 1" />
              <EditableText
                fieldKey="details.heading.2"
                block
                className="text-tan italic"
                placeholder="Italic words"
              />
            </div>
            <div className="mt-5 space-y-3">
              {[
                { key: "details.call.label", hint: "Phone" },
                { key: "details.email.label", hint: "Email" },
                { key: "details.address.label", hint: "Address" },
              ].map((row) => (
                <div key={row.key} className="border-t border-cream/10 pt-3">
                  <EditableText
                    fieldKey={row.key}
                    className="text-xs text-tan/60 uppercase"
                    placeholder={`${row.hint} label`}
                  />
                  <p className="mt-0.5 text-xs text-cream/40">
                    {row.hint} value comes from Common Values
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-sm">
            <EditableImage
              imageKey="details.image"
              alt="Contact side image"
              aspectClass="aspect-[4/5]"
            />
          </div>
        </div>
      </Section>
    </>
  )
}

// ── Our Staff — page content (intro + CTA) ───────────────────────────────────

export function StaffContentPreview() {
  return (
    <>
      <Section bg="oxblood" label="Intro">
        <Eyebrow fieldKey="intro.eyebrow" />
        <div className="mt-3 font-display text-3xl leading-tight text-cream">
          <EditableText fieldKey="intro.heading.1" block placeholder="Line 1" />
          <EditableText
            fieldKey="intro.heading.2"
            block
            className="font-cursive text-amber"
            lowercase
            placeholder="cursive word"
          />
          <EditableText fieldKey="intro.heading.3" block placeholder="Line 3" />
        </div>
        <EditableText
          fieldKey="intro.body.1"
          block
          multiline
          className="mt-4 max-w-lg text-sm text-tan"
          placeholder="Body 1"
        />
        <EditableText
          fieldKey="intro.body.2"
          block
          multiline
          className="mt-3 max-w-lg text-sm text-tan"
          placeholder="Body 2"
        />
      </Section>

      <Section bg="cream" label="Reservation CTA">
        <div className="text-center">
          <EditableText
            fieldKey="cta.eyebrow"
            className="text-[11px] text-amber uppercase"
            placeholder="Eyebrow"
          />
          <div className="mt-2 font-display text-3xl text-charcoal">
            <EditableText fieldKey="cta.heading.1" block placeholder="Line 1" />
            <EditableText
              fieldKey="cta.heading.2"
              block
              className="text-oxblood italic"
              placeholder="Italic word"
            />
          </div>
          <EditableText
            fieldKey="cta.body"
            block
            multiline
            className="mx-auto mt-3 max-w-md text-sm text-charcoal/60"
            placeholder="Body"
          />
          <EditableText
            fieldKey="cta.buttonLabel"
            className="mt-4 inline-block bg-oxblood px-6 py-2.5 text-xs font-medium text-cream uppercase"
            placeholder="Button"
          />
        </div>
      </Section>
    </>
  )
}
