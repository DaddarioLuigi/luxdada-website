"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Instagram, Mail, ArrowRight, Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"
import { useLanguage } from "@/lib/language-context"
import { AnimatedText } from "@/components/animated-text"

const translations = {
  en: {
    title: "Something Amazing is Coming Soon",
    subtitle: "We're working hard to bring you our new website. Stay tuned for a revolutionary approach to AI and digital transformation.",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    emailPlaceholder: "Enter your email",
    notifyMe: "Notify Me",
    submitMessage: "Submitting",
    emailNote: "We'll notify you when we launch. No spam, we promise!",
    stayUpdated: "Stay Updated",
    subscribeForLaunch: "Subscribe for launch"
  },
  it: {
    title: "Qualcosa di Straordinario sta per Arrivare",
    subtitle: "Stiamo lavorando duramente per portarvi il nostro nuovo sito web. Restate sintonizzati per un approccio rivoluzionario all'IA e alla trasformazione digitale.",
    days: "Giorni",
    hours: "Ore",
    minutes: "Minuti",
    seconds: "Secondi",
    emailPlaceholder: "Inserisci la tua email",
    notifyMe: "Notificami",
    submitMessage: "Invio in corso",
    emailNote: "Ti notificheremo al lancio. Niente spam, promesso!",
    stayUpdated: "Resta Aggiornato",
    subscribeForLaunch: "Iscriviti per il lancio"
  }
}

// Form submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus()
  const { language } = useLanguage()

  return (
    <Button type="submit" className="bg-[#293e72] hover:bg-[#1e2e57] text-white whitespace-nowrap" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {translations[language].submitMessage}
        </>
      ) : (
        <>
          <AnimatedText key={`${language}-notify-me`}>
            {translations[language].notifyMe}
          </AnimatedText>
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  )
}

export default function ComingSoonPage() {
  const { language } = useLanguage()
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set launch date to May 17, 2025
  useEffect(() => {
    const launchDate = new Date('2025-10-05T00:00:00')

    const interval = setInterval(() => {
      const now = new Date()
      const difference = launchDate.getTime() - now.getTime()

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(interval)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setCountdown({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Handle form submission
  async function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log("Form submitted")
    
    const form = event.currentTarget
    const formData = new FormData(form)
    console.log("Form data:", formData)
    
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: formData,
      })
      
      console.log("Response status:", response.status)
      const result = await response.json()
      console.log("Response data:", result)
      
      if (result.success) {
        setMessage({ text: result.message, type: "success" })
        // Reset form
        form.reset()
      } else {
        // Display the error message, including the detailed error if available
        let errorMessage = result.message
        if (result.error) {
          errorMessage += ` (Error: ${result.error})`
        }
        if (result.details) {
          console.log("Error details:", result.details)
          // Only show details in console to avoid exposing sensitive information to users
        }
        setMessage({ text: errorMessage, type: "error" })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setMessage({ 
        text: `Something went wrong. Please try again later. (Error: ${error instanceof Error ? error.message : String(error)})`, 
        type: "error" 
      })
    }
    
    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#293e72]"></span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                <AnimatedText key={`${language}-title`}>
                  {translations[language].title}
                </AnimatedText>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0">
                <AnimatedText key={`${language}-subtitle`}>
                  {translations[language].subtitle}
                </AnimatedText>
              </p>

              {/* Countdown Timer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto lg:mx-0 mb-10">
                {[
                  { label: translations[language].days, value: countdown.days },
                  { label: translations[language].hours, value: countdown.hours },
                  { label: translations[language].minutes, value: countdown.minutes },
                  { label: translations[language].seconds, value: countdown.seconds },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-lg shadow-md p-2 sm:p-4">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#293e72]">
                        <AnimatedText key={`${language}-countdown-${index}-value`}>
                          {item.value}
                        </AnimatedText>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        <AnimatedText key={`${language}-countdown-${index}-label`}>
                          {item.label}
                        </AnimatedText>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subscription Form */}
              <form onSubmit={handleSubscribe} id="subscribe-form" className="max-w-md mx-auto lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    name="email"
                    placeholder={translations[language].emailPlaceholder}
                    required
                    className="border-gray-300 focus:border-[#293e72] focus:ring-[#293e72]"
                  />
                  <SubmitButton />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  <AnimatedText key={`${language}-email-note`}>
                    {translations[language].emailNote}
                  </AnimatedText>
                </p>

                {/* Feedback Message */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 p-3 rounded-md ${
                      message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    }`}
                  >
                    <AnimatedText key={`${language}-message-${message.type}`}>
                      {message.text}
                    </AnimatedText>
                  </motion.div>
                )}
              </form>

              {/* Social Media Links */}
              <div className="flex justify-center lg:justify-start space-x-6 mt-10">
                <a href="#" className="text-gray-500 hover:text-[#293e72] transition-colors" aria-label="Facebook">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-500 hover:text-[#293e72] transition-colors" aria-label="Twitter">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-500 hover:text-[#293e72] transition-colors" aria-label="LinkedIn">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="text-gray-500 hover:text-[#293e72] transition-colors" aria-label="Instagram">
                  <Instagram size={24} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
                <Image src="/coming-soon-illustration.png" alt="Coming Soon" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#293e72]/10 p-2 rounded-full">
                    <Mail className="h-6 w-6 text-[#293e72]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{translations[language].stayUpdated}</p>
                    <p className="text-xs text-gray-500">{translations[language].subscribeForLaunch}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
