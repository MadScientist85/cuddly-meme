import "server-only"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/db_types"

import { auth } from "@/auth"
import { nanoid } from "@/lib/utils"

export const runtime = "edge"
export const maxDuration = 30

const ANONYMOUS_USER_ID = "00000000-0000-0000-0000-000000000000"

export async function POST(req: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  })
  const json = await req.json()
  const { messages, previewToken } = json

  // For anonymous access, we'll use a default user ID
  let userId = ANONYMOUS_USER_ID

  try {
    const session = await auth({ cookieStore })
    if (session?.user?.id) {
      userId = session.user.id
    }
  } catch (error) {
    // If auth fails, continue with anonymous user
    console.log("Auth failed, using anonymous user")
  }

  if (previewToken) {
    // Handle preview token if needed
  }

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    system: "You are a helpful assistant.",
    messages,
  })

  return result.toDataStreamResponse({
    getErrorMessage: (error) => {
      if (error == null) {
        return "unknown error"
      }

      if (typeof error === "string") {
        return error
      }

      if (error instanceof Error) {
        return error.message
      }

      return JSON.stringify(error)
    },
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: "assistant",
          },
        ],
      }
      // Insert chat into database.
      try {
        await supabase
          .from("chats")
          .upsert({
            id,
            payload,
            user_id: userId,
          })
          .throwOnError()
      } catch (error) {
        console.error("Error saving chat:", error)
      }
    },
  })
}
