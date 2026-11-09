import { BlurFade } from "./magic/BlurFade"
import { FlightPathDecor } from "./motion/FlightPathDecor"
import { TornEdge } from "./motion/TornEdge"

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  image: string
  scriptEyebrow?: boolean
  kenBurns?: boolean
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  scriptEyebrow,
  kenBurns = true,
}: PageHeroProps) {
  return (
    <div className="relative">
      <section className="relative overflow-hidden bg-ink">
        <img
          src={image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover opacity-45 ${kenBurns ? "animate-kenburns" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/95 via-teal-dark/85 to-ink/70" />
        <FlightPathDecor variant="dark" className="opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-20 lg:py-24">
          <BlurFade delay={0.05}>
            <p
              className={
                scriptEyebrow
                  ? "font-script text-3xl text-[#7ecde0] sm:text-4xl"
                  : "text-xs font-semibold tracking-[0.22em] text-sand uppercase"
              }
            >
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-cream/80 sm:text-lg">{description}</p>
          </BlurFade>
        </div>
      </section>
      <TornEdge fill="#f4efe6" className="-mt-px" />
    </div>
  )
}
