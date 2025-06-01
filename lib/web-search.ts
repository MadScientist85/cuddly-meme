interface SerpSearchResult {
  title: string
  link: string
  snippet: string
  position: number
}

interface SerpApiResponse {
  organic_results?: SerpSearchResult[]
  answer_box?: {
    answer: string
    title: string
    link: string
  }
  knowledge_graph?: {
    title: string
    description: string
  }
}

export async function performWebSearch(query: string, numResults = 5): Promise<string> {
  try {
    if (!process.env.SERP_API_KEY) {
      throw new Error("SERP API key is missing. Please add it to your environment variables.")
    }

    const params = new URLSearchParams({
      engine: "google",
      q: query,
      api_key: process.env.SERP_API_KEY,
      num: numResults.toString(),
    })

    const response = await fetch(`https://serpapi.com/search?${params}`)

    if (!response.ok) {
      throw new Error(`SERP API error: ${response.status}`)
    }

    const data: SerpApiResponse = await response.json()

    // Format search results for LLM consumption
    let searchSummary = `Web search results for: "${query}"\n\n`

    // Add answer box if available
    if (data.answer_box) {
      searchSummary += `Direct Answer: ${data.answer_box.answer}\nSource: ${data.answer_box.title} (${data.answer_box.link})\n\n`
    }

    // Add knowledge graph if available
    if (data.knowledge_graph) {
      searchSummary += `Knowledge Graph: ${data.knowledge_graph.title}\n${data.knowledge_graph.description}\n\n`
    }

    // Add organic results
    if (data.organic_results && data.organic_results.length > 0) {
      searchSummary += "Search Results:\n"
      data.organic_results.slice(0, numResults).forEach((result, index) => {
        searchSummary += `${index + 1}. ${result.title}\n   ${result.snippet}\n   Source: ${result.link}\n\n`
      })
    }

    return searchSummary
  } catch (error) {
    console.error("Web search error:", error)
    return `Error performing web search: ${error instanceof Error ? error.message : "Unknown error"}`
  }
}

export function shouldPerformWebSearch(prompt: string): boolean {
  const searchIndicators = [
    "search for",
    "find information about",
    "what is the latest",
    "current status",
    "recent developments",
    "latest news",
    "fact check",
    "verify",
    "research",
    "look up",
    "find cases about",
    "recent court decisions",
    "current law",
    "latest ruling",
  ]

  const lowerPrompt = prompt.toLowerCase()
  return searchIndicators.some((indicator) => lowerPrompt.includes(indicator))
}
