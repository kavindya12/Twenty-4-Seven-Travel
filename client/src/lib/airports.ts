export type Airport = {
  iata: string
  name: string
  city: string
  country: string
  rank: number
}

type AirportRow = [string, string, string, string, number]

let airportsPromise: Promise<Airport[]> | null = null

export function loadAirports() {
  if (!airportsPromise) {
    airportsPromise = fetch("/airports.json")
      .then((response) => {
        if (!response.ok) throw new Error("Airport list failed")
        return response.json() as Promise<AirportRow[]>
      })
      .then((rows) =>
        rows.map(([iata, name, city, country, rank]) => ({
          iata,
          name,
          city,
          country,
          rank,
        })),
      )
      .catch((error) => {
        airportsPromise = null
        throw error
      })
  }
  return airportsPromise
}

export function airportLabel(airport: Airport) {
  const place = [airport.city, airport.country].filter(Boolean).join(", ")
  return place ? `${airport.name} (${airport.iata}), ${place}` : `${airport.name} (${airport.iata})`
}

function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
}

export function searchAirports(airports: Airport[], query: string, limit = 8) {
  const needle = fold(query)
  if (needle.length < 1) return []

  const matches: { airport: Airport; score: number }[] = []
  for (const airport of airports) {
    const iata = airport.iata.toLowerCase()
    const name = fold(airport.name)
    const city = fold(airport.city)
    const country = fold(airport.country)
    let score = 0
    if (iata === needle) score = 100
    else if (city === needle) score = 90
    else if (iata.startsWith(needle)) score = 80
    else if (city.startsWith(needle)) score = 70
    else if (name.startsWith(needle)) score = 60
    else if (needle.length > 1 && city.includes(needle)) score = 50
    else if (needle.length > 1 && name.includes(needle)) score = 40
    else if (country === needle || country.startsWith(needle)) score = 35
    else if (needle.length > 1 && country.includes(needle)) score = 30
    if (score > 0) matches.push({ airport, score })
  }

  matches.sort(
    (left, right) =>
      right.score - left.score ||
      left.airport.rank - right.airport.rank ||
      left.airport.name.localeCompare(right.airport.name),
  )
  return matches.slice(0, limit).map((match) => match.airport)
}
