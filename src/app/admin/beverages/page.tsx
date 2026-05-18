import { Metadata } from "next"
import { MenuAdmin } from "../menu/menu-admin"
import { requireAdminPage } from "../require-admin"

export const metadata: Metadata = { title: "Beverages · Admin" }

export default async function AdminBeveragesPage() {
  await requireAdminPage()
  return (
    <MenuAdmin
      kind="beverage"
      title="Beverages"
      eyebrow="Bar"
      basePath="/admin/beverages"
    />
  )
}
