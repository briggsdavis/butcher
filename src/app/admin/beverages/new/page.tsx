import { Metadata } from "next"
import { MenuForm } from "../../menu/menu-form"

export const metadata: Metadata = { title: "New item · Beverages · Admin" }

export default function NewBeverageItemPage() {
  return (
    <MenuForm mode="create" kind="beverage" basePath="/admin/beverages" titleLabel="Beverages" />
  )
}
