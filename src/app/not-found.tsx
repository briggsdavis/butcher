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
          className="font-display text-[10rem] text-cream/[0.06] select-none md:text-[16rem] lg:text-[22rem]"
          aria-hidden="true"
        >
          404
        </p>

        {/* Content, overlapping the 404 */}
        <div className="-mt-10 flex flex-col items-center md:-mt-16">
          <div className="flex items-center gap-4">
            <span className="block h-px w-10 shrink-0 bg-amber/40" />
            <span className="text-xs text-amber uppercase">Lost</span>
            <span className="block h-px w-10 shrink-0 bg-amber/40" />
          </div>

          <h1 className="mt-4 font-display text-3xl text-cream md:text-5xl">
            Table not found
          </h1>

          <p className="mt-5 max-w-sm text-base text-tan">
            This seat doesn&rsquo;t exist. Let us guide you back to where the
            evening begins.
          </p>

          <Link
            href="/"
            className="mt-10 inline-block border border-amber px-10 py-4 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)]"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  )
}
