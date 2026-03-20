"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { GeneratorPanel } from "@/components/generator-panel"
import { TrustSection } from "@/components/trust-section"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"
import * as htmlToImage from 'html-to-image';
import { jsPDF } from "jspdf";
import { DownloadModal } from "@/components/DownloadModal";

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
  const [initialProductData, setInitialProductData] = useState<ProductData | undefined>(undefined)
  
  // NAUJA: Feedback modal būsena ir laikini duomenys atsisiuntimui
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [pendingProductData, setPendingProductData] = useState<ProductData | null>(null)

  const handleStartGenerating = () => {
    setInitialProductData(undefined)
    setShowGenerator(true)
    window.scrollTo(0, 0)
  }

  // 1. Ši funkcija iškviečiama paspaudus "Download" generatoriuje
  const handleDownloadTrigger = (currentProductData: ProductData) => {
    setPendingProductData(currentProductData) // Išsaugojam duomenis, kuriuos vėliau spausdinsim
    setShowDownloadModal(true) // Atidaro feedback langą
  }

  // 2. Ši funkcija vykdoma, kai vartotojas patvirtina atsisiuntimą feedback lange
  const executeRealDownload = async () => {
    setShowDownloadModal(false)
    if (!pendingProductData) return

    const element = document.getElementById("product-sheet-pdf")
    if (!element) return

    try {
      console.log("Generuojama...");
      const dataUrl = await htmlToImage.toPng(element, {
        quality: 1,
        pixelRatio: 2,
        skipFonts: false,
      })

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297)
      const title = pendingProductData.productName?.trim() || "produkto-lapas"
      pdf.save(`${title}.pdf`)
      
      console.log("Sėkmingai sugeneruota!")
    } catch (error) {
      console.error("PDF klaida:", error)
    }
  }

  const handleAuth = () => {
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {!showGenerator ? (
        <>
          <Navbar onLoginClick={() => setShowAuthModal(true)} isLoggedIn={isLoggedIn} />
         
          <TrustSection />
          <Footer />
        </>
      ) : (
        <GeneratorPanel
          template="b2b-pro"
          onBack={() => {
            setShowGenerator(false)
            setInitialProductData(undefined)
          }}
          onDownload={handleDownloadTrigger} // Naudojame naują funkciją
          isLoggedIn={isLoggedIn}
          initialData={initialProductData as any}
        />
      )}

      {/* MODALAI */}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />

      <DownloadModal 
        isOpen={showDownloadModal} 
        onClose={() => setShowDownloadModal(false)} 
        onConfirmDownload={executeRealDownload}
      />
    </main>
  )
}
