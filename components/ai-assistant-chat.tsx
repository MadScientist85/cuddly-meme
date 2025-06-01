"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { IconSpinner } from "@/components/ui/icons"
import type { Template } from "@/lib/types/template"
import { useChat } from "ai/react"

interface AIAssistantChatProps {
  onTemplateGenerated: (template: Partial<Template>) => void
  currentTemplate?: Template
}

export function AIAssistantChat({ onTemplateGenerated, currentTemplate }: AIAssistantChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [context, setContext] = useState<string>("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/ai-assistant",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `Hello! I'm your AI legal template assistant. I can help you:

• Create new legal document templates from scratch
• Modify existing templates based on your requirements
• Suggest improvements to your current templates
• Generate templates for specific legal scenarios

What would you like to work on today?`,
      },
    ],
    onResponse: async (response) => {
      const data = await response.json()
      if (data.template) {
        onTemplateGenerated(data.template)
      }
    },
  })

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleQuickAction = (action: string) => {
    const quickPrompts = {
      create: "Create a new legal template for a motion to dismiss in Oklahoma state court",
      modify: currentTemplate
        ? `Modify my current template "${currentTemplate.title}" to include additional constitutional arguments`
        : "Help me modify a legal template",
      improve: currentTemplate
        ? `Review and suggest improvements for my template "${currentTemplate.title}"`
        : "Help me improve a legal template",
      explain: "Explain the key components of an effective legal document template",
    }

    const prompt = quickPrompts[action as keyof typeof quickPrompts]
    if (prompt) {
      handleInputChange({ target: { value: prompt } } as any)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} size="lg" className="rounded-full h-14 w-14 shadow-lg">
          AI
        </Button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] z-40 shadow-2xl">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">AI Template Assistant</CardTitle>
                  <CardDescription>Get help with your legal templates</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                  ×
                </Button>
              </div>
            </CardHeader>

            <Separator />

            {/* Quick Actions */}
            <div className="p-4 border-b">
              <p className="text-sm font-medium mb-2">Quick Actions:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => handleQuickAction("create")} className="text-xs">
                  Create
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleQuickAction("modify")} className="text-xs">
                  Modify
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleQuickAction("improve")} className="text-xs">
                  Improve
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleQuickAction("explain")} className="text-xs">
                  Explain
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <IconSpinner className="h-4 w-4 animate-spin" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me about templates..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading || !input.trim()} size="sm">
                  Send
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
