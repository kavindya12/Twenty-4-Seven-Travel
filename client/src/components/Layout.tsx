import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { removeStaleNativeDialogs } from "../lib/nativeDialog"
import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import { FloatingActions } from "./motion/FloatingActions"
import { PageLoader, shouldShowPageLoader } from "./motion/PageLoader"
import { RouteChangeLoader } from "./motion/RouteChangeLoader"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    removeStaleNativeDialogs()
  }, [pathname])

  return null
}

export function Layout() {
  const [booting, setBooting] = useState(shouldShowPageLoader)

  return (
    <div className="flex min-h-screen flex-col">
      {booting ? <PageLoader onComplete={() => setBooting(false)} /> : null}
      <RouteChangeLoader booting={booting} />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
