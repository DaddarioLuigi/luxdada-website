import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-[#293e72] mb-4">Luxdada</h3>
            <p className="text-gray-600 mb-4">
              Digitizing business processes through software and Artificial Intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-[#293e72] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#293e72] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#293e72] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#293e72] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#293e72] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-gray-600 hover:text-[#293e72] transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-600 hover:text-[#293e72] transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#293e72] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-[#293e72] mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Innovation Drive, Tech City, TC 10101</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-[#293e72] mr-2 flex-shrink-0" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-[#293e72] mr-2 flex-shrink-0" />
                <span className="text-gray-600">info@luxdada.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Newsletter</h4>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="border-gray-300 focus:border-[#293e72] focus:ring-[#293e72]"
              />
              <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white w-full">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Luxdada. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-600 hover:text-[#293e72] text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-600 hover:text-[#293e72] text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
