import nodemailer from "nodemailer"
import { Resend } from "resend"

const FORM_TIMEOUT_MS = 10_000

function deskEmail() {
  return (process.env.AGENT_EMAIL || "support@twenty4seventravel.com").trim()
}

function fromEmail() {
  return (process.env.FROM_EMAIL || deskEmail()).trim()
}

function smtpUser() {
  return (process.env.SMTP_USER || fromEmail()).trim()
}

function smtpConfigured() {
  return Boolean(process.env.SMTP_PASS?.trim() && smtpUser())
}

function resendConfigured() {
  return Boolean(process.env.RESEND_API_KEY && fromEmail() && deskEmail())
}

function buildAgentText(details) {
  const {
    name,
    email,
    phone,
    packageName,
    origin,
    destination,
    tripType,
    travelDate,
    returnDate,
    adults,
    youth,
    children,
    infants,
    message,
    submittedAt,
  } = details

  return `NEW TRAVEL ENQUIRY
==============================

Customer: ${name}
Email: ${email}
Phone / WhatsApp: ${phone}

Package: ${packageName}
From: ${origin}
To: ${destination}
Trip type: ${tripType}
Travel date: ${travelDate}
Return date: ${returnDate || "Not required"}

Travelers:
Adults (16+): ${adults}
Youth (12–15): ${youth}
Children (2–11): ${children}
Infants (under 2): ${infants}

Message:
${message || "Not provided"}

Submitted: ${submittedAt}
`
}

async function sendWithSmtp({ subject, agentText, customerEmail, customerName, packageName }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.zoho.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: smtpUser(),
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"Twenty 4 Seven Travel" <${fromEmail()}>`,
    to: deskEmail(),
    replyTo: customerEmail,
    subject,
    text: agentText,
  })

  const customerText = `Hello ${customerName},

Thank you for contacting Twenty 4 Seven Travel.

We have received your enquiry for ${packageName}.

Our travel agent will review your request and contact you soon.

Thank you,
Twenty 4 Seven Travel
${deskEmail()}
`

  try {
    await transporter.sendMail({
      from: `"Twenty 4 Seven Travel" <${fromEmail()}>`,
      to: customerEmail,
      replyTo: deskEmail(),
      subject: "We received your travel enquiry",
      text: customerText,
    })
  } catch (error) {
    console.error("SMTP customer autoresponse failed", error)
  }

  return { delivered: true, method: "smtp" }
}

async function sendWithResend({ subject, agentText, customerEmail, customerName, packageName }) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const agent = await resend.emails.send({
    from: fromEmail(),
    to: deskEmail(),
    replyTo: customerEmail,
    subject,
    text: agentText,
  })

  if (agent.error) {
    console.error("Resend agent email failed", agent.error)
    return { delivered: false, method: "resend", error: agent.error.message }
  }

  const customerText = `Hello ${customerName},

Thank you for contacting Twenty 4 Seven Travel.

We have received your enquiry for ${packageName}.

Our travel agent will review your request and contact you soon.

Thank you,
Twenty 4 Seven Travel
${deskEmail()}
`

  await resend.emails.send({
    from: fromEmail(),
    to: customerEmail,
    replyTo: deskEmail(),
    subject: "We received your travel enquiry",
    text: customerText,
  })

  return { delivered: true, method: "resend" }
}

async function readJsonSafe(response) {
  const raw = await response.text()
  try {
    return JSON.parse(raw)
  } catch {
    if (raw.trimStart().startsWith("<")) {
      return { success: false, message: "Email relay returned an HTML error page." }
    }
    return { success: false, message: raw.slice(0, 160) || "Invalid response from email relay." }
  }
}

async function sendWithFormSubmit({ site, fields }) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(deskEmail())}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      Origin: site,
      Referer: `${site}/contact`,
    },
    body: fields.toString(),
    signal: AbortSignal.timeout(FORM_TIMEOUT_MS),
  })

  const result = await readJsonSafe(response)
  const ok = result.success === true || result.success === "true"
  if (!ok) {
    const message = result.message || `HTTP ${response.status}`
    if (String(message).toLowerCase().includes("activation")) {
      return {
        delivered: false,
        method: "formsubmit",
        error: "FormSubmit is not activated for the desk inbox. Activate it in Zoho, or set SMTP on Vercel.",
      }
    }
    return { delivered: false, method: "formsubmit", error: message }
  }

  return { delivered: true, method: "formsubmit" }
}

function deskMailNotConfiguredMessage() {
  return "Desk email is not configured yet. In Vercel → Settings → Environment Variables, add one variable: SMTP_PASS = your Zoho app password, then Redeploy."
}

export async function sendDeskEnquiryEmail({ site, fields, details }) {
  const subject = `New Travel Enquiry - ${details.packageName} - ${details.name}`
  const agentText = buildAgentText(details)

  if (smtpConfigured()) {
    try {
      return await sendWithSmtp({
        subject,
        agentText,
        customerEmail: details.email,
        customerName: details.name,
        packageName: details.packageName,
      })
    } catch (error) {
      console.error("SMTP send failed", error)
    }
  }

  if (resendConfigured()) {
    try {
      const result = await sendWithResend({
        subject,
        agentText,
        customerEmail: details.email,
        customerName: details.name,
        packageName: details.packageName,
      })
      if (result.delivered) return result
    } catch (error) {
      console.error("Resend send failed", error)
    }
  }

  if (process.env.ENABLE_FORMSUBMIT === "true") {
    try {
      return await sendWithFormSubmit({ site, fields })
    } catch (error) {
      const detail = error instanceof Error ? error.message : "FormSubmit failed"
      return { delivered: false, method: "formsubmit", error: detail }
    }
  }

  return { delivered: false, method: "none", error: deskMailNotConfiguredMessage() }
}