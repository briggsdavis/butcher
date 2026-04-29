"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { CustomCursor } from "~/components/custom-cursor"
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
    <div className="relative">
      {/* Site-wide wood grain texture — absolute so it scrolls with the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: "url(/wood.jpg)",
          backgroundSize: "700px",
          backgroundRepeat: "repeat",
          opacity: 0.05,
        }}
      />
      <CustomCursor />
      <SmoothScroll />
      <PageEffects />
      <Nav />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </div>
  )
}
