export type ContactLine = {
  region: string
  display: string
  tel: string
  whatsapp: string
}

export const contactLines: ContactLine[] = [
  {
    region: "Sri Lanka",
    display: "+94 77 086 1851",
    tel: "+94770861851",
    whatsapp: "94770861851",
  },
  {
    region: "United Kingdom",
    display: "+44 7848 102798",
    tel: "+447848102798",
    whatsapp: "447848102798",
  },
]

export function whatsappUrl(digits: string) {
  return `https://wa.me/${digits}`
}

export const deskLocation = "Colombo, Sri Lanka"
export const supportEmail = "support@twenty4seventravel.com"
export const businessRegistration = "WP/COL/KW/2026/00308"

export const ukContact =
  contactLines.find((line) => line.region === "United Kingdom") ?? contactLines[contactLines.length - 1]
