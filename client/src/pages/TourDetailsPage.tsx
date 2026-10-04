import { Check } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ContactAgentModal } from "../components/ContactAgentModal"
import { formatPrice, getPackage } from "../data/trips"
import { BOOKING_MESSAGE } from "../lib/enquirySchema"

export function TourDetailsPage() {
  const { id } = useParams()
  const trip = id ? getPackage(id) : undefined
  const [intent, setIntent] = useState<"book" | null>(null)

  if (!trip) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-5">
        <h1 className="font-display text-4xl">Tour not found</h1>
        <Link to="/tours" className="mt-4 inline-flex font-semibold text-teal underline">
          Back to tours
        </Link>
      </div>
    )
  }

  const gallery = (
    <div className="grid gap-3">
      {trip.photos.map((photo) => (
        <img key={photo.src} src={photo.src} alt={photo.alt} className="h-56 w-full rounded-3xl object-cover sm:h-72" />
      ))}
    </div>
  )

  return (
    <article>
      <img src={trip.image} alt="" className="h-72 w-full object-cover sm:h-[28rem]" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-5 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-terracotta uppercase">
            {trip.destination} · {trip.type}
          </p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">{trip.title}</h1>
          <p className="mt-3 text-mist">
            {trip.duration} / {trip.nights}
          </p>
          <p className="mt-2 font-display text-4xl">{formatPrice(trip.price)}</p>
        </div>
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">{gallery}</div>
        <div>
          <p className="text-lg leading-8">{trip.description}</p>
          <h2 className="mt-10 font-display text-3xl">Included stops</h2>
          <ul className="mt-4 space-y-2">
            {trip.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-2">
                <Check className="text-teal" size={18} />
                {highlight}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="w-full rounded-full bg-terracotta px-5 py-3 font-semibold text-cream hover:bg-sand hover:text-ink sm:w-auto"
              onClick={() => setIntent("book")}
            >
              Book now
            </button>
          </div>
        </div>
      </div>
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
