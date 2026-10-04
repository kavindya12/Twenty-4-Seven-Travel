import { z } from "zod"
import { travelDateError } from "./dates"

export const tripTypeValues = ["one-way", "round-trip"] as const

export type TripType = (typeof tripTypeValues)[number]

export const tripTypeOptions: { value: TripType; label: string }[] = [
  { value: "one-way", label: "One Way" },
  { value: "round-trip", label: "Round Trip" },
]

export const travelerFields = [
  { key: "adults", label: "Adults", hint: "16+ years", min: 1 },
  { key: "youth", label: "Youth", hint: "12–15 years", min: 0 },
  { key: "children", label: "Children", hint: "2–11 years", min: 0 },
  { key: "infants", label: "Infants", hint: "Under 2 years", min: 0 },
] as const

export type TravelerField = (typeof travelerFields)[number]["key"]

const count = (min: number, emptyMessage: string) =>
  z
    .number({ error: emptyMessage })
    .int("Enter a whole number.")
    .min(min, min === 1 ? "At least 1 adult is required." : "This cannot be less than 0.")
    .max(20, "Enter 20 or fewer for this group.")

export const enquiryFormSchema = z
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
    origin: z.string().trim().min(1, "Choose a departure airport.").max(160, "Airport name is too long."),
    destination: z.string().trim().min(1, "Choose an arrival airport.").max(160, "Airport name is too long."),
    tripType: z.string(),
    travelDate: z.string().superRefine((value, context) => {
      const message = travelDateError(value)
      if (message) {
        context.addIssue({ code: "custom", message })
      }
    }),
    returnDate: z.string(),
    adults: count(1, "Enter the number of adults."),
    youth: count(0, "Enter the number of youth."),
    children: count(0, "Enter the number of children."),
    infants: count(0, "Enter the number of infants."),
    message: z.string().trim().max(2000, "Message must be 2000 characters or fewer."),
  })
  .superRefine((value, context) => {
    if (!tripTypeValues.includes(value.tripType as TripType)) {
      context.addIssue({ code: "custom", path: ["tripType"], message: "Choose a trip type." })
    }

    const total = value.adults + value.youth + value.children + value.infants
    if (total > 50) {
      context.addIssue({
        code: "custom",
        path: ["adults"],
        message: "For groups larger than 50, please contact us directly.",
      })
    }

    if (value.tripType !== "round-trip") return

    const dateMessage = travelDateError(value.returnDate)
    if (dateMessage) {
      context.addIssue({
        code: "custom",
        path: ["returnDate"],
        message: dateMessage.includes("past")
          ? "Return date cannot be in the past."
          : "Enter a valid return date.",
      })
      return
    }

    if (value.travelDate && value.returnDate < value.travelDate) {
      context.addIssue({
        code: "custom",
        path: ["returnDate"],
        message: "Return date must be on or after the travel date.",
      })
    }
  })

export type EnquiryFormValues = z.infer<typeof enquiryFormSchema>

export const BOOKING_MESSAGE =
  "I would like to book this trip. Please share availability and the next steps."
