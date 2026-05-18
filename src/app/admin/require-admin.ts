import { redirect } from "next/navigation"
import { fetchAuthQuery, isAuthenticated } from "~/lib/auth-server"
import { api } from "../../../convex/_generated/api"

export async function requireAdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login")
  try {
    await fetchAuthQuery(api.auth.requireAdmin, {})
  } catch {
    redirect("/admin/login?reason=not-authorized")
  }
}
