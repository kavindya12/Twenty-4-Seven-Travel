import { Resend } from "resend"
import type { Enquiry } from "../types/enquiry"

function formatLongDate(isoDate: string) {
  const [year, month, day] = isoDate.slice(0, 10).split("-").map(Number)
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

function statusLabel(status: Enquiry["status"]) {
  if (status === "follow-up") return "Follow-up"
  return status.charAt(0).toUpperCase() + status.slice(1)
}

function agentEmail(enquiry: Enquiry) {
  return {
    to: process.env.AGENT_EMAIL ?? "",
    subject: `New Travel Enquiry - ${enquiry.packageName}`,
    text: `NEW TRAVEL ENQUIRY
==============================

Enquiry ID:
${enquiry.id}

Customer:
${enquiry.name}

Email:
${enquiry.email}

Phone:
${enquiry.phone || "Not provided"}

Package:
${enquiry.packageName}

Travel Date:
${formatLongDate(enquiry.travelDate)}

Number of Travelers:
${enquiry.travelers}

Message:
${enquiry.message}

Status:
${statusLabel(enquiry.status)}

Submitted:
${formatLongDate(enquiry.createdAt)}
`,
  }
}

function customerEmail(enquiry: Enquiry) {
  return {
    to: enquiry.email,
    subject: "We received your travel enquiry",
    text: `Hello ${enquiry.name},

Thank you for contacting us.

We have received your enquiry for:

${enquiry.packageName}

Our travel agent will review your request and contact you soon.

Enquiry ID:
${enquiry.id}

Thank you,
Travel Team
`,
  }
}

export async function sendEnquiryEmails(enquiry: Enquiry) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.FROM_EMAIL
  const messages = [agentEmail(enquiry), customerEmail(enquiry)]

  if (!apiKey) {
    for (const message of messages) {
      console.log("--- Email logged (RESEND_API_KEY is not set) ---")
      console.log(`To: ${message.to}`)
      console.log(`Subject: ${message.subject}`)
      console.log(message.text)
    }
    return { delivered: true, attempted: false }
  }

  if (!from || !process.env.AGENT_EMAIL) {
    console.error("FROM_EMAIL or AGENT_EMAIL is missing")
    return { delivered: false, attempted: true }
  }

  const resend = new Resend(apiKey)
  let delivered = true

  for (const message of messages) {
    const { error } = await resend.emails.send({
      from,
      to: message.to,
      subject: message.subject,
      text: message.text,
    })
    if (error) {
      console.error("Resend error", error)
      delivered = false
    }
  }

  return { delivered, attempted: true }
}
