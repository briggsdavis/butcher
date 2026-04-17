import type { Metadata } from "next"
import { AboutPage } from "~/components/about-page"

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, values, team, and ingredients behind Butcher and the Rye — Pittsburgh's destination for craft cuisine and rare spirits.",
}

export default function About() {
  return <AboutPage />
}
