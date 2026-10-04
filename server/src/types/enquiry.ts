export const enquiryStatuses = ["new", "contacted", "follow-up", "confirmed", "cancelled"] as const

export type EnquiryStatus = (typeof enquiryStatuses)[number]

export type TravelerCounts = {
  adults: number
  youth: number
  children: number
  infants: number
}

export type Enquiry = {
  id: string
  name: string
  email: string
  phone: string
  packageId: string
  packageName: string
  origin: string
  destination: string
  tripType: string
  travelDate: string
  returnDate?: string
  travelers: TravelerCounts
  message: string
  status: EnquiryStatus
  createdAt: string
}

export type EnquiryInput = {
  name: string
  email: string
  phone: string
  packageId: string
  packageName: string
  origin: string
  destination: string
  tripType: string
  travelDate: string
  returnDate?: string
  travelers: TravelerCounts
  message: string
}
