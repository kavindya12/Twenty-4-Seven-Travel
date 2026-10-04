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
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
        <NavLink to="/" className="justify-self-start" onClick={() => setOpen(false)} aria-label="Twenty 4 Seven Travel">
          <img src="/logo.png" alt="Twenty 4 Seven Travel" className="h-11 w-auto sm:h-14" />
        </NavLink>
        <nav className="hidden items-center gap-8 lg:flex">
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
            className="rounded-full p-2 text-ink lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="flex flex-col gap-1 border-t border-ink/10 px-4 py-3 lg:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-2 py-3 text-base font-medium ${isActive ? "text-terracotta" : "text-ink"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-full bg-ink px-4 py-3 text-center text-sm font-medium text-cream"
          >
            Find an agent
          </NavLink>
        </nav>
      ) : null}
    </header>
  )
}
