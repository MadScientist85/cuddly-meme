import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Legal AI Assistant",
    template: "%s | Legal AI Assistant",
  },
  description: "AI-powered legal research and document generation for Oklahoma post-conviction relief",
  keywords: ["legal", "AI", "assistant", "Oklahoma", "post-conviction", "relief", "survivors act"],
  authors: [{ name: "Legal AI Team" }],
  creator: "Legal AI Team",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Legal AI Assistant",
    description: "AI-powered legal research and document generation",
    siteName: "Legal AI Assistant",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal AI Assistant",
    description: "AI-powered legal research and document generation",
    creator: "@legalai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
