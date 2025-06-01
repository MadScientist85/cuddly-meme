declare namespace NodeJS {
  interface ProcessEnv {
    OPENAI_API_KEY: string
    HUGGINGFACE_API_KEY: string
    PERPLEXITY_API_KEY: string
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    NEXT_PUBLIC_AUTH_GITHUB: string
    AUTH_GITHUB_ID?: string
    AUTH_GITHUB_SECRET?: string
  }
}
