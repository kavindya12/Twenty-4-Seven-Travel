import type { TravelPackage } from "../data/trips"

export function tripDetailPath(trip: Pick<TravelPackage, "slug" | "id">) {
  return `/trip/${trip.slug || trip.id}`
}
