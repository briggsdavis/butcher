import type { Metadata } from "next"
import { StaffPage } from "~/components/staff-page"

export const metadata: Metadata = {
  title: "Our Staff",
  description:
    "Meet the passionate, skilled team behind Butcher and the Rye, from our Executive Chef to our Bar Director.",
}

export default function OurStaff() {
  return <StaffPage />
}
