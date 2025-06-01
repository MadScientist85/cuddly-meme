"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { IconDownload, IconFileText, IconSpinner } from "@/components/ui/icons"
import type { Template } from "@/lib/types/template"

interface TemplateExportProps {
  template: Template
  isOpen: boolean
  onClose: () => void
}

export function TemplateExport({ template, isOpen, onClose }: TemplateExportProps) {
  const [exportFormat, setExportFormat] = useState<"json" | "csv" | "pdf" | "docx">("json")
  const [includeMetadata, setIncludeMetadata] = useState(true)
  const [includeVersionHistory, setIncludeVersionHistory] = useState(false)
  const [includeVariables, setIncludeVariables] = useState(true)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const exportData = {
        template,
        options: {
          includeMetadata,
          includeVersionHistory,
          includeVariables,
        },
      }

      let blob: Blob
      let filename: string

      switch (exportFormat) {
        case "json":
          blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
          filename = `${template.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.json`
          break

        case "csv":
          const csvContent = generateCSV(template)
          blob = new Blob([csvContent], { type: "text/csv" })
          filename = `${template.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.csv`
          break

        case "pdf":
          // This would typically call a PDF generation service
          const pdfContent = await generatePDF(template)
          blob = new Blob([pdfContent], { type: "application/pdf" })
          filename = `${template.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`
          break

        case "docx":
          // This would typically call a DOCX generation service
          const docxContent = await generateDOCX(template)
          blob = new Blob([docxContent], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          })
          filename = `${template.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.docx`
          break

        default:
          throw new Error("Unsupported export format")
      }

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      onClose()
    } catch (error) {
      console.error("Export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const generateCSV = (template: Template): string => {
    const currentVersion = template.versions[template.currentVersion - 1]
    const rows = [
      ["Field", "Value"],
      ["Title", template.title],
      ["Description", template.description],
      ["Category", template.category],
      ["Tags", template.tags.join("; ")],
      ["Created", template.createdAt.toISOString()],
      ["Updated", template.updatedAt.toISOString()],
      ["Version", template.currentVersion.toString()],
      ["Variables", currentVersion.variables.join("; ")],
      ["Content", currentVersion.content.replace(/"/g, '""')],
    ]

    return rows.map((row) => `"${row[0]}","${row[1]}"`).join("\n")
  }

  const generatePDF = async (template: Template): Promise<ArrayBuffer> => {
    // This is a placeholder - in a real implementation, you'd use a PDF library
    // or call a backend service to generate the PDF
    const content = `
Template: ${template.title}
Description: ${template.description}
Category: ${template.category}
Tags: ${template.tags.join(", ")}

Content:
${template.versions[template.currentVersion - 1].content}
    `
    return new TextEncoder().encode(content).buffer
  }

  const generateDOCX = async (template: Template): Promise<ArrayBuffer> => {
    // This is a placeholder - in a real implementation, you'd use a DOCX library
    // or call a backend service to generate the DOCX
    const content = `
Template: ${template.title}
Description: ${template.description}
Category: ${template.category}
Tags: ${template.tags.join(", ")}

Content:
${template.versions[template.currentVersion - 1].content}
    `
    return new TextEncoder().encode(content).buffer
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <IconDownload className="h-5 w-5" />
            <span>Export Template</span>
          </DialogTitle>
          <DialogDescription>Export "{template.title}" in your preferred format</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Export Format */}
          <div>
            <Label htmlFor="format">Export Format</Label>
            <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON - Machine readable format</SelectItem>
                <SelectItem value="csv">CSV - Spreadsheet format</SelectItem>
                <SelectItem value="pdf">PDF - Document format</SelectItem>
                <SelectItem value="docx">DOCX - Word document</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Export Options */}
          <div>
            <Label className="text-base font-medium">Export Options</Label>
            <div className="mt-2 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="metadata"
                  checked={includeMetadata}
                  onCheckedChange={(checked) => setIncludeMetadata(checked as boolean)}
                />
                <Label htmlFor="metadata" className="text-sm">
                  Include metadata (creation date, tags, etc.)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="variables"
                  checked={includeVariables}
                  onCheckedChange={(checked) => setIncludeVariables(checked as boolean)}
                />
                <Label htmlFor="variables" className="text-sm">
                  Include variable definitions
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="versions"
                  checked={includeVersionHistory}
                  onCheckedChange={(checked) => setIncludeVersionHistory(checked as boolean)}
                />
                <Label htmlFor="versions" className="text-sm">
                  Include version history
                </Label>
              </div>
            </div>
          </div>

          {/* Format Info */}
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-start space-x-2">
              <IconFileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div className="text-xs text-muted-foreground">
                {exportFormat === "json" && "JSON format preserves all template data and structure."}
                {exportFormat === "csv" && "CSV format is ideal for importing into spreadsheet applications."}
                {exportFormat === "pdf" && "PDF format creates a formatted document suitable for printing."}
                {exportFormat === "docx" && "DOCX format creates an editable Word document."}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <IconSpinner className="h-4 w-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <IconDownload className="h-4 w-4 mr-2" />
                Export
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
