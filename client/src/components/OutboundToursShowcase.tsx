import { Link } from "react-router-dom"
import { tripDetailPath } from "../lib/tripPaths"
import { BlurFade } from "./magic/BlurFade"
import { CinematicVideo } from "./motion/CinematicVideo"
import { FlightPathDecor } from "./motion/FlightPathDecor"
import { SectionHeading } from "./SectionHeading"
import { formatPrice, type TravelPackage } from "../data/trips"
import { siteMedia } from "../lib/mediaAssets"

function RecommendedTripRow({ trip, thumb }: { trip: TravelPackage; thumb: string }) {
  return (
    <Link
      to={tripDetailPath(trip)}
      className="group flex items-center gap-4 border-b border-dotted border-ink/10 py-5 transition hover:translate-x-0.5 last:border-0"
    >
      <img
        src={thumb}
        alt=""
        className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-md transition duration-500 group-hover:scale-105"
      />
      <div className="min-w-0 flex-1">
        <p className="font-display text-xl text-ink group-hover:text-teal sm:text-2xl">{trip.title}</p>
        <p className="mt-1 text-sm text-mist">
          {trip.destination} · from {formatPrice(trip.price)}
        </p>
      </div>
      <span className="hidden text-teal sm:inline" aria-hidden>
        →
      </span>
    </Link>
  )
}

type OutboundToursShowcaseProps = {
  trips: TravelPackage[]
  showHeading?: boolean
  className?: string
}

export function OutboundToursShowcase({ trips, showHeading = true, className = "" }: OutboundToursShowcaseProps) {
  const recommended = trips

  return (
    <section className={`relative overflow-hidden bg-cream py-16 sm:py-20 ${className}`}>
      <FlightPathDecor variant="light" className="opacity-80" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-5">
        {showHeading ? (
          <SectionHeading
            scriptEyebrow
            eyebrow="Recommended Trips For Your"
            title="Outbound tours to start from"
            description="All featured international packages — tap a trip for itinerary and enquiry."
            action={
              <Link to="/tours/outbound" className="text-sm font-semibold text-teal hover:text-terracotta">
                View all tours →
              </Link>
            }
          />
        ) : null}
        <div
          className={`grid gap-8 lg:grid-cols-2 lg:items-stretch lg:min-h-[30rem] ${showHeading ? "mt-10" : ""}`}
        >
          <BlurFade inView className="flex h-full min-h-[22rem] lg:min-h-0">
            <CinematicVideo
              className="h-full min-h-[22rem] lg:min-h-[30rem]"
              src={siteMedia.outboundToursVideo}
              poster={siteMedia.outboundToursPoster}
              label="Outbound tours"
            />
          </BlurFade>
          <BlurFade inView delay={0.08} className="flex h-full min-h-[22rem] lg:min-h-0">
            <div className="surface-card flex h-full min-h-[22rem] w-full flex-col p-6 sm:p-8 lg:min-h-[30rem] lg:p-10">
              <h3 className="shrink-0 font-display text-2xl text-ink sm:text-3xl">Recommended trips</h3>
              <div className="modal-scroll mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
                {recommended.map((trip) => (
                  <RecommendedTripRow key={trip.id} trip={trip} thumb={trip.image} />
                ))}
              </div>
              <Link to="/tours/outbound" className="btn-primary mt-6 inline-flex shrink-0 self-start">
                Browse all tours
              </Link>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
