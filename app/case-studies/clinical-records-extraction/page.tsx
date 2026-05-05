"use client"

import type React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import { KatexDisplay, KatexInline } from "@/components/katex-math"

export default function ClinicalRecordsCaseStudy(): React.ReactElement {
  const { language } = useLanguage()
  const isIt = language === "it"
  const vp = { once: true as const, amount: 0.12, margin: "0px 0px 200px 0px" }

  return (
    <div className="pt-24">
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-left">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              {isIt
                ? "Digitalizzazione di cartelle cliniche ed estrazione strutturata verso Excel"
                : "Digitizing clinical records and structured extraction into Excel"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-600"
            >
              {isIt
                ? "Da documenti clinici eterogenei a un foglio di lavoro tabellare con metriche e variabili estratte in modo ripetibile, validabile e confrontabile nel tempo."
                : "From heterogeneous clinical documents to a spreadsheet-grade tabular layer with metrics and variables extracted repeatably, validateably, and comparably over time."}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl space-y-6 text-gray-800 leading-[1.75] text-[17px]">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {isIt ? "Problema clinico-informatico" : "Clinical–informatics problem"}
              </h2>
              <p>
                {isIt
                  ? "Le cartelle cliniche persistono spesso in forma mista: referti dattiloscritti, pdf scannerizzati, allegati firmati digitalmente e note liberamente redatte. Tale eterogeneità ostacola analisi di coorte, audit qualitativi e confronti longitudinali su indicatori definiti formalmente. L’obiettivo del progetto non è meramente «digitalizzare l’immagine», ma produrre una rappresentazione tabellare—tipicamente un foglio Excel condiviso nel perimetro autorizzato—in cui ogni riga corrisponde a un episodio documentale e le colonne corrispondono a variabili cliniche e amministrative estratte con regole esplicite."
                  : "Medical records frequently persist in hybrid form: typed reports, scanned PDFs, digitally signed attachments, and free-text notes. Such heterogeneity impedes cohort analytics, qualitative audits, and longitudinal comparisons on formally defined indicators. The aim here is not merely to digitize imagery but to yield a tabular representation—typically an Excel workbook shared within an authorized perimeter—where each row reflects a documentary episode and columns encode clinical and administrative variables under explicit extraction rules."}
              </p>
              <p>
                {isIt
                  ? "Il vincolo di validità impone che ogni valore estratto sia ricondotto al passaggio sorgente (provenienza pagina, frammento di testo o coordinate di layout), in modo che revisioni umane e controlli automatici possano convivere."
                  : "A validity constraint requires each extracted value to map back to a source passage (page provenance, text span, or layout coordinates) so human review and automated checks can coexist."}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {isIt ? "Pipeline cognitiva e schema di destinazione" : "Cognitive pipeline and destination schema"}
              </h2>
              <p>
                {isIt
                  ? "Il flusso elaborativo concatena riconoscimento ottico dei caratteri e/o estrazione di testo nativo, segmentazione semantica delle sezioni cliniche (esame obiettivo, terapia, esiti di laboratorio) e normalizzazione lessicale verso un dizionario controllato di unità e codifiche. I campi strutturati—pressione arteriosa mediana, emoglobina glicata, punteggi di scala—vengono quindi proiettati su colonne tipizzate del foglio di calcolo, mentre i campi liberi restano disponibili come note annotate."
                  : "The processing chain concatenates optical character recognition and/or native text extraction, semantic segmentation of clinical sections (physical exam, therapy, laboratory outcomes), and lexical normalization toward a controlled vocabulary of units and encodings. Structured fields—median arterial pressure, HbA1c, scale scores—project onto typed spreadsheet columns while free-text remains available as annotated notes."}
              </p>
              <p>
                {isIt
                  ? "Indichiamo con "
                  : "Let "}
                <KatexInline math="\phi" />
                {isIt
                  ? " la trasformazione che mappa un documento grezzo "
                  : " denote the mapping from a raw document "}
                <KatexInline math="x" />
                {isIt
                  ? " in un vettore di attributi "
                  : " to an attribute vector "}
                <KatexInline math="\mathbf{z} \in \mathbb{R}^d" />
                {isIt
                  ? " coerente con lo schema concordato; la componente "
                  : " consistent with the agreed schema; component "}
                <KatexInline math="z_j" />
                {isIt
                  ? " rappresenta il valore estratto per la "
                  : " captures the value extracted for the "}
                <KatexInline math="j" />
                {isIt ? "-esima metrica clinica o indicatore amministrativo." : "-th clinical metric or administrative indicator."}
              </p>
              <KatexDisplay math="\mathbf{z} = \phi(x), \qquad z_j \in \mathcal{V}_j \cup \{\bot\}" />
              <p className="text-sm text-gray-600">
                {isIt
                  ? "Il simbolo "
                  : "The symbol "}
                <KatexInline math="\bot" />
                {isIt
                  ? " denota esplicitamente l’assenza di informazione attestata nel documento, distinguendo il «non rilevato» dal «non applicabile»."
                  : " explicitly denotes unattested information in the document, distinguishing “unknown” from “not applicable.”"}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {isIt
                  ? "Valutazione estrattiva: precisione, richiamo e F₁"
                  : "Extraction evaluation: precision, recall, and F₁-score"}
              </h2>
              <p>
                {isIt
                  ? "Per ciascun slot estrattivo si definisce un gold standard revisionale; classificando veri positivi, falsi positivi e falsi negativi è possibile quantificare l’accordo tra sistema e revisori umani su campioni stratificati."
                  : "Each extraction slot receives an adjudicated gold standard; by tallying true positives, false positives, and false negatives we quantify agreement between the automated system and human reviewers on stratified samples."}
              </p>
              <KatexDisplay math="P = \frac{\mathrm{TP}}{\mathrm{TP}+\mathrm{FP}}, \quad R = \frac{\mathrm{TP}}{\mathrm{TP}+\mathrm{FN}}, \quad F_1 = \frac{2PR}{P+R}" />
              <p>
                {isIt
                  ? "Quando le etichette sono sbilanciate (prevalenza bassa di alcuni eventi clinici), il "
                  : "When labels are imbalanced (low prevalence of certain clinical events), "}
                <KatexInline math="F_1" />
                {isIt
                  ? " fornisce una sintesi più informativa della sola accuratezza marginale; in alternativa si possono impiegare medie macro per slot e reportare intervalli di confidenza bootstrap sulle stime."
                  : " provides a more informative summary than marginal accuracy alone; macro-averaging across slots and bootstrap confidence intervals are common reporting complements."}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {isIt ? "Esportazione Excel e tracciabilità" : "Excel export and traceability"}
              </h2>
              <p>
                {isIt
                  ? "Il workbook finale aggrega più fogli (episodi, laboratorio, farmaci) collegati da chiavi pseudonimizzate; ogni cella numerica riporta, in metadati affiancati o in foglio di lookup, l’identificativo della porzione documentale che ha alimentato l’estrazione. Questa architettura consente riesecuzioni batch dopo aggiornamento dei modelli o del dizionario clinico, con diff minimi rispetto alla baseline precedente—proprietà particolarmente apprezzata nei comitati di qualità."
                  : "The resulting workbook aggregates sheets (episodes, laboratory, medications) linked by pseudonymized keys; each numeric cell carries, in side metadata or a lookup sheet, the identifier of the documentary span that fed the extraction. The architecture supports batch reruns after model or vocabulary updates with minimal diffs versus prior baselines—a property valued in quality committees."}
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4 text-gray-700">
                <li>
                  {isIt
                    ? "Requisito centrale: riproducibilità delle metriche tra versioni successive della pipeline."
                    : "Central requirement: reproducibility of metrics across successive pipeline versions."}
                </li>
                <li>
                  {isIt
                    ? "Secondario: interoperabilità verso BI e registri già in uso, tramite colonne tipizzate e codifiche standard laddove disponibili."
                    : "Secondary: interoperability toward incumbent BI and registries via typed columns and standard codes where available."}
                </li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={vp} transition={{ duration: 0.5 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {isIt ? "Riflessioni conclusive" : "Concluding remarks"}
              </h2>
              <p>
                {isIt
                  ? "La transizione da archivi cartacei o pdf isolati a un foglio di lavoro strutturato non elimina la necessità di supervisione clinica, ma sposta il dibattito dal trascrivere manualmente al validare sistematicamente eccezioni e casi limite. In questo senso, la digitalizzazione documentale funge da infrastruttura empirica per successive analisi—descrittive e, con le dovute cautele inferenziali, anche comparative."
                  : "Moving from paper archives or isolated PDFs to a structured workbook does not remove the need for clinical supervision, but shifts debate from manual transcription to systematically adjudicating edge cases. In that sense, document digitization becomes empirical infrastructure for subsequent analysis—descriptive and, with appropriate inferential caution, comparative."}
              </p>
            </motion.div>
          </article>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <Link href="/case-studies/rag-chatbot" className="text-[#293e72] font-medium hover:underline">
              ← {isIt ? "Caso studio: chatbot RAG su WhatsApp" : "Case study: RAG chatbot on WhatsApp"}
            </Link>
            <Link
              href={process.env.NEXT_PUBLIC_BOOKING_URL || "/contact"}
              target={process.env.NEXT_PUBLIC_BOOKING_URL ? "_blank" : undefined}
              rel={process.env.NEXT_PUBLIC_BOOKING_URL ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#293e72] text-white hover:bg-[#1e2e57] transition-colors"
            >
              {isIt ? "Contattaci" : "Contact us"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
