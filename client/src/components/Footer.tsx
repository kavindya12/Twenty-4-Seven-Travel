import { NavLink } from "react-router-dom"
import { businessRegistration, contactLines, deskLocation, supportEmail } from "../lib/contact"
import { evoqueImages } from "../lib/evoqueAssets"

const quickLinks = [
  { to: "/about", label: "About Us" },
  { to: "/destinations", label: "Destinations" },
  { to: "/tours/outbound", label: "Tours" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact Us" },
]

const paymentLabels = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"]

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
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://web.facebook.com/people/Twenty-4-Seven-Travel/61595064282608/?sk=grid"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white transition hover:bg-accent-dark"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12.2 3 11 4.4 11 6.6v1.9H9v2.8h2V21h3.5v-9.7h2.3l.4-2.8h-2.7Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/twent_y4seventravel/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white transition hover:bg-accent-dark"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 1.8H8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8a3.2 3.2 0 0 0 3.2-3.2V8A3.2 3.2 0 0 0 16 4.8Zm-4 2.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.8-2.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6">
          <p className="text-center text-xs text-cream/45 sm:text-left">
            ©{year}, Twenty 4 Seven Travel. BR {businessRegistration}. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Accepted payment methods">
            {paymentLabels.map((label) => (
              <span
                key={label}
                className="rounded border border-cream/15 bg-white/5 px-2 py-1 text-[10px] font-semibold tracking-wide text-cream/55 uppercase"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
