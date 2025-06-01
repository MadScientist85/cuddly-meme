export type Provider = "openai" | "huggingface" | "perplexity"

export type LegalTask =
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

export interface ReferenceMaterial {
  id: string
  type: string
  content: string
  tags: string[]
}

export interface GenerationRequest {
  prompt: string
  provider: Provider
  task: LegalTask
}

export interface GenerationResponse {
  output: string
}
