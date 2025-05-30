"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Home", href: "/coming-soon" },
  { name: "About Us", href: "/coming-soon" },
  { name: "Solutions", href: "/coming-soon" },
  { name: "Case Studies", href: "/coming-soon" },
  { name: "Contact", href: "/coming-soon" },   
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/coming-soon" className="flex items-center">
        <Image
            src="/luxdada_logo6_blu.png" // Replace with your actual logo path
            alt="Luxdada Logo"
            width={135}       // Adjust the size as needed
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-[#293e72] transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
          <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white">Get Started</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            className="md:hidden bg-white w-full overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#293e72] py-2 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white w-full">Get Started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
