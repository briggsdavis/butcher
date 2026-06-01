import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-oxblood">
      <div className="px-8 py-16 md:px-16 md:py-24">
        <div className="grid md:grid-cols-3 md:divide-x md:divide-cream/10">
          <div className="pb-12 md:pr-16 md:pb-0">
            <span className="text-xs text-amber uppercase">Connect</span>
            <h3 className="mt-4 font-display text-3xl text-cream">Contact</h3>
            <div className="mt-6 space-y-3 text-tan">
              <p>(412) 391-2752</p>
              <p>info@butcherandtherye.com</p>
              <div className="flex gap-6">
                {[
                  {
                    name: "Instagram",
                    href: "https://www.instagram.com/butcherandtheryepgh",
                  },
                  {
                    name: "Facebook",
                    href: "https://www.facebook.com/butcherandtherye",
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className="text-amber transition-colors hover:text-cream"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-cream/10 py-12 md:border-t-0 md:px-16 md:py-0">
            <span className="text-xs text-amber uppercase">Find Us</span>
            <h3 className="mt-4 font-display text-3xl text-cream">Location</h3>
            <div className="mt-6 space-y-3 text-tan">
              <p>212 6th Street</p>
              <p>Pittsburgh, PA 15222</p>
            </div>
          </div>

          <div className="border-t border-cream/10 pt-12 md:border-t-0 md:pt-0 md:pl-16">
            <span className="text-xs text-amber uppercase">Visit</span>
            <h3 className="mt-4 font-display text-3xl text-cream">Hours</h3>
            <div className="mt-6 space-y-3 text-tan">
              <div className="flex justify-between">
                <span>Wed - Sat</span>
                <span>5pm - 10pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 px-8 py-6 md:px-16">
        <div className="flex flex-col items-center gap-3 text-center text-xs text-tan/40 md:flex-row md:justify-between md:gap-0 md:text-left">
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
