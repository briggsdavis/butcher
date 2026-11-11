"use client"

import { useQuery } from "convex/react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import {
  getCommonAddressDisplay,
  getCommonEmailHref,
  getCommonPhoneHref,
  resolveCommonValues,
} from "~/lib/common-values"
import { api } from "../../convex/_generated/api"

const HOLIDAY_CLOSURES = [
  {
    year: "2026",
    dates: [
      "Labor Day: Monday, September 7",
      "Thanksgiving: Thursday, November 26",
      "Christmas Eve: Thursday, December 24",
      "Christmas: Friday, December 25",
    ],
  },
  {
    year: "2027",
    dates: [
      "New Year's Day: Friday, January 1",
      "Easter: Sunday, March 28",
      "Memorial Day: Monday, May 31",
      "Fourth of July: Sunday, July 4",
      "Thanksgiving: Thursday, November 25",
      "Christmas Eve: Friday, December 24",
      "Christmas: Saturday, December 25",
    ],
  },
]

function HolidayClosures() {
  return (
    <div className="border-b border-cream/10 px-8 py-8 md:px-16">
      <details className="group mx-auto max-w-3xl text-center">
        <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-3 font-display text-2xl text-cream transition-colors hover:text-amber md:text-3xl [&::-webkit-details-marker]:hidden">
          Holiday Closures
          <ChevronDown
            aria-hidden="true"
            className="size-6 text-amber transition-transform duration-300 group-open:rotate-180"
          />
        </summary>
        <div className="mt-8 grid gap-10 sm:grid-cols-2">
          {HOLIDAY_CLOSURES.map((group) => (
            <div key={group.year}>
              <span className="text-sm text-amber uppercase">{group.year}</span>
              <ul className="mt-3 space-y-2 text-tan">
                {group.dates.map((date) => (
                  <li key={date}>{date}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}

export function Footer() {
  const [year] = useState(() => new Date().getFullYear())
  const savedValues = useQuery(api.site.getCommonValues)
  const common = resolveCommonValues(savedValues)
  const socialLinks = [
    { name: "Instagram", href: common["instagram.href"] },
    { name: "Facebook", href: common["facebook.href"] },
  ].filter((social) => social.href)
  const address = getCommonAddressDisplay(common)
  const emailHref = getCommonEmailHref(common)
  const phoneHref = getCommonPhoneHref(common)
  const hoursNote = common["hours.note"].trim()

  return (
    <footer className="bg-oxblood">
      <HolidayClosures />
      <div className="px-8 py-16 md:px-16 md:py-24">
        <div className="grid md:grid-cols-3 md:divide-x md:divide-cream/10">
          <div className="pb-12 md:pr-16 md:pb-0">
            <span className="text-sm text-amber uppercase">Connect</span>
            <h3 className="mt-4 font-display text-3xl text-cream">Contact</h3>
            <div className="mt-6 space-y-3 text-tan">
              <p>
                <Link href={phoneHref} className="transition-colors hover:text-cream">
                  {common["phone.display"]}
                </Link>
              </p>
              <p>
                <Link href={emailHref} className="transition-colors hover:text-cream">
                  {common["email.display"]}
                </Link>
              </p>
              <div className="flex gap-6">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="text-amber transition-colors hover:text-cream"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-cream/10 py-12 md:border-t-0 md:px-16 md:py-0">
            <span className="text-sm text-amber uppercase">Find Us</span>
            <h3 className="mt-4 font-display text-3xl text-cream">Location</h3>
            <div className="mt-6 space-y-3 text-tan">
              <Link
                href={common["address.href"]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={address}
                className="block transition-colors hover:text-cream"
              >
                <span className="block">{common["address.line1"]}</span>
                <span className="block">{common["address.line2"]}</span>
              </Link>
            </div>
          </div>

          <div className="border-t border-cream/10 pt-12 md:border-t-0 md:pt-0 md:pl-16">
            <span className="text-sm text-amber uppercase">Visit</span>
            <h3 className="mt-4 font-display text-3xl text-cream">Hours</h3>
            <div className="mt-6 space-y-3 text-tan">
              <div className="flex justify-between">
                <span>{common["hours.days"]}</span>
                <span>{common["hours.time"]}</span>
              </div>
              {hoursNote && <p className="text-sm text-tan/70">{hoursNote}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 px-8 py-6 md:px-16">
        <div className="flex flex-col items-center gap-4 text-center text-xs text-tan/40 md:flex-row md:justify-between md:text-left">
          <p>
            © {year} {common["business.name"]}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-end">
            <Link href="/privacy-policy" className="transition-colors hover:text-cream">
              Privacy Policy
            </Link>
            <Link href="/butcher-and-the-rye-guide" className="transition-colors hover:text-cream">
              Butcher and the Rye Guide
            </Link>
            <Link
              href="https://socialsatisfaction.agency/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              Made by Social Satisfaction
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
