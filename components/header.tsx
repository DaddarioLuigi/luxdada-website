"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
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
        "fixed top-0 w-full z-50 transition-all duration-300 bg-white/55 backdrop-blur-md border-b border-gray-200/70 overflow-hidden",
        isScrolled ? "py-4" : "py-5",
      )}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute -top-20 left-[4%] h-48 w-48 rounded-full bg-[#3f63b8]/30 blur-3xl"
          animate={{ x: [0, 32, -18, 0], y: [0, -12, 20, 0], scale: [1, 1.08, 0.95, 1] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-12 right-[10%] h-56 w-56 rounded-full bg-[#7ba3e0]/28 blur-3xl"
          animate={{ x: [0, -34, 16, 0], y: [0, 22, -10, 0], scale: [1, 0.94, 1.06, 1] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-2 left-[45%] h-44 w-44 rounded-full bg-[#293e72]/20 blur-3xl"
          animate={{ x: [0, 16, -24, 0], y: [0, -14, 12, 0], scale: [1, 1.05, 0.96, 1] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", ease: "easeInOut" }}
        />
      </div>
      <div className="absolute inset-0 bg-white/62 pointer-events-none z-10" />

      <div className="container mx-auto px-4 flex items-center justify-between relative z-20">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-[#293e72] tracking-tight font-sora">Luxdada</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems[language].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative py-2 text-sm text-gray-700 transition-colors hover:text-[#293e72] font-medium after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#293e72] after:transition-all hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex items-center text-xs font-semibold tracking-[0.14em] text-gray-700">
            <button
              aria-label="Switch to English"
              onClick={() => setLanguage('en')}
              className={cn("transition-colors", language === "en" ? "text-[#293e72]" : "hover:text-[#293e72]")}
            >
              EN
            </button>
            <span className="mx-2 text-gray-300">/</span>
            <button
              aria-label="Switch to Italian"
              onClick={() => setLanguage('it')}
              className={cn("transition-colors", language === "it" ? "text-[#293e72]" : "hover:text-[#293e72]")}
            >
              IT
            </button>
          </div>
          <Link href={bookingUrl || "/contact"} target={bookingUrl ? "_blank" : undefined} rel={bookingUrl ? "noopener noreferrer" : undefined}>
            <Button variant="outline" className="border-[#293e72] text-[#293e72] hover:bg-[#293e72]/5 ml-1">
              {language === 'en' ? 'Get Started' : 'Inizia Ora'}
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label={mobileMenuOpen ? (language === 'it' ? 'Chiudi menu' : 'Close menu') : (language === 'it' ? 'Apri menu' : 'Open menu')}
          className="lg:hidden text-gray-700 rounded-md p-2 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
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
            className="lg:hidden bg-white/95 backdrop-blur-md w-full overflow-hidden relative z-20"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems[language].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#293e72] py-2 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href={bookingUrl || "/contact"} target={bookingUrl ? "_blank" : undefined} rel={bookingUrl ? "noopener noreferrer" : undefined} className="w-full">
                <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white w-full">
                  {language === 'en' ? 'Get Started' : 'Inizia Ora'}
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-3 pt-2 text-sm font-semibold tracking-[0.12em]">
                <button
                  aria-label="Switch to English"
                  onClick={() => setLanguage('en')}
                  className={cn("transition-colors", language === "en" ? "text-[#293e72]" : "text-gray-600")}
                >
                  EN
                </button>
                <span className="text-gray-300">/</span>
                <button
                  aria-label="Switch to Italian"
                  onClick={() => setLanguage('it')}
                  className={cn("transition-colors", language === "it" ? "text-[#293e72]" : "text-gray-600")}
                >
                  IT
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
