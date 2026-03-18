"use client"

import { Sparkles, FileText } from "lucide-react"

interface HeroSectionProps {
  onGenerateClick: () => void
  onViewExamples: () => void
}

export function HeroSection({ onGenerateClick, onViewExamples }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:py-36">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>No design skills needed</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Generate product sheets in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              60 seconds
            </span>
          </h1>

          {/* Subtext */}
          <p className="mb-10 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl">
            Create clean, professional product sheets instantly. No design skills needed.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <button
              onClick={onGenerateClick}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent px-10 py-5 text-xl font-semibold text-white shadow-lg transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-xl"
            >
              <span className="relative z-10">Generate Product Sheet</span>
              <FileText className="relative z-10 h-6 w-6" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>

            <button
              onClick={onViewExamples}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary px-8 py-4 text-lg font-semibold text-secondary-foreground transition-all duration-200 hover:bg-secondary/80"
            >
              View Examples
            </button>
          </div>

          {/* Positioning */}
          <p className="mt-16 text-sm font-medium text-muted-foreground">
            Designed for product teams and wholesale businesses
          </p>
        </div>
      </div>
    </section>
  )
}
