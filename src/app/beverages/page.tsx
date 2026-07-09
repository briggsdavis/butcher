import { fetchQuery } from "convex/nextjs"
import { Metadata } from "next"
import { MenuList } from "~/components/menu-list"
import { api } from "../../../convex/_generated/api"

export const metadata: Metadata = {
  title: "Beverages",
}

const CATEGORY_LABELS: Record<string, string> = {
  Cocktails: "Crafted",
  "Red Wine": "The Cellar",
  "White & Sparkling": "Light & Bright",
  "Non-Alcoholic": "Zero Proof",
}

export default async function Beverages() {
  // Server-render the menu (see food/page.tsx) to avoid the post-hydration
  // content pop-in that was causing layout shift.
  const [items, menuPdfUrl] = await Promise.all([
    fetchQuery(api.menu.list, { kind: "beverage" }),
    fetchQuery(api.site.getMenuPdfUrl, { kind: "beverage" }),
  ])
  return (
    <MenuList
      basePath="/beverages"
      categoryLabels={CATEGORY_LABELS}
      inlinePdf
      items={items}
      menuPdfUrl={menuPdfUrl}
    />
  )
}
