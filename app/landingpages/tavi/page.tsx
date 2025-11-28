"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Stethoscope, 
  ClipboardList, 
  Brain, 
  FileText, 
  Shield, 
  Zap, 
  CheckCircle, 
  Heart,
  Activity,
  Database,
  Users,
  ArrowDown,
  ArrowUp
} from "lucide-react"
import Image from "next/image"

export default function TaviLandingPage() {
  const featuresRef = useRef(null)
  const parametersRef = useRef(null)
  const benefitsRef = useRef(null)
  const conclusionRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })
  const parametersInView = useInView(parametersRef, { once: true, amount: 0.3 })
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.3 })
  const conclusionInView = useInView(conclusionRef, { once: true, amount: 0.3 })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#293e72]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-[#293e72]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center justify-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <Image
                    src="/tavi-assist-logo.png"
                    alt="TAVI Assist Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                <span className="text-[#293e72]">TAVI Assist</span>
                <br />
                Supporto intelligente per la selezione della protesi valvolare
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Un'applicazione mobile progettata per supportare il cardiologo interventista nella 
                <strong className="text-gray-900"> selezione della protesi valvolare più appropriata</strong> nei pazienti sottoposti a procedura TAVI.
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                L'obiettivo è rendere il processo di scelta <strong>più rapido, standardizzato e sicuro</strong>, 
                riducendo il rischio di mis-sizing e migliorando l'outcome procedurale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="border-[#293e72] text-[#293e72] hover:bg-[#293e72]/10 px-8 py-6 text-lg"
                    onClick={() => scrollToSection('features')}
                  >
                    Scopri le funzionalità
                    <ArrowDown className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Funzionalità principali
            </h2>
            <p className="text-xl text-gray-600">
              Strumenti avanzati per supportare il clinico nella scelta della valvola più sicura ed efficace
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <ClipboardList className="h-8 w-8 text-[#293e72]" />,
                title: "Inserimento guidato dei parametri",
                description: "Inserimento semplice e strutturato di tutti i parametri necessari per la scelta della valvola: diametri annulari, area e perimetro dell'anello aortico da TC, distanza coronarica, dimensioni del seno di Valsalva e dell'aorta ascendente, calcificazioni, valve-to-coronary, tipo di protesi degenerata e accesso vascolare previsto.",
                highlight: "I parametri si adattano automaticamente al tipo di procedura (TAVI primaria vs Valve-in-Valve)."
              },
              {
                icon: <Brain className="h-8 w-8 text-[#293e72]" />,
                title: "Algoritmo di raccomandazione",
                description: "Confronto automatico dei valori con le tabelle ufficiali di sizing dei principali produttori di bioprotesi. L'app evidenzia le taglie più compatibili, segnala eventuali rischi (coronary obstruction, oversizing, underexpansion) e suggerisce alternative in caso di misure borderline.",
                highlight: "Risultato: lista di protesi consigliate ordinata per grado di compatibilità."
              },
              {
                icon: <Activity className="h-8 w-8 text-[#293e72]" />,
                title: "Modalità Valve-in-Valve",
                description: "Supporto specializzato per pazienti con protesi biologiche degenerative: identificazione rapida della valvola originale, selezione automatica delle dimensioni effettive (true ID), suggerimenti sulla nuova valvola più adatta e avvisi su rischio di mismatch e possibilità di valve-fracture.",
                highlight: "Ottimizzato per procedure di re-do TAVI."
              },
              {
                icon: <FileText className="h-8 w-8 text-[#293e72]" />,
                title: "Archivio procedurale e report PDF",
                description: "Salvataggio dei casi, creazione di report procedurale in PDF e condivisione nel team per facilitare il workflow del Heart Team.",
                highlight: "Documentazione completa e condivisibile."
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="bg-[#293e72]/10 p-3 rounded-lg inline-block mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">{feature.description}</p>
                    <p className="text-sm text-[#293e72] font-medium italic">{feature.highlight}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="border-[#293e72] text-[#293e72] hover:bg-[#293e72]/10 px-6 py-3"
                onClick={() => scrollToSection('parameters')}
              >
                Scopri i parametri supportati
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Parameters Section */}
      <section id="parameters" ref={parametersRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Parametri clinici e anatomici supportati
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Diametri annulari (min, max, medio)",
                  "Area e perimetro dell'anello aortico da TC",
                  "Distanza coronarica (sinistra/destra)",
                  "Dimensioni del seno di Valsalva",
                  "Dimensioni dell'aorta ascendente",
                  "Calcificazioni (score semiquantitativo)",
                  "Valve-to-coronary",
                  "Tipo di protesi degenerata (per re-do TAVI)",
                  "Accesso vascolare previsto"
                ].map((param, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                    className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm"
                  >
                    <CheckCircle className="h-5 w-5 text-[#293e72] flex-shrink-0" />
                    <span className="text-gray-700">{param}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Navigation Button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={parametersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-[#293e72] text-[#293e72] hover:bg-[#293e72]/10 px-6 py-3"
                  onClick={() => scrollToSection('benefits')}
                >
                  Scopri il valore aggiunto
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="benefits" className="py-20 bg-white" ref={benefitsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Valore aggiunto
            </h2>
            <p className="text-xl text-gray-600">
              Perché scegliere TAVI Assist per supportare le tue procedure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Shield className="h-8 w-8 text-[#293e72]" />,
                title: "Standardizzazione",
                description: "Riduce la variabilità clinica nella scelta del device, basandosi su dati oggettivi e linee guida consolidate."
              },
              {
                icon: <Activity className="h-8 w-8 text-[#293e72]" />,
                title: "Riduzione dei rischi",
                description: "Minimizza errori di sizing, riducendo complicanze come leak paravalvolare, embolizzazione o ostruzione coronarica."
              },
              {
                icon: <Zap className="h-8 w-8 text-[#293e72]" />,
                title: "Velocità e facilità d'uso",
                description: "Permette di ottenere una raccomandazione in pochi secondi, utile anche in contesti urgenti."
              },
              {
                icon: <Users className="h-8 w-8 text-[#293e72]" />,
                title: "Supporto al Heart Team",
                description: "Facilita discussione e confronto tra cardiologi, cardiochirurghi e radiologi con report condivisibili."
              },
              {
                icon: <Database className="h-8 w-8 text-[#293e72]" />,
                title: "Database sempre aggiornato",
                description: "Include le ultime protesi disponibili sul mercato e le loro compatibilità, sempre allineato alle novità."
              },
              {
                icon: <Stethoscope className="h-8 w-8 text-[#293e72]" />,
                title: "Decisioni basate su evidenze",
                description: "Integra misure anatomiche, linee guida e dati dei produttori in un'unica piattaforma semplice e intuitiva."
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="bg-[#293e72]/10 p-3 rounded-lg inline-block mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="border-[#293e72] text-[#293e72] hover:bg-[#293e72]/10 px-6 py-3"
                onClick={() => scrollToSection('conclusion')}
              >
                Scopri di più
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section id="conclusion" ref={conclusionRef} className="py-20 bg-gradient-to-br from-[#293e72] to-[#1e2e57]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center justify-center mb-6">
                <div className="bg-white/10 p-3 rounded-full">
                  <Brain className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                TAVI Assist: più di un calcolatore
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                <strong>TAVI Assist</strong> non è solo un calcolatore: è uno <strong>strumento decisionale avanzato</strong> che aiuta il clinico a scegliere la valvola più sicura ed efficace per ogni specifico paziente.
              </p>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Integra misure anatomiche, linee guida e dati dei produttori in un'unica piattaforma semplice e intuitiva, 
                migliorando la qualità delle decisioni cliniche e gli outcome dei pazienti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="bg-white text-[#293e72] hover:bg-gray-100 px-8 py-6 text-lg"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <ArrowUp className="mr-2 h-5 w-5" />
                    Torna all'inizio
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

