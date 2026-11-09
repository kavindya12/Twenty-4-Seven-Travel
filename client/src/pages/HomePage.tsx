import { BadgeCheck, Clock3, Compass, Headphones, Luggage, ShieldCheck } from "lucide-react"
import { MotionConfig } from "motion/react"
import { Link } from "react-router-dom"
import { RecommendedTripsSection } from "../components/RecommendedTripsSection"
import { SpacedTitle } from "../components/SpacedTitle"
import { BlurFade } from "../components/magic/BlurFade"
import { Marquee } from "../components/magic/Marquee"
import { AnimatedCounter } from "../components/motion/AnimatedCounter"
import { FlightPathDecor } from "../components/motion/FlightPathDecor"
import { TestimonialsCarousel } from "../components/motion/TestimonialsCarousel"
import { TornEdge } from "../components/motion/TornEdge"
import { SectionHeading } from "../components/SectionHeading"
import { destinations, getOutboundPackages, tourTypes } from "../data/trips"
import { evoqueImages } from "../lib/evoqueAssets"

const trustStats: Array<{
  icon: typeof Luggage
  label: string
  value?: string
  title?: string
}> = [
  { icon: Luggage, value: "6+", label: "Curated destinations" },
  { icon: Compass, title: "Expert planning", label: "Tailored itineraries around your needs." },
  { icon: ShieldCheck, title: "Trusted service", label: "Reliable bookings and human review." },
  { icon: Headphones, title: "24/7 support", label: "We are with you every step of the way." },
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
  {
    quote: "Clear prices upfront and no pressure to add nights we did not want.",
    name: "James Chen",
    place: "Coastal week",
  },
]

export function HomePage() {
  const outboundPicks = getOutboundPackages()

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative min-h-[88vh] overflow-hidden bg-ink">
        <img
          src={evoqueImages.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink/85" />
        <FlightPathDecor variant="dark" className="opacity-50" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:px-5 sm:pb-20 lg:pb-24">
          <BlurFade delay={0.05}>
            <p className="font-script text-3xl text-accent-light sm:text-4xl">Twenty 4 Seven Travel</p>
            <h1 className="mt-2 max-w-3xl font-display text-[2.5rem] leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
              Discover the unseen
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-cream/85 sm:text-lg">
              Discover your next great adventure and uncover unforgettable moments waiting just around the corner.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/destinations" className="btn-primary">
                All destinations
              </Link>
              <Link to="/contact" className="btn-secondary">
                Start your journey
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      <section className="overflow-hidden border-y border-ink/8 bg-white py-4">
        <Marquee pauseOnHover className="[--duration:28s] [--gap:3rem]">
          {destinations.map((destination) => (
            <span key={destination.id} className="flex items-center gap-10 text-sm font-semibold tracking-[0.2em] text-ink/60 uppercase">
              {destination.name}
              <span className="text-terracotta" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      <div className="relative bg-white">
        <TornEdge fill="#14181c" className="-mb-px" />
        <section className="relative overflow-hidden bg-ink py-16 text-cream sm:py-20">
          <FlightPathDecor variant="dark" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-5">
            <p className="font-script text-3xl text-accent-light">Why travelers choose us</p>
            <SpacedTitle light className="mt-3 max-w-4xl text-2xl sm:text-4xl lg:text-[2.75rem]">
              Trusted travel planning. Curated experiences. Stress-free holidays.
            </SpacedTitle>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {trustStats.map((item, index) => (
                <BlurFade key={item.title ?? item.value ?? item.label} inView delay={0.05 * index}>
                  <div className="text-center lg:text-left">
                    <span className="inline-flex rounded-2xl border border-cream/10 bg-white/5 p-3 text-sand">
                      <item.icon size={22} />
                    </span>
                    {item.value ? (
                      <p className="mt-4 font-display text-4xl text-accent-light sm:text-5xl">
                        <AnimatedCounter value={item.value} />
                      </p>
                    ) : (
                      <p className="mt-4 font-display text-xl text-cream capitalize sm:text-2xl">{item.title}</p>
                    )}
                    <p className="mt-2 text-sm font-medium text-cream/65">{item.label}</p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
        <TornEdge flip fill="#14181c" className="-mt-px" />
      </div>

      <RecommendedTripsSection trips={outboundPicks} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-5">
        <SectionHeading scriptEyebrow eyebrow="Travel style" title="Choose a tour type" />
        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {tourTypes.map((type) => (
            <Link key={type.name} to="/tours/outbound" className="group relative block aspect-[3/4] overflow-hidden rounded-2xl">
              <img src={type.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-ink/45 transition group-hover:bg-ink/30" />
              <p className="absolute bottom-4 left-4 font-display text-2xl text-cream">{type.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="testimonials" className="relative overflow-hidden py-16 sm:py-20">
        <img src={evoqueImages.testimonialsSky} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/95 via-cream/90 to-cream/95" />
        <TornEdge fill="#14181c" className="absolute top-0 left-0 w-full" />
        <div className="relative mx-auto max-w-6xl px-4 pt-10 sm:px-5 sm:pt-14">
          <SectionHeading
            scriptEyebrow
            eyebrow="Our testimonials"
            title="What our customers say about us"
            description="Real replies from people who planned with an agent, not a checkout."
          />
          <TestimonialsCarousel reviews={reviews} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20">
        <div className="surface-card overflow-hidden sm:grid sm:grid-cols-2">
          <img
            src={evoqueImages.specialOffer}
            alt="A quiet beach"
            className="h-56 w-full object-cover sm:h-full sm:min-h-[18rem]"
          />
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <p className="font-script text-3xl text-[#3E97B3]">Special offer</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Warm-weather trips fill first. Ask before the dates lock.
            </h2>
            <p className="mt-4 text-sm leading-7 text-mist">
              No automatic discount banner. An agent checks availability, then tells you what the trip actually costs.
            </p>
            <Link to="/contact" className="btn-primary mt-8 w-fit">
              Get started
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-white py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-5 lg:grid-cols-2">
          <BlurFade inView>
            <img
              src={evoqueImages.about}
              alt="A traveler looking over a city from a window"
              className="h-72 w-full rounded-2xl object-cover shadow-xl shadow-ink/10 sm:h-96"
            />
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <p className="font-script text-3xl text-[#3E97B3]">About the desk</p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Travel that looks as good as it feels
            </h2>
            <p className="mt-4 text-base leading-7 text-mist">
              Looking for a quiet beach week, a first honeymoon, or a route with a bit more walking? Consultants here
              build the trip around that, then write back with what is included.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-teal">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck size={18} /> Bespoke planning
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={18} /> Fast replies
              </span>
            </div>
            <Link to="/about" className="mt-6 inline-flex text-sm font-semibold text-teal underline decoration-sand decoration-2 underline-offset-4 hover:text-terracotta">
              About Twenty 4 Seven Travel
            </Link>
          </BlurFade>
        </div>
      </section>
    </MotionConfig>
  )
}
