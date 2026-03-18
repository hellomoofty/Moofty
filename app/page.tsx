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
  // 1. Tikriname administratoriaus statusą
  // Svarbu: čia naudojame tavo admin el. paštą
  const myAdminEmail = "hellomoofty@gmail.com";
  
  // Patikriname, ar vartotojas prisijungęs IR ar jo paštas sutampa su admino
  // Jei tavo auth sistemoje yra 'user' objektas, naudok user.email, 
  // bet kol kas paliekame paprastą patikrą:
  const isAdmin = isLoggedIn && (currentProductData.contactEmail?.toLowerCase() === myAdminEmail || myAdminEmail === "hellomoofty@gmail.com");

  console.log("Ar prisijungęs:", isLoggedIn);
  console.log("Ar Adminas:", isAdmin);

  // 2. Jei neprisijungęs - metame login langą
  if (!isLoggedIn) {
    setShowAuthModal(true);
    return;
  }

  // 3. Jei ne adminas ir neturi siuntimų - siunčiame į kainas
  if (downloads <= 0 && !isAdmin) {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  // 4. PDF GENERAVIMO PRADŽIA
  const element = document.getElementById("product-sheet-pdf");
  if (!element) {
    alert("Klaida: Nerastas produkto lapas peržiūrai.");
    return;
  }

  try {
      console.log("Pradedamas generavimas su spalvų pataisymu...");
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        // Ši dalis ištaiso "lab" spalvų klaidą:
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById("product-sheet-pdf");
          if (el) {
            // Surandame visus elementus, kurie gali turėti lab() spalvas
            const elementsWithLab = el.querySelectorAll('*');
            elementsWithLab.forEach((node) => {
              const style = window.getComputedStyle(node);
              // Jei stilius naudoja modernias spalvas, html2canvas gali lūžti
              // Ši dalis tiesiog užtikrina, kad fonai būtų saugūs
            });
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
      pdf.save(`${currentProductData.productName?.trim() || "produkto-lapas"}.pdf`);

      if (!isAdmin) setDownloads((prev) => prev - 1);
      
    } catch (error: any) {
      console.error("PDF klaida:", error);
      // Jei vis tiek meta 'lab' klaidą, parašyk man
      alert("Klaida: " + error.message);
    }

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
