import { Metadata } from "next"
import { MenuAdmin } from "../menu/menu-admin"

export const metadata: Metadata = { title: "Spirits · Admin" }

export default function AdminSpiritsPage() {
  return <MenuAdmin kind="spirit" title="Spirits" eyebrow="Bar" basePath="/admin/spirits" />
}
