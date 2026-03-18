"use client"

import { Check, Sparkles, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PricingSectionProps {
  onPurchase: (downloads: number) => void
  isLoggedIn: boolean
}

const plans = [
  {
    name: "Starter",
    price: "Free",
    priceDetail: "",
    features: ["Unlimited previews", "No downloads"],
    downloads: 0,
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "€10.99",
    priceDetail: "one-time",
    features: ["Unlimited previews", "10 downloads", "All templates"],
    downloads: 10,
    highlighted: false,
    cta: "Buy Pro",
  },
  {
    name: "Advanced",
    price: "€19.99",
    priceDetail: "one-time",
    features: ["Unlimited previews", "25 downloads", "All templates", "Priority support"],
    downloads: 25,
    highlighted: true,
    badge: "Most popular",
    cta: "Buy Advanced",
  },
  {
    name: "Premium",
    price: "Coming soon",
    priceDetail: "",
    features: ["More downloads", "AI assistance", "More templates", "Custom branding"],
    downloads: 0,
    highlighted: false,
    locked: true,
    cta: "Get early access",
  },
]

export function PricingSection({ onPurchase, isLoggedIn }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Simple pricing</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Pay only when you download
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Generate unlimited previews — only downloads are counted.
          </p>
        </div>

        {/* Plans */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border-2 bg-card p-6 transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary shadow-xl shadow-primary/10 lg:scale-105"
                  : "border-border hover:border-primary/50 hover:shadow-lg"
              } ${plan.locked ? "opacity-80" : ""}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-xs font-semibold text-white">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Lock icon for Premium */}
              {plan.locked && (
                <div className="absolute right-4 top-4">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
              )}

              {/* Plan name */}
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">
                  {plan.price}
                </span>
                {plan.priceDetail && (
                  <span className="ml-1 text-sm text-muted-foreground">
                    {plan.priceDetail}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="mb-6 flex-1 space-y-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={() => {
                  if (plan.downloads > 0 && !plan.locked) {
                    onPurchase(plan.downloads)
                  }
                }}
                disabled={plan.locked}
                className={`w-full rounded-2xl py-5 font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:scale-[1.02] hover:shadow-xl"
                    : plan.locked
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
