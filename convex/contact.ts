"use node"

import { v } from "convex/values"
import { Resend } from "resend"
import { action } from "./_generated/server"

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Butcher and the Rye <onboarding@resend.dev>"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export const send = action({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) throw new Error("RESEND_API_KEY is not configured.")
    const toEmail = process.env.RESEND_TO_EMAIL
    if (!toEmail) throw new Error("RESEND_TO_EMAIL is not configured.")

    const name = args.name.trim().slice(0, 120)
    const email = args.email.trim().slice(0, 240)
    const phone = args.phone?.trim().slice(0, 80) || ""
    const message = args.message.trim().slice(0, 4000)

    if (!name || !email || !message) {
      throw new Error("Name, email, and message are required.")
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Enter a valid email address.")
    }

    const resend = new Resend(apiKey)
    const subject = `Website inquiry from ${name}`
    const plain = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter((line): line is string => line !== null)
      .join("\n")

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
      replyTo: email,
      subject,
      text: plain,
      html: `
        <div>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
        </div>
      `,
    })

    if (error) throw new Error(error.message)
    return { ok: true }
  },
})
