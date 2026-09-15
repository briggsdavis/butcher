import type { MetadataRoute } from "next"

const SITE_URL = "https://butcherandtherye.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/food`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/beverages`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/spirits`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${SITE_URL}/butcher-and-the-rye-guide`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${SITE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
  ]
}
