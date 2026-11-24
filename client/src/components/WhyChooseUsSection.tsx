import { CircleDollarSign, Headphones, MapPinned, ShieldCheck, type LucideIcon } from "lucide-react"
import { BlurFade } from "./magic/BlurFade"
import { SectionHeading } from "./SectionHeading"

const pillars: {
  icon: LucideIcon
  stat: string
  title: string
  description: string
}[] = [
  {
    icon: CircleDollarSign,
    stat: "0",
    title: "Hidden fees",
    description: "Package prices are quoted clearly—taxes and inclusions explained before you commit.",
  },
  {
    icon: MapPinned,
    stat: "3",
    title: "Steps to book",
    description: "Browse tours, share your dates, and confirm with a dedicated travel agent.",
  },
  {
    icon: ShieldCheck,
    stat: "1",
    title: "Agent on your trip",
    description: "One point of contact from enquiry to departure—documents and updates by email.",
  },
  {
    icon: Headphones,
    stat: "24/7",
    title: "Real support",
    description: "Talk to a person in Sri Lanka or the UK for changes, questions, and emergencies.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0f1419] py-16 text-cream sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-accent-light/10 blur-3xl"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,transparent_40%,transparent_100%)]" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <BlurFade inView>
          <SectionHeading
            light
            scriptEyebrow
            eyebrow="Why travelers choose us"
            title="Honest pricing. Human help. Trips you can trust."
            description="We keep the booking process simple and stay reachable long after you pack."
          />
        </BlurFade>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:gap-6">
          {pillars.map((item, index) => (
            <BlurFade key={item.title} inView delay={0.05 * index}>
              <article className="group relative h-full overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 backdrop-blur-sm transition duration-300 hover:border-accent/35 hover:bg-white/[0.07] sm:p-7 lg:p-8">
                <div
                  className="pointer-events-none absolute -right-6 -top-8 font-display text-[7rem] leading-none text-white/[0.04] transition group-hover:text-accent-light/[0.08]"
                  aria-hidden
                >
                  {item.stat}
                </div>

                <div className="relative flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/25 to-accent-light/10 text-sand ring-1 ring-white/10 transition group-hover:from-accent/40 group-hover:text-cream">
                    <item.icon size={22} strokeWidth={1.75} aria-hidden />
                  </span>
                  <p className="font-display text-4xl leading-none tracking-tight text-accent-light sm:text-[2.75rem]">
                    {item.stat}
                  </p>
                </div>

                <h3 className="relative mt-6 font-display text-xl text-cream sm:text-2xl">{item.title}</h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-cream/78 sm:text-[0.9375rem] sm:leading-7">
                  {item.description}
                </p>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}