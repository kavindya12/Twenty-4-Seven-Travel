import { TourCard } from "../components/TourCard"
import { packages } from "../data/trips"

export function ToursPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14">
      <p className="text-xs font-semibold tracking-[0.18em] text-terracotta uppercase">Trips</p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">Tours</h1>
      <p className="mt-4 max-w-2xl text-mist">
        Prices are starting points per person. Open a tour to ask about dates, hotels, and your group.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((trip) => (
          <TourCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}
