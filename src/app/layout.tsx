import { Metadata } from "next"
import {
  Cedarville_Cursive,
  DM_Sans,
  Libre_Baskerville,
} from "next/font/google"
import { ReactNode } from "react"
import { SiteChrome } from "~/components/site-chrome"
import "~/styles/styles.css"

const cursive = Cedarville_Cursive({
  weight: "400",
  variable: "--font-cursive",
})
const display = Libre_Baskerville({ variable: "--font-display" })
const sans = DM_Sans({ variable: "--font-sans" })

export const metadata: Metadata = {
  title: {
    default: "Butcher and the Rye",
    template: "%s · Butcher and the Rye",
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cursive.variable} ${display.variable} ${sans.variable} antialiased`}
    >
      <body className="bg-charcoal font-sans text-cream">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
