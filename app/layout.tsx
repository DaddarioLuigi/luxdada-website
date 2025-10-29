import type React from "react"
import type { Metadata } from "next"
import { Sora } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const sora = Sora({ 
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
})

export const metadata: Metadata = {
  title: "Luxdada - Gain insights from your data",
  description: "Digitizing business processes through software and Artificial Intelligence",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} font-sora`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'