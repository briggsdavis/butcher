"use client"

import { useAuthActions } from "@convex-dev/auth/react"
import { ArrowLeft, LockKeyhole } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

type AuthMode = "signIn" | "signUp"

function authErrorMessage(error: unknown, mode: AuthMode) {
  const message = error instanceof Error ? error.message : String(error)
  if (message.includes("UNAUTHORIZED_ADMIN_EMAIL") || message.includes("not approved")) {
    return "This email is not approved for admin access."
  }
  if (message.includes("Invalid credentials")) {
    return "Email or password is incorrect."
  }
  if (message.toLowerCase().includes("password")) {
    return "Password must be at least 8 characters."
  }
  return mode === "signUp" ? "Sign-up failed." : "Sign-in failed."
}

export function AdminAuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn } = useAuthActions()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const isSignUp = mode === "signUp"

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setPending(true)

    try {
      await signIn("password", { email, password, flow: mode })
      router.push(searchParams.get("next") ?? "/admin")
      router.refresh()
    } catch (err) {
      setError(authErrorMessage(err, mode))
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-oxblood px-8 py-16">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-tan/60 uppercase transition-colors hover:text-amber"
        >
          <ArrowLeft className="size-3.5" />
          Home
        </Link>

        <div className="mt-10 flex items-center gap-4">
          <span className="block h-px w-10 shrink-0 bg-amber/50" />
          <span className="text-xs text-amber uppercase">Staff Entrance</span>
        </div>
        <h1 className="heading-emboss mt-4 font-display text-5xl text-cream">
          {isSignUp ? "Sign up" : "Sign in"}
        </h1>

        <div className="mt-8 grid grid-cols-2 border border-amber/30 text-center text-xs uppercase">
          <Link
            href="/admin/login"
            className={`px-4 py-3 transition-colors ${
              isSignUp ? "text-tan/60 hover:text-amber" : "bg-amber text-oxblood"
            }`}
          >
            Login
          </Link>
          <Link
            href="/admin/signup"
            className={`px-4 py-3 transition-colors ${
              isSignUp ? "bg-amber text-oxblood" : "text-tan/60 hover:text-amber"
            }`}
          >
            Sign up
          </Link>
        </div>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs text-amber uppercase">Email</span>
            <input
              type="email"
              required
              aria-label="Email"
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
              minLength={8}
              aria-label="Password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-amber/40 bg-transparent px-4 py-3 text-cream transition-colors outline-none focus:border-amber"
            />
          </label>

          {error && <p className="font-subhead text-sm text-amber">{error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 flex items-center justify-center gap-2 border border-amber px-10 py-4 text-xs text-amber uppercase transition-all duration-500 hover:-translate-y-0.5 hover:border-cream hover:text-cream disabled:opacity-50"
          >
            <LockKeyhole className="size-3.5" />
            {pending ? "Working..." : isSignUp ? "Create account" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  )
}
