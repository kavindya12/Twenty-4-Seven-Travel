import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20">
      <h1 className="font-display text-5xl text-teal">Page not found</h1>
      <p className="mt-3 text-mist">That address is not part of this site.</p>
      <Link to="/" className="mt-6 inline-flex font-semibold text-teal underline">
        Back home
      </Link>
    </div>
  )
}
