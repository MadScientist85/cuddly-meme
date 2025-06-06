import { redirect } from "next/navigation"

import { getUser } from "@/lib/supabase/auth"
import { SignUpForm } from "@/components/auth/signup-form"

export default async function SignUpPage() {
  const user = await getUser()

  if (user) {
    redirect("/")
  }

  return <SignUpForm />
}
