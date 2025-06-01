import "server-only"

// Server-side analytics configuration
export const getAnalyticsConfig = () => {
  return {
    serverApiKey: process.env.STATSIG_SERVER_API_KEY,
    isEnabled: !!process.env.STATSIG_SERVER_API_KEY,
  }
}

// Server action for analytics tracking
export async function trackServerEvent(eventName: string, data?: any) {
  "use server"

  const config = getAnalyticsConfig()

  if (!config.isEnabled) {
    console.log(`[Analytics] ${eventName}`, data)
    return
  }

  try {
    // Server-side analytics tracking logic here
    // This keeps the API key secure on the server
    console.log(`[Analytics] Tracking: ${eventName}`, data)
  } catch (error) {
    console.error("Analytics tracking error:", error)
  }
}
