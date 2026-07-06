import { Metadata } from "next"
import { MenuAdmin } from "../menu/menu-admin"

export const metadata: Metadata = { title: "Beverages · Admin" }

export default function AdminBeveragesPage() {
  return <MenuAdmin kind="beverage" title="Beverages" eyebrow="Bar" basePath="/admin/beverages" />
}
