import type React from "react"
import { Suspense } from "react"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Legal AI Assistant",
  description: "AI-powered legal document generation and analysis",
    generator: 'v0.app'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </div>
            <TailwindIndicator />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
