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
import * as htmlToImage from 'html-to-image';
import { jsPDF } from "jspdf";

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
    console.log("Pradedamas PDF generavimas su spalvų konvertavimu...");

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      onclone: (clonedDoc) => {
        const el = clonedDoc.getElementById("product-sheet-pdf");
        if (el) {
          // 1. Surandame VISUS elementus peržiūros lange
          const allElements = el.getElementsByTagName("*");
          
          for (let i = 0; i < allElements.length; i++) {
            const node = allElements[i] as HTMLElement;
            
            // 2. IŠVALOME ŠEŠĖLIUS (didžiausia "lab" spalvų tikimybė)
            // Pakeičiame modernius Tailwind šešėlius į paprastą juodą skaidrumą
            const style = window.getComputedStyle(node);
            if (style.boxShadow !== 'none') {
              node.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            }

            // 3. IŠVALOME BLUR (jei html2canvas vis tiek lūžta)
            if (style.filter.includes('blur')) {
              node.style.filter = 'none'; // Laikinai išjungiam blur tik PDF'ui
            }

            // 4. FIX: Jei fono spalva yra lab/oklch, paverčiam ją į HEX/RGB
            // Tai priverčia naršyklę interpretuoti spalvą standartiškai
            if (node.style.backgroundColor.includes('lab') || node.style.backgroundColor.includes('oklch')) {
              node.style.backgroundColor = '#ffffff'; 
            }
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
    const title = currentProductData.productName?.trim() || "produkto-lapas";
    pdf.save(`${title}.pdf`);

    if (!isAdmin) setDownloads((prev) => prev - 1);

  } catch (error: any) {
    console.error("DETALI KLAIDA:", error);
    // Jei vis tiek meta "lab", vadinasi problema yra pačiame Tailwind konfigūracijoje
    alert("Klaida: " + error.message + ". Pabandykite nuimti 'shadow-2xl' nuo pagrindinio rėmo.");
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
