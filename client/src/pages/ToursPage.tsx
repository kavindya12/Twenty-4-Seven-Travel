import { MotionConfig } from "motion/react"
import { BlurFade } from "../components/magic/BlurFade"
import { PageHero } from "../components/PageHero"
import { TourCard } from "../components/TourCard"
import { getOutboundPackages } from "../data/trips"
import { evoqueImages } from "../lib/evoqueAssets"

type ToursPageProps = {
  scope?: "outbound"
}

export function ToursPage({ scope = "outbound" }: ToursPageProps) {
  const list = scope === "outbound" ? getOutboundPackages() : getOutboundPackages()

  return (
    <MotionConfig reducedMotion="user">
      <PageHero
        scriptEyebrow
        eyebrow="Worldwide"
        title="Outbound tours"
        description="Handpicked international trips — prices are starting points per person in GBP."
        image={evoqueImages.hero}
      />
      <div className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((trip, index) => (
              <BlurFade key={trip.id} inView delay={0.04 * (index % 6)}>
                <TourCard trip={trip} />
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
