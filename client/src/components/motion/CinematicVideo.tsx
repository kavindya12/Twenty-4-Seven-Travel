import { Volume2, VolumeX } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"

type CinematicVideoProps = {
  src: string
  poster: string
  className?: string
  label?: string
}

export function CinematicVideo({ src, poster, className = "", label = "Outbound tours" }: CinematicVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(containerRef, { amount: 0.35, margin: "0px 0px -10% 0px" })
  const [muted, setMuted] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduceMotion) return
    if (inView) {
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [inView, reduceMotion])

  return (
    <div
      ref={containerRef}
      className={`group relative min-h-[22rem] overflow-hidden rounded-[1.25rem] bg-ink shadow-xl shadow-ink/10 sm:min-h-[26rem] ${className}`}
    >
      {reduceMotion ? (
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-ink/5" />
      <button
        type="button"
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-md transition hover:bg-white"
        aria-label={muted ? "Unmute video" : "Mute video"}
        onClick={() => setMuted((value) => !value)}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  )
}
