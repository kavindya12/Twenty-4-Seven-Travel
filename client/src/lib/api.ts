export type EnquiryPayload = {
  name: string
  email: string
  phone: string
  packageId: string
  packageName: string
  origin: string
  destination: string
  tripType: string
  travelDate: string
  returnDate?: string
  adults: number
  youth: number
  children: number
  infants: number
  message: string
}

export class EnquirySubmitError extends Error {
  fieldErrors?: Record<string, string>

  constructor(message: string, fieldErrors?: Record<string, string>) {
    super(message)
    this.name = "EnquirySubmitError"
    this.fieldErrors = fieldErrors
  }
}

const LOCAL_API = import.meta.env.VITE_API_URL || "http://localhost:5000"
const DESK_EMAIL = "Contact@twenty4seventravel.com"

function tripLabel(tripType: string) {
  return tripType === "round-trip" ? "Round Trip" : "One Way"
}

async function submitToLocalApi(payload: EnquiryPayload) {
  let response: Response

  try {
    response = await fetch(`${LOCAL_API}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new EnquirySubmitError(
      "We could not reach the server. Check your connection and try again.",
    )
  }

  let body: {
    success?: boolean
    message?: string
    errors?: Record<string, string>
  } = {}

  try {
    body = (await response.json()) as typeof body
  } catch {
    throw new EnquirySubmitError("The server returned an unexpected response. Please try again.")
  }

  if (!response.ok || !body.success) {
    throw new EnquirySubmitError(
      body.message || "We could not save your enquiry. Please try again in a moment.",
      body.errors,
    )
  }

  return "Thank you. Our agent will contact you soon."
}

async function submitToDesk(payload: EnquiryPayload) {
  const fields = new URLSearchParams({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    package: payload.packageName,
    from: payload.origin,
    to: payload.destination,
    tripType: tripLabel(payload.tripType),
    travelDate: payload.travelDate,
    returnDate: payload.returnDate || "Not required",
    adults: String(payload.adults),
    youth: String(payload.youth),
    children: String(payload.children),
    infants: String(payload.infants),
    message: payload.message || "Not provided",
    _subject: `New Travel Enquiry - ${payload.packageName} - ${payload.name}`,
    _template: "table",
    _captcha: "false",
    _replyto: payload.email,
  })

  let response: Response
  try {
    response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(DESK_EMAIL)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: fields.toString(),
    })
  } catch {
    throw new EnquirySubmitError(
      "We could not reach the server. Check your connection and try again.",
    )
  }

  let body: { success?: string | boolean; message?: string } = {}
  try {
    body = (await response.json()) as typeof body
  } catch {
    throw new EnquirySubmitError("The server returned an unexpected response. Please try again.")
  }

  if (body.success === true || body.success === "true") {
    return "Thank you. Our agent will contact you soon."
  }

  if (body.message?.toLowerCase().includes("activation")) {
    throw new EnquirySubmitError(
      "Open Contact@twenty4seventravel.com and click Activate Form, then send the enquiry again.",
    )
  }

  throw new EnquirySubmitError(
    body.message || "We could not send your enquiry. Please try again in a moment.",
  )
}

export async function submitEnquiry(payload: EnquiryPayload) {
  if (import.meta.env.DEV) return submitToLocalApi(payload)
  return submitToDesk(payload)
}
