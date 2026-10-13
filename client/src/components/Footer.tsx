import { NavLink } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-5 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src="/logo.png" alt="Twenty 4 Seven Travel" className="h-16 w-auto rounded-xl bg-white p-2 sm:h-20" />
          <p className="mt-3 max-w-sm text-sm leading-6 text-cream/70">
            Tailor-made trips for holidays, honeymoons, and short escapes. An agent reads every enquiry.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://wa.me/94770861851"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-sand hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M20.5 3.5A11 11 0 0 0 2.1 16.8L1 23l6.4-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.8.6.6-3.7-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z" />
              </svg>
            </a>
            <a
              href="https://web.facebook.com/people/Twenty-4-Seven-Travel/61595064282608/?sk=grid"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-sand hover:text-ink"
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-sand hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 1.8H8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8a3.2 3.2 0 0 0 3.2-3.2V8A3.2 3.2 0 0 0 16 4.8Zm-4 2.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.8-2.1a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
              </svg>
            </a>
          </div>
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
            <a href="mailto:Contact@twenty4seventravel.com" className="hover:text-sand">
              Contact@twenty4seventravel.com
            </a>
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
