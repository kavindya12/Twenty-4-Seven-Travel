import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"

const links = [
  { to: "/destinations", label: "Destinations" },
  { to: "/tours", label: "Tours" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const home = useLocation().pathname === "/"

  useEffect(() => {
    if (!home) return
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [home])

  if (home) {
    return (
      <header
        className={`fixed inset-x-0 top-0 z-40 transition ${scrolled ? "border-b border-ink/10 bg-cream/95 shadow-sm backdrop-blur-xl" : ""}`}
      >
        <div className="relative mx-auto flex h-24 max-w-6xl items-center justify-between px-4 sm:h-28 sm:px-6">
          <NavLink to="/" className="z-10 shrink-0 rounded-2xl bg-white p-1 shadow-lg shadow-ink/20" onClick={() => setOpen(false)} aria-label="Twenty 4 Seven Travel">
            <img src="/logo.png" alt="Twenty 4 Seven Travel" className="h-16 w-auto sm:h-20" />
          </NavLink>
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/70 bg-white/75 px-2 py-2 text-base text-ink shadow-[0_10px_30px_rgba(20,24,28,0.12)] backdrop-blur-xl lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 font-medium transition ${isActive ? "bg-teal text-cream" : "text-ink/80 hover:bg-white hover:text-ink"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="rounded-full border border-white/70 bg-white/80 p-3.5 text-ink shadow-[0_10px_30px_rgba(20,24,28,0.12)] backdrop-blur-xl lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open ? (
          <nav className="mx-4 flex flex-col gap-1 rounded-3xl bg-white p-3 shadow-xl lg:hidden">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-3 py-3 text-base font-medium ${isActive ? "bg-cream-deep text-terracotta" : "text-ink"}`
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
              Plan my trip
            </NavLink>
          </nav>
        ) : null}
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-ink/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <NavLink to="/" className="shrink-0" onClick={() => setOpen(false)} aria-label="Twenty 4 Seven Travel">
            <img src="/logo.png" alt="Twenty 4 Seven Travel" className="h-16 w-auto sm:h-20" />
          </NavLink>
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-base font-medium ${isActive ? "text-terracotta" : "text-ink/80 hover:text-ink"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="rounded-full bg-ink px-5 py-2.5 text-base font-medium text-cream hover:bg-teal"
            >
              Find an agent
            </NavLink>
          </nav>
          <button
            type="button"
            className="rounded-full p-2 text-ink md:hidden"
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
                  `rounded-xl px-2 py-3 text-base font-medium ${isActive ? "bg-cream-deep text-terracotta" : "text-ink"}`
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
      </div>
    </header>
  )
}
