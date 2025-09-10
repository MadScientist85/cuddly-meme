"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconGavel, IconScale, IconFileText, IconUsers, IconArrowRight } from "@/components/ui/icons"
import Link from "next/link"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            AI-Powered Legal Assistant for Oklahoma Survivors' Act
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Streamline your legal document creation with specialized AI assistance for trauma-informed sentencing,
            post-conviction relief, and Oklahoma Survivors' Act litigation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/auth/signin">
                Get Started <IconArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-slate-100">
          Specialized Legal AI Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <IconGavel className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <CardTitle>Document Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate pleadings, motions, and briefs with AI assistance tailored for Oklahoma law.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <IconScale className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Constitutional Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Integrate constitutional arguments with due process and equal protection analysis.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <IconFileText className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <CardTitle>Template Library</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access pre-built templates for common legal documents and customize as needed.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <IconUsers className="h-12 w-12 mx-auto mb-4 text-orange-600" />
              <CardTitle>Expert Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Incorporate expert testimony and scientific references into your legal arguments.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 dark:bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Legal Practice?</h2>
          <p className="text-xl mb-8 text-slate-300">
            Join legal professionals using AI to create more effective legal documents.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
            <Link href="/auth/signup">
              Start Free Trial <IconArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
