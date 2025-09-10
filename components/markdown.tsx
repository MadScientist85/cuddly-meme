"use client"

import * as React from "react"
import ReactMarkdown, { type Options } from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeHighlight from "rehype-highlight"
import rehypeKatex from "rehype-katex"

import { cn } from "@/lib/utils"
import { CodeBlock } from "@/components/ui/codeblock"

import "highlight.js/styles/github-dark.css"
import "katex/dist/katex.min.css"

const MemoizedReactMarkdown: React.FC<Options> = React.memo(
  ReactMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children && prevProps.className === nextProps.className,
)

interface MarkdownProps {
  children: string
  className?: string
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <MemoizedReactMarkdown
      className={cn("prose prose-neutral dark:prose-invert max-w-none", className)}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeHighlight, rehypeKatex]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>
        },
        h1({ children }) {
          return <h1 className="text-2xl font-bold mb-4">{children}</h1>
        },
        h2({ children }) {
          return <h2 className="text-xl font-semibold mb-3">{children}</h2>
        },
        h3({ children }) {
          return <h3 className="text-lg font-medium mb-2">{children}</h3>
        },
        ul({ children }) {
          return <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
        },
        li({ children }) {
          return <li className="mb-1">{children}</li>
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">
              {children}
            </blockquote>
          )
        },
        code({ node, inline, className, children, ...props }) {
          if (children.length) {
            if (children[0] == "▍") {
              return <span className="mt-1 animate-pulse cursor-default">▍</span>
            }

            children[0] = (children[0] as string).replace("`▍`", "▍")
          }

          const match = /language-(\w+)/.exec(className || "")

          if (inline) {
            return (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          }

          return (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || ""}
              value={String(children).replace(/\n$/, "")}
              {...props}
            />
          )
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
                {children}
              </table>
            </div>
          )
        },
        thead({ children }) {
          return <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
        },
        tbody({ children }) {
          return <tbody>{children}</tbody>
        },
        tr({ children }) {
          return <tr className="border-b border-gray-300 dark:border-gray-600">{children}</tr>
        },
        th({ children }) {
          return (
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">
              {children}
            </th>
          )
        },
        td({ children }) {
          return <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{children}</td>
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          )
        },
        strong({ children }) {
          return <strong className="font-semibold">{children}</strong>
        },
        em({ children }) {
          return <em className="italic">{children}</em>
        },
        hr() {
          return <hr className="my-6 border-gray-300 dark:border-gray-600" />
        },
      }}
    >
      {children}
    </MemoizedReactMarkdown>
  )
}

export { MemoizedReactMarkdown }
