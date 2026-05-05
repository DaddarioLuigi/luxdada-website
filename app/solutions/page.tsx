"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Code,
  LineChart,
  Workflow,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Briefcase,
  Factory,
  ShoppingBag,
  Building2,
  Lightbulb,
  Target,
  Users,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const viewportOpts = { once: true, amount: 0.12, margin: "0px 0px 200px 0px" } as const

export default function SolutionsPage() {
  const industriesRef = useRef(null)
  const { language } = useLanguage()
  const isIt = language === "it"

  const industriesInView = useInView(industriesRef, { once: true, amount: 0.12, margin: "0px 0px 200px 0px" })

  const solutionCards = isIt
    ? [
        {
          icon: <Workflow className="h-8 w-8 text-[#293e72]" />,
          title: "Digitalizzazione dei processi",
          description:
            "Mappatura As-Is / To-Be, definizione di ruoli e responsabilità, introduzione di strumenti digitali coerenti con come lavorate davvero.",
          features: [
            "Workshop di analisi e documentazione dei flussi",
            "Ridisegno operativo e indicatori di performance",
            "Selezione e rollout guidato degli strumenti",
            "Miglioramento continuo con revisioni periodiche",
          ],
        },
        {
          icon: <Code className="h-8 w-8 text-[#293e72]" />,
          title: "Sviluppo software su misura",
          description:
            "Applicazioni web, API e integrazioni tra sistemi quando il mercato non offre un prodotto che si adatta al vostro caso.",
          features: [
            "Applicazioni dedicate e portali interni",
            "API e micro-servizi per collegare ERP, CRM e verticali",
            "Evoluzione di sistemi legacy senza stravolgere tutto",
            "Deploy su infrastrutture cloud o ibride in accordo con i vincoli IT",
          ],
        },
        {
          icon: <Zap className="h-8 w-8 text-[#293e72]" />,
          title: "Automazione operativa",
          description:
            "Orchestrazione di attività ripetitive tramite integrazioni, regole e workflow (es. passaggi tra reparti, notifiche, sincronizzazioni dati).",
          features: [
            "Automazione dei passaggi tra sistemi già in uso",
            "Gestione eccezioni con coinvolgimento umano quando serve",
            "Riduzione errori manuali e tempi di ciclo",
            "Monitoraggio sintetico degli esiti degli automatismi",
          ],
        },
        {
          icon: <Shield className="h-8 w-8 text-[#293e72]" />,
          title: "Integrazione sistemi e sicurezza",
          description:
            "Connessione controllata tra database, applicazioni e canali esterni, con attenzione ad accessi, tracciabilità e requisiti normativi di settore.",
          features: [
            "API sicure e pattern di integrazione testati",
            "Allineamento con il modello di identità e ruoli aziendale",
            "Tracciabilità delle operazioni e dei flussi dati",
            "Collaborazione con il vostro IT su compliance e rischio",
          ],
        },
        {
          icon: <LineChart className="h-8 w-8 text-[#293e72]" />,
          title: "Dati, reporting e qualità informativa",
          description:
            "Rendere leggibili KPI e aggregazioni partendo da fonti disomogenee: dashboard, export strutturati e controlli di coerenza.",
          features: [
            "Modelli dati e regole di validazione condivise",
            "Dashboard e report rivolti a decision maker",
            "Esportazioni verso Excel o altri strumenti già in uso",
            "Affiancamento nella definizione degli indicatori misurabili",
          ],
        },
        {
          icon: <Brain className="h-8 w-8 text-[#293e72]" />,
          title: "AI applicata dove ha senso nel processo",
          description:
            "Valutazione sobria dei casi d’uso: estrazione da documenti, classificazione, supporto alla decisione interna—integrata nei vostri sistemi, non come chatbot “generico” fine a sé stesso.",
          features: [
            "Analisi di fattibilità e costi ricorrenti prima di partire",
            "Integrazione in workflow già definiti (non solo demo isolate)",
            "Estrazione strutturata da testi e documenti ove previsto",
            "Trasparenza su limiti, revisione umana e tracciabilità",
          ],
        },
      ]
    : [
        {
          icon: <Workflow className="h-8 w-8 text-[#293e72]" />,
          title: "Process digitization",
          description:
            "As-Is / To-Be mapping, clear roles and ownership, and tooling that matches how you actually operate—not a slide-deck-only exercise.",
          features: [
            "Discovery workshops and flow documentation",
            "Operational redesign and measurable KPIs",
            "Tool selection and guided rollout",
            "Continuous improvement with periodic reviews",
          ],
        },
        {
          icon: <Code className="h-8 w-8 text-[#293e72]" />,
          title: "Custom software development",
          description:
            "Web apps, APIs, and system bridges when off-the-shelf products do not fit your constraints or your stack.",
          features: [
            "Purpose-built applications and internal portals",
            "APIs and services connecting ERP, CRM, and line-of-business tools",
            "Evolving legacy landscapes without a risky big-bang rewrite",
            "Deployment on cloud or hybrid infrastructure aligned with IT policy",
          ],
        },
        {
          icon: <Zap className="h-8 w-8 text-[#293e72]" />,
          title: "Operational automation",
          description:
            "Orchestrating recurring work through integrations, rules, and workflows—hand-offs between departments, notifications, data sync—not a generic “RPA suite” promise.",
          features: [
            "Automation across systems you already run",
            "Human-in-the-loop handling for exceptions",
            "Fewer manual errors and shorter cycle times",
            "Lightweight monitoring of automation outcomes",
          ],
        },
        {
          icon: <Shield className="h-8 w-8 text-[#293e72]" />,
          title: "System integration & security",
          description:
            "Controlled connectivity between databases, applications, and external channels—with attention to access control, auditability, and sector requirements.",
          features: [
            "Secure APIs and proven integration patterns",
            "Alignment with your identity and role model",
            "Traceability of operations and data flows",
            "Working with your IT on compliance and risk",
          ],
        },
        {
          icon: <LineChart className="h-8 w-8 text-[#293e72]" />,
          title: "Data, reporting & information quality",
          description:
            "Making KPIs and aggregates legible from heterogeneous sources: dashboards, structured exports, and coherence checks.",
          features: [
            "Shared data shapes and validation rules",
            "Dashboards and reports for decision-makers",
            "Exports to Excel or tools your teams already use",
            "Support defining indicators that you can actually measure",
          ],
        },
        {
          icon: <Brain className="h-8 w-8 text-[#293e72]" />,
          title: "Targeted AI inside real workflows",
          description:
            "Pragmatic use-case assessment: document extraction, classification, internal decision support—embedded in your systems, not a standalone “chatbot product” pitch.",
          features: [
            "Feasibility and operating-cost review before build",
            "Integration into defined workflows—not toy demos alone",
            "Structured extraction from text and documents where appropriate",
            "Clear limits, human review paths, and traceability",
          ],
        },
      ]

  const digitizationSection = isIt
    ? {
        title: "Digitalizzazione che regge il lunedì mattina",
        p1: "Le presentazioni non consegnano risultati: servono requisiti chiari, integrazioni che reggono la realtà operativa e automazioni osservabili quando qualcosa non va.",
        p2: "Che si tratti di back office o di percorsi verso il cliente, uniamo analisi di processo e ingegneria così che le iniziative abbiano adozione, non restino documenti archiviati.",
        bullets: [
          "Un’unica visione coerente tra CRM, ERP e fogli di calcolo, senza imporre un rip-and-replace totale",
          "Automazione con intervento umano per eccezioni e approvazioni",
          "Indicatori operativi collegati a dashboard che il management riconosce come affidabili",
          "Controlli di accesso e tracciabilità inclusi nella consegna, non come patch successive",
        ],
        cta: "Parliamo dei tuoi processi",
        badgeTitle: "Orientati alle operazioni",
        badgeSub: "Consegna misurabile",
        imgAlt: "Dashboard operativa integrata",
      }
    : {
        title: "Digitization that survives Monday morning",
        p1: "Slides do not ship outcomes—you need crisp requirements, integrations that tolerate messy reality, and automation you can observe when something breaks.",
        p2: "Whether modernizing back office or customer-facing journeys, we pair business analysis with engineering so initiatives earn adoption—not shelfware.",
        bullets: [
          "A coherent picture across CRM, ERP, and spreadsheets without forcing a full rip-and-replace",
          "Human-in-the-loop automation for exceptions and approvals",
          "Operational metrics wired into dashboards leadership trusts",
          "Access control and audit trails baked into delivery—not bolted on later",
        ],
        cta: "Talk to us about your processes",
        badgeTitle: "Operations-first",
        badgeSub: "Measured delivery",
        imgAlt: "Integrated operations dashboard",
      }

  const industriesIntro = isIt
    ? {
        title: "Settori e contesti",
        subtitle:
          "Non vendiamo lo stesso “pacchetto” a tutti: partiamo dal processo e dagli strumenti che già avete. Qui alcuni esempi ricorrenti.",
      }
    : {
        title: "Sectors & contexts",
        subtitle:
          "We do not ship a one-size-fits-all bundle—we start from your process and existing stack. Below are common patterns.",
      }

  const tabCopy = {
    enterprise: isIt
      ? {
          title: "Enterprise e servizi professionali",
          body: "Servizi condivisi, reporting multi-sede e lavoro della conoscenza: digitalizziamo filtri di approvazione, consegna verso il cliente e controlli interni senza appesantire gli specialisti.",
          items: [
            "Ingresso e classificazione documentale, instradamento verso i responsabili",
            "Accelerazione procure-to-pay e cicli ordine–evasione–fattura",
            "Governance di progetti con visibilità economica di base",
            "Organizzazione documentale e ricerca interna su policy e procedure",
            "Ruoli, identità e tracciabilità tra gli strumenti collegati",
          ],
          btn: "Approfondisci con una call",
        }
      : {
          title: "Enterprise & professional services",
          body: "Shared services, multi-site reporting, and knowledge-heavy work—we digitize approval chains, client delivery, and internal controls without slowing experts down.",
          items: [
            "Document intake, classification, and routing to owners",
            "Procure-to-pay and order-to-cash acceleration",
            "Project governance with baseline financial visibility",
            "Structured internal knowledge around policies and procedures",
            "Roles, identity, and audit trails across connected tools",
          ],
          btn: "Discuss on a call",
        },
    finance: isIt
      ? {
          title: "Servizi finanziari e amministrazione",
          body: "Focus su integrazione dati, automazione dei passaggi ripetitivi e tracciabilità per controlli e revisioni—non su motori di scoring proprietari venduti come “AI magica”.",
          items: [
            "Riconciliazioni e flussi tra sistemi contabili e operativi",
            "Automazione documentale per onboarding e richieste ricorrenti",
            "Reporting di sintesi per livelli dirigenziali definiti",
            "Maggiore visibilità su tempi e stati delle pratiche",
            "Export controllati verso strumenti di analisi già adottati",
          ],
          btn: "Parlane con noi",
        }
      : {
          title: "Financial services & finance ops",
          body: "Emphasis on data integration, repeatable workflow automation, and traceability for controls—not proprietary scoring engines sold as opaque “AI magic.”",
          items: [
            "Reconciliations and flows between accounting and operational systems",
            "Document automation for onboarding and recurring requests",
            "Executive-ready reporting where definitions are agreed upfront",
            "Better visibility into cycle times and case status",
            "Controlled exports into analytics tools you already use",
          ],
          btn: "Talk to us",
        },
    manufacturing: isIt
      ? {
          title: "Manifattura e operations",
          body: "Colleghiamo pianificazione, magazzino e dati di campo quando sono dispersi tra Excel, MES e gestionali—priorità a chiarezza operativa e meno coordinamento manuale.",
          items: [
            "Allineamento tra ordini, disponibilità materiali e impegni di reparto",
            "Raccolta dati di qualità e tempi in formati confrontabili",
            "Integrazione verso fornitori o piattaforme logistiche esistenti",
            "Dashboard sintetiche per produzione e manutenzione (in base ai dati disponibili)",
            "Automazioni mirate dove il processo è maturo",
          ],
          btn: "Vedi come possiamo aiutare",
        }
      : {
          title: "Manufacturing & operations",
          body: "We connect planning, inventory, and shop-floor data when it lives across spreadsheets, MES, and ERPs—prioritizing operational clarity over buzzwords.",
          items: [
            "Alignment between orders, material availability, and shop commitments",
            "Comparable formats for quality and timing data",
            "Integration toward suppliers or logistics platforms you already use",
            "Concise dashboards for production and maintenance (where data exists)",
            "Targeted automation where the process is mature enough",
          ],
          btn: "See how we can help",
        },
    retail: isIt
      ? {
          title: "Retail e distribuzione",
          body: "Sincronizzazione tra canali, disponibilità e amministrazione: meno discrepanze tra gestionale, e-commerce e magazzino, più processi ripetibili.",
          items: [
            "Flussi ordine–magazzino–fatturazione più coerenti",
            "Allineamento cataloghi e listini dove serve",
            "Riduzione passaggi manuali tra reparto vendite e back office",
            "Reportistica vendite e margini su definizioni condivise",
            "Automazioni dove il volume giustifica l’investimento",
          ],
          btn: "Contattaci",
        }
      : {
          title: "Retail & distribution",
          body: "Synchronizing channels, availability, and back office—fewer mismatches between ERP, e-commerce, and warehouse, more repeatable processes.",
          items: [
            "More coherent order–inventory–billing flows",
            "Catalog and pricing alignment where needed",
            "Fewer manual hops between sales and back office",
            "Sales and margin reporting on agreed definitions",
            "Automation where volume justifies the investment",
          ],
          btn: "Contact us",
        },
  }

  const processIntro = isIt
    ? {
        title: "Come lavoriamo",
        subtitle:
          "Un percorso strutturato per progetti di digitalizzazione, integrazione e sviluppo: obiettivi chiari, consegne progressive, supporto dopo il go-live.",
      }
    : {
        title: "How we work",
        subtitle:
          "A structured path for digitization, integration, and software projects—clear goals, incremental delivery, support after go-live.",
      }

  const processSteps = isIt
    ? [
        {
          title: "Discovery e valutazione",
          description:
            "Ascolto di bisogni, vincoli tecnici e organizzativi; definizione di priorità realistiche e ambito del primo rilascio.",
          icon: <Lightbulb className="h-8 w-8 text-white" />,
          color: "bg-blue-500",
        },
        {
          title: "Pianificazione",
          description:
            "Roadmap con milestone, dipendenze e criteri di accettazione condivisi con il vostro team.",
          icon: <Target className="h-8 w-8 text-white" />,
          color: "bg-indigo-500",
        },
        {
          title: "Sviluppo e integrazione",
          description:
            "Realizzazione tecnica, collegamento ai sistemi esistenti e prove incrementali con chi usa il processo ogni giorno.",
          icon: <Code className="h-8 w-8 text-white" />,
          color: "bg-purple-500",
        },
        {
          title: "Test e ottimizzazione",
          description:
            "Verifiche funzionali e di carico dove serve, rifinitura di prestazioni e gestione degli edge case.",
          icon: <Zap className="h-8 w-8 text-white" />,
          color: "bg-pink-500",
        },
        {
          title: "Rilascio e formazione",
          description:
            "Mess in produzione controllato, documentazione essenziale e formazione mirata agli utenti chiave.",
          icon: <Users className="h-8 w-8 text-white" />,
          color: "bg-red-500",
        },
        {
          title: "Supporto ed evoluzione",
          description:
            "Assistenza successiva, correttivi e piccole evoluzioni in base alle priorità concordate.",
          icon: <Shield className="h-8 w-8 text-white" />,
          color: "bg-orange-500",
        },
      ]
    : [
        {
          title: "Discovery & assessment",
          description:
            "Understanding needs, technical and organizational constraints; realistic priorities and scope for the first release.",
          icon: <Lightbulb className="h-8 w-8 text-white" />,
          color: "bg-blue-500",
        },
        {
          title: "Planning",
          description:
            "Roadmap with milestones, dependencies, and acceptance criteria shared with your stakeholders.",
          icon: <Target className="h-8 w-8 text-white" />,
          color: "bg-indigo-500",
        },
        {
          title: "Development & integration",
          description:
            "Implementation, connection to existing systems, and incremental testing with the people who run the process daily.",
          icon: <Code className="h-8 w-8 text-white" />,
          color: "bg-purple-500",
        },
        {
          title: "Testing & optimization",
          description:
            "Functional and load checks where needed; performance tuning and edge-case handling.",
          icon: <Zap className="h-8 w-8 text-white" />,
          color: "bg-pink-500",
        },
        {
          title: "Deployment & training",
          description:
            "Controlled go-live, concise documentation, and targeted training for key users.",
          icon: <Users className="h-8 w-8 text-white" />,
          color: "bg-red-500",
        },
        {
          title: "Support & evolution",
          description:
            "Post-go-live assistance, fixes, and incremental changes aligned with agreed priorities.",
          icon: <Shield className="h-8 w-8 text-white" />,
          color: "bg-orange-500",
        },
      ]

  const processFooter = isIt
    ? {
        text: "Ogni fase è pensata per ridurre rischi e massimizzare il valore rispetto al contesto reale della vostra organizzazione.",
        btn: "Scrivici",
      }
    : {
        text: "Each phase is designed to reduce risk and maximize value against your organization’s real constraints.",
        btn: "Contact us",
      }

  const hero = isIt
    ? {
        titleBefore: "",
        titleAccent: "Soluzioni",
        titleAfter: "",
        intro:
          "Digitalizzazione dei processi, integrazione tra sistemi, automazione operativa e software su misura: partiamo da ciò che fate oggi e da cosa è realistico consegnare, senza promesse da catalogo generico.",
      }
    : {
        titleBefore: "Our ",
        titleAccent: "Solutions",
        titleAfter: "",
        intro:
          "Process digitization, system integration, operational automation, and bespoke software—we start from how you work today and what can realistically be delivered, without generic catalogue promises.",
      }

  const overview = isIt
    ? {
        title: "Pensate per l’operatività",
        subtitle:
          "Analisi, integrazione, automazione e sviluppo: meno attrito nei passaggi quotidiani, dati più coerenti, tempo liberato per decisioni e relazioni.",
      }
    : {
        title: "Built for real-world operations",
        subtitle:
          "Analysis, integration, automation, and engineering—less friction day to day, more consistent data, more time for judgment and customer-facing work.",
      }

  const cta = isIt
    ? {
        title: "Vuoi capire se possiamo aiutarvi?",
        subtitle:
          "Raccontateci processi e strumenti attuali: vi diremo in modo diretto cosa ha senso fare per primi e cosa no.",
        primary: "Contattaci",
      }
    : {
        title: "Wondering if we can help?",
        subtitle:
          "Tell us about your current processes and stack—we will be straightforward about what to tackle first and what to defer.",
        primary: "Contact us",
      }

  return (
    <div className="pt-24">
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {isIt ? (
                  <>
                    Le nostre <span className="text-[#293e72]">{hero.titleAccent}</span>
                  </>
                ) : (
                  <>
                    {hero.titleBefore}
                    <span className="text-[#293e72]">{hero.titleAccent}</span>
                    {hero.titleAfter}
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-600 mb-8">{hero.intro}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-left max-w-3xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOpts}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{overview.title}</h2>
            <p className="text-lg sm:text-xl text-gray-600">{overview.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionCards.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOpts}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <Card className="border-none shadow-md hover-scale h-full bg-white">
                  <CardContent className="p-4 sm:p-5 md:p-6">
                    <div className="bg-[#293e72]/10 p-3 rounded-lg inline-block mb-4">{solution.icon}</div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                    <p className="text-base sm:text-lg text-gray-600 mb-4">{solution.description}</p>
                    <ul className="space-y-2">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={viewportOpts}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{digitizationSection.title}</h2>
              <p className="text-lg text-gray-600 mb-6">{digitizationSection.p1}</p>
              <p className="text-lg text-gray-600 mb-6">{digitizationSection.p2}</p>
              <ul className="space-y-4 mb-8">
                {digitizationSection.bullets.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white">
                  {digitizationSection.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={viewportOpts}
              className="relative"
            >
              <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
                <Image src="/fintech-dashboard-overview.png" alt={digitizationSection.imgAlt} fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#293e72]/10 p-2 rounded-full">
                    <Workflow className="h-6 w-6 text-[#293e72]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{digitizationSection.badgeTitle}</p>
                    <p className="text-xs text-gray-500">{digitizationSection.badgeSub}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white" ref={industriesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-left max-w-3xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={industriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{industriesIntro.title}</h2>
            <p className="text-xl text-gray-600">{industriesIntro.subtitle}</p>
          </motion.div>

          <Tabs defaultValue="enterprise" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto mb-8">
              <TabsTrigger value="enterprise" className="data-[state=active]:bg-[#293e72] data-[state=active]:text-white py-3">
                <Building2 className="h-5 w-5 mr-2 shrink-0" />
                {isIt ? "Servizi & enterprise" : "Enterprise & services"}
              </TabsTrigger>
              <TabsTrigger value="finance" className="data-[state=active]:bg-[#293e72] data-[state=active]:text-white py-3">
                <Briefcase className="h-5 w-5 mr-2 shrink-0" />
                {isIt ? "Finanza" : "Finance"}
              </TabsTrigger>
              <TabsTrigger value="manufacturing" className="data-[state=active]:bg-[#293e72] data-[state=active]:text-white py-3">
                <Factory className="h-5 w-5 mr-2 shrink-0" />
                {isIt ? "Manifattura" : "Manufacturing"}
              </TabsTrigger>
              <TabsTrigger value="retail" className="data-[state=active]:bg-[#293e72] data-[state=active]:text-white py-3">
                <ShoppingBag className="h-5 w-5 mr-2 shrink-0" />
                {isIt ? "Retail" : "Retail"}
              </TabsTrigger>
            </TabsList>

            {(["enterprise", "finance", "manufacturing", "retail"] as const).map((key) => (
              <TabsContent key={key} value={key} className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{tabCopy[key].title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{tabCopy[key].body}</p>
                    <ul className="space-y-3 mb-6">
                      {tabCopy[key].items.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#293e72] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white">{tabCopy[key].btn}</Button>
                    </Link>
                  </div>
                  <div className="relative h-[350px] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={
                        key === "enterprise"
                          ? "/placeholder.svg?height=700&width=700&query=modern corporate office team collaborating with digital dashboards and laptops"
                          : key === "finance"
                            ? "/fintech-dashboard-overview.png"
                            : key === "manufacturing"
                              ? "/automated-assembly-line.png"
                              : "/placeholder.svg?height=700&width=700&query=modern retail store with digital displays and technology integration"
                      }
                      alt={tabCopy[key].title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-left max-w-3xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={viewportOpts}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{processIntro.title}</h2>
              <p className="text-lg sm:text-xl text-gray-600">{processIntro.subtitle}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOpts}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <Card className="border-none shadow-md hover-scale h-full bg-white">
                  <CardContent className="p-6">
                    <div className={`${step.color} rounded-lg p-4 inline-block mb-4`}>{step.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOpts}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-gray-600 mb-6">{processFooter.text}</p>
              <Link href="/contact">
                <Button className="bg-[#293e72] hover:bg-[#1e2e57] text-white px-8 py-6 text-lg">{processFooter.btn}</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 relative">
        <div className="absolute inset-0 z-0">
          <Image src="/join-team.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#293e72]/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={viewportOpts}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{cta.title}</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl">{cta.subtitle}</p>
              <Link href="/contact">
                <Button className="bg-white text-[#293e72] hover:bg-gray-100 px-8 py-6 text-lg">{cta.primary}</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
