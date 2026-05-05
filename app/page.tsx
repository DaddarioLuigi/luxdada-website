"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, ArrowRight, CheckCircle } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/lib/language-context"

export default function Home() {
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const { toast } = useToast()
  const { language } = useLanguage()
  const isIt = language === 'it'
  const [logos, setLogos] = useState<string[]>([
    "/trustedby/fondazione-alfieri-logo.png",
    "/trustedby/tawk.to.png",
    "/trustedby/Trusted-shops-logo.png",
    "/trustedby/virtusingegneria (1).png",
    "/trustedby/aws.png",
  ])

  const featuresInView = useInView(featuresRef, { once: true, amount: 0.12, margin: "0px 0px 200px 0px" })
  const statsInView = useInView(statsRef, { once: true, amount: 0.12, margin: "0px 0px 200px 0px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.12, margin: "0px 0px 200px 0px" })
  const [api, setApi] = useState<CarouselApi>()
  const deliverySteps = isIt
    ? [
        { title: "Assessment", description: "Analizziamo processi, vincoli e priorità per definire un perimetro realistico." },
        { title: "Implementation", description: "Sviluppo, integrazione e automazione con rilasci progressivi e verificabili." },
        { title: "Adoption", description: "Formazione, monitoraggio e miglioramento continuo per risultati stabili nel tempo." },
      ]
    : [
        { title: "Assessment", description: "We map processes, constraints, and priorities to define a realistic scope." },
        { title: "Implementation", description: "Development, integration, and automation with progressive and testable releases." },
        { title: "Adoption", description: "Training, monitoring, and continuous improvements to sustain business outcomes." },
      ]
  const serviceCapabilities = isIt
    ? [
        {
          label: "Process Design",
          title: "Digitalizzazione dei processi",
          detail: "Analisi As-Is / To-Be, standardizzazione operativa e riduzione dei passaggi manuali.",
        },
        {
          label: "AI Strategy",
          title: "Consulenza AI",
          detail: "Valutazione use case e roadmap di adozione con focus su ROI, rischio e governance.",
        },
        {
          label: "Engineering",
          title: "Sviluppo software su misura",
          detail: "Applicazioni, API e integrazioni tra sistemi legacy e piattaforme cloud.",
        },
        {
          label: "Data Intelligence",
          title: "Analisi dei dati",
          detail: "Dashboard decisionali, KPI affidabili e modellazione di dati da fonti eterogenee.",
        },
        {
          label: "Automation",
          title: "Automazione dei processi",
          detail: "Workflow operativi con orchestrazione end-to-end, controlli e gestione eccezioni.",
        },
        {
          label: "Security",
          title: "Integrazione sicura",
          detail: "Connettivita tra ERP, CRM e tool verticali con attenzione a compliance e tracciabilita.",
        },
      ]
    : [
        {
          label: "Process Design",
          title: "Process digitization",
          detail: "As-Is / To-Be analysis, operating standards, and reduction of manual handovers.",
        },
        {
          label: "AI Strategy",
          title: "AI consulting",
          detail: "Use-case assessment and adoption roadmap with ROI, risk, and governance in scope.",
        },
        {
          label: "Engineering",
          title: "Custom software development",
          detail: "Applications, APIs, and integrations across legacy systems and cloud platforms.",
        },
        {
          label: "Data Intelligence",
          title: "Data analytics",
          detail: "Decision dashboards, reliable KPIs, and data modeling from heterogeneous sources.",
        },
        {
          label: "Automation",
          title: "Process automation",
          detail: "End-to-end orchestration with controls, monitoring, and exception handling.",
        },
        {
          label: "Security",
          title: "Secure integration",
          detail: "Connectivity across ERP, CRM, and vertical tools with compliance-first execution.",
        },
      ]
  const engagementModel = isIt
    ? {
        title: "Modello di collaborazione",
        subtitle: "Un framework operativo per iniziative di trasformazione digitale con obiettivi condivisi.",
        phases: [
          "Scoping con priorita business e metriche di impatto definite.",
          "Sprint di delivery con milestone chiare e avanzamento trasparente.",
          "Integrazione progressiva nei sistemi esistenti, senza bloccare l'operativita.",
          "Governance continua su qualita, sicurezza e adozione da parte dei team.",
        ],
      }
    : {
        title: "Engagement model",
        subtitle: "An operating framework for digital transformation initiatives with shared outcomes.",
        phases: [
          "Scoping with clear business priorities and impact metrics.",
          "Delivery sprints with explicit milestones and transparent progress.",
          "Progressive integration into existing systems without operational disruption.",
          "Continuous governance on quality, security, and team adoption.",
        ],
      }

  useEffect(() => {
    let active = true
    fetch('/api/trustedby')
      .then((r) => r.json())
      .then((d) => {
        if (!active) return
        if (Array.isArray(d?.logos) && d.logos.length > 0) {
          setLogos(d.logos)
        }
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  // Auto-scroll per il carousel dei loghi
  useEffect(() => {
    if (!api) {
      return
    }

    const interval = setInterval(() => {
      api.scrollNext()
    }, 3000) // Scorre ogni 3 secondi

    return () => {
      clearInterval(interval)
    }
  }, [api])

  return (
    <div className="overflow-hidden pt-20">
      {/* Hero Section */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-20 relative bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#293e72]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-[#293e72]/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div className="lg:col-span-7" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 text-balance">
                {isIt ? (
                  <>
                    Digitalizziamo e automatizziamo i <span className="text-[#293e72]">processi</span>, con <span className="text-[#293e72]">AI</span> e visione <span className="text-[#293e72]">umana</span>
                  </>
                ) : (
                  <>
                    We <span className="text-[#293e72]">digitize</span> and <span className="text-[#293e72]">automate</span> how you work with <span className="text-[#293e72]">AI</span> and a <span className="text-[#293e72]">human</span> lens
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                {isIt
                  ? 'Consulenza, integrazione tra sistemi, sviluppo software su misura e automazione intelligente: accompagniamo le imprese dalla mappa dei processi al risultato misurabile, con etica e trasparenza.'
                  : 'From process mapping to integration, bespoke software, and intelligent automation, we help enterprises turn fragmented workflows into scalable, measurable operations, ethically and transparently.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href={process.env.NEXT_PUBLIC_BOOKING_URL || "/contact"} target={process.env.NEXT_PUBLIC_BOOKING_URL ? "_blank" : undefined} rel={process.env.NEXT_PUBLIC_BOOKING_URL ? "noopener noreferrer" : undefined}>
                  <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white px-8 py-6 text-lg">{isIt ? 'Inizia Ora' : 'Get Started'}</Button>
                </Link>
                <Link href="/solutions">
                  <Button
                    variant="outline"
                    className="border-[#293e72] text-[#293e72] hover:bg-[#293e72]/10 px-8 py-6 text-lg"
                  >
                    {isIt ? 'Scopri di più' : 'Learn More'}
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }} 
              className="relative lg:col-span-5"
            >
              <div className="relative h-[420px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/70">
                <Image
                  src="/neural-network-blueprint.png"
                  alt="AI Technology Visualization"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="relative">
            <Carousel opts={{ align: "start", loop: true }} setApi={setApi}>
              <CarouselContent>
                {logos.map((src) => (
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
            className="text-left max-w-3xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isIt ? 'Tutto ciò che serve per digitalizzare l’impresa' : 'Everything you need to digitize the enterprise'}
            </h2>
            <p className="text-xl text-gray-600">
              {isIt
                ? 'Analisi dei flussi, integrazione dati, automazione e sviluppo su misura: un unico partner per rendere operativi i processi e liberare tempo per il valore.'
                : 'Workflow analysis, data integration, automation, and custom development: one partner to operationalize processes and free your teams for higher-value work.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {deliverySteps.map((step) => (
              <Card key={step.title} className="border border-gray-200 shadow-sm bg-white h-full">
                <CardContent className="p-6">
                  <p className="text-sm text-[#293e72] font-semibold mb-2">{step.title}</p>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start">
            <motion.div
              className="lg:col-span-8"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardContent className="p-0">
                  <div className="px-6 py-5 border-b border-gray-100">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {isIt ? "Aree di intervento" : "Capability areas"}
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {serviceCapabilities.map((item) => (
                      <div key={item.title} className="px-6 py-5">
                        <p className="text-xs uppercase tracking-wide text-[#293e72] font-semibold mb-1">{item.label}</p>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border border-gray-200 shadow-sm bg-white">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{engagementModel.title}</h3>
                  <p className="text-gray-600 mb-6">{engagementModel.subtitle}</p>
                  <ul className="space-y-4 mb-8">
                    {engagementModel.phases.map((phase, index) => (
                      <li key={phase} className="flex items-start gap-3">
                        <span className="h-6 w-6 rounded-full bg-[#293e72]/10 text-[#293e72] flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{phase}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/solutions">
                    <Button className="w-full bg-[#293e72] hover:bg-[#1e2e57] text-white">
                      {isIt ? "Approfondisci le soluzioni" : "Explore solutions"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Digitization & automation spotlight */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.12, margin: "0px 0px 200px 0px" }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {isIt ? 'Meno attività manuali, più valore per il business' : 'Less manual work, more business value'}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {isIt
                    ? 'Digitalizzare significa rendere espliciti i passaggi, collegare gli strumenti e misurare ciò che conta. Lavoriamo fianco a fianco con il tuo team per:'
                    : 'Digitization means making every step explicit, connecting your stack, and measuring what matters. We work alongside your team to:'}
                </p>
                <ul className="space-y-4 mb-8">
                  {(isIt
                    ? [
                        'Allineare processi, ruoli e sistemi in un’unica visione operativa',
                        'Automatizzare task ripetitivi con regole chiare e integrazioni robuste',
                        'Portare dati e documenti su flussi tracciabili e conformi',
                        'Accelerare decisioni con dashboard e analytics dove servono',
                        'Presidiare sicurezza, accessi e continuità nel tempo',
                      ]
                    : [
                        'Align processes, roles, and systems around one operational picture',
                        'Automate repetitive work with clear rules and dependable integrations',
                        'Move documents and data onto traceable, compliant workflows',
                        'Speed up decisions with dashboards and analytics where they matter',
                        'Govern security, access, and continuity over the long run',
                      ]).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <Link href="/solutions">
                    <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white">
                      {isIt ? 'Vedi come lo facciamo' : 'See how we deliver'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.12, margin: "0px 0px 200px 0px" }}
                className="relative"
              >
                <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
                  <Image src="/fintech-dashboard-overview.png" alt={isIt ? 'Dashboard e automazione processi' : 'Process automation dashboard'} fill className="object-cover" />
                </div>
                <div className="absolute -bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#293e72]/10 p-2 rounded-full">
                      <Zap className="h-6 w-6 text-[#293e72]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{isIt ? 'Automazione intelligente' : 'Smart automation'}</p>
                      <p className="text-xs text-gray-500">{isIt ? 'Integrata nei tuoi sistemi' : 'Built into your stack'}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-[#293e72] via-[#2a416f] to-[#1f3156]" ref={statsRef}>
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {isIt ? "Risultati orientati al business" : "Business-oriented outcomes"}
            </h2>
            <p className="text-white/80 text-lg">
              {isIt ? "Dal primo assessment al go-live, misuriamo impatto e adozione con indicatori concreti." : "From first assessment to go-live, we track impact and adoption through concrete metrics."}
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {[
              { value: "95%", label: isIt ? 'Impatto dell’innovazione' : 'Innovation Impact' },
              { value: "20+", label: isIt ? 'Clienti' : 'Clients' },
              { value: "25+", label: isIt ? 'Progetti completati' : 'Projects Completed' },
              { value: "30%", label: isIt ? 'Miglioramento dell’efficienza' : 'Efficiency Improvement' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-left rounded-xl border border-white/20 p-6"
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
          <div className="text-left max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{isIt ? 'Storie di successo' : 'Success Stories'}</h2>
            <p className="text-xl text-gray-600">
              {isIt ? 'Scopri come le nostre soluzioni hanno trasformato aziende in diversi settori.' : 'See how our solutions have transformed businesses across industries.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {[
              {
                title: isIt ? 'AI conversazionale su WhatsApp (RAG)' : 'Conversational AI on WhatsApp (RAG)',
                category: isIt ? 'Assistenti AI' : 'AI Assistants',
                image: "/neural-network-blueprint.png",
                subtitle: isIt ? 'Risposte immediate e accurate su WhatsApp con Retrieval‑Augmented Generation orchestrato con n8n.' : 'Instant, accurate answers on WhatsApp using Retrieval‑Augmented Generation orchestrated with n8n.',
                client: "Virtus Ingegneria",
                href: "/case-studies/rag-chatbot"
              },
              {
                title: isIt ? 'Digitalizzazione cartelle cliniche ed estrazione metriche' : 'Clinical records digitization and metric extraction',
                category: isIt ? 'Sanità digitale' : 'Digital health',
                image: "/digital-hospital-scene.png",
                subtitle: isIt
                  ? 'Da documenti clinici a fogli Excel strutturati: estrazione ripetibile di metriche e tracciabilità delle fonti.'
                  : 'From clinical documents to structured Excel: repeatable metric extraction with source traceability.',
                client: "Fondazione Alfieri",
                href: "/case-studies/clinical-records-extraction"
              },
            ].map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.12, margin: "0px 0px 200px 0px" }}
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
                    {"client" in study && study.client ? (
                      <p className="text-sm font-medium text-[#293e72] mb-3">{study.client}</p>
                    ) : null}
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
                  {"client" in study && study.client ? (
                    <p className="text-sm font-medium text-[#293e72] mb-3">{study.client}</p>
                  ) : null}
                  <span className="text-[#293e72] font-medium flex items-center">
                    {isIt ? 'Leggi il caso studio' : 'Read Case Study'} <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/case-studies">
              <Button
                variant="outline"
                className="border-[#293e72] text-[#293e72] hover:bg-[#293e72]/10"
              >
                {isIt ? 'Vedi tutti i casi studio' : 'View All Case Studies'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Section - Milano */}
      <section className="py-20 bg-gray-50" ref={testimonialsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-left max-w-3xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{isIt ? 'Vieni a trovarci a Milano' : 'Visit Us in Milano'}</h2>
            <p className="text-xl text-gray-600">
              {isIt ? 'Ci trovi a Milano: incontriamo team e stakeholder per progettare digitalizzazione e automazione concretamente operative.' : "We're in Milano, working with your teams and stakeholders to ship digitization and automation that actually sticks."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-8">
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
            </div>
            <div className="lg:col-span-4 rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{isIt ? "Sede e collaborazione" : "Office & collaboration"}</h3>
              <p className="text-gray-600 mb-6">
                {isIt
                  ? "Lavoriamo da Milano e in remoto con team in tutta Italia. Incontri operativi e workshop vengono pianificati in base alle priorità del progetto."
                  : "We operate from Milan and remotely with teams across Italy. Workshops and operating sessions are planned around project priorities."}
              </p>
              <Link href="/contact">
                <Button className="w-full bg-[#293e72] hover:bg-[#1e2e57] text-white">
                  {isIt ? "Contattaci" : "Contact Us"}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#293e72] via-[#2a416f] to-[#1f3156]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.12, margin: "0px 0px 200px 0px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {isIt ? 'Pronto a digitalizzare e automatizzare i tuoi processi?' : 'Ready to digitize and automate your operations?'}
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                {isIt
                  ? 'Raccontaci obiettivi e vincoli: ti proporremo un percorso concreto con integrazioni, software su misura e AI solo dove genera valore misurabile.'
                  : "Tell us your goals and constraints. We'll propose a concrete path: integrations, bespoke software, and AI only where it drives measurable value."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href={process.env.NEXT_PUBLIC_BOOKING_URL || "/contact"} target={process.env.NEXT_PUBLIC_BOOKING_URL ? "_blank" : undefined} rel={process.env.NEXT_PUBLIC_BOOKING_URL ? "noopener noreferrer" : undefined}>
                <Button className="bg-white text-[#293e72] hover:bg-gray-100 px-8 py-6 text-lg">
                  {isIt ? 'Prenota una consulenza' : 'Schedule a Consultation'}
                </Button>
              </Link>
              <Link href="/solutions">
                <Button variant="outline" className="bg-white text-[#293e72] hover:bg-gray-100 px-8 py-6 text-lg">
                  {isIt ? 'Scopri le nostre soluzioni' : 'View Our Solutions'}
                </Button>
              </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
