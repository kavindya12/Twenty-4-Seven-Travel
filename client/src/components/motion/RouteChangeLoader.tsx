import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { PageLoader } from "./PageLoader"

type RouteChangeLoaderProps = {
  booting: boolean
}

export function RouteChangeLoader({ booting }: RouteChangeLoaderProps) {
  const { pathname } = useLocation()
  const [show, setShow] = useState(false)
  const previous = useRef(pathname)
  const isFirst = useRef(true)

  useEffect(() => {
    if (booting) return
    if (isFirst.current) {
      isFirst.current = false
      previous.current = pathname
      return
    }
    if (previous.current === pathname) return
    previous.current = pathname
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    setShow(true)
  }, [pathname, booting])

  if (!show) return null

  return <PageLoader variant="route" onComplete={() => setShow(false)} />
}
