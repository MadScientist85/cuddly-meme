import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { routeModel } from "@/lib/ai/router"
import { createDocument } from "@/lib/supabase/database"
import { getReferenceMaterials } from "@/lib/supabase/database"

export async function POST(req: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { prompt, provider = "openai", task = "general", templateId, title } = await req.json()

    // Fetch relevant reference materials
    const references = await getReferenceMaterials([task])
    const context = references.map((ref) => `${ref.title}\n${ref.content}`).join("\n\n---\n\n")

    // Construct enhanced prompt with context
    const enhancedPrompt = `
Task: ${task}

Context and Reference Materials:
${context}

User Request:
${prompt}

Please generate a comprehensive legal document based on the above context and request. Follow proper legal formatting and include relevant citations where appropriate.
`

    // Generate document using AI
    const messages = [{ role: "user" as const, content: enhancedPrompt }]
    const generatedContent = await routeModel(messages, provider, task)

    // Save document to database
    const document = await createDocument({
      title: title || "Generated Document",
      content: generatedContent,
      category: task,
      template_id: templateId,
      metadata: {
        provider,
        task,
        generated_at: new Date().toISOString(),
      },
    })

    return NextResponse.json({
      content: generatedContent,
      documentId: document.id,
    })
  } catch (error) {
    console.error("Generate API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
