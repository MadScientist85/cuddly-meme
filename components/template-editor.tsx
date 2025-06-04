"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { IconPlus } from "@/components/ui/icons"
import type { Template, TemplateVersion } from "@/lib/types/template"

interface TemplateEditorProps {
  template?: Template
  onSave: (template: Template) => void
  onCancel: () => void
}

export function TemplateEditor({ template, onSave, onCancel }: TemplateEditorProps) {
  const [formData, setFormData] = useState({
    title: template?.title || "",
    description: template?.description || "",
    category: template?.category || "",
    tags: template?.tags || [],
    content: template?.versions[template.currentVersion - 1]?.content || "",
    isPublic: template?.isPublic || false,
    changelog: "",
  })

  const [newTag, setNewTag] = useState("")
  const [variables, setVariables] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)
  const [showVersionHistory, setShowVersionHistory] = useState(false)

  const categories = [
    "hearing_request",
    "constitutional_argument",
    "statutory_analysis",
    "motion",
    "brief",
    "contract",
    "correspondence",
    "custom",
  ]

  useEffect(() => {
    const extractedVars = extractVariables(formData.content)
    setVariables(extractedVars)
  }, [formData.content])

  const extractVariables = (content: string): string[] => {
    const matches = content.match(/\{\{([^}]+)\}\}/g)
    return matches ? [...new Set(matches.map((match) => match.slice(2, -2)))] : []
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSave = () => {
    const now = new Date()
    const newVersion: TemplateVersion = {
      id: `v${Date.now()}`,
      version: template ? template.currentVersion + 1 : 1,
      title: formData.title,
      content: formData.content,
      variables,
      changelog: formData.changelog || "Initial version",
      createdAt: now,
      createdBy: "current-user", // This would come from auth context
    }

    const updatedTemplate: Template = {
      id: template?.id || `template-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags,
      currentVersion: newVersion.version,
      versions: template ? [...template.versions, newVersion] : [newVersion],
      isPublic: formData.isPublic,
      sharedWith: template?.sharedWith || [],
      createdBy: template?.createdBy || "current-user",
      createdAt: template?.createdAt || now,
      updatedAt: now,
      usage: template?.usage || 0,
      rating: template?.rating || 0,
      ratingCount: template?.ratingCount || 0,
    }

    onSave(updatedTemplate)
  }

  const renderPreview = () => {
    let preview = formData.content
    variables.forEach((variable) => {
      preview = preview.replace(new RegExp(`\\{\\{${variable}\\}\\}`, "g"), `[${variable.toUpperCase()}]`)
    })
    return preview
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{template ? "Edit Template" : "Create New Template"}</h1>
          <p className="text-muted-foreground">
            {template ? "Modify your existing template" : "Create a new legal document template"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={() => setShowPreview(true)} variant="outline">
            Preview
          </Button>
          {template && (
            <Button onClick={() => setShowVersionHistory(true)} variant="outline">
              History
            </Button>
          )}
          <Button onClick={handleSave} disabled={!formData.title || !formData.content}>
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Details</CardTitle>
              <CardDescription>Basic information about your template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Template title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the template"
                  rows={3}
                />
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="sm">
                    <IconPlus className="h-4 w-4" /> {/* Use IconPlus here */}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-xs hover:text-destructive">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="public"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
                />
                <Label htmlFor="public">Make this template public</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Content</CardTitle>
              <CardDescription>Write your template using variables in double curly braces</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Enter your template content. Use {{variable_name}} for variables."
                className="min-h-[400px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Use double curly braces for variables: {`{{variable_name}}`}
              </p>
            </CardContent>
          </Card>

          {template && (
            <Card>
              <CardHeader>
                <CardTitle>Version Notes</CardTitle>
                <CardDescription>Describe what changed in this version</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.changelog}
                  onChange={(e) => setFormData({ ...formData, changelog: e.target.value })}
                  placeholder="What did you change in this version?"
                  rows={3}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Variables</CardTitle>
              <CardDescription>Detected variables in your template</CardDescription>
            </CardHeader>
            <CardContent>
              {variables.length > 0 ? (
                <div className="space-y-2">
                  {variables.map((variable) => (
                    <Badge key={variable} variant="outline" className="block w-full text-center">
                      {variable}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No variables detected</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Duplicate Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Share Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Export Template
              </Button>
              {template && (
                <Button variant="destructive" className="w-full justify-start">
                  Delete Template
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>Preview of how your template will look with variables filled</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <pre className="whitespace-pre-wrap text-sm p-4 bg-muted rounded-lg">{renderPreview()}</pre>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Version History Dialog */}
      <Dialog open={showVersionHistory} onOpenChange={setShowVersionHistory}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Version History</DialogTitle>
            <DialogDescription>View and manage template versions</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              {template?.versions.map((version) => (
                <Card key={version.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">Version {version.version}</CardTitle>
                        <CardDescription>
                          {version.createdAt.toLocaleDateString()} by {version.createdBy}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          Restore
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{version.changelog}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setShowVersionHistory(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
