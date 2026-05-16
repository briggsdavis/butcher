import { Metadata } from "next"
import { Courier_Prime, Caveat } from "next/font/google"
import { ReactNode } from "react"
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
    <html
      lang="en"
      className={`${courierPrime.variable} ${caveat.variable} antialiased`}
    >
      <body className="bg-charcoal font-sans text-cream">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
