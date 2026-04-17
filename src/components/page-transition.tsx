"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState, type ReactNode } from "react"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [leaving, setLeaving] = useState(false)
  const pendingHref = useRef<string | null>(null)
  const prevPathname = useRef(pathname)

  // When navigation actually completes, reset leaving so the enter animation fires
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname
      setLeaving(false)
    }
  }, [pathname])

  // Intercept internal link clicks to play the exit animation first
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (leaving) return

      const anchor = (e.target as Element).closest<HTMLAnchorElement>("a[href]")
      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("mailto:")
      )
        return

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (href === pathname) return

      e.preventDefault()
      pendingHref.current = href
      setLeaving(true)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [pathname, leaving])

  // After the exit animation finishes, trigger the actual navigation
  useEffect(() => {
    if (!leaving || !pendingHref.current) return

    const timer = setTimeout(() => {
      router.push(pendingHref.current!)
    }, 300)

    return () => clearTimeout(timer)
  }, [leaving, router])

  return (
    <div
      key={pathname}
      className={leaving ? "page-transition-out" : "page-transition"}
    >
      {children}
    </div>
  )
}
