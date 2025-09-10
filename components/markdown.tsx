import type React from "react"
import { memo } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeHighlight from "rehype-highlight"
import { cn } from "@/lib/utils"

import "katex/dist/katex.min.css"
import "highlight.js/styles/github.css"

export interface MarkdownProps {
  children: string
  className?: string
}

const Markdown: React.FC<MarkdownProps> = ({ children, className }) => {
  return (
    <div className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight]}
        components={{
          pre: ({ children, ...props }) => (
            <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800" {...props}>
              {children}
            </pre>
          ),
          code: ({ inline, className, children, ...props }) => {
            if (inline) {
              return (
                <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800" {...props}>
                  {children}
                </code>
              )
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" {...props}>
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border border-gray-300 bg-gray-50 px-4 py-2 text-left dark:border-gray-600 dark:bg-gray-700"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-gray-300 px-4 py-2 dark:border-gray-600" {...props}>
              {children}
            </td>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic dark:border-gray-600" {...props}>
              {children}
            </blockquote>
          ),
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

export const MemoizedReactMarkdown = memo(Markdown)

export default Markdown
