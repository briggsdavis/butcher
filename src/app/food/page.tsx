import { Metadata } from "next"
import { MenuList } from "~/components/menu-list"

export const metadata: Metadata = {
  title: "Food",
}

const CATEGORY_LABELS: Record<string, string> = {
  Starters: "To Begin",
  Entrees: "From the Fire",
  Sides: "Alongside",
  Desserts: "To Finish",
}

export default function Food() {
  return <MenuList kind="food" basePath="/food" categoryLabels={CATEGORY_LABELS} inlinePdf />
}
