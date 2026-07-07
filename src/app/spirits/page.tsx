import { fetchQuery } from "convex/nextjs"
import { Metadata } from "next"
import { MenuList } from "~/components/menu-list"
import { api } from "../../../convex/_generated/api"

export const metadata: Metadata = {
  title: "Spirits",
}

const CATEGORY_LABELS: Record<string, string> = {
  Whiskey: "The Cellar",
  Gin: "Botanical",
  "Rum & Mezcal": "Smoke & Cane",
  "Cognac & Armagnac": "Aged & Noble",
}

export default async function Spirits() {
  // Server-render the menu (see food/page.tsx) to avoid the post-hydration
  // content pop-in that was causing layout shift.
  const [items, menuPdfUrl] = await Promise.all([
    fetchQuery(api.menu.list, { kind: "spirit" }),
    fetchQuery(api.site.getMenuPdfUrl, { kind: "spirit" }),
  ])
  return (
    <MenuList
      basePath="/spirits"
      categoryLabels={CATEGORY_LABELS}
      items={items}
      menuPdfUrl={menuPdfUrl}
    />
  )
}
