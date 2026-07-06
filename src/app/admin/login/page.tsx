import { Suspense } from "react"
import { AdminAuthForm } from "../auth-form"

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminAuthForm mode="signIn" />
    </Suspense>
  )
}
