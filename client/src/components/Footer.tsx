import { NavLink } from "react-router-dom"
import { FooterSocialLinks } from "./FooterSocialLinks"
import { businessRegistration, contactLines, deskLocation, supportEmail } from "../lib/contact"
import { evoqueImages } from "../lib/evoqueAssets"

const quickLinks = [
  { to: "/about", label: "About Us" },
  { to: "/destinations", label: "Destinations" },
  { to: "/tours/outbound", label: "Tours" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact Us" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <img src={evoqueImages.footer} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-[#0a1014]/90" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <div>
            <img
              src="/logo.png"
              alt="Twenty 4 Seven Travel"
              className="h-14 w-auto max-w-[11rem] object-contain object-left sm:h-16"
            />
            <p className="mt-2 font-script text-2xl text-accent-light">Twenty 4 Seven Travel</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-cream/65">
              Discover your next great adventure and uncover unforgettable moments waiting just around the corner.
            </p>
          </div>

          <div>
            <p className="font-display text-xl text-cream sm:text-2xl">Quick Links</p>
            <nav className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="inline-flex items-center gap-2 text-sm text-cream/90 transition hover:text-accent-light"
                >
                  <span className="font-semibold text-accent" aria-hidden>
                    »
                  </span>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <p className="font-display text-xl text-cream sm:text-2xl">Find Us</p>
            <address className="mt-5 space-y-2 text-sm not-italic leading-7 text-cream/80">
              <p>{deskLocation}</p>
              {contactLines.map((line) => (
                <p key={line.tel}>
                  <a href={`tel:${line.tel}`} className="transition hover:text-accent-light">
                    {line.display}
                  </a>
                  <span className="text-cream/45"> · {line.region}</span>
                </p>
              ))}
              <p>
                <a href={`mailto:${supportEmail}`} className="transition hover:text-accent-light">
                  {supportEmail}
                </a>
              </p>
              <p className="pt-1 text-cream/55">
                BR <span className="text-cream/85">{businessRegistration}</span>
              </p>
            </address>
            <FooterSocialLinks />
          </div>
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center sm:px-6">
          <p className="text-xs text-cream/45">
            ©{year}, Twenty 4 Seven Travel. BR {businessRegistration}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
