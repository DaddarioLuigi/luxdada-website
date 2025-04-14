import { NextRequest, NextResponse } from "next/server"

// In-memory storage for subscribers
// Note: This will be reset when the server restarts
let subscribers: { email: string; subscribedAt: string }[] = []

// Function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
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

    // Check if email already exists
    const exists = subscribers.some(sub => sub.email === email)
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
    console.log("Current subscribers:", subscribers)

    return NextResponse.json(
      { success: true, message: "Thank you for subscribing! We'll notify you when we launch." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error in API route:", error)
    // Return more detailed error information
    return NextResponse.json(
      { 
        success: false, 
        message: "Something went wrong. Please try again later.",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
} 