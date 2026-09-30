import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import type { Enquiry, EnquiryInput } from "../types/enquiry"

const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../data/enquiries.json")

let queue: Promise<void> = Promise.resolve()

function enqueue<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task)
  queue = run.then(
    () => undefined,
    () => undefined,
  )
  return run
}

export async function readEnquiries(): Promise<Enquiry[]> {
  const raw = await readFile(filePath, "utf8")
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) {
    throw new Error("enquiries.json must contain an array")
  }
  return parsed as Enquiry[]
}

export async function saveEnquiries(enquiries: Enquiry[]) {
  await writeFile(filePath, `${JSON.stringify(enquiries, null, 2)}\n`, "utf8")
}

function nextId(enquiries: Enquiry[]) {
  const highest = enquiries.reduce((max, enquiry) => {
    const match = /^ENQ-(\d+)$/.exec(enquiry.id)
    const value = match ? Number(match[1]) : 0
    return Math.max(max, value)
  }, 0)
  return `ENQ-${String(highest + 1).padStart(3, "0")}`
}

export function addEnquiry(input: EnquiryInput) {
  return enqueue(async () => {
    const enquiries = await readEnquiries()
    const enquiry: Enquiry = {
      id: nextId(enquiries),
      name: input.name,
      email: input.email,
      ...(input.phone ? { phone: input.phone } : {}),
      packageId: input.packageId,
      packageName: input.packageName,
      travelDate: input.travelDate,
      travelers: input.travelers,
      message: input.message,
      status: "new",
      createdAt: new Date().toISOString(),
    }
    enquiries.push(enquiry)
    await saveEnquiries(enquiries)
    return enquiry
  })
}
