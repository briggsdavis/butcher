import { Metadata } from "next"
import { ReactNode } from "react"
import { SiteChrome } from "~/components/site-chrome"
import "@fontsource/courier-prime/400.css"
import "@fontsource/courier-prime/400-italic.css"
import "@fontsource/courier-prime/700.css"
import "@fontsource/courier-prime/700-italic.css"
import "~/styles/styles.css"

export const metadata: Metadata = {
  title: {
    default: "Butcher and the Rye",
    template: "%s · Butcher and the Rye",
  },
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "Butcher and the Rye",
    images: ["/warm-dining-room.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Butcher and the Rye",
    images: ["/warm-dining-room.jpg"],
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="bg-charcoal font-sans text-cream">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
