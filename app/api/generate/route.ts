import { type NextRequest, NextResponse } from "next/server"
import { generateLegalResponse } from "@/app/actions"
import type { GenerationRequest } from "@/types"

export async function POST(request: NextRequest) {
  try {
    const body: GenerationRequest = await request.json()
    const { prompt, provider, task } = body

    if (!prompt || !provider || !task) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const response = await generateLegalResponse(prompt, provider, task)
    return NextResponse.json(response)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
