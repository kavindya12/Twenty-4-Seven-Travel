type TornEdgeProps = {
  flip?: boolean
  className?: string
  fill?: string
}

export function TornEdge({ flip = false, className = "", fill = "#14181c" }: TornEdgeProps) {
  return (
    <svg
      className={`block w-full ${flip ? "rotate-180" : ""} ${className}`}
      viewBox="0 0 1200 48"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill={fill}
        d="M0,0 L0,18 L40,22 L85,14 L130,24 L175,12 L220,26 L265,16 L310,28 L355,18 L400,30 L445,20 L490,32 L535,22 L580,34 L625,24 L670,36 L715,26 L760,38 L805,28 L850,40 L895,30 L940,42 L985,32 L1030,44 L1075,34 L1120,46 L1200,38 L1200,0 Z"
      />
    </svg>
  )
}
