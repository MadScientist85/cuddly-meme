"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TaskSelector } from "@/components/task-selector"
import { ProviderSelector } from "@/components/provider-selector"
import { generateLegalResponse } from "./actions"
import type { Provider, LegalTask } from "@/types"
import { Loader2, Copy, Check, Upload, FileText, Search, Database, PointerIcon as SidebarTrigger } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

export default function Dashboard() {
  const { toast } = useToast()
  const [provider, setProvider] = useState<Provider>("openai")
  const [task, setTask] = useState<LegalTask>("constitutional_argument")
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [history, setHistory] = useState<Message[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [includeCourtFormatting, setIncludeCourtFormatting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Stats from last generation
  const [lastStats, setLastStats] = useState({
    referencesUsed: 0,
    ragChunksRetrieved: 0,
    webSearchPerformed: false,
    documentProcessed: false,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      // Check file type
      if (selectedFile.type !== "application/pdf" && selectedFile.type !== "text/plain") {
        toast({
          title: "Unsupported file type",
          description: "Please upload a PDF or text file.",
          variant: "destructive",
        })
        return
      }

      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
      toast({
        title: "File selected",
        description: `${selectedFile.name} is ready for upload.`,
      })
    }
  }

  const handleSubmit = async () => {
    if (!input.trim() && !file) {
      toast({
        title: "Input required",
        description: "Please enter a prompt or upload a file.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 10
      })
    }, 200)

    try {
      const result = await generateLegalResponse(
        input,
        provider,
        task,
        history,
        includeCourtFormatting,
        file || undefined,
      )

      setUploadProgress(100)
      clearInterval(progressInterval)

      setResponse(result.output)
      setHistory(result.history)
      setLastStats({
        referencesUsed: result.referencesUsed,
        ragChunksRetrieved: result.ragChunksRetrieved || 0,
        webSearchPerformed: result.webSearchPerformed || false,
        documentProcessed: result.documentProcessed || false,
      })

      if (result.output.startsWith("Error:")) {
        toast({
          title: "Generation issue",
          description: result.output,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Response generated",
          description: "Your legal document has been generated successfully.",
        })
      }

      // Clear inputs
      setInput("")
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Generation error:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setResponse(`Error: ${errorMessage}`)
      toast({
        title: "Generation failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
      setUploadProgress(0)
      clearInterval(progressInterval)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied to clipboard",
      description: "The generated text has been copied to your clipboard.",
    })
  }

  const clearHistory = () => {
    setHistory([])
    setResponse("")
    toast({
      title: "History cleared",
      description: "Conversation history has been reset.",
    })
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">Legal AI Assistant</h1>
          <p className="text-sm text-muted-foreground">Oklahoma Survivors' Act Litigation Suite</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {lastStats.webSearchPerformed && (
            <Badge variant="secondary">
              <Search className="w-3 h-3 mr-1" />
              Web Search
            </Badge>
          )}
          {lastStats.ragChunksRetrieved > 0 && (
            <Badge variant="secondary">
              <Database className="w-3 h-3 mr-1" />
              RAG: {lastStats.ragChunksRetrieved}
            </Badge>
          )}
          {lastStats.referencesUsed > 0 && (
            <Badge variant="secondary">
              <FileText className="w-3 h-3 mr-1" />
              Refs: {lastStats.referencesUsed}
            </Badge>
          )}
        </div>
      </header>

      <div className="flex-1 container mx-auto py-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Configure your legal request and provide context</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Legal Task</Label>
                  <TaskSelector value={task} onChange={setTask} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">AI Provider</Label>
                  <ProviderSelector value={provider} onChange={setProvider} />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Document Upload</Label>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    {file ? file.name : "Upload PDF or Text File"}
                  </Button>
                  {file && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFile(null)
                        if (fileInputRef.current) fileInputRef.current.value = ""
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Your Request</Label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your legal request or narrative here..."
                  className="min-h-[200px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="court-formatting"
                  checked={includeCourtFormatting}
                  onCheckedChange={(checked) => setIncludeCourtFormatting(checked as boolean)}
                />
                <Label htmlFor="court-formatting" className="text-sm">
                  Include Oklahoma court formatting
                </Label>
              </div>

              {isGenerating && uploadProgress > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm">Processing...</Label>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button onClick={handleSubmit} disabled={isGenerating || (!input.trim() && !file)} className="flex-1">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Document"
                )}
              </Button>
              {history.length > 0 && (
                <Button variant="outline" onClick={clearHistory}>
                  Clear History
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Output Panel */}
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Generated Document</CardTitle>
                <CardDescription>AI-generated legal document based on your input</CardDescription>
              </div>
              {response && (
                <Button variant="outline" size="icon" onClick={copyToClipboard} title="Copy to clipboard">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="current">
                <TabsList className="mb-2">
                  <TabsTrigger value="current">Current Response</TabsTrigger>
                  <TabsTrigger value="history">Conversation History</TabsTrigger>
                </TabsList>

                <TabsContent value="current" className="min-h-[400px]">
                  {isGenerating ? (
                    <div className="flex items-center justify-center h-[400px]">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : response ? (
                    <div className="prose max-w-none dark:prose-invert">
                      {response.split("\n").map((line, i) => (
                        <p key={i}>{line || <br />}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                      Generated content will appear here
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history" className="min-h-[400px]">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {history
                      .filter((msg) => msg.role !== "system")
                      .map((msg, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            msg.role === "user"
                              ? "bg-blue-50 dark:bg-blue-950 ml-8"
                              : "bg-gray-50 dark:bg-gray-950 mr-8"
                          }`}
                        >
                          <div className="font-semibold text-sm mb-1">{msg.role === "user" ? "You" : "Assistant"}</div>
                          <div className="text-sm">{msg.content}</div>
                        </div>
                      ))}
                    {history.length === 0 && (
                      <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                        Conversation history will appear here
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
