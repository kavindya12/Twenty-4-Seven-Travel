import { z } from "zod"
import { travelDateError } from "./dates"

export const enquiryFormSchema = z.object({
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
  phone: z.string().trim().max(30, "Phone must be 30 characters or fewer."),
  travelDate: z.string().superRefine((value, context) => {
    const message = travelDateError(value)
    if (message) {
      context.addIssue({ code: "custom", message })
    }
  }),
  travelers: z
    .number({ error: "Enter the number of travelers." })
    .int("Enter a whole number of travelers.")
    .min(1, "At least 1 traveler is required.")
    .max(50, "For groups larger than 50, please contact us directly."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be 2000 characters or fewer."),
})

export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>

export const GENERAL_MESSAGE = "I would like help planning a trip."
