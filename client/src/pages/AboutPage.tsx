export function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80"
          alt="An airplane wing above the clouds"
          className="h-72 w-full rounded-3xl object-cover sm:h-96"
        />
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-terracotta uppercase">The desk</p>
          <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">About Twenty 4 Seven Travel</h1>
          <div className="mt-5 space-y-4 text-base leading-7 text-mist sm:text-lg">
            <p>
              Holiday, honeymoon, or a week you have been putting off: the consultants here plan flights, stays, and
              the shape of the days.
            </p>
            <p>
              An enquiry is the start of that conversation. You send the date and the group. An agent replies with a
              route, not a checkout page.
            </p>
            <p>Nothing is confirmed until you and the agent agree.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
