import type { Metadata } from "next"
import { AnnouncementEditor } from "./announcement-editor"

export const metadata: Metadata = { title: "Announcement Bar · Admin" }

export default function AnnouncementPage() {
  return <AnnouncementEditor />
}
