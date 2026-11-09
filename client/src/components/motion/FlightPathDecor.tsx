type FlightPathDecorProps = {
  className?: string
  variant?: "light" | "dark"
}

export function FlightPathDecor({ className = "", variant = "dark" }: FlightPathDecorProps) {
  const stroke = variant === "dark" ? "rgba(244, 239, 230, 0.35)" : "rgba(20, 24, 28, 0.18)"
  const plane = variant === "dark" ? "#e7b15a" : "#1b4338"

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <path
        id="flight-path-home"
        d="M80 320 C 280 280, 420 120, 620 140 S 980 60, 1100 80"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeDasharray="6 10"
        className="flight-path-draw"
      />
      <path
        d="M920 360 A 180 180 0 0 1 920 40"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeDasharray="6 10"
        className="flight-path-draw flight-path-draw-delay"
      />
      <g className="flight-plane">
        <path
          d="M0 0 L14 -4 L0 -8 L4 -4 Z"
          fill={plane}
          transform="translate(-7,-4)"
        />
        <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
          <mpath href="#flight-path-home" />
        </animateMotion>
      </g>
    </svg>
  )
}
