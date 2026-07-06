import { STAFF } from "~/data/staff"

export const SITE_PAGE_KEYS = ["home", "about", "contact", "our-staff"] as const

export type SitePageKey = (typeof SITE_PAGE_KEYS)[number]

export type StoredSitePageContent = {
  fields?: Record<string, string> | null
  imageUrls?: Record<string, string | null> | null
}

type BaseField = {
  key: string
  label: string
  help?: string
}

export type TextField = BaseField & {
  kind: "text" | "textarea"
  defaultValue: string
  lowercase?: boolean
}

export type ImageField = BaseField & {
  kind: "image"
  defaultSrc: string
  alt: string
}

export type ContentField = TextField | ImageField

export type ContentSection = {
  title: string
  fields: ContentField[]
}

export type SitePageDefinition = {
  key: SitePageKey
  label: string
  publicHref: string
  sections: ContentSection[]
}

export type ResolvedSiteContent = {
  fields: Record<string, string>
  images: Record<string, string>
}

const homeDefinition: SitePageDefinition = {
  key: "home",
  label: "Home",
  publicHref: "/",
  sections: [
    {
      title: "Hero",
      fields: [
        {
          kind: "image",
          key: "hero.image.1",
          label: "Hero image 1",
          defaultSrc: "/warm-dining-room.jpg",
          alt: "Butcher and the Rye dining room",
        },
        {
          kind: "image",
          key: "hero.image.2",
          label: "Hero image 2",
          defaultSrc: "/hero1.jpg",
          alt: "Butcher and the Rye",
        },
        {
          kind: "image",
          key: "hero.image.3",
          label: "Hero image 3",
          defaultSrc: "/hero2.jpg",
          alt: "Butcher and the Rye",
        },
        {
          kind: "text",
          key: "hero.reserveLabel",
          label: "Reserve button",
          defaultValue: "Reserve a Table",
        },
        { kind: "text", key: "hero.menuLabel", label: "Menu button", defaultValue: "View Menu" },
        {
          kind: "text",
          key: "hero.beveragesLabel",
          label: "Mobile beverages button",
          defaultValue: "View Beverages",
        },
      ],
    },
    {
      title: "Cocktails",
      fields: [
        {
          kind: "image",
          key: "cocktails.image",
          label: "Feature image",
          defaultSrc: "/craft-old-fashioned.jpg",
          alt: "Craft cocktail",
        },
        {
          kind: "text",
          key: "cocktails.caption",
          label: "Image caption",
          defaultValue: "the old fashioned",
          lowercase: true,
        },
        {
          kind: "text",
          key: "cocktails.eyebrow",
          label: "Eyebrow",
          defaultValue: "Cocktails & Spirits",
        },
        { kind: "text", key: "cocktails.titleTop", label: "Title top", defaultValue: "Crafted" },
        {
          kind: "text",
          key: "cocktails.titleScript",
          label: "Title script word",
          defaultValue: "never",
          lowercase: true,
        },
        {
          kind: "text",
          key: "cocktails.titleBottom",
          label: "Title bottom",
          defaultValue: "mixed",
        },
        {
          kind: "text",
          key: "cocktail.1.name",
          label: "Cocktail 1 name",
          defaultValue: "The Old Fashioned",
        },
        {
          kind: "textarea",
          key: "cocktail.1.description",
          label: "Cocktail 1 description",
          defaultValue: "Buffalo Trace, demerara, Angostura, expressed orange peel",
        },
        {
          kind: "text",
          key: "cocktail.2.name",
          label: "Cocktail 2 name",
          defaultValue: "Smoke & Rye",
        },
        {
          kind: "textarea",
          key: "cocktail.2.description",
          label: "Cocktail 2 description",
          defaultValue: "Rittenhouse rye, mezcal rinse, maple, black walnut bitters",
        },
        {
          kind: "text",
          key: "cocktail.3.name",
          label: "Cocktail 3 name",
          defaultValue: "The Butcher's Manhattan",
        },
        {
          kind: "textarea",
          key: "cocktail.3.description",
          label: "Cocktail 3 description",
          defaultValue: "Woodford Reserve, Carpano Antica, brandied cherry",
        },
      ],
    },
    {
      title: "Story Preview",
      fields: [
        { kind: "text", key: "story.eyebrow", label: "Eyebrow", defaultValue: "Our Story" },
        {
          kind: "text",
          key: "story.heading.1",
          label: "Heading line 1",
          defaultValue: "Where every",
        },
        {
          kind: "text",
          key: "story.heading.2",
          label: "Heading line 2",
          defaultValue: "glass has a",
        },
        { kind: "text", key: "story.heading.3", label: "Italic word", defaultValue: "history" },
        {
          kind: "textarea",
          key: "story.body.1",
          label: "Body 1",
          defaultValue:
            "Butcher and the Rye was born from a reverence for the craft: the slow char of a barrel, the patience of a dry-aged cut, the conversation that only happens around a well-set table.",
        },
        {
          kind: "textarea",
          key: "story.body.2",
          label: "Body 2",
          defaultValue:
            "We are a place for those who understand that a great evening is not rushed. It is savored, one pour at a time.",
        },
        { kind: "text", key: "story.linkLabel", label: "Link label", defaultValue: "Read more" },
        {
          kind: "image",
          key: "story.image.1",
          label: "Large image",
          defaultSrc: "/barmood.jpg",
          alt: "The bar at Butcher and the Rye",
        },
        {
          kind: "image",
          key: "story.image.2",
          label: "Small image",
          defaultSrc: "/glow-frame.png",
          alt: "Bar glow",
        },
      ],
    },
    {
      title: "Menu Preview",
      fields: [
        { kind: "text", key: "menu.eyebrow", label: "Eyebrow", defaultValue: "From the Kitchen" },
        { kind: "text", key: "menu.heading", label: "Heading", defaultValue: "The menu" },
        { kind: "text", key: "menu.buttonLabel", label: "Button label", defaultValue: "Full Menu" },
        {
          kind: "textarea",
          key: "menu.body",
          label: "Body",
          defaultValue:
            "Sourced from heritage farms and shaped by old-world technique. Every plate is a reflection of place, season, and craft.",
        },
        {
          kind: "image",
          key: "menu.image.1",
          label: "Menu image 1",
          defaultSrc: "/meat-board.jpg",
          alt: "Meat Board",
        },
        {
          kind: "image",
          key: "menu.image.2",
          label: "Menu image 2",
          defaultSrc: "/plated-entree.jpg",
          alt: "Signature plated dish",
        },
        {
          kind: "image",
          key: "menu.image.3",
          label: "Menu image 3",
          defaultSrc: "/steak.jpg",
          alt: "Steak",
        },
      ],
    },
    {
      title: "Quote and Reservations",
      fields: [
        {
          kind: "image",
          key: "quote.image",
          label: "Quote banner image",
          defaultSrc: "/parallax-wide.jpg",
          alt: "Butcher and the Rye",
        },
        {
          kind: "textarea",
          key: "quote.text",
          label: "Quote text",
          defaultValue: "The best meals are the ones you never forget.",
        },
        {
          kind: "text",
          key: "quote.cite",
          label: "Quote citation",
          defaultValue: "Butcher & the Rye · Est. 2013",
        },
        {
          kind: "text",
          key: "gallery.eyebrow",
          label: "Gallery eyebrow",
          defaultValue: "On the Wall",
        },
        {
          kind: "image",
          key: "gallery.frame.1",
          label: "Gallery frame 1",
          defaultSrc: "/entree-frame.png",
          alt: "Plated dish",
        },
        {
          kind: "image",
          key: "gallery.frame.2",
          label: "Gallery frame 2",
          defaultSrc: "/glow-frame.png",
          alt: "The bar",
        },
        {
          kind: "image",
          key: "gallery.frame.3",
          label: "Gallery frame 3",
          defaultSrc: "/whiskey-frame.png",
          alt: "Whiskey pour",
        },
        {
          kind: "image",
          key: "gallery.frame.4",
          label: "Gallery frame 4",
          defaultSrc: "/bartender-frame.png",
          alt: "Bartender",
        },
        {
          kind: "text",
          key: "carousel.eyebrow",
          label: "Carousel eyebrow",
          defaultValue: "A Taste of the Experience",
        },
        {
          kind: "image",
          key: "carousel.image.1",
          label: "Carousel image 1",
          defaultSrc: "/decor12.jpg",
          alt: "Bar atmosphere",
        },
        {
          kind: "image",
          key: "carousel.image.2",
          label: "Carousel image 2",
          defaultSrc: "/decor14.jpg",
          alt: "Bar decor",
        },
        {
          kind: "image",
          key: "carousel.image.3",
          label: "Carousel image 3",
          defaultSrc: "/bartender-at-work.jpg",
          alt: "Bartender at work",
        },
        {
          kind: "image",
          key: "carousel.image.4",
          label: "Carousel image 4",
          defaultSrc: "/decor15.jpg",
          alt: "Candlelit tables",
        },
        {
          kind: "image",
          key: "carousel.image.5",
          label: "Carousel image 5",
          defaultSrc: "/cocktail-splash.jpg",
          alt: "Cocktail",
        },
        {
          kind: "image",
          key: "carousel.image.6",
          label: "Carousel image 6",
          defaultSrc: "/fondue-spread.jpg",
          alt: "Fondue spread",
        },
        {
          kind: "image",
          key: "carousel.image.7",
          label: "Carousel image 7",
          defaultSrc: "/charcuterie-board.jpg",
          alt: "Charcuterie board",
        },
        {
          kind: "image",
          key: "carousel.image.8",
          label: "Carousel image 8",
          defaultSrc: "/mussels-cream-sauce.jpg",
          alt: "Mussels",
        },
        {
          kind: "image",
          key: "carousel.image.9",
          label: "Carousel image 9",
          defaultSrc: "/steak-tartare.jpg",
          alt: "Steak tartare",
        },
        {
          kind: "image",
          key: "carousel.image.10",
          label: "Carousel image 10",
          defaultSrc: "/parallax-wide.jpg",
          alt: "The restaurant",
        },
        { kind: "text", key: "reservations.eyebrow", label: "Eyebrow", defaultValue: "Join Us" },
        {
          kind: "text",
          key: "reservations.heading.1",
          label: "Heading line 1",
          defaultValue: "Reserve your",
        },
        {
          kind: "text",
          key: "reservations.heading.2",
          label: "Italic word",
          defaultValue: "evening",
        },
        {
          kind: "textarea",
          key: "reservations.body",
          label: "Body",
          defaultValue:
            "Whether it's a quiet dinner for two or a gathering worth remembering, we'll set the table.",
        },
        {
          kind: "text",
          key: "reservations.buttonLabel",
          label: "Button label",
          defaultValue: "Book a Table",
        },
      ],
    },
  ],
}

const aboutDefinition: SitePageDefinition = {
  key: "about",
  label: "About",
  publicHref: "/about",
  sections: [
    {
      title: "Hero",
      fields: [
        {
          kind: "image",
          key: "hero.image.1",
          label: "Hero image 1",
          defaultSrc: "/about-background.jpg",
          alt: "Butcher and the Rye dining room",
        },
        {
          kind: "image",
          key: "hero.image.2",
          label: "Hero image 2",
          defaultSrc: "/abouthero2.jpg",
          alt: "Butcher and the Rye",
        },
        {
          kind: "image",
          key: "hero.image.3",
          label: "Hero image 3",
          defaultSrc: "/abouthero3.jpg",
          alt: "Butcher and the Rye",
        },
        {
          kind: "text",
          key: "hero.eyebrow",
          label: "Eyebrow",
          defaultValue: "Pittsburgh, PA · Est. 2013",
        },
        {
          kind: "text",
          key: "hero.heading.1",
          label: "Heading line 1",
          defaultValue: "Where Craft",
        },
        { kind: "text", key: "hero.heading.2", label: "Italic word", defaultValue: "Meets" },
        { kind: "text", key: "hero.heading.3", label: "Heading word", defaultValue: "Tradition" },
        {
          kind: "textarea",
          key: "hero.body",
          label: "Intro",
          defaultValue:
            "A storied table in Pittsburgh's Penn Avenue corridor, built on the belief that extraordinary evenings begin with extraordinary people and uncompromising craft.",
        },
      ],
    },
    {
      title: "Story",
      fields: [
        { kind: "text", key: "story.eyebrow", label: "Eyebrow", defaultValue: "The Chef" },
        { kind: "text", key: "story.heading.1", label: "Heading line 1", defaultValue: "A life" },
        {
          kind: "text",
          key: "story.heading.2",
          label: "Heading line 2",
          defaultValue: "shaped by",
        },
        { kind: "text", key: "story.heading.3", label: "Italic words", defaultValue: "the fire" },
        {
          kind: "textarea",
          key: "story.body.1",
          label: "Body 1",
          defaultValue:
            "Our Executive Chef came up the long way: years on the line in some of the country's most demanding kitchens, training under butchers who measured aging in months and chefs who measured stocks in days. Every technique here is one he learned by hand.",
        },
        {
          kind: "textarea",
          key: "story.body.2",
          label: "Body 2",
          defaultValue:
            "His philosophy is simple: source honestly, cook patiently, and trust the ingredient. The menu changes with what the farms and seasons offer, but the discipline behind every plate never does.",
        },
        {
          kind: "textarea",
          key: "story.quote",
          label: "Quote",
          defaultValue:
            "The fire teaches you patience. The cut teaches you respect. The rest is just paying attention.",
        },
        {
          kind: "image",
          key: "story.image.1",
          label: "Large image",
          defaultSrc: "/decor15.jpg",
          alt: "Candlelit dining at Butcher and the Rye",
        },
        {
          kind: "image",
          key: "story.image.2",
          label: "Small image",
          defaultSrc: "/entree-frame.png",
          alt: "A plated entree",
        },
      ],
    },
    {
      title: "Values",
      fields: [
        { kind: "text", key: "values.eyebrow", label: "Eyebrow", defaultValue: "Our Values" },
        { kind: "text", key: "value.1.title", label: "Value 1 title", defaultValue: "Excellence" },
        {
          kind: "textarea",
          key: "value.1.body",
          label: "Value 1 body",
          defaultValue:
            "We hold every plate and every pour to the same exacting standard. No table is less important than another. No dish leaves our kitchen without meeting the mark. Excellence isn't an aspiration here. It's the minimum.",
        },
        {
          kind: "image",
          key: "value.1.image",
          label: "Value 1 image",
          defaultSrc: "/barmood1.jpg",
          alt: "Excellence at Butcher and the Rye",
        },
        { kind: "text", key: "value.2.title", label: "Value 2 title", defaultValue: "Craft" },
        {
          kind: "textarea",
          key: "value.2.body",
          label: "Value 2 body",
          defaultValue:
            "Every technique here is learned the slow way. Our chefs apprenticed under demanding kitchens. Our bartenders spent years studying whiskey before touching our bar. There are no shortcuts, and we wouldn't have it any other way.",
        },
        {
          kind: "image",
          key: "value.2.image",
          label: "Value 2 image",
          defaultSrc: "/bardecor1.jpg",
          alt: "Craft at Butcher and the Rye",
        },
        { kind: "text", key: "value.3.title", label: "Value 3 title", defaultValue: "Hospitality" },
        {
          kind: "textarea",
          key: "value.3.body",
          label: "Value 3 body",
          defaultValue:
            "The meal is the occasion. The experience is the memory. We study our guests: their preferences, their celebrations, their habits. Hospitality at Butcher and the Rye means you never have to ask twice.",
        },
        {
          kind: "image",
          key: "value.3.image",
          label: "Value 3 image",
          defaultSrc: "/decor16.jpg",
          alt: "Hospitality at Butcher and the Rye",
        },
      ],
    },
    {
      title: "Closing",
      fields: [
        {
          kind: "image",
          key: "break.image",
          label: "Full-width image",
          defaultSrc: "/decor17.jpg",
          alt: "Behind the bar at Butcher and the Rye",
        },
        {
          kind: "text",
          key: "break.text",
          label: "Image overlay text",
          defaultValue: "every evening is its own occasion.",
          lowercase: true,
        },
        {
          kind: "text",
          key: "philosophy.eyebrow",
          label: "Philosophy eyebrow",
          defaultValue: "Our Philosophy",
        },
        {
          kind: "textarea",
          key: "philosophy.quote",
          label: "Philosophy quote",
          defaultValue: "The pursuit of extraordinary starts with refusing to accept ordinary.",
        },
        {
          kind: "text",
          key: "philosophy.linkLabel",
          label: "Menu link label",
          defaultValue: "Explore the menu",
        },
        { kind: "text", key: "cta.eyebrow", label: "CTA eyebrow", defaultValue: "Join Us" },
        {
          kind: "text",
          key: "cta.heading.1",
          label: "CTA heading line 1",
          defaultValue: "Reserve your",
        },
        { kind: "text", key: "cta.heading.2", label: "CTA italic word", defaultValue: "evening" },
        {
          kind: "textarea",
          key: "cta.body",
          label: "CTA body",
          defaultValue:
            "Whether it's a quiet dinner for two or a gathering worth remembering, we'll set the table.",
        },
        { kind: "text", key: "cta.buttonLabel", label: "CTA button", defaultValue: "Book a Table" },
      ],
    },
  ],
}

const contactDefinition: SitePageDefinition = {
  key: "contact",
  label: "Contact",
  publicHref: "/contact",
  sections: [
    {
      title: "Hero",
      fields: [
        {
          kind: "image",
          key: "hero.image",
          label: "Hero image",
          defaultSrc: "/bar-brass-glow.jpg",
          alt: "The bar at Butcher and the Rye",
        },
        {
          kind: "text",
          key: "hero.eyebrow",
          label: "Eyebrow",
          defaultValue: "Reservations · Questions · Private Dining",
        },
        { kind: "text", key: "hero.heading.1", label: "Heading line 1", defaultValue: "Contact" },
        { kind: "text", key: "hero.heading.2", label: "Italic words", defaultValue: "the rye" },
        {
          kind: "textarea",
          key: "hero.body",
          label: "Intro",
          defaultValue:
            "Reach the host stand, plan a gathering, or find your way to our table on 6th Street.",
        },
      ],
    },
    {
      title: "Details",
      fields: [
        { kind: "text", key: "details.eyebrow", label: "Eyebrow", defaultValue: "Get in Touch" },
        {
          kind: "text",
          key: "details.heading.1",
          label: "Heading line 1",
          defaultValue: "We'll set",
        },
        {
          kind: "text",
          key: "details.heading.2",
          label: "Italic words",
          defaultValue: "the table",
        },
        { kind: "text", key: "details.call.label", label: "Phone label", defaultValue: "Call" },
        { kind: "text", key: "details.email.label", label: "Email label", defaultValue: "Email" },
        {
          kind: "text",
          key: "details.address.label",
          label: "Address label",
          defaultValue: "Find Us",
        },
        {
          kind: "image",
          key: "details.image",
          label: "Side image",
          defaultSrc: "/candlelit-tables.jpg",
          alt: "Candlelit tables at Butcher and the Rye",
        },
      ],
    },
  ],
}

const staffDefinition: SitePageDefinition = {
  key: "our-staff",
  label: "Our Staff",
  publicHref: "/our-staff",
  sections: [
    {
      title: "Intro",
      fields: [
        { kind: "text", key: "intro.eyebrow", label: "Eyebrow", defaultValue: "Our Staff" },
        {
          kind: "text",
          key: "intro.heading.1",
          label: "Heading line 1",
          defaultValue: "The People",
        },
        {
          kind: "text",
          key: "intro.heading.2",
          label: "Cursive word",
          defaultValue: "behind",
          lowercase: true,
        },
        {
          kind: "text",
          key: "intro.heading.3",
          label: "Heading line 3",
          defaultValue: "the Craft",
        },
        {
          kind: "textarea",
          key: "intro.body.1",
          label: "Body 1",
          defaultValue:
            "Every dish, cocktail, and evening at Butcher and the Rye is shaped by people who have devoted their lives to their craft. Rigorously trained, endlessly inspired, and driven by one goal: to give you something extraordinary.",
        },
        {
          kind: "textarea",
          key: "intro.body.2",
          label: "Body 2",
          defaultValue:
            "From our Executive Chef to our floor staff, everyone here shares the same relentless commitment to excellence. We don't settle for good. We pursue perfect, every single night.",
        },
      ],
    },
    {
      title: "Team",
      fields: Array.from({ length: 8 }, (_, index) => {
        const n = index + 1
        const member = STAFF[index]
        return [
          {
            kind: "text" as const,
            key: `staff.${n}.name`,
            label: `Staff ${n} name`,
            defaultValue: member?.name ?? "",
          },
          {
            kind: "text" as const,
            key: `staff.${n}.role`,
            label: `Staff ${n} role`,
            defaultValue: member?.role ?? "",
          },
          {
            kind: "text" as const,
            key: `staff.${n}.years`,
            label: `Staff ${n} experience`,
            defaultValue: member?.years ?? "",
          },
          {
            kind: "image" as const,
            key: `staff.${n}.headshot`,
            label: `Staff ${n} headshot`,
            defaultSrc: member?.headshot ?? "",
            alt: `Staff ${n} headshot`,
          },
        ]
      }).flat(),
    },
    {
      title: "Reservation CTA",
      fields: [
        { kind: "text", key: "cta.eyebrow", label: "Eyebrow", defaultValue: "Join Us" },
        {
          kind: "text",
          key: "cta.heading.1",
          label: "Heading line 1",
          defaultValue: "Reserve your",
        },
        { kind: "text", key: "cta.heading.2", label: "Italic word", defaultValue: "evening" },
        {
          kind: "textarea",
          key: "cta.body",
          label: "Body",
          defaultValue: "Our team is ready to welcome you. Book your table at Butcher and the Rye.",
        },
        {
          kind: "text",
          key: "cta.buttonLabel",
          label: "Button label",
          defaultValue: "Reserve Now",
        },
      ],
    },
  ],
}

export const SITE_PAGE_DEFINITIONS: SitePageDefinition[] = [
  homeDefinition,
  aboutDefinition,
  contactDefinition,
  staffDefinition,
]

export const SITE_PAGE_DEFINITION_BY_KEY = Object.fromEntries(
  SITE_PAGE_DEFINITIONS.map((definition) => [definition.key, definition]),
) as Record<SitePageKey, SitePageDefinition>

export function isSitePageKey(value: string): value is SitePageKey {
  return SITE_PAGE_KEYS.includes(value as SitePageKey)
}

export function getContentFields(definition: SitePageDefinition) {
  return definition.sections.flatMap((section) => section.fields)
}

export function getDefaultTextFields(definition: SitePageDefinition) {
  return Object.fromEntries(
    getContentFields(definition)
      .filter((field): field is TextField => field.kind === "text" || field.kind === "textarea")
      .map((field) => [
        field.key,
        field.lowercase ? field.defaultValue.toLowerCase() : field.defaultValue,
      ]),
  )
}

export function getDefaultImageFields(definition: SitePageDefinition) {
  return Object.fromEntries(
    getContentFields(definition)
      .filter((field): field is ImageField => field.kind === "image")
      .map((field) => [field.key, field.defaultSrc]),
  )
}

export function resolveSiteContent(
  key: SitePageKey,
  storedContent: StoredSitePageContent | null | undefined,
): ResolvedSiteContent {
  const definition = SITE_PAGE_DEFINITION_BY_KEY[key]
  const defaults = getDefaultTextFields(definition)
  const imageDefaults = getDefaultImageFields(definition)

  return {
    fields: {
      ...defaults,
      ...storedContent?.fields,
    },
    images: Object.fromEntries(
      Object.entries(imageDefaults).map(([imageKey, fallback]) => [
        imageKey,
        storedContent?.imageUrls?.[imageKey] ?? fallback,
      ]),
    ),
  }
}
