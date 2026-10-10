import type { Metadata } from "next"
import { PopupEditor } from "../popup-editor"

export const metadata: Metadata = { title: "New popup · Admin" }

export default function NewPopupPage() {
  return <PopupEditor />
}
