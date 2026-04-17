import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const MENU_HIGHLIGHTS = [
  {
    name: "Bone-In Ribeye",
    description: "Dry-aged 45 days, served with roasted marrow butter",
    price: "68",
  },
  {
    name: "Braised Short Rib",
    description: "Red wine reduction, root vegetables, horseradish gremolata",
    price: "42",
  },
  {
    name: "Pan-Seared Duck Breast",
    description: "Cherry gastrique, wild rice, charred broccolini",
    price: "38",
  },
  {
    name: "Grilled Lamb Chops",
    description: "Herb crust, mint chimichurri, fingerling potatoes",
    price: "54",
  },
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
          className="mx-auto grid max-w-7xl gap-16 px-8 md:grid-cols-2 md:px-16"
        >
          <div className="flex flex-col justify-center">
            <div data-animate="" className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                Our Story
              </span>
            </div>
            <h2
              data-animate=""
              data-delay="100"
              className="mt-4 font-display text-5xl leading-tight text-cream md:text-7xl"
            >
              Where every
              <br />
              glass has a<br />
              <span className="text-tan italic">history</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <p
              data-animate=""
              data-delay="180"
              className="text-lg leading-relaxed text-tan"
            >
              Butcher and the Rye was born from a reverence for the craft — the
              slow char of a barrel, the patience of a dry-aged cut, the
              conversation that only happens around a well-set table.
            </p>
            <p
              data-animate=""
              data-delay="280"
              className="mt-6 text-lg leading-relaxed text-tan"
            >
              We are a place for those who understand that a great evening is
              not rushed. It is savored, one pour at a time.
            </p>
            <Link
              href="/about"
              data-animate=""
              data-delay="380"
              className="mt-10 inline-flex items-center gap-3 text-sm leading-none tracking-[0.2em] text-amber uppercase transition-colors hover:text-cream"
            >
              Read more
              <ArrowRight className="size-4" />
            </Link>
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
          <div className="mb-20 max-w-xl">
            <div data-animate="" className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                From the Kitchen
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
          <div className="grid gap-0 divide-y divide-cream/10">
            {MENU_HIGHLIGHTS.map((item, i) => (
              <div
                key={item.name}
                data-animate=""
                data-delay={String(i * 80)}
                className="group grid items-baseline gap-4 py-8 md:grid-cols-[1fr_2fr_auto]"
              >
                <h3 className="font-display text-3xl text-cream transition-colors group-hover:text-amber">
                  {item.name}
                </h3>
                <p className="text-tan">{item.description}</p>
                <span className="font-display text-2xl text-amber">
                  ${item.price}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/food"
            data-animate=""
            data-delay="400"
            className="mt-16 inline-block border border-cream/30 px-10 py-4 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
          >
            Full Menu
          </Link>
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
              data-delay="100"
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
                  data-delay={String(200 + i * 100)}
                >
                  <h3 className="font-display text-2xl text-cream">
                    {drink.name}
                  </h3>
                  <p className="mt-2 text-tan">{drink.description}</p>
                </div>
              ))}
            </div>
            <div data-animate="" data-delay="550" className="mt-16 flex gap-6">
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
            data-delay="100"
            className="mt-4 text-center font-display text-5xl text-cream md:text-7xl"
          >
            A glimpse <span className="text-tan italic">inside</span>
          </h2>
          <div className="mt-20 space-y-8">
            <div
              data-animate=""
              data-delay="150"
              className="flex flex-wrap items-end justify-center gap-8"
            >
              {[
                { src: "/entree.png", alt: "Plated dish", w: 1652, h: 1924 },
                { src: "/glow.png", alt: "The bar", w: 1803, h: 2003 },
                { src: "/whiskey.png", alt: "Whiskey pour", w: 1579, h: 1996 },
              ].map((photo) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.w}
                  height={photo.h}
                  className="h-56 w-auto object-contain md:h-80"
                />
              ))}
            </div>
            <div
              data-animate=""
              data-delay="250"
              className="flex flex-wrap items-end justify-center gap-8"
            >
              {[
                { src: "/bartender.png", alt: "Bartender", w: 1208, h: 1662 },
                { src: "/tables.png", alt: "Dining room", w: 2168, h: 1922 },
              ].map((photo) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.w}
                  height={photo.h}
                  className="h-56 w-auto object-contain md:h-80"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

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
            data-delay="100"
            className="mt-4 font-display text-5xl leading-tight text-cream md:text-8xl"
          >
            Reserve your
            <br />
            <span className="text-tan italic">evening</span>
          </h2>
          <p
            data-animate=""
            data-delay="220"
            className="mx-auto mt-8 max-w-md text-lg text-tan"
          >
            Whether it's a quiet dinner for two or a gathering worth
            remembering, we'll set the table.
          </p>
          <Link
            href="#"
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
