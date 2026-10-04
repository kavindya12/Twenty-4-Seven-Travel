export type Destination = {
  id: string
  name: string
  region: string
  summary: string
  details: string
  places: string[]
  bestTime: string
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
  photos: { src: string; alt: string }[]
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
    details:
      "Most trips start in Colombo and move inland. The hill-country train between Kandy and Ella is the part people keep. Galle and the south coast are the slow finish: fort walks, one beach stay, and no extra city bolted on.",
    places: ["Colombo", "Kandy", "Ella train", "Galle"],
    bestTime: "December to April on the south coast. The hills are kinder from January to March.",
    image:
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "maldives",
    name: "Maldives",
    region: "Islands",
    summary: "Reef time and long lunches, without a packed island-hop.",
    details:
      "You fly into Malé and take one speedboat or seaplane to a single island. The plan is the reef outside the room, a sandbank hour, and an evening on the water. Islands are not strung together unless you ask.",
    places: ["Malé", "House reef", "Sandbank", "Sunset dhoni"],
    bestTime: "December to April for calmer seas. May to November is wetter, and usually quieter.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "japan",
    name: "Japan",
    region: "East Asia",
    summary: "City nights, shrine paths, and trains that do the hard work.",
    details:
      "Rail does the moving. A usual route is Tokyo, one night in Hakone, then Kyoto, with a short Nara morning if the group wants less temple time. Luggage can be sent ahead so station changes stay light.",
    places: ["Tokyo", "Hakone", "Kyoto", "Nara"],
    bestTime: "Late March to April, and October to November. Summer is hot. Winter is clear and quiet.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "costa-rica",
    name: "Costa Rica",
    region: "Central America",
    summary: "Rainforest lodges and wildlife mornings, paced for first-timers.",
    details:
      "Two bases are enough: cloud forest at Monteverde, then the Pacific at Manuel Antonio. Mornings are for wildlife. Afternoons stay open. The same guide stays with the group instead of a new face at every park gate.",
    places: ["Monteverde", "Night walk", "Manuel Antonio"],
    bestTime: "December to April is drier. May to November is greener, quieter, and still walkable.",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "iceland",
    name: "Iceland",
    region: "North Atlantic",
    summary: "Waterfalls, black sand, and one ring-road plan that actually fits.",
    details:
      "The south coast fits in a week when the driving days stay short. Reykjavík bookends the trip. In between: the Golden Circle, black-sand stops near Vík, and the glacier lagoon at Jökulsárlón.",
    places: ["Reykjavík", "Golden Circle", "Vík", "Jökulsárlón"],
    bestTime: "June to August for long light and open roads. September is quieter. Winter needs a different plan.",
    image:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "italy",
    name: "Italy",
    region: "Mediterranean",
    summary: "A coastal week with fewer towns and better tables.",
    details:
      "One hotel on the Sorrento coast, not a new town every night. A boat day covers Capri. Positano is a half day. Naples is an evening, not a base. Trains and a driver handle the coast road.",
    places: ["Sorrento", "Capri", "Positano", "Naples"],
    bestTime: "May, June, and September. July and August are crowded and hot.",
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
    photos: [
      {
        src: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80",
        alt: "Tea bushes covering a hill in Sri Lanka",
      },
      {
        src: "https://images.unsplash.com/photo-1566766189268-ecac9118f2b7?auto=format&fit=crop&w=1200&q=80",
        alt: "The Ella train crossing Nine Arches Bridge",
      },
    ],
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
    photos: [
      {
        src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80",
        alt: "Overwater villas in clear Maldives water",
      },
      {
        src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
        alt: "A swimmer over a coral reef",
      },
    ],
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
    photos: [
      {
        src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80",
        alt: "Red temple gates along a path in Kyoto",
      },
      {
        src: "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1200&q=80",
        alt: "Mount Fuji above a lake",
      },
    ],
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
    photos: [
      {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
        alt: "Sunlight through a cloud-forest canopy",
      },
      {
        src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80",
        alt: "A sloth resting in a tree",
      },
    ],
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
    photos: [
      {
        src: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=1200&q=80",
        alt: "Ice floating on a glacier lagoon",
      },
      {
        src: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?auto=format&fit=crop&w=1200&q=80",
        alt: "Black sand and sea stacks on an Iceland beach",
      },
    ],
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
    photos: [
      {
        src: "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=1200&q=80",
        alt: "Boats gathered in a Mediterranean harbor",
      },
      {
        src: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80",
        alt: "Cliffside houses above the Amalfi coast",
      },
    ],
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
