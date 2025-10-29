import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"

export default function RagChatbotCaseStudy(): React.ReactElement {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Conversational AI on WhatsApp with RAG and n8n
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-600"
            >
              How we built a retrieval‑augmented chatbot on WhatsApp that delivers accurate, brand‑safe answers using your content.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-gray max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2>Overview</h2>
              <p>
                We implemented a Retrieval‑Augmented Generation (RAG) chatbot that runs on WhatsApp. Users ask questions; the bot retrieves relevant content from a curated knowledge base and crafts answers with an LLM. Orchestration is handled by <strong>n8n</strong>, which keeps the solution modular, observable, and easy to extend.
              </p>
              <p>
                Why RAG instead of pure fine‑tuning? Because <em>grounding</em> answers in your documents yields higher accuracy, fresher knowledge, and lower maintenance. Fine‑tuning still helps for tone or format, but RAG is ideal when content changes frequently or requires citations.
              </p>
              <h3>Business Goals</h3>
              <ul>
                <li>24/7 instant support directly on WhatsApp</li>
                <li>Grounded answers based on verified, up‑to‑date documents</li>
                <li>Low‑ops, composable workflow using n8n</li>
                <li>Traceability: citations and logs for quality assurance</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[{
                title: "1) Ingestion",
                text: "Documents and URLs are chunked and embedded. Metadata tags control visibility and freshness.",
              }, {
                title: "2) Retrieval",
                text: "For each question, top‑k relevant passages are fetched from the vector store for grounding.",
              }, {
                title: "3) Generation",
                text: "The LLM answers with citations. Guardrails ensure tone, compliance, and safe completions.",
              }].map((c, i) => (
                <motion.div key={c.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.05 * i }} className="bg-white rounded-lg p-4 shadow-sm border">
                  <h4 className="font-semibold text-gray-900 mb-2">{c.title}</h4>
                  <p className="text-gray-600">{c.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Simple flow diagram */}
            <div className="mt-8 rounded-lg bg-white p-6 border shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
                  <Box label="WhatsApp User" />
                </motion.div>
                <Arrow />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }}>
                  <Box label="n8n Workflow" />
                </motion.div>
                <Arrow />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.1 }}>
                  <Box label="Retriever + Vector DB" />
                </motion.div>
                <Arrow />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.15 }}>
                  <Box label="LLM" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="prose prose-gray max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2>Implementation with n8n</h2>
              <ol>
                <li>
                  <strong>Webhook / WhatsApp Integration:</strong> Receive messages via provider (e.g., Twilio, Vonage, Meta Cloud API) and forward to n8n. Validate signatures and throttle if needed.
                </li>
                <li>
                  <strong>Retrieval:</strong> Generate an embedding for the user question and query the vector DB for relevant chunks. We tune <em>top‑k</em>, similarity threshold, and filters by document type.
                </li>
                <li>
                  <strong>Prompt Assembly:</strong> Compose a system prompt with instructions (tone, persona, compliance), the user question, and retrieved context. We enforce citation formatting and a token budget.
                </li>
                <li>
                  <strong>LLM Call:</strong> Request an answer with citations and a concise style suitable for chat. We enable streaming for snappy UX.
                </li>
                <li>
                  <strong>Response Delivery:</strong> Send back the answer to WhatsApp with optional rich formatting and follow‑up suggestions.
                </li>
              </ol>

              <h3>Observability</h3>
              <p>
                Each step in n8n is logged. We track latency per stage (ingress, retrieval, generation) and quality signals like citation use, answer length, and user feedback. Fail‑safes route to a fallback message if guardrails are triggered.
              </p>

              <h3>Pros</h3>
              <ul>
                <li>Grounded answers reduce hallucinations and improve trust</li>
                <li>Fast iteration thanks to n8n’s visual workflows</li>
                <li>Composable: swap LLMs, change retrievers, add guardrails easily</li>
                <li>WhatsApp reach: meet users where they already are</li>
              </ul>

              <h3>Cons</h3>
              <ul>
                <li>Requires careful prompt design and chunking to maintain answer quality</li>
                <li>Latency can grow with larger corpora without caching/streaming</li>
                <li>Ongoing content hygiene is needed to keep results fresh</li>
                <li>WhatsApp provider limits and policies must be handled gracefully</li>
              </ul>

              <h3>Security & Compliance</h3>
              <ul>
                <li>PII redaction and scoped retrieval to avoid over‑exposure</li>
                <li>Audit logs for prompts, retrieved sources, and responses</li>
                <li>Role‑based access for ingestion and administration</li>
              </ul>

              <h3>Performance & Costs</h3>
              <ul>
                <li>Cache frequent Q&A pairs and embeddings to reduce spend</li>
                <li>Stream responses and cap token output for better UX</li>
                <li>Batch ingestion and use background jobs for re‑indexing</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics (simple SVG chart) */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Sample Metrics</h2>
            <div className="rounded-lg bg-white p-6 border shadow-sm">
              <motion.svg
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                viewBox="0 0 420 180"
                className="w-full h-40"
              >
                <g fill="#e5e7eb">
                  <rect x="40" y="20" width="320" height="1" />
                  <rect x="40" y="60" width="320" height="1" />
                  <rect x="40" y="100" width="320" height="1" />
                  <rect x="40" y="140" width="320" height="1" />
                </g>
                <g>
                  <motion.rect x="60" y="80" width="40" initial={{ height: 0 }} whileInView={{ height: 60 }} viewport={{ once: true }} transition={{ duration: 0.6 }} fill="#293e72" />
                  <motion.rect x="140" y="60" width="40" initial={{ height: 0 }} whileInView={{ height: 80 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }} fill="#293e72" />
                  <motion.rect x="220" y="40" width="40" initial={{ height: 0 }} whileInView={{ height: 100 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} fill="#293e72" />
                  <motion.rect x="300" y="50" width="40" initial={{ height: 0 }} whileInView={{ height: 90 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} fill="#293e72" />
                </g>
                <g fontSize="10" fill="#6b7280">
                  <text x="60" y="160">Week 1</text>
                  <text x="140" y="160">Week 2</text>
                  <text x="220" y="160">Week 3</text>
                  <text x="300" y="160">Week 4</text>
                </g>
              </motion.svg>
              <p className="text-sm text-gray-600 mt-3">Example: Resolution rate improved week‑over‑week as knowledge coverage grew.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Want a WhatsApp assistant trained on your content?</motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }} className="text-lg text-gray-600 mb-6">We can help you ship quickly with n8n, RAG best practices, and robust guardrails.</motion.p>
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              href={process.env.NEXT_PUBLIC_BOOKING_URL || "/contact"}
              target={process.env.NEXT_PUBLIC_BOOKING_URL ? "_blank" : undefined}
              rel={process.env.NEXT_PUBLIC_BOOKING_URL ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#293e72] text-white hover:bg-[#1e2e57] transition-colors"
            >
              Schedule a Consultation
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  )
}

function Box({ label }: { label: string }) {
  return (
    <div className="min-w-[160px] rounded-md border bg-white px-4 py-3 text-center shadow-sm">
      <span className="text-sm font-medium text-gray-900">{label}</span>
    </div>
  )
}

function Arrow() {
  return (
    <div className="hidden md:block" aria-hidden>
      <svg width="36" height="16" viewBox="0 0 36 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8H32M32 8L26 2M32 8L26 14" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}


