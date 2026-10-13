import nodemailer from "nodemailer"
import { Resend } from "resend"
import type { Enquiry } from "../types/enquiry"

const deskEmail = () => process.env.AGENT_EMAIL ?? ""

function formatLongDate(isoDate: string) {
  const [year, month, day] = isoDate.slice(0, 10).split("-").map(Number)
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

function formatSubmitted(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Colombo",
    hourCycle: "h23",
  }).format(new Date(isoDate))
}

function statusLabel(status: Enquiry["status"]) {
  if (status === "follow-up") return "Follow-up"
  return status.charAt(0).toUpperCase() + status.slice(1)
}

function tripTypeLabel(tripType: string) {
  if (tripType === "round-trip") return "Round Trip"
  return "One Way"
}

function travelerLines(enquiry: Enquiry) {
  const { adults, youth, children, infants } = enquiry.travelers
  const total = adults + youth + children + infants
  return `Adults (16+): ${adults}
Youth (12–15): ${youth}
Children (2–11): ${children}
Infants (under 2): ${infants}
Total: ${total}`
}

type OutboundMail = {
  to: string
  replyTo?: string
  subject: string
  text: string
  required: boolean
}

function agentEmail(enquiry: Enquiry): OutboundMail {
  return {
    to: deskEmail(),
    replyTo: enquiry.email,
    required: true,
    subject: `New Travel Enquiry - ${enquiry.packageName} - ${enquiry.name}`,
    text: `NEW TRAVEL ENQUIRY
==============================

Enquiry ID:
${enquiry.id}

Customer:
${enquiry.name}

Email:
${enquiry.email}

Phone / WhatsApp:
${enquiry.phone}

Package:
${enquiry.packageName}

From:
${enquiry.origin}

To:
${enquiry.destination}

Trip Type:
${tripTypeLabel(enquiry.tripType)}

Travel Date:
${formatLongDate(enquiry.travelDate)}

Return Date:
${enquiry.returnDate ? formatLongDate(enquiry.returnDate) : "Not required"}

Travelers:
${travelerLines(enquiry)}

Message:
${enquiry.message || "Not provided"}

Status:
${statusLabel(enquiry.status)}

Submitted:
${formatSubmitted(enquiry.createdAt)} (Sri Lanka time)
`,
  }
}

function customerEmail(enquiry: Enquiry): OutboundMail {
  return {
    to: enquiry.email,
    replyTo: deskEmail(),
    required: false,
    subject: "We received your travel enquiry",
    text: `Hello ${enquiry.name},

Thank you for contacting Twenty 4 Seven Travel.

We have received your enquiry for:

${enquiry.packageName}

From: ${enquiry.origin}
To: ${enquiry.destination}
Travel date: ${formatLongDate(enquiry.travelDate)}
${enquiry.returnDate ? `Return date: ${formatLongDate(enquiry.returnDate)}\n` : ""}
Our travel agent will review your request and contact you soon.

Enquiry ID:
${enquiry.id}

Thank you,
Twenty 4 Seven Travel
${deskEmail()}
`,
  }
}

function smtpConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS && process.env.FROM_EMAIL && deskEmail())
}

async function sendWithSmtp(messages: OutboundMail[]) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.office365.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  let delivered = true

  for (const message of messages) {
    try {
      await transporter.sendMail({
        from: `"Twenty 4 Seven Travel" <${process.env.FROM_EMAIL}>`,
        to: message.to,
        replyTo: message.replyTo,
        subject: message.subject,
        text: message.text,
      })
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown mail error"
      console.error(`SMTP error sending to ${message.to}: ${detail}`)
      if (message.required) delivered = false
    }
  }

  return { delivered, attempted: true }
}

async function sendWithResend(messages: OutboundMail[]) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.FROM_EMAIL
  if (!apiKey || !from || !deskEmail()) {
    return null
  }

  const resend = new Resend(apiKey)
  let delivered = true

  for (const message of messages) {
    const { error } = await resend.emails.send({
      from,
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
    })
    if (error) {
      console.error(`Resend error sending to ${message.to}`, error)
      if (message.required) delivered = false
    }
  }

  return { delivered, attempted: true }
}

async function sendWithFormSubmit(enquiry: Enquiry) {
  const origin = "http://localhost:5174"
  const fields = new URLSearchParams({
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    package: enquiry.packageName,
    from: enquiry.origin,
    to: enquiry.destination,
    tripType: tripTypeLabel(enquiry.tripType),
    travelDate: formatLongDate(enquiry.travelDate),
    returnDate: enquiry.returnDate ? formatLongDate(enquiry.returnDate) : "Not required",
    travelers: travelerLines(enquiry),
    message: enquiry.message || "Not provided",
    enquiryId: enquiry.id,
    submitted: formatSubmitted(enquiry.createdAt),
    _subject: `New Travel Enquiry - ${enquiry.packageName} - ${enquiry.name}`,
    _template: "table",
    _captcha: "false",
    _replyto: enquiry.email,
    _autoresponse: `Hello ${enquiry.name},

Thank you for contacting Twenty 4 Seven Travel.

We have received your enquiry for ${enquiry.packageName}.
Enquiry ID: ${enquiry.id}

Our travel agent will review your request and contact you soon.

Twenty 4 Seven Travel
${deskEmail()}`,
  })

  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(deskEmail())}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Origin: origin,
      Referer: `${origin}/contact`,
    },
    body: fields.toString(),
  })

  const body = (await response.json()) as { success?: string | boolean; message?: string }
  const delivered = body.success === true || body.success === "true"
  if (!delivered) {
    console.error("Desk email was not accepted", body.message ?? response.status)
  }
  return { delivered, attempted: true }
}

export async function sendEnquiryEmails(enquiry: Enquiry) {
  if (!deskEmail()) {
    console.error("AGENT_EMAIL is missing.")
    return { delivered: false, attempted: false }
  }

  return sendWithFormSubmit(enquiry)
}
