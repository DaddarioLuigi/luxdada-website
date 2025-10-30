import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export const runtime = 'nodejs'

const DIR = path.join(process.cwd(), "public", "trustedby")
const ALLOWED = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"])

export async function GET() {
  try {
    const entries = await fs.readdir(DIR, { withFileTypes: true })
    const files = entries
      .filter((e) => e.isFile())
      .map((e) => e.name)
      .filter((name) => ALLOWED.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))
      .map((name) => `/trustedby/${name}`)
    return NextResponse.json({ logos: files })
  } catch (e) {
    return NextResponse.json({ logos: [] })
  }
}


