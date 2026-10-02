import { Link } from "react-router-dom"
import { formatPrice, type TravelPackage } from "../data/trips"

export function TourCard({ trip }: { trip: TravelPackage }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ink/10">
      <Link to={`/tours/${trip.id}`} className="block overflow-hidden">
        <img
          src={trip.image}
          alt=""
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
        />
      </Link>
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold tracking-[0.14em] uppercase">
          <span className="text-terracotta">{trip.destination}</span>
          <span className="text-mist">{trip.type}</span>
        </div>
        <h3 className="font-display text-2xl leading-tight">
          <Link to={`/tours/${trip.id}`} className="hover:text-teal">
            {trip.title}
          </Link>
        </h3>
        <p className="text-sm text-mist">
          {trip.duration} · {trip.nights}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <p className="font-display text-2xl">{formatPrice(trip.price)}</p>
          <Link
            to={`/tours/${trip.id}`}
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream hover:bg-teal"
          >
            View tour
          </Link>
        </div>
      </div>
    </article>
  )
}
