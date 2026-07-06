import { Metadata } from "next"
import { MenuForm } from "../../menu/menu-form"

export const metadata: Metadata = { title: "New item · Food · Admin" }

export default function NewFoodItemPage() {
  return <MenuForm mode="create" kind="food" basePath="/admin/food" titleLabel="Food" />
}
