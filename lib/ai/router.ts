import { openai } from "@ai-sdk/openai"
import { anthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai"

import { getReferenceMaterials } from "@/lib/supabase/database"

export interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export async function routeModel(messages: Message[], provider = "openai", task = "general"): Promise<string> {
  try {
    // Fetch relevant reference materials based on task
    const references = await getReferenceMaterials([task])
    const context = references.map((ref) => `${ref.title}\n${ref.content}`).join("\n\n---\n\n")

    // Enhance the system message with context
    const systemMessage = `You are a specialized legal AI assistant focused on Oklahoma post-conviction relief and trauma-informed sentencing. You have access to the following reference materials:

${context}

Task Category: ${task}

Please provide accurate, well-researched legal guidance based on the provided context. Always cite relevant statutes, cases, and legal principles. Format your responses professionally and include proper legal citations where appropriate.`

    const enhancedMessages: Message[] = [{ role: "system", content: systemMessage }, ...messages]

    let model
    let maxTokens = 4000

    switch (provider.toLowerCase()) {
      case "openai":
        model = openai("gpt-4-turbo-preview")
        maxTokens = 4000
        break
      case "anthropic":
        model = anthropic("claude-3-sonnet-20240229")
        maxTokens = 4000
        break
      case "deepseek":
        // For DeepSeek, we'll use a custom implementation
        return await deepseekLLM(enhancedMessages)
      case "perplexity":
        return await perplexityLLM(enhancedMessages)
      case "huggingface":
        return await huggingFaceLLM(enhancedMessages)
      default:
        model = openai("gpt-4-turbo-preview")
    }

    const { text } = await generateText({
      model,
      messages: enhancedMessages,
      maxTokens,
      temperature: 0.3,
    })

    return text
  } catch (error) {
    console.error("AI Router error:", error)
    throw new Error("Failed to generate response")
  }
}

async function deepseekLLM(messages: Message[]): Promise<string> {
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        max_tokens: 4000,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || "No response from DeepSeek"
  } catch (error) {
    console.error("DeepSeek API error:", error)
    throw error
  }
}

async function perplexityLLM(messages: Message[]): Promise<string> {
  try {
    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3-sonar-large-32k-online",
        messages,
        max_tokens: 4000,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || "No response from Perplexity"
  } catch (error) {
    console.error("Perplexity API error:", error)
    throw error
  }
}

async function huggingFaceLLM(messages: Message[]): Promise<string> {
  try {
    const prompt = messages.map((m) => `${m.role}: ${m.content}`).join("\n\n")

    const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-large", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 4000,
          temperature: 0.3,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data[0]?.generated_text || "No response from Hugging Face"
  } catch (error) {
    console.error("Hugging Face API error:", error)
    throw error
  }
}
