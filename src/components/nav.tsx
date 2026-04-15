import Image from "next/image"
import Link from "next/link"

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/food", label: "Food" },
  { href: "/beverages", label: "Beverages" },
  { href: "/spirits", label: "Spirits" },
  { href: "/our-staff", label: "Our Staff" },
]

export function Nav() {
  return (
    <nav className="absolute inset-x-0 top-0 z-50 flex items-center justify-between overflow-hidden px-8 py-6 md:px-16">
      <Image
        src="/wood.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-amber/20" />
      <Link
        href="/"
        className="relative z-10 font-display text-2xl tracking-widest text-white uppercase"
      >
        Butcher & the Rye
      </Link>
      <div className="relative z-10 hidden items-center gap-10 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm tracking-[0.2em] text-cream uppercase transition-colors hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <Link
        href="#reservations"
        className="relative z-10 border border-white/60 px-6 py-2 text-xs tracking-[0.25em] text-white uppercase transition-colors hover:bg-white hover:text-charcoal"
      >
        Reserve
      </Link>
    </nav>
  )
}
