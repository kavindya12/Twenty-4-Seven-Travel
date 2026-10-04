import { z } from "zod"

function todayISODate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function dateError(value: string, label: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `Enter a valid ${label.toLowerCase()}.`
  }

  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  const isRealDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day

  if (!isRealDate) {
    return `Enter a valid ${label.toLowerCase()}.`
  }

  if (value < todayISODate()) {
    return `${label} cannot be in the past.`
  }

  return null
}

function travelDateError(value: string) {
  return dateError(value, "Travel date")
}

const tripTypes = ["one-way", "round-trip"] as const

const count = (min: number) =>
  z.coerce
    .number()
    .int("Enter a whole number.")
    .min(min, min === 1 ? "At least 1 adult is required." : "This cannot be less than 0.")
    .max(20, "Enter 20 or fewer for this group.")

export const enquiryBodySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name must be 100 characters or fewer."),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address.")
      .max(200, "Email must be 200 characters or fewer."),
    phone: z
      .string()
      .trim()
      .min(7, "Enter a phone or WhatsApp number.")
      .max(30, "Phone must be 30 characters or fewer."),
    packageId: z.string().trim().min(1, "Package is required.").max(80, "Package id is too long."),
    packageName: z
      .string()
      .trim()
      .min(1, "Package name is required.")
      .max(120, "Package name is too long."),
    origin: z.string().trim().min(1, "Choose a departure airport.").max(160, "Airport name is too long."),
    destination: z.string().trim().min(1, "Choose an arrival airport.").max(160, "Airport name is too long."),
    tripType: z.enum(tripTypes, { error: "Choose a trip type." }),
    travelDate: z.string().superRefine((value, context) => {
      const message = travelDateError(value)
      if (message) {
        context.addIssue({ code: "custom", message })
      }
    }),
    returnDate: z.string().optional().or(z.literal("")),
    adults: count(1),
    youth: count(0),
    children: count(0),
    infants: count(0),
    message: z.string().trim().max(2000, "Message must be 2000 characters or fewer.").optional().or(z.literal("")),
  })
  .superRefine((value, context) => {
    const total = value.adults + value.youth + value.children + value.infants
    if (total > 50) {
      context.addIssue({
        code: "custom",
        path: ["adults"],
        message: "For groups larger than 50, please contact us directly.",
      })
    }

    if (value.tripType !== "round-trip") return

    const message = dateError(value.returnDate ?? "", "Return date")
    if (message) {
      context.addIssue({ code: "custom", path: ["returnDate"], message })
      return
    }

    if (value.travelDate && value.returnDate && value.returnDate < value.travelDate) {
      context.addIssue({
        code: "custom",
        path: ["returnDate"],
        message: "Return date must be on or after the travel date.",
      })
    }
  })

export function fieldErrors(error: z.ZodError) {
  const errors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key === "string" && !errors[key]) {
      errors[key] = issue.message
    }
  }
  return errors
}
