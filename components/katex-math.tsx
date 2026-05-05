"use client"

import katex from "katex"
import "katex/dist/katex.min.css"
import { useMemo } from "react"

export function KatexDisplay({ math }: { math: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, { displayMode: true, throwOnError: false, strict: "ignore" })
    } catch {
      return math
    }
  }, [math])
  return (
    <div
      className="my-6 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50/80 px-4 py-4 text-left text-gray-900"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function KatexInline({ math }: { math: string }) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, { displayMode: false, throwOnError: false, strict: "ignore" })
    } catch {
      return math
    }
  }, [math])
  return <span className="mx-0.5 inline-block align-middle" dangerouslySetInnerHTML={{ __html: html }} />
}
