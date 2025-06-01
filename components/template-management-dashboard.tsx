"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconSpinner, IconStar } from "@/components/ui/icons"
import type { Template, TemplateShare } from "@/lib/types/template"
import { useLocalStorage } from "@/lib/hooks/use-local-storage"
import { TemplateEditor } from "./template-editor"
import { TemplateSharing } from "./template-sharing"
import { TemplateExport } from "./template-export"
import { AIAssistantChat } from "./ai-assistant-chat"

const defaultTemplates: Template[] = [
  {
    id: "1",
    title: "Post-Conviction Relief Motion",
    description: "Template for requesting post-conviction relief hearing under Oklahoma law",
    category: "hearing_request",
    tags: ["post-conviction", "relief", "oklahoma", "motion"],
    currentVersion: 1,
    versions: [
      {
        id: "v1",
        version: 1,
        title: "Post-Conviction Relief Motion",
        content: `MOTION FOR POST-CONVICTION RELIEF

TO THE HONORABLE COURT:

NOW COMES the Petitioner, {{petitioner_name}}, by and through undersigned counsel, and respectfully moves this Honorable Court for post-conviction relief pursuant to 22 O.S. § 1080 et seq., and in support thereof states:

1. JURISDICTION AND VENUE
This Court has jurisdiction over this matter pursuant to {{jurisdiction_basis}}.

2. PROCEDURAL HISTORY
Petitioner was convicted of {{charges}} on {{conviction_date}} and sentenced to {{sentence}}.

3. GROUNDS FOR RELIEF
{{relief_grounds}}

4. PRAYER FOR RELIEF
WHEREFORE, Petitioner respectfully requests this Honorable Court to:
a) Grant this Motion for Post-Conviction Relief;
b) {{specific_relief_requested}};
c) Grant such other relief as this Court deems just and proper.

Respectfully submitted,
{{attorney_name}}
{{attorney_info}}`,
        variables: [
          "petitioner_name",
          "jurisdiction_basis",
          "charges",
          "conviction_date",
          "sentence",
          "relief_grounds",
          "specific_relief_requested",
          "attorney_name",
          "attorney_info",
        ],
        changelog: "Initial version",
        createdAt: new Date(),
        createdBy: "system",
      },
    ],
    isPublic: true,
    sharedWith: [],
    createdBy: "system",
    createdAt: new Date(),
    updatedAt: new Date(),
    usage: 45,
    rating: 4.8,
    ratingCount: 12,
  },
  // Add more default templates...
]

export function TemplateManagementDashboard() {
  const [templates, setTemplates] = useLocalStorage<Template[]>("templates", defaultTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [activeTab, setActiveTab] = useState("my-templates")

  // Filters and search
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"title" | "created" | "updated" | "usage" | "rating">("updated")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const categories = [
    { value: "all", label: "All Categories", icon: IconSpinner },
    { value: "hearing_request", label: "Hearing Requests", icon: IconSpinner },
    { value: "constitutional_argument", label: "Constitutional Arguments", icon: IconSpinner },
    { value: "statutory_analysis", label: "Statutory Analysis", icon: IconSpinner },
    { value: "motion", label: "Motions", icon: IconSpinner },
    { value: "brief", label: "Legal Briefs", icon: IconSpinner },
    { value: "contract", label: "Contracts", icon: IconSpinner },
    { value: "correspondence", label: "Correspondence", icon: IconSpinner },
    { value: "custom", label: "Custom Templates", icon: IconSpinner },
  ]

  const filteredAndSortedTemplates = useMemo(() => {
    const filtered = templates.filter((template) => {
      const matchesSearch =
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory

      const matchesTab =
        activeTab === "my-templates"
          ? template.createdBy === "current-user"
          : activeTab === "public"
            ? template.isPublic
            : activeTab === "shared"
              ? template.sharedWith.includes("current-user")
              : true

      return matchesSearch && matchesCategory && matchesTab
    })

    // Sort templates
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case "created":
          aValue = a.createdAt.getTime()
          bValue = b.createdAt.getTime()
          break
        case "updated":
          aValue = a.updatedAt.getTime()
          bValue = b.updatedAt.getTime()
          break
        case "usage":
          aValue = a.usage
          bValue = b.usage
          break
        case "rating":
          aValue = a.rating
          bValue = b.rating
          break
        default:
          return 0
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [templates, searchTerm, selectedCategory, sortBy, sortOrder, activeTab])

  const handleCreateTemplate = () => {
    setSelectedTemplate(null)
    setIsCreating(true)
    setIsEditing(false)
  }

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setIsEditing(true)
    setIsCreating(false)
  }

  const handleSaveTemplate = (template: Template) => {
    if (isCreating) {
      setTemplates([...templates, template])
    } else {
      setTemplates(templates.map((t) => (t.id === template.id ? template : t)))
    }
    setIsEditing(false)
    setIsCreating(false)
    setSelectedTemplate(null)
  }

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter((t) => t.id !== templateId))
    if (selectedTemplate?.id === templateId) {
      setSelectedTemplate(null)
    }
  }

  const handleDuplicateTemplate = (template: Template) => {
    const duplicated: Template = {
      ...template,
      id: `template-${Date.now()}`,
      title: `${template.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "current-user",
      usage: 0,
      rating: 0,
      ratingCount: 0,
    }
    setTemplates([...templates, duplicated])
  }

  const handleShareTemplate = (shareData: Omit<TemplateShare, "id" | "createdAt">) => {
    // In a real app, this would save to a backend
    console.log("Sharing template:", shareData)
    setIsSharing(false)
  }

  const handleAITemplateGenerated = (templateData: Partial<Template>) => {
    const newTemplate: Template = {
      id: `template-${Date.now()}`,
      title: templateData.title || "AI Generated Template",
      description: templateData.description || "Generated by AI Assistant",
      category: templateData.category || "custom",
      tags: templateData.tags || ["ai-generated"],
      currentVersion: 1,
      versions: [
        {
          id: "v1",
          version: 1,
          title: templateData.title || "AI Generated Template",
          content: templateData.versions?.[0]?.content || "",
          variables: templateData.versions?.[0]?.variables || [],
          changelog: "Generated by AI Assistant",
          createdAt: new Date(),
          createdBy: "ai-assistant",
        },
      ],
      isPublic: false,
      sharedWith: [],
      createdBy: "current-user",
      createdAt: new Date(),
      updatedAt: new Date(),
      usage: 0,
      rating: 0,
      ratingCount: 0,
    }

    setTemplates([...templates, newTemplate])
    setSelectedTemplate(newTemplate)
    setIsEditing(true)
  }

  if (isEditing || isCreating) {
    return (
      <TemplateEditor
        template={selectedTemplate || undefined}
        onSave={handleSaveTemplate}
        onCancel={() => {
          setIsEditing(false)
          setIsCreating(false)
          setSelectedTemplate(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Template Management System</h1>
                <p className="text-sm text-muted-foreground">
                  Create, manage, and share legal document templates with AI assistance
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleCreateTemplate} className="flex items-center space-x-2">
                <IconSpinner className="h-4 w-4" />
                <span>New Template</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="my-templates">My Templates</TabsTrigger>
            <TabsTrigger value="public">Public Library</TabsTrigger>
            <TabsTrigger value="shared">Shared with Me</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="my-templates" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle>Filters & Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Input
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search templates..."
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sortBy">Sort By</Label>
                    <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="created">Created Date</SelectItem>
                        <SelectItem value="updated">Updated Date</SelectItem>
                        <SelectItem value="usage">Usage Count</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sortOrder">Order</Label>
                    <Select value={sortOrder} onValueChange={(value: any) => setSortOrder(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desc">Descending</SelectItem>
                        <SelectItem value="asc">Ascending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedTemplates.map((template) => {
                const category = categories.find((c) => c.value === template.category)
                const Icon = category?.icon || IconSpinner
                return (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-base truncate">{template.title}</CardTitle>
                          <CardDescription className="text-sm line-clamp-2">{template.description}</CardDescription>
                        </div>
                        <div className="flex space-x-1 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditTemplate(template)}
                            className="h-8 w-8 p-0"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedTemplate(template)
                              setIsSharing(true)
                            }}
                            className="h-8 w-8 p-0"
                          >
                            Share
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedTemplate(template)
                              setIsExporting(true)
                            }}
                            className="h-8 w-8 p-0"
                          >
                            Export
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {template.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            v{template.currentVersion}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            <IconStar className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs text-muted-foreground">
                              {template.rating.toFixed(1)} ({template.ratingCount})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">{template.usage} uses</span>
                          <Button size="sm" onClick={() => handleDuplicateTemplate(template)} variant="outline">
                            Use
                          </Button>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Updated {template.updatedAt.toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredAndSortedTemplates.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <IconSpinner className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedCategory !== "all"
                      ? "Try adjusting your search or filters"
                      : "Create your first legal template to get started"}
                  </p>
                  <Button onClick={handleCreateTemplate}>
                    <IconSpinner className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="public" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <IconSpinner className="h-5 w-5" />
                  <span>Public Template Library</span>
                </CardTitle>
                <CardDescription>Discover and use templates shared by the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates
                    .filter((template) => template.isPublic)
                    .map((template) => {
                      const category = categories.find((c) => c.value === template.category)
                      const Icon = category?.icon || IconSpinner
                      return (
                        <Card key={template.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <div className="flex items-center space-x-2">
                              <IconSpinner className="h-5 w-5 text-primary" />
                              <div>
                                <CardTitle className="text-base">{template.title}</CardTitle>
                                <CardDescription className="text-sm">by {template.createdBy}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  <IconStar className="h-3 w-3 text-yellow-500" />
                                  <span className="text-xs">
                                    {template.rating.toFixed(1)} ({template.ratingCount})
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">{template.usage} uses</span>
                              </div>
                              <Button size="sm" onClick={() => handleDuplicateTemplate(template)}>
                                <IconSpinner className="h-3 w-3 mr-1" />
                                Use Template
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shared" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <IconSpinner className="h-5 w-5" />
                  <span>Shared with Me</span>
                </CardTitle>
                <CardDescription>Templates that others have shared with you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <IconSpinner className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No shared templates</h3>
                  <p className="text-muted-foreground">Templates shared with you will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Total Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{templates.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {templates.filter((t) => t.createdBy === "current-user").length} created by you
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Total Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{templates.reduce((sum, t) => sum + t.usage, 0)}</div>
                  <p className="text-xs text-muted-foreground">Across all templates</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {(templates.reduce((sum, t) => sum + t.rating, 0) / templates.length).toFixed(1)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    From {templates.reduce((sum, t) => sum + t.ratingCount, 0)} reviews
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Public Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{templates.filter((t) => t.isPublic).length}</div>
                  <p className="text-xs text-muted-foreground">Available to community</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Most Popular Templates</CardTitle>
                <CardDescription>Templates with the highest usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates
                    .sort((a, b) => b.usage - a.usage)
                    .slice(0, 5)
                    .map((template, index) => (
                      <div key={template.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{template.title}</p>
                            <p className="text-sm text-muted-foreground">{template.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{template.usage} uses</p>
                          <div className="flex items-center space-x-1">
                            <IconStar className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs">{template.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Assistant Chat */}
      <AIAssistantChat
        onTemplateGenerated={handleAITemplateGenerated}
        currentTemplate={selectedTemplate || undefined}
      />

      {/* Dialogs */}
      {selectedTemplate && (
        <>
          <TemplateSharing
            template={selectedTemplate}
            isOpen={isSharing}
            onClose={() => setIsSharing(false)}
            onShare={handleShareTemplate}
          />
          <TemplateExport template={selectedTemplate} isOpen={isExporting} onClose={() => setIsExporting(false)} />
        </>
      )}
    </div>
  )
}
