import { type NextRequest, NextResponse } from "next/server"
import { getAnalyticsConfig } from "@/lib/analytics-server"

export async function POST(request: NextRequest) {
  try {
    const { eventName, data } = await request.json()
    const config = getAnalyticsConfig()

    if (!config.isEnabled) {
      return NextResponse.json({ success: true, message: "Analytics disabled" })
    }

    // Server-side analytics tracking with secure API key
    // The sensitive key never leaves the server
    console.log(`[Server Analytics] ${eventName}`, data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ success: false, error: "Analytics tracking failed" }, { status: 500 })
  }
}
