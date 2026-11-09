import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

type Review = {
  quote: string
  name: string
  place: string
}

export function TestimonialsCarousel({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: -1 | 1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-card]")
    const step = card ? card.offsetWidth + 16 : 320
    el.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  return (
    <div className="relative mt-10">
      <div className="pointer-events-none absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 sm:block">
        <button
          type="button"
          aria-label="Previous review"
          onClick={() => scroll(-1)}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink shadow-md hover:border-teal/30"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      <div className="pointer-events-none absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 sm:block">
        <button
          type="button"
          aria-label="Next review"
          onClick={() => scroll(1)}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink shadow-md hover:border-teal/30"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <aside className="surface-card hidden w-52 shrink-0 snap-start flex-col justify-center p-6 lg:flex">
          <p className="text-lg font-bold tracking-wide text-ink">EXCELLENT</p>
          <p className="mt-2 text-amber-500" aria-hidden>
            ★★★★★
          </p>
          <p className="mt-2 text-sm text-mist">Stories from travelers who planned with our desk.</p>
        </aside>
        {reviews.map((review) => (
          <blockquote
            key={review.name}
            data-card
            className="surface-card w-[min(100%,22rem)] shrink-0 snap-start p-6 sm:w-80"
          >
            <p className="text-amber-500 text-sm" aria-hidden>
              ★★★★★
            </p>
            <p className="mt-3 text-sm leading-7 text-mist">“{review.quote}”</p>
            <footer className="mt-4 text-sm font-semibold text-ink">
              {review.name}
              <span className="mt-0.5 block text-xs font-normal text-mist">{review.place}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  )
}
