import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ContactForm } from "~/components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Butcher and the Rye for reservations, location details, hours, and private dining inquiries.",
}

const DETAILS = [
  {
    label: "Call",
    value: "(412) 391-2752",
    href: "tel:+14123912752",
    icon: Phone,
  },
  {
    label: "Email",
    value: "info@butcherandtherye.com",
    href: "mailto:info@butcherandtherye.com",
    icon: Mail,
  },
  {
    label: "Find Us",
    value: "212 6th Street, Pittsburgh, PA 15222",
    href: "https://maps.google.com/?q=212+6th+Street+Pittsburgh+PA+15222",
    icon: MapPin,
  },
]

export default function Contact() {
  return (
    <>
      <section className="hero-section relative flex min-h-screen items-end overflow-hidden bg-oxblood">
        <Image
          src="/bar-brass-glow.jpg"
          alt="The bar at Butcher and the Rye"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-24 md:px-16">
          <p className="fade-in-up-1 mb-5 text-xs text-amber uppercase">
            Reservations · Questions · Private Dining
          </p>
          <h1 className="heading-emboss fade-in-up-2 font-display text-5xl text-cream md:text-7xl lg:text-8xl">
            Contact
            <br />
            <span className="text-amber italic">the rye</span>
          </h1>
          <p className="fade-in-up-4 mt-6 max-w-md text-lg text-tan">
            Reach the host stand, plan a gathering, or find your way to our
            table on 6th Street.
          </p>
        </div>
      </section>

      <section data-wipe className="bg-charcoal py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-8 md:grid-cols-[1fr_0.85fr] md:px-16">
          <div>
            <div data-animate="" className="flex items-center gap-4">
              <span className="block h-px w-10 shrink-0 bg-amber/50" />
              <span className="text-xs text-amber uppercase">Get in Touch</span>
            </div>
            <h2
              data-animate=""
              data-delay="120"
              className="heading-emboss mt-4 font-display text-5xl text-cream md:text-7xl"
            >
              We&apos;ll set
              <br />
              <span className="text-tan italic">the table</span>
            </h2>
            <div className="mt-12 divide-y divide-cream/10 border-t border-cream/10">
              {DETAILS.map((detail, i) => {
                const Icon = detail.icon
                return (
                  <Link
                    key={detail.label}
                    href={detail.href}
                    target={
                      detail.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      detail.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    data-animate=""
                    data-delay={String(220 + i * 90)}
                    className="group flex items-center gap-5 py-6"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center border border-amber/40 text-amber transition-colors duration-500 group-hover:border-cream group-hover:text-cream">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-tan/50 uppercase">
                        {detail.label}
                      </span>
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
                src="/candlelit-tables.jpg"
                alt="Candlelit tables at Butcher and the Rye"
                fill
                sizes="(min-width: 768px) 38vw, 100vw"
                className="img-zoom object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
