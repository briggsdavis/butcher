import { Suspense } from "react"
import { AdminAuthForm } from "../auth-form"

export default function AdminSignupPage() {
  return (
    <Suspense>
      <AdminAuthForm mode="signUp" />
    </Suspense>
  )
}
