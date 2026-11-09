import { Link } from "react-router-dom"
import { getOutboundPackages } from "../data/trips"
import { BlurFade } from "./magic/BlurFade"
import { SpacedTitle } from "./SpacedTitle"
import { TourCard } from "./TourCard"

type RecommendedTripsSectionProps = {
  trips?: ReturnType<typeof getOutboundPackages>
}

export function RecommendedTripsSection({ trips = getOutboundPackages() }: RecommendedTripsSectionProps) {
  return (
    <section className="bg-cream py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="font-script text-center text-3xl text-accent sm:text-4xl">Best Tours</p>
        <SpacedTitle className="mx-auto mt-2 max-w-3xl text-center text-2xl sm:text-3xl lg:text-4xl">
          Recommended Trips For Your
        </SpacedTitle>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip, index) => (
            <BlurFade key={trip.id} inView delay={0.04 * (index % 6)}>
              <TourCard trip={trip} />
            </BlurFade>
          ))}
        </div>
        <p className="mt-12 text-center">
          <Link to="/tours/outbound" className="text-sm font-semibold text-accent hover:text-accent-dark">
            View all outbound tours →
          </Link>
        </p>
      </div>
    </section>
  )
}
