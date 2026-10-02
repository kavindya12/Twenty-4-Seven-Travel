import { BadgeCheck, Clock3, MapPinned, Wallet } from "lucide-react"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BlurFade } from "../components/magic/BlurFade"
import { BorderBeam } from "../components/magic/BorderBeam"
import { Marquee } from "../components/magic/Marquee"
import { TourCard } from "../components/TourCard"
import { destinations, getFeaturedPackages, tourTypes } from "../data/trips"

const features = [
  { icon: MapPinned, title: "Routes we know", text: "A short list of places, planned with room between the sights." },
  { icon: Wallet, title: "Clear starting prices", text: "Figures are per person, before your dates and hotel level." },
  { icon: BadgeCheck, title: "A real consultant", text: "Every enquiry is read by a person, not an automatic checkout." },
  { icon: Clock3, title: "A reply, not a wait", text: "Send dates and group size. An agent writes back with options." },
]

const reviews = [
  {
    quote: "They answered the train question before they tried to sell us extra nights.",
    name: "Amaya Perera",
    place: "Hill country trip",
  },
  {
    quote: "The island stay stayed short. Nobody padded it with a second resort.",
    name: "Daniel Okonkwo",
    place: "Reef stay",
  },
  {
    quote: "I needed flights moved in a hurry. The person on the desk stayed with it.",
    name: "Rosa Almeida",
    place: "Rail route",
  },
]

export function HomePage() {
  const featured = getFeaturedPackages()
  const [spot, setSpot] = useState(0)
  const [spotPaused, setSpotPaused] = useState(false)
  const spotlight = [0, 1, 2].map((offset) => destinations[(spot + offset) % destinations.length])

  useEffect(() => {
    if (spotPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => {
      setSpot((current) => (current + 1) % destinations.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [spotPaused])

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative bg-cream">
        <div className="relative h-[400px] overflow-hidden sm:h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=2200&q=80"
            alt="A mountain ridge in clear light"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream" />
        </div>
        <div className="relative z-10 -mt-44 px-4 text-center sm:-mt-56">
          <p className="text-[11px] font-medium tracking-[0.28em] text-white/90 uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
            Popular destinations
          </p>
          <div
            className="mt-4 flex items-end justify-center gap-3 sm:gap-6"
            onMouseEnter={() => setSpotPaused(true)}
            onMouseLeave={() => setSpotPaused(false)}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {spotlight.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to="/destinations"
                    className={`group relative block overflow-hidden border-[3px] border-white bg-white shadow-[0_16px_40px_rgba(20,24,28,0.16)] ${
                      index === 1
                        ? "h-36 w-[7.25rem] rounded-[1.5rem] sm:h-60 sm:w-52"
                        : "h-28 w-24 rounded-[1.25rem] sm:h-52 sm:w-44"
                    }`}
                  >
                    <img
                      src={destination.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-ink/25" />
                    <p className="absolute inset-0 flex items-center justify-center px-2 text-center font-display text-base leading-tight text-white sm:text-2xl">
                      {destination.name}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="mx-auto max-w-2xl pb-14 pt-8 sm:pb-16 sm:pt-10">
            <h1 className="font-display text-[2.35rem] leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
              Trips built around the way you actually travel.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-mist sm:text-[15px]">
              Holidays, honeymoons, and short escapes. Tell an agent the date, the group, and the pace.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/destinations"
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-teal"
              >
                Explore destinations
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-ink/10 bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-sm transition hover:bg-cream-deep"
              >
                Plan my trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-ink/10 bg-white py-3">
        <Marquee pauseOnHover className="[--duration:32s] [--gap:2.5rem]">
          {destinations.map((destination) => (
            <span key={destination.id} className="flex items-center gap-10 text-sm font-semibold tracking-[0.18em] text-ink/70 uppercase">
              {destination.name}
              <span className="text-sand" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      <section className="relative mx-auto grid max-w-6xl items-center gap-10 overflow-hidden px-4 py-14 sm:px-5 lg:grid-cols-2">
        <div className="pointer-events-none absolute -top-8 left-10 h-40 w-40 animate-float rounded-full bg-sand/30 blur-3xl" />
        <BlurFade inView direction="right" className="relative">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1400&q=80"
            alt="A traveler looking over a city from a window"
            className="h-72 w-full rounded-3xl object-cover shadow-2xl shadow-ink/10 transition duration-700 hover:scale-[1.02] sm:h-96"
          />
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <p className="text-xs font-semibold tracking-[0.18em] text-terracotta uppercase">About the desk</p>
          <h2 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-5xl">
            A planning desk, not a catalogue you click through alone.
          </h2>
          <p className="mt-4 text-base leading-7 text-mist">
            Looking for a quiet beach week, a first honeymoon, or a route with a bit more walking? Consultants here
            build the trip around that, then write back with what is included.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex text-sm font-semibold text-teal underline decoration-sand decoration-2 underline-offset-4 transition hover:text-terracotta"
          >
            About Twenty 4 Seven Travel
          </Link>
        </BlurFade>
      </section>

      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-5 lg:grid-cols-4">
          {features.map((feature, index) => (
            <BlurFade key={feature.title} inView delay={0.08 * index}>
              <article className="group h-full rounded-3xl p-4 transition duration-300 hover:-translate-y-1 hover:bg-cream hover:shadow-lg hover:shadow-ink/5">
                <span className="inline-flex rounded-2xl bg-teal/10 p-3 text-teal transition duration-300 group-hover:scale-110">
                  <feature.icon size={22} />
                </span>
                <h3 className="mt-4 font-display text-xl">{feature.title}</h3>
                <p className="mt-1 text-sm leading-6 text-mist">{feature.text}</p>
              </article>
            </BlurFade>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5">
        <BlurFade inView>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-terracotta uppercase">Places</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">Top destinations</h2>
            </div>
            <Link to="/destinations" className="text-sm font-semibold text-teal transition hover:text-terracotta">
              All destinations
            </Link>
          </div>
        </BlurFade>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <BlurFade key={destination.id} inView delay={0.06 * index} className={index === 0 ? "col-span-2 lg:col-span-1" : undefined}>
              <Link to="/destinations" className="group relative block h-44 overflow-hidden rounded-3xl sm:h-60">
                <img
                  src={destination.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent transition duration-500 group-hover:from-ink/70" />
                <div className="absolute right-0 bottom-0 left-0 translate-y-1 p-4 text-cream transition duration-500 group-hover:translate-y-0">
                  <p className="text-[10px] tracking-[0.16em] text-sand uppercase sm:text-xs">{destination.region}</p>
                  <p className="font-display text-2xl sm:text-3xl">{destination.name}</p>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      <section className="bg-cream-deep/60 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-5">
          <BlurFade inView>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-terracotta uppercase">Recommended</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl">Tours to start from</h2>
              </div>
              <Link to="/tours" className="text-sm font-semibold text-teal transition hover:text-terracotta">
                View all tours
              </Link>
            </div>
          </BlurFade>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((trip, index) => (
              <BlurFade key={trip.id} inView delay={0.08 * index}>
                <TourCard trip={trip} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5">
        <BlurFade inView>
          <p className="text-xs font-semibold tracking-[0.18em] text-terracotta uppercase">How you travel</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">Choose a tour type</h2>
        </BlurFade>
        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tourTypes.map((type, index) => (
            <BlurFade key={type.name} inView delay={0.07 * index}>
              <Link to="/tours" className="group relative block h-44 overflow-hidden rounded-3xl sm:h-60">
                <img
                  src={type.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/40 transition duration-500 group-hover:bg-ink/25" />
                <p className="absolute bottom-4 left-4 font-display text-2xl text-cream transition duration-500 group-hover:-translate-y-1">
                  {type.name}
                </p>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-teal text-cream">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-5">
          <BlurFade inView>
            <p className="text-xs font-semibold tracking-[0.18em] text-sand uppercase">Travelers</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">What people write back</h2>
          </BlurFade>
          <div className="mt-8">
            <Marquee pauseOnHover className="[--duration:38s] [--gap:1rem]">
              {reviews.map((review) => (
                <blockquote key={review.name} className="w-80 rounded-3xl bg-teal-dark/60 p-5 sm:w-96 sm:p-6">
                  <p className="font-display text-xl leading-snug sm:text-2xl">“{review.quote}”</p>
                  <footer className="mt-4 text-sm text-cream/70">
                    {review.name}
                    <span className="block text-cream/50">{review.place}</span>
                  </footer>
                </blockquote>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-5">
        <BlurFade inView>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink text-cream sm:grid sm:grid-cols-2">
            <BorderBeam size={140} duration={8} borderWidth={1.5} />
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
              alt="A quiet beach"
              className="h-56 w-full object-cover transition duration-700 hover:scale-105 sm:h-full"
            />
            <div className="p-6 sm:p-10">
              <p className="text-xs font-semibold tracking-[0.18em] text-sand uppercase">Plan ahead</p>
              <h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
                Warm-weather trips fill first. Ask before the dates lock.
              </h2>
              <p className="mt-3 text-sm leading-6 text-cream/70">
                No automatic discount banner. An agent checks availability, then tells you what the trip actually costs.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex rounded-full bg-terracotta px-5 py-3 font-semibold text-cream transition duration-300 hover:scale-[1.03] hover:bg-sand hover:text-ink"
              >
                Get started
              </Link>
            </div>
          </div>
        </BlurFade>
      </section>
    </MotionConfig>
  )
}
