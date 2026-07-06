import { Metadata } from "next"
import { MenuAdmin } from "../menu/menu-admin"

export const metadata: Metadata = { title: "Food · Admin" }

export default function AdminFoodPage() {
  return <MenuAdmin kind="food" title="Food" eyebrow="Menu" basePath="/admin/food" />
}
