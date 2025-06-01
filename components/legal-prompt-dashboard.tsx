"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"
import { IconPlus, IconEdit, IconTrash, IconSave, IconFileText, IconScale, IconGavel } from "@/components/ui/icons"
import { useLocalStorage } from "@/lib/hooks/use-local-storage"

interface LegalPrompt {
  id: string
  title: string
  category: string
  description: string
  template: string
  variables: string[]
  createdAt: Date
  updatedAt: Date
}

const defaultPrompts: LegalPrompt[] = [
  {
    id: "1",
    title: "Post-Conviction Relief Motion",
    category: "hearing_request",
    description: "Template for requesting post-conviction relief hearing under Oklahoma law",
    template: `MOTION FOR POST-CONVICTION RELIEF

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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Constitutional Due Process Argument",
    category: "constitutional_argument",
    description: "Template for constitutional due process violations",
    template: `CONSTITUTIONAL DUE PROCESS ARGUMENT

I. STATEMENT OF THE ISSUE
Whether the {{court_action}} violated Petitioner's constitutional right to due process under the Fourteenth Amendment to the United States Constitution and Article II, Section 7 of the Oklahoma Constitution.

II. ARGUMENT
A. Standard of Review
{{standard_of_review}}

B. Due Process Requirements
The Due Process Clause guarantees that no person shall be deprived of life, liberty, or property without due process of law. {{due_process_analysis}}

C. Application to Present Case
{{case_specific_analysis}}

III. CONCLUSION
For the foregoing reasons, {{conclusion_request}}.`,
    variables: [
      "court_action",
      "standard_of_review",
      "due_process_analysis",
      "case_specific_analysis",
      "conclusion_request",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Oklahoma Survivors' Act Application",
    category: "statutory_analysis",
    description: "Template for applications under the Oklahoma Survivors' Act",
    template: `APPLICATION UNDER OKLAHOMA SURVIVORS' ACT
22 O.S. § 1090.1 et seq.

I. APPLICANT INFORMATION
Name: {{applicant_name}}
Case Number: {{case_number}}
Conviction Date: {{conviction_date}}

II. STATUTORY REQUIREMENTS
Pursuant to 22 O.S. § 1090.1, this application is made on the grounds that:
{{statutory_grounds}}

III. EVIDENCE OF DOMESTIC VIOLENCE
{{evidence_description}}

IV. NEXUS BETWEEN VIOLENCE AND OFFENSE
{{nexus_analysis}}

V. REQUEST FOR RELIEF
Applicant respectfully requests that this Honorable Court:
{{relief_requested}}

VI. SUPPORTING DOCUMENTATION
{{supporting_docs}}`,
    variables: [
      "applicant_name",
      "case_number",
      "conviction_date",
      "statutory_grounds",
      "evidence_description",
      "nexus_analysis",
      "relief_requested",
      "supporting_docs",
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const categories = [
  { value: "hearing_request", label: "Hearing Requests", icon: IconGavel },
  { value: "constitutional_argument", label: "Constitutional Arguments", icon: IconScale },
  { value: "statutory_analysis", label: "Statutory Analysis", icon: IconFileText },
  { value: "motion", label: "Motions", icon: IconEdit },
  { value: "brief", label: "Legal Briefs", icon: IconFileText },
  { value: "custom", label: "Custom Templates", icon: IconPlus },
]

export function LegalPromptDashboard() {
  const [prompts, setPrompts] = useLocalStorage<LegalPrompt[]>("legal-prompts", defaultPrompts)
  const [selectedPrompt, setSelectedPrompt] = useState<LegalPrompt | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    description: "",
    template: "",
    variables: [] as string[],
  })

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCreatePrompt = () => {
    setEditForm({
      title: "",
      category: "",
      description: "",
      template: "",
      variables: [],
    })
    setIsCreating(true)
    setIsEditing(false)
  }

  const handleEditPrompt = (prompt: LegalPrompt) => {
    setEditForm({
      title: prompt.title,
      category: prompt.category,
      description: prompt.description,
      template: prompt.template,
      variables: prompt.variables,
    })
    setSelectedPrompt(prompt)
    setIsEditing(true)
    setIsCreating(false)
  }

  const handleSavePrompt = () => {
    if (isCreating) {
      const newPrompt: LegalPrompt = {
        id: Date.now().toString(),
        ...editForm,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setPrompts([...prompts, newPrompt])
    } else if (selectedPrompt) {
      const updatedPrompts = prompts.map((prompt) =>
        prompt.id === selectedPrompt.id ? { ...prompt, ...editForm, updatedAt: new Date() } : prompt,
      )
      setPrompts(updatedPrompts)
    }
    setIsEditing(false)
    setIsCreating(false)
    setSelectedPrompt(null)
  }

  const handleDeletePrompt = (promptId: string) => {
    setPrompts(prompts.filter((prompt) => prompt.id !== promptId))
    if (selectedPrompt?.id === promptId) {
      setSelectedPrompt(null)
    }
  }

  const extractVariables = (template: string): string[] => {
    const matches = template.match(/\{\{([^}]+)\}\}/g)
    return matches ? matches.map((match) => match.slice(2, -2)) : []
  }

  const handleTemplateChange = (template: string) => {
    const variables = extractVariables(template)
    setEditForm({ ...editForm, template, variables })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <IconScale className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Legal AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Customizable Legal Document Templates</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button onClick={handleCreatePrompt} className="flex items-center space-x-2">
                <IconPlus className="h-4 w-4" />
                <span>New Template</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
                <CardDescription>Filter templates by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory("all")}
                >
                  All Templates
                </Button>
                {categories.map((category) => {
                  const Icon = category.icon
                  const count = prompts.filter((p) => p.category === category.value).length
                  return (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.value)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {category.label}
                      <Badge variant="secondary" className="ml-auto">
                        {count}
                      </Badge>
                    </Button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="mb-6">
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {filteredPrompts.map((prompt) => {
                const category = categories.find((c) => c.category === prompt.category)
                const Icon = category?.icon || IconFileText
                return (
                  <Card key={prompt.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-5 w-5 text-primary" />
                          <CardTitle className="text-base">{prompt.title}</CardTitle>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditPrompt(prompt)
                            }}
                          >
                            <IconEdit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeletePrompt(prompt.id)
                            }}
                          >
                            <IconTrash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription className="text-sm">{prompt.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{category?.label || prompt.category}</Badge>
                        <div className="flex space-x-2">
                          <Badge variant="secondary">{prompt.variables.length} variables</Badge>
                          <Button size="sm" onClick={() => setSelectedPrompt(prompt)}>
                            Use Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredPrompts.length === 0 && (
              <Card>
                <CardContent className="py-8 text-center">
                  <IconFileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? "Try adjusting your search terms" : "Create your first legal template"}
                  </p>
                  <Button onClick={handleCreatePrompt}>
                    <IconPlus className="h-4 w-4 mr-2" />
                    Create Template
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Template Preview/Use Dialog */}
      <Dialog open={!!selectedPrompt && !isEditing} onOpenChange={() => setSelectedPrompt(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedPrompt?.title}</DialogTitle>
            <DialogDescription>{selectedPrompt?.description}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Template Preview</Label>
                <pre className="mt-2 p-4 bg-muted rounded-lg text-sm whitespace-pre-wrap">
                  {selectedPrompt?.template}
                </pre>
              </div>
              {selectedPrompt?.variables && selectedPrompt.variables.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Required Variables</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedPrompt.variables.map((variable) => (
                      <Badge key={variable} variant="outline">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedPrompt(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                // Here you would typically open a form to fill in the variables
                console.log("Using template:", selectedPrompt?.title)
              }}
            >
              Use This Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit/Create Dialog */}
      <Dialog
        open={isEditing || isCreating}
        onOpenChange={() => {
          setIsEditing(false)
          setIsCreating(false)
        }}
      >
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Create New Template" : "Edit Template"}</DialogTitle>
            <DialogDescription>
              {isCreating ? "Create a new legal document template" : "Modify the existing template"}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Template title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={editForm.category}
                    onValueChange={(value) => setEditForm({ ...editForm, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Brief description of the template"
                />
              </div>
              <div>
                <Label htmlFor="template">Template Content</Label>
                <Textarea
                  id="template"
                  value={editForm.template}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  placeholder="Enter your template content. Use {{variable_name}} for variables."
                  className="min-h-[300px] font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use double curly braces for variables: {`{{variable_name}}`}
                </p>
              </div>
              {editForm.variables.length > 0 && (
                <div>
                  <Label>Detected Variables</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {editForm.variables.map((variable) => (
                      <Badge key={variable} variant="outline">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false)
                setIsCreating(false)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePrompt} disabled={!editForm.title || !editForm.template}>
              <IconSave className="h-4 w-4 mr-2" />
              {isCreating ? "Create Template" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
