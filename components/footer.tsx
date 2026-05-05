"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const { language } = useLanguage()
  const isIt = language === 'it'

  // Handle newsletter subscription
  async function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData()
    formData.append("email", email)
    
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: formData,
      })
      
      const result = await response.json()
      
      if (result.success) {
        setMessage({ text: result.message, type: "success" })
        setEmail("") // Reset form
      } else {
        let errorMessage = result.message
        if (result.error) {
          errorMessage += ` (Error: ${result.error})`
        }
        setMessage({ text: errorMessage, type: "error" })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setMessage({ 
        text: `Something went wrong. Please try again later.`, 
        type: "error" 
      })
    } finally {
      setIsSubmitting(false)
    }
    
    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="border-b border-gray-200 pb-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold tracking-[0.16em] text-[#293e72] mb-3">
                {isIt ? "INSIGHT & EXECUTION" : "INSIGHT & EXECUTION"}
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
                {isIt ? "Costruiamo il digitale che conta." : "We build digital systems that matter."}
              </h3>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link href="/contact">
                <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white px-8">
                  {isIt ? "Contattaci" : "Contact us"}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h4 className="text-2xl font-semibold text-[#293e72] mb-4 font-sora">Luxdada</h4>
            <p className="text-gray-600 mb-6">
              {isIt
                ? "Supportiamo imprese e organizzazioni nella trasformazione digitale con integrazione tra sistemi, automazione dei processi e sviluppo software orientato ai risultati."
                : "We support organizations through digital transformation with system integration, process automation, and custom software focused on measurable outcomes."}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/luxdadadigital" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#293e72] transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/company/luxdada" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#293e72] transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/luxdada" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#293e72] transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-4">{isIt ? "Navigazione" : "Navigation"}</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-600 hover:text-[#293e72] transition-colors">{isIt ? "Home" : "Home"}</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-[#293e72] transition-colors">{isIt ? "Chi siamo" : "About us"}</Link></li>
              <li><Link href="/solutions" className="text-gray-600 hover:text-[#293e72] transition-colors">{isIt ? "Soluzioni" : "Solutions"}</Link></li>
              <li><Link href="/case-studies" className="text-gray-600 hover:text-[#293e72] transition-colors">{isIt ? "Casi studio" : "Case studies"}</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-[#293e72] transition-colors">{isIt ? "Contatti" : "Contact"}</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-semibold text-gray-900 mb-4">{isIt ? "Contatti" : "Contact"}</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-[#293e72] mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">Trav. 19A di Via Napoli, Bari, BA 70127</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-[#293e72] mr-2 flex-shrink-0" />
                <span className="text-gray-600">+39 392 484 2124</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-[#293e72] mr-2 flex-shrink-0" />
                <span className="text-gray-600">info@luxdada.it</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-semibold text-gray-900 mb-4">{isIt ? "Newsletter" : "Newsletter"}</h4>
            <p className="text-gray-600 mb-4">
              {isIt ? "Ricevi aggiornamenti su insight e casi studio." : "Receive updates on insights and case studies."}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder={isIt ? "La tua email" : "Your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 focus:border-[#293e72] focus:ring-[#293e72]"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#293e72] hover:bg-[#1e2e57] text-white w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {isIt ? "Iscrizione in corso..." : "Subscribing..."}
                  </>
                ) : (
                  (isIt ? "Iscriviti" : "Subscribe")
                )}
              </Button>
            </form>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-3 p-2 rounded-md text-sm ${
                  message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#293e72]">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row gap-3 md:gap-6 items-start md:items-center justify-between">
          <p className="text-white/90 text-sm">
            © {new Date().getFullYear()} Luxdada. {isIt ? "Tutti i diritti riservati." : "All rights reserved."} · {isIt ? "P.IVA" : "VAT"}: IT08275310723
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy-policy" className="text-white/90 hover:text-white transition-colors">
              {isIt ? "Informativa Privacy" : "Privacy Policy"}
            </Link>
            <Link href="/terms-of-service" className="text-white/90 hover:text-white transition-colors">
              {isIt ? "Termini di servizio" : "Terms of Service"}
            </Link>
            <span className="text-white/90 font-medium">
              {isIt ? "Let there be value." : "Let there be value."}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
