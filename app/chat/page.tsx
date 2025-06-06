import { redirect } from "next/navigation"
import { nanoid } from "nanoid"

export default function ChatPage() {
  const id = nanoid()
  redirect(`/chat/${id}`)
}
