"use client"

import { useState } from "react"

export function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onLogin()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2e8d8]">
      <div className="w-full max-w-sm">
        {/* Wordmark */}
        <div className="mb-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30">
            Content Management
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-black">
            Butcher & the Rye
          </h1>
        </div>

        {/* Card */}
        <div className="border border-black/[0.1] bg-white p-8">
          <h2 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-black/40">
            Sign In
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-black/40">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                className="w-full border border-black/[0.12] bg-[#f2e8d8]/40 px-3 py-2.5 text-sm text-black placeholder-black/20 focus:border-black focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-black/40">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full border border-black/[0.12] bg-[#f2e8d8]/40 px-3 py-2.5 text-sm text-black placeholder-black/20 focus:border-black focus:bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full bg-black py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-black/80"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[10px] text-black/25">
          No credentials required for this build.
        </p>
      </div>
    </div>
  )
}
