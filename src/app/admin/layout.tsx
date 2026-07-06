import type { ReactNode } from "react"
import { AdminFrame } from "./admin-frame"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminFrame>{children}</AdminFrame>
}
