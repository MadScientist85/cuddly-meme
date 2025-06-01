import "server-only"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import type { cookies } from "next/headers"

export const auth = async ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>
}) => {
  try {
    // Create a Supabase client configured to use cookies
    const supabase = createServerComponentClient({
      cookies: () => cookieStore,
    })
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.log("Auth error:", error)
      return null
    }
    return data.session
  } catch (error) {
    console.log("Auth failed:", error)
    return null
  }
}
