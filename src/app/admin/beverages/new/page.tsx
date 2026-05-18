import { Metadata } from "next"
import { MenuForm } from "../../menu/menu-form"
import { requireAdminPage } from "../../require-admin"

export const metadata: Metadata = { title: "New item · Beverages · Admin" }

export default async function NewBeverageItemPage() {
  await requireAdminPage()
  return (
    <MenuForm
      mode="create"
      kind="beverage"
      basePath="/admin/beverages"
      titleLabel="Beverages"
    />
  )
}
