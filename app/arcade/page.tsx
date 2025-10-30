"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"

type Vector = { x: number; y: number }

export default function ArcadePage() {
  const { language } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const playerRef = useRef<Vector>({ x: 200, y: 200 })
  const targetsRef = useRef<Array<{ pos: Vector; vel: Vector; r: number }>>([])
  const rafRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1))
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.floor(rect.width * DPR)
      canvas.height = Math.floor(rect.height * DPR)
      ctx.scale(DPR, DPR)
    }
    resize()
    window.addEventListener("resize", resize)

    // init targets ("ideas")
    const random = (min: number, max: number) => Math.random() * (max - min) + min
    targetsRef.current = Array.from({ length: 7 }).map(() => ({
      pos: { x: random(40, canvas.clientWidth - 40), y: random(40, canvas.clientHeight - 40) },
      vel: { x: random(-1.2, 1.2), y: random(-1.2, 1.2) },
      r: random(10, 18),
    }))

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      playerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener("pointermove", onMove)

    const loop = () => {
      if (!isPlaying) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      // draw background grid
      ctx.fillStyle = "#f8fafc"
      ctx.fillRect(0, 0, w, h)
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 1
      for (let x = 0; x < w; x += 24) {
        ctx.beginPath()
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += 24) {
        ctx.beginPath()
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(w, y + 0.5)
        ctx.stroke()
      }

      // draw targets (ideas as lightbulbs)
      targetsRef.current.forEach((t) => {
        t.pos.x += t.vel.x
        t.pos.y += t.vel.y
        if (t.pos.x < t.r || t.pos.x > w - t.r) t.vel.x *= -1
        if (t.pos.y < t.r || t.pos.y > h - t.r) t.vel.y *= -1

        // lightbulb body
        ctx.beginPath()
        ctx.fillStyle = "#f59e0b"
        ctx.arc(t.pos.x, t.pos.y, t.r, 0, Math.PI * 2)
        ctx.fill()
        // base
        ctx.fillStyle = "#334155"
        ctx.fillRect(t.pos.x - t.r * 0.35, t.pos.y + t.r * 0.4, t.r * 0.7, t.r * 0.6)
      })

      // draw player (Luxdada orb)
      const p = playerRef.current
      ctx.beginPath()
      ctx.fillStyle = "#293e72"
      ctx.arc(p.x, p.y, 16, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.fillStyle = "#93c5fd"
      ctx.arc(p.x - 5, p.y - 6, 5, 0, Math.PI * 2)
      ctx.fill()

      // collision
      for (let i = targetsRef.current.length - 1; i >= 0; i--) {
        const t = targetsRef.current[i]
        const dx = t.pos.x - p.x
        const dy = t.pos.y - p.y
        const d2 = dx * dx + dy * dy
        const rr = (t.r + 16) * (t.r + 16)
        if (d2 <= rr) {
          targetsRef.current.splice(i, 1)
          setScore((s) => s + 1)
          // respawn a new target
          targetsRef.current.push({
            pos: { x: random(40, w - 40), y: random(40, h - 40) },
            vel: { x: random(-1.4, 1.4), y: random(-1.4, 1.4) },
            r: random(10, 18),
          })
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    // countdown timer
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        const next = t - 1
        if (next <= 0) {
          setIsPlaying(false)
        }
        return next
      })
    }, 1000)

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("pointermove", onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reset = () => {
    setScore(0)
    setTimeLeft(30)
    setIsPlaying(true)
    setStatus(null)
  }

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      const fd = new FormData()
      fd.append("email", email)
      fd.append("source", "arcade")
      const res = await fetch("/api/game-subscribe", { method: "POST", body: fd })
      const json = await res.json()
      if (json.success) {
        setStatus(
          language === "it"
            ? "Grazie! Riceverai 30 minuti di consulenza gratuita da Luxdada. Ti contatteremo a breve."
            : "Thanks! You’ll receive 30 minutes of free consulting from Luxdada. We’ll reach out shortly."
        )
      } else {
        setStatus(
          language === "it"
            ? "Si è verificato un problema. Riprova più tardi."
            : "Something went wrong. Please try again later."
        )
      }
    } catch {
      setStatus(
        language === "it"
          ? "Si è verificato un problema. Riprova più tardi."
          : "Something went wrong. Please try again later."
      )
    }
  }

  const headline = language === "it" ? "Luxdada Idea Hunt" : "Luxdada Idea Hunt"
  const sub =
    language === "it"
      ? "Muovi il cursore per catturare più lampadine possibili in 30 secondi."
      : "Move your cursor to catch as many lightbulbs as you can in 30 seconds."
  const cta = language === "it" ? "Rigioca" : "Play again"
  const emailPrompt =
    language === "it"
      ? "Inserisci la tua email per essere ricontattato/a:"
      : "Enter your email to be contacted:"

  return (
    <div className="min-h-screen pt-28 pb-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#293e72]">{headline}</h1>
          <p className="text-slate-600 mt-2">{sub}</p>
        </div>
        <div className="w-full aspect-[3/2] rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
          <canvas ref={canvasRef} className="w-full h-full touch-none" />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-slate-700">
            <span className="font-semibold">{language === "it" ? "Punteggio" : "Score"}:</span> {score}
          </div>
          <div className="text-slate-700">
            <span className="font-semibold">{language === "it" ? "Tempo" : "Time"}:</span> {Math.max(timeLeft, 0)}s
          </div>
          {!isPlaying && (
            <button
              className="px-4 py-2 rounded-md bg-[#293e72] text-white hover:bg-[#1e2e57]"
              onClick={reset}
            >
              {cta}
            </button>
          )}
        </div>

        {!isPlaying && (
          <div className="mt-8 p-4 rounded-lg border border-slate-200 bg-slate-50">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              {language === "it" ? "Hai finito!" : "You’re done!"}
            </h2>
            <p className="text-slate-600 mb-4">
              {language === "it"
                ? "Ottimo lavoro cacciatore di idee."
                : "Nice work, idea hunter."}
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={submitEmail}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === "it" ? "tua@email.com" : "your@email.com"}
                className="flex-1 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#293e72]"
                aria-label={emailPrompt}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-[#293e72] text-white hover:bg-[#1e2e57] whitespace-nowrap"
              >
                {language === "it" ? "Invia" : "Submit"}
              </button>
            </form>
            {status && (
              <p className="mt-3 text-sm text-slate-700">{status}</p>
            )}
            {!status && (
              <p className="mt-3 text-sm text-slate-500">{emailPrompt}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}


