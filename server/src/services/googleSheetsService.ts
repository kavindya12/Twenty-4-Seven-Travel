import type { Enquiry } from "../types/enquiry"

export async function appendEnquiryToGoogleSheet(enquiry: Enquiry) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim()
  if (!url) return

  const { adults, youth, children, infants } = enquiry.travelers
  const body = {
    secret: process.env.GOOGLE_SHEETS_SECRET?.trim() || undefined,
    submittedAt: enquiry.createdAt,
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    packageId: enquiry.packageId,
    packageName: enquiry.packageName,
    origin: enquiry.origin,
    destination: enquiry.destination,
    tripType: enquiry.tripType,
    travelDate: enquiry.travelDate,
    returnDate: enquiry.returnDate || "",
    adults,
    youth,
    children,
    infants,
    message: enquiry.message,
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch (error) {
    console.error("Failed to append enquiry to Google Sheet", error)
  }
}
