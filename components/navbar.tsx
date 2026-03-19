"use client"

import { FileText } from "lucide-react"

interface NavbarProps {
  onLoginClick: () => void
  isLoggedIn: boolean
}

export function Navbar({ onLoginClick, isLoggedIn }: NavbarProps) {
  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing")
    pricingSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
   <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
  <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
    
    {/* Logo – Padidintas variantas */}
    <a href="/" className="flex items-center gap-4"> 
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md">
        <FileText className="h-7 w-7 text-white" /> 
      </div>
      <span className="text-2xl font-bold text-foreground tracking-tight">Moofty</span>
    </a>

        {/* Navigation */}
        {/* <nav className="flex items-center gap-6">
          <button
            onClick={scrollToPricing}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </button>
          <button
            onClick={onLoginClick}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {isLoggedIn ? "Account" : "Login"}
          </button>
        </nav>
      */}
      </div>
    </header>
  )
}
