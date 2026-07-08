"use client"

import { RotateCcw } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

// Recoverable error boundary for the whole admin section. Without this, any
// error thrown while rendering an admin page — most commonly a Convex query
// (e.g. `getPageForAdmin`) briefly throwing "Not authenticated." while the
// client auth token is still settling — escapes to Next's default handler and
// hard-crashes the route with "This page couldn't load". Here we catch it and
// offer an in-place retry, which re-runs the query once auth has resolved.
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Admin route error:", error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center px-8 py-16">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="block h-px w-10 shrink-0 bg-amber/50" />
          <span className="text-xs text-amber uppercase">Something went wrong</span>
          <span className="block h-px w-10 shrink-0 bg-amber/50" />
        </div>
        <h1 className="mt-4 font-display text-4xl text-cream">This page hit a snag</h1>
        <p className="mt-4 text-sm text-tan/70">
          The editor couldn&apos;t finish loading. This is usually momentary while your admin
          session reconnects — try again in a second.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-charcoal transition-opacity hover:opacity-90"
          >
            <RotateCcw className="size-4" />
            Try again
          </button>
          <Link
            href="/admin"
            className="text-xs text-tan/60 uppercase transition-colors hover:text-amber"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
