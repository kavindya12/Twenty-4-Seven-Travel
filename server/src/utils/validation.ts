import { z } from "zod"

function todayISODate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function travelDateError(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return "Enter a valid travel date."
  }

  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  const isRealDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day

  if (!isRealDate) {
    return "Enter a valid travel date."
  }

  if (value < todayISODate()) {
    return "Travel date cannot be in the past."
  }

  return null
}

export const enquiryBodySchema = z.object({
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
    .max(30, "Phone must be 30 characters or fewer.")
    .optional()
    .or(z.literal("")),
  packageId: z
    .string()
    .trim()
    .min(1, "Package is required.")
    .max(80, "Package id is too long."),
  packageName: z
    .string()
    .trim()
    .min(1, "Package name is required.")
    .max(120, "Package name is too long."),
  travelDate: z.string().superRefine((value, context) => {
    const message = travelDateError(value)
    if (message) {
      context.addIssue({ code: "custom", message })
    }
  }),
  travelers: z.coerce
    .number()
    .int("Enter a whole number of travelers.")
    .min(1, "At least 1 traveler is required.")
    .max(50, "For groups larger than 50, please contact us directly."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be 2000 characters or fewer."),
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
