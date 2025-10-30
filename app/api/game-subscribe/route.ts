import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "public", "subscribers.json")

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

async function getSubscribers() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function saveSubscribers(subscribers: any[]) {
  const dir = path.dirname(DATA_FILE)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2))
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const email = String(form.get("email") || "")
    const source = String(form.get("source") || "")

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    const subscribers = await getSubscribers()
    const exists = subscribers.some((s: any) => s.email === email)
    if (exists) {
      return NextResponse.json({ success: true, message: "You are already subscribed!" })
    }

    subscribers.push({
      email,
      source: source || "arcade",
      subscribedAt: new Date().toISOString(),
      note: "30-min free consulting via arcade",
    })
    await saveSubscribers(subscribers)

    return NextResponse.json({ success: true, message: "Saved" })
  } catch (e) {
    return NextResponse.json(
      { success: false, message: "Something went wrong.", error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    )
  }
}


