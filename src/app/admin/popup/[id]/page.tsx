import type { Metadata } from "next"
import type { Id } from "../../../../../convex/_generated/dataModel"
import { PopupEditor } from "../popup-editor"

export const metadata: Metadata = { title: "Edit popup · Admin" }

export default async function EditPopupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <PopupEditor id={id as Id<"popups">} />
}
