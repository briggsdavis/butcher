import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const FEATURED_STAFF = [
  { name: "Marcus Chen", role: "Executive Chef", initials: "MC" },
  { name: "Sophia Reeves", role: "Bar Director", initials: "SR" },
  { name: "James O'Brien", role: "Head Butcher", initials: "JO" },
  { name: "Amara Washington", role: "General Manager", initials: "AW" },
]

const SOURCING = [
  {
    label: "The Beef",
    copy: "Our steaks come exclusively from Heritage Farms of Pennsylvania, raised on open pasture without growth hormones. Every cut is hand-selected by our Head Butcher and dry-aged on-site for a minimum of 45 days.",
    source: "Heritage Farms, PA",
    delay: "0",
  },
  {
    label: "The Spirits",
    copy: "We maintain relationships with over 30 American distilleries — from well-known Kentucky bourbon houses to small-batch rye producers across the Northeast. Our Bar Director personally selects every bottle.",
    source: "30+ American Distilleries",
    delay: "150",
  },
  {
    label: "The Produce",
    copy: "Our kitchen sources seasonal vegetables and herbs from within 100 miles of Pittsburgh. We change our sides and starters with the season, letting what grows close to home dictate the direction of the menu.",
    source: "Within 100 Miles of Pittsburgh",
    delay: "300",
  },
]

export function AboutPage() {
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
            src="/warm-dining-room.jpg"
            alt="Butcher and the Rye dining room"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
        <div className="relative z-10 w-full max-w-7xl px-8 pb-24 md:px-16">
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
            <span className="italic text-amber">Meets</span> Tradition
          </h1>
          <p
            className="mt-6 max-w-md text-lg leading-relaxed text-tan"
            style={{ animation: "fadeInUp 1s ease 0.6s both" }}
          >
            A storied table in Pittsburgh&rsquo;s Penn Avenue corridor, built on the
            belief that extraordinary evenings begin with extraordinary people
            and uncompromising craft.
          </p>
        </div>
      </section>

      {/* ── 2. THE STORY ── */}
      {/*
       * Inspired by Screenshot 1: large headline left, overlapping image
       * collage right, rotating ring badge bottom-right of images.
       */}
      <section data-wipe className="relative overflow-hidden bg-charcoal py-32 md:py-48">
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
                data-delay="100"
                className="mt-4 font-display text-5xl leading-tight text-cream md:text-6xl"
              >
                Born from
                <br />a reverence
                <br />
                <span className="italic text-tan">for craft</span>
              </h2>
              <p
                data-animate=""
                data-delay="220"
                className="mt-10 text-lg leading-relaxed text-tan"
              >
                Butcher and the Rye opened on Penn Avenue in 2013 with a single
                conviction: Pittsburgh deserved a restaurant that honored the
                full depth of American culinary tradition — the slow char of a
                barrel-aged bourbon, the patience of a 45-day dry-aged cut, and
                the art of a dining room that feels like home.
              </p>
              <p
                data-animate=""
                data-delay="340"
                className="mt-6 text-lg leading-relaxed text-tan"
              >
                Every choice made here — from the beef we source to the glass we
                pour — is deliberate. We are not chasing trends. We are building
                something that lasts.
              </p>
              <blockquote
                data-animate=""
                data-delay="460"
                className="mt-10 border-l-2 border-amber/30 pl-6"
              >
                <p className="font-cursive text-2xl leading-relaxed text-cream/70">
                  &ldquo;The kind of place you come back to not just for the food,
                  but for how it makes you feel.&rdquo;
                </p>
              </blockquote>
            </div>

            {/* Right: overlapping image collage + rotating ring */}
            <div
              data-animate=""
              data-delay="80"
              className="relative mt-8 md:mt-16"
            >
              {/* Primary image */}
              <div className="relative h-80 overflow-hidden md:h-96">
                <Image
                  src="/candlelit-tables.jpg"
                  alt="Candlelit dining at Butcher and the Rye"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Secondary image — overlaps bottom-left of primary */}
              <div className="absolute -bottom-10 -left-6 z-10 h-44 w-32 overflow-hidden border-4 border-charcoal shadow-2xl md:-left-10 md:h-52 md:w-40">
                <Image
                  src="/plated-entree.jpg"
                  alt="A plated entrée"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Rotating text ring (Screenshot 1 inspired) */}
              <div
                className="absolute -bottom-14 right-0 z-10 h-28 w-28 text-amber/30 md:h-32 md:w-32"
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
      <section data-wipe className="relative overflow-hidden bg-oxblood py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div data-animate="" className="mb-20 flex items-center gap-4">
            <span className="block h-px w-10 shrink-0 bg-amber/50" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              Our Values
            </span>
          </div>

          {/* Value 1 — full width, 2-col split */}
          <div
            data-animate=""
            data-delay="0"
            className="relative mb-16 grid items-start gap-8 border-t border-cream/10 pt-12 md:grid-cols-2 md:gap-16"
          >
            <div
              className="pointer-events-none absolute -top-6 right-0 select-none font-display leading-none text-cream/[0.05]"
              style={{ fontSize: "clamp(7rem, 14vw, 14rem)" }}
              aria-hidden="true"
            >
              01
            </div>
            <h3 className="font-display text-6xl text-cream md:text-7xl">
              Excellence
            </h3>
            <p className="mt-2 text-lg leading-relaxed text-tan">
              We hold every plate and every pour to the same exacting standard.
              No table is less important than another. No dish leaves our kitchen
              without meeting the mark. Excellence isn&rsquo;t an aspiration here
              — it&rsquo;s the minimum.
            </p>
          </div>

          {/* Value 2 — offset right */}
          <div
            data-animate=""
            data-delay="150"
            className="relative mb-16 border-t border-cream/10 pt-12 md:ml-auto md:w-3/5"
          >
            <div
              className="pointer-events-none absolute -top-6 -left-8 select-none font-display leading-none text-cream/[0.05]"
              style={{ fontSize: "clamp(7rem, 14vw, 14rem)" }}
              aria-hidden="true"
            >
              02
            </div>
            <h3 className="font-display text-6xl text-cream md:text-7xl">
              Craft
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-tan">
              Every technique here is learned the slow way. Our chefs
              apprenticed under demanding kitchens. Our bartenders spent years
              studying whiskey before touching our bar. There are no shortcuts,
              and we wouldn&rsquo;t have it any other way.
            </p>
          </div>

          {/* Value 3 — offset left */}
          <div
            data-animate=""
            data-delay="300"
            className="relative border-t border-cream/10 pt-12 md:w-3/5"
          >
            <div
              className="pointer-events-none absolute -top-6 -right-4 select-none font-display leading-none text-cream/[0.05]"
              style={{ fontSize: "clamp(7rem, 14vw, 14rem)" }}
              aria-hidden="true"
            >
              03
            </div>
            <h3 className="font-display text-6xl text-cream md:text-7xl">
              Hospitality
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-tan">
              The meal is the occasion. The experience is the memory. We study
              our guests — their preferences, their celebrations, their habits.
              Hospitality at Butcher and the Rye means you never have to ask
              twice.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. FULL-WIDTH IMAGE BREAK ── */}
      <section
        data-wipe
        className="relative overflow-hidden"
        style={{ height: "65vh" }}
      >
        <div
          data-parallax="hero-bg"
          data-parallax-speed="0.1"
          className="absolute inset-x-0"
          style={{ top: "-10%", bottom: "-10%" }}
        >
          <Image
            src="/bartender-at-work.jpg"
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
      {/*
       * Right column uses circular portrait frames inspired by Screenshot 2's
       * "Our Bestsellers" product circle grid.
       */}
      <section data-wipe className="relative overflow-hidden bg-charcoal py-32 md:py-48">
        <div
          data-parallax="content"
          data-parallax-speed="0.06"
          className="mx-auto max-w-7xl px-8 md:px-16"
        >
          <div className="grid gap-16 md:grid-cols-2 md:gap-24">
            {/* Left: copy */}
            <div className="flex flex-col justify-center">
              <div data-animate="" className="flex items-center gap-4">
                <span className="block h-px w-10 shrink-0 bg-amber/50" />
                <span className="text-xs tracking-[0.3em] text-amber uppercase">
                  The People
                </span>
              </div>
              <h2
                data-animate=""
                data-delay="100"
                className="mt-4 font-display text-5xl leading-tight text-cream md:text-6xl"
              >
                The people
                <br />
                behind
                <br />
                <span className="italic text-tan">the craft</span>
              </h2>
              <p
                data-animate=""
                data-delay="220"
                className="mt-8 text-lg leading-relaxed text-tan"
              >
                Our team brings decades of combined experience from some of the
                country&rsquo;s finest kitchens, bars, and dining rooms. They are
                passionate, rigorously trained, and united by one shared
                devotion: excellence at every table, every night.
              </p>
              <Link
                href="/our-staff"
                data-animate=""
                data-delay="360"
                className="mt-10 inline-flex items-center gap-3 text-sm leading-none tracking-[0.2em] text-amber uppercase transition-colors hover:text-cream"
              >
                Meet the full team
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Right: circular staff portrait grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:pl-8">
              {FEATURED_STAFF.map((member, i) => (
                <div
                  key={member.name}
                  data-animate=""
                  data-delay={String(i * 90)}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-amber/20 bg-gradient-to-br from-oxblood via-[#2a1015] to-charcoal">
                    <span className="select-none font-display text-2xl text-amber/50">
                      {member.initials}
                    </span>
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-amber/10" />
                  </div>
                  <p className="font-display text-xl text-cream">{member.name}</p>
                  <p className="mt-1 text-[10px] tracking-[0.2em] text-amber uppercase">
                    {member.role}
                  </p>
                </div>
              ))}
              <Link
                href="/our-staff"
                data-animate=""
                data-delay="400"
                className="col-span-2 mt-2 inline-flex items-center justify-end gap-2 text-xs tracking-[0.2em] text-amber/50 uppercase transition-colors hover:text-amber"
              >
                See all 8 <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. MENU HIGHLIGHTS ── */}
      <section data-wipe className="relative overflow-hidden bg-oxblood py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="mb-20 max-w-xl">
            <div data-animate="" className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                On the Table
              </span>
            </div>
            <h2
              data-animate=""
              data-delay="100"
              className="mt-4 font-display text-5xl leading-tight text-cream md:text-7xl"
            >
              The menu
            </h2>
          </div>

          {/* Feature item — Bone-In Ribeye */}
          <div
            data-animate=""
            data-delay="0"
            className="grid items-stretch border-t border-cream/10 md:grid-cols-[1.6fr_1fr]"
          >
            <div className="py-12 md:pr-16">
              <p className="mb-4 text-xs tracking-[0.3em] text-amber/60 uppercase">
                Signature
              </p>
              <h3 className="mb-5 font-display text-5xl text-cream md:text-6xl">
                Bone-In Ribeye
              </h3>
              <p className="max-w-sm text-lg leading-relaxed text-tan">
                Dry-aged 45 days, served with roasted marrow butter and
                hand-cut truffle fries.
              </p>
              <p className="mt-6 font-display text-3xl text-amber">$68</p>
            </div>
            <div className="relative min-h-[260px] overflow-hidden">
              <Image
                src="/food/bone-in-ribeye.jpg"
                alt="Bone-In Ribeye"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Two smaller items */}
          <div className="grid border-t border-cream/10 md:grid-cols-2">
            <div
              data-animate=""
              data-delay="150"
              className="border-b border-cream/10 py-10 md:border-b-0 md:border-r md:pr-16"
            >
              <p className="mb-3 text-xs tracking-[0.3em] text-amber/60 uppercase">
                Dessert
              </p>
              <h3 className="mb-3 font-display text-3xl text-cream">
                Bourbon Crème Brûlée
              </h3>
              <p className="leading-relaxed text-tan">
                Housemade vanilla custard, Jefferson&rsquo;s Reserve, torched to order.
              </p>
              <p className="mt-4 font-display text-2xl text-amber">$14</p>
            </div>
            <div data-animate="" data-delay="250" className="py-10 md:pl-16">
              <p className="mb-3 text-xs tracking-[0.3em] text-amber/60 uppercase">
                Starter
              </p>
              <h3 className="mb-3 font-display text-3xl text-cream">
                Charred Octopus
              </h3>
              <p className="leading-relaxed text-tan">
                Smoked paprika, fingerling potato, pickled fresno, salsa verde.
              </p>
              <p className="mt-4 font-display text-2xl text-amber">$24</p>
            </div>
          </div>

          {/* Page CTAs */}
          <div
            data-animate=""
            data-delay="380"
            className="mt-16 flex flex-wrap gap-4"
          >
            <Link
              href="/food"
              className="border border-amber px-8 py-4 text-xs tracking-[0.3em] text-amber uppercase transition-colors hover:bg-amber hover:text-charcoal"
            >
              Full Menu
            </Link>
            <Link
              href="/spirits"
              className="border border-cream/30 px-8 py-4 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
            >
              Spirits
            </Link>
            <Link
              href="/beverages"
              className="border border-cream/30 px-8 py-4 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
            >
              Beverages
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. PULL QUOTE ── */}
      {/*
       * Inspired by Screenshot 2's full-width centered origin story quote block.
       * Large italic serif text, centered, with a small label above and a text
       * link below.
       */}
      <section data-wipe className="relative overflow-hidden bg-charcoal py-32 md:py-48">
        <div
          data-parallax="content"
          data-parallax-speed="0.05"
          className="mx-auto max-w-5xl px-8 text-center md:px-16"
        >
          <p
            data-animate=""
            className="mb-8 text-xs tracking-[0.3em] text-amber/60 uppercase"
          >
            Our Philosophy
          </p>
          <blockquote
            data-animate=""
            data-delay="100"
            className="font-display leading-tight text-cream"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            &ldquo;The pursuit of extraordinary starts with refusing to accept
            ordinary.&rdquo;
          </blockquote>
          <Link
            href="/our-staff"
            data-animate=""
            data-delay="280"
            className="mt-12 inline-flex items-center gap-3 text-sm leading-none tracking-[0.2em] text-amber uppercase transition-colors hover:text-cream"
          >
            Meet the team behind it
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* ── 8. PROVENANCE / SOURCING ── */}
      <section data-wipe className="relative overflow-hidden bg-cream py-32 md:py-48">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="mb-20">
            <div data-animate="" className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-oxblood/30" />
              <span className="text-xs tracking-[0.3em] text-oxblood/50 uppercase">
                The Ingredients
              </span>
            </div>
            <h2
              data-animate=""
              data-delay="100"
              className="mt-4 font-display text-5xl leading-tight text-charcoal md:text-7xl"
            >
              Where it
              <br />
              <span className="italic text-oxblood">comes from</span>
            </h2>
          </div>

          <div
            data-parallax="content"
            data-parallax-speed="0.05"
            className="grid gap-16 md:grid-cols-3"
          >
            {SOURCING.map((item) => (
              <div key={item.label} data-animate="" data-delay={item.delay}>
                <div className="mb-8 h-px w-10 bg-amber/60" />
                <h3 className="mb-4 font-display text-2xl text-charcoal">
                  {item.label}
                </h3>
                <p className="mb-6 leading-relaxed text-charcoal/70">
                  {item.copy}
                </p>
                <p className="text-xs tracking-[0.25em] text-oxblood/70 uppercase">
                  {item.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CLOSING CTA ── */}
      <section
        data-wipe
        className="relative flex items-center justify-center overflow-hidden bg-charcoal py-32 md:py-48"
      >
        <div
          data-parallax="content"
          data-parallax-speed="0.1"
          className="absolute inset-0 opacity-20"
        >
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--color-oxblood)_0%,_transparent_70%)]" />
        </div>
        <div className="relative z-10 text-center">
          <div data-animate="" className="flex items-center justify-center gap-6">
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              Join Us
            </span>
            <span className="block h-px w-12 shrink-0 bg-amber/30" />
          </div>
          <h2
            data-animate=""
            data-delay="100"
            className="mt-4 font-display text-5xl leading-tight text-cream md:text-8xl"
          >
            Reserve your
            <br />
            <span className="italic text-tan">evening</span>
          </h2>
          <p
            data-animate=""
            data-delay="220"
            className="mx-auto mt-8 max-w-md text-lg text-tan"
          >
            Whether it&rsquo;s a quiet dinner for two or a gathering worth
            remembering, we&rsquo;ll set the table.
          </p>
          <Link
            href="#reservations"
            data-animate=""
            data-delay="360"
            className="mt-12 inline-block bg-amber px-12 py-5 text-xs font-medium tracking-[0.3em] text-charcoal uppercase transition-colors hover:bg-cream"
          >
            Book a Table
          </Link>
        </div>
      </section>
    </>
  )
}
