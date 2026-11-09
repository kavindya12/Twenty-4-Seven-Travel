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

import { evoqueImages } from "../lib/evoqueAssets"

export type TravelPackage = {
  id: string
  slug: string
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

const evoquePhoto = (src: string, alt: string) => [{ src, alt }]

export const packages: TravelPackage[] = [
  {
    id: "sri-lanka-hill-coast",
    slug: "sri-lanka-hill-coast",
    title: "Hill Country & Coast",
    destination: "Sri Lanka",
    destinationId: "sri-lanka",
    duration: "7 Days",
    nights: "6 Nights",
    price: 699,
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
    id: "bali-magic",
    slug: "bali-magic",
    title: "Bali Magic",
    destination: "Indonesia",
    destinationId: "indonesia",
    duration: "5 Days",
    nights: "4 Nights",
    price: 749,
    image: evoqueImages.tripBali,
    photos: evoquePhoto(evoqueImages.tripBali, "Bali temples and coast"),
    description:
      "Temple mornings, rice-terrace walks, and a beach finish — paced for a first Bali trip with transfers arranged.",
    highlights: ["Ubud", "Tanah Lot", "Water temple", "Seminyak stay"],
    type: "Seaside",
    featured: true,
  },
  {
    id: "phuket-phi-phi",
    slug: "phuket-phi-phi",
    title: "Phuket & Phi Phi",
    destination: "Thailand",
    destinationId: "thailand",
    duration: "6 Days",
    nights: "5 Nights",
    price: 745,
    image: evoqueImages.trip2,
    photos: evoquePhoto(evoqueImages.trip2, "Thailand islands"),
    description: "Phuket base with a Phi Phi day on the water. Longtail boats, viewpoints, and unhurried beach time.",
    highlights: ["Phi Phi islands", "Viewpoint hike", "Longtail cruise", "Phuket old town"],
    type: "Seaside",
    featured: true,
  },
  {
    id: "vietnam-group-tour",
    slug: "vietnam-group-tour",
    title: "Vietnam (Group Tour)",
    destination: "Vietnam",
    destinationId: "vietnam",
    duration: "8 Days",
    nights: "7 Nights",
    price: 1_375,
    image: evoqueImages.trip3,
    photos: evoquePhoto(evoqueImages.trip3, "Vietnam landscapes"),
    description:
      "North to central Vietnam with a fixed group route — Ha Long, Hanoi, and Hoi An with a lead guide throughout.",
    highlights: ["Ha Long Bay", "Hanoi old quarter", "Hoi An", "Group guide"],
    type: "Adventure",
    featured: true,
  },
  {
    id: "bali-group-tour",
    slug: "bali-group-tour",
    title: "Bali (Group Tour)",
    destination: "Indonesia",
    destinationId: "indonesia",
    duration: "5 Days",
    nights: "6 Nights",
    price: 820,
    image: evoqueImages.trip4,
    photos: evoquePhoto(evoqueImages.trip4, "Bali group travel"),
    description: "Shared departures across Bali’s highlights with hotels and transfers included in the group rate.",
    highlights: ["Shared transport", "Ubud stay", "Beach club day", "Lead guide"],
    type: "Self-guided",
    featured: true,
  },
  {
    id: "bangkok-unveiled",
    slug: "bangkok-unveiled",
    title: "Bangkok Unveiled",
    destination: "Thailand",
    destinationId: "thailand",
    duration: "4 Days",
    nights: "3 Nights",
    price: 450,
    image: evoqueImages.trip5,
    photos: evoquePhoto(evoqueImages.trip5, "Bangkok city"),
    description: "Short city break: river temples, markets, and rooftops — ideal before a beach extension.",
    highlights: ["Grand Palace area", "Chao Phraya", "Street food walk", "Sky-bar evening"],
    type: "Self-guided",
    featured: true,
  },
  {
    id: "endless-blues-maldives",
    slug: "endless-blues-maldives",
    title: "Endless Blues – Maldives",
    destination: "Maldives",
    destinationId: "maldives",
    duration: "4 Days",
    nights: "3 Nights",
    price: 575,
    image: evoqueImages.tripHeroWide,
    photos: [
      { src: evoqueImages.tripHeroWide, alt: "Maldives lagoon" },
      { src: evoqueImages.trip4, alt: "Overwater villas" },
    ],
    description: "One island, speedboat transfer, and full days on the reef — built as a compact Maldives escape.",
    highlights: ["Speedboat transfer", "House reef", "Sandbank hour", "Sunset fishing"],
    type: "Seaside",
    featured: true,
  },
  {
    id: "singapore-city-tour",
    slug: "singapore-city-tour",
    title: "Singapore – City Tour",
    destination: "Singapore",
    destinationId: "singapore",
    duration: "3 Days",
    nights: "2 Nights",
    price: 600,
    image: evoqueImages.trip6,
    photos: evoquePhoto(evoqueImages.trip6, "Singapore skyline"),
    description: "Gardens, neighbourhoods, and food halls in a tight long weekend with airport transfers handled.",
    highlights: ["Marina Bay", "Gardens by the Bay", "Chinatown", "Hawker centres"],
    type: "Self-guided",
    featured: true,
  },
  {
    id: "malaysia-golden-escape",
    slug: "malaysia-golden-escape",
    title: "Malaysia – The Golden Escape",
    destination: "Malaysia",
    destinationId: "malaysia",
    duration: "4 Days",
    nights: "3 Nights",
    price: 390,
    image: evoqueImages.trip7,
    photos: evoquePhoto(evoqueImages.trip7, "Malaysia travel"),
    description:
      "Experience the best of Malaysia in just 4 days — from the iconic skyline of Kuala Lumpur to the cool misty heights of Genting Highland, with culture, food, and easy transfers.",
    highlights: ["KL towers", "Batu Caves", "Heritage walk", "Local food tour"],
    type: "Adventure",
    featured: true,
  },
]

export function getPackage(id: string) {
  return packages.find((item) => item.id === id)
}

export function getPackageBySlug(slug: string) {
  return packages.find((item) => item.slug === slug || item.id === slug)
}

export function getFeaturedPackages() {
  return packages.filter((item) => item.featured)
}

export function getInboundPackages() {
  return packages.filter((item) => item.destinationId === "sri-lanka")
}

export function getOutboundPackages() {
  return packages.filter((item) => item.destinationId !== "sri-lanka")
}

export function getPackagesByDestination(destinationId: string) {
  return packages.filter((item) => item.destinationId === destinationId)
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatStartingPrice(price: number) {
  return formatPrice(price)
}
