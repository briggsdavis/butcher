import { Metadata } from "next"
import { MenuAdmin } from "../menu/menu-admin"
import { requireAdminPage } from "../require-admin"

export const metadata: Metadata = { title: "Spirits · Admin" }

export default async function AdminSpiritsPage() {
  await requireAdminPage()
  return (
    <MenuAdmin
      kind="spirit"
      title="Spirits"
      eyebrow="Bar"
      basePath="/admin/spirits"
    />
  )
}
