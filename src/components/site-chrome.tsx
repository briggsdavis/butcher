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
    <>
      {/* Site-wide wood grain texture — fixed overlay, paints above all section
          backgrounds so it covers footer/restaurant-group/every page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          backgroundImage: "url(/wood.jpg)",
          backgroundSize: "700px",
          backgroundRepeat: "repeat",
          opacity: 0.045,
        }}
      />
      <CustomCursor />
      <SmoothScroll />
      <PageEffects />
      <Nav />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  )
}
