"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

type MenuLink = {
  href: string
  label: string
  num: string
  style: React.CSSProperties
}

const menuStyle = (delay: number): React.CSSProperties =>
  ({ "--menu-delay": `${delay}s` }) as React.CSSProperties

const MENU_LINKS: MenuLink[] = [
  { href: "/", label: "Home", num: "01", style: menuStyle(0.06) },
  { href: "/about", label: "About", num: "02", style: menuStyle(0.13) },
  { href: "#reservations", label: "Reserve", num: "03", style: menuStyle(0.2) },
  { href: "/our-staff", label: "Our Staff", num: "04", style: menuStyle(0.27) },
  { href: "/food", label: "Food", num: "05", style: menuStyle(0.34) },
  { href: "/spirits", label: "Spirits", num: "06", style: menuStyle(0.41) },
  { href: "/beverages", label: "Beverages", num: "07", style: menuStyle(0.48) },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [introClass, setIntroClass] = useState("")
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  // Fire before paint so the nav starts off-screen with no flash.
  // Only plays on the home page, once per session.
  useLayoutEffect(() => {
    if (pathname !== "/") return
    try {
      if (!sessionStorage.getItem("nav-intro-done")) {
        setIntroClass("nav-intro")
        sessionStorage.setItem("nav-intro-done", "true")
      }
    } catch {
      // sessionStorage unavailable (e.g. private browsing restrictions)
    }
  }, [pathname])

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    lastScrollY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y < 60) {
        setHidden(false)
      } else if (y > lastScrollY.current + 6) {
        setHidden(true)
      } else if (y < lastScrollY.current - 6) {
        setHidden(false)
      }
      lastScrollY.current = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  function closeMenu() {
    setClosing(true)
    setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 300)
  }

  return (
    <>
      <nav
        className={`nav-shell ${introClass} ${hidden ? "-translate-y-full" : "translate-y-0"} fixed inset-x-0 top-0 z-50 flex items-center overflow-hidden px-4 py-6 md:px-16`}
      >
        <Image src="/wood.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-oxblood/70" />
        <div className="absolute inset-0 bg-amber/20" />

        {/* Hamburger — top left */}
        <div className="relative z-10 flex items-center gap-8">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            className="flex flex-col gap-[5px]"
          >
            <span className="block h-px w-6 bg-white" />
            <span className="block h-px w-6 bg-white" />
            <span className="block h-px w-3.5 bg-white" />
          </button>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/food"
              className="text-sm text-white uppercase transition-colors hover:text-amber"
            >
              Food
            </Link>
            <Link
              href="/spirits"
              className="text-sm text-white uppercase transition-colors hover:text-amber"
            >
              Spirits
            </Link>
            <Link
              href="/beverages"
              className="text-sm text-white uppercase transition-colors hover:text-amber"
            >
              Beverages
            </Link>
          </div>
        </div>

        {/* Centered title */}
        <Link
          href="/"
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="/logo.png"
            alt="Butcher & the Rye"
            width={60}
            height={60}
            className="h-12 w-12 md:h-15 md:w-15"
          />
        </Link>

        {/* Reserve — top right */}
        <Link
          href="/#reservations"
          className="relative z-10 ml-auto hidden border border-amber px-5 py-2 text-sm text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)] md:block"
        >
          Reserve
        </Link>
      </nav>

      {/* Full-screen overlay menu */}
      {open && (
        <div
          className={`${closing ? "overlay-out" : "overlay-in"} fixed inset-0 z-[100] flex flex-col bg-charcoal`}
        >
          {/* Close */}
          <button
            onClick={closeMenu}
            aria-label="Close navigation"
            className="absolute top-7 left-8 z-10 flex h-6 w-6 items-center justify-center md:left-16"
          >
            <span className="absolute block h-px w-5 rotate-45 bg-cream/60" />
            <span className="absolute block h-px w-5 -rotate-45 bg-cream/60" />
          </button>

          {/* Menu items — right-aligned, numbered, slide left on hover */}
          <div className="flex flex-1 flex-col justify-center pr-12 md:pr-28 lg:pr-40">
            {MENU_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="menu-item-in group flex items-baseline self-end py-2 md:py-3"
                style={link.style}
              >
                {/* Slide both number + label together on hover */}
                <div className="flex items-baseline gap-3 transition-transform duration-300 ease-out group-hover:-translate-x-4">
                  <span className="font-sans text-xs text-cream/25">
                    {link.num}
                  </span>
                  <span
                    className={`font-display text-3xl text-cream md:text-5xl lg:text-6xl ${link.label === "Reserve" ? "font-bold" : ""}`}
                  >
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
