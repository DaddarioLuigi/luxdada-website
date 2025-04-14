import { NextRequest, NextResponse } from "next/server"
import mailchimp from "@mailchimp/mailchimp_marketing"

// Initialize Mailchimp
const apiKey = process.env.MAILCHIMP_API_KEY || "your-api-key-here"
const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX || "us1"

console.log("Initializing Mailchimp with API key:", apiKey ? "API key is set" : "API key is missing")
console.log("Server prefix:", serverPrefix)

mailchimp.setConfig({
  apiKey,
  server: serverPrefix,
})

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

    // Get the list ID from environment variables or use a default
    const listId = process.env.MAILCHIMP_LIST_ID || "your-list-id-here"
    console.log("Using list ID:", listId ? "List ID is set" : "List ID is missing")

    try {
      // Add subscriber to Mailchimp
      console.log("Adding subscriber to Mailchimp:", email)
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
      })
      console.log("Mailchimp response:", response)

      return NextResponse.json(
        { success: true, message: "Thank you for subscribing! We'll notify you when we launch." },
        { status: 200 }
      )
    } catch (mailchimpError: any) {
      console.error("Mailchimp error:", mailchimpError)
      
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