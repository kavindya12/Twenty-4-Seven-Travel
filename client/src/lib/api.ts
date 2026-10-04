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

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000"

export async function submitEnquiry(payload: EnquiryPayload) {
  let response: Response

  try {
    response = await fetch(`${API_URL}/api/enquiries`, {
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

  if (body.message && body.message !== "Enquiry submitted successfully") {
    return body.message
  }

  return "Your enquiry has been submitted successfully!"
}
