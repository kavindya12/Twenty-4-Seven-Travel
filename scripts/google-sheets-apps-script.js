/**
 * Twenty 4 Seven Travel — save enquiries to this Google Sheet
 *
 * Setup:
 * 1. Create a new Google Sheet with a row 1 header, e.g.:
 *    Submitted At | Name | Email | Phone | Package | From | To | Trip Type | Travel Date | Return Date | Adults | Youth | Children | Infants | Message
 * 2. Extensions → Apps Script → paste this file → set SHEET_SECRET below.
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web app URL into Vercel / .env as VITE_GOOGLE_SHEETS_WEBHOOK_URL (and optional secret).
 */

const SHEET_SECRET = "Twenty4Seven-Enquiry-Sheet-2026"

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents)
    if (body.secret !== SHEET_SECRET) {
      return json({ success: false, message: "Unauthorized" }, 403)
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      body.name || "",
      body.email || "",
      body.phone || "",
      body.packageName || "",
      body.packageId || "",
      body.origin || "",
      body.destination || "",
      body.tripType || "",
      body.travelDate || "",
      body.returnDate || "",
      Number(body.adults) || 0,
      Number(body.youth) || 0,
      Number(body.children) || 0,
      Number(body.infants) || 0,
      body.message || "",
    ])

    return json({ success: true })
  } catch (err) {
    return json({ success: false, message: String(err) }, 500)
  }
}

function json(data, status) {
  const out = ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  )
  if (status && status !== 200) {
    // Apps Script Web App always returns 200 to client; still log failures.
    console.error("Sheet append failed", status, data)
  }
  return out
}
