"use client"

import { useAction } from "convex/react"
import { Send } from "lucide-react"
import { FormEvent, useState } from "react"
import { api } from "../../convex/_generated/api"

type Status =
  | { kind: "idle" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string }

export function ContactForm() {
  const sendContact = useAction(api.contact.send)
  const [status, setStatus] = useState<Status>({ kind: "idle" })
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setStatus({ kind: "idle" })

    const form = event.currentTarget
    const data = new FormData(form)

    try {
      await sendContact({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        message: String(data.get("message") ?? ""),
      })
      form.reset()
      setStatus({
        kind: "success",
        message: "Your note has been sent. We'll be in touch soon.",
      })
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} data-animate="" data-delay="340" className="mt-12 grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
      <label className="block">
        <span className="text-xs text-tan/50 uppercase">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          className="mt-3 w-full resize-none border border-cream/10 bg-charcoal/60 px-4 py-3 text-sm text-cream transition-colors duration-500 outline-none placeholder:text-tan/30 focus:border-amber"
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="btn-plaque inline-flex w-fit items-center gap-3 px-8 py-3.5 text-xs uppercase disabled:pointer-events-none disabled:opacity-50"
        >
          <Send className="size-4" />
          {submitting ? "Sending" : "Send Message"}
        </button>
        {status.kind !== "idle" && (
          <p className={`text-sm ${status.kind === "success" ? "text-amber" : "text-tan"}`}>
            {status.message}
          </p>
        )}
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string
  name: string
  type?: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="text-xs text-tan/50 uppercase">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-3 w-full border border-cream/10 bg-charcoal/60 px-4 py-3 text-sm text-cream transition-colors duration-500 outline-none placeholder:text-tan/30 focus:border-amber"
      />
    </label>
  )
}
