"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconMessage, IconUser, IconCopy, IconCheck } from "@/components/ui/icons"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Markdown } from "@/components/markdown"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  created_at: string
}

interface SharedChatData {
  id: string
  title: string
  messages: ChatMessage[]
  created_at: string
  shared_by: {
    full_name: string
    email: string
  }
}

interface SharedChatProps {
  shareId: string
}

export function SharedChat({ shareId }: SharedChatProps) {
  const [chatData, setChatData] = useState<SharedChatData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)

  useEffect(() => {
    fetchSharedChat()
  }, [shareId])

  const fetchSharedChat = async () => {
    try {
      const response = await fetch(`/api/share/${shareId}`)

      if (!response.ok) {
        if (response.status === 404) {
          setError("Shared chat not found or has expired")
        } else {
          setError("Failed to load shared chat")
        }
        return
      }

      const data = await response.json()
      setChatData(data)
    } catch (error) {
      setError("An error occurred while loading the chat")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedMessageId(messageId)
      setTimeout(() => setCopiedMessageId(null), 2000)
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <IconMessage className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chat Not Available</h3>
          <p className="text-gray-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!chatData) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{chatData.title}</CardTitle>
            <Badge variant="secondary">Shared Chat</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <IconUser className="h-4 w-4" />
            <span>Shared by {chatData.shared_by.full_name}</span>
            <span>•</span>
            <span>{new Date(chatData.created_at).toLocaleDateString()}</span>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {chatData.messages.map((message) => (
          <Card
            key={message.id}
            className={`${message.role === "user" ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={message.role === "user" ? "default" : "secondary"}>
                    {message.role === "user" ? "User" : "AI Assistant"}
                  </Badge>
                  <span className="text-sm text-gray-500">{new Date(message.created_at).toLocaleTimeString()}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(message.content, message.id)}>
                  {copiedMessageId === message.id ? (
                    <IconCheck className="h-4 w-4 text-green-600" />
                  ) : (
                    <IconCopy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {message.role === "user" ? (
                <p className="whitespace-pre-wrap">{message.content}</p>
              ) : (
                <Markdown content={message.content} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {chatData.messages.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <IconMessage className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Messages</h3>
            <p className="text-gray-500">This chat doesn't contain any messages yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
