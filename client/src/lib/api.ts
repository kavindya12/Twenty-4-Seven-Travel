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

import { appendEnquiryToGoogleSheet } from "./googleSheets"

const LOCAL_API = import.meta.env.VITE_API_URL || "http://localhost:5000"
const SUBMIT_TIMEOUT_MS = 25_000

function enquiryEndpoint() {
  if (import.meta.env.DEV) {
    return `${LOCAL_API}/api/enquiries`
  }
  return "/api/enquiries"
}

async function logEnquiryToSheet(payload: EnquiryPayload) {
  void appendEnquiryToGoogleSheet(payload)
}

async function submitToApi(payload: EnquiryPayload) {
  let response: Response

  try {
    response = await fetch(enquiryEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
    })
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new EnquirySubmitError(
        "The request took too long. If you are developing locally, run npm run dev from the project root so the API server starts.",
      )
    }
    throw new EnquirySubmitError(
      import.meta.env.DEV
        ? "We could not reach the API on port 5000. Run npm run dev from the project root (client + server)."
        : "We could not reach the server. Check your connection and try again.",
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

  void logEnquiryToSheet(payload)
  return "Thank you. Our agent will contact you soon."
}

export async function submitEnquiry(payload: EnquiryPayload) {
  return submitToApi(payload)
}
