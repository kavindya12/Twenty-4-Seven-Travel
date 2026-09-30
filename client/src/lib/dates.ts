export function todayISODate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function travelDateError(value: string) {
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
