"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "~/lib/auth-client"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setPending(true)
    const res = await authClient.signIn.email({ email, password })
    setPending(false)
    if (res.error) {
      setError(res.error.message ?? "Sign-in failed.")
      return
    }
    router.push("/admin")
    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-oxblood px-8">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-4">
          <span className="block h-px w-10 shrink-0 bg-amber/50" />
          <span className="text-xs text-amber uppercase">Staff Entrance</span>
        </div>
        <h1 className="heading-emboss mt-4 font-display text-5xl text-cream">
          Sign in
        </h1>

        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs text-amber uppercase">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs text-amber uppercase">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"
            />
          </label>

          {error && <p className="font-subhead text-sm text-amber">{error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 border border-amber px-10 py-4 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream hover:shadow-[0_4px_24px_rgba(213,137,54,0.35)] disabled:opacity-50"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  )
}
