import { fetchQuery } from "convex/nextjs"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { DecorTilt } from "~/components/decor-tilt"
import { HeroCarousel } from "~/components/hero-carousel"
import { RestaurantGroupSection } from "~/components/restaurant-group-section"
import { SectionDivider } from "~/components/section-divider"
import { TiltCard } from "~/components/tilt-card"
import { resolveCommonValues } from "~/lib/common-values"
import { resolveSiteContent } from "~/lib/site-content"
import { api } from "../../../convex/_generated/api"

const SHOW_TEAM_SECTION = false

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, values, team, and ingredients behind Butcher and the Rye, Pittsburgh's destination for craft cuisine and rare spirits.",
}

const VALUE_META = [
  {
    numeral: "01",
    numeralClass: "right-0 bottom-0",
    key: "value.1",
    // Excellence → meat grinder, bottom-right of the photo
    decor: {
      src: "/pipe.png",
      width: 488,
      height: 961,
      className: "-right-3 -bottom-6",
      baseRotate: -8,
    },
  },
  {
    numeral: "02",
    numeralClass: "bottom-0 left-1/2 -translate-x-1/2",
    key: "value.2",
    // Craft → cocktail glass, bottom-left of the photo
    decor: {
      src: "/glass.png",
      width: 423,
      height: 781,
      className: "-left-3 -bottom-6",
      baseRotate: 6,
    },
  },
  {
    numeral: "03",
    numeralClass: "bottom-0 -left-4",
    key: "value.3",
    // Hospitality → whiskey bottle, top-left of the photo
    decor: {
      src: "/bottle.png",
      width: 429,
      height: 844,
      className: "-top-8 -left-3",
      baseRotate: -6,
    },
  },
]

const FEATURED_STAFF = [
  {
    name: "Marcus Chen",
    role: "Executive Chef",
    initials: "MC",
    img: "/food/bone-in-ribeye.jpg",
  },
  {
    name: "Sophia Reeves",
    role: "Bar Director",
    initials: "SR",
    img: "/craft-old-fashioned.jpg",
  },
  {
    name: "James O'Brien",
    role: "Head Butcher",
    initials: "JO",
    img: "/food/bone-marrow.jpg",
  },
  {
    name: "Amara Washington",
    role: "General Manager",
    initials: "AW",
    img: "/candlelit-tables.jpg",
  },
]

export default async function About() {
  const [savedContent, savedCommonValues] = await Promise.all([
    fetchQuery(api.site.getPage, { key: "about" }),
    fetchQuery(api.site.getCommonValues, {}),
  ])
  const content = resolveSiteContent("about", savedContent)
  const common = resolveCommonValues(savedCommonValues)
  const f = content.fields
  const img = content.images
  const reservationHref = common["reservation.href"]
  const heroImages = [
    { src: img["hero.image.1"], alt: "Butcher and the Rye dining room" },
    { src: img["hero.image.2"], alt: "Butcher and the Rye" },
    { src: img["hero.image.3"], alt: "Butcher and the Rye" },
  ]
  const values = VALUE_META.map((value) => ({
    ...value,
    title: f[`${value.key}.title`],
    body: f[`${value.key}.body`],
    image: img[`${value.key}.image`],
  }))

  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="hero-section relative flex h-screen items-end overflow-hidden bg-oxblood">
        <HeroCarousel images={heroImages} />
        {/* Top vignette — darkens top half for atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/10 to-transparent" />
        {/* Bottom gradient — fades photo into next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-24 md:px-16">
          <p className="fade-in-up-1 mb-5 text-sm text-amber uppercase">{f["hero.eyebrow"]}</p>
          <h1 className="heading-emboss fade-in-up-2 font-display text-5xl text-cream md:text-7xl lg:text-8xl">
            {f["hero.heading.1"]}
            <br />
            <span className="text-amber italic">{f["hero.heading.2"]}</span> {f["hero.heading.3"]}
          </h1>
          <p className="fade-in-up-4 mt-6 max-w-md text-lg text-tan">{f["hero.body"]}</p>
        </div>
      </section>

      {/* ── 2. THE STORY ── */}
      <section data-wipe className="relative overflow-hidden bg-charcoal py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid items-start gap-20 md:grid-cols-[1.2fr_1fr] md:gap-16">
            {/* Left: copy */}
            <div>
              <div data-animate="" className="flex items-center gap-4">
                <span className="block h-px w-10 shrink-0 bg-amber/50" />
                <span className="text-sm text-amber uppercase">{f["story.eyebrow"]}</span>
              </div>
              <h2
                data-animate=""
                data-delay="130"
                className="heading-emboss mt-4 font-display text-5xl text-cream md:text-6xl"
              >
                {f["story.heading.1"]}
                <br />
                {f["story.heading.2"]}
                <br />
                <span className="text-tan italic">{f["story.heading.3"]}</span>
              </h2>
              <p data-animate="" data-delay="285" className="mt-10 text-lg text-tan">
                {f["story.body.1"]}
              </p>
              <p data-animate="" data-delay="440" className="mt-6 text-lg text-tan">
                {f["story.body.2"]}
              </p>
              <blockquote
                data-animate=""
                data-delay="600"
                className="mt-10 border-l-2 border-amber/30 pl-6"
              >
                <p className="font-cursive text-2xl text-cream/70">
                  &ldquo;{f["story.quote"]}&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Right: overlapping image collage */}
            <div className="relative mt-8 md:mt-16">
              <div
                data-animate=""
                data-delay="155"
                className="img-inset-shadow relative h-80 overflow-hidden shadow-xl md:h-96"
              >
                <Image
                  src={img["story.image.1"]}
                  alt="Candlelit dining at Butcher and the Rye"
                  fill
                  className="img-zoom object-cover"
                />
              </div>
              <TiltCard
                data-animate=""
                data-delay="340"
                initialRotate={-3}
                maxTilt={5}
                className="absolute -bottom-10 -left-6 z-10 h-44 w-32 shadow-2xl md:-left-10 md:h-52 md:w-40"
              >
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={img["story.image.2"]}
                    alt="A plated entrée"
                    fill
                    className="object-cover"
                  />
                </div>
              </TiltCard>
              <div
                data-animate=""
                data-delay="495"
                className="spin-slow absolute right-0 -bottom-14 z-10 h-28 w-28 text-amber/30 md:h-32 md:w-32"
                aria-hidden="true"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <path
                    id="storyRing"
                    d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text fontSize="8.5" fill="currentColor" letterSpacing="3.2">
                    <textPath href="#storyRing">BUTCHER &amp; THE RYE · EST 2013 ·</textPath>
                  </text>
                </svg>
              </div>
              <DecorTilt
                src="/old.png"
                width={590}
                height={982}
                baseRotate={6}
                tiltMax={11}
                className="right-1 bottom-0 md:right-2"
                imgClassName="h-[190px] w-auto opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE TEAM ── */}
      {/* Hiding "People behind the craft" section for now */}
      {SHOW_TEAM_SECTION && (
        <section data-wipe className="relative overflow-hidden bg-charcoal py-32 md:py-48">
          <div
            data-parallax="content"
            data-parallax-speed="0.06"
            className="mx-auto max-w-7xl px-8 md:px-16"
          >
            <div className="grid gap-16 md:grid-cols-2 md:gap-24">
              <div className="flex flex-col justify-center">
                <div data-animate="" className="flex items-center gap-4">
                  <span className="block h-px w-10 shrink-0 bg-amber/50" />
                  <span className="text-sm text-amber uppercase">The People</span>
                </div>
                <h2
                  data-animate=""
                  data-delay="130"
                  className="heading-emboss mt-4 font-display text-5xl text-cream md:text-6xl"
                >
                  The people
                  <br />
                  behind
                  <br />
                  <span className="text-tan italic">the craft</span>
                </h2>
                <p data-animate="" data-delay="285" className="mt-8 text-lg text-tan">
                  Our team brings decades of combined experience from some of the country&rsquo;s
                  finest kitchens, bars, and dining rooms. They are passionate, rigorously trained,
                  and united by one shared devotion: excellence at every table, every night.
                </p>
                {/* Hiding our-staff link for now */}
                {/* <span
                data-animate=""
                data-delay="470"
                className="mt-10 inline-block"
              >
                <Link
                  href="/our-staff"
                  className="group inline-flex items-center gap-3 text-sm text-amber uppercase transition-colors duration-500 hover:text-cream"
                >
                  Meet the full team
                  <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                </Link>
              </span> */}
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:pl-8">
                {FEATURED_STAFF.map((member, i) => (
                  <div
                    key={member.name}
                    data-animate=""
                    data-delay={String(i * 120)}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border border-amber/20">
                      <Image src={member.img} alt={member.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-charcoal/55" />
                      <span className="absolute inset-0 flex items-center justify-center font-subhead text-2xl text-amber/70 select-none">
                        {member.initials}
                      </span>
                      <div className="absolute inset-0 rounded-full ring-1 ring-amber/10 ring-inset" />
                    </div>
                    <p className="font-subhead text-xl text-cream">{member.name}</p>
                    <p className="mt-1 text-xs text-amber uppercase">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. OUR VALUES ── */}
      <section data-wipe className="relative overflow-hidden bg-oxblood py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div data-animate="" className="mb-20 flex items-center gap-4">
            <span className="block h-px w-10 shrink-0 bg-amber/50" />
            <span className="text-sm text-amber uppercase">{f["values.eyebrow"]}</span>
          </div>

          {values.map((value, i) => {
            const reversed = i === 1
            return (
              <div
                key={value.numeral}
                className={`${i < values.length - 1 ? "mb-16 " : ""}border-t border-cream/10 pt-12`}
              >
                <div
                  className={`grid items-center gap-8 md:gap-16 ${
                    reversed ? "md:grid-cols-[0.75fr_1fr]" : "md:grid-cols-[1fr_0.75fr]"
                  }`}
                >
                  <div className={`relative ${reversed ? "md:order-2" : ""}`}>
                    <div
                      className={`pointer-events-none absolute ${value.numeralClass} font-display text-[7rem] text-cream/[0.04] select-none md:text-[11rem] lg:text-[14rem]`}
                      aria-hidden="true"
                    >
                      {value.numeral}
                    </div>
                    <div className="relative z-10">
                      <h3
                        data-animate=""
                        data-delay="0"
                        className="font-display text-6xl text-cream md:text-7xl"
                      >
                        {value.title}
                      </h3>
                      <p data-animate="" data-delay="130" className="mt-6 text-lg text-tan">
                        {value.body}
                      </p>
                    </div>
                  </div>
                  <div
                    data-animate=""
                    data-delay="260"
                    className={`relative ${reversed ? "md:order-1" : ""}`}
                  >
                    <TiltCard
                      initialRotate={i % 2 === 0 ? -2 : 2}
                      maxTilt={5}
                      className="bg-cream p-3 pb-10 shadow-2xl md:p-4 md:pb-12"
                    >
                      <div className="img-inset-shadow relative h-64 overflow-hidden md:h-80">
                        <Image
                          src={value.image}
                          alt={`${value.title} at Butcher and the Rye`}
                          fill
                          className="img-zoom object-cover"
                        />
                      </div>
                    </TiltCard>
                    <DecorTilt
                      src={value.decor.src}
                      width={value.decor.width}
                      height={value.decor.height}
                      baseRotate={value.decor.baseRotate}
                      tiltMax={11}
                      className={value.decor.className}
                      imgClassName="h-[150px] w-auto opacity-90 md:h-[190px]"
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 4. FULL-WIDTH IMAGE BREAK ── */}
      <section data-wipe className="relative min-h-[80vh] overflow-hidden bg-charcoal">
        <div
          data-parallax="image-break"
          data-parallax-speed="0.1"
          className="absolute inset-x-0 top-[-10%] bottom-[-10%]"
        >
          <Image
            src={img["break.image"]}
            alt="Behind the bar at Butcher and the Rye"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            data-animate=""
            className="px-8 text-center font-cursive text-3xl text-cream/80 md:text-5xl"
          >
            {f["break.text"]}
          </p>
        </div>
      </section>

      {/* ── 6. PULL QUOTE ── */}
      <section data-wipe className="relative overflow-hidden bg-cream py-32 md:py-48">
        <div
          data-parallax="content"
          data-parallax-speed="0.05"
          className="relative z-10 mx-auto max-w-5xl px-8 text-center md:px-16"
        >
          <p data-animate="" className="mb-8 text-sm text-amber uppercase">
            {f["philosophy.eyebrow"]}
          </p>
          <blockquote
            data-animate=""
            data-delay="130"
            className="font-display text-3xl text-oxblood md:text-5xl lg:text-6xl"
          >
            &ldquo;{f["philosophy.quote"]}&rdquo;
          </blockquote>
          <span data-animate="" data-delay="365" className="mt-12 inline-block">
            <Link
              href="/food"
              className="group inline-flex items-center gap-3 text-sm text-amber uppercase transition-colors duration-500 hover:text-oxblood"
            >
              {f["philosophy.linkLabel"]}
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </Link>
          </span>
          <SectionDivider className="mt-12" />
        </div>
      </section>

      {/* ── 7. CLOSING CTA ── */}
      <section
        data-wipe
        className="relative flex items-center justify-center overflow-hidden bg-oxblood py-32 md:py-48"
      >
        <div
          data-parallax="content"
          data-parallax-speed="0.1"
          className="absolute inset-0 opacity-20"
        >
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--color-charcoal)_0%,_transparent_70%)]" />
        </div>
        <div className="relative z-10 text-center">
          <div data-animate="" className="flex items-center justify-center gap-6">
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
            <span className="text-sm text-amber uppercase">{f["cta.eyebrow"]}</span>
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
          </div>
          <h2
            data-animate=""
            data-delay="130"
            className="heading-emboss mt-4 font-display text-5xl text-cream md:text-8xl"
          >
            {f["cta.heading.1"]}
            <br />
            <span className="text-tan italic">{f["cta.heading.2"]}</span>
          </h2>
          <p data-animate="" data-delay="285" className="mx-auto mt-8 max-w-md text-lg text-tan">
            {f["cta.body"]}
          </p>
          <span data-animate="" data-delay="470" className="mt-12 inline-block">
            <Link
              href={reservationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-plaque inline-block px-12 py-5 text-xs font-medium uppercase"
            >
              {f["cta.buttonLabel"]}
            </Link>
          </span>
          <SectionDivider className="mt-12" />
        </div>
        <DecorTilt
          src="/old.png"
          width={590}
          height={982}
          baseRotate={7}
          tiltMax={11}
          className="right-2 bottom-4 md:right-10 md:bottom-8"
          imgClassName="h-[190px] w-auto opacity-90 md:h-[300px]"
        />
      </section>

      <RestaurantGroupSection />
    </>
  )
}
