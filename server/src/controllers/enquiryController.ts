import type { Request, Response } from "express"
import { sendEnquiryEmails } from "../services/emailService"
import { addEnquiry } from "../utils/fileStorage"
import { enquiryBodySchema, fieldErrors } from "../utils/validation"

export async function createEnquiry(req: Request, res: Response) {
  const parsed = enquiryBodySchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Please correct the highlighted fields.",
      errors: fieldErrors(parsed.error),
    })
    return
  }

  const returnDate = parsed.data.tripType === "round-trip" ? parsed.data.returnDate?.trim() : ""

  let enquiry
  try {
    enquiry = await addEnquiry({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      packageId: parsed.data.packageId,
      packageName: parsed.data.packageName,
      origin: parsed.data.origin,
      destination: parsed.data.destination,
      tripType: parsed.data.tripType,
      travelDate: parsed.data.travelDate,
      returnDate: returnDate || undefined,
      travelers: {
        adults: parsed.data.adults,
        youth: parsed.data.youth,
        children: parsed.data.children,
        infants: parsed.data.infants,
      },
      message: parsed.data.message?.trim() ?? "",
    })
  } catch (error) {
    console.error("Failed to store enquiry", error)
    res.status(500).json({
      success: false,
      message: "We could not save your enquiry. Please try again in a moment.",
    })
    return
  }

  try {
    const emailResult = await sendEnquiryEmails(enquiry)
    if (emailResult.attempted && !emailResult.delivered) {
      res.status(200).json({
        success: true,
        message:
          "Your enquiry was saved, but we could not send the notification email. Our team still has your request.",
      })
      return
    }
  } catch (error) {
    console.error("Failed to send enquiry email", error)
    res.status(200).json({
      success: true,
      message:
        "Your enquiry was saved, but we could not send the notification email. Our team still has your request.",
    })
    return
  }

  res.status(201).json({
    success: true,
    message: "Enquiry submitted successfully",
  })
}
