import { NextRequest, NextResponse } from "next/server"
import mailchimp from "@mailchimp/mailchimp_marketing"

export const runtime = "nodejs"

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function getMailchimpEnv():
  | { ok: true; apiKey: string; serverPrefix: string; listId: string }
  | { ok: false; message: string } {
  const apiKey = process.env.MAILCHIMP_API_KEY
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX
  const listId = process.env.MAILCHIMP_LIST_ID

  if (!apiKey) {
    return { ok: false, message: "MAILCHIMP_API_KEY environment variable is not set" }
  }
  if (!serverPrefix) {
    return { ok: false, message: "MAILCHIMP_SERVER_PREFIX environment variable is not set" }
  }
  if (!listId) {
    return { ok: false, message: "MAILCHIMP_LIST_ID environment variable is not set" }
  }

  const apiKeyDatacenter = apiKey.split("-")[1]
  if (apiKeyDatacenter !== serverPrefix) {
    return {
      ok: false,
      message: "Mailchimp server prefix does not match API key datacenter",
    }
  }

  return { ok: true, apiKey, serverPrefix, listId }
}

export async function POST(request: NextRequest) {
  const cfg = getMailchimpEnv()
  if (!cfg.ok) {
    console.error(cfg.message)
    return NextResponse.json(
      { success: false, message: "Newsletter signup is not configured on this deployment." },
      { status: 503 }
    )
  }

  mailchimp.setConfig({
    apiKey: cfg.apiKey,
    server: cfg.serverPrefix,
  })

  try {
    try {
      await mailchimp.ping.get()
    } catch (error: unknown) {
      const err = error as { status?: number; message?: string; response?: { text?: string; headers?: unknown } }
      console.error("Failed to verify Mailchimp configuration:", {
        status: err.status,
        message: err.message,
        response: err.response?.text,
        headers: err.response?.headers,
      })
      throw new Error(`Failed to verify Mailchimp configuration: ${err.message}`)
    }

    const formData = await request.formData()
    const email = formData.get("email") as string

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    try {
      await mailchimp.lists.addListMember(cfg.listId, {
        email_address: email,
        status: "subscribed",
      })

      return NextResponse.json(
        {
          success: true,
          message: "Thank you for subscribing! We'll notify you when we launch.",
        },
        { status: 200 }
      )
    } catch (mailchimpError: unknown) {
      const err = mailchimpError as {
        status?: number
        message?: string
        response?: { text?: string }
      }
      console.error("Mailchimp error details:", {
        status: err.status,
        message: err.message,
        response: err.response?.text,
      })

      if (err.status === 400 && err.response?.text) {
        try {
          const errorData = JSON.parse(err.response.text)
          if (errorData.title === "Member Exists") {
            return NextResponse.json(
              { success: true, message: "You are already subscribed!" },
              { status: 200 }
            )
          }
        } catch {
          /* ignore parse errors */
        }
      }

      return NextResponse.json(
        {
          success: false,
          message: "Failed to subscribe. Please try again later.",
          error: err.message || "Unknown error",
          details: err.response?.text || "No additional details available",
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
