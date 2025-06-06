export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          bar_number: string | null
          law_firm: string | null
          jurisdiction: string | null
          specialization: string[] | null
          preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          bar_number?: string | null
          law_firm?: string | null
          jurisdiction?: string | null
          specialization?: string[] | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          bar_number?: string | null
          law_firm?: string | null
          jurisdiction?: string | null
          specialization?: string[] | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      chats: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category:
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
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category?:
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
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?:
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
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          chat_id: string
          role: "user" | "assistant" | "system"
          content: string
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          role: "user" | "assistant" | "system"
          content: string
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          role?: "user" | "assistant" | "system"
          content?: string
          metadata?: Json | null
          created_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          content: string
          category:
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
          tags: string[] | null
          variables: Json | null
          is_public: boolean
          is_featured: boolean
          usage_count: number
          version: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          content: string
          category:
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
          tags?: string[] | null
          variables?: Json | null
          is_public?: boolean
          is_featured?: boolean
          usage_count?: number
          version?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          content?: string
          category?:
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
          tags?: string[] | null
          variables?: Json | null
          is_public?: boolean
          is_featured?: boolean
          usage_count?: number
          version?: number
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          category:
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
            | null
          chat_id: string | null
          template_id: string | null
          metadata: Json | null
          version: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          category?:
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
            | null
          chat_id?: string | null
          template_id?: string | null
          metadata?: Json | null
          version?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          category?:
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
            | null
          chat_id?: string | null
          template_id?: string | null
          metadata?: Json | null
          version?: number
          created_at?: string
          updated_at?: string
        }
      }
      reference_materials: {
        Row: {
          id: string
          title: string
          content: string
          summary: string | null
          tags: string[]
          category:
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
          source: string | null
          citation: string | null
          jurisdiction: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          summary?: string | null
          tags: string[]
          category:
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
          source?: string | null
          citation?: string | null
          jurisdiction?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          summary?: string | null
          tags?: string[]
          category?:
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
          source?: string | null
          citation?: string | null
          jurisdiction?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      shared_chats: {
        Row: {
          id: string
          chat_id: string
          share_token: string
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          chat_id: string
          share_token: string
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          chat_id?: string
          share_token?: string
          expires_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      share_chat: {
        Args: {
          chat_uuid: string
        }
        Returns: {
          share_token: string
        }[]
      }
      get_shared_chat: {
        Args: {
          token: string
        }
        Returns: {
          id: string
          title: string
          messages: Json
        }[]
      }
    }
    Enums: {
      legal_category:
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
    }
  }
}
