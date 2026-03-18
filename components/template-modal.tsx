"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Check, Layers, Table, Megaphone, Image } from "lucide-react"
import type { Template } from "@/app/page"

interface TemplateModalProps {
  open: boolean
  onClose: () => void
  onSelect: (template: Template) => void
}

const templates: { id: Template; name: string; description: string; icon: React.ElementType }[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, lots of whitespace",
    icon: Layers,
  },
  {
    id: "specs",
    name: "Specs",
    description: "Table-based, structured",
    icon: Table,
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Bold headings, feature highlights",
    icon: Megaphone,
  },
  {
    id: "visual",
    name: "Visual",
    description: "Large product image + short text",
    icon: Image,
  },
]

export function TemplateModal({ open, onClose, onSelect }: TemplateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl rounded-2xl border-none bg-card p-8 shadow-2xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Choose a template
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Select a layout that fits your product best
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className="group relative flex flex-col items-center rounded-2xl border-2 border-border bg-card p-6 transition-all duration-300 hover:border-primary hover:shadow-lg"
            >
              {/* Preview placeholder */}
              <div className="mb-4 flex h-32 w-full items-center justify-center rounded-xl bg-secondary/50">
                <template.icon className="h-10 w-10 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>

              <h3 className="mb-1 text-sm font-semibold text-foreground">
                {template.name}
              </h3>
              <p className="text-center text-xs text-muted-foreground">
                {template.description}
              </p>

              {/* Hover checkmark */}
              <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100">
                <Check className="h-4 w-4 text-white" />
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
