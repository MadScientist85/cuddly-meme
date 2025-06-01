"use client"

import { type FC, memo } from "react"
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard"
import { IconCheck, IconCopy, IconDownload } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"

interface Props {
  language: string
  value: string
}

interface languageMap {
  [key: string]: string | undefined
}

export const programmingLanguages: languageMap = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
  json: ".json",
  xml: ".xml",
  yaml: ".yaml",
  markdown: ".md",
}

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return lowercase ? result.toLowerCase() : result
}

// Simple syntax highlighting function
const highlightSyntax = (code: string, language: string): string => {
  if (!language || language === "text") return code

  // Keywords for different languages
  const keywords: { [key: string]: string[] } = {
    javascript: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
    ],
    typescript: [
      "const",
      "let",
      "var",
      "function",
      "return",
      "if",
      "else",
      "for",
      "while",
      "class",
      "import",
      "export",
      "interface",
      "type",
    ],
    python: ["def", "class", "import", "from", "return", "if", "else", "elif", "for", "while", "try", "except"],
    java: ["public", "private", "class", "interface", "return", "if", "else", "for", "while", "try", "catch"],
    sql: ["SELECT", "FROM", "WHERE", "INSERT", "UPDATE", "DELETE", "CREATE", "TABLE", "INDEX"],
  }

  const langKeywords = keywords[language.toLowerCase()] || []

  let highlighted = code

  // Highlight keywords
  langKeywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g")
    highlighted = highlighted.replace(regex, `<span class="text-blue-400 font-semibold">${keyword}</span>`)
  })

  // Highlight strings
  highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>')
  highlighted = highlighted.replace(/'([^']*)'/g, "<span class=\"text-green-400\">'$1'</span>")

  // Highlight comments
  highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="text-gray-500 italic">$&</span>')
  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-500 italic">$&</span>')
  highlighted = highlighted.replace(/#.*$/gm, '<span class="text-gray-500 italic">$&</span>')

  // Highlight numbers
  highlighted = highlighted.replace(/\b\d+\.?\d*\b/g, '<span class="text-orange-400">$&</span>')

  return highlighted
}

const CodeBlock: FC<Props> = memo(({ language, value }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const downloadAsFile = () => {
    if (typeof window === "undefined") {
      return
    }
    const fileExtension = programmingLanguages[language] || ".txt"
    const suggestedFileName = `code-${generateRandomString(3, true)}${fileExtension}`
    const fileName = window.prompt("Enter file name", suggestedFileName)

    if (!fileName) {
      return
    }

    const blob = new Blob([value], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = fileName
    link.href = url
    link.style.display = "none"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(value)
  }

  // Split code into lines for line numbers
  const lines = value.split("\n")
  const highlightedCode = highlightSyntax(value, language)
  const highlightedLines = highlightedCode.split("\n")

  return (
    <div className="codeblock relative w-full bg-gray-950 border border-gray-800 rounded-lg overflow-hidden font-mono text-sm shadow-lg">
      {/* Header */}
      <div className="flex w-full items-center justify-between bg-gray-900 px-4 py-3 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-xs font-medium ml-2">{language || "text"}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-gray-800 text-gray-400 hover:text-gray-200"
            onClick={downloadAsFile}
            size="icon"
          >
            <IconDownload className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-gray-800 text-gray-400 hover:text-gray-200"
            onClick={onCopy}
            size="icon"
          >
            {isCopied ? <IconCheck className="h-4 w-4" /> : <IconCopy className="h-4 w-4" />}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <div className="flex min-h-0">
          {/* Line numbers */}
          <div className="flex flex-col bg-gray-900 px-4 py-4 text-gray-500 select-none border-r border-gray-800 min-w-0">
            {lines.map((_, index) => (
              <div key={index} className="text-right leading-6 text-xs">
                {index + 1}
              </div>
            ))}
          </div>

          {/* Code content with syntax highlighting */}
          <div className="flex-1 overflow-x-auto">
            <pre className="p-4 text-gray-100 leading-6 text-xs">
              {highlightedLines.map((line, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }} />
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
})

CodeBlock.displayName = "CodeBlock"

export { CodeBlock }
