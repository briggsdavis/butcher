"use client"

import { useAuthActions } from "@convex-dev/auth/react"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function SignOutButton() {
  const router = useRouter()
  const { signOut } = useAuthActions()

  return (
    <button
      type="button"
      onClick={async () => {
        await signOut()
        router.push("/admin/login")
        router.refresh()
      }}
      className="flex w-full cursor-pointer items-center justify-center gap-2 border border-amber px-6 py-3 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream"
    >
      <LogOut className="size-3.5" />
      Sign out
    </button>
  )
}
