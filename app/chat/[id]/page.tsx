import { Suspense } from "react"
import { notFound } from "next/navigation"

import { getUser } from "@/lib/supabase/auth"
import { getChatById } from "@/lib/supabase/database"
import { Chat } from "@/components/chat"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface ChatPageProps {
  params: {
    id: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const user = await getUser()

  if (!user) {
    notFound()
  }

  let chat
  try {
    chat = await getChatById(params.id)
  } catch (error) {
    // Chat doesn't exist, create a new one
    chat = null
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Chat id={params.id} initialChat={chat} />
    </Suspense>
  )
}
