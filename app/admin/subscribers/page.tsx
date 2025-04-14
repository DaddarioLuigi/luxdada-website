import fs from "fs/promises"
import path from "path"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define the path for our subscribers file
const DATA_FILE = path.join(process.cwd(), "public", "subscribers.json")

// Function to get subscribers
async function getSubscribers() {
  try {
    // Check if file exists
    try { 
      await fs.access(DATA_FILE)
    } catch (error) {
      // File doesn't exist
      return []
    }

    // Read file
    const data = await fs.readFile(DATA_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading subscribers:", error)
    return []
  }
}

export default async function SubscribersPage() {
  const subscribers = await getSubscribers()

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Subscribers List</CardTitle>
        </CardHeader>
        <CardContent>
          {subscribers.length === 0 ? (
            <p className="text-gray-500">No subscribers yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Subscribed At</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">{subscriber.email}</td>
                      <td className="py-3 px-4">{new Date(subscriber.subscribedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-4 text-sm text-gray-500">Total subscribers: {subscribers.length}</p>
        </CardContent>
      </Card>
    </div>
  )
}
