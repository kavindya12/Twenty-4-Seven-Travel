import { CalendarDays, Moon } from "lucide-react"
import { Link } from "react-router-dom"
import { formatStartingPrice, type TravelPackage } from "../data/trips"
import { tripDetailPath } from "../lib/tripPaths"

export function TourCard({ trip }: { trip: TravelPackage }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_10px_36px_rgba(18,22,25,0.08)] ring-1 ring-ink/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(18,22,25,0.12)]">
      <Link to={tripDetailPath(trip)} className="relative block overflow-hidden">
        <img
          src={trip.image}
          alt=""
          className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <h3 className="font-display text-xl leading-snug text-ink sm:text-2xl">
          <Link to={tripDetailPath(trip)} className="transition hover:text-accent-dark">
            {trip.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed">
          <span className="text-mist">Location</span>{" "}
          <span className="font-semibold text-ink">{trip.destination}</span>
        </p>

        <div className="mt-4 border-t border-dotted border-ink/12 pt-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
            <li className="inline-flex items-center gap-2">
              <CalendarDays size={15} className="text-accent/70" aria-hidden />
              {trip.duration}
            </li>
            <li className="inline-flex items-center gap-2">
              <Moon size={15} className="text-accent/70" aria-hidden />
              {trip.nights}
            </li>
          </ul>
        </div>

        <div className="mt-auto border-t border-dotted border-ink/12 pt-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium tracking-[0.1em] text-mist uppercase">Starting From</p>
              <p className="mt-1 font-sans text-lg font-bold text-ink sm:text-xl">{formatStartingPrice(trip.price)}</p>
            </div>
            <Link
              to={tripDetailPath(trip)}
              className="shrink-0 rounded-full bg-[#e9edf0] px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#dfe4e8]"
            >
              View Tour
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
