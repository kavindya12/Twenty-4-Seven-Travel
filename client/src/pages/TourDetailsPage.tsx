import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, type ReactNode } from "react"
import { Link, useParams } from "react-router-dom"
import { BlurFade } from "../components/magic/BlurFade"
import { ContactAgentModal } from "../components/ContactAgentModal"
import { TourCard } from "../components/TourCard"
import { formatPrice, getOutboundPackages, getPackage, getPackageBySlug, type TravelPackage } from "../data/trips"
import { BOOKING_MESSAGE } from "../lib/enquirySchema"

const tabs = ["Overview", "Itinerary", "Cost", "FAQs"] as const

export function TourDetailsPage() {
  const { slug, id } = useParams()
  const key = slug ?? id ?? ""
  const trip = getPackageBySlug(key) ?? getPackage(key)
  const [intent, setIntent] = useState<"book" | null>(null)
  const [slide, setSlide] = useState(0)
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview")

  if (!trip) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-5">
        <h1 className="font-display text-4xl">Tour not found</h1>
        <Link to="/tours/outbound" className="mt-4 inline-flex font-semibold text-accent underline">
          Back to tours
        </Link>
      </div>
    )
  }

  const slides = [trip.image, ...trip.photos.map((photo) => photo.src)]
  const related = getOutboundPackages()
    .filter((item) => item.id !== trip.id)
    .slice(0, 3)

  return (
    <article className="bg-cream">
      <div className="border-b border-ink/8 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 text-sm text-mist sm:px-5">
          <Link to="/" className="hover:text-accent">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link to="/tours/outbound" className="hover:text-accent">
            Outbound tours
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{trip.title}</span>
        </div>
      </div>

      <TourGallery
        slides={slides}
        slide={slide}
        onPrev={() => setSlide((value) => (value - 1 + slides.length) % slides.length)}
        onNext={() => setSlide((value) => (value + 1) % slides.length)}
        title={trip.title}
        destination={trip.destination}
        meta={`${trip.duration} · ${trip.nights} · from ${formatPrice(trip.price)}`}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-5 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div>
          <TabBar tab={tab} onChange={setTab} />
          <TabPanels tab={tab} trip={trip} />
        </div>

        <aside className="surface-card sticky top-24 space-y-4 p-6 lg:top-28">
          <p className="font-script text-2xl text-accent">{trip.destination}</p>
          <h2 className="font-display text-2xl text-ink">{trip.title}</h2>
          <p className="text-sm text-mist">
            {trip.duration} · {trip.nights}
          </p>
          <p className="font-display text-3xl text-accent">{formatPrice(trip.price)}</p>
          <p className="text-xs text-mist">Starting price per person. Agent confirms final quote.</p>
          <button type="button" className="btn-primary w-full" onClick={() => setIntent("book")}>
            Send enquiry
          </button>
          <Link
            to="/contact"
            className="block w-full rounded-full border border-ink/15 bg-white px-5 py-3 text-center text-sm font-semibold text-ink"
          >
            Contact the desk
          </Link>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-ink/8 bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-5">
            <p className="font-script text-3xl text-accent">Featured trips</p>
            <h2 className="mt-2 font-display text-3xl text-ink">Related trips you might be interested in</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <BlurFade key={item.id} inView delay={0.05 * index}>
                  <TourCard trip={item} />
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactAgentModal
        key={intent ?? "closed"}
        packageId={trip.id}
        packageName={trip.title}
        defaultDestination={trip.destination}
        defaultMessage={BOOKING_MESSAGE}
        open={intent !== null}
        onClose={() => setIntent(null)}
      />
    </article>
  )
}

function TourGallery({
  slides,
  slide,
  onPrev,
  onNext,
  title,
  destination,
  meta,
}: {
  slides: string[]
  slide: number
  onPrev: () => void
  onNext: () => void
  title: string
  destination: string
  meta: string
}) {
  return (
    <div className="relative bg-ink">
      <img src={slides[slide]} alt="" className="h-[min(70vh,32rem)] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/20" />
      <div className="absolute top-4 right-4 rounded-lg bg-ink/50 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur-sm">
        {slide + 1} / {slides.length}
      </div>
      <div className="absolute right-4 bottom-6 hidden gap-2 sm:flex">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={onPrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 bg-ink/40 text-cream backdrop-blur-sm hover:bg-ink/60"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={onNext}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 bg-ink/40 text-cream backdrop-blur-sm hover:bg-ink/60"
        >
          <ChevronRight size={22} />
        </button>
      </div>
      <div className="absolute right-4 bottom-6 left-4 mx-auto max-w-6xl sm:px-1">
        <p className="font-script text-2xl text-accent-light sm:text-3xl">{destination}</p>
        <h1 className="font-display text-3xl text-cream sm:text-5xl">{title}</h1>
        <p className="mt-2 text-sm text-cream/85 sm:text-base">{meta}</p>
      </div>
    </div>
  )
}

function TabBar({
  tab,
  onChange,
}: {
  tab: (typeof tabs)[number]
  onChange: (value: (typeof tabs)[number]) => void
}) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-ink/10">
      {tabs.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`border-b-2 px-4 py-3 text-sm font-semibold transition ${
            tab === item ? "border-accent text-accent" : "border-transparent text-mist hover:text-ink"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

function TabPanels({ tab, trip }: { tab: (typeof tabs)[number]; trip: TravelPackage }) {
  if (tab === "Overview") {
    return (
      <Panel className="mt-6 space-y-6">
        <p className="text-lg leading-8 text-ink/90">{trip.description}</p>
        <div>
          <h2 className="font-display text-2xl text-ink">Top highlights</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {trip.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2 text-sm text-mist">
                <span className="text-accent" aria-hidden>
                  •
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    )
  }

  if (tab === "Itinerary") {
    return (
      <Panel className="mt-6 space-y-3">
        {trip.highlights.map((stop, index) => (
          <details key={stop} className="surface-card group p-4" open={index === 0}>
            <summary className="cursor-pointer list-none font-display text-lg text-ink">
              Day {index + 1} — {stop}
            </summary>
            <p className="mt-2 text-sm leading-7 text-mist">
              Agent builds exact timing around your group. This stop is included in the starting route for {trip.title}.
            </p>
          </details>
        ))}
      </Panel>
    )
  }

  if (tab === "Cost") {
    return (
      <Panel className="mt-6 space-y-4">
        <p className="text-lg leading-8 text-ink/90">
          From <span className="font-display text-2xl text-accent">{formatPrice(trip.price)}</span> per person as a
          starting figure. Flights, hotels, and season change the total — the desk quotes after checking dates.
        </p>
        <ul className="space-y-2 text-sm text-mist">
          <li>• Transparent breakdown before you confirm</li>
          <li>• No automatic checkout — human review on every enquiry</li>
          <li>• Optional extras quoted separately</li>
        </ul>
      </Panel>
    )
  }

  return (
    <Panel className="mt-6 space-y-3">
      <details className="surface-card p-4" open>
        <summary className="cursor-pointer font-display text-lg text-ink">How do I book this tour?</summary>
        <p className="mt-2 text-sm leading-7 text-mist">
          Send an enquiry with dates and travelers. An agent replies with availability and price.
        </p>
      </details>
      <details className="surface-card p-4">
        <summary className="cursor-pointer font-display text-lg text-ink">Is the price final?</summary>
        <p className="mt-2 text-sm leading-7 text-mist">
          Website prices are starting points. Your quote reflects hotels, flights, and group size.
        </p>
      </details>
    </Panel>
  )
}

function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={className}>{children}</div>
}
