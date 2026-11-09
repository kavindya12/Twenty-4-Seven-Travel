import type { ReactNode } from "react"

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
  light?: boolean
  scriptEyebrow?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  light,
  scriptEyebrow,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p
          className={
            scriptEyebrow
              ? `font-script text-2xl sm:text-3xl ${light ? "text-sand" : "text-accent"}`
              : `text-xs font-semibold tracking-[0.2em] uppercase ${light ? "text-sand" : "text-accent"}`
          }
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-2 font-display text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${
            light ? "text-cream" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p className={`mt-3 text-base leading-7 ${light ? "text-cream/75" : "text-mist"}`}>{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
