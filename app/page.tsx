import { Suspense } from "react"

import { getUser } from "@/lib/supabase/auth"
import { TemplateManagementDashboard } from "@/components/template-management-dashboard"
import { LandingPage } from "@/components/landing-page"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default async function HomePage() {
  const user = await getUser()

  if (!user) {
    return <LandingPage />
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TemplateManagementDashboard />
    </Suspense>
  )
}
