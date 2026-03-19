"use client"

import { ShieldCheck, Briefcase, Sparkles } from "lucide-react"

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Privacy Focused",
    description: "Your product data is not stored. All information remains local to your browser.",
  },
  {
    icon: Briefcase,
    title: "Built for B2B",
    description: "Perfect for wholesale and sales sheets. Always review your output for accuracy.",
  },
  {
    icon: Sparkles,
    title: "Constantly Improving",
    description: "Moofty is evolving. We value your feedback to help us build the perfect tool.",
  },
]

export function TrustSection() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              {/* Palikta tavo originali bg-secondary spalva */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                <item.icon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
