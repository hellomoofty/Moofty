"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Shield, Star } from "lucide-react" // Pridėjau Star ikoną savininkei

interface AuthModalProps {
  open: boolean
  onClose: () => void
  onAuth: () => void
}

export function AuthModal({ open, onClose, onAuth }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Tavo el. paštas - sistemos raktas
  const ADMIN_EMAIL = "edraftstudio@gmail.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Jei jungiasi savininkė, leidžiame iškart
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      console.log("Sveika sugrįžusi, edraftstudio!");
      onAuth();
      return;
    }

    // Visiems kitiems - standartinė onAuth funkcija
    onAuth()
  }

  const isOwner = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl border-none bg-card p-8 shadow-2xl">
        <DialogHeader className="mb-6 text-center">
          <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${isOwner ? 'from-amber-400 to-orange-600' : 'from-primary to-accent'}`}>
            {isOwner ? <Star className="h-7 w-7 text-white" /> : <FileText className="h-7 w-7 text-white" />}
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {isOwner ? "Owner Access" : (mode === "signin" ? "Welcome back" : "Create an account")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isOwner 
              ? "Unlimited access granted for edraftstudio." 
              : (mode === "signin" ? "Sign in to download your product sheets" : "Sign up to start downloading")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl border-border"
            />
          </div>

          {/* Slaptažodį slepiame, jei tai savininkė, kad būtų greičiau */}
          {!isOwner && (
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border-border"
              />
            </div>
          )}

          <Button
            type="submit"
            className={`w-full rounded-2xl py-6 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl ${isOwner ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-gradient-to-r from-primary to-accent'}`}
          >
            {isOwner ? "Enter Admin Mode" : (mode === "signin" ? "Sign In" : "Create Account")}
          </Button>
        </form>

        {!isOwner && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {mode === "signin"
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        )}

        {/* Privacy notice */}
        <div className="mt-6 flex items-start gap-3 rounded-xl bg-secondary/50 p-4">
          <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Your product data is not stored. Only your account information is
            saved for login purposes.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
