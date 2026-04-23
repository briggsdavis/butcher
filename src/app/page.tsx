import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { RestaurantGroupSection } from "~/components/restaurant-group-section"


const COCKTAILS = [
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

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex h-screen items-end justify-center overflow-hidden bg-oxblood">
        {/* Extended top/bottom (30% total) absorbs the parallax offset gap */}
        <div
          data-parallax="hero-bg"
          data-parallax-speed="0.15"
          className="absolute inset-x-0"
          style={{ top: "-15%", bottom: "-15%" }}
        >
          <Image
            src="/warm-dining-room.jpg"
            alt="Butcher and the Rye dining room"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-transparent" />
        <div className="relative z-10 max-w-3xl px-8 pb-24 text-center md:px-16">
          {/* 20% smaller than previous text-7xl / text-9xl */}
          <h1
            className="font-display leading-none tracking-tight text-cream"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.4rem)",
              animation: "fadeInUp 1s ease 0.15s both",
            }}
          >
            Butcher
            <br />
            <span className="text-amber italic">&</span> the Rye
          </h1>
          <p
            className="mt-6 max-w-md text-lg leading-relaxed text-tan"
            style={{ animation: "fadeInUp 1s ease 0.4s both" }}
          >
            A storied table where craft meets tradition. Fine cuts, rare
            spirits, and the kind of evening you remember.
          </p>
          <Link
            href="#reservations"
            className="mt-10 inline-block border border-cream/30 px-10 py-4 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
            style={{ animation: "fadeInUp 1s ease 0.65s both" }}
          >
            Reserve a Table
          </Link>
        </div>
      </section>

      {/* ── About ── */}
      <section
        data-wipe
        className="relative overflow-hidden bg-charcoal py-32 md:py-48"
      >
        <div
          data-parallax="content"
          data-parallax-speed="0.06"
          className="mx-auto grid max-w-7xl items-center gap-16 px-8 md:grid-cols-2 md:px-16"
        >
          {/* Left: all copy */}
          <div className="flex flex-col justify-center">
            <div data-animate="" className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                Our Story
              </span>
            </div>
            <h2
              data-animate=""
              data-delay="130"
              className="mt-4 font-display text-5xl leading-tight text-cream md:text-7xl"
            >
              Where every
              <br />
              glass has a<br />
              <span className="text-tan italic">history</span>
            </h2>
            <p
              data-animate=""
              data-delay="260"
              className="mt-8 text-lg leading-relaxed text-tan"
            >
              Butcher and the Rye was born from a reverence for the craft: the
              slow char of a barrel, the patience of a dry-aged cut, the
              conversation that only happens around a well-set table.
            </p>
            <p
              data-animate=""
              data-delay="390"
              className="mt-6 text-lg leading-relaxed text-tan"
            >
              We are a place for those who understand that a great evening is
              not rushed. It is savored, one pour at a time.
            </p>
            <Link
              href="/about"
              data-animate=""
              data-delay="520"
              className="mt-10 inline-flex items-center gap-3 text-sm leading-none tracking-[0.2em] text-amber uppercase transition-colors hover:text-cream"
            >
              Read more
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Right: image collage — each element staggered */}
          <div className="relative mt-8 md:mt-0">
            {/* Primary image */}
            <div
              data-animate=""
              data-delay="195"
              className="relative h-[26rem] overflow-hidden"
            >
              <Image
                src="/barmood.jpg"
                alt="The bar at Butcher and the Rye"
                fill
                className="object-cover"
              />
            </div>
            {/* Secondary overlapping image */}
            <div
              data-animate=""
              data-delay="365"
              className="absolute -bottom-8 -right-6 z-10 h-44 w-32 overflow-hidden border-4 border-charcoal shadow-2xl md:-right-10 md:h-52 md:w-40"
            >
              <Image
                src="/glow-frame.png"
                alt="Bar glow"
                fill
                className="object-cover"
              />
            </div>
            {/* Spinning text ring */}
            <div
              data-animate=""
              data-delay="495"
              className="absolute -bottom-14 left-0 z-10 h-28 w-28 text-amber/20 md:h-32 md:w-32"
              style={{ animation: "spin 20s linear infinite" }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <path
                  id="aboutRing"
                  d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  fill="none"
                />
                <text fontSize="8.5" fill="currentColor" letterSpacing="3.2">
                  <textPath href="#aboutRing">
                    BUTCHER &amp; THE RYE · EST 2013 ·
                  </textPath>
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
            {/* Col 1: heading + left image */}
            <div className="flex flex-col gap-10">
              <div>
                <div data-animate="" className="flex items-center gap-4">
                  <span className="block h-px w-10 shrink-0 bg-amber/50" />
                  <span className="text-xs tracking-[0.3em] text-amber uppercase">
                    From the Kitchen
                  </span>
                </div>
                <h2
                  data-animate=""
                  data-delay="130"
                  className="mt-4 font-display text-5xl leading-tight text-cream md:text-7xl"
                >
                  The menu
                </h2>
              </div>
              <div
                data-animate=""
                data-delay="220"
                className="relative aspect-[5/4] w-full overflow-hidden"
              >
                <Image
                  src="/meat-board.jpg"
                  alt="Meat Board"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Col 2: tall center image */}
            <div
              data-animate=""
              data-delay="340"
              className="relative aspect-[3/4] w-full overflow-hidden"
            >
              <Image
                src="/plated-entree.jpg"
                alt="Signature plated dish"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Col 3: right image offset down */}
            <div
              data-animate=""
              data-delay="460"
              className="relative aspect-[5/4] w-full overflow-hidden lg:mt-16"
            >
              <Image
                src="/steak.jpg"
                alt="Steak"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t border-cream/10 pt-10">
            <div className="flex items-end justify-between gap-8">
              <div data-animate="" data-delay="560">
                <p className="max-w-xs text-sm leading-relaxed text-tan">
                  Sourced from heritage farms and shaped by old-world
                  technique. Every plate is a reflection of place, season,
                  and craft.
                </p>
              </div>
              <Link
                href="/food"
                data-animate=""
                data-delay="640"
                className="shrink-0 border border-cream/30 px-10 py-4 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
              >
                Full Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cocktails & Spirits ── */}
      <section data-wipe className="relative bg-charcoal py-32 md:py-48">
        <div className="mx-auto grid max-w-7xl gap-16 px-8 md:grid-cols-2 md:px-16">
          <div data-animate="">
            <div className="-rotate-2 self-center bg-cream p-4 pb-0 shadow-2xl md:p-6 md:pb-0">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/craft-old-fashioned.jpg"
                  alt="Craft cocktail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex h-16 items-center justify-center md:h-24">
                <p className="font-cursive text-2xl text-charcoal md:text-3xl">
                  The Old Fashioned
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div data-animate="" className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                Cocktails & Spirits
              </span>
            </div>
            <h2
              data-animate=""
              data-delay="130"
              className="mt-4 font-display text-5xl leading-tight text-cream md:text-7xl"
            >
              Crafted,
              <br />
              never <span className="text-tan italic">mixed</span>
            </h2>
            <div className="mt-16 space-y-10">
              {COCKTAILS.map((drink, i) => (
                <div
                  key={drink.name}
                  data-animate=""
                  data-delay={String(260 + i * 130)}
                >
                  <h3 className="font-display text-2xl text-cream">
                    {drink.name}
                  </h3>
                  <p className="mt-2 text-tan">{drink.description}</p>
                </div>
              ))}
            </div>
            <div data-animate="" data-delay="715" className="mt-16 flex gap-6">
              <Link
                href="/beverages"
                className="border border-cream/30 px-8 py-4 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
              >
                Beverages
              </Link>
              <Link
                href="/spirits"
                className="border border-amber px-8 py-4 text-xs tracking-[0.3em] text-amber uppercase transition-colors hover:bg-amber hover:text-charcoal"
              >
                Spirits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section data-wipe className="bg-oxblood/80 py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div data-animate="" className="flex items-center gap-6">
            <span className="block h-px flex-1 bg-amber/25" />
            <span className="shrink-0 text-xs tracking-[0.3em] text-amber uppercase">
              The Atmosphere
            </span>
            <span className="block h-px flex-1 bg-amber/25" />
          </div>
          <h2
            data-animate=""
            data-delay="130"
            className="mt-4 text-center font-display text-5xl text-cream md:text-7xl"
          >
            A glimpse <span className="text-tan italic">inside</span>
          </h2>
          <div className="mt-20 space-y-3 md:space-y-4">
            {/* Row 1: 3 images — individually staggered */}
            <div className="flex gap-3 md:gap-4">
              <div
                data-animate=""
                data-delay="130"
                className="relative h-72 flex-1 overflow-hidden md:h-96"
              >
                <Image
                  src="/barmood.jpg"
                  alt="Bar atmosphere"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                data-animate=""
                data-delay="285"
                className="relative h-72 flex-[1.5] overflow-hidden md:h-96"
              >
                <Image
                  src="/bar-brass-glow.jpg"
                  alt="Bar glow"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                data-animate=""
                data-delay="440"
                className="relative h-72 flex-1 overflow-hidden md:h-96"
              >
                <Image
                  src="/barvibe.jpg"
                  alt="Bar vibe"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Row 2: 2 images — individually staggered */}
            <div className="flex gap-3 md:gap-4">
              <div
                data-animate=""
                data-delay="365"
                className="relative h-52 flex-[1.4] overflow-hidden md:h-64"
              >
                <Image
                  src="/bardecor.jpg"
                  alt="Bar decor"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                data-animate=""
                data-delay="520"
                className="relative h-52 flex-1 overflow-hidden md:h-64"
              >
                <Image
                  src="/whiskey-pour.jpg"
                  alt="Whiskey pour"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery (original) ── */}
      {/*
      <section data-wipe className="bg-charcoal py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="mt-4 space-y-8">
            <div className="flex flex-wrap items-end justify-center gap-8">
              {[
                { src: "/entree-frame.png", alt: "Plated dish", w: 1652, h: 1924, delay: "130" },
                { src: "/glow-frame.png", alt: "The bar", w: 1803, h: 2003, delay: "285" },
                { src: "/whiskey-frame.png", alt: "Whiskey pour", w: 1579, h: 1996, delay: "440" },
              ].map((photo) => (
                <div key={photo.src} data-animate="" data-delay={photo.delay}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.w}
                    height={photo.h}
                    className="h-56 w-auto object-contain md:h-80"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-end justify-center gap-8">
              {[
                { src: "/bartender-frame.png", alt: "Bartender", w: 1208, h: 1662, delay: "365" },
                { src: "/tables-frame.png", alt: "Dining room", w: 2168, h: 1922, delay: "520" },
              ].map((photo) => (
                <div key={photo.src} data-animate="" data-delay={photo.delay}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.w}
                    height={photo.h}
                    className="h-56 w-auto object-contain md:h-80"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      */}

      {/* ── Reservations ── */}
      <section
        id="reservations"
        data-wipe
        className="relative flex items-center justify-center bg-charcoal py-32 md:py-48"
      >
        <div
          data-parallax="content"
          data-parallax-speed="0.1"
          className="absolute inset-0 opacity-20"
        >
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--color-oxblood)_0%,_transparent_70%)]" />
        </div>
        <div className="relative z-10 text-center">
          <div
            data-animate=""
            className="flex items-center justify-center gap-6"
          >
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              Join Us
            </span>
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
          </div>
          <h2
            data-animate=""
            data-delay="130"
            className="mt-4 font-display text-5xl leading-tight text-cream md:text-8xl"
          >
            Reserve your
            <br />
            <span className="text-tan italic">evening</span>
          </h2>
          <p
            data-animate=""
            data-delay="285"
            className="mx-auto mt-8 max-w-md text-lg text-tan"
          >
            Whether it's a quiet dinner for two or a gathering worth
            remembering, we'll set the table.
          </p>
          <Link
            href="#"
            data-animate=""
            data-delay="470"
            className="mt-12 inline-block bg-amber px-12 py-5 text-xs font-medium tracking-[0.3em] text-charcoal uppercase transition-colors hover:bg-cream"
          >
            Book a Table
          </Link>
        </div>
      </section>

      <RestaurantGroupSection />
    </>
  )
}
