export type Destination = {
  id: string
  name: string
  region: string
  summary: string
  image: string
}

export type TourType = "Adventure" | "Seaside" | "Cruise" | "Self-guided"

export type TravelPackage = {
  id: string
  title: string
  destination: string
  destinationId: string
  duration: string
  nights: string
  price: number
  image: string
  description: string
  highlights: string[]
  type: TourType
  featured: boolean
}

export const destinations: Destination[] = [
  {
    id: "sri-lanka",
    name: "Sri Lanka",
    region: "Indian Ocean",
    summary: "Tea hills, slow trains, and a southern coast that still feels local.",
    image:
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "maldives",
    name: "Maldives",
    region: "Islands",
    summary: "Reef time and long lunches, without a packed island-hop.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "japan",
    name: "Japan",
    region: "East Asia",
    summary: "City nights, shrine paths, and trains that do the hard work.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "costa-rica",
    name: "Costa Rica",
    region: "Central America",
    summary: "Rainforest lodges and wildlife mornings, paced for first-timers.",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "iceland",
    name: "Iceland",
    region: "North Atlantic",
    summary: "Waterfalls, black sand, and one ring-road plan that actually fits.",
    image:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "italy",
    name: "Italy",
    region: "Mediterranean",
    summary: "A coastal week with fewer towns and better tables.",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80",
  },
]

export const tourTypes: { name: TourType; image: string; text: string }[] = [
  {
    name: "Self-guided",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80",
    text: "Routes, stays, and tickets arranged. You keep the days.",
  },
  {
    name: "Cruise",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=900&q=80",
    text: "Short sailings and coast hops, matched to your dates.",
  },
  {
    name: "Adventure",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    text: "Trails and long drives, with rest built in.",
  },
  {
    name: "Seaside",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    text: "Beaches and reef days when the point is to slow down.",
  },
]

export const packages: TravelPackage[] = [
  {
    id: "sri-lanka-hill-coast",
    title: "Hill Country & Coast",
    destination: "Sri Lanka",
    destinationId: "sri-lanka",
    duration: "7 Days",
    nights: "6 Nights",
    price: 890,
    image:
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1400&q=80",
    description:
      "A compact loop from the hill country to Galle, with the train ride kept and the sightseeing list trimmed.",
    highlights: ["Kandy", "Ella train", "Galle fort", "South coast stay"],
    type: "Adventure",
    featured: true,
  },
  {
    id: "maldives-reef-stay",
    title: "Reef Stay",
    destination: "Maldives",
    destinationId: "maldives",
    duration: "5 Days",
    nights: "4 Nights",
    price: 1480,
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80",
    description:
      "One island, a simple transfer, and time in the water. Built for a short break, not a resort circuit.",
    highlights: ["Speedboat transfer", "House reef", "Sandbank afternoon", "Sunset dhoni"],
    type: "Seaside",
    featured: true,
  },
  {
    id: "japan-rail-route",
    title: "Rail Route",
    destination: "Japan",
    destinationId: "japan",
    duration: "10 Days",
    nights: "9 Nights",
    price: 2140,
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
    description:
      "Tokyo, a night in the mountains, then Kyoto. Neighbourhood walks instead of a checklist of every shrine.",
    highlights: ["Tokyo", "Hakone", "Kyoto", "Nara half day"],
    type: "Self-guided",
    featured: true,
  },
  {
    id: "costa-rica-wildlife",
    title: "Wildlife Week",
    destination: "Costa Rica",
    destinationId: "costa-rica",
    duration: "6 Days",
    nights: "5 Nights",
    price: 1320,
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1400&q=80",
    description:
      "Cloud forest and a Pacific beach finish, with lodges that are easy to reach and guides who stay with the group.",
    highlights: ["Monteverde", "Night walk", "Manuel Antonio", "Shared guide"],
    type: "Adventure",
    featured: false,
  },
  {
    id: "iceland-south-coast",
    title: "South Coast",
    destination: "Iceland",
    destinationId: "iceland",
    duration: "8 Days",
    nights: "7 Nights",
    price: 1960,
    image:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1400&q=80",
    description:
      "Waterfalls, a glacier lagoon, and Reykjavík on either end. Driving days are short enough to stop.",
    highlights: ["Reykjavík", "Golden Circle", "Vík", "Jökulsárlón"],
    type: "Self-guided",
    featured: false,
  },
  {
    id: "amalfi-slow-week",
    title: "Slow Coast",
    destination: "Italy",
    destinationId: "italy",
    duration: "7 Days",
    nights: "6 Nights",
    price: 1680,
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1400&q=80",
    description:
      "One base on the coast, a boat day, and trains into two towns. No daily hotel changes.",
    highlights: ["Sorrento base", "Capri boat", "Positano", "Naples evening"],
    type: "Cruise",
    featured: false,
  },
]

export function getPackage(id: string) {
  return packages.find((item) => item.id === id)
}

export function getFeaturedPackages() {
  return packages.filter((item) => item.featured)
}

export function getPackagesByDestination(destinationId: string) {
  return packages.filter((item) => item.destinationId === destinationId)
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}
