import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { airportLabel, loadAirports, searchAirports, type Airport } from "../lib/airports"

type AirportSearchProps = {
  value: string
  initialQuery?: string
  invalid?: boolean
  onChange: (value: string) => void
}

type Option = {
  id: string
  label: string
  detail: string
  value: string
}

export function AirportSearch({ value, initialQuery = "", invalid, onChange }: AirportSearchProps) {
  const listId = useId()
  const [query, setQuery] = useState(value || initialQuery)
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const [airports, setAirports] = useState<Airport[] | null>(null)
  const [loadError, setLoadError] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let active = true
    loadAirports()
      .then((list) => {
        if (active) setAirports(list)
      })
      .catch(() => {
        if (active) setLoadError(true)
      })
    return () => {
      active = false
    }
  }, [])

  const options = useMemo(() => buildOptions(listId, airports, query, value), [airports, listId, query, value])

  useEffect(() => {
    setHighlight(0)
  }, [query])

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  function commit(next: string) {
    setQuery(next)
    onChange(next)
    setOpen(false)
  }

  function onInput(next: string) {
    setQuery(next)
    setOpen(true)
    if (next !== value) onChange("")
  }

  function onBlur() {
    if (loadError && query.trim() && query.trim() !== value) {
      onChange(query.trim())
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setOpen(true)
      setHighlight((current) => Math.min(current + 1, Math.max(options.length - 1, 0)))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setHighlight((current) => Math.max(current - 1, 0))
    } else if (event.key === "Enter" && open && options[highlight]) {
      event.preventDefault()
      commit(options[highlight].value)
    } else if (event.key === "Escape") {
      setOpen(false)
    }
  }

  const waiting = open && !airports && !loadError
  const listOpen = open && (waiting || loadError || query.trim().length > 0)
  const activeId = listOpen && options[highlight] ? options[highlight].id : undefined

  return (
    <div ref={rootRef} className="relative">
      <input
        className={`mt-1.5 w-full rounded-xl border bg-white px-3 py-2.5 text-ink outline-none focus:border-teal ${
          invalid ? "border-terracotta" : "border-ink/15"
        }`}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={listOpen}
        aria-controls={listId}
        aria-activedescendant={activeId}
        placeholder="City, airport, or code"
        autoComplete="off"
        value={query}
        onChange={(event) => onInput(event.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      {listOpen ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-xl border border-ink/10 bg-white py-1 shadow-lg"
        >
          {waiting ? <li className="px-3 py-2 text-sm text-mist">Loading airports...</li> : null}
          {loadError ? (
            <li className="px-3 py-2 text-sm text-mist">Airport list could not be loaded. You can still type a destination.</li>
          ) : null}
          {!waiting && !loadError && query.trim().length > 0 && options.length === 0 ? (
            <li className="px-3 py-2 text-sm text-mist">No airports match that search.</li>
          ) : null}
          {options.map((option, index) => (
            <li
              key={option.id}
              id={option.id}
              role="option"
              aria-selected={index === highlight}
              className={`cursor-pointer px-3 py-2 ${index === highlight ? "bg-cream-deep" : "hover:bg-cream"}`}
              onMouseEnter={() => setHighlight(index)}
              onMouseDown={(event) => {
                event.preventDefault()
                commit(option.value)
              }}
            >
              <span className="block text-sm font-medium text-ink">{option.label}</span>
              {option.detail ? <span className="block text-xs text-mist">{option.detail}</span> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function buildOptions(listId: string, airports: Airport[] | null, query: string, value: string): Option[] {
  const folded = query.trim().toLowerCase()
  const options: Option[] = []

  if (value && query === value) {
    return [
      {
        id: `${listId}-selected`,
        label: value,
        detail: "Selected",
        value,
      },
    ]
  }

  if (!airports || folded.length < 1) return options

  for (const airport of searchAirports(airports, query)) {
    const place = [airport.city, airport.country].filter(Boolean).join(", ")
    options.push({
      id: `${listId}-${airport.iata}`,
      label: airport.name,
      detail: place ? `${place} · ${airport.iata}` : airport.iata,
      value: airportLabel(airport),
    })
  }

  return options
}
