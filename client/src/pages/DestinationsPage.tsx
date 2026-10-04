import { Link } from "react-router-dom"
import { destinations, formatPrice, getPackagesByDestination } from "../data/trips"

export function DestinationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14">
      <p className="text-xs font-semibold tracking-[0.18em] text-terracotta uppercase">Where we plan</p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">Destinations</h1>
      <p className="mt-4 max-w-2xl text-mist">
        A short list on purpose. Each place has at least one tour you can ask an agent to adjust.
      </p>
      <div className="mt-10 space-y-6">
        {destinations.map((destination) => {
          const trips = getPackagesByDestination(destination.id)
          return (
            <article key={destination.id} className="grid overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10 md:grid-cols-2">
              <img src={destination.image} alt="" className="h-56 w-full object-cover md:h-full" />
              <div className="p-5 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.16em] text-sand uppercase">{destination.region}</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl">{destination.name}</h2>
                <p className="mt-3 text-mist">{destination.summary}</p>
                <p className="mt-3 leading-7 text-ink/80">{destination.details}</p>
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
                <ul className="mt-5 space-y-2 border-t border-ink/10 pt-4">
                  {trips.map((trip) => (
                    <li key={trip.id} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <Link to={`/tours/${trip.id}`} className="font-medium text-teal hover:underline">
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
          )
        })}
      </div>
    </div>
  )
}
