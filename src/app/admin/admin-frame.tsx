"use client"

import {
  ArrowLeft,
  ExternalLink,
  GlassWater,
  Home,
  Info,
  LayoutDashboard,
  Mail,
  MessageSquareText,
  Settings,
  Users,
  Utensils,
  Wine,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentType, ReactNode } from "react"
import { SITE_PAGE_DEFINITIONS } from "~/lib/site-content"
import { SignOutButton } from "./sign-out-button"

type AdminLink = {
  href: string
  label: string
  publicHref?: string
  icon: ComponentType<{ className?: string }>
}

const PAGE_ICONS = {
  home: Home,
  about: Info,
  contact: Mail,
  "our-staff": Users,
}

const PAGE_LINKS: AdminLink[] = SITE_PAGE_DEFINITIONS.map((page) => ({
  href: `/admin/pages/${page.key}`,
  label: page.label,
  publicHref: page.publicHref,
  icon: PAGE_ICONS[page.key],
}))

const DASHBOARD_LINK: AdminLink = {
  href: "/admin",
  label: "Dashboard",
  icon: LayoutDashboard,
}

const MENU_LINKS: AdminLink[] = [
  { href: "/admin/food", label: "Food", publicHref: "/food", icon: Utensils },
  { href: "/admin/spirits", label: "Spirits", publicHref: "/spirits", icon: Wine },
  { href: "/admin/beverages", label: "Beverages", publicHref: "/beverages", icon: GlassWater },
]

const SETTINGS_LINKS: AdminLink[] = [
  { href: "/admin/common", label: "Common Values", icon: Settings },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquareText },
]

const AUTH_ROUTES = new Set(["/admin/login", "/admin/signup"])

export function AdminFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (AUTH_ROUTES.has(pathname)) {
    return <>{children}</>
  }

  return (
    <div data-admin className="min-h-screen bg-oxblood text-cream md:flex">
      <aside className="flex flex-col border-b border-amber/20 bg-charcoal/40 px-6 py-6 md:sticky md:top-0 md:h-screen md:w-72 md:shrink-0 md:border-r md:border-b-0 md:px-5">
        <div>
          <Link
            href="/admin"
            className="inline-block cursor-pointer font-display text-2xl text-cream"
          >
            Admin
          </Link>
          <Link
            href="/"
            className="mt-4 flex items-center gap-2 border border-amber/40 px-3 py-2 text-sm text-amber uppercase transition-colors hover:border-amber hover:bg-amber/10 hover:text-cream"
          >
            <ArrowLeft className="size-4 shrink-0" />
            Back to Site
          </Link>
          <div className="mt-5">
            <AdminNavLink link={DASHBOARD_LINK} active={isActive(pathname, DASHBOARD_LINK.href)} />
          </div>
        </div>

        <nav className="mt-8 flex gap-6 overflow-x-auto pb-2 md:block md:flex-1 md:space-y-8 md:overflow-visible md:pb-0">
          <NavGroup title="Site Settings" links={SETTINGS_LINKS} pathname={pathname} />
          <NavGroup title="Website Pages" links={PAGE_LINKS} pathname={pathname} />
          <NavGroup title="Menus" links={MENU_LINKS} pathname={pathname} />
        </nav>

        <div className="mt-8 w-full md:mt-auto md:pt-8">
          <SignOutButton />
        </div>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

function NavGroup({
  title,
  links,
  pathname,
}: {
  title: string
  links: AdminLink[]
  pathname: string
}) {
  return (
    <div className="min-w-52 md:min-w-0">
      <p className="mb-3 text-xs text-tan/50 uppercase">{title}</p>
      <div className="space-y-1">
        {links.map((link) => (
          <AdminNavLink key={link.href} link={link} active={isActive(pathname, link.href)} />
        ))}
      </div>
    </div>
  )
}

function AdminNavLink({ link, active }: { link: AdminLink; active: boolean }) {
  const Icon = link.icon

  return (
    <div
      className={`group flex items-stretch border transition-colors ${
        active
          ? "border-amber bg-amber/10 text-cream"
          : "border-transparent text-tan/70 hover:border-amber/40 hover:text-amber"
      }`}
    >
      <Link
        href={link.href}
        className="flex min-w-0 flex-1 cursor-pointer select-none items-center gap-2 px-3 py-2"
      >
        <Icon className="size-4 shrink-0 cursor-pointer" />
        <span className="cursor-pointer truncate text-sm">{link.label}</span>
      </Link>
      {link.publicHref && (
        <Link
          href={link.publicHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 cursor-pointer select-none items-center px-3 text-tan/40 transition-colors group-hover:text-amber"
          aria-label={`View ${link.label}`}
        >
          <ExternalLink className="size-3.5 cursor-pointer" />
        </Link>
      )}
    </div>
  )
}

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}
