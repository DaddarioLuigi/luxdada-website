import { NextRequest, NextResponse } from "next/server"
import mailchimp from "@mailchimp/mailchimp_marketing"

// Initialize Mailchimp
const apiKey = process.env.MAILCHIMP_API_KEY
const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX
const listId = process.env.MAILCHIMP_LIST_ID

console.log("Environment variables check:")
console.log("- MAILCHIMP_API_KEY exists:", !!apiKey)
console.log("- MAILCHIMP_SERVER_PREFIX:", serverPrefix)
console.log("- MAILCHIMP_LIST_ID:", listId)

// Validate required environment variables
if (!apiKey) {
  console.error("MAILCHIMP_API_KEY is not set")
  throw new Error("MAILCHIMP_API_KEY environment variable is not set")
}

if (!serverPrefix) {
  console.error("MAILCHIMP_SERVER_PREFIX is not set")
  throw new Error("MAILCHIMP_SERVER_PREFIX environment variable is not set")
}

if (!listId) {
  console.error("MAILCHIMP_LIST_ID is not set")
  throw new Error("MAILCHIMP_LIST_ID environment variable is not set")
}

// Extract datacenter from API key to verify it matches server prefix
const apiKeyDatacenter = apiKey.split('-')[1]
console.log("API Key datacenter:", apiKeyDatacenter)
console.log("Server prefix:", serverPrefix)

if (apiKeyDatacenter !== serverPrefix) {
  console.error(`Server prefix mismatch: API key datacenter is ${apiKeyDatacenter} but server prefix is set to ${serverPrefix}`)
  throw new Error("Mailchimp server prefix does not match API key datacenter")
}

console.log("Initializing Mailchimp with:")
console.log("- Server prefix:", serverPrefix)
console.log("- List ID:", listId)
console.log("- API Key (first 6 chars):", apiKey.substring(0, 6))

mailchimp.setConfig({
  apiKey: apiKey,
  server: serverPrefix,
})

// Function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    // Test Mailchimp configuration with a simpler API call
    try {
      const response = await mailchimp.ping.get()
      console.log("Mailchimp configuration verified successfully")
    } catch (error: any) {
      console.error("Failed to verify Mailchimp configuration:", {
        status: error.status,
        message: error.message,
        response: error.response?.text,
        headers: error.response?.headers
      })
      throw new Error(`Failed to verify Mailchimp configuration: ${error.message}`)
    }

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

    try {
      // Add subscriber to Mailchimp
      console.log("Adding subscriber to Mailchimp:", email)
      console.log("Using list ID for subscription:", listId)
      
      const response = await mailchimp.lists.addListMember(listId as string, {
        email_address: email,
        status: "subscribed",
      })
      console.log("Mailchimp response:", response)

      return NextResponse.json(
        { success: true, message: "Thank you for subscribing! We'll notify you when we launch." },
        { status: 200 }
      )
    } catch (mailchimpError: any) {
      console.error("Mailchimp error details:", {
        status: mailchimpError.status,
        message: mailchimpError.message,
        response: mailchimpError.response?.text,
        headers: mailchimpError.response?.headers
      })
      
      // Check if the error is because the email is already subscribed
      if (mailchimpError.status === 400 && mailchimpError.response?.text) {
        try {
          const errorData = JSON.parse(mailchimpError.response.text)
          console.log("Mailchimp error data:", errorData)
          
          if (errorData.title === "Member Exists") {
            return NextResponse.json(
              { success: true, message: "You are already subscribed!" },
              { status: 200 }
            )
          }
        } catch (parseError) {
          console.error("Error parsing Mailchimp error response:", parseError)
        }
      }
      
      // Return the error message from Mailchimp
      return NextResponse.json(
        { 
          success: false, 
          message: "Failed to subscribe. Please try again later.",
          error: mailchimpError.message || "Unknown error",
          details: mailchimpError.response?.text || "No additional details available"
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
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
} 