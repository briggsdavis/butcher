"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { Footer } from "~/components/footer"
import { Nav } from "~/components/nav"
import { PageEffects } from "~/components/page-effects"
import { PageTransition } from "~/components/page-transition"
import { SmoothScroll } from "~/components/smooth-scroll"

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith("/admin")) {
    return <>{children}</>
  }

  return (
    <>
      <SmoothScroll />
      <PageEffects />
      <Nav />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  )
}
