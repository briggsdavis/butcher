import { fetchQuery } from "convex/nextjs"
import { Metadata } from "next"
import { MenuList } from "~/components/menu-list"
import { api } from "../../../convex/_generated/api"

export const metadata: Metadata = {
  title: "Food",
}

const CATEGORY_LABELS: Record<string, string> = {
  Starters: "To Begin",
  Entrees: "From the Fire",
  Sides: "Alongside",
  Desserts: "To Finish",
}

export default async function Food() {
  // Fetch on the server so the menu is server-rendered into the HTML instead of
  // popping in after hydration — the previous client-only useQuery left the page
  // nearly empty until Convex responded, which caused a large layout shift (CLS).
  const [items, menuPdfUrl] = await Promise.all([
    fetchQuery(api.menu.list, { kind: "food" }),
    fetchQuery(api.site.getMenuPdfUrl, { kind: "food" }),
  ])
  return (
    <MenuList
      basePath="/food"
      categoryLabels={CATEGORY_LABELS}
      inlinePdf
      items={items}
      menuPdfUrl={menuPdfUrl}
    />
  )
}
