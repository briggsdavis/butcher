"use client"

import { useRouter } from "next/navigation"
import { authClient } from "~/lib/auth-client"

export function SignOutButton() {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={async () => {
        await authClient.signOut()
        router.push("/admin/login")
        router.refresh()
      }}
      className="border border-amber px-8 py-4 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)]"
    >
      Sign out
    </button>
  )
}
