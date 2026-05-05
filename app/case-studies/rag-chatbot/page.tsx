"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { KatexDisplay, KatexInline } from "@/components/katex-math"

export default function RagChatbotCaseStudy(): React.ReactElement {
  const { language } = useLanguage()
  const isIt = language === "it"

  const vp = { once: true as const, amount: 0.12, margin: "0px 0px 200px 0px" }

  return (
    <div className="pt-24">
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {isIt
                ? "Chatbot conversazionale su WhatsApp con RAG e orchestrazione n8n"
                : "Conversational WhatsApp assistant with retrieval-augmented generation and n8n orchestration"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-600"
            >
              {isIt
                ? "Un caso di studio sulla messa in opera di risposte linguisticamente fluide, ancorate a corpus documentali curati e supervisionati tramite workflow osservabili."
                : "A case study on deploying fluent, linguistically polished answers grounded in curated corpora, supervised through observable workflows."}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl mx-auto space-y-6 text-gray-800 leading-[1.75] text-[17px]">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-sora">
                {isIt ? "Premessa operativa e domanda di ricerca" : "Operational premise and research question"}
              </h2>
              <p>
                {isIt
                  ? "Il canale WhatsApp concentra una frazione crescente delle richieste informative rivolte alle organizzazioni: la messaggistica asincrona riduce i costi di attenzione dell’utente e impone, tuttavia, risposte brevi, contestuali e verificabili. Il problema centrale non è solo generare testo plausibile, ma vincolare la distribuzione delle risposte affinché resti supportata da estratti documentali effettivamente presenti nel patrimonio informativo approvato. Da questo deriva l’adozione di paradigmi di Retrieval-Augmented Generation (RAG), nei quali il modello linguistico non opera come unica fonte di verità, ma come modulo di generazione condizionato da un sottoinsieme di contesto recuperato dinamicamente."
                  : "WhatsApp increasingly concentrates informative traffic toward organizations: asynchronous messaging lowers users’ attention costs yet demands answers that are short, contextual, and auditable. The core difficulty is not merely plausible text, but constraining the response distribution so it remains anchored to excerpts actually present in an approved knowledge corpus. This motivates Retrieval-Augmented Generation (RAG), where the language model is not the sole source of truth but a conditioning module operating on dynamically retrieved context."}
              </p>
              <p>
                {isIt
                  ? "Formalmente, si cerca una mappa che associ a ogni interrogativo dell’utente una risposta la cui massa di probabilità sia concentrata su formulazioni coerenti con un insieme finito di evidenze documentali, riducendo la massa assegnata a contenuti non attestati."
                  : "Formally, we seek a mapping from each user query to a response whose probability mass concentrates on phrasings coherent with a finite set of documentary evidence, minimizing mass assigned to unattested content."}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-sora">
                {isIt ? "Recupero semantico e similarità in spazio embedding" : "Semantic retrieval and similarity in embedding space"}
              </h2>
              <p>
                {isIt
                  ? "Il primo stadio costruisce rappresentazioni dense della domanda e dei segmenti documentali (chunk) nello stesso spazio vettoriale. La selezione dei candidati si basa sulla similarità coseno tra vettori normalizzati: tale scelta è computazionalmente efficiente e geometricamente interpretabile come misura dell’angolo tra direzioni semantiche."
                  : "The first stage maps both the question and textual chunks into a shared dense vector space. Candidate selection relies on cosine similarity between normalized vectors: computationally efficient and geometrically interpretable as an angular measure between semantic directions."}
              </p>
              <KatexDisplay math="\mathrm{sim}(\mathbf{q}, \mathbf{d}_i) = \frac{\mathbf{q}^\top \mathbf{d}_i}{\lVert \mathbf{q} \rVert \, \lVert \mathbf{d}_i \rVert}" />
              <p>
                {isIt
                  ? "Indichiamo con "
                  : "Let "}
                <KatexInline math="\mathbf{q}" />
                {isIt
                  ? " l’embedding della query e con "
                  : " denote the query embedding and "}
                <KatexInline math="\mathbf{d}_i" />
                {isIt
                  ? " quello dell’i-esimo chunk. In pratica si mantiene un insieme "
                  : " that of the i-th chunk. In practice we retain a retrieved set "}
                <KatexInline math="\mathcal{C} = \{c_1,\ldots,c_k\}" />
                {isIt
                  ? " ottenuto tramite ricerca approssimata nel database vettoriale; il parametro "
                  : " via approximate nearest-neighbour search; the hyperparameter "}
                <KatexInline math="k" /> (
                {isIt ? "cosiddetto \"top‑k\"" : '"top-k"'}){" "}
                {isIt
                  ? "media il compromesso tra ricchezza contestuale e latenza di inferenza."
                  : "mediates the trade-off between contextual richness and inference latency."}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-sora">
                {isIt ? "Generazione condizionata e controllo della massa di probabilità" : "Conditional generation and probability-mass control"}
              </h2>
              <p>
                {isIt
                  ? "Il modello linguistico riceve la query e il contesto recuperato; idealmente, la risposta ottimale massimizza la probabilità condizionata rispetto ai chunk selezionati, sotto vincoli di stile e conformità codificati nel prompt di sistema."
                  : "The language model conditions on both the query and retrieved material; ideally, the preferred completion maximizes conditional probability given those chunks, subject to stylistic and compliance constraints encoded in the system prompt."}
              </p>
              <KatexDisplay math="\hat{\mathbf{y}} \in \arg\max_{\mathbf{y}} \; \log p_\theta(\mathbf{y} \mid \mathbf{q}, \mathcal{C}) \quad \text{s.t.} \quad \mathcal{G}(\mathbf{y}) \le 0" />
              <p>
                {isIt
                  ? "Qui "
                  : "Here "}
                <KatexInline math="p_\theta" />
                {isIt
                  ? " denota la famiglia parametrica del modello e "
                  : " denotes the parametric model family, while "}
                <KatexInline math="\mathcal{G}" />
                {isIt
                  ? " raccoglie vincoli soft (tono, lunghezza, presenza di citazioni). In assenza di recupero pertinente, la pipeline deve degradare in modo controllato—ad esempio rifiutando la domanda o invitando a un canale umano—anziché «inventare» fatti."
                  : " collects soft constraints (tone, length, citation behavior). When retrieval is uninformative, the pipeline should degrade gracefully—for instance declining or escalating—rather than fabricating facts."}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-sora">
                {isIt ? "Orchestrazione su n8n e canale WhatsApp" : "Orchestration on n8n and the WhatsApp channel"}
              </h2>
              <p>
                {isIt
                  ? "L’integrazione del provider di messaggistica con webhook verso n8n consente di trattare ogni messaggio in ingresso come evento osservabile: normalizzazione dell’identificativo mittente, verifica delle firme, deduplicazione e code di backoff gestiscono la variabilità operativa tipica dei canali esterni. Il grafo di workflow separa nettamente le fasi di embedding della query, interrogazione del vector store, composizione del prompt e invocazione del modello, così che latenza e costo possano essere attribuiti per stadio."
                  : "Messaging-provider integration via webhooks into n8n treats each inbound message as an observable event: sender normalization, signature verification, deduplication, and backoff queues absorb operational variability. The workflow graph cleanly separates query embedding, vector retrieval, prompt assembly, and model invocation so latency and spend can be attributed stage-wise."}
              </p>
              <p>
                {isIt
                  ? "Il budget tokenico totale della richiesta può essere approssimato dalla somma dei contributi di sistema, contesto recuperato e domanda utente; la pianificazione di "
                  : "Total token budget may be approximated by summing system, retrieved context, and user contributions; planning "}
                <KatexInline math="B_{\mathrm{tot}}" />
                {isIt
                  ? " impone trade-off espliciti tra ampiezza di "
                  : " therefore exposes explicit trade-offs between breadth of "}
                <KatexInline math="k" />
                {isIt
                  ? ", dimensione dei chunk e profondità della risposta."
                  : ", chunk size, and answer depth."}
              </p>
              <KatexDisplay math="B_{\mathrm{tot}} \approx B_{\mathrm{sys}} + \sum_{j=1}^{k} \lvert c_j \rvert + \lvert q \rvert + B_{\mathrm{out}}" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-sora">
                {isIt ? "Governance, osservabilità e conclusioni" : "Governance, observability, and conclusions"}
              </h2>
              <p>
                {isIt
                  ? "L’adozione in produzione richiede tracciamento dei prompt, delle fonti recuperate e delle risposte finali, con politiche di redazione del PII e ambiti di retrieval ristretti per ruolo. Le metriche di servizio (percentile di latenza end-to-end, tasso di fallback, frequenza di citazioni effettive) consentono iterazioni guidate dai dati più che da impressioni qualitative isolate."
                  : "Production adoption demands logging prompts, retrieved sources, and final replies, with PII redaction policies and role-scoped retrieval. Service metrics—end-to-end latency percentiles, fallback rates, effective citation frequency—enable data-informed iteration rather than purely qualitative impressions."}
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4 text-gray-700">
                <li>
                  {isIt
                    ? "Obiettivo primario: assistenza continua su WhatsApp senza erodere la fiducia attraverso allucinazioni non attestate."
                    : "Primary objective: always-on WhatsApp assistance without eroding trust through unattested hallucinations."}
                </li>
                <li>
                  {isIt
                    ? "Obiettivo secondario: modularità (scambiare LLM o strategie di chunking) senza riscrivere l’intera integrazione canale."
                    : "Secondary objective: modularity—swap LLMs or chunking strategies without rewriting the entire channel integration."}
                </li>
              </ul>
              <p className="text-sm text-gray-600">
                {isIt
                  ? "Schema del flusso informativo (semplificato):"
                  : "Simplified information-flow sketch:"}
              </p>
              <div className="rounded-lg border bg-gray-50 p-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-sm text-gray-800">
                <span className="rounded-md border bg-white px-3 py-2 shadow-sm">WhatsApp</span>
                <span aria-hidden className="text-gray-400">
                  →
                </span>
                <span className="rounded-md border bg-white px-3 py-2 shadow-sm">n8n</span>
                <span aria-hidden className="text-gray-400">
                  →
                </span>
                <span className="rounded-md border bg-white px-3 py-2 shadow-sm">{isIt ? "Retriever" : "Retriever"}</span>
                <span aria-hidden className="text-gray-400">
                  →
                </span>
                <span className="rounded-md border bg-white px-3 py-2 shadow-sm">LLM</span>
              </div>
            </motion.div>
          </article>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-sora">
              {isIt ? "Indicatori evolutivi (esemplificativi)" : "Illustrative evolution of indicators"}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {isIt
                ? "Durante il rollout, il tasso di risoluzione al primo contatto tende a crescere all’aumentare della copertura documentale indicizzata e della qualità dei chunk; la figura seguente è puramente esemplificativa e non costituisce una serie storica del progetto."
                : "During rollout, first-contact resolution typically rises as indexed coverage and chunk quality improve; the figure below is illustrative rather than a literal project time series."}
            </p>
            <div className="rounded-lg bg-white p-6 border shadow-sm">
              <motion.svg
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={vp}
                transition={{ duration: 0.6 }}
                viewBox="0 0 420 180"
                className="w-full h-48 md:h-40"
              >
                <g fill="#e5e7eb">
                  <rect x="40" y="20" width="320" height="1" />
                  <rect x="40" y="60" width="320" height="1" />
                  <rect x="40" y="100" width="320" height="1" />
                  <rect x="40" y="140" width="320" height="1" />
                </g>
                <g>
                  <rect x="60" y="80" width="40" height="60" fill="#293e72" />
                  <rect x="140" y="60" width="40" height="80" fill="#293e72" />
                  <rect x="220" y="40" width="40" height="100" fill="#293e72" />
                  <rect x="300" y="50" width="40" height="90" fill="#293e72" />
                </g>
                <g fontSize="10" fill="#6b7280">
                  <text x="60" y="160">
                    T1
                  </text>
                  <text x="140" y="160">
                    T2
                  </text>
                  <text x="220" y="160">
                    T3
                  </text>
                  <text x="300" y="160">
                    T4
                  </text>
                </g>
              </motion.svg>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/case-studies/clinical-records-extraction" className="text-[#293e72] font-medium hover:underline">
              ←{" "}
              {isIt
                ? "Caso studio: cartelle cliniche ed estrazione metriche"
                : "Case study: clinical records and metric extraction"}
            </Link>
            <Link
              href={process.env.NEXT_PUBLIC_BOOKING_URL || "/contact"}
              target={process.env.NEXT_PUBLIC_BOOKING_URL ? "_blank" : undefined}
              rel={process.env.NEXT_PUBLIC_BOOKING_URL ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#293e72] text-white hover:bg-[#1e2e57] transition-colors"
            >
              {isIt ? "Parliamo del tuo caso" : "Discuss your use case"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
