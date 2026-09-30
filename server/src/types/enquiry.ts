export const enquiryStatuses = ["new", "contacted", "follow-up", "confirmed", "cancelled"] as const

export type EnquiryStatus = (typeof enquiryStatuses)[number]

export type Enquiry = {
  id: string
  name: string
  email: string
  phone?: string
  packageId: string
  packageName: string
  travelDate: string
  travelers: number
  message: string
  status: EnquiryStatus
  createdAt: string
}

export type EnquiryInput = {
  name: string
  email: string
  phone?: string
  packageId: string
  packageName: string
  travelDate: string
  travelers: number
  message: string
}
