import { Mail, MapPin, Phone } from "lucide-react"
import { ContactAgentModal } from "../components/ContactAgentModal"
import { GENERAL_MESSAGE } from "../lib/enquirySchema"

export function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-5 sm:py-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-terracotta uppercase">Write to us</p>
        <h1 className="mt-2 font-display text-4xl text-teal sm:text-5xl">Contact</h1>
        <p className="mt-4 text-lg leading-8 text-mist">
          Tell us when you want to travel, who is coming, and what kind of trip you have in mind.
        </p>
        <ul className="mt-8 space-y-4 text-sm">
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 text-teal" size={18} />
            <a href="tel:+94770861851" className="hover:text-teal">+94 77 086 1851</a>
          </li>
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 text-teal" size={18} />
            <span>agent@example.com</span>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 text-teal" size={18} />
            <span>Colombo, Sri Lanka</span>
          </li>
        </ul>
      </div>
      <ContactAgentModal
        presentation="inline"
        packageId="general"
        packageName="General enquiry"
        defaultMessage={GENERAL_MESSAGE}
      />
    </div>
  )
}
