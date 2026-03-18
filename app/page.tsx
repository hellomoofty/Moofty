"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { GeneratorPanel } from "@/components/generator-panel"
import { PricingSection } from "@/components/pricing-section"
import { ExamplesSection, type ExampleProduct } from "@/components/examples-section"
import { TrustSection } from "@/components/trust-section"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

// Kadangi nebėra 4 šablonų, naudojame vieną pagrindinį "b2b-pro"
export type Template = string;

export interface ProductData {
  productName: string
  brandName?: string
  description: string
  features: string
  specifications: { key: string; value: string }[]
  price: string
  imageUrl: string | null
  contactEmail?: string
  contactPhone?: string
  website?: string
  labels?: Record<string, string>
  settings?: {
    cornerRadius: string
    primaryColor: string
    footerBg: string
    usePremiumBg: boolean
    fontColor: string
    showShadows: boolean
    syncFooterColor: boolean
  }
}

export default function Home() {
  const [showGenerator, setShowGenerator] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [downloads, setDownloads] = useState(0)
  const [initialProductData, setInitialProductData] = useState<ProductData | undefined>(undefined)

  // PAGRINDINIS VEIKSMAS: Atidaro tuščią generatorių
  const handleStartGenerating = () => {
    setInitialProductData(undefined) // Užtikriname, kad forma būtų tuščia
    setShowGenerator(true)
    window.scrollTo(0, 0)
  }

  // PAVYZDŽIO VEIKSMAS: Atidaro generatorių su pavyzdžio duomenimis
  const handleExampleClick = (example: ExampleProduct) => {
    setInitialProductData(example.data as any)
    setShowGenerator(true)
    window.scrollTo(0, 0)
  }

const handleDownload = async (currentProductData: ProductData) => {
  const isAdmin = isLoggedIn;

  if (!isLoggedIn) {
    setShowAuthModal(true);
    return;
  }

  const element = document.getElementById("product-sheet-pdf");
  if (!element) return;

  try {
    console.log("Vykdomas agresyvus spalvų valymas...");
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      onclone: (clonedDoc) => {
        // 1. Surandame visus elementus kopijoje
        const allElements = clonedDoc.getElementsByTagName("*");
        
        for (let i = 0; i < allElements.length; i++) {
          const node = allElements[i] as HTMLElement;
          const style = window.getComputedStyle(node);

          // 2. Jei elementas naudoja modernų filtrą (blur) arba šešėlį, 
          // kuris dažnai naudoja lab() spalvas, mes jį "sušvelniname"
          if (style.filter.includes('blur') || style.backdropFilter.includes('blur')) {
             // Vietoj to, kad ištrintume, tiesiog nuimame filtrą generavimo momentui
             node.style.filter = 'none';
             node.style.backdropFilter = 'none';
          }

          // 3. Ištaisome "lab" spalvas šešėliuose (didžiausia problema)
          if (style.boxShadow.includes('lab') || style.boxShadow.includes('oklch')) {
            node.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; // Pakeičiam į saugų šešėlį
          }
          
          // 4. Jei fonas naudoja lab/oklch, pakeičiam į paprastą spalvą
          if (style.backgroundColor.includes('lab') || style.backgroundColor.includes('oklch')) {
             node.style.backgroundColor = '#ffffff'; 
          }
        }
      }
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
    pdf.save(`${currentProductData.productName || "preke"}.pdf`);

  } catch (error: any) {
    console.error("PDF klaida:", error);
    alert("Klaida vis dar išlieka. Priežastis: " + error.message);
  }
};
  const handleAuth = () => {
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  const handlePurchase = (downloadCount: number) => {
    setDownloads((prev) => prev + downloadCount)
  }

  return (
    <main className="min-h-screen bg-background text-slate-900">
      {!showGenerator ? (
        <>
          <Navbar onLoginClick={() => setShowAuthModal(true)} isLoggedIn={isLoggedIn} />
          
          <HeroSection
            onGenerateClick={handleStartGenerating}
            onViewExamples={() => {
              const examplesSection = document.getElementById("examples")
              examplesSection?.scrollIntoView({ behavior: "smooth" })
            }}
          />

          <section id="examples">
            <ExamplesSection onExampleClick={handleExampleClick} />
          </section>

          <section id="pricing">
            <PricingSection onPurchase={handlePurchase} isLoggedIn={isLoggedIn} />
          </section>

          <TrustSection />
          <Footer />
        </>
      ) : (
        /* GENERATORIAUS RĖŽIMAS */
        <GeneratorPanel
          template="b2b-pro"
          onBack={() => {
            setShowGenerator(false)
            setInitialProductData(undefined)
          }}
          // Perduodame handleDownload. GeneratorPanel turės iškviesti ją su esamais duomenimis.
          onDownload={handleDownload}
          downloads={downloads}
          isLoggedIn={isLoggedIn}
          initialData={initialProductData as any}
        />
      )}

      {/* AUTENTIFIKACIJOS MODALAS */}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />
    </main>
  )
}
