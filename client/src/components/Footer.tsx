import { NavLink } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-teal-dark text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-5 sm:py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">247 Travel</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-cream/75">
            Small-group and private trips, planned by a person who reads your enquiry.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-sand uppercase">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <NavLink to="/about" className="hover:text-sand">
              About
            </NavLink>
            <NavLink to="/contact" className="hover:text-sand">
              Contact
            </NavLink>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-sand uppercase">Enquiries</p>
          <p className="mt-4 text-sm leading-6 text-cream/75">
            Send a note from the contact page. An agent replies with availability, not an automated booking.
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-4 text-center text-xs text-cream/60">
        © {new Date().getFullYear()} 247 Travel
      </div>
    </footer>
  )
}
