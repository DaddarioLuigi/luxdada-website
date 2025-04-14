import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

// Store data in a JSON file in the public directory which is writable
const DATA_FILE = path.join(process.cwd(), "public", "subscribers.json")

// Function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Get current subscribers
async function getSubscribers() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist or has invalid JSON, return empty array
    return []
  }
}

// Save subscribers to file
async function saveSubscribers(subscribers: any[]) {
  // Create directory if it doesn't exist
  const dir = path.dirname(DATA_FILE)
  await fs.mkdir(dir, { recursive: true })

  // Write data to file
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get("email") as string

    console.log("API route called with email:", email)

    // Validate the email
    if (!email || !isValidEmail(email)) {
      console.log("Invalid email:", email)
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    // Get current subscribers
    console.log("Getting current subscribers")
    const subscribers = await getSubscribers()
    console.log("Current subscribers:", subscribers)

    // Check if email already exists
    const exists = subscribers.some((sub: any) => sub.email === email)
    console.log("Email exists:", exists)
    if (exists) {
      return NextResponse.json(
        { success: true, message: "You are already subscribed!" },
        { status: 200 }
      )
    }

    // Add new subscriber
    console.log("Adding new subscriber")
    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
    })

    // Save updated subscribers
    console.log("Saving updated subscribers")
    await saveSubscribers(subscribers)
    console.log("Subscribers saved successfully")

    return NextResponse.json(
      { success: true, message: "Thank you for subscribing! We'll notify you when we launch." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error saving subscriber:", error)
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    )
  }
} 