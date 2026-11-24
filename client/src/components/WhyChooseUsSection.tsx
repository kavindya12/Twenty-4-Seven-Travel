import { CircleDollarSign, Headphones, MapPinned, ShieldCheck, type LucideIcon } from "lucide-react"
import { BlurFade } from "./magic/BlurFade"

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
    description: "Clear package pricing with taxes and inclusions explained up front.",
  },
  {
    icon: MapPinned,
    stat: "3",
    title: "Steps to book",
    description: "Browse tours, share your dates, and confirm with your agent.",
  },
  {
    icon: ShieldCheck,
    stat: "1",
    title: "Agent on your trip",
    description: "One contact from enquiry to departure, with updates by email.",
  },
  {
    icon: Headphones,
    stat: "24/7",
    title: "Real support",
    description: "Reach a person in Sri Lanka or the UK when plans change.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="bg-ink py-16 text-cream sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <BlurFade inView>
          <p className="font-script text-[2rem] text-accent-light sm:text-4xl">Why travelers choose us</p>
          <p className="mt-3 max-w-md font-sans text-sm leading-6 text-cream/60 sm:text-[0.9375rem]">
            Simple booking, honest quotes, and real people when plans change.
          </p>
        </BlurFade>

        <ul className="mt-10 grid list-none gap-3 p-0 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {pillars.map((item, index) => (
            <BlurFade key={item.title} inView delay={0.04 * index}>
              <li className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-white/[0.09] bg-white/[0.03] p-5 transition-colors duration-200 hover:border-accent/30 hover:bg-white/[0.05] sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-sans text-2xl font-semibold tabular-nums tracking-tight text-accent-light">
                      {item.stat}
                    </span>
                    <item.icon className="shrink-0 text-accent-light/80" size={20} strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3 className="mt-4 font-sans text-[0.9375rem] font-semibold tracking-tight text-cream">{item.title}</h3>
                  <p className="mt-2 flex-1 font-sans text-sm leading-6 text-cream/55">{item.description}</p>
                </article>
              </li>
            </BlurFade>
          ))}
        </ul>
      </div>
    </section>
  )
}