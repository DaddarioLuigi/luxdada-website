import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  interest: z.string().optional().default(""),
  message: z.string().min(1),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid input", issues: parsed.error.issues },
        { status: 400 }
      )
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      return NextResponse.json(
        { success: false, message: "Email service not configured (missing RESEND_API_KEY)." },
        { status: 500 }
      )
    }

    const toAddress = "luigi@luxdada.it"
    const fromAddress = process.env.RESEND_FROM || "Luxdada Website <onboarding@resend.dev>"

    const { name, email, company, phone, interest, message } = parsed.data

    const subject = `New contact form submission from ${name}`
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="margin: 0 0 12px;">New Contact Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        ${interest ? `<p><strong>Interest:</strong> ${escapeHtml(interest)}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      </div>
    `

    const payload = {
      from: fromAddress,
      to: [toAddress],
      reply_to: email,
      subject,
      html,
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const errText = await res.text()
      return NextResponse.json(
        { success: false, message: "Failed to send email", details: errText },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Unexpected error", error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}


