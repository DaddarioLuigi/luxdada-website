import type React from "react"
import type { Metadata } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
  display: "swap",
})
import { LanguageProvider } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppFab from "@/components/whatsapp-fab"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Luxdada: digitalizzazione e automazione dei processi aziendali",
  description:
    "Luxdada accompagna le imprese nella digitalizzazione dei processi: software su misura, integrazione sistemi, automazione e intelligenza artificiale con un approccio etico e centrato sulle persone.",
  generator: 'v0.dev',
  icons: {
    icon: "/favicon.png",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppFab />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
