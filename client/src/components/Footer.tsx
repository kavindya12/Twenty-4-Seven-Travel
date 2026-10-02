import { NavLink } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-5 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src="/logo.png" alt="Twenty 4 Seven Travel" className="h-28 w-auto rounded-2xl bg-white p-2 sm:h-36" />
          <p className="mt-3 max-w-sm text-sm leading-6 text-cream/70">
            Tailor-made trips for holidays, honeymoons, and short escapes. An agent reads every enquiry.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-sand uppercase">Visit</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <NavLink to="/destinations" className="hover:text-sand">Destinations</NavLink>
            <NavLink to="/tours" className="hover:text-sand">Tours</NavLink>
            <NavLink to="/about" className="hover:text-sand">About</NavLink>
            <NavLink to="/contact" className="hover:text-sand">Contact</NavLink>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-sand uppercase">Desk</p>
          <p className="mt-4 text-sm leading-6 text-cream/70">
            Colombo, Sri Lanka
            <br />
            agent@example.com
            <br />
            <a href="tel:+94770861851" className="hover:text-sand">+94 77 086 1851</a>
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-4 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Twenty 4 Seven Travel
      </div>
    </footer>
  )
}
