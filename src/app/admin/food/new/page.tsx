import { Metadata } from "next"
import { MenuForm } from "../../menu/menu-form"
import { requireAdminPage } from "../../require-admin"

export const metadata: Metadata = { title: "New item · Food · Admin" }

export default async function NewFoodItemPage() {
  await requireAdminPage()
  return <MenuForm mode="create" kind="food" basePath="/admin/food" titleLabel="Food" />
}
