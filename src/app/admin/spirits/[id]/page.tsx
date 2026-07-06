import { Metadata } from "next"
import type { Id } from "../../../../../convex/_generated/dataModel"
import { MenuForm } from "../../menu/menu-form"
import { requireAdminPage } from "../../require-admin"

export const metadata: Metadata = { title: "Edit item · Spirits · Admin" }

export default async function EditSpiritItemPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage()
  const { id } = await params
  return (
    <MenuForm
      mode="edit"
      kind="spirit"
      basePath="/admin/spirits"
      titleLabel="Spirits"
      id={id as Id<"menuItems">}
    />
  )
}
