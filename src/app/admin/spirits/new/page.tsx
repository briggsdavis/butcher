import { Metadata } from "next"
import { MenuForm } from "../../menu/menu-form"
import { requireAdminPage } from "../../require-admin"

export const metadata: Metadata = { title: "New item · Spirits · Admin" }

export default async function NewSpiritItemPage() {
  await requireAdminPage()
  return (
    <MenuForm
      mode="create"
      kind="spirit"
      basePath="/admin/spirits"
      titleLabel="Spirits"
    />
  )
}
