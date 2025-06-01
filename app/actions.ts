"use server"

import { fetchReferenceMaterials, routeModel, generateEmbedding, retrieveRelevantChunks } from "@/lib/llm-router"
import { performWebSearch, shouldPerformWebSearch } from "@/lib/web-search"
import type { GenerationResponse, Provider, LegalTask } from "@/types"
import { createClient } from "@supabase/supabase-js"
import pdfParse from "pdf-parse"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

type Message = {
  role: "user" | "assistant" | "system"
  content: string
}

type PromptCategory =
  | "hearing_request"
  | "constitutional_argument"
  | "equal_protection"
  | "due_process"
  | "statutory_analysis"
  | "appendix_building"
  | "rehabilitation_narrative"
  | "expert_testimony"
  | "comparative_law"
  | "evidentiary_review"
  | "general"

function classifyPrompt(prompt: string): { category: PromptCategory; provider: string; tags: string[] } {
  const lowerPrompt = prompt.toLowerCase()

  if (
    lowerPrompt.includes("due process") ||
    lowerPrompt.includes("without a hearing") ||
    lowerPrompt.includes("mathews v. eldridge")
  ) {
    return { category: "due_process", provider: "openai", tags: ["constitutional", "due_process", "hearing_request"] }
  }
  if (lowerPrompt.includes("equal protection") || lowerPrompt.includes("systemic bias")) {
    return { category: "equal_protection", provider: "openai", tags: ["constitutional", "equal_protection"] }
  }
  if (
    lowerPrompt.includes("constitutional argument") ||
    lowerPrompt.includes("14th amendment") ||
    lowerPrompt.includes("8th amendment") ||
    lowerPrompt.includes("oklahoma constitution")
  ) {
    return { category: "constitutional_argument", provider: "openai", tags: ["constitutional", "ok_constitution"] }
  }
  if (
    lowerPrompt.includes("statutory analysis") ||
    lowerPrompt.includes("sb1835") ||
    lowerPrompt.includes("1090.5") ||
    lowerPrompt.includes("oklahoma survivors act")
  ) {
    return { category: "statutory_analysis", provider: "openai", tags: ["statutory", "sb1835", "ok_laws"] }
  }
  if (lowerPrompt.includes("appendix") || lowerPrompt.includes("exhibits") || lowerPrompt.includes("pdf-ready list")) {
    return { category: "appendix_building", provider: "huggingface", tags: ["appendix", "exhibits"] }
  }
  if (
    lowerPrompt.includes("expert affidavits") ||
    lowerPrompt.includes("ptsd diagnosis") ||
    lowerPrompt.includes("trauma literature") ||
    lowerPrompt.includes("neurobiological coercion") ||
    lowerPrompt.includes("dsm-5")
  ) {
    return { category: "expert_testimony", provider: "deepseek", tags: ["expert_testimony", "trauma_science"] }
  }
  if (
    lowerPrompt.includes("rehabilitation narrative") ||
    lowerPrompt.includes("personal story") ||
    lowerPrompt.includes("growth")
  ) {
    return { category: "rehabilitation_narrative", provider: "deepseek", tags: ["rehabilitation", "narrative"] }
  }
  if (
    lowerPrompt.includes("compare") ||
    lowerPrompt.includes("analogous statutes") ||
    lowerPrompt.includes("national trends") ||
    lowerPrompt.includes("ny") ||
    lowerPrompt.includes("il") ||
    lowerPrompt.includes("ca") ||
    lowerPrompt.includes("mn") ||
    lowerPrompt.includes("nm") ||
    lowerPrompt.includes("dvsja") ||
    lowerPrompt.includes("addimando")
  ) {
    return { category: "comparative_law", provider: "perplexity", tags: ["comparative_law", "state_laws"] }
  }
  if (lowerPrompt.includes("evidentiary review") || lowerPrompt.includes("evidence analysis")) {
    return { category: "evidentiary_review", provider: "huggingface", tags: ["evidentiary"] }
  }
  if (lowerPrompt.includes("hearing request")) {
    return { category: "hearing_request", provider: "openai", tags: ["hearing_request", "procedural"] }
  }

  return { category: "general", provider: "openai", tags: ["general_legal", "oklahoma_law"] }
}

function chunkText(text: string, chunkSize = 1000, chunkOverlap = 200): string[] {
  const chunks: string[] = []
  let i = 0
  while (i < text.length) {
    const end = Math.min(i + chunkSize, text.length)
    const chunk = text.substring(i, end)
    chunks.push(chunk)
    if (end === text.length) break
    i += chunkSize - chunkOverlap
    if (i < 0) i = 0
  }
  return chunks
}

async function storeChunksInSupabase(documentId: string, chunks: string[]): Promise<void> {
  const chunksToInsert = []
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    const embedding = await generateEmbedding(chunk)
    chunksToInsert.push({
      document_id: documentId,
      chunk_id: i,
      content: chunk,
      embedding: embedding,
    })
  }

  const { error } = await supabase.from("document_chunks").insert(chunksToInsert)
  if (error) {
    console.error("Error storing chunks in Supabase:", error)
    throw new Error("Failed to store document chunks")
  }
  console.log(`Stored ${chunks.length} chunks for document: ${documentId}`)
}

export async function generateLegalResponse(
  prompt: string,
  provider: Provider,
  task: LegalTask,
  history: Message[] = [],
  includeCourtFormatting = false,
  file?: File,
): Promise<
  GenerationResponse & {
    category: string
    provider: string
    referencesUsed: number
    history: Message[]
    documentProcessed?: boolean
    documentName?: string
    ragChunksRetrieved?: number
    webSearchPerformed?: boolean
  }
> {
  try {
    const messages: Message[] = [
      {
        role: "system",
        content: `You are an integrated AI legal assistant operating within a multi-model LLM environment (OpenAI, Hugging Face, Perplexity, DeepSeek). Your primary domain is Oklahoma post-conviction relief, with a special focus on trauma-informed sentencing, Writs of Mandamus, and litigation related to the Oklahoma Survivors' Act (SB1835; 22 O.S. §§ 1090.1-1090.5).

        Your mission is to support the user by drafting, analyzing, and routing legal content—including pleadings, motions, briefs, and research—while integrating scientific, constitutional, and statutory analysis. You will draw from a Supabase-connected knowledge base containing statutes, expert affidavits, case law, scientific references, pleadings, and user-submitted documents.

        Core Capabilities:
        - Integrate arguments under: First Amendment (right to petition for redress), Fourteenth Amendment (due process, equal protection), Eighth Amendment (excessive punishment from denial of trauma-informed review), Oklahoma Constitution Art. II §§ 2, 7, 9.
        - Translate PTSD, C-PTSD, and trauma literature into legal relevance. Highlight neurobiological coercion as a legally cognizable form of compulsion.
        - Emphasize remedial purpose and liberal interpretation of SB1835. Recognize divergent application patterns across Oklahoma counties and flag systemic bias.
        - Cite analogous statutes and case law from NY, IL, CA, MN, and NM. Note national trends in trauma-informed justice.

        Behavioral Expectations:
        - Maintain professional tone.
        - Operate with high legal precision.
        - Prioritize statutory compliance, evidentiary integrity, and constitutional balance.
        - Avoid conclusory or unsupported assertions.
        - If user input is unclear, request clarification before proceeding.
        ${includeCourtFormatting ? "When generating drafts, format them as court-ready pleadings using Oklahoma court style rules, embedding references inline and in footnote/endnote format." : "Unless explicitly asked, do not worry about court formatting."}
        `,
      },
      ...history,
      { role: "user", content: prompt },
    ]

    let ragContext: string[] = []
    let documentProcessed = false
    let documentName: string | null = null
    let webSearchPerformed = false

    // Handle file upload and RAG processing
    if (file) {
      documentProcessed = true
      documentName = file.name
      console.log(`Processing uploaded file: ${documentName}`)

      try {
        let extractedText = ""

        if (file.type === "application/pdf") {
          const arrayBuffer = await file.arrayBuffer()
          const data = await pdfParse(Buffer.from(arrayBuffer))
          extractedText = data.text
        } else if (file.type === "text/plain") {
          extractedText = await file.text()
        }

        if (extractedText) {
          const documentId = `${documentName}-${Date.now()}`
          const chunks = chunkText(extractedText)
          await storeChunksInSupabase(documentId, chunks)
          console.log(`Document "${documentName}" processed and chunks stored.`)

          const queryEmbedding = await generateEmbedding(prompt)
          ragContext = await retrieveRelevantChunks(queryEmbedding, 5)
        }
      } catch (error) {
        console.error("RAG pipeline error:", error)
      }
    } else if (prompt) {
      // Retrieve relevant chunks from existing knowledge base
      try {
        const queryEmbedding = await generateEmbedding(prompt)
        ragContext = await retrieveRelevantChunks(queryEmbedding, 5)
      } catch (error) {
        console.error("Error during RAG retrieval:", error)
      }
    }

    // Add RAG context if available
    if (ragContext.length > 0) {
      messages.splice(messages.length - 1, 0, {
        role: "system",
        content: `Retrieved relevant information from documents in your knowledge base:\n\n---\n${ragContext.join("\n\n")}\n---\n\nUse this information to answer the user's query.`,
      })
    }

    // Check if web search should be performed
    if (shouldPerformWebSearch(prompt)) {
      webSearchPerformed = true
      console.log("Performing web search for query:", prompt)

      const searchResults = await performWebSearch(prompt, 5)
      messages.splice(messages.length - 1, 0, {
        role: "system",
        content: `Web search results:\n\n${searchResults}\n\nUse this current information along with your knowledge to provide an accurate and up-to-date response.`,
      })
    }

    // Classify prompt and get reference materials
    const { category, provider: suggestedProvider, tags } = classifyPrompt(prompt)
    const finalProvider = provider || (suggestedProvider as Provider)

    const references = await fetchReferenceMaterials(tags)
    const referenceMaterials = references.map((ref) => ref.content)

    if (referenceMaterials.length > 0) {
      messages.splice(messages.length - 1, 0, {
        role: "system",
        content: `Additional relevant reference materials from your static knowledge base:\n${referenceMaterials.map((material, index) => `--- Ref ${index + 1} ---\n${material}`).join("\n\n")}\n\n`,
      })
    }

    // Route to appropriate LLM
    const output = await routeModel(messages, finalProvider)

    // Update conversation history
    const updatedHistory = [...messages, { role: "assistant", content: output }]

    return {
      output,
      category,
      provider: finalProvider,
      referencesUsed: referenceMaterials.length,
      history: updatedHistory,
      documentProcessed,
      documentName: documentName || undefined,
      ragChunksRetrieved: ragContext.length,
      webSearchPerformed,
    }
  } catch (error) {
    console.error("Generation error:", error)
    return {
      output: `Error: ${error instanceof Error ? error.message : "An unknown error occurred"}`,
      category: "general",
      provider: provider || "openai",
      referencesUsed: 0,
      history: [],
    }
  }
}
