import { createClient } from "@supabase/supabase-js"
import OpenAI from "openai"
import type { Provider, ReferenceMaterial } from "@/types"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// Initialize embedding client
let embeddingClient: OpenAI | null = null

function getEmbeddingClient(): OpenAI {
  if (!embeddingClient && process.env.OPENAI_API_KEY) {
    embeddingClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }
  if (!embeddingClient) {
    throw new Error("OpenAI API key is required for embeddings")
  }
  return embeddingClient
}

export async function fetchReferenceMaterials(tags: string[]): Promise<ReferenceMaterial[]> {
  const { data, error } = await supabase.from("reference_materials").select("*").contains("tags", tags)

  if (error) {
    console.error("Supabase fetch error:", error)
    return []
  }

  return data || []
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const client = getEmbeddingClient()
    const response = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    })
    return response.data[0].embedding
  } catch (error) {
    console.error("Error generating embedding:", error)
    throw new Error("Failed to generate embedding for text")
  }
}

export async function retrieveRelevantChunks(queryEmbedding: number[], k = 5): Promise<string[]> {
  try {
    const { data, error } = await supabase.rpc("match_document_chunks", {
      query_embedding: queryEmbedding,
      match_count: k,
      min_similarity: 0.75,
    })

    if (error) {
      console.error("Error retrieving chunks from Supabase:", error)
      return []
    }

    return data?.map((item: any) => item.content) || []
  } catch (error) {
    console.error("RAG retrieval error:", error)
    return []
  }
}

export async function huggingFaceLLM(prompt: string): Promise<string> {
  try {
    if (!process.env.HUGGINGFACE_API_KEY) {
      throw new Error("Hugging Face API key is missing. Please add it to your environment variables.")
    }

    const res = await fetch("https://api-inference.huggingface.co/models/deepseek-ai/deepseek-coder-6.7b-instruct", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    })

    if (!res.ok) {
      throw new Error(`Hugging Face API error: ${res.status}`)
    }

    const json = await res.json()
    return json.generated_text || json[0]?.generated_text || "[No response from Hugging Face]"
  } catch (error) {
    console.error("Hugging Face LLM error:", error)
    return `Error: ${error instanceof Error ? error.message : "Unknown error"}`
  }
}

export async function perplexityLLM(messages: Array<{ role: string; content: string }>): Promise<string> {
  try {
    if (!process.env.PERPLEXITY_API_KEY) {
      throw new Error("Perplexity API key is missing. Please add it to your environment variables.")
    }

    const res = await fetch("https://api.perplexity.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3-70b-instruct",
        messages: messages,
      }),
    })

    if (!res.ok) {
      throw new Error(`Perplexity API error: ${res.status}`)
    }

    const json = await res.json()
    return json.choices?.[0]?.message?.content || "[No response from Perplexity]"
  } catch (error) {
    console.error("Perplexity LLM error:", error)
    return `Error: ${error instanceof Error ? error.message : "Unknown error"}`
  }
}

export async function deepseekLLM(messages: Array<{ role: string; content: string }>): Promise<string> {
  try {
    if (!process.env.DEEPSEEK_API_KEY) {
      throw new Error("DeepSeek API key is missing. Please add it to your environment variables.")
    }

    const deepseek = new OpenAI({
      apiKey: process.env.DEEPSEEK_API_KEY,
      baseURL: "https://api.deepseek.com/v1",
    })

    const { choices } = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      messages: messages,
      temperature: 0.3,
    })

    return choices[0].message.content || "[No response from DeepSeek]"
  } catch (error) {
    console.error("DeepSeek LLM error:", error)
    return `Error: ${error instanceof Error ? error.message : "Unknown error"}`
  }
}

export async function routeModel(
  messages: Array<{ role: string; content: string }>,
  provider: Provider,
): Promise<string> {
  try {
    switch (provider.toLowerCase() as Provider) {
      case "openai":
        if (!process.env.OPENAI_API_KEY) {
          throw new Error("OpenAI API key is missing. Please add it to your environment variables.")
        }

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

        const { choices } = await openai.chat.completions.create({
          model: "gpt-4-turbo",
          messages: messages,
          temperature: 0.3,
        })
        return choices[0].message.content || "[No response from OpenAI]"

      case "huggingface":
        const huggingFacePrompt = messages.map((m) => `${m.role}: ${m.content}`).join("\n")
        return await huggingFaceLLM(huggingFacePrompt)

      case "perplexity":
        return await perplexityLLM(messages)

      case "deepseek":
        return await deepseekLLM(messages)

      default:
        throw new Error(`Unknown provider: ${provider}`)
    }
  } catch (error) {
    console.error("Route model error:", error)
    return `Error: ${error instanceof Error ? error.message : "Unknown error"}`
  }
}
