import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/db_types"

export const runtime = "edge"
export const maxDuration = 30

const ANONYMOUS_USER_ID = "00000000-0000-0000-0000-000000000000"

export async function POST(req: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    })

    const json = await req.json()
    const { messages, task, provider } = json

    // Use anonymous user ID for all requests
    const userId = ANONYMOUS_USER_ID

    // System prompt based on task type
    const systemPrompts = {
      hearing_request:
        "You are a legal assistant specializing in Oklahoma post-conviction relief and trauma-informed sentencing. Help draft hearing requests and legal motions.",
      constitutional_argument:
        "You are a constitutional law expert. Help craft arguments based on constitutional principles and precedents.",
      statutory_analysis:
        "You are a legal analyst specializing in statutory interpretation. Help analyze and interpret legal statutes.",
      default:
        "You are a helpful legal AI assistant. Provide accurate, well-researched legal information and assistance.",
    }

    const systemPrompt = systemPrompts[task as keyof typeof systemPrompts] || systemPrompts.default

    const result = streamText({
      model: openai("gpt-3.5-turbo"),
      system: systemPrompt,
      messages,
    })

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        if (error == null) return "Unknown error occurred"
        if (typeof error === "string") return error
        if (error instanceof Error) return error.message
        return JSON.stringify(error)
      },
      async onCompletion(completion) {
        // Save the conversation to database
        try {
          const title = messages[0]?.content?.substring(0, 100) || "Legal Consultation"
          const id = crypto.randomUUID()
          const createdAt = Date.now()
          const path = `/chat/${id}`

          const payload = {
            id,
            title,
            userId,
            createdAt,
            path,
            task,
            provider,
            messages: [
              ...messages,
              {
                content: completion,
                role: "assistant",
              },
            ],
          }

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
  } catch (error) {
    console.error("API Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
