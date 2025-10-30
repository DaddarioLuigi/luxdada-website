"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { AnimatedText } from "./animated-text"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const navItems = {
  en: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Solutions", href: "/solutions" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Contact", href: "/contact" },
  ],
  it: [
    { name: "Home", href: "/" },
    { name: "Chi Siamo", href: "/about" },
    { name: "Soluzioni", href: "/solutions" },
    { name: "Casi Studio", href: "/case-studies" },
    { name: "Contatti", href: "/contact" },
  ]
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const { toast } = useToast()
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Konami code easter egg → /arcade
  useEffect(() => {
    const sequence = [
      'ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'
    ]
    let index = 0
    const onKey = (e: KeyboardEvent) => {
      const key = e.key
      if (key === sequence[index]) {
        index += 1
        if (index === sequence.length) {
          index = 0
          toast({
            title: language === 'it' ? 'Arcade sbloccato!' : 'Arcade unlocked!',
            description: language === 'it' ? 'Buon divertimento ✨' : 'Have fun ✨'
          })
          router.push('/arcade')
        }
      } else {
        index = 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router, toast, language])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo_uff.png"
            alt="Luxdada Logo"
            width={150}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems[language].map((item) => (
            <Link
              key={item.name}
              href={item.href === "/contact" ? item.href : "#"}
              className="text-gray-700 hover:text-[#293e72] transition-colors font-medium"
              onClick={item.href === "/contact" ? undefined : (e) => {
                e.preventDefault()
                toast({
                  title: language === 'it' ? 'Sito in costruzione' : 'Site under construction',
                  description: language === 'it' ? 'Stiamo lavorando per te. Torna presto!' : 'We are working on it. Check back soon!'
                })
              }}
            >
              <AnimatedText key={`${language}-${item.name}`}>
                {item.name}
              </AnimatedText>
            </Link>
          ))}
          {/* Language Switcher - Desktop */}
          <div className="flex items-center ml-4 mr-2">
            <button
              aria-label="Switch to English"
              onClick={() => setLanguage('en')}
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-[#293e72] mx-0.5 ${
                language === 'en' ? 'bg-[#293e72] text-white border-[#293e72]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">🇬🇧</span>
            </button>
            <button
              aria-label="Switch to Italian"
              onClick={() => setLanguage('it')}
              className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-[#293e72] mx-0.5 ${
                language === 'it' ? 'bg-[#293e72] text-white border-[#293e72]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">🇮🇹</span>
            </button>
          </div>
          <Link href={bookingUrl || "/contact"} target={bookingUrl ? "_blank" : undefined} rel={bookingUrl ? "noopener noreferrer" : undefined}>
            <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white ml-2">
              <AnimatedText key={`${language}-get-started`}>
                {language === 'en' ? 'Get Started' : 'Inizia Ora'}
              </AnimatedText>
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white w-full overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems[language].map((item) => (
                <Link
                  key={item.name}
                  href={item.href === "/contact" ? item.href : "#"}
                  className="text-gray-700 hover:text-[#293e72] py-2 transition-colors font-medium"
                  onClick={item.href === "/contact" ? () => setMobileMenuOpen(false) : (e) => {
                    e.preventDefault()
                    setMobileMenuOpen(false)
                    toast({
                      title: language === 'it' ? 'Sito in costruzione' : 'Site under construction',
                      description: language === 'it' ? 'Stiamo lavorando per te. Torna presto!' : 'We are working on it. Check back soon!'
                    })
                  }}
                >
                  <AnimatedText key={`${language}-${item.name}`}>
                    {item.name}
                  </AnimatedText>
                </Link>
              ))}
              <Link href={bookingUrl || "/contact"} target={bookingUrl ? "_blank" : undefined} rel={bookingUrl ? "noopener noreferrer" : undefined} className="w-full">
                <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white w-full">
                  <AnimatedText key={`${language}-get-started-mobile`}>
                    {language === 'en' ? 'Get Started' : 'Inizia Ora'}
                  </AnimatedText>
                </Button>
              </Link>
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  aria-label="Switch to English"
                  onClick={() => setLanguage('en')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-[#293e72] ${
                    language === 'en' ? 'bg-[#293e72] text-white border-[#293e72]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-base">🇬🇧</span>
                  <AnimatedText key={`${language}-english`}>
                    <span className="text-sm font-medium">English</span>
                  </AnimatedText>
                </button>
                <button
                  aria-label="Switch to Italian"
                  onClick={() => setLanguage('it')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-[#293e72] ${
                    language === 'it' ? 'bg-[#293e72] text-white border-[#293e72]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-base">🇮🇹</span>
                  <AnimatedText key={`${language}-italian`}>
                    <span className="text-sm font-medium">Italiano</span>
                  </AnimatedText>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
