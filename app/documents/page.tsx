import { Suspense } from "react"
import { redirect } from "next/navigation"

import { getUser } from "@/lib/supabase/auth"
import { DocumentLibrary } from "@/components/document-library"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default async function DocumentsPage() {
  const user = await getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DocumentLibrary />
    </Suspense>
  )
}
