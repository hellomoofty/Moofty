"use client"

import { useState, useRef, useEffect } from "react"
import { 
  ArrowLeft, Download, Plus, Trash2, Upload, 
  FileText, X, Edit2, Palette, Layers, Link, Link2Off,
  Mail, Phone, Globe, Shield, RefreshCcw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductPreview from "@/components/product-preview"
import type { Template, ProductData } from "@/app/page"

interface ExtendedProductData extends ProductData {
  brandName?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  labels: Record<string, string>;
  settings: {
    cornerRadius: string;
    primaryColor: string;
    footerBg: string;
    usePremiumBg: boolean;
    fontColor: string;
    showShadows: boolean;
    syncFooterColor: boolean; 
  };
}

interface GeneratorPanelProps {
  template: Template
  onBack: () => void
  onDownload: (data: ExtendedProductData) => void // Pridėjom (data: ...)
  downloads: number
  isLoggedIn: boolean
  initialData?: ExtendedProductData
}

export function GeneratorPanel({
  template,
  onBack,
  onDownload,
  downloads,
  isLoggedIn,
  initialData,
}: GeneratorPanelProps) {
  
  const emptySheet: ExtendedProductData = {
    productName: "",
    brandName: "",
    description: "",
    features: "",
    specifications: [],
    price: "",
    imageUrl: null,
    contactEmail: "",
    contactPhone: "",
    website: "",
    labels: {
      productName: "Product Name",
      description: "Description",
      features: "Key Features",
      price: "Price per Unit"
    },
    settings: {
      cornerRadius: "12px",
      primaryColor: "#6366F1",
      footerBg: "#6366F1",
      usePremiumBg: true,
      fontColor: "#0f172a",
      showShadows: true,
      syncFooterColor: true
    }
  }

  const [productData, setProductData] = useState<ExtendedProductData>(initialData ?? emptySheet)
  const [editingLabel, setEditingLabel] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialData) setProductData(initialData)
  }, [initialData])

  const handleNewSheet = () => {
    if (confirm("Are you sure you want to start a new sheet? All current progress will be cleared.")) {
      setProductData(emptySheet)
    }
  }

  const updateLabel = (key: string, newValue: string) => {
    setProductData(prev => ({
      ...prev,
      labels: { ...prev.labels, [key]: newValue }
    }))
  }

  const updateSetting = (key: keyof ExtendedProductData['settings'], value: any) => {
    setProductData(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value }
    }))
  }

  const handlePrimaryColorChange = (color: string) => {
    setProductData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        primaryColor: color,
        footerBg: prev.settings.syncFooterColor ? color : prev.settings.footerBg
      }
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setProductData(prev => ({ ...prev, imageUrl: url }))
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <aside className="w-[450px] flex flex-col border-r bg-white shadow-xl z-10">
        <header className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft size={16} /> Back
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNewSheet}
              className="gap-2 text-amber-600 border-amber-200 hover:bg-amber-50"
            >
              <Plus size={16} /> New Sheet
            </Button>
          </div>
         <Button 
  onClick={() => onDownload(productData)} // <--- ČIA SUTVARKYTA
  className="rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all"
>
  <Download size={16} className="mr-2" /> Export PDF
</Button>
        </header>

        <Tabs defaultValue="content" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid grid-cols-2 m-4">
            <TabsTrigger value="content" className="gap-2"><Layers size={14} /> Content</TabsTrigger>
            <TabsTrigger value="design" className="gap-2"><Palette size={14} /> Design</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="flex-1 overflow-y-auto p-6 space-y-8 pb-24">
            {/* IDENTITY */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Identity</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-semibold text-slate-500">Brand Name</Label>
                  <Input 
                    placeholder="Enter brand name..."
                    value={productData.brandName}
                    onChange={(e) => setProductData(p => ({ ...p, brandName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-500">Product Image</Label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 border-2 border-dashed border-slate-200 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden relative"
                  >
                    {productData.imageUrl ? (
                      <img src={productData.imageUrl} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-slate-400">
                        <Upload size={24} className="mx-auto mb-2" />
                        <span className="text-xs">Upload Photo</span>
                      </div>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} />
                </div>
              </div>
            </section>

            {/* PRODUCT DETAILS */}
            <section className="space-y-6">
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Product Details</h3>
              
              {/* Product Name Block */}
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  {editingLabel === 'productName' ? (
                    <Input 
                      autoFocus className="h-6 text-xs w-1/2"
                      value={productData.labels.productName}
                      onBlur={() => setEditingLabel(null)}
                      onChange={(e) => updateLabel('productName', e.target.value)}
                    />
                  ) : (
                    <span className="text-xs font-bold flex items-center gap-2 uppercase text-slate-500">
                      {productData.labels.productName} 
                      <Edit2 size={12} className="cursor-pointer text-slate-400" onClick={() => setEditingLabel('productName')} />
                    </span>
                  )}
                </div>
                <Input 
                  placeholder="e.g. iPhone 15 Pro"
                  value={productData.productName}
                  onChange={(e) => setProductData(p => ({ ...p, productName: e.target.value }))}
                />
              </div>

             {/* PRICE & CURRENCY BLOCK */}
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                    Price & Currency
                  </Label>
                  <div className="flex gap-1">
                    {['€', '$', '£', 'CHF'].map((cur) => (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => {
                          // Jei kaina tuščia, tiesiog įdedam ženklą, jei ne - pridedam gale
                          const currentPrice = productData.price.replace(/[€$£CHF]/g, '').trim();
                          setProductData(p => ({ ...p, price: `${currentPrice} ${cur}`.trim() }));
                        }}
                        className="text-[10px] px-2 py-1 rounded bg-white border border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                      >
                        {cur}
                      </button>
                    ))}
                  </div>
                </div>
                <Input 
                  placeholder="e.g. 12.50 €"
                  value={productData.price}
                  onChange={(e) => setProductData(p => ({ ...p, price: e.target.value }))}
                  className="font-bold text-indigo-600 bg-white"
                />
                <p className="text-[10px] text-slate-400 italic">
                  Tip: Click a symbol above to add it automatically.
                </p>
              </div>
              {/* SPEC BLOCKS */}
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase text-slate-500">Specifications / Blocks</Label>
                {productData.specifications.map((spec, i) => (
                  <div key={i} className="flex gap-2 items-start group bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                    <Input 
                      placeholder="Label" value={spec.key}
                      onChange={(e) => {
                        const newSpecs = [...productData.specifications];
                        newSpecs[i].key = e.target.value;
                        setProductData(p => ({ ...p, specifications: newSpecs }));
                      }}
                      className="w-1/3 h-9 text-xs"
                    />
                    <Input 
                      placeholder="Value" value={spec.value}
                      onChange={(e) => {
                        const newSpecs = [...productData.specifications];
                        newSpecs[i].value = e.target.value;
                        setProductData(p => ({ ...p, specifications: newSpecs }));
                      }}
                      className="flex-1 h-9 text-xs font-semibold"
                    />
                    <Button 
                      variant="ghost" size="icon" 
                      onClick={() => setProductData(p => ({ ...p, specifications: p.specifications.filter((_, idx) => idx !== i) }))}
                      className="h-9 w-9 text-red-400 hover:text-red-600"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" size="sm" 
                  onClick={() => setProductData(p => ({ ...p, specifications: [...p.specifications, { key: "", value: "" }] }))}
                  className="w-full border-dashed text-xs h-10"
                >
                  <Plus size={14} className="mr-1" /> Add New Spec Block
                </Button>
              </div>
            </section>

            {/* CONTACTS */}
            <section className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Footer Contacts</h3>
              <div className="space-y-3">
                {[
                  { id: 'contactEmail', icon: Mail, placeholder: 'Email Address' },
                  { id: 'contactPhone', icon: Phone, placeholder: 'Phone Number' },
                  { id: 'website', icon: Globe, placeholder: 'Website URL' }
                ].map((field) => (
                  <div key={field.id} className="relative group">
                    <field.icon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      className="pl-10 pr-10"
                      placeholder={field.placeholder}
                      value={(productData as any)[field.id] || ""}
                      onChange={(e) => setProductData(p => ({ ...p, [field.id]: e.target.value }))}
                    />
                    {(productData as any)[field.id] && (
                      <button 
                        onClick={() => setProductData(p => ({ ...p, [field.id]: "" }))}
                        className="absolute right-3 top-3 text-slate-300 hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="design" className="flex-1 overflow-y-auto p-6 space-y-8">
            <section className="space-y-6">
              <div className="space-y-4">
                <Label className="flex items-center gap-2"><Palette size={16} /> Primary Theme Color</Label>
                <div className="flex flex-wrap gap-2">
                  {['#6366F1', '#1e293b', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'].map(color => (
                    <button 
                      key={color}
                      onClick={() => handlePrimaryColorChange(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${productData.settings.primaryColor === color ? 'border-slate-500 scale-110 shadow-md' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <input 
                    type="color" 
                    value={productData.settings.primaryColor}
                    onChange={(e) => handlePrimaryColorChange(e.target.value)}
                    className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-none p-0"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label>Footer Background</Label>
                  <Button 
                    variant="ghost" size="sm"
                    onClick={() => updateSetting('syncFooterColor', !productData.settings.syncFooterColor)}
                    className={`h-7 px-2 text-[10px] uppercase font-bold gap-1 ${productData.settings.syncFooterColor ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 bg-slate-50'}`}
                  >
                    {productData.settings.syncFooterColor ? <Link size={12} /> : <Link2Off size={12} />}
                    {productData.settings.syncFooterColor ? 'Synced' : 'Independent'}
                  </Button>
                </div>
                <Input 
                  type="color" 
                  disabled={productData.settings.syncFooterColor}
                  value={productData.settings.footerBg} 
                  onChange={(e) => updateSetting('footerBg', e.target.value)}
                  className={`h-10 w-full cursor-pointer ${productData.settings.syncFooterColor ? 'opacity-30' : 'opacity-100'}`}
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <Label className="text-xs font-bold text-slate-500 uppercase">Border Radius</Label>
                <input 
                  type="range" min="0" max="40" step="4"
                  value={parseInt(productData.settings.cornerRadius)}
                  onChange={(e) => updateSetting('cornerRadius', `${e.target.value}px`)}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Premium Mesh Background</Label>
                  <input type="checkbox" checked={productData.settings.usePremiumBg} onChange={(e) => updateSetting('usePremiumBg', e.target.checked)} className="w-4 h-4 accent-indigo-600" />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Deep Shadows (3D Look)</Label>
                  <input type="checkbox" checked={productData.settings.showShadows} onChange={(e) => updateSetting('showShadows', e.target.checked)} className="w-4 h-4 accent-indigo-600" />
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </aside>

      <main className="flex-1 bg-slate-100 p-8 flex justify-center items-start overflow-y-auto">
        <div className="sticky top-0 scale-[0.58] origin-top shadow-2xl transition-all duration-500">
          <ProductPreview template={template} data={productData} />
        </div>
      </main>
    </div>
  )
}
