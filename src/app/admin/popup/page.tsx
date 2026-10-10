import type { Metadata } from "next"
import { PopupList } from "./popup-list"

export const metadata: Metadata = { title: "Popups · Admin" }

export default function AdminPopupsPage() {
  return <PopupList />
}
