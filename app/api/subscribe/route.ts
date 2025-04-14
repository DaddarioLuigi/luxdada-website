import { NextRequest, NextResponse } from "next/server"
import mailchimp from "@mailchimp/mailchimp_marketing"

// Initialize Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY || "your-api-key-here",
  server: process.env.MAILCHIMP_SERVER_PREFIX || "us1", // e.g., "us1" for US server
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
        const errorData = JSON.parse(mailchimpError.response.text)
        if (errorData.title === "Member Exists") {
          return NextResponse.json(
            { success: true, message: "You are already subscribed!" },
            { status: 200 }
          )
        }
      }
      
      // Return the error message from Mailchimp
      return NextResponse.json(
        { 
          success: false, 
          message: "Failed to subscribe. Please try again later.",
          error: mailchimpError.message || "Unknown error"
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