import { Link } from "react-router-dom"
import { destinations, getPackagesByDestination } from "../data/trips"

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
                <ul className="mt-5 space-y-2">
                  {trips.map((trip) => (
                    <li key={trip.id}>
                      <Link to={`/tours/${trip.id}`} className="font-medium text-teal hover:underline">
                        {trip.title}
                      </Link>
                      <span className="text-sm text-mist"> · {trip.duration}</span>
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
