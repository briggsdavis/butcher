import Link from "next/link"

export function Footer() {
  return (
    <footer>
      {/* Decorative header line */}
      <div className="flex items-center gap-6 bg-oxblood px-8 pt-12 md:px-16">
        <span className="block h-px flex-1 bg-amber/25" />
        <span className="shrink-0 font-display text-xs tracking-[0.3em] text-amber/50 uppercase">
          Butcher & the Rye
        </span>
        <span className="block h-px flex-1 bg-amber/25" />
      </div>

      <div className="bg-oxblood px-8 pb-16 pt-12 md:px-16 md:pb-24">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3 md:divide-x md:divide-cream/10">
          <div className="pb-12 md:pb-0 md:pr-16">
            <div className="flex items-center gap-3 pb-6">
              <span className="block h-px w-6 shrink-0 bg-amber/40" />
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                Connect
              </span>
            </div>
            <h3 className="font-display text-3xl text-cream">Contact</h3>
            <div className="mt-6 space-y-3 text-tan">
              <p>(412) 391-2752</p>
              <p>info@butcherandtherye.com</p>
              <div className="flex gap-6">
                {["Instagram", "Facebook"].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="text-amber transition-colors hover:text-cream"
                  >
                    {social}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-cream/10 py-12 md:border-t-0 md:px-16 md:py-0">
            <div className="flex items-center gap-3 pb-6">
              <span className="block h-px w-6 shrink-0 bg-amber/40" />
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                Find Us
              </span>
            </div>
            <h3 className="font-display text-3xl text-cream">Location</h3>
            <div className="mt-6 space-y-3 text-tan">
              <p>2195 Penn Avenue</p>
              <p>Pittsburgh, PA 15222</p>
              <Link
                href="#"
                className="text-amber transition-colors hover:text-cream"
              >
                Get directions
              </Link>
            </div>
          </div>

          <div className="border-t border-cream/10 pt-12 md:border-t-0 md:pl-16 md:pt-0">
            <div className="flex items-center gap-3 pb-6">
              <span className="block h-px w-6 shrink-0 bg-amber/40" />
              <span className="text-xs tracking-[0.3em] text-amber uppercase">
                Visit
              </span>
            </div>
            <h3 className="font-display text-3xl text-cream">Hours</h3>
            <div className="mt-6 space-y-3 text-tan">
              <div className="flex justify-between">
                <span>Monday – Thursday</span>
                <span>5pm – 11pm</span>
              </div>
              <div className="flex justify-between">
                <span>Friday – Saturday</span>
                <span>5pm – 12am</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>4pm – 10pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — dark red matching the rest of the footer */}
      <div className="border-t border-cream/10 bg-oxblood px-8 py-6 md:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-tan/40">
          <p>
            © {new Date().getFullYear()} Butcher and the Rye. All rights
            reserved.
          </p>
          <Link
            href="https://briggsdavis.com"
            target="_blank"
            className="transition-colors hover:text-cream"
          >
            Made by Briggs Davis
          </Link>
        </div>
      </div>
    </footer>
  )
}
