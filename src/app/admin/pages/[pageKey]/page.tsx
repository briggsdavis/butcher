import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { isSitePageKey, SITE_PAGE_DEFINITION_BY_KEY } from "~/lib/site-content"
import { PageContentEditor } from "./page-content-editor"

export const metadata: Metadata = { title: "Edit page · Admin" }

export default async function AdminSitePage({ params }: { params: Promise<{ pageKey: string }> }) {
  const { pageKey } = await params
  if (!isSitePageKey(pageKey)) notFound()

  return <PageContentEditor definition={SITE_PAGE_DEFINITION_BY_KEY[pageKey]} />
}
