import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { RestaurantGroupSection } from "~/components/restaurant-group-section"

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, values, team, and ingredients behind Butcher and the Rye, Pittsburgh's destination for craft cuisine and rare spirits.",
}

const FEATURED_STAFF = [
  { name: "Marcus Chen", role: "Executive Chef", initials: "MC", img: "/food/bone-in-ribeye.jpg" },
  { name: "Sophia Reeves", role: "Bar Director", initials: "SR", img: "/craft-old-fashioned.jpg" },
  { name: "James O'Brien", role: "Head Butcher", initials: "JO", img: "/food/bone-marrow.jpg" },
  { name: "Amara Washington", role: "General Manager", initials: "AW", img: "/candlelit-tables.jpg" },
]

export default function About() {
  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="relative flex h-screen items-end overflow-hidden bg-oxblood">
        <div
          data-parallax="hero-bg"
          data-parallax-speed="0.15"
          className="absolute inset-x-0"
          style={{ top: "-15%", bottom: "-15%" }}
        >
          <Image
            src="/about-background.jpg"
            alt="Butcher and the Rye dining room"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-24 md:px-16">
          <p
            className="mb-5 text-xs tracking-[0.3em] text-amber uppercase"
            style={{ animation: "fadeInUp 1s ease 0.15s both" }}
          >
            Pittsburgh, PA · Est. 2013
          </p>
          <h1
            className="font-display leading-none tracking-tight text-cream"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.4rem)",
              animation: "fadeInUp 1s ease 0.35s both",
            }}
          >
            Where Craft
            <br />
            <span className="text-amber italic">Meets</span> Tradition
          </h1>
          <p
            className="mt-6 max-w-md text-lg leading-relaxed text-tan"
            style={{ animation: "fadeInUp 1s ease 0.6s both" }}
          >
            A storied table in Pittsburgh&rsquo;s Penn Avenue corridor, built on
            the belief that extraordinary evenings begin with extraordinary
            people and uncompromising craft.
          </p>
        </div>
      </section>

      {/* ── 2. THE STORY ── */}
      <section
        data-wipe
        className="relative overflow-hidden bg-charcoal py-32 md:py-48"
      >
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid items-start gap-20 md:grid-cols-[1.2fr_1fr] md:gap-16">
            {/* Left: copy */}
            <div>
              <div data-animate="" className="flex items-center gap-4">
                <span className="block h-px w-10 shrink-0 bg-amber/50" />
                <span className="text-xs tracking-[0.3em] text-amber uppercase">
                  Our Story
                </span>
              </div>
              <h2
                data-animate=""
                data-delay="130"
                className="mt-4 font-display text-5xl leading-tight text-cream md:text-6xl"
              >
                Born from
                <br />a reverence
                <br />
                <span className="text-tan italic">for craft</span>
              </h2>
              <p
                data-animate=""
                data-delay="285"
                className="mt-10 text-lg leading-relaxed text-tan"
              >
                Butcher and the Rye opened on Penn Avenue in 2013 with a single
                conviction: Pittsburgh deserved a restaurant that honored the
                full depth of American culinary tradition: the slow char of a
                barrel-aged bourbon, the patience of a 45-day dry-aged cut, and
                the art of a dining room that feels like home.
              </p>
              <p
                data-animate=""
                data-delay="440"
                className="mt-6 text-lg leading-relaxed text-tan"
              >
                Every choice made here, from the beef we source to the glass we
                pour, is deliberate. We are not chasing trends. We are building
                something that lasts.
              </p>
              <blockquote
                data-animate=""
                data-delay="600"
                className="mt-10 border-l-2 border-amber/30 pl-6"
              >
                <p className="font-cursive text-2xl leading-relaxed text-cream/70">
                  &ldquo;The kind of place you come back to not just for the
                  food, but for how it makes you feel.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Right: overlapping image collage */}
            <div className="relative mt-8 md:mt-16">
              <div
                data-animate=""
                data-delay="155"
                className="relative h-80 overflow-hidden md:h-96"
              >
                <Image
                  src="/candlelit-tables.jpg"
                  alt="Candlelit dining at Butcher and the Rye"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                data-animate=""
                data-delay="340"
                className="absolute -bottom-10 -left-6 z-10 h-44 w-32 overflow-hidden shadow-2xl md:-left-10 md:h-52 md:w-40"
              >
                <Image
                  src="/entree-frame.png"
                  alt="A plated entrée"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                data-animate=""
                data-delay="495"
                className="absolute right-0 -bottom-14 z-10 h-28 w-28 text-amber/30 md:h-32 md:w-32"
                style={{ animation: "spin 20s linear infinite" }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <path
                    id="storyRing"
                    d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text fontSize="8.5" fill="currentColor" letterSpacing="3.2">
                    <textPath href="#storyRing">
                      BUTCHER &amp; THE RYE · EST 2013 ·
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. OUR VALUES ── */}
      <section
        data-wipe
        className="relative overflow-hidden bg-oxblood py-32 md:py-48"
      >
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div data-animate="" className="mb-20 flex items-center gap-4">
            <span className="block h-px w-10 shrink-0 bg-amber/50" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              Our Values
            </span>
          </div>

          {/* Value 1: Excellence */}
          <div className="mb-16 border-t border-cream/10 pt-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_0.75fr] md:gap-16">
              <div className="relative">
                <div
                  className="pointer-events-none absolute right-0 bottom-0 font-display leading-none text-cream/[0.04] select-none"
                  style={{ fontSize: "clamp(7rem, 14vw, 14rem)" }}
                  aria-hidden="true"
                >
                  01
                </div>
                <div className="relative z-10">
                  <h3
                    data-animate=""
                    data-delay="0"
                    className="font-display text-6xl text-cream md:text-7xl"
                  >
                    Excellence
                  </h3>
                  <p
                    data-animate=""
                    data-delay="130"
                    className="mt-6 text-lg leading-relaxed text-tan"
                  >
                    We hold every plate and every pour to the same exacting
                    standard. No table is less important than another. No dish
                    leaves our kitchen without meeting the mark. Excellence
                    isn&rsquo;t an aspiration here. It&rsquo;s the minimum.
                  </p>
                </div>
              </div>
              <div
                data-animate=""
                data-delay="260"
                className="relative h-64 overflow-hidden md:h-80"
              >
                <Image
                  src="/barmood1.jpg"
                  alt="Excellence at Butcher and the Rye"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Value 2: Craft */}
          <div className="mb-16 border-t border-cream/10 pt-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_0.75fr] md:gap-16">
              <div className="relative">
                <div
                  className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 font-display leading-none text-cream/[0.04] select-none"
                  style={{ fontSize: "clamp(7rem, 14vw, 14rem)" }}
                  aria-hidden="true"
                >
                  02
                </div>
                <div className="relative z-10">
                  <h3
                    data-animate=""
                    data-delay="0"
                    className="font-display text-6xl text-cream md:text-7xl"
                  >
                    Craft
                  </h3>
                  <p
                    data-animate=""
                    data-delay="130"
                    className="mt-6 text-lg leading-relaxed text-tan"
                  >
                    Every technique here is learned the slow way. Our chefs
                    apprenticed under demanding kitchens. Our bartenders spent
                    years studying whiskey before touching our bar. There are no
                    shortcuts, and we wouldn&rsquo;t have it any other way.
                  </p>
                </div>
              </div>
              <div
                data-animate=""
                data-delay="260"
                className="relative h-64 overflow-hidden md:h-80"
              >
                <Image
                  src="/bardecor1.jpg"
                  alt="Craft at Butcher and the Rye"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Value 3: Hospitality */}
          <div className="border-t border-cream/10 pt-12">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_0.75fr] md:gap-16">
              <div className="relative">
                <div
                  className="pointer-events-none absolute bottom-0 -left-4 font-display leading-none text-cream/[0.04] select-none"
                  style={{ fontSize: "clamp(7rem, 14vw, 14rem)" }}
                  aria-hidden="true"
                >
                  03
                </div>
                <div className="relative z-10">
                  <h3
                    data-animate=""
                    data-delay="0"
                    className="font-display text-6xl text-cream md:text-7xl"
                  >
                    Hospitality
                  </h3>
                  <p
                    data-animate=""
                    data-delay="130"
                    className="mt-6 text-lg leading-relaxed text-tan"
                  >
                    The meal is the occasion. The experience is the memory. We
                    study our guests: their preferences, their celebrations,
                    their habits. Hospitality at Butcher and the Rye means you
                    never have to ask twice.
                  </p>
                </div>
              </div>
              <div
                data-animate=""
                data-delay="260"
                className="relative h-64 overflow-hidden md:h-80"
              >
                <Image
                  src="/candlelit-tables.jpg"
                  alt="Hospitality at Butcher and the Rye"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FULL-WIDTH IMAGE BREAK ── */}
      <section
        data-wipe
        className="relative overflow-hidden bg-charcoal"
        style={{ minHeight: "80vh" }}
      >
        <div
          data-parallax="image-break"
          data-parallax-speed="0.1"
          className="absolute inset-x-0"
          style={{ top: "-10%", bottom: "-10%" }}
        >
          <Image
            src="/parallax-wide.jpg"
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
            Every evening is its own occasion.
          </p>
        </div>
      </section>

      {/* ── 5. THE TEAM ── */}
      <section
        data-wipe
        className="relative overflow-hidden bg-charcoal py-32 md:py-48"
      >
        <div
          data-parallax="content"
          data-parallax-speed="0.06"
          className="mx-auto max-w-7xl px-8 md:px-16"
        >
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            <div className="flex flex-col justify-center">
              <div data-animate="" className="flex items-center gap-4">
                <span className="block h-px w-10 shrink-0 bg-amber/50" />
                <span className="text-xs tracking-[0.3em] text-amber uppercase">
                  The People
                </span>
              </div>
              <h2
                data-animate=""
                data-delay="130"
                className="mt-4 font-display text-5xl leading-tight text-cream md:text-6xl"
              >
                The people
                <br />
                behind
                <br />
                <span className="text-tan italic">the craft</span>
              </h2>
              <p
                data-animate=""
                data-delay="285"
                className="mt-8 text-lg leading-relaxed text-tan"
              >
                Our team brings decades of combined experience from some of the
                country&rsquo;s finest kitchens, bars, and dining rooms. They
                are passionate, rigorously trained, and united by one shared
                devotion: excellence at every table, every night.
              </p>
              <Link
                href="/our-staff"
                data-animate=""
                data-delay="470"
                className="mt-10 inline-flex items-center gap-3 text-sm leading-none tracking-[0.2em] text-amber uppercase transition-colors hover:text-cream"
              >
                Meet the full team
                <ArrowRight className="size-4" />
              </Link>
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
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-charcoal/55" />
                    <span className="absolute inset-0 flex items-center justify-center font-display text-2xl text-amber/70 select-none">
                      {member.initials}
                    </span>
                    <div className="absolute inset-0 rounded-full ring-1 ring-amber/10 ring-inset" />
                  </div>
                  <p className="font-display text-xl text-cream">
                    {member.name}
                  </p>
                  <p className="mt-1 text-xs tracking-[0.2em] text-amber uppercase">
                    {member.role}
                  </p>
                </div>
              ))}
              <Link
                href="/our-staff"
                data-animate=""
                data-delay="520"
                className="col-span-2 mt-2 inline-flex items-center justify-end gap-2 text-xs tracking-[0.2em] text-amber/50 uppercase transition-colors hover:text-amber"
              >
                See all 8 <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PULL QUOTE ── */}
      <section
        data-wipe
        className="relative overflow-hidden bg-cream py-32 md:py-48"
      >
        <div
          data-parallax="content"
          data-parallax-speed="0.05"
          className="relative z-10 mx-auto max-w-5xl px-8 text-center md:px-16"
        >
          <p
            data-animate=""
            className="mb-8 text-xs tracking-[0.3em] text-amber uppercase"
          >
            Our Philosophy
          </p>
          <blockquote
            data-animate=""
            data-delay="130"
            className="font-display leading-tight text-oxblood"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            &ldquo;The pursuit of extraordinary starts with refusing to accept
            ordinary.&rdquo;
          </blockquote>
          <Link
            href="/our-staff"
            data-animate=""
            data-delay="365"
            className="mt-12 inline-flex items-center gap-3 text-sm leading-none tracking-[0.2em] text-amber uppercase transition-colors hover:text-oxblood"
          >
            Meet the team behind it
            <ArrowRight className="size-4" />
          </Link>
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
            Whether it&rsquo;s a quiet dinner for two or a gathering worth
            remembering, we&rsquo;ll set the table.
          </p>
          <Link
            href="#reservations"
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
