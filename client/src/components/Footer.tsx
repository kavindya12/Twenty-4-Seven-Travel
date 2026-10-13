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
                <path
                  fillRule="evenodd"
                  d="M12.04 2c-5.46 0-9.89 4.43-9.89 9.89 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.89-4.43 9.89-9.89 0-2.64-1.03-5.12-2.9-6.99A9.82 9.82 0 0 0 12.04 2Zm5.76 14.06c-.24.68-1.2 1.25-1.67 1.33-.43.07-.97.1-1.57-.1-.36-.12-.82-.27-1.42-.53-2.5-1.08-4.13-3.6-4.25-3.77-.12-.17-1.02-1.36-1.02-2.59 0-1.23.64-1.83.87-2.08.23-.25.5-.31.67-.31h.48c.15 0 .36-.06.56.43.21.5.71 1.73.77 1.86.06.12.1.27.02.43-.08.17-.12.27-.23.41-.12.14-.25.32-.35.43-.12.12-.24.25-.1.48.14.24.62 1.02 1.33 1.66.92.82 1.69 1.07 1.93 1.19.24.12.38.1.52-.06.14-.17.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26Z"
                />
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
