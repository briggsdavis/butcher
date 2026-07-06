import { fetchQuery } from "convex/nextjs"
import type { Metadata } from "next"
import { StaffPage } from "~/components/staff-page"
import { resolveCommonValues } from "~/lib/common-values"
import { resolveSiteContent } from "~/lib/site-content"
import { api } from "../../../convex/_generated/api"

export const metadata: Metadata = {
  title: "Our Staff",
  description:
    "Meet the passionate, skilled team behind Butcher and the Rye, from our Executive Chef to our Bar Director.",
}

export default async function OurStaff() {
  const [savedContent, savedCommonValues] = await Promise.all([
    fetchQuery(api.site.getPage, { key: "our-staff" }),
    fetchQuery(api.site.getCommonValues, {}),
  ])
  const content = resolveSiteContent("our-staff", savedContent)
  const common = resolveCommonValues(savedCommonValues)

  return <StaffPage content={content} reservationHref={common["reservation.href"]} />
}
