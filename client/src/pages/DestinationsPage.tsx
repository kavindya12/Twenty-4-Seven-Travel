import { MotionConfig } from "motion/react"
import { Link } from "react-router-dom"
import { BlurFade } from "../components/magic/BlurFade"
import { PageHero } from "../components/PageHero"
import { destinations, formatPrice, getPackagesByDestination } from "../data/trips"
import { tripDetailPath } from "../lib/tripPaths"
import { evoqueImages } from "../lib/evoqueAssets"

export function DestinationsPage() {
  return (
    <MotionConfig reducedMotion="user">
      <PageHero
        scriptEyebrow
        eyebrow="Where we plan"
        title="Featured destinations"
        description="A short list on purpose. Each place has at least one tour you can ask an agent to adjust."
        image={evoqueImages.outboundFeature}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
        <div className="space-y-8">
          {destinations.map((destination, index) => {
            const trips = getPackagesByDestination(destination.id)
            return (
              <BlurFade key={destination.id} inView delay={0.06 * (index % 4)}>
                <article className="surface-card group grid overflow-hidden transition duration-300 hover:-translate-y-0.5 md:grid-cols-2">
                  <img
                    src={destination.image}
                    alt=""
                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-[1.02] md:h-full md:min-h-[20rem]"
                  />
                  <div className="p-6 sm:p-8">
                    <p className="font-script text-2xl text-[#3E97B3]">{destination.region}</p>
                    <h2 className="mt-1 font-display text-3xl sm:text-4xl">{destination.name}</h2>
                    <p className="mt-3 text-mist">{destination.summary}</p>
                    <p className="mt-3 leading-7 text-ink/85">{destination.details}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {destination.places.map((place) => (
                        <li key={place} className="rounded-full bg-cream px-3 py-1 text-sm text-ink">
                          {place}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm leading-6 text-mist">
                      <span className="font-medium text-ink">Best time. </span>
                      {destination.bestTime}
                    </p>
                    <ul className="mt-5 space-y-2 border-t border-ink/8 pt-4">
                      {trips.map((trip) => (
                        <li key={trip.id} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <Link to={tripDetailPath(trip)} className="font-medium text-teal hover:underline">
                            {trip.title}
                          </Link>
                          <span className="text-sm text-mist">
                            {trip.duration} · {formatPrice(trip.price)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </BlurFade>
            )
          })}
        </div>
      </div>
    </MotionConfig>
  )
}
