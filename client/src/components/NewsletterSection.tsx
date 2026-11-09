import { Link } from "react-router-dom"
import { BlurFade } from "./magic/BlurFade"
import { SpacedTitle } from "./SpacedTitle"

export function NewsletterSection() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <BlurFade inView>
          <div className="surface-card grid gap-8 p-8 sm:grid-cols-2 sm:p-10">
            <div>
              <p className="font-script text-3xl text-accent">Blog & news</p>
              <SpacedTitle className="mt-3 text-2xl sm:text-3xl">
                Subscribe to our newsletter
              </SpacedTitle>
              <p className="mt-4 text-sm leading-7 text-mist">
                Route ideas, timing notes, and desk updates. We send only when there is something useful — not daily noise.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-ink">
                <li>• The best travel deals</li>
                <li>• Exclusive promotions</li>
                <li>• Expert travel tips</li>
              </ul>
            </div>
            <form
              className="flex flex-col justify-center gap-3"
              onSubmit={(event) => {
                event.preventDefault()
                window.location.href = "/contact"
              }}
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-full border border-ink/15 bg-white px-5 py-3.5 text-ink outline-none focus:border-accent"
              />
              <button type="submit" className="btn-primary w-full">
                Subscribe
              </button>
              <p className="text-center text-xs text-mist">
                Prefer a full enquiry?{" "}
                <Link to="/contact" className="font-semibold text-accent hover:underline">
                  Contact the desk
                </Link>
              </p>
            </form>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
