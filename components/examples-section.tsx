"use client"

import { ArrowRight } from "lucide-react"
import type { ProductData, Template } from "@/app/page"

export interface ExampleProduct {
  name: string
  template: Template
  description: string
  data: ProductData
  number: string
}

const examples: ExampleProduct[] = [
  {
    template: "b2b-pro" as any,
    number: "01",
    name: "Food & Beverage",
    description: "Retail-ready snack sheet",
    data: {
      productName: "Zesty Rings – Superfruit Snack",
      brandName: "NatureBite Co.",
      description: "Organic, air-dried fruit rings infused with natural zest. Perfect for premium retail shelves and health-conscious consumers. Non-GMO, vegan, and gluten-free.",
      features: "100% Organic Fruit\nNo Added Sugars\nEco-Friendly Packaging\nHigh Fiber Content",
      specifications: [
        { key: "Shelf Life", value: "12 Months" },
        { key: "Case Size", value: "24 Units" },
        { key: "Weight", value: "45g per pack" },
        { key: "Origin", value: "EU Agriculture" }
      ],
      price: "€1.45 / Unit",
      imageUrl: "https://i.postimg.cc/T1gzjWmz/pouch-509preview.webp",
      contactEmail: "wholesale@naturebite.com",
      website: "www.naturebite.com",
      settings: {
        cornerRadius: "24px", // Labai užapvalinti kampai (draugiškas brandas)
        primaryColor: "#10B981", // Žalia (maistas/gamta)
        footerBg: "#10B981",
        usePremiumBg: true,
        showShadows: true,
        syncFooterColor: true
      }
    } as any,
  },
  {
    template: "b2b-pro" as any,
    number: "02",
    name: "Beauty & Care",
    description: "Premium skincare sheet",
    data: {
      productName: "CELISTA – Renewal Serum",
      brandName: "Celista Paris",
      description: "Advanced hyaluronic acid serum designed for deep hydration and visible radiance. Formulated for professional spa use and high-end beauty boutiques.",
      features: "Dermatologically Tested\nFragrance Free\n24h Hydration Lock\nProfessional Grade",
      specifications: [
        { key: "Volume", value: "30ml" },
        { key: "SKU", value: "CLS-SRM-01" },
        { key: "MOQ", value: "100 Units" },
        { key: "Lead Time", value: "5-7 Days" }
      ],
      price: "€28.00 / Unit",
      imageUrl: "https://i.postimg.cc/vHykFT5T/Chat-GPT-Image-Mar-17-2026-02-26-25-PM.png",
      contactEmail: "partners@celista.fr",
      website: "www.celista.fr",
      settings: {
        cornerRadius: "4px", // Minimaliai suapvalinta (elegancija)
        primaryColor: "#EC4899", // Rožinė (grožis)
        footerBg: "#1e293b", // Tamsus footeris (kontrastas/prabanga)
        usePremiumBg: true,
        showShadows: false,
        syncFooterColor: false
      }
    } as any,
  },
  {
    template: "b2b-pro" as any,
    number: "03",
    name: "Tech & Audio",
    description: "Electronics spec sheet",
    data: {
      productName: "NEOTUNE – Wireless Earbuds",
      brandName: "NeoTune Labs",
      description: "True wireless earbuds featuring active noise cancellation and 30-hour battery life. Engineered for superior sound clarity and ergonomic comfort.",
      features: "Active Noise Cancelling\nIPX5 Water Resistant\nUSB-C Fast Charge\nTouch Controls",
      specifications: [
        { key: "Bluetooth", value: "5.3" },
        { key: "Battery", value: "30h Total" },
        { key: "Drivers", value: "10mm Graphene" },
        { key: "Warranty", value: "2 Years" }
      ],
      price: "$45.00 (B2B)",
      imageUrl: "https://i.postimg.cc/vZcvpwqN/Chat-GPT-Image-Mar-17-2026-02-27-02-PM.png",
      contactEmail: "sales@neotune.tech",
      website: "www.neotune.tech",
      settings: {
        cornerRadius: "12px", // Standartinis modernus užapvalinimas
        primaryColor: "#6366F1", // Indigo (technologijos)
        footerBg: "#6366F1",
        usePremiumBg: true,
        showShadows: true,
        syncFooterColor: true
      }
    } as any,
  },
  {
    template: "b2b-pro" as any,
    number: "04",
    name: "Industrial Tools",
    description: "Power tool sheet",
    data: {
      productName: "VORTEX – Cordless Drill",
      brandName: "Vortex Heavy Duty",
      description: "High-torque 20V cordless drill built for construction professionals. Featuring a brushless motor for extended life and maximum performance under load.",
      features: "Brushless Motor\nDual Speed Gearbox\nLED Work Light\nFast Charging 4Ah Battery",
      specifications: [
        { key: "Voltage", value: "20V MAX" },
        { key: "Max Torque", value: "65 Nm" },
        { key: "Chuck Size", value: "13mm Metal" },
        { key: "Weight", value: "1.8 kg" }
      ],
      price: "$120.00 / Unit",
      imageUrl: "https://i.postimg.cc/Kj0nH0nk/Chat-GPT-Image-Mar-17-2026-02-27-26-PM.png",
      contactEmail: "supply@vortex-tools.com",
      website: "www.vortex-tools.com",
      settings: {
        cornerRadius: "0px", // Griežti kampai (industrinis/tvirtas įvaizdis)
        primaryColor: "#F59E0B", // Oranžinė (statybos/įrankiai)
        footerBg: "#0F172A", // Beveik juodas (rimtumas)
        usePremiumBg: false, // Jokių blizgučių, tik darbas
        showShadows: true,
        syncFooterColor: false
      }
    } as any,
  },
]

// Pagalbiniai stiliai tik kortelėms tinklelyje
const categoryColors: Record<string, string> = {
  "Food & Beverage": "bg-emerald-100 text-emerald-600",
  "Beauty & Care": "bg-pink-100 text-pink-600",
  "Tech & Audio": "bg-indigo-100 text-indigo-600",
  "Industrial Tools": "bg-amber-100 text-amber-600",
}

export function ExamplesSection({ onExampleClick }: { onExampleClick: (e: ExampleProduct) => void }) {
  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Professional Use Cases
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Select a starting point and customize it to match your brand identity.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {examples.map((example) => (
            <button
              key={example.number}
              onClick={() => onExampleClick(example)}
              className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-2 text-left transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-200"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={example.data.imageUrl || ""}
                  alt={example.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${categoryColors[example.name]}`}>
                  {example.name}
                </div>
              </div>

             {/* Content */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">
                    {example.number}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {example.data.productName}
                </h3>
                <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                  {example.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Specs", "Pricing", "Branding"].map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-400 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
