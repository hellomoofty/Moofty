"use client"

import { Sparkles, FileText, CheckCircle } from "lucide-react"

interface HeroSectionProps {
  onGenerateClick: () => void
}

export function HeroSection({ onGenerateClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Fono efektai */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 blur-[100px]">
        <div className="absolute top-10 left-[15%] w-80 h-80 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-accent/20 rounded-full" />
      </div>
      
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* KAIRĖ PUSĖ: Tekstas ir pagrindinis CTA */}
          <div className="flex flex-col items-start text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>No design skills needed</span>
            </div>

            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
              Generate product sheets in{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                60 seconds
              </span>
            </h1>

            <p className="mb-10 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl leading-relaxed">
              Create clean, professional product sheets instantly. No design skills needed.
            </p>

            <div className="flex w-full sm:w-auto">
              <button
                onClick={onGenerateClick}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent px-10 py-5 text-xl font-semibold text-white shadow-lg transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-xl active:scale-95"
              >
                <span className="relative z-10">Generate Product Sheet</span>
                <FileText className="relative z-10 h-6 w-6" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </div>

            <p className="mt-16 text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Designed for product teams and wholesale businesses
            </p>
          </div>

          {/* DEŠINĖ PUSĖ: Tavo naujas paveikslėlis */}
          <div className="relative lg:block hidden">
            <div className="relative z-10 rounded-[2rem] border-[8px] border-slate-900/5 bg-white p-2 shadow-2xl rotate-2 transition-transform duration-500 hover:rotate-0">
              <img 
                src="https://i.postimg.cc/KvrKj6f0/613aaee2-1.png" 
                alt="Moofty Product Sheet Example" 
                className="rounded-[1.5rem] w-full h-auto shadow-sm"
              />
            </div>

            {/* Plaukiojanti kortelė */}
            <div className="absolute -bottom-6 -left-10 z-20 animate-bounce-slow">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-200">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                  <p className="text-sm font-bold text-slate-900 leading-none">Ready to Export</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
