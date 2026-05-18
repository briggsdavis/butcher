import { Metadata } from "next"
import type { Id } from "../../../../../convex/_generated/dataModel"
import { MenuForm } from "../../menu/menu-form"
import { requireAdminPage } from "../../require-admin"

export const metadata: Metadata = { title: "Edit item · Beverages · Admin" }

export default async function EditBeverageItemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdminPage()
  const { id } = await params
  return (
    <MenuForm
      mode="edit"
      kind="beverage"
      basePath="/admin/beverages"
      titleLabel="Beverages"
      id={id as Id<"menuItems">}
    />
  )
}
