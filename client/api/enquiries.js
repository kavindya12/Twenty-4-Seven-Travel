const DESK_EMAIL = process.env.AGENT_EMAIL || "Contact@twenty4seventravel.com"

function text(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

function count(value) {
  const number = Number(value)
  return Number.isInteger(number) ? number : NaN
}

function longDate(isoDate) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate || "Not provided"
  const [year, month, day] = isoDate.split("-").map(Number)
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

function readBody(req) {
  if (typeof req.body === "string") {
    return JSON.parse(req.body)
  }
  return req.body ?? {}
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    res.status(405).json({ success: false, message: "Method not allowed." })
    return
  }

  let enquiry
  try {
    enquiry = readBody(req)
  } catch {
    res.status(400).json({ success: false, message: "Please correct the highlighted fields." })
    return
  }

  const name = text(enquiry.name, 100)
  const email = text(enquiry.email, 200)
  const phone = text(enquiry.phone, 30)
  const origin = text(enquiry.origin, 160)
  const destination = text(enquiry.destination, 160)
  const packageName = text(enquiry.packageName, 120) || "General enquiry"
  const tripType = enquiry.tripType === "round-trip" ? "Round Trip" : "One Way"
  const travelDate = text(enquiry.travelDate, 10)
  const returnDate = text(enquiry.returnDate, 10)
  const message = text(enquiry.message, 2000)
  const adults = count(enquiry.adults)
  const youth = count(enquiry.youth)
  const children = count(enquiry.children)
  const infants = count(enquiry.infants)

  if (!name || !email || !phone || !origin || !destination || !travelDate || !Number.isInteger(adults) || adults < 1) {
    res.status(400).json({
      success: false,
      message: "Please correct the highlighted fields.",
    })
    return
  }

  const site = req.headers.origin || "https://www.twenty4seventravel.com"
  const fields = new URLSearchParams({
    name,
    email,
    phone,
    package: packageName,
    from: origin,
    to: destination,
    tripType,
    travelDate: longDate(travelDate),
    returnDate: returnDate ? longDate(returnDate) : "Not required",
    travelers: `Adults (16+): ${adults}
Youth (12–15): ${Number.isInteger(youth) ? youth : 0}
Children (2–11): ${Number.isInteger(children) ? children : 0}
Infants (under 2): ${Number.isInteger(infants) ? infants : 0}`,
    message: message || "Not provided",
    _subject: `New Travel Enquiry - ${packageName} - ${name}`,
    _template: "table",
    _captcha: "false",
    _replyto: email,
    _autoresponse: `Hello ${name},

Thank you for contacting Twenty 4 Seven Travel.

We have received your enquiry for ${packageName}.

Our travel agent will review your request and contact you soon.

Twenty 4 Seven Travel
${DESK_EMAIL}`,
  })

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(DESK_EMAIL)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Origin: site,
        Referer: `${site}/contact`,
      },
      body: fields.toString(),
    })
    const result = await response.json()
    if (result.success !== true && result.success !== "true") {
      console.error("Desk email was not accepted", result.message)
      res.status(200).json({
        success: true,
        message: "Thank you. Our agent will contact you soon.",
      })
      return
    }
  } catch (error) {
    console.error("Failed to send enquiry email", error)
    res.status(200).json({
      success: true,
      message: "Thank you. Our agent will contact you soon.",
    })
    return
  }

  res.status(201).json({
    success: true,
    message: "Thank you. Our agent will contact you soon.",
  })
}
