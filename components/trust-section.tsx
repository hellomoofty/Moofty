"use client"

import { Shield, Database, AlertCircle } from "lucide-react"

const trustItems = [
  {
    icon: Shield,
    title: "Your product data is not stored",
    description: "All product information remains local to your browser",
  },
  {
    icon: Database,
    title: "Only account data is saved",
    description: "We only store your login credentials securely",
  },
  {
    icon: AlertCircle,
    title: "Automated generator",
    description: "This tool may contain errors — always review your output",
  },
]

export function TrustSection() {
  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary">
                <item.icon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
