"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, LineChart, Stethoscope, Zap, Shield, ArrowRight, CheckCircle } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"
import { useRouter } from "next/navigation"

function FloatingEgg({ containerRef, label }: { containerRef: React.RefObject<HTMLElement>, label: string }) {
  const router = useRouter()
  const eggRef = useRef<HTMLDivElement | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const velRef = useRef({ x: 0, y: 0 })
  const draggingRef = useRef(false)
  const lastRef = useRef({ t: 0, x: 0, y: 0 })
  const pointerIdRef = useRef<number | null>(null)
  const tapMetaRef = useRef({ startX: 0, startY: 0, startT: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const init = () => {
      const rect = container.getBoundingClientRect()
      const x = rect.width - 80
      const y = rect.height - 80
      setPos({ x, y })
      velRef.current = { x: -120, y: -40 }
      lastRef.current.t = performance.now()
    }

    init()

    const onFrame = () => {
      const now = performance.now()
      const dt = Math.min(0.032, (now - lastRef.current.t) / 1000)
      lastRef.current.t = now
      if (!draggingRef.current) {
        const g = 1500
        const friction = 0.995
        const bounce = 0.6
        const rect = container.getBoundingClientRect()
        let { x, y } = pos
        let { x: vx, y: vy } = velRef.current
        vy += g * dt
        x += vx * dt
        y += vy * dt
        const size = 56
        const maxX = Math.max(0, rect.width - size)
        const maxY = Math.max(0, rect.height - size)
        if (x <= 0) { x = 0; vx = Math.abs(vx) * bounce }
        if (x >= maxX) { x = maxX; vx = -Math.abs(vx) * bounce }
        if (y <= 0) { y = 0; vy = Math.abs(vy) * bounce }
        if (y >= maxY) { y = maxY; vy = -Math.abs(vy) * bounce }
        vx *= friction
        vy *= friction
        velRef.current = { x: vx, y: vy }
        setPos({ x, y })
      }
      raf = requestAnimationFrame(onFrame)
    }

    let raf = requestAnimationFrame(onFrame)

    const onPointerDown = (e: PointerEvent) => {
      const egg = eggRef.current
      if (!egg) return
      if (pointerIdRef.current !== null) return
      pointerIdRef.current = e.pointerId
      draggingRef.current = true
      egg.setPointerCapture(e.pointerId)
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left - 28
      const y = e.clientY - rect.top - 28
      tapMetaRef.current = { startX: x, startY: y, startT: performance.now() }
      setPos({ x, y })
      velRef.current = { x: 0, y: 0 }
      lastRef.current.x = e.clientX
      lastRef.current.y = e.clientY
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current || pointerIdRef.current !== e.pointerId) return
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left - 28
      const y = e.clientY - rect.top - 28
      const dx = e.clientX - lastRef.current.x
      const dy = e.clientY - lastRef.current.y
      const dt = Math.max(1, performance.now() - lastRef.current.t) / 1000
      velRef.current = { x: dx / dt, y: dy / dt }
      lastRef.current.x = e.clientX
      lastRef.current.y = e.clientY
      setPos({ x, y })
    }

    const onPointerUp = (e: PointerEvent) => {
      const egg = eggRef.current
      if (!egg || pointerIdRef.current !== e.pointerId) return
      egg.releasePointerCapture(e.pointerId)
      draggingRef.current = false
      pointerIdRef.current = null
      const d = Math.hypot(pos.x - tapMetaRef.current.startX, pos.y - tapMetaRef.current.startY)
      const dt = performance.now() - tapMetaRef.current.startT
      if (d < 6 && dt < 200) {
        router.push('/arcade')
      }
    }

    const egg = eggRef.current
    egg?.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    const onResize = () => {
      const rect = container.getBoundingClientRect()
      setPos((p) => ({ x: Math.min(p.x, Math.max(0, rect.width - 56)), y: Math.min(p.y, Math.max(0, rect.height - 56)) }))
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      egg?.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('resize', onResize)
    }
  }, [containerRef, pos.x, pos.y, router])

  return (
    <div
      ref={eggRef}
      aria-label={label}
      role="button"
      tabIndex={0}
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      className="absolute z-10 h-14 w-14 select-none touch-none"
    >
      <div className="relative h-full w-full rounded-full bg-white border border-gray-200 shadow-xl flex items-center justify-center">
        <span className="text-2xl" aria-hidden>🥚</span>
        <span className="absolute -top-7 right-0 text-xs font-medium bg-[#293e72] text-white px-2 py-1 rounded-md shadow">
          {label}
        </span>
        <span className="pointer-events-none absolute inline-flex h-full w-full rounded-full bg-[#293e72]/20 animate-ping"></span>
      </div>
    </div>
  )
}

export default function Home() {
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const { toast } = useToast()
  const { language } = useLanguage()
  const isIt = language === 'it'
  const heroRef = useRef<HTMLElement | null>(null)

  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.3 })

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-28 relative bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#293e72]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-[#293e72]/5 rounded-full blur-3xl"></div>
        </div>
        {/* Physics-based floating egg */}
        {heroRef.current && (
          <FloatingEgg
            containerRef={heroRef as React.RefObject<HTMLElement>}
            label={isIt ? 'Gioca' : 'Play'}
          />
        )}

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                {isIt ? (
                  <>
                    Guidiamo l’innovazione con<span className="text-[#293e72]"> AI</span>, rispettando <span className="text-[#293e72]">l’umanità</span>
                  </>
                ) : (
                  <>
                    Driving Innovation with<span className="text-[#293e72]"> AI</span>, Respecting <span className="text-[#293e72]">Humanity</span>
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                {isIt
                  ? 'Luxdada trasforma i tuoi processi aziendali con software e AI, nel pieno rispetto di etica, trasparenza e centralità umana.'
                  : 'Luxdada transforms your business processes through software and AI, always respecting ethics, honesty, and the human touch.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={process.env.NEXT_PUBLIC_BOOKING_URL || "/contact"} target={process.env.NEXT_PUBLIC_BOOKING_URL ? "_blank" : undefined} rel={process.env.NEXT_PUBLIC_BOOKING_URL ? "noopener noreferrer" : undefined}>
                  <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white px-8 py-6 text-lg">{isIt ? 'Inizia Ora' : 'Get Started'}</Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-[#293e72] text-[#293e72] hover:bg-[#293e72]/10 px-8 py-6 text-lg"
                >
                  {isIt ? 'Scopri di più' : 'Learn More'}
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }} 
              className="relative"
            >
              <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/neural-network-blueprint.png"
                  alt="AI Technology Visualization"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#293e72]/10 p-2 rounded-full">
                    <Brain className="h-6 w-6 text-[#293e72]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{isIt ? 'Basato su AI' : 'AI-Powered'}</p>
                    <p className="text-xs text-gray-500">{isIt ? 'Soluzioni intelligenti' : 'Smart Solutions'}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#293e72]/10 p-2 rounded-full">
                    <Stethoscope className="h-6 w-6 text-[#293e72]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{isIt ? 'Focus Sanità' : 'Healthcare Focus'}</p>
                    <p className="text-xs text-gray-500">{isIt ? 'Soluzioni specializzate' : 'Specialized Solutions'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative">
            <Carousel opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {[
                  "/trustedby/fondazione-alfieri-logo.png",
                  "/trustedby/tawk.to.png",
                  "/trustedby/Trusted-shops-logo.png",
                  "/trustedby/virtusingegneria (1).png",
                  "/trustedby/aws.png",
                ].map((src) => (
                  <CarouselItem key={src} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                    <div className="flex h-16 md:h-20 lg:h-24 items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                      <div className="relative h-12 md:h-14 lg:h-16 w-32 md:w-40">
                        <Image src={src} alt={src.split('/').pop() || 'logo'} fill className="object-contain" />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isIt ? 'Soluzioni innovative per le aziende moderne' : 'Innovative Solutions for Modern Businesses'}
            </h2>
            <p className="text-xl text-gray-600">
              {isIt
                ? 'Uniamo tecnologie all’avanguardia e competenze di settore per generare risultati trasformativi.'
                : 'We combine cutting-edge technology with industry expertise to deliver transformative results.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-[#293e72]" />,
                title: isIt ? 'Consulenza AI' : 'AI Consulting',
                description: isIt
                  ? 'Guida strategica per implementare soluzioni AI su misura per il tuo business.'
                  : 'Strategic guidance on implementing AI solutions tailored to your business needs.',
              },
              {
                icon: <Code className="h-8 w-8 text-[#293e72]" />,
                title: isIt ? 'Sviluppo software su misura' : 'Custom Software Development',
                description: isIt
                  ? 'Soluzioni software bespoke per snellire le operazioni e aumentare l’efficienza.'
                  : 'Bespoke software solutions designed to streamline your operations and boost efficiency.',
              },
              {
                icon: <Stethoscope className="h-8 w-8 text-[#293e72]" />,
                title: isIt ? 'Soluzioni AI per la sanità' : 'Healthcare AI Solutions',
                description: isIt
                  ? 'Applicazioni AI specializzate per migliorare la cura dei pazienti e gli esiti clinici.'
                  : 'Specialized AI applications for healthcare providers to improve patient care and outcomes.',
              },
              {
                icon: <LineChart className="h-8 w-8 text-[#293e72]" />,
                title: isIt ? 'Analisi dei dati' : 'Data Analytics',
                description: isIt
                  ? 'Trasforma i tuoi dati in insight azionabili con analitiche avanzate.'
                  : 'Transform your data into actionable insights with our advanced analytics solutions.',
              },
              {
                icon: <Zap className="h-8 w-8 text-[#293e72]" />,
                title: isIt ? 'Automazione dei processi' : 'Process Automation',
                description: isIt
                  ? 'Automatizza attività e workflow ripetitivi per aumentare la produttività e ridurre gli errori.'
                  : 'Automate repetitive tasks and workflows to increase productivity and reduce errors.',
              },
              {
                icon: <Shield className="h-8 w-8 text-[#293e72]" />,
                title: isIt ? 'Integrazione sicura' : 'Secure Integration',
                description: isIt
                  ? 'Integra l’AI nei sistemi esistenti con sicurezza a livello enterprise.'
                  : 'Seamlessly integrate AI solutions with your existing systems with enterprise-grade security.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-none shadow-md hover-scale h-full">
                  <CardContent className="p-6">
                    <div className="bg-[#293e72]/10 p-3 rounded-lg inline-block mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Focus Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {isIt ? 'Rivoluzionare la sanità con l’AI' : 'Revolutionizing Healthcare with AI'}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {isIt
                    ? 'In Luxdada crediamo che l’AI possa migliorare significativamente la qualità della vita e il lavoro quotidiano nella sanità. Le nostre soluzioni aiutano i provider sanitari a:'
                    : 'At Luxdada, we believe AI can significantly improve quality of life and daily work in the healthcare sector. Our specialized solutions help healthcare providers:'}
                </p>
                <ul className="space-y-4 mb-8">
                  {(isIt
                    ? [
                        'Aumentare accuratezza e velocità diagnostica',
                        'Snellire i flussi amministrativi',
                        'Migliorare il coordinamento della cura',
                        'Ottimizzare l’allocazione delle risorse',
                        'Garantire sicurezza e conformità dei dati',
                      ]
                    : [
                        'Enhance diagnostic accuracy and speed',
                        'Streamline administrative workflows',
                        'Improve patient care coordination',
                        'Optimize resource allocation',
                        'Ensure data security and compliance',
                      ]).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={process.env.NEXT_PUBLIC_BOOKING_URL || "/contact"} target={process.env.NEXT_PUBLIC_BOOKING_URL ? "_blank" : undefined} rel={process.env.NEXT_PUBLIC_BOOKING_URL ? "noopener noreferrer" : undefined}>
                  <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white">
                    {isIt ? 'Esplora le soluzioni per la sanità' : 'Explore Healthcare Solutions'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
                  <Image src="/connected-care.png" alt="Healthcare AI Solutions" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#293e72]/10 p-2 rounded-full">
                      <Stethoscope className="h-6 w-6 text-[#293e72]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{isIt ? 'Focus Sanità' : 'Healthcare Focus'}</p>
                      <p className="text-xs text-gray-500">{isIt ? 'Soluzioni guidate dall’AI' : 'AI-Driven Solutions'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#293e72]" ref={statsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {[
              { value: "95%", label: isIt ? 'Impatto dell’innovazione' : 'Innovation Impact' },
              { value: "20+", label: isIt ? 'Clienti' : 'Clients' },
              { value: "15+", label: isIt ? 'Progetti completati' : 'Projects Completed' },
              { value: "30%", label: isIt ? 'Miglioramento dell’efficienza' : 'Efficiency Improvement' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-lg text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{isIt ? 'Storie di successo' : 'Success Stories'}</h2>
            <p className="text-xl text-gray-600">
              {isIt ? 'Scopri come le nostre soluzioni hanno trasformato aziende in diversi settori.' : 'See how our solutions have transformed businesses across industries.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: isIt ? 'AI conversazionale su WhatsApp (RAG)' : 'Conversational AI on WhatsApp (RAG)',
                category: isIt ? 'Assistenti AI' : 'AI Assistants',
                image: "/neural-network-blueprint.png",
                subtitle: isIt ? 'Risposte immediate e accurate su WhatsApp con Retrieval‑Augmented Generation orchestrato con n8n.' : 'Instant, accurate answers on WhatsApp using Retrieval‑Augmented Generation orchestrated with n8n.',
                href: "/case-studies/rag-chatbot"
              },
              {
                title: isIt ? 'Digitalizzazione cartelle cliniche con LLM' : 'LLM‑Powered Medical Records Digitization',
                category: isIt ? 'Sanità' : 'Healthcare',
                image: "/digital-hospital-scene.png",
                subtitle: isIt ? 'Dalle cartelle scannerizzate a dati clinici strutturati con workflow LLM sicuri e conformi.' : 'From scanned charts to structured clinical data with secure, compliant LLM workflows.'
              },
              {
                title: isIt ? 'E‑commerce headless con Medusa.js' : 'Headless E‑commerce with Medusa.js',
                category: "E‑commerce",
                image: "/fintech-dashboard-overview.png",
                subtitle: isIt ? 'Headless commerce pronto a scalare: storefront veloci e API flessibili su Medusa.js.' : 'Scale‑ready headless commerce: fast storefronts and flexible APIs on Medusa.js.'
              },
            ].map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
                className="group"
              >
                {study.href ? (
                  <Link href={study.href}>
                    <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <span className="text-sm font-medium text-white bg-[#293e72] px-3 py-1 rounded-full">
                          {study.category}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#293e72] transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{study.subtitle || "See how we transformed operations and improved efficiency."}</p>
                    <span className="text-[#293e72] font-medium flex items-center">
                      {isIt ? 'Leggi il caso studio' : 'Read Case Study'} <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      toast({
                        title: isIt ? 'Sito in costruzione' : 'Site under construction',
                        description: isIt ? 'Stiamo lavorando per te. Torna presto!' : 'We are working on it. Check back soon!'
                      })
                    }}
                  >
                  <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className="text-sm font-medium text-white bg-[#293e72] px-3 py-1 rounded-full">
                        {study.category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#293e72] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{study.subtitle || "See how we transformed operations and improved efficiency."}</p>
                  <span className="text-[#293e72] font-medium flex items-center">
                    {isIt ? 'Leggi il caso studio' : 'Read Case Study'} <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-[#293e72] text-[#293e72] hover:bg-[#293e72]/10"
              onClick={() =>
                toast({
                  title: isIt ? 'Sito in costruzione' : 'Site under construction',
                  description: isIt ? 'Stiamo lavorando per te. Torna presto!' : 'We are working on it. Check back soon!'
                })
              }
            >
              {isIt ? 'Vedi tutti i casi studio' : 'View All Case Studies'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Location Section - Milano */}
      <section className="py-20 bg-gray-50" ref={testimonialsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{isIt ? 'Vieni a trovarci a Milano' : 'Visit Us in Milano'}</h2>
            <p className="text-xl text-gray-600">
              {isIt ? 'Siamo nel cuore di Milano, pronti ad aiutarti a trasformare il tuo business con l’AI.' : "We're located in the heart of Milano, ready to help you transform your business with AI."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89545.77729942316!2d9.102486335546863!3d45.46426987107542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c1493f1275e7%3A0x3cffcd13c6740e8d!2sMilano%2C%20Italy!5e0!3m2!1sen!2sit!4v1709647300000!5m2!1sen!2sit"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#293e72]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {isIt ? 'Pronto a trasformare il tuo business con l’AI?' : 'Ready to Transform Your Business with AI?'}
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                {isIt
                  ? 'Parliamo di come Luxdada può aiutarti a digitalizzare e ottimizzare i processi con soluzioni AI all’avanguardia.'
                  : "Let's discuss how Luxdada can help you digitize and optimize your business processes with cutting-edge AI solutions."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={process.env.NEXT_PUBLIC_BOOKING_URL || "/contact"} target={process.env.NEXT_PUBLIC_BOOKING_URL ? "_blank" : undefined} rel={process.env.NEXT_PUBLIC_BOOKING_URL ? "noopener noreferrer" : undefined}>
                <Button className="bg-white text-[#293e72] hover:bg-gray-100 px-8 py-6 text-lg">
                  {isIt ? 'Prenota una consulenza' : 'Schedule a Consultation'}
                </Button>
              </Link>
                <Button variant="outline" className="bg-white text-[#293e72] hover:bg-gray-100 px-8 py-6 text-lg">
                  {isIt ? 'Scopri le nostre soluzioni' : 'View Our Solutions'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
