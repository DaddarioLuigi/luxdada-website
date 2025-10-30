"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"

type Vector = { x: number; y: number }

function IdeaHuntGame() {
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
  const audioCtxRef = useRef<AudioContext | null>(null)
  const audioUnlockedRef = useRef(false)

  function ensureAudio() {
    if (typeof window === 'undefined') return
    const AC: any = (window as any).AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    if (!audioCtxRef.current) audioCtxRef.current = new AC()
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume()
    audioUnlockedRef.current = true
  }

  function playCatchSound() {
    if (!audioUnlockedRef.current) return
    const ctx = audioCtxRef.current
    if (!ctx) return
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(420, now)
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.09)
    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
    osc.connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.14)
  }

  function playEndSound() {
    if (!audioUnlockedRef.current) return
    const ctx = audioCtxRef.current
    if (!ctx) return
    const now = ctx.currentTime
    const make = (f: number, t: number, d: number) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.setValueAtTime(f, now + t)
      g.gain.setValueAtTime(0.11, now + t)
      g.gain.exponentialRampToValueAtTime(0.0001, now + t + d)
      o.connect(g).connect(ctx.destination)
      o.start(now + t)
      o.stop(now + t + d + 0.02)
    }
    make(440, 0.00, 0.12)
    make(660, 0.10, 0.12)
    make(880, 0.20, 0.16)
  }

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
    const onDown = () => ensureAudio()
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerdown", onDown)

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
          playCatchSound()
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
          if (t > 0) {
            ensureAudio()
            playEndSound()
          }
          setIsPlaying(false)
          if (timerRef.current) {
            window.clearInterval(timerRef.current)
            timerRef.current = null
          }
          return 0
        }
        return next
      })
    }, 1000)

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerdown", onDown)
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

function DataDodgerGame() {
  const { language } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const playerRef = useRef<Vector>({ x: 220, y: 240 })
  const blocksRef = useRef<Array<{ x: number; y: number; w: number; h: number; vy: number }>>([])
  const rafRef = useRef<number | null>(null)
  const spawnRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)
  const holdingRef = useRef(false)

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

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      playerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onDown = () => { holdingRef.current = true }
    const onUp = () => { holdingRef.current = false }
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)

    const spawn = () => {
      if (!isPlaying) return
      const w = canvas.clientWidth
      const size = 16 + Math.random() * 22
      blocksRef.current.push({
        x: Math.random() * Math.max(0, w - size),
        y: -size,
        w: size,
        h: size,
        vy: 120 + Math.random() * 220,
      })
    }
    spawnRef.current = window.setInterval(spawn, 650)

    const loop = () => {
      if (!isPlaying) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "#f8fafc"
      ctx.fillRect(0, 0, w, h)

      // player
      const p = playerRef.current
      ctx.beginPath()
      ctx.fillStyle = "#293e72"
      ctx.arc(p.x, p.y, 16, 0, Math.PI * 2)
      ctx.fill()

      // blocks
      ctx.fillStyle = "#0ea5e9"
      for (let i = blocksRef.current.length - 1; i >= 0; i--) {
        const b = blocksRef.current[i]
        const speedFactor = holdingRef.current ? 0 : 1
        b.y += b.vy * (1 / 60) * speedFactor
        ctx.fillRect(b.x, b.y, b.w, b.h)

        // dodge scored
        if (b.y > h) {
          blocksRef.current.splice(i, 1)
          setScore((s) => s + 1)
          continue
        }
        // collision
        const dx = Math.max(b.x - p.x, 0, p.x - (b.x + b.w))
        const dy = Math.max(b.y - p.y, 0, p.y - (b.y + b.h))
        if (dx * dx + dy * dy <= 16 * 16) {
          // penalty on hit, remove block, continue playing
          blocksRef.current.splice(i, 1)
          setScore((s) => Math.max(0, s - 1))
          continue
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        const next = t - 1
        if (next <= 0) {
          setIsPlaying(false)
          if (timerRef.current) window.clearInterval(timerRef.current)
          return 0
        }
        return next
      })
    }, 1000)

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (spawnRef.current) window.clearInterval(spawnRef.current)
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const reset = () => {
    window.location.reload()
  }

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      const fd = new FormData()
      fd.append("email", email)
      fd.append("source", "arcade-dodger")
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

  return (
    <div className="min-h-screen pt-28 pb-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#293e72]">{language === 'it' ? 'Luxdada Data Dodger' : 'Luxdada Data Dodger'}</h1>
          <p className="text-slate-600 mt-2">
            {language === 'it' ? 'Evita i blocchi che cadono per 30s. Muovi il cursore per schivare. Tieni premuto per fermarli temporaneamente.' : 'Avoid falling blocks for 30s. Move your cursor to dodge. Hold to temporarily freeze them.'}
          </p>
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
            <button className="px-4 py-2 rounded-md bg-[#293e72] text-white hover:bg-[#1e2e57]" onClick={reset}>
              {language === 'it' ? 'Rigioca' : 'Play again'}
            </button>
          )}
        </div>

        {!isPlaying && (
          <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-5 shadow-xl">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                {language === "it" ? "Hai finito!" : "You’re done!"}
              </h2>
              <p className="text-slate-600 mb-4">
                {language === "it" ? "Bel lavoro schivatore di dati." : "Nice work, data dodger."}
              </p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={submitEmail}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === "it" ? "tua@email.com" : "your@email.com"}
                  className="flex-1 px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#293e72]"
                  aria-label={language === 'it' ? 'Inserisci la tua email per essere ricontattato/a:' : 'Enter your email to be contacted:'}
                />
                <button type="submit" className="px-4 py-2 rounded-md bg-[#293e72] text-white hover:bg-[#1e2e57] whitespace-nowrap">
                  {language === "it" ? "Invia" : "Submit"}
                </button>
              </form>
              {status && <p className="mt-3 text-sm text-slate-700">{status}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ArcadePage() {
  const { language } = useLanguage()
  const [game, setGame] = useState<"select" | "idea" | "dodger">("select")

  if (game === "idea") {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 pt-24">
          <button className="text-sm text-[#293e72] underline mb-4" onClick={() => setGame("select")}>
            {language === 'it' ? '← Torna alla selezione' : '← Back to selection'}
          </button>
        </div>
        <IdeaHuntGame />
      </div>
    )
  }

  if (game === "dodger") {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 pt-24">
          <button className="text-sm text-[#293e72] underline mb-4" onClick={() => setGame("select")}>
            {language === 'it' ? '← Torna alla selezione' : '← Back to selection'}
          </button>
        </div>
        <DataDodgerGame />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-[#293e72] mb-6">
          {language === 'it' ? 'Luxdada Arcade' : 'Luxdada Arcade'}
        </h1>
        <p className="text-slate-600 mb-8">
          {language === 'it' ? 'Scegli un gioco per iniziare. Al termine, inserisci la tua email per ricevere 30 minuti di consulenza gratuita.' : 'Choose a game to start. At the end, enter your email to receive 30 minutes of free consulting.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button onClick={() => setGame('idea')} className="text-left group border border-slate-200 rounded-xl p-5 hover:border-[#293e72] hover:shadow-md transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Luxdada Idea Hunt</h2>
              <span className="text-2xl">💡</span>
            </div>
            <p className="text-slate-600 mt-2">
              {language === 'it' ? 'Cattura quante più lampadine possibile in 30 secondi.' : 'Catch as many lightbulbs as you can in 30 seconds.'}
            </p>
            <span className="mt-3 inline-block text-sm text-[#293e72]">
              {language === 'it' ? 'Gioca ora →' : 'Play now →'}
            </span>
          </button>

          <button onClick={() => setGame('dodger')} className="text-left group border border-slate-200 rounded-xl p-5 hover:border-[#293e72] hover:shadow-md transition-colors">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">Luxdada Data Dodger</h2>
              <span className="text-2xl">🧊</span>
            </div>
            <p className="text-slate-600 mt-2">
              {language === 'it' ? 'Schiva i blocchi di dati che cadono e sopravvivi per 30 secondi.' : 'Dodge falling data blocks and survive for 30 seconds.'}
            </p>
            <span className="mt-3 inline-block text-sm text-[#293e72]">
              {language === 'it' ? 'Gioca ora →' : 'Play now →'}
            </span>
          </button>
        </div>
        <div className="mt-8 text-sm text-slate-500">
          <Link href="/" className="underline text-[#293e72]">{language === 'it' ? '← Torna alla home' : '← Back to home'}</Link>
        </div>
      </div>
    </div>
  )
}


