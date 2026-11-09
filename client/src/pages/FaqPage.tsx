import { PageHero } from "../components/PageHero"
import { SpacedTitle } from "../components/SpacedTitle"
import { BlurFade } from "../components/magic/BlurFade"
import { evoqueImages } from "../lib/evoqueAssets"

const faqs = [
  {
    q: "How does an enquiry work?",
    a: "You send dates, travelers, and what you want from the trip. An agent replies with a route and starting price — nothing is confirmed until you agree.",
  },
  {
    q: "Are prices on the website final?",
    a: "Figures are starting points per person. Hotels, flights, and season change the total. The desk tells you the real number after checking availability.",
  },
  {
    q: "Can you help with visas?",
    a: "We advise on timing and documents for common routes. For complex visas we point you to the right process and stay on the trip planning side.",
  },
  {
    q: "How fast do you reply?",
    a: "Most enquiries get a first reply within one business day. Urgent date changes are handled as quickly as the desk can reach suppliers.",
  },
]

export function FaqPage() {
  return (
    <>
      <PageHero
        scriptEyebrow
        eyebrow="FAQ"
        title="Questions before you enquire"
        description="Straight answers about how Twenty 4 Seven Travel works."
        image={evoqueImages.hero}
      />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-5 sm:py-16">
        <SpacedTitle className="text-center text-3xl">Common questions</SpacedTitle>
        <div className="mt-10 space-y-4">
          {faqs.map((item, index) => (
            <BlurFade key={item.q} inView delay={0.05 * index}>
              <details className="surface-card group p-5 sm:p-6">
                <summary className="cursor-pointer list-none font-display text-lg text-ink marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="text-accent transition group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-mist">{item.a}</p>
              </details>
            </BlurFade>
          ))}
        </div>
      </div>
    </>
  )
}
