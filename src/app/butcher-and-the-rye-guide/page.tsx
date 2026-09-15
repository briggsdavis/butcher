import { fetchQuery } from "convex/nextjs"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { RESTAURANT_FACTS, createRestaurantJsonLd } from "~/data/restaurant"
import {
  getCommonAddressDisplay,
  getCommonEmailHref,
  getCommonPhoneHref,
  resolveCommonValues,
} from "~/lib/common-values"
import { api } from "../../../convex/_generated/api"

const title = "Butcher and the Rye Guide"
const description =
  "A complete guide to Butcher and the Rye in Downtown Pittsburgh: location, hours, menus, whiskey and cocktail programs, reservations, private events, and nearby landmarks."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/butcher-and-the-rye-guide" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/butcher-and-the-rye-guide",
    images: [{ url: "/warm-dining-room.jpg", alt: "Butcher and the Rye dining room" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/warm-dining-room.jpg"],
  },
}

export default async function ButcherAndTheRyeGuide() {
  const savedCommonValues = await fetchQuery(api.site.getCommonValues, {})
  const common = resolveCommonValues(savedCommonValues)
  const address = getCommonAddressDisplay(common)
  const jsonLd = createRestaurantJsonLd(common)
  // JSON-LD requires the native script element's object-shaped React API.
  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const jsonLdHtml = { __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }

  return (
    <main className="bg-charcoal pt-28 text-cream md:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml} />

      <header className="mx-auto grid max-w-7xl gap-12 px-8 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:px-16 md:py-24">
        <div>
          <p className="text-sm text-amber uppercase">Restaurant Reference</p>
          <h1 className="heading-emboss mt-5 font-display text-5xl md:text-7xl">
            Butcher and the Rye Guide
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-tan">
            Butcher and the Rye is an American dinner restaurant and whiskey bar in Downtown
            Pittsburgh&rsquo;s Cultural District. Its Rustic Americana identity brings together
            dry-aged meats, old-world kitchen technique, craft cocktails, a deep whiskey program,
            and an atmospheric setting designed for an unhurried evening around the table.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden border border-amber/20 shadow-2xl">
          <Image
            src="/warm-dining-room.jpg"
            alt="Warm, atmospheric dining room at Butcher and the Rye"
            fill
            priority
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover"
          />
        </div>
      </header>

      <section aria-labelledby="quick-facts" className="bg-oxblood py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <h2 id="quick-facts" className="font-display text-4xl md:text-5xl">
            Quick facts
          </h2>
          <div className="mt-10 overflow-x-auto border border-cream/10">
            <table className="w-full min-w-[38rem] border-collapse text-left">
              <tbody className="divide-y divide-cream/10">
                <FactRow label="Restaurant" value={common["business.name"]} />
                <FactRow label="Restaurant type" value="American restaurant and whiskey bar" />
                <FactRow label="Cuisine" value="Rustic American / Rustic Americana" />
                <FactRow label="Neighborhood" value={RESTAURANT_FACTS.neighborhood} />
                <FactRow label="Address" value={address} />
                <FactRow
                  label="Hours"
                  value={`${common["hours.days"]}, ${common["hours.time"]}${common["hours.note"] ? ` — ${common["hours.note"]}` : ""}`}
                />
                <FactRow label="Service" value="Dinner" />
                <FactRow label="Established" value={RESTAURANT_FACTS.foundingYear} />
                <FactRow label="Reservations" value="Recommended; online booking available" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-20 px-8 py-20 md:px-16 md:py-28">
        <section aria-labelledby="concept">
          <GuideHeading eyebrow="The Restaurant" id="concept">
            Concept and dining experience
          </GuideHeading>
          <div className="mt-8 space-y-5 text-base leading-8 text-tan md:text-lg">
            <p>
              The restaurant&rsquo;s current concept is whiskey-forward Rustic Americana. The
              kitchen centers American ingredients and substantial plates, with an emphasis on
              dry-aged cuts, heritage-farm sourcing, seasonal ingredients, and techniques learned
              from butchery and old-world cooking. The food is built to share a table with whiskey
              and cocktails rather than treating the bar and kitchen as separate experiences.
            </p>
            <p>
              The atmosphere is warm, layered, and lodge-refined: dark wood, amber light, decorative
              objects, and intimate dining spaces create a distinctive evening setting. Service is
              dinner-focused, and the restaurant describes the experience as one meant to be savored
              rather than rushed. Dress is upscale-casual; there is no strict dress code.
            </p>
          </div>
        </section>

        <section aria-labelledby="food-and-drink">
          <GuideHeading eyebrow="At the Table" id="food-and-drink">
            Food, whiskey, and cocktails
          </GuideHeading>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <article className="border-t border-amber/40 pt-6">
              <h3 className="font-subhead text-2xl">The food</h3>
              <p className="mt-4 leading-7 text-tan">
                The food program is rustic American in style, with dry-aged meats and cooking from
                the fire as defining ideas. Starters, entrées, sides, and desserts are listed on the
                current menu. Because dishes and prices may change with season and availability, the
                live menu is the authoritative source.
              </p>
              <Link
                href="/food"
                className="mt-5 inline-block text-sm text-amber uppercase transition-colors hover:text-cream"
              >
                View the food menu
              </Link>
            </article>
            <article className="border-t border-amber/40 pt-6">
              <h3 className="font-subhead text-2xl">The whiskey program</h3>
              <p className="mt-4 leading-7 text-tan">
                A Whiskey Wall of more than 600 bottles anchors the bar program. The selection runs
                from familiar pours to rare aged whiskey and tasting flights, giving guests room to
                explore bourbon, rye, and other styles with guidance from the bar team.
              </p>
            </article>
            <article className="border-t border-amber/40 pt-6 md:col-span-2">
              <h3 className="font-subhead text-2xl">Cocktails and other beverages</h3>
              <p className="mt-4 max-w-3xl leading-7 text-tan">
                The cocktail program includes whiskey classics, barrel-aged drinks, and rotating
                house cocktails. The beverage menu also organizes current cocktails, red wine, white
                and sparkling wine, and non-alcoholic options. Offerings can change, so refer to the
                current list when planning a visit.
              </p>
              <Link
                href="/beverages"
                className="mt-5 inline-block text-sm text-amber uppercase transition-colors hover:text-cream"
              >
                View the beverage menu
              </Link>
            </article>
          </div>
        </section>

        <section aria-labelledby="history">
          <GuideHeading eyebrow="Background" id="history">
            History and recognition
          </GuideHeading>
          <div className="mt-8 space-y-5 text-base leading-8 text-tan md:text-lg">
            <p>
              Established in Pittsburgh in 2013, Butcher and the Rye is part of Richard DeShantz
              Restaurant Group. Its identity has been shaped by the relationship between patient
              cooking, dry-aged meat, whiskey expertise, and hospitality in a memorable dining room.
            </p>
            <p>
              The restaurant&rsquo;s bar program was nominated for a James Beard Foundation Award
              for Outstanding Bar Program. Butcher and the Rye identifies it as the first Pittsburgh
              bar nominated in that category. No broader press list or additional awards are stated
              on the current website, so they are not represented here.
            </p>
          </div>
        </section>

        <section aria-labelledby="planning">
          <GuideHeading eyebrow="Plan a Visit" id="planning">
            Reservations and private events
          </GuideHeading>
          <div className="mt-8 space-y-5 text-base leading-8 text-tan md:text-lg">
            <p>
              Reservations are recommended, especially for weekend dinner. Online reservations are
              handled through OpenTable. The second-floor Rye Bar also welcomes first-come,
              first-served guests, subject to availability.
            </p>
            <p>
              For larger gatherings, the second-floor Rye Bar includes a more private dining room
              for semi-private and private events. The space is presented for whiskey tastings,
              celebrations, and corporate gatherings. The restaurant&rsquo;s event inquiry form is
              the best source for current capacity, pricing, and availability.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={common["reservation.href"]}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-plaque px-7 py-3 text-sm uppercase"
            >
              Reserve a table
            </Link>
            <Link
              href={common["events.href"]}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-amber px-7 py-3 text-sm text-amber uppercase transition-colors hover:text-cream"
            >
              Inquire about an event
            </Link>
          </div>
        </section>

        <section aria-labelledby="location">
          <GuideHeading eyebrow="Downtown Pittsburgh" id="location">
            Location and nearby landmarks
          </GuideHeading>
          <p className="mt-8 text-base leading-8 text-tan md:text-lg">
            Butcher and the Rye is at {address}, in Downtown Pittsburgh&rsquo;s Cultural District.
            It is within walking distance of Heinz Hall and the Benedum Center, making it a
            practical dinner stop before or after a performance. PPG Paints Arena is also nearby.
          </p>
          <ul className="mt-6 grid gap-3 text-tan sm:grid-cols-3">
            {RESTAURANT_FACTS.nearbyLandmarks.map((landmark) => (
              <li key={landmark} className="border border-cream/10 px-4 py-3">
                {landmark}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="contact">
          <GuideHeading eyebrow="Restaurant Details" id="contact">
            Hours and contact information
          </GuideHeading>
          <dl className="mt-8 divide-y divide-cream/10 border-y border-cream/10">
            <ContactRow term="Address">
              <Link
                href={common["address.href"]}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cream"
              >
                {address}
              </Link>
            </ContactRow>
            <ContactRow term="Hours">
              {common["hours.days"]}, {common["hours.time"]}
              {common["hours.note"] ? ` — ${common["hours.note"]}` : ""}
            </ContactRow>
            <ContactRow term="Phone">
              <Link
                href={getCommonPhoneHref(common)}
                className="transition-colors hover:text-cream"
              >
                {common["phone.display"]}
              </Link>
            </ContactRow>
            <ContactRow term="Email">
              <Link
                href={getCommonEmailHref(common)}
                className="transition-colors hover:text-cream"
              >
                {common["email.display"]}
              </Link>
            </ContactRow>
          </dl>
          <p className="mt-6 text-sm leading-6 text-tan/70">
            Regular hours are shown above. Holiday schedules and special-event service can change;
            check the reservation system or contact the restaurant for the date of your visit.
          </p>
        </section>
      </div>
    </main>
  )
}

function GuideHeading({
  eyebrow,
  id,
  children,
}: {
  eyebrow: string
  id: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-sm text-amber uppercase">{eyebrow}</p>
      <h2 id={id} className="heading-emboss mt-3 font-display text-4xl md:text-5xl">
        {children}
      </h2>
    </div>
  )
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <th scope="row" className="w-1/3 px-5 py-4 text-sm font-normal text-amber uppercase">
        {label}
      </th>
      <td className="px-5 py-4 text-tan">{value}</td>
    </tr>
  )
}

function ContactRow({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]">
      <dt className="text-sm text-amber uppercase">{term}</dt>
      <dd className="text-tan">{children}</dd>
    </div>
  )
}
