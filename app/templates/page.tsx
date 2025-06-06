import { Suspense } from "react"

import { getUser } from "@/lib/supabase/auth"
import { TemplateLibrary } from "@/components/template-library"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default async function TemplatesPage() {
  const user = await getUser()

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TemplateLibrary user={user} />
    </Suspense>
  )
}
