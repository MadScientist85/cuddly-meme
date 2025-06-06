import { createServerClient, createRouteClient } from "./server"
import { createClient } from "./client"
import type { Database } from "@/lib/db_types"

type Tables = Database["public"]["Tables"]
type Chat = Tables["chats"]["Row"]
type Message = Tables["messages"]["Row"]
type Template = Tables["templates"]["Row"]
type Document = Tables["documents"]["Row"]
type ReferenceMaterial = Tables["reference_materials"]["Row"]

// Chat operations
export async function createChat(title: string, description?: string, category?: string) {
  const supabase = createRouteClient()

  const { data, error } = await supabase
    .from("chats")
    .insert({
      title,
      description,
      category: category as any,
      user_id: (await supabase.auth.getUser()).data.user?.id!,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating chat:", error)
    throw error
  }

  return data
}

export async function getUserChats(userId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching user chats:", error)
    throw error
  }

  return data
}

export async function getChatById(chatId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("chats").select("*").eq("id", chatId).single()

  if (error) {
    console.error("Error fetching chat:", error)
    throw error
  }

  return data
}

export async function getChatMessages(chatId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching chat messages:", error)
    throw error
  }

  return data
}

export async function addMessage(
  chatId: string,
  role: "user" | "assistant" | "system",
  content: string,
  metadata?: Record<string, any>,
) {
  const supabase = createRouteClient()

  const { data, error } = await supabase
    .from("messages")
    .insert({
      chat_id: chatId,
      role,
      content,
      metadata: metadata || {},
    })
    .select()
    .single()

  if (error) {
    console.error("Error adding message:", error)
    throw error
  }

  return data
}

// Template operations
export async function getPublicTemplates() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("is_public", true)
    .order("usage_count", { ascending: false })

  if (error) {
    console.error("Error fetching public templates:", error)
    throw error
  }

  return data
}

export async function getUserTemplates(userId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching user templates:", error)
    throw error
  }

  return data
}

export async function createTemplate(template: {
  title: string
  description?: string
  content: string
  category: string
  tags?: string[]
  is_public?: boolean
  variables?: Record<string, any>
}) {
  const supabase = createRouteClient()
  const user = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("templates")
    .insert({
      ...template,
      user_id: user.data.user?.id!,
      category: template.category as any,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating template:", error)
    throw error
  }

  return data
}

// Reference materials operations
export async function getReferenceMaterials(tags?: string[], category?: string) {
  const supabase = createClient()

  let query = supabase.from("reference_materials").select("*").eq("is_active", true)

  if (tags && tags.length > 0) {
    query = query.overlaps("tags", tags)
  }

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching reference materials:", error)
    throw error
  }

  return data
}

// Document operations
export async function createDocument(document: {
  title: string
  content: string
  category?: string
  chat_id?: string
  template_id?: string
  metadata?: Record<string, any>
}) {
  const supabase = createRouteClient()
  const user = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("documents")
    .insert({
      ...document,
      user_id: user.data.user?.id!,
      category: document.category as any,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating document:", error)
    throw error
  }

  return data
}

export async function getUserDocuments(userId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching user documents:", error)
    throw error
  }

  return data
}

// Share operations
export async function shareChat(chatId: string) {
  const supabase = createRouteClient()

  const { data, error } = await supabase.rpc("share_chat", {
    chat_uuid: chatId,
  })

  if (error) {
    console.error("Error sharing chat:", error)
    throw error
  }

  return data
}

export async function getSharedChat(shareToken: string) {
  const supabase = createClient()

  const { data, error } = await supabase.rpc("get_shared_chat", {
    token: shareToken,
  })

  if (error) {
    console.error("Error fetching shared chat:", error)
    throw error
  }

  return data?.[0] || null
}
