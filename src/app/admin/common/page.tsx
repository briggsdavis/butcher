import type { Metadata } from "next"
import { CommonValuesEditor } from "./common-values-editor"

export const metadata: Metadata = { title: "Common values · Admin" }

export default function AdminCommonValuesPage() {
  return <CommonValuesEditor />
}
