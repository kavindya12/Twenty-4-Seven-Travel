import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/tours/outbound", label: "Outbound Tours" },
  { to: "/destinations", label: "Destinations" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <NavLink to="/" className="min-w-0 shrink-0" onClick={() => setOpen(false)} aria-label="Twenty 4 Seven Travel">
          <img src="/logo.png" alt="Twenty 4 Seven Travel" className="h-10 w-auto max-w-[10.5rem] object-contain object-left sm:h-12" />
        </NavLink>
        <nav className="hidden items-center justify-center gap-0.5 xl:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium transition lg:px-3.5 lg:text-sm ${
                  isActive ? "bg-accent/10 text-accent-dark" : "text-ink/85 hover:text-accent-dark"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <NavLink
            to="/contact"
            className="hidden rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-accent/25 transition hover:bg-accent-dark sm:inline-flex"
          >
            Start your journey
          </NavLink>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink xl:hidden"
            aria-expanded={open}
            aria-label={open ? "Hide menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-ink/8 bg-white px-4 py-4 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3.5 text-base font-medium ${
                    isActive ? "bg-accent/10 text-accent-dark" : "text-ink hover:bg-cream"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-accent px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Start your journey
            </NavLink>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
