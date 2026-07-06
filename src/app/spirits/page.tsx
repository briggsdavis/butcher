import { Metadata } from "next"
import { MenuList } from "~/components/menu-list"

export const metadata: Metadata = {
  title: "Spirits",
}

const CATEGORY_LABELS: Record<string, string> = {
  Whiskey: "The Cellar",
  Gin: "Botanical",
  "Rum & Mezcal": "Smoke & Cane",
  "Cognac & Armagnac": "Aged & Noble",
}

export default function Spirits() {
  return <MenuList kind="spirit" basePath="/spirits" categoryLabels={CATEGORY_LABELS} />
}
