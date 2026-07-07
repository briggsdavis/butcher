import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"
import { Metadata } from "next"
import { Courier_Prime, Caveat } from "next/font/google"
import { ReactNode } from "react"
import { ConvexClientProvider } from "~/components/convex-client-provider"
import { SiteChrome } from "~/components/site-chrome"
// eslint-disable-next-line import/no-unassigned-import
import "~/styles/styles.css"

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-courier-prime",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-reenie-beanie",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Butcher and the Rye",
    template: "%s · Butcher and the Rye",
  },
  description:
    "Butcher and the Rye is a Pittsburgh restaurant and whiskey bar serving dry-aged cuts, craft cocktails, and an unhurried evening around a well-set table. Reserve a table today.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
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
    <ConvexAuthNextjsServerProvider>
      <html lang="en" className={`${courierPrime.variable} ${caveat.variable} antialiased`}>
        <body className="bg-charcoal font-sans text-cream">
          <ConvexClientProvider>
            <SiteChrome>{children}</SiteChrome>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  )
}
