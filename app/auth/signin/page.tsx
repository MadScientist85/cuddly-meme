import { redirect } from "next/navigation"

import { getUser } from "@/lib/supabase/auth"
import { LoginForm } from "@/components/auth/login-form"

export default async function SignInPage() {
  const user = await getUser()

  if (user) {
    redirect("/")
  }

  return <LoginForm />
}
