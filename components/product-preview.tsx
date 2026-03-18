"use client"

import { useEffect, useRef, useState } from "react"
import type { Template, ProductData } from "@/app/page"
import { Mail, Globe, Phone, CheckCircle2, AlertCircle } from "lucide-react"

interface ExtendedProductData extends Omit<ProductData, 'settings'> {
  brandName?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  labels?: any;
  settings?: any; 
}

export default function ProductPreview({
  template,
  data,
}: {
  template: Template
  data: ExtendedProductData
}) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const settings = data.settings || {
    cornerRadius: "12px",
    primaryColor: "#6366F1",
    footerBg: "#1e293b",
    usePremiumBg: true,
    fontColor: "#0f172a"
  };

  // SVARBU: html2canvas nemėgsta modernių spalvų (oklch, lab). 
  // Užtikriname, kad spalvos būtų pateikiamos kaip paprastas HEX.
  const safePrimaryColor = settings.primaryColor || "#6366F1";

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const hasOverflow = contentRef.current.scrollHeight > 1125;
        const hasContent = 
          (data.specifications?.some(s => s.key || s.value)) || 
          (data.features?.trim().length ?? 0) > 0 ||
          (data.productName?.trim().length ?? 0) > 0;

        setIsOverflowing(hasOverflow && hasContent);
      }
    };

    const observer = new ResizeObserver(checkOverflow);
    if (contentRef.current) observer.observe(contentRef.current);
    
    checkOverflow();
    return () => observer.disconnect();
  }, [data]);

  const getLightBg = (hex: string, opacity: number) => {
    if (!hex.startsWith('#')) return hex;
    return hex + Math.round(opacity * 255).toString(16).padStart(2, '0');
  };

  return (
    <div className="relative">
      {isOverflowing && (
        <div className="absolute -top-8 left-0 right-0 bg-red-600 text-white text-[10px] font-bold py-1 px-3 rounded-t-lg flex items-center gap-2 z-50 justify-center">
          <AlertCircle size={14} />
          <span>TOO MUCH CONTENT FOR A4 PAGE</span>
        </div>
      )}

      <div 
        id="product-sheet-pdf"
        ref={contentRef}
        className="relative mx-auto bg-white overflow-hidden flex flex-col shadow-2xl"
        style={{ 
          width: "210mm", 
          height: "297mm", 
          color: settings.fontColor,
          fontFamily: "sans-serif", // Pakeista į saugesnį, kol užsikrauna Inter
          backgroundColor: "#ffffff"
        }}
      >
        {/* PREMIUM FONAS - Naudojame paprastesnį stilių be lab() spalvų */}
        {settings.usePremiumBg && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.08]"
              style={{ 
                backgroundColor: safePrimaryColor,
                filter: "blur(100px)", // Kai kurios bibliotekos lūžta nuo didelio blur
                transform: "translate(20%, -20%)"
              }}
            />
          </div>
        )}

        {/* HEADER */}
        <div className="relative z-10 px-12 pt-16 pb-6">
          <h2 className="text-lg font-black tracking-[0.2em] uppercase mb-2" style={{ color: safePrimaryColor }}>
            {data.brandName || "BRAND NAME"}
          </h2>
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight max-w-[90%] break-words">
            {data.productName || "Product Title"}
          </h1>
          <div className="w-16 h-1.5 mt-6 rounded-full" style={{ backgroundColor: safePrimaryColor }} />
        </div>

        {/* PAGRINDINIS TURINYS */}
        <div className="relative z-10 px-12 flex-grow pt-4 text-left">
          
          {/* NUOTRAUKA IR KAINA */}
          <div className="float-right w-[280px] ml-8 mb-6 space-y-6">
            <div 
              className="relative aspect-square w-full bg-slate-50 overflow-hidden border-[6px] border-white shadow-md"
              style={{ borderRadius: settings.cornerRadius }}
            >
              {data.imageUrl ? (
                // Pridėtas crossOrigin, kad veiktų nuotraukos iš kitų serverių
                <img 
                  src={data.imageUrl} 
                  alt="Product" 
                  crossOrigin="anonymous" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-300 italic text-xs">Photo Space</div>
              )}
            </div>

            <div 
              className="p-6 flex flex-col items-center justify-center text-center border-2 border-dashed"
              style={{ 
                borderColor: safePrimaryColor,
                borderRadius: settings.cornerRadius,
                backgroundColor: getLightBg(safePrimaryColor, 0.05)
              }}
            >
              <span className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-1">Price</span>
              <div className="text-3xl font-black" style={{ color: safePrimaryColor }}>
                {data.price || "0,00"}
              </div>
            </div>
          </div>

          {/* SPECIFIKACIJŲ BLOKAI */}
          <div className="flex flex-wrap gap-3 items-start">
            {data.specifications?.filter(s => s.key && s.value).map((spec, i) => (
              <div 
                key={i} 
                className="p-4 bg-white border border-slate-100 min-w-[180px] flex-grow"
                style={{ 
                  borderRadius: `calc(${settings.cornerRadius} / 1.5)`,
                  maxWidth: "420px" 
                }}
              >
                <span className="text-[9px] uppercase font-bold opacity-40 block mb-1 tracking-wider">{spec.key}</span>
                <span className="text-[13px] font-bold text-slate-800 break-words leading-tight">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* PAPILDOMOS SAVYBĖS */}
          {data.features && (
            <div className="pt-8 clear-both">
              <h3 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {data.features.split('\n').filter(f => f.trim()).map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: safePrimaryColor }} />
                    <span className="line-clamp-2">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* FOOTERIS */}
        <div 
          className="mt-auto px-12 py-10 flex justify-between items-center text-white relative z-10"
          style={{ backgroundColor: settings.footerBg || "#1e293b" }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[9px] uppercase font-bold tracking-[0.2em] opacity-40">Contact Information</p>
            <div className="flex gap-6 items-center">
              {data.contactEmail && (
                <span className="flex items-center gap-2 text-xs font-medium">
                  <Mail size={14} className="opacity-60" /> {data.contactEmail}
                </span>
              )}
              {data.contactPhone && (
                <span className="flex items-center gap-2 text-xs font-medium">
                  <Phone size={14} className="opacity-60" /> {data.contactPhone}
                </span>
              )}
            </div>
          </div>
          
          {data.website && (
            <div className="px-4 py-2 border border-white/20 rounded-lg bg-white/5">
              <span className="text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <Globe size={14} /> {data.website.replace(/^https?:\/\//, '')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
