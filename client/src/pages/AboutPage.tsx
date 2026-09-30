export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-5 sm:py-12">
      <p className="text-xs font-semibold tracking-[0.18em] text-terracotta uppercase">The desk</p>
      <h1 className="mt-2 font-display text-4xl text-teal sm:text-5xl">About 247 Travel</h1>
      <div className="mt-6 space-y-5 text-base leading-7 sm:text-lg sm:leading-8">
        <p>
          247 Travel is a small planning desk. Tell us how you like to travel, and an agent will shape the trip with you.
        </p>
        <p>
          An enquiry is not a booking. You tell us the date, how many people are travelling, and what you want from
          the route. An agent reads it and writes back.
        </p>
        <p>
          The first version of this site keeps those enquiries in a private file on the server and emails the agent.
          There is no public list of other travellers’ requests.
        </p>
      </div>
    </div>
  )
}
