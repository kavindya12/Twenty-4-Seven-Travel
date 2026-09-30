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
RESEND_API_KEY=
AGENT_EMAIL=agent@example.com
FROM_EMAIL=website@example.com
```

Leave `RESEND_API_KEY` empty while developing. The API still saves the enquiry and prints both emails in the server terminal. Add a Resend key, a verified `FROM_EMAIL`, and the agent address when you want real mail.

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
