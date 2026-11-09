type SpacedTitleProps = {
  children: string
  className?: string
  as?: "h1" | "h2" | "h3"
  light?: boolean
}

export function SpacedTitle({ children, className = "", as: Tag = "h2", light }: SpacedTitleProps) {
  return (
    <Tag
      className={`spaced-title font-display text-3xl leading-tight sm:text-4xl lg:text-5xl ${
        light ? "text-cream" : "text-ink"
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
