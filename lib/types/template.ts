export interface TemplateVersion {
  id: string
  version: number
  title: string
  content: string
  variables: string[]
  changelog: string
  createdAt: Date
  createdBy: string
}

export interface Template {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  currentVersion: number
  versions: TemplateVersion[]
  isPublic: boolean
  sharedWith: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
  usage: number
  rating: number
  ratingCount: number
}

export interface TemplateShare {
  id: string
  templateId: string
  sharedBy: string
  sharedWith: string[]
  shareType: "public" | "private" | "group"
  permissions: ("view" | "edit" | "share")[]
  expiresAt?: Date
  createdAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  avatar?: string
  createdAt: Date
}

export interface AIAssistantMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  templateId?: string
  action?: "create" | "modify" | "suggest"
}
