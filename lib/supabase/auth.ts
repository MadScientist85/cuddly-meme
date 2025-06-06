import { createServerClient } from "./server"
import { createClient } from "./client"
import type { User } from "@supabase/supabase-js"

export async function getSession() {
  const supabase = createServerClient()

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error("Error getting session:", error)
      return null
    }

    return session
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

export async function getUser(): Promise<User | null> {
  const session = await getSession()
  return session?.user ?? null
}

export async function getUserProfile() {
  const user = await getUser()

  if (!user) {
    return null
  }

  const supabase = createServerClient()

  const { data: profile, error } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return {
    ...user,
    ...profile,
  }
}

export async function signOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

export async function signInWithGitHub() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback`,
    },
  })

  if (error) {
    console.error("Error signing in with GitHub:", error)
    throw error
  }

  return data
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Error signing in with email:", error)
    throw error
  }

  return data
}

export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    console.error("Error signing up with email:", error)
    throw error
  }

  return data
}

export async function updateUserProfile(updates: {
  full_name?: string
  avatar_url?: string
  bar_number?: string
  law_firm?: string
  jurisdiction?: string
  specialization?: string[]
  preferences?: Record<string, any>
}) {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from("users")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)
    .select()
    .single()

  if (error) {
    console.error("Error updating user profile:", error)
    throw error
  }

  return data
}
