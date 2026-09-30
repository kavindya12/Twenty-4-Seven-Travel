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

  const phone = typeof parsed.data.phone === "string" ? parsed.data.phone.trim() : ""

  let enquiry
  try {
    enquiry = await addEnquiry({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: phone || undefined,
      packageId: parsed.data.packageId,
      packageName: parsed.data.packageName,
      travelDate: parsed.data.travelDate,
      travelers: parsed.data.travelers,
      message: parsed.data.message,
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
