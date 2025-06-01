"use server"
import "server-only"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/db_types"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import type { Chat } from "@/lib/types"
import { nanoid } from "@/lib/utils"

// Anonymous user ID for storing chats without authentication
const ANONYMOUS_USER_ID = "00000000-0000-0000-0000-000000000000"

export async function getChats() {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    })

    // Get public chats or recent chats
    const { data } = await supabase
      .from("chats")
      .select("payload")
      .order("payload->createdAt", { ascending: false })
      .eq("user_id", ANONYMOUS_USER_ID)
      .limit(10)
      .throwOnError()

    return (data?.map((entry) => entry.payload) as Chat[]) ?? []
  } catch (error) {
    console.error("Error fetching chats:", error)
    return []
  }
}

export async function getChat(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  })
  const { data } = await supabase.from("chats").select("payload").eq("id", id).maybeSingle()

  return (data?.payload as Chat) ?? null
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    })
    await supabase.from("chats").delete().eq("id", id).throwOnError()

    revalidatePath("/")
    return revalidatePath(path)
  } catch (error) {
    console.error("Error removing chat:", error)
    return {
      error: "Failed to remove chat",
    }
  }
}

export async function clearChats() {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    })
    await supabase.from("chats").delete().eq("user_id", ANONYMOUS_USER_ID).throwOnError()

    revalidatePath("/")
    return redirect("/")
  } catch (error) {
    console.error("Error clearing chats:", error)
    return {
      error: "Failed to clear chats",
    }
  }
}

export async function saveChat(chat: Partial<Chat>) {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore,
    })

    const id = chat.id || nanoid()
    const now = new Date()

    const payload = {
      id,
      title: chat.title || "New Chat",
      userId: ANONYMOUS_USER_ID,
      createdAt: chat.createdAt || now,
      path: chat.path || `/chat/${id}`,
      messages: chat.messages || [],
    }

    await supabase
      .from("chats")
      .upsert({
        id,
        payload,
        user_id: ANONYMOUS_USER_ID,
      })
      .throwOnError()

    return payload as Chat
  } catch (error) {
    console.error("Error saving chat:", error)
    return null
  }
}

export async function getSharedChat(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  })
  const { data } = await supabase
    .from("chats")
    .select("payload")
    .eq("id", id)
    .not("payload->sharePath", "is", null)
    .maybeSingle()

  return (data?.payload as Chat) ?? null
}

export async function shareChat(chat: Chat) {
  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`,
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore,
  })
  await supabase
    .from("chats")
    .update({ payload: payload as any })
    .eq("id", chat.id)
    .throwOnError()

  return payload
}
