"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const MENU_LINKS = [
  { href: "/", label: "Home", num: "01" },
  { href: "/about", label: "About", num: "02" },
  { href: "/our-staff", label: "Our Staff", num: "03" },
  { href: "/food", label: "Food", num: "04" },
  { href: "/spirits", label: "Spirits", num: "05" },
  { href: "/beverages", label: "Beverages", num: "06" },
  { href: "#reservations", label: "Reserve", num: "07" },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <nav className="absolute inset-x-0 top-0 z-50 flex items-center overflow-hidden px-8 py-6 md:px-16">
        <Image src="/wood.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-amber/20" />

        {/* Hamburger — top left */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="relative z-10 flex flex-col gap-[5px]"
        >
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-3.5 bg-white" />
        </button>

        {/* Centered title */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-xl tracking-widest text-white uppercase md:text-2xl"
        >
          Butcher & the Rye
        </Link>

        {/* Reserve — top right */}
        <Link
          href="/#reservations"
          className="relative z-10 ml-auto hidden border border-white/50 px-5 py-2 text-xs tracking-[0.25em] text-white uppercase transition-colors hover:border-amber hover:text-amber md:block"
        >
          Reserve
        </Link>
      </nav>

      {/* Full-screen overlay menu */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-charcoal"
          style={{ animation: "overlayIn 0.3s ease both" }}
        >
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="absolute left-8 top-7 z-10 flex h-6 w-6 items-center justify-center md:left-16"
          >
            <span
              className="absolute block h-px w-5 bg-cream/60"
              style={{ transform: "rotate(45deg)" }}
            />
            <span
              className="absolute block h-px w-5 bg-cream/60"
              style={{ transform: "rotate(-45deg)" }}
            />
          </button>

          {/* Menu items — right-aligned, numbered, slide left on hover */}
          <div className="flex flex-1 flex-col justify-center pr-12 md:pr-28 lg:pr-40">
            {MENU_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline justify-end py-2 md:py-3"
                style={{
                  animation: `menuItemIn 0.55s ease ${0.06 + i * 0.07}s both`,
                }}
              >
                {/* Slide both number + label together on hover */}
                <div className="flex items-baseline gap-3 transition-transform duration-300 ease-out group-hover:-translate-x-4">
                  <span className="font-sans text-xs text-cream/25">
                    {link.num}
                  </span>
                  {/* 35% smaller from original: 5xl→2.04rem, 7xl→3.06rem, 8xl→4.08rem */}
                  <span className="font-display leading-none text-cream text-[2.04rem] md:text-[3.06rem] lg:text-[4.08rem]">
                    {link.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
