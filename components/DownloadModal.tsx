"use client"

import { useState } from "react"
import { Star, X, MessageSquare } from "lucide-react"

export function DownloadModal({ isOpen, onClose, onConfirmDownload }: any) {
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  if (!isOpen) return null

  const handleSubmit = async () => {
    // Siunčiame duomenis į tavo ką tik sukurtą API
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, email, message }),
      });
    } catch (err) {
      console.error("Feedback siuntimo klaida:", err);
    }
    // Nepriklausomai nuo to, ar pavyko išsiųsti feedback, leidžiame siųstis PDF
    onConfirmDownload();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="h-5 w-5" />
        </button>

        {!showForm ? (
          <div className="text-center pt-4">
            <h2 className="text-2xl font-bold text-slate-900">Your PDF is ready! 📄</h2>
            <div className="mt-8 flex flex-col gap-3">
              <button onClick={() => setShowForm(true)} className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-white hover:bg-primary/90 transition-all">
                <MessageSquare className="h-5 w-5" />
                Leave Feedback & Download
              </button>
              <button onClick={onConfirmDownload} className="w-full rounded-xl bg-slate-100 py-3 font-medium text-slate-600 hover:bg-slate-200">
                Just Download
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-slate-900">How was your experience?</h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} onClick={() => setRating(s)}>
                  <Star className={`h-9 w-9 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                </button>
              ))}
            </div>
            <input 
              value={email} onChange={(e) => setEmail(e.target.value)}
              type="email" placeholder="Your email (optional)" 
              className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-primary" 
            />
            <textarea 
              value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="What was missing? (Optional)" rows={3}
              className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-primary resize-none"
            />
            <button onClick={handleSubmit} className="w-full rounded-xl bg-primary py-4 font-semibold text-white hover:bg-primary/90 shadow-lg">
              Submit & Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
