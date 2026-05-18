import { Metadata } from "next"
import { MenuList } from "~/components/menu-list"

export const metadata: Metadata = {
  title: "Beverages",
}

const CATEGORY_LABELS: Record<string, string> = {
  Cocktails: "Crafted",
  "Red Wine": "The Cellar",
  "White & Sparkling": "Light & Bright",
  "Non-Alcoholic": "Zero Proof",
}

export default function Beverages() {
  return (
    <MenuList
      kind="beverage"
      basePath="/beverages"
      categoryLabels={CATEGORY_LABELS}
    />
  )
}
