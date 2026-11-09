import { useEffect, useState } from "react"

const STORAGE_KEY = "247travel-loader-seen"

type PageLoaderProps = {
  onComplete: () => void
  variant?: "intro" | "route"
}

export function PageLoader({ onComplete, variant = "intro" }: PageLoaderProps) {
  const [phase, setPhase] = useState<"enter" | "exit">("enter")

  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden")
    const revealMs = variant === "route" ? 700 : 2400
    const totalMs = variant === "route" ? 1100 : 3200

    const revealEnd = window.setTimeout(() => setPhase("exit"), revealMs)
    const done = window.setTimeout(() => {
      if (variant === "intro") sessionStorage.setItem(STORAGE_KEY, "1")
      document.documentElement.classList.remove("overflow-hidden")
      onComplete()
    }, totalMs)

    return () => {
      clearTimeout(revealEnd)
      clearTimeout(done)
      document.documentElement.classList.remove("overflow-hidden")
    }
  }, [onComplete, variant])

  return (
    <div
      className={`loader-screen fixed inset-0 z-[100] flex items-center justify-center bg-white transition-all duration-700 ${
        phase === "exit" ? "pointer-events-none scale-[1.02] opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading Twenty 4 Seven Travel"
    >
      <div className="px-6 text-center">
        <p className="font-display text-[clamp(2rem,7vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-ink/15">
          <span className="loader-brand-fill block text-accent">Twenty 4 Seven</span>
          <span className="loader-brand-fill loader-brand-fill-delay block text-accent">Travel</span>
        </p>
        <div className="loader-progress-track mx-auto mt-8 h-0.5 w-[min(16rem,70vw)] overflow-hidden rounded-full bg-accent/15">
          <div className="loader-progress-bar h-full rounded-full bg-accent" />
        </div>
      </div>
    </div>
  )
}

export function shouldShowPageLoader(): boolean {
  if (typeof window === "undefined") return false
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false
  return !sessionStorage.getItem(STORAGE_KEY)
}
