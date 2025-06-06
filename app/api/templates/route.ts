import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import { createTemplate, getUserTemplates } from "@/lib/supabase/database"

export async function GET(req: NextRequest) {
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

    const templates = await getUserTemplates(user.id)

    return NextResponse.json({ templates })
  } catch (error) {
    console.error("Templates GET API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

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

    const templateData = await req.json()
    const template = await createTemplate(templateData)

    return NextResponse.json({ template })
  } catch (error) {
    console.error("Templates POST API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
