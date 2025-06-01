<a href="https://chat.vercel.ai/">
  <img alt="Next.js 13 and app template Router-ready AI chatbot." src="https://chat.vercel.ai/opengraph-image.png" />
  <h1 align="center">Legal AI Assistant</h1>
</a>

<p align="center">
  A specialized AI-powered legal assistant built with Next.js, the Vercel AI SDK, OpenAI, and Supabase for Oklahoma post-conviction relief and trauma-informed sentencing.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router with React Server Components
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming AI responses
- Support for OpenAI, Hugging Face, Perplexity, and DeepSeek models
- [shadcn/ui](https://ui.shadcn.com) components with [Tailwind CSS](https://tailwindcss.com)
- Template management system with versioning and sharing
- AI-powered legal document generation
- [Supabase](https://supabase.com) for authentication and data storage
- Specialized for Oklahoma Survivors' Act litigation

## Model Providers

This template supports multiple AI providers:
- **OpenAI** (GPT-4, GPT-3.5-turbo) - Primary provider for legal reasoning
- **Hugging Face** - For document classification and analysis
- **Perplexity AI** - For legal research and case law lookup
- **DeepSeek** - Alternative reasoning model

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`bash
# Required: Database
POSTGRES_URL=your_postgres_url
SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Required: AI APIs (at least one)
OPENAI_API_KEY=your_openai_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
PERPLEXITY_API_KEY=your_perplexity_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key

# Optional: Authentication
NEXT_PUBLIC_AUTH_GITHUB=true

# Optional: Analytics (server-side only)
STATSIG_SERVER_API_KEY=your_statsig_server_key
\`\`\`

**Important**: Never expose sensitive API keys to the client. Use `NEXT_PUBLIC_` prefix only for non-sensitive configuration values.

## Deploy Your Own

You can deploy your own version of the Legal AI Assistant to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-repo%2Flegal-ai-assistant&env=OPENAI_API_KEY,SUPABASE_URL,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Configure%20your%20AI%20and%20database%20credentials&project-name=legal-ai-assistant&repository-name=legal-ai-assistant)

## Running Locally

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-repo/legal-ai-assistant.git
cd legal-ai-assistant
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Copy the environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Configure your environment variables in `.env.local`

5. Set up Supabase (optional):
\`\`\`bash
npx supabase start
\`\`\`

6. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Security Notes

- All sensitive API keys are kept server-side only
- Client-side analytics use secure server endpoints
- Authentication is handled through Supabase with proper RLS policies
- Environment variables are properly scoped (client vs server)

## Legal Disclaimer

This tool is designed to assist with legal document preparation but does not constitute legal advice. Always consult with qualified legal professionals for specific legal matters.
