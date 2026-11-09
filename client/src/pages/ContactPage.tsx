import { Mail, MapPin, Phone } from "lucide-react"
import { ContactAgentModal } from "../components/ContactAgentModal"
import { BlurFade } from "../components/magic/BlurFade"
import { businessRegistration, contactLines, deskLocation, supportEmail, whatsappUrl } from "../lib/contact"
import { evoqueImages } from "../lib/evoqueAssets"

const contactPhoto = evoqueImages.specialOffer

export function ContactPage() {
  return (
    <section className="bg-cream lg:grid lg:grid-cols-2 lg:items-start">
      <div className="relative min-h-[36rem] overflow-hidden lg:sticky lg:top-20 lg:h-[calc(100dvh-5rem)] lg:min-h-0">
        <img
          src={contactPhoto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover motion-safe:animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-dark/80 via-teal-dark/45 to-teal-dark/25" />
        <div className="relative flex h-full flex-col gap-10 px-5 py-12 text-cream sm:px-10 sm:py-14 lg:justify-center lg:px-12 lg:py-10">
          <BlurFade delay={0.05}>
            <p className="font-script text-3xl text-[#7ecde0]">Twenty 4 Seven Travel</p>
            <h1 className="mt-2 font-display text-6xl leading-none sm:text-7xl">Contact</h1>
            <p className="mt-5 max-w-md text-xl leading-8 text-cream/90">
              Tell us when you want to travel, who is coming, and what kind of trip you have in mind.
            </p>
          </BlurFade>
          <ul className="max-w-md space-y-3">
            {contactLines.map((line) => (
              <li key={line.tel}>
                <div className="flex items-center gap-4 rounded-2xl bg-white/12 px-4 py-4 ring-1 ring-white/20 backdrop-blur-md">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-teal-dark">
                    <Phone size={22} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium tracking-[0.16em] text-cream/70 uppercase">
                      Phone · {line.region}
                    </span>
                    <a href={`tel:${line.tel}`} className="mt-0.5 block text-lg font-medium hover:underline">
                      {line.display}
                    </a>
                    <a
                      href={whatsappUrl(line.whatsapp)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-sm font-medium text-[#7ecde0] hover:underline"
                    >
                      Chat on WhatsApp
                    </a>
                  </span>
                </div>
              </li>
            ))}
            <li>
              <a
                href="mailto:support@twenty4seventravel.com"
                className="flex items-center gap-4 rounded-2xl bg-white/12 px-4 py-4 ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/20"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-teal-dark">
                  <Mail size={22} />
                </span>
                <span>
                  <span className="block text-xs font-medium tracking-[0.16em] text-cream/70 uppercase">Email</span>
                  <span className="mt-0.5 block text-lg font-medium">{supportEmail}</span>
                </span>
              </a>
            </li>
            <li>
              <div className="flex items-center gap-4 rounded-2xl bg-white/12 px-4 py-4 ring-1 ring-white/20 backdrop-blur-md">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-teal-dark">
                  <MapPin size={22} />
                </span>
                <span>
                  <span className="block text-xs font-medium tracking-[0.16em] text-cream/70 uppercase">Desk</span>
                  <span className="mt-0.5 block text-lg font-medium">{deskLocation}</span>
                  <span className="mt-1 block text-sm text-cream/75">BR {businessRegistration}</span>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <ContactAgentModal
          presentation="inline"
          packageId="general"
          packageName="General enquiry"
          defaultMessage=""
        />
      </div>
    </section>
  )
}
