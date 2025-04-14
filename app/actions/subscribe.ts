"use server"

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

// Server action to handle subscription
export async function subscribeEmail(formData: FormData) {
  const email = formData.get("email") as string

  // Validate the email
  if (!email || !isValidEmail(email)) {
    return { success: false, message: "Please provide a valid email address." }
  }

  try {
    // Get current subscribers
    const subscribers = await getSubscribers()

    // Check if email already exists
    const exists = subscribers.some((sub: any) => sub.email === email)
    if (exists) {
      return { success: true, message: "You are already subscribed!" }
    }

    // Add new subscriber
    subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
    })

    // Save updated subscribers
    await saveSubscribers(subscribers)

    return { success: true, message: "Thank you for subscribing! We'll notify you when we launch." }
  } catch (error) {
    console.error("Error saving subscriber:", error)
    return { success: false, message: "Something went wrong. Please try again later." }
  }
}
