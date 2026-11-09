import { useEffect, useMemo, useRef, useState } from "react"
import { useInView, useSpring, useTransform, motion } from "motion/react"

type AnimatedCounterProps = {
  value: string
  className?: string
}

function parseNumericPart(value: string): { prefix: string; number: number; suffix: string } | null {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return null
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] }
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: "-40px" })
  const parsed = useMemo(() => parseNumericPart(value), [value])
  const [display, setDisplay] = useState(value)

  const spring = useSpring(0, { stiffness: 70, damping: 18, mass: 0.8 })
  const rounded = useTransform(spring, (latest) => Math.round(latest))

  useEffect(() => {
    if (!parsed || !seen) return
    spring.set(parsed.number)
    const unsub = rounded.on("change", (latest) => {
      setDisplay(`${parsed.prefix}${latest}${parsed.suffix}`)
    })
    return () => unsub()
  }, [parsed, rounded, seen, spring])

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  return (
    <motion.span ref={ref} className={className}>
      {seen ? display : value}
    </motion.span>
  )
}
