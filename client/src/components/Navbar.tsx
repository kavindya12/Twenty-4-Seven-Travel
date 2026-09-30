import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const links = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
        <NavLink to="/" className="font-display text-2xl tracking-tight text-teal" onClick={() => setOpen(false)}>
          247 <span className="text-sand">Travel</span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-teal" : "text-ink/80 hover:text-teal"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="rounded-full bg-teal px-4 py-2 text-sm font-medium text-cream hover:bg-teal-dark"
          >
            Plan a trip
          </NavLink>
        </nav>

        <button
          type="button"
          className="rounded-full p-2 text-teal md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-ink/10 px-3 py-3 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-2 py-3 text-base font-medium ${isActive ? "bg-cream-deep text-teal" : "text-ink"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
