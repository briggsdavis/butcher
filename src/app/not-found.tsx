import Link from "next/link"

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-charcoal px-8 text-center">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-oxblood/20 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Large 404 */}
        <p
          className="font-display leading-none text-cream/[0.06] select-none"
          style={{ fontSize: "clamp(10rem, 30vw, 22rem)" }}
          aria-hidden="true"
        >
          404
        </p>

        {/* Content, overlapping the 404 */}
        <div className="-mt-10 flex flex-col items-center md:-mt-16">
          <div className="flex items-center gap-4">
            <span className="block h-px w-10 shrink-0 bg-amber/40" />
            <span className="text-xs tracking-[0.3em] text-amber uppercase">
              Lost
            </span>
            <span className="block h-px w-10 shrink-0 bg-amber/40" />
          </div>

          <h1
            className="mt-4 font-display leading-tight text-cream"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Table not found
          </h1>

          <p className="mt-5 max-w-sm text-base leading-relaxed text-tan">
            This seat doesn&rsquo;t exist. Let us guide you back to where the
            evening begins.
          </p>

          <Link
            href="/"
            className="mt-10 inline-block border border-cream/25 px-10 py-4 text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:border-amber hover:text-amber"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  )
}
