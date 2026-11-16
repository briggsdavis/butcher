import type { MetadataRoute } from "next"
import { fetchQuery } from "convex/nextjs"
import { api } from "../../convex/_generated/api"

const SITE_URL = "https://butcherandtherye.com"
export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [spirits, spiritsPdf] = await Promise.all([
    fetchQuery(api.menu.list, { kind: "spirit" }),
    fetchQuery(api.site.getMenuPdfUrl, { kind: "spirit" }),
  ])
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/food`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/beverages`, changeFrequency: "weekly", priority: 0.9 },
    ...(spirits.length || spiritsPdf
      ? [{ url: `${SITE_URL}/spirits`, changeFrequency: "weekly" as const, priority: 0.7 }]
      : []),
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${SITE_URL}/butcher-and-the-rye-guide`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
  ]
}
