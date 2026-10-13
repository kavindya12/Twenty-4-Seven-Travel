# 247 Travel

A small travel site with a React frontend and an Express API. Package pages include a Contact Agent form. Enquiries are stored in a private JSON file and emailed with Resend.

This is a first version for a portfolio or low-volume site. The JSON file is not a production database. It can be lost on hosts with a temporary filesystem, and it is not built for many people submitting at the same moment. A later version can move storage to Postgres without changing the form the visitor sees.

## Structure

```text
client/   React, Vite, TypeScript, Tailwind
server/   Express, TypeScript, enquiries.json, Resend
```

The enquiry file lives at `server/data/enquiries.json`. The API does not serve that folder.

## Setup

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Copy the example env files if you do not already have them:

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

Backend variables in `server/.env`:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
AGENT_EMAIL=contact@twenty4seventravel.com
FROM_EMAIL=contact@twenty4seventravel.com
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=contact@twenty4seventravel.com
SMTP_PASS=
RESEND_API_KEY=
```

The desk mailbox is on Microsoft 365. Put that mailbox password in `SMTP_PASS` so Send Inquiry delivers the full enquiry to `AGENT_EMAIL`. Until that password is set, the API still saves the enquiry and prints the email in the server terminal, and the form says the notification could not be sent.

Frontend variable in `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## Run

```bash
npm run dev
```

- Site: http://localhost:5173
- API: http://localhost:5000

`npm run dev:client` and `npm run dev:server` start each side on its own.

## Enquiry API

`POST /api/enquiries` accepts JSON, checks the fields again on the server, stores the enquiry with status `new`, and sends the agent and customer emails.

The route allows 5 submissions from the same IP every 15 minutes. CORS only allows `FRONTEND_URL`.
