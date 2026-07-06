import { Metadata } from "next"
import { MenuAdmin } from "../menu/menu-admin"
import { requireAdminPage } from "../require-admin"

export const metadata: Metadata = { title: "Food · Admin" }

export default async function AdminFoodPage() {
  await requireAdminPage()
  return <MenuAdmin kind="food" title="Food" eyebrow="Menu" basePath="/admin/food" />
}
