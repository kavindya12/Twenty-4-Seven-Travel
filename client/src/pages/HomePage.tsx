import { Compass, MessageCircle, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"

const reasons = [
  {
    icon: Compass,
    title: "Routes with room to breathe",
    text: "Itineraries leave space between the highlights, so the trip does not feel like a checklist.",
  },
  {
    icon: MessageCircle,
    title: "A person reads every enquiry",
    text: "You write to an agent. They reply with dates, pacing, and what the trip includes.",
  },
  {
    icon: ShieldCheck,
    title: "Clear before you commit",
    text: "Nothing is confirmed until you and the agent agree. The form is a conversation starter.",
  },
]

const testimonials = [
  {
    quote: "We asked a specific question and got a reply that actually answered it.",
    name: "Amaya",
  },
  {
    quote: "The stay was short, and they did not try to pad it with extra stops.",
    name: "Daniel",
  },
  {
    quote: "I sent dates for four people and heard back with an option that fit.",
    name: "Priya",
  },
]

export function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[70vh] overflow-hidden sm:min-h-[78vh]">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=2000&q=80"
          alt="A lake and mountains in late light"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-teal-dark/55" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 py-12 text-cream sm:min-h-[78vh] sm:px-5 sm:py-16">
          <p className="text-xs font-semibold tracking-[0.18em] text-sand uppercase sm:tracking-[0.22em]">247 Travel</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] sm:text-6xl lg:text-7xl">
            Leave the planning to someone who replies.
          </h1>
          <p className="mt-4 max-w-xl text-base text-cream/85 sm:mt-5 sm:text-lg">
            Private and small-group trips, planned with you from the first note.
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className="inline-flex rounded-full border border-cream/50 px-5 py-3 text-center font-semibold text-cream hover:bg-cream/10"
            >
              Talk to an agent
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
        <p className="text-xs font-semibold tracking-[0.18em] text-terracotta uppercase">Why 247</p>
        <h2 className="mt-2 font-display text-3xl text-teal sm:text-4xl">Why choose us</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {reasons.map((reason) => (
            <article key={reason.title} className="rounded-3xl bg-white p-6 ring-1 ring-ink/10">
              <reason.icon className="text-teal" />
              <h3 className="mt-4 font-display text-2xl">{reason.title}</h3>
              <p className="mt-2 text-sm leading-6 text-mist">{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-teal py-12 text-cream sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-5">
          <p className="text-xs font-semibold tracking-[0.18em] text-sand uppercase">Notes from travelers</p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl">Testimonials</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <blockquote key={item.name} className="rounded-3xl bg-teal-dark/40 p-5 sm:p-6">
                <p className="font-display text-xl leading-snug sm:text-2xl">“{item.quote}”</p>
                <footer className="mt-4 text-sm text-cream/75">{item.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
        <div className="rounded-[2rem] bg-sand px-5 py-10 text-ink sm:px-12 sm:py-12">
          <h2 className="max-w-xl font-display text-3xl leading-tight sm:text-4xl">
            Tell an agent the date, the group, and the pace you want.
          </h2>
          <p className="mt-3 max-w-lg text-ink/80">
            Send a note with your dates and group size. You will get a reply, not a checkout page.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-full bg-teal px-5 py-3 font-semibold text-cream hover:bg-teal-dark"
          >
            Contact an agent
          </Link>
        </div>
      </section>
    </>
  )
}
