import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { HeroCarousel } from "~/components/hero-carousel"
import { InfiniteCarousel } from "~/components/infinite-carousel"
import { RestaurantGroupSection } from "~/components/restaurant-group-section"
import { SectionDivider } from "~/components/section-divider"
import { TiltCard } from "~/components/tilt-card"

const HOME_HERO_IMAGES = [
  { src: "/warm-dining-room.jpg", alt: "Butcher and the Rye dining room" },
  { src: "/hero1.jpg", alt: "Butcher and the Rye" },
  { src: "/hero2.jpg", alt: "Butcher and the Rye" },
]

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

const FRAMES = [
  { src: "/entree-frame.png", alt: "Plated dish",  w: 1652, h: 1924, rotate: -2.5, delay: "130" },
  { src: "/glow-frame.png",   alt: "The bar",      w: 1803, h: 2003, rotate:  1.5, delay: "285" },
  { src: "/whiskey-frame.png",alt: "Whiskey pour", w: 1579, h: 1996, rotate: -1.0, delay: "440" },
  { src: "/bartender-frame.png", alt: "Bartender", w: 1208, h: 1662, rotate:  2.5, delay: "365" },
]

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero-section relative flex h-screen items-end justify-center overflow-hidden bg-oxblood">
        <HeroCarousel images={HOME_HERO_IMAGES} firstImageAngle />
        {/* Top vignette — darkens top half for atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/10 to-transparent" />
        {/* Bottom gradient — fades into the next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-transparent" />
        {/* Wood grain — on top of gradients, invisible top 70%, fades in bottom 30% */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url(/wood.jpg)",
            backgroundSize: "700px",
            backgroundRepeat: "repeat",
            opacity: 0.1,
            maskImage: "linear-gradient(to bottom, transparent 70%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 70%, black 100%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center px-8 pb-24 text-center md:px-16">
          <h1
            className="heading-emboss font-display leading-none tracking-tight text-cream"
            style={{
              fontSize: "clamp(2.5rem, 6.25vw, 3.75rem)",
              animation: "fadeInUp 1s ease 0.15s both",
            }}
          >
            Butcher <span className="text-amber italic">&</span> the Rye
          </h1>
          <Link
            href="#reservations"
            className="mt-10 inline-block border border-cream/30 px-10 py-4 text-xs tracking-[0.3em] text-cream uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-amber hover:text-amber hover:shadow-[0_4px_24px_rgba(213,137,54,0.18)]"
            style={{ animation: "fadeInUp 1s ease 0.4s both" }}
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
        {/* Ambient glow blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, var(--color-amber), transparent 70%)" }}
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
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                Our Story
              </span>
            </div>
            <h2
              data-animate=""
              data-delay="130"
              className="heading-emboss mt-4 font-display text-5xl leading-tight text-cream md:text-7xl"
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
              className="group mt-10 inline-flex items-center gap-3 text-sm leading-none tracking-[0.2em] text-amber uppercase transition-colors duration-500 hover:text-cream"
            >
              Read more
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </Link>
          </div>

          {/* Right: tilted image collage */}
          <div className="relative mt-8 md:mt-0">
            <div
              data-animate=""
              data-delay="195"
              className="img-inset-shadow relative h-[26rem] overflow-hidden shadow-2xl"
              style={{ transform: "rotate(-1.2deg)" }}
            >
              <Image
                src="/barmood.jpg"
                alt="The bar at Butcher and the Rye"
                fill
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
                  src="/glow-frame.png"
                  alt="Bar glow"
                  fill
                  className="object-cover"
                />
              </div>
            </TiltCard>
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
                  className="heading-emboss mt-4 font-display text-5xl leading-tight text-cream md:text-7xl"
                >
                  The menu
                </h2>
              </div>
              <div
                data-animate=""
                data-delay="220"
                className="img-inset-shadow relative aspect-[5/4] w-full overflow-hidden shadow-xl"
              >
                <Image
                  src="/meat-board.jpg"
                  alt="Meat Board"
                  fill
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
                src="/plated-entree.jpg"
                alt="Signature plated dish"
                fill
                className="img-zoom object-cover"
              />
            </div>

            <div
              data-animate=""
              data-delay="460"
              className="img-inset-shadow relative aspect-[5/4] w-full overflow-hidden shadow-xl lg:mt-16"
            >
              <Image
                src="/steak.jpg"
                alt="Steak"
                fill
                className="img-zoom object-cover"
              />
            </div>
          </div>

          <SectionDivider className="mt-6" />

          <div className="border-t border-cream/10 pt-4">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
              <div data-animate="" data-delay="560">
                <p className="max-w-xs text-sm leading-relaxed text-tan">
                  Sourced from heritage farms and shaped by old-world technique.
                  Every plate is a reflection of place, season, and craft.
                </p>
              </div>
              <Link
                href="/food"
                data-animate=""
                data-delay="640"
                className="shrink-0 border border-cream/30 px-10 py-4 text-xs tracking-[0.3em] text-cream uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-amber hover:text-amber hover:shadow-[0_4px_24px_rgba(213,137,54,0.15)]"
              >
                Full Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cocktails & Spirits ── */}
      <section data-wipe className="relative overflow-hidden bg-charcoal py-32 md:py-48">
        {/* Ambient glow blob — lower-left, warm */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-32 h-[550px] w-[550px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, var(--color-amber), transparent 68%)" }}
        />
        <div className="mx-auto grid max-w-7xl gap-16 px-8 md:grid-cols-2 md:px-16">
          <div data-animate="">
            <TiltCard
              initialRotate={-2}
              maxTilt={7}
              className="self-center bg-cream p-4 pb-0 shadow-2xl md:p-6 md:pb-0"
            >
              <div className="img-inset-shadow relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/craft-old-fashioned.jpg"
                  alt="Craft cocktail"
                  fill
                  className="img-zoom object-cover"
                />
              </div>
              <div className="flex h-16 items-center justify-center md:h-24">
                <p className="font-cursive text-2xl text-charcoal md:text-3xl">
                  The Old Fashioned
                </p>
              </div>
            </TiltCard>
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
              className="heading-emboss mt-4 font-display text-5xl leading-tight text-cream md:text-7xl"
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

            <SectionDivider className="my-4" />

            <div data-animate="" data-delay="715" className="flex gap-6">
              <Link
                href="/beverages"
                className="border border-cream/30 px-8 py-4 text-xs tracking-[0.3em] text-cream uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-amber hover:text-amber hover:shadow-[0_4px_24px_rgba(213,137,54,0.15)]"
              >
                Beverages
              </Link>
              <Link
                href="/spirits"
                className="border border-amber px-8 py-4 text-xs tracking-[0.3em] text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:bg-amber hover:text-charcoal hover:shadow-[0_4px_24px_rgba(213,137,54,0.3)]"
              >
                Spirits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Parallax Banner ── */}
      <section
        data-wipe
        className="relative flex h-[50vh] min-h-80 items-center justify-center overflow-hidden"
      >
        <div
          data-parallax="content"
          data-parallax-speed="0.2"
          className="absolute inset-x-0"
          style={{ top: "-20%", bottom: "-20%" }}
        >
          <Image
            src="/parallax-wide.jpg"
            alt="Butcher and the Rye"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-charcoal/65" />
        <blockquote
          data-animate=""
          className="relative z-10 max-w-2xl px-8 text-center"
        >
          <p className="heading-emboss font-display text-2xl leading-snug text-cream md:text-4xl">
            &ldquo;The best meals are the ones you{" "}
            <span className="text-amber italic">never forget.</span>&rdquo;
          </p>
          <cite className="mt-6 block text-xs tracking-[0.3em] text-tan/70 uppercase not-italic">
            Butcher &amp; the Rye · Est. 2013
          </cite>
        </blockquote>
      </section>

      {/* ── Framed Gallery ── */}
      <section
        data-wipe
        className="overflow-hidden bg-charcoal py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div data-animate="" className="mb-14 flex items-center gap-6">
            <span className="block h-px flex-1 bg-amber/25" />
            <span className="shrink-0 text-xs tracking-[0.3em] text-amber uppercase">
              On the Wall
            </span>
            <span className="block h-px flex-1 bg-amber/25" />
          </div>
          <div className="flex flex-wrap items-end justify-center gap-8 md:gap-12">
            {FRAMES.map((frame) => (
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
                  className="h-52 w-auto object-contain md:h-72"
                />
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section data-wipe className="relative overflow-hidden bg-oxblood/80 py-32 md:py-48">
        {/* Ambient glow blob — upper centre */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, var(--color-amber), transparent 70%)" }}
        />
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
            className="heading-emboss mt-4 text-center font-display text-5xl text-cream md:text-7xl"
          >
            A glimpse <span className="text-tan italic">inside</span>
          </h2>
          <div className="mt-20 space-y-3 md:space-y-4">
            {/* Row 1 */}
            <div className="flex gap-3 md:gap-4">
              <div
                data-animate=""
                data-delay="130"
                className="img-inset-shadow group relative h-72 flex-1 overflow-hidden shadow-xl md:h-96"
                style={{ transform: "rotate(0.4deg)" }}
              >
                <Image src="/decor13.jpg" alt="Bar atmosphere" fill className="img-zoom object-cover" />
              </div>
              <div
                data-animate=""
                data-delay="285"
                className="img-inset-shadow group relative h-72 flex-[1.5] overflow-hidden shadow-xl md:h-96"
                style={{ transform: "rotate(-0.3deg)" }}
              >
                <Image src="/bar-brass-glow.jpg" alt="Bar glow" fill className="img-zoom object-cover" />
              </div>
              <div
                data-animate=""
                data-delay="440"
                className="img-inset-shadow group relative h-72 flex-1 overflow-hidden shadow-xl md:h-96"
                style={{ transform: "rotate(0.6deg)" }}
              >
                <Image src="/barvibe.jpg" alt="Bar vibe" fill className="img-zoom object-cover" />
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex gap-3 md:gap-4">
              <div
                data-animate=""
                data-delay="365"
                className="img-inset-shadow group relative h-52 flex-[1.4] overflow-hidden shadow-xl md:h-64"
                style={{ transform: "rotate(-0.5deg)" }}
              >
                <Image src="/bardecor.jpg" alt="Bar decor" fill className="img-zoom object-cover" />
              </div>
              <div
                data-animate=""
                data-delay="450"
                className="img-inset-shadow group relative h-52 flex-1 overflow-hidden shadow-xl md:h-64"
                style={{ transform: "rotate(0.3deg)" }}
              >
                <Image src="/bartender-at-work.jpg" alt="Bartender" fill className="img-zoom object-cover" />
              </div>
              <div
                data-animate=""
                data-delay="520"
                className="img-inset-shadow group relative h-52 flex-1 overflow-hidden shadow-xl md:h-64"
                style={{ transform: "rotate(-0.4deg)" }}
              >
                <Image src="/whiskey-pour.jpg" alt="Whiskey pour" fill className="img-zoom object-cover" />
              </div>
            </div>
            {/* Row 3 */}
            <div className="flex gap-3 md:gap-4">
              <div
                data-animate=""
                data-delay="580"
                className="img-inset-shadow group relative h-52 flex-1 overflow-hidden shadow-xl md:h-72"
                style={{ transform: "rotate(0.5deg)" }}
              >
                <Image src="/candlelit-tables.jpg" alt="Candlelit tables" fill className="img-zoom object-cover" />
              </div>
              <div
                data-animate=""
                data-delay="660"
                className="img-inset-shadow group relative h-52 flex-[1.6] overflow-hidden shadow-xl md:h-72"
                style={{ transform: "rotate(-0.3deg)" }}
              >
                <Image src="/cocktail-splash.jpg" alt="Cocktail" fill className="img-zoom object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Infinite Carousel ── */}
      <InfiniteCarousel />

      {/* ── Reservations ── */}
      <section
        id="reservations"
        data-wipe
        className="relative flex items-center justify-center overflow-hidden bg-charcoal py-32 md:py-48"
      >
        {/* Ambient glow blob — centred radial */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ background: "radial-gradient(ellipse at center, var(--color-oxblood), transparent 65%)" }}
        />
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
            className="heading-emboss mt-4 font-display text-5xl leading-tight text-cream md:text-8xl"
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

          <SectionDivider className="my-4" />

          <Link
            href="#"
            data-animate=""
            data-delay="470"
            className="mt-4 inline-block bg-amber px-12 py-5 text-xs font-medium tracking-[0.3em] text-charcoal uppercase transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#e09b4a] hover:shadow-[0_8px_40px_rgba(213,137,54,0.55)]"
          >
            Book a Table
          </Link>
        </div>
      </section>

      <RestaurantGroupSection />
    </>
  )
}
