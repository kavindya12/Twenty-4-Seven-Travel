import { MotionConfig } from "motion/react"
import { BlurFade } from "../components/magic/BlurFade"
import { PageHero } from "../components/PageHero"
import { evoqueImages } from "../lib/evoqueAssets"

export function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <PageHero
        scriptEyebrow
        eyebrow="The desk"
        title="About Twenty 4 Seven Travel"
        description="Holiday, honeymoon, or a week you have been putting off — consultants plan flights, stays, and the shape of the days."
        image={evoqueImages.about}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-5 sm:py-16">
        <BlurFade inView>
          <div className="surface-card grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2">
            <img
              src={evoqueImages.about}
              alt="A traveler looking over a city from a window"
              className="h-72 w-full rounded-2xl object-cover sm:h-96"
            />
            <div className="space-y-4 text-base leading-7 text-mist sm:text-lg">
              <p>
                An enquiry is the start of the conversation. You send the date and the group. An agent replies with a
                route, not a checkout page.
              </p>
              <p>
                We do not just plan trips — we craft travel stories. From handpicked destinations to seamless experiences,
                every detail is designed for those who travel with intention.
              </p>
              <p className="font-medium text-ink">Nothing is confirmed until you and the agent agree.</p>
            </div>
          </div>
        </BlurFade>
      </div>
    </MotionConfig>
  )
}
