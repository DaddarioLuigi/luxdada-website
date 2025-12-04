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
import { useLanguage } from "@/lib/language-context"

export default function TaviLandingPage() {
  const { language } = useLanguage()
  const isIt = language === 'it'
  
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

  // Translations
  const t = {
    hero: {
      title: isIt ? "Supporto intelligente per la selezione della protesi valvolare" : "Intelligent support for valve prosthesis selection",
      description: isIt 
        ? "Un'applicazione mobile progettata per supportare il cardiologo interventista nella selezione della protesi valvolare più appropriata nei pazienti sottoposti a procedura TAVI."
        : "A mobile application designed to support the interventional cardiologist in selecting the most appropriate valve prosthesis for patients undergoing TAVI procedures.",
      description2: isIt
        ? "L'obiettivo è rendere il processo di scelta più rapido, standardizzato e sicuro, riducendo il rischio di mis-sizing e migliorando l'outcome procedurale."
        : "The goal is to make the selection process faster, standardized, and safer, reducing the risk of mis-sizing and improving procedural outcomes.",
      cta: isIt ? "Scopri le funzionalità" : "Discover features"
    },
    features: {
      title: isIt ? "Funzionalità principali" : "Main Features",
      subtitle: isIt 
        ? "Strumenti avanzati per supportare il clinico nella scelta della valvola più sicura ed efficace"
        : "Advanced tools to support clinicians in choosing the safest and most effective valve",
      items: [
        {
          title: isIt ? "Inserimento guidato dei parametri" : "Guided parameter input",
          description: isIt
            ? "Inserimento semplice e strutturato di tutti i parametri necessari per la scelta della valvola: diametri annulari, area e perimetro dell'anello aortico da TC, distanza coronarica, dimensioni del seno di Valsalva e dell'aorta ascendente, calcificazioni, valve-to-coronary e accesso vascolare previsto."
            : "Simple and structured input of all parameters necessary for valve selection: annular diameters, area and perimeter of the aortic annulus from CT, coronary distance, dimensions of the Valsalva sinus and ascending aorta, calcifications, valve-to-coronary, and expected vascular access.",
          highlight: isIt
            ? "Interfaccia intuitiva che guida il clinico passo dopo passo nell'inserimento dei dati."
            : "Intuitive interface that guides the clinician step by step through data entry."
        },
        {
          title: isIt ? "Algoritmo di raccomandazione" : "Recommendation algorithm",
          description: isIt
            ? "Confronto automatico dei valori con le tabelle ufficiali di sizing dei principali produttori di bioprotesi. L'app evidenzia le taglie più compatibili, segnala eventuali rischi (coronary obstruction, oversizing, underexpansion) e suggerisce alternative in caso di misure borderline."
            : "Automatic comparison of values with official sizing tables from major bioprosthesis manufacturers. The app highlights the most compatible sizes, signals potential risks (coronary obstruction, oversizing, underexpansion) and suggests alternatives in case of borderline measurements.",
          highlight: isIt
            ? "Risultato: lista di protesi consigliate ordinata per grado di compatibilità."
            : "Result: list of recommended prostheses ordered by compatibility level."
        },
        {
          title: isIt ? "Informazioni tecniche sui dispositivi" : "Technical device information",
          description: isIt
            ? "Accesso rapido a informazioni dettagliate su ogni dispositivo: misure complete, sizing chart ufficiali, tipo e dimensioni dell'introduttore richiesto, e minimo diametro vascolare compatibile. Tutti i dati tecnici essenziali sempre a portata di mano."
            : "Quick access to detailed information on each device: complete measurements, official sizing charts, required introducer type and dimensions, and minimum compatible vascular diameter. All essential technical data always at hand.",
          highlight: isIt
            ? "Database completo e sempre aggiornato con le specifiche tecniche di tutti i dispositivi disponibili."
            : "Complete and always up-to-date database with technical specifications of all available devices."
        },
        {
          title: isIt ? "Archivio procedurale e report PDF" : "Procedural archive and PDF reports",
          description: isIt
            ? "Salvataggio dei casi, creazione di report procedurale in PDF e condivisione nel team per facilitare il workflow del Heart Team."
            : "Case saving, procedural PDF report creation and team sharing to facilitate Heart Team workflow.",
          highlight: isIt ? "Documentazione completa e condivisibile." : "Complete and shareable documentation."
        }
      ],
      navButton: isIt ? "Scopri i parametri supportati" : "Discover supported parameters"
    },
    parameters: {
      title: isIt ? "Parametri clinici e anatomici supportati" : "Supported clinical and anatomical parameters",
      items: isIt ? [
        "Diametri annulari (min, max, medio)",
        "Area e perimetro dell'anello aortico da TC",
        "Distanza coronarica (sinistra/destra)",
        "Dimensioni del seno di Valsalva",
        "Dimensioni dell'aorta ascendente",
        "Calcificazioni (score semiquantitativo)",
        "Valve-to-coronary",
        "Accesso vascolare previsto"
      ] : [
        "Annular diameters (min, max, mean)",
        "Area and perimeter of aortic annulus from CT",
        "Coronary distance (left/right)",
        "Valsalva sinus dimensions",
        "Ascending aorta dimensions",
        "Calcifications (semiquantitative score)",
        "Valve-to-coronary",
        "Expected vascular access"
      ],
      navButton: isIt ? "Scopri il valore aggiunto" : "Discover added value"
    },
    benefits: {
      title: isIt ? "Valore aggiunto" : "Added Value",
      subtitle: isIt 
        ? "Perché scegliere TAVI Assist per supportare le tue procedure"
        : "Why choose TAVI Assist to support your procedures",
      items: [
        {
          title: isIt ? "Standardizzazione" : "Standardization",
          description: isIt
            ? "Riduce la variabilità clinica nella scelta del device, basandosi su dati oggettivi e linee guida consolidate."
            : "Reduces clinical variability in device selection, based on objective data and established guidelines."
        },
        {
          title: isIt ? "Riduzione dei rischi" : "Risk reduction",
          description: isIt
            ? "Minimizza errori di sizing, riducendo complicanze come leak paravalvolare, embolizzazione o ostruzione coronarica."
            : "Minimizes sizing errors, reducing complications such as paravalvular leak, embolization or coronary obstruction."
        },
        {
          title: isIt ? "Velocità e facilità d'uso" : "Speed and ease of use",
          description: isIt
            ? "Permette di ottenere una raccomandazione in pochi secondi, utile anche in contesti urgenti."
            : "Allows you to get a recommendation in seconds, useful even in urgent contexts."
        },
        {
          title: isIt ? "Supporto al Heart Team" : "Heart Team support",
          description: isIt
            ? "Facilita discussione e confronto tra cardiologi, cardiochirurghi e radiologi con report condivisibili."
            : "Facilitates discussion and comparison between cardiologists, cardiac surgeons and radiologists with shareable reports."
        },
        {
          title: isIt ? "Database sempre aggiornato" : "Always updated database",
          description: isIt
            ? "Include le ultime protesi disponibili sul mercato e le loro compatibilità, sempre allineato alle novità."
            : "Includes the latest prostheses available on the market and their compatibilities, always aligned with the latest developments."
        },
        {
          title: isIt ? "Decisioni basate su evidenze" : "Evidence-based decisions",
          description: isIt
            ? "Integra misure anatomiche, linee guida e dati dei produttori in un'unica piattaforma semplice e intuitiva."
            : "Integrates anatomical measurements, guidelines and manufacturer data into a single simple and intuitive platform."
        }
      ],
      navButton: isIt ? "Scopri di più" : "Learn more"
    },
    conclusion: {
      title: isIt ? "TAVI Assist: più di un calcolatore" : "TAVI Assist: more than a calculator",
      text1: isIt
        ? "TAVI Assist non è solo un calcolatore: è uno strumento decisionale avanzato che aiuta il clinico a scegliere la valvola più sicura ed efficace per ogni specifico paziente."
        : "TAVI Assist is not just a calculator: it is an advanced decision-making tool that helps clinicians choose the safest and most effective valve for each specific patient.",
      text2: isIt
        ? "Integra misure anatomiche, linee guida e dati dei produttori in un'unica piattaforma semplice e intuitiva, migliorando la qualità delle decisioni cliniche e gli outcome dei pazienti."
        : "It integrates anatomical measurements, guidelines and manufacturer data into a single simple and intuitive platform, improving the quality of clinical decisions and patient outcomes.",
      button: isIt ? "Torna all'inizio" : "Back to top"
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
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t.hero.description}
              </p>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {t.hero.description2}
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
                    {t.hero.cta}
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
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t.features.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {t.features.items.map((feature, index) => {
              const icons = [
                <ClipboardList className="h-8 w-8 text-[#293e72]" />,
                <Brain className="h-8 w-8 text-[#293e72]" />,
                <Database className="h-8 w-8 text-[#293e72]" />,
                <FileText className="h-8 w-8 text-[#293e72]" />
              ]
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="bg-[#293e72]/10 p-3 rounded-lg inline-block mb-4">
                      {icons[index]}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">{feature.description}</p>
                    <p className="text-sm text-[#293e72] font-medium italic">{feature.highlight}</p>
                  </CardContent>
                </Card>
              </motion.div>
              )
            })}
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
                {t.features.navButton}
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
                {t.parameters.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t.parameters.items.map((param, index) => (
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
                  {t.parameters.navButton}
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
              {t.benefits.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t.benefits.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.benefits.items.map((benefit, index) => {
              const icons = [
                <Shield className="h-8 w-8 text-[#293e72]" />,
                <Activity className="h-8 w-8 text-[#293e72]" />,
                <Zap className="h-8 w-8 text-[#293e72]" />,
                <Users className="h-8 w-8 text-[#293e72]" />,
                <Database className="h-8 w-8 text-[#293e72]" />,
                <Stethoscope className="h-8 w-8 text-[#293e72]" />
              ]
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="bg-[#293e72]/10 p-3 rounded-lg inline-block mb-4">
                      {icons[index]}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
              )
            })}
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
                {t.benefits.navButton}
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
                {t.conclusion.title}
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                <strong>TAVI Assist</strong> {isIt ? "non è solo un calcolatore: è uno" : "is not just a calculator: it is an"} <strong>{isIt ? "strumento decisionale avanzato" : "advanced decision-making tool"}</strong> {isIt ? "che aiuta il clinico a scegliere la valvola più sicura ed efficace per ogni specifico paziente." : "that helps clinicians choose the safest and most effective valve for each specific patient."}
              </p>
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {t.conclusion.text2}
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
                    {t.conclusion.button}
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

