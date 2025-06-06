import { Suspense } from "react"
import { notFound } from "next/navigation"

import { getSharedChat } from "@/lib/supabase/database"
import { SharedChat } from "@/components/shared-chat"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface SharePageProps {
  params: {
    id: string
  }
}

export default async function SharePage({ params }: SharePageProps) {
  const sharedChat = await getSharedChat(params.id)

  if (!sharedChat) {
    notFound()
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SharedChat chat={sharedChat} />
    </Suspense>
  )
}
