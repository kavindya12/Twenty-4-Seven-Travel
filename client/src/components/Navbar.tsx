import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const links = [
  { to: "/destinations", label: "Destinations" },
  { to: "/tours", label: "Tours" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <NavLink to="/" className="min-w-0 lg:justify-self-start" onClick={() => setOpen(false)} aria-label="Twenty 4 Seven Travel">
          <img src="/logo.png" alt="Twenty 4 Seven Travel" className="h-10 w-auto max-w-[10.5rem] object-contain object-left sm:h-14 sm:max-w-none" />
        </NavLink>
        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-base font-medium transition ${isActive ? "text-terracotta" : "text-ink hover:text-terracotta"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center justify-self-end">
          <NavLink
            to="/contact"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-teal lg:inline-flex"
          >
            Find an agent
          </NavLink>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink ring-1 ring-ink/10 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-ink/10 px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-b border-ink/10 px-1 py-3.5 text-base font-medium ${isActive ? "text-terracotta" : "text-ink"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-ink px-4 py-3 text-center text-sm font-medium text-cream"
            >
              Find an agent
            </NavLink>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
