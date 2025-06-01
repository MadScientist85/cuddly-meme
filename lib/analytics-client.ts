"use client"

// Client-side analytics without exposing sensitive keys
export const trackClientEvent = async (eventName: string, data?: any) => {
  try {
    // Send to server action instead of directly to analytics service
    const response = await fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ eventName, data }),
    })

    if (!response.ok) {
      throw new Error("Analytics request failed")
    }
  } catch (error) {
    console.error("Client analytics error:", error)
  }
}
