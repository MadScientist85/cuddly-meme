import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import "@/app/globals.css"
import { cn } from "@/lib/utils"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Providers } from "@/components/providers"
import { Header } from "@/components/header"
import { Toaster } from "@/components/toaster"
import { Suspense } from "react"

export const metadata = {
  title: {
    default: "Legal AI Assistant",
    template: `%s - Legal AI Assistant`,
  },
  description: "An AI-powered legal assistant for Oklahoma Survivors Act litigation",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
    generator: 'v0.app'
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("font-sans antialiased", GeistSans.variable, GeistMono.variable)}>
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
              <Header />
            </Suspense>
            <main className="flex flex-col flex-1 bg-muted/50">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
