import { fetchQuery } from "convex/nextjs"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ContactForm } from "~/components/contact-form"
import { FaqList } from "~/components/faq-list"
import { SectionDivider } from "~/components/section-divider"
import { FAQS } from "~/data/faqs"
import {
  getCommonAddressDisplay,
  getCommonEmailHref,
  getCommonPhoneHref,
  resolveCommonValues,
} from "~/lib/common-values"
import { resolveSiteContent } from "~/lib/site-content"
import { api } from "../../../convex/_generated/api"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Butcher and the Rye for reservations, location details, hours, and private dining inquiries.",
}

const DETAIL_META = [
  { key: "details.call", icon: Phone },
  { key: "details.email", icon: Mail },
  { key: "details.address", icon: MapPin },
]

export default async function Contact() {
  const [savedContent, savedCommonValues] = await Promise.all([
    fetchQuery(api.site.getPage, { key: "contact" }),
    fetchQuery(api.site.getCommonValues, {}),
  ])
  const content = resolveSiteContent("contact", savedContent)
  const common = resolveCommonValues(savedCommonValues)
  const f = content.fields
  const img = content.images
  const details = [
    {
      ...DETAIL_META[0]!,
      label: f["details.call.label"],
      value: common["phone.display"],
      href: getCommonPhoneHref(common),
    },
    {
      ...DETAIL_META[1]!,
      label: f["details.email.label"],
      value: common["email.display"],
      href: getCommonEmailHref(common),
    },
    {
      ...DETAIL_META[2]!,
      label: f["details.address.label"],
      value: getCommonAddressDisplay(common),
      href: common["address.href"],
    },
  ]

  return (
    <>
      <section className="hero-section relative flex min-h-screen items-end overflow-hidden bg-oxblood">
        <Image
          src={img["hero.image"]}
          alt="The bar at Butcher and the Rye"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-24 md:px-16">
          <p className="fade-in-up-1 mb-5 text-sm text-amber uppercase">{f["hero.eyebrow"]}</p>
          <h1 className="heading-emboss fade-in-up-2 font-display text-5xl text-cream md:text-7xl lg:text-8xl">
            {f["hero.heading.1"]}
            <br />
            <span className="text-amber italic">{f["hero.heading.2"]}</span>
          </h1>
          <p className="fade-in-up-4 mt-6 max-w-md text-lg text-tan">{f["hero.body"]}</p>
        </div>
      </section>

      <section data-wipe className="bg-charcoal py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-8 md:grid-cols-[1fr_0.85fr] md:px-16">
          <div>
            <div data-animate="" className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-sm text-amber uppercase">{f["details.eyebrow"]}</span>
            </div>
            <h2
              data-animate=""
              data-delay="120"
              className="heading-emboss mt-4 font-display text-5xl text-cream md:text-7xl"
            >
              {f["details.heading.1"]}
              <br />
              <span className="text-tan italic">{f["details.heading.2"]}</span>
            </h2>
            <div className="mt-12 divide-y divide-cream/10 border-t border-cream/10">
              {details.map((detail, i) => {
                const Icon = detail.icon
                return (
                  <Link
                    key={detail.label}
                    href={detail.href}
                    target={detail.href.startsWith("http") ? "_blank" : undefined}
                    rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-animate=""
                    data-delay={String(220 + i * 90)}
                    className="group flex items-center gap-5 py-6"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center border border-amber/40 text-amber transition-colors duration-500 group-hover:border-cream group-hover:text-cream">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-tan/50 uppercase">{detail.label}</span>
                      <span className="mt-1 block text-sm text-cream transition-colors duration-500 group-hover:text-amber md:text-base">
                        {detail.value}
                      </span>
                    </span>
                    <ArrowRight className="size-4 text-amber transition-transform duration-500 group-hover:translate-x-1.5" />
                  </Link>
                )
              })}
            </div>
            <ContactForm />
          </div>

          <div data-animate="" data-delay="260" className="md:pt-20">
            <div className="img-inset-shadow relative aspect-[4/5] overflow-hidden shadow-2xl">
              <Image
                src={img["details.image"]}
                alt="Candlelit tables at Butcher and the Rye"
                fill
                sizes="(min-width: 768px) 38vw, 100vw"
                className="img-zoom object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" data-wipe className="scroll-mt-24 bg-oxblood py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-8 md:px-16">
          <div data-animate="" className="text-center">
            <div className="flex items-center justify-center gap-6">
              <span className="block h-px w-12 shrink-0 bg-amber/30" />
              <span className="text-sm text-amber uppercase">Frequently Asked Questions</span>
              <span className="block h-px w-12 shrink-0 bg-amber/30" />
            </div>
            <h2 className="heading-emboss mt-4 font-display text-5xl text-cream md:text-7xl">
              Before
              <br />
              <span className="text-tan italic">You Visit</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-tan">
              Whiskey Bar &amp; Rustic Americana · Downtown Pittsburgh
            </p>
          </div>

          <SectionDivider className="my-4" />
          <FaqList faqs={FAQS} />
        </div>
      </section>
    </>
  )
}
