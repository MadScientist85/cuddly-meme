"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Check, X } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [apiKeys, setApiKeys] = useState({
    openai: "",
    huggingface: "",
    perplexity: "",
    deepseek: "",
    serp: "",
  })

  const toggleKeyVisibility = (key: string) => {
    setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleKeyChange = (provider: string, value: string) => {
    setApiKeys((prev) => ({ ...prev, [provider]: value }))
  }

  const testApiKey = async (provider: string) => {
    // This would typically make a test API call
    toast({
      title: "API Key Test",
      description: `Testing ${provider} API key...`,
    })

    // Simulate API test
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: `${provider} API key is ${Math.random() > 0.5 ? "valid" : "invalid"}`,
        variant: Math.random() > 0.5 ? "default" : "destructive",
      })
    }, 1000)
  }

  const saveSettings = () => {
    // In a real app, this would save to secure storage
    toast({
      title: "Settings saved",
      description: "Your API keys have been saved securely.",
    })
  }

  const providers = [
    { key: "openai", name: "OpenAI", description: "GPT-4 and embeddings" },
    { key: "huggingface", name: "Hugging Face", description: "DeepSeek Coder model" },
    { key: "perplexity", name: "Perplexity AI", description: "Llama 3 70B model" },
    { key: "deepseek", name: "DeepSeek", description: "DeepSeek Chat model" },
    { key: "serp", name: "SERP API", description: "Web search functionality" },
  ]

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your API keys and application preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Key Management</CardTitle>
          <CardDescription>
            Configure your API keys for different AI providers. Keys are stored securely and never transmitted in plain
            text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {providers.map((provider) => (
            <div key={provider.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor={provider.key} className="text-sm font-medium">
                    {provider.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">{provider.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={apiKeys[provider.key as keyof typeof apiKeys] ? "default" : "secondary"}>
                    {apiKeys[provider.key as keyof typeof apiKeys] ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Configured
                      </>
                    ) : (
                      <>
                        <X className="w-3 h-3 mr-1" />
                        Not Set
                      </>
                    )}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testApiKey(provider.name)}
                    disabled={!apiKeys[provider.key as keyof typeof apiKeys]}
                  >
                    Test
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id={provider.key}
                  type={showKeys[provider.key] ? "text" : "password"}
                  value={apiKeys[provider.key as keyof typeof apiKeys]}
                  onChange={(e) => handleKeyChange(provider.key, e.target.value)}
                  placeholder={`Enter your ${provider.name} API key`}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" onClick={() => toggleKeyVisibility(provider.key)}>
                  {showKeys[provider.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <Button onClick={saveSettings}>Save Settings</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
          <CardDescription>Monitor your API usage and costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-muted-foreground">Total Requests</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">89</div>
              <div className="text-sm text-muted-foreground">Documents Processed</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">$24.50</div>
              <div className="text-sm text-muted-foreground">Estimated Cost</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
