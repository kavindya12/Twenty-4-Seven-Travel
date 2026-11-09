import type { EnquiryPayload } from "./api"

type SheetsRow = EnquiryPayload & {
  submittedAt: string
  secret?: string
}

export async function appendEnquiryToGoogleSheet(payload: EnquiryPayload) {
  const url = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL?.trim()
  if (!url) return

  const body: SheetsRow = {
    ...payload,
    submittedAt: new Date().toISOString(),
    secret: import.meta.env.VITE_GOOGLE_SHEETS_SECRET?.trim() || undefined,
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch {
    /* Sheet logging must not block the enquiry */
  }
}
