import "server-only"
import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/db_types"
import { routeModel } from "@/lib/ai/router"
import { addMessage, createChat } from "@/lib/supabase/database"

export const runtime = "edge"
export const maxDuration = 30

const ANONYMOUS_USER_ID = "00000000-0000-0000-0000-000000000000"

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { messages, chatId, provider = "openai", task = "general" } = await req.json()

    let currentChatId = chatId

    // Create new chat if none exists
    if (!currentChatId) {
      const newChat = await createChat("New Chat", undefined, task)
      currentChatId = newChat.id
    }

    // Add user message to database
    const userMessage = messages[messages.length - 1]
    await addMessage(currentChatId, "user", userMessage.content)

    // Generate AI response
    const response = await routeModel(messages, provider, task)

    // Add AI response to database
    await addMessage(currentChatId, "assistant", response)

    return NextResponse.json({
      response,
      chatId: currentChatId,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
