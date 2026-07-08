import { fetchQuery } from "convex/nextjs"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { EqualWidthStack } from "~/components/equal-width-stack"
import { FeaturedReviews } from "~/components/featured-reviews"
import { HeroCarousel } from "~/components/hero-carousel"
import { InfiniteCarousel } from "~/components/infinite-carousel"
import { OpenTableWidget } from "~/components/opentable-widget"
import { RestaurantGroupSection } from "~/components/restaurant-group-section"
import { SectionDivider } from "~/components/section-divider"
import { TiltCard } from "~/components/tilt-card"
import { resolveCommonValues } from "~/lib/common-values"
import { resolveSiteContent } from "~/lib/site-content"
import { api } from "../../convex/_generated/api"

const FRAME_META = [
  {
    key: "gallery.frame.1",
    alt: "Plated dish",
    w: 1652,
    h: 1924,
    rotate: -2.5,
    delay: "130",
  },
  {
    key: "gallery.frame.2",
    alt: "The bar",
    w: 1803,
    h: 2003,
    rotate: 1.5,
    delay: "285",
  },
  {
    key: "gallery.frame.3",
    alt: "Whiskey pour",
    w: 1579,
    h: 1996,
    rotate: -1.0,
    delay: "440",
  },
  {
    key: "gallery.frame.4",
    alt: "Bartender",
    w: 1208,
    h: 1662,
    rotate: 2.5,
    delay: "365",
  },
]

export default async function Home() {
  const [savedContent, savedCommonValues, featuredReviews] = await Promise.all([
    fetchQuery(api.site.getPage, { key: "home" }),
    fetchQuery(api.site.getCommonValues, {}),
    fetchQuery(api.menu.listFeaturedReviews, {}),
  ])
  const content = resolveSiteContent("home", savedContent)
  const common = resolveCommonValues(savedCommonValues)
  const f = content.fields
  const img = content.images
  const reservationHref = common["reservation.href"]
  const heroImages = [
    { src: img["hero.image.1"], alt: "Butcher and the Rye dining room" },
    { src: img["hero.image.2"], alt: "Butcher and the Rye" },
    { src: img["hero.image.3"], alt: "Butcher and the Rye" },
  ]
  const cocktails = [1, 2, 3].map((n) => ({
    name: f[`cocktail.${n}.name`],
    description: f[`cocktail.${n}.description`],
  }))
  const frames = FRAME_META.map((frame) => ({ ...frame, src: img[frame.key] }))
  // Descriptive, non-redundant alt text per carousel scene — avoids the word
  // "image"/"photo" which trips Lighthouse's redundant-alt accessibility audit.
  const carouselAlts = [
    "Bar atmosphere",
    "Bar decor",
    "Bartender at work",
    "Candlelit tables",
    "A craft cocktail",
    "Fondue spread",
    "Charcuterie board",
    "Mussels in cream sauce",
    "Steak tartare",
    "The dining room",
  ]
  const carouselImages = Array.from({ length: 10 }, (_, index) => {
    const n = index + 1
    return {
      src: img[`carousel.image.${n}`],
      alt: carouselAlts[index] ?? "Butcher and the Rye",
    }
  })

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-section relative flex h-[70svh] items-end justify-center overflow-hidden bg-oxblood md:h-screen">
        <HeroCarousel images={heroImages} />
        {/* Top vignette — darkens top half for atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/10 to-transparent" />
        {/* Bottom gradient — fades into the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-transparent" />
        {/* Watermark logo */}
        {/* Faint decorative watermark. It must NOT preload/eager-load: doing so
            competes with the hero LCP image for bandwidth on slow connections.
            At 5% opacity a heavily-compressed, lazily-loaded copy is invisible.
            `sizes` deliberately under-requests (≈40% of the rendered box): at 5%
            opacity mix-blend-screen the softness is imperceptible, but it keeps
            the fetched file well under Lighthouse's "displayed dimensions"
            threshold (was serving a 750px/44 KiB copy for a ~720px box). */}
        <Image
          aria-hidden="true"
          src="/logo.png"
          alt=""
          width={1200}
          height={1200}
          quality={30}
          loading="lazy"
          sizes="40vmin"
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[100vmin] w-[100vmin] -translate-x-1/2 -translate-y-1/2 opacity-[0.05] mix-blend-screen"
        />
        <div className="relative z-10 flex flex-col items-center px-8 pb-16 text-center md:px-16 md:pb-24">
          <div className="fade-in-up-3 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href={reservationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-amber px-10 py-4 font-display text-sm text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)]"
            >
              {f["hero.reserveLabel"]}
            </Link>
            <div className="flex items-center gap-4 sm:contents">
              <Link
                href="/food"
                className="inline-block border border-amber px-8 py-4 font-display text-sm text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)] sm:px-10"
              >
                {f["hero.menuLabel"]}
              </Link>
              <Link
                href="/beverages"
                className="hidden border border-amber px-8 py-4 font-display text-sm text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)] max-sm:inline-block"
              >
                {f["hero.beveragesLabel"]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OpenTable Reservation Widget ── */}
      <section className="bg-oxblood px-8 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-4xl">
          <OpenTableWidget />
        </div>
      </section>

      {/* ── Cocktails & Spirits ── */}
      <section data-wipe className="relative overflow-hidden bg-oxblood py-20 md:py-48">
        {/* Ambient glow blob — lower-left, warm */}
        <div
          aria-hidden="true"
          className="glow-amber pointer-events-none absolute -bottom-32 -left-32 h-[550px] w-[550px] rounded-full opacity-[0.07]"
        />
        <div className="mx-auto grid max-w-7xl gap-16 px-8 md:grid-cols-2 md:px-16">
          <div data-animate="">
            <TiltCard
              initialRotate={-2}
              maxTilt={7}
              className="mx-auto w-3/4 self-center bg-cream p-4 pb-0 shadow-2xl md:p-6 md:pb-0"
            >
              <div className="img-inset-shadow relative aspect-[3/4] overflow-hidden">
                <Image
                  src={img["cocktails.image"]}
                  alt="Craft cocktail"
                  fill
                  sizes="(min-width: 768px) 38vw, 75vw"
                  className="img-zoom object-cover"
                />
              </div>
              <div className="flex h-16 items-center justify-center md:h-24">
                <p className="font-handwritten text-3xl text-charcoal md:text-4xl">
                  {f["cocktails.caption"]}
                </p>
              </div>
            </TiltCard>
          </div>
          <div className="flex flex-col justify-center">
            <div data-animate="" className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-sm text-amber uppercase">{f["cocktails.eyebrow"]}</span>
            </div>
            <h2
              data-animate=""
              data-delay="130"
              className="heading-emboss mt-4 font-display text-5xl text-cream md:text-7xl"
            >
              <EqualWidthStack className="inline-block text-center">
                <span className="invisible block">
                  <span data-equal-word="" className="inline-block">
                    {f["cocktails.titleTop"]}
                  </span>
                </span>
                <span className="-mt-[0.4em] -mb-[0.65em] block font-cursive text-amber">
                  {f["cocktails.titleScript"]}
                </span>
                <span className="invisible block text-cream">
                  <span data-equal-word="" className="inline-block">
                    {f["cocktails.titleBottom"]}
                  </span>
                </span>
              </EqualWidthStack>
            </h2>
            <div className="mt-16 space-y-10">
              {cocktails.map((drink, i) => (
                <div key={drink.name} data-animate="" data-delay={String(260 + i * 130)}>
                  <h3 className="font-subhead text-2xl text-cream">{drink.name}</h3>
                  <p className="mt-2 text-tan">{drink.description}</p>
                </div>
              ))}
            </div>

            <SectionDivider className="my-4" />

            {/* Hiding beverages/spirits links for now */}
            {/* <div data-animate="" data-delay="715" className="flex gap-6">
              <Link
                href="/beverages"
                className="border border-amber px-8 py-4 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)]"
              >
                Beverages
              </Link>
              <Link
                href="/spirits"
                className="border border-amber px-8 py-4 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)]"
              >
                Spirits
              </Link>
            </div> */}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section data-wipe className="relative overflow-hidden bg-charcoal py-32 md:py-48">
        {/* Ambient glow blob */}
        <div
          aria-hidden="true"
          className="glow-amber-wide pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-[0.06]"
        />
        <div
          data-parallax="content"
          data-parallax-speed="0.06"
          className="mx-auto grid max-w-7xl items-center gap-16 px-8 md:grid-cols-2 md:px-16"
        >
          {/* Left: copy */}
          <div className="flex flex-col justify-center">
            <div data-animate="" className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-sm text-amber uppercase">{f["story.eyebrow"]}</span>
            </div>
            <h2
              data-animate=""
              data-delay="130"
              className="heading-emboss mt-4 font-display text-5xl text-cream md:text-7xl"
            >
              {f["story.heading.1"]}
              <br />
              {f["story.heading.2"]}
              <br />
              <span className="text-tan italic">{f["story.heading.3"]}</span>
            </h2>
            <p data-animate="" data-delay="260" className="mt-8 text-lg text-tan">
              {f["story.body.1"]}
            </p>
            <p data-animate="" data-delay="390" className="mt-6 text-lg text-tan">
              {f["story.body.2"]}
            </p>
            <span data-animate="" data-delay="520" className="mt-10 inline-block">
              <Link
                href="/about"
                aria-label="Read our story about Butcher and the Rye"
                className="group inline-flex items-center gap-3 text-base text-amber uppercase transition-colors duration-500 hover:text-cream"
              >
                {f["story.linkLabel"]}
                <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
              </Link>
            </span>
          </div>

          {/* Right: tilted image collage */}
          <div className="relative mt-8 md:mt-0">
            <div
              data-animate=""
              data-delay="195"
              className="img-inset-shadow relative h-[26rem] rotate-[-1.2deg] overflow-hidden shadow-2xl"
            >
              <Image
                src={img["story.image.1"]}
                alt="The bar at Butcher and the Rye"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="img-zoom object-cover"
              />
            </div>
            <TiltCard
              data-animate=""
              data-delay="365"
              initialRotate={2}
              maxTilt={5}
              className="absolute -right-6 -bottom-8 z-10 h-44 w-32 shadow-2xl md:-right-10 md:h-52 md:w-40"
            >
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src={img["story.image.2"]}
                  alt="Bar glow"
                  fill
                  quality={30}
                  sizes="(min-width: 768px) 160px, 128px"
                  className="object-cover"
                />
              </div>
            </TiltCard>
            {/* Spinning text ring */}
            <div
              data-animate=""
              data-delay="495"
              className="spin-slow absolute -bottom-14 left-0 z-10 h-28 w-28 text-amber/20 md:h-32 md:w-32"
              aria-hidden="true"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <path
                  id="aboutRing"
                  d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  fill="none"
                />
                <text fontSize="8.5" fill="currentColor" letterSpacing="3.2">
                  <textPath href="#aboutRing">BUTCHER &amp; THE RYE · EST 2013 ·</textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Menu Highlights ── */}
      <section data-wipe className="bg-oxblood py-32 md:py-48">
        <div
          data-parallax="content"
          data-parallax-speed="0.05"
          className="mx-auto max-w-7xl px-8 md:px-16"
        >
          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-3 lg:items-start">
            <div className="flex flex-col gap-10">
              <div>
                <div data-animate="" className="flex items-center gap-4">
                  <span className="block h-px w-10 shrink-0 bg-amber/50" />
                  <span className="text-sm text-amber uppercase">{f["menu.eyebrow"]}</span>
                </div>
                <h2
                  data-animate=""
                  data-delay="130"
                  className="heading-emboss mt-4 font-display text-5xl text-cream md:text-7xl"
                >
                  {f["menu.heading"]}
                </h2>
                <span data-animate="" data-delay="220" className="mt-8 inline-block">
                  <Link
                    href="/food"
                    className="border border-amber px-10 py-4 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)]"
                  >
                    {f["menu.buttonLabel"]}
                  </Link>
                </span>
              </div>
              <div
                data-animate=""
                data-delay="220"
                className="img-inset-shadow relative aspect-[5/4] w-full overflow-hidden shadow-xl"
              >
                <Image
                  src={img["menu.image.1"]}
                  alt="Meat Board"
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="img-zoom object-cover"
                />
              </div>
            </div>

            <div
              data-animate=""
              data-delay="340"
              className="img-inset-shadow relative aspect-[3/4] w-full overflow-hidden shadow-xl"
            >
              <Image
                src={img["menu.image.2"]}
                alt="Signature plated dish"
                fill
                sizes="(min-width: 1024px) 380px, 100vw"
                className="img-zoom object-cover"
              />
            </div>

            <div className="lg:mt-16">
              <div
                data-animate=""
                data-delay="460"
                className="img-inset-shadow relative aspect-[5/4] w-full overflow-hidden shadow-xl"
              >
                <Image
                  src={img["menu.image.3"]}
                  alt="Steak"
                  fill
                  sizes="(min-width: 1024px) 380px, 100vw"
                  className="img-zoom object-cover"
                />
              </div>
              <div data-animate="" data-delay="560" className="mt-8">
                <p className="max-w-xs text-sm text-tan">{f["menu.body"]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedReviews reviews={featuredReviews} />

      {/* ── Parallax Banner ── */}
      <section
        data-wipe
        className="relative flex h-[50vh] min-h-80 items-center justify-center overflow-hidden"
      >
        <div
          data-parallax="content"
          data-parallax-speed="0.2"
          className="absolute inset-x-0 top-[-20%] bottom-[-20%]"
        >
          <Image src={img["quote.image"]} alt="Butcher and the Rye" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-charcoal/65" />
        <blockquote data-animate="" className="relative z-10 max-w-2xl px-8 text-center">
          <p className="heading-emboss font-display text-2xl text-cream md:text-4xl">
            &ldquo;{f["quote.text"]}&rdquo;
          </p>
          <cite className="mt-6 block text-xs text-tan/70 uppercase not-italic">
            {f["quote.cite"]}
          </cite>
        </blockquote>
      </section>

      {/* ── Framed Gallery ── */}
      <section data-wipe className="overflow-hidden bg-charcoal py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div data-animate="" className="mb-14 flex items-center gap-6">
            <span className="block h-px flex-1 bg-amber/25" />
            <span className="shrink-0 text-sm text-amber uppercase">{f["gallery.eyebrow"]}</span>
            <span className="block h-px flex-1 bg-amber/25" />
          </div>
          <div className="flex flex-wrap items-end justify-center gap-8 md:gap-12">
            {frames.map((frame) => (
              <TiltCard
                key={frame.src}
                data-animate=""
                data-delay={frame.delay}
                initialRotate={frame.rotate}
                className="frame-tilt drop-shadow-2xl"
                subtle
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  width={frame.w}
                  height={frame.h}
                  sizes="(min-width: 768px) 288px, 208px"
                  className="h-52 w-auto object-contain md:h-72"
                />
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Infinite Carousel ── */}
      <InfiniteCarousel images={carouselImages} eyebrow={f["carousel.eyebrow"]} />

      {/* ── Reservations ── */}
      <section
        id="reservations"
        data-wipe
        className="relative flex items-center justify-center overflow-hidden bg-charcoal py-32 md:py-48"
      >
        {/* Ambient glow blob — centred radial */}
        <div
          aria-hidden="true"
          className="glow-oxblood pointer-events-none absolute inset-0 opacity-[0.08]"
        />
        <div className="relative z-10 text-center">
          <div data-animate="" className="flex items-center justify-center gap-6">
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
            <span className="text-sm text-amber uppercase">{f["reservations.eyebrow"]}</span>
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
          </div>
          <h2
            data-animate=""
            data-delay="130"
            className="heading-emboss mt-4 font-display text-5xl text-cream md:text-8xl"
          >
            {f["reservations.heading.1"]}
            <br />
            <span className="text-tan italic">{f["reservations.heading.2"]}</span>
          </h2>
          <p data-animate="" data-delay="285" className="mx-auto mt-8 max-w-md text-lg text-tan">
            {f["reservations.body"]}
          </p>

          <SectionDivider className="my-4" />

          <span data-animate="" data-delay="470" className="mt-4 inline-block">
            <Link
              href={reservationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-amber px-12 py-5 text-xs font-medium text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)]"
            >
              {f["reservations.buttonLabel"]}
            </Link>
          </span>
        </div>
      </section>

      <RestaurantGroupSection />
    </>
  )
}
