import { Metadata } from "next"
import { MenuForm } from "../../menu/menu-form"

export const metadata: Metadata = { title: "New item · Spirits · Admin" }

export default function NewSpiritItemPage() {
  return <MenuForm mode="create" kind="spirit" basePath="/admin/spirits" titleLabel="Spirits" />
}
