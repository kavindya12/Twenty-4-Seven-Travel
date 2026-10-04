import { zodResolver } from "@hookform/resolvers/zod"
import { Minus, Plus, X } from "lucide-react"
import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { todayISODate } from "../lib/dates"
import { EnquirySubmitError, submitEnquiry } from "../lib/api"
import { AirportSearch } from "./AirportSearch"
import {
  enquiryFormSchema,
  travelerFields,
  tripTypeOptions,
  type EnquiryFormValues,
  type TravelerField,
} from "../lib/enquirySchema"

type ContactAgentModalProps = {
  packageId: string
  packageName: string
  defaultMessage: string
  defaultDestination?: string
  presentation?: "modal" | "inline"
  open?: boolean
  onClose?: () => void
}

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-ink outline-none focus:border-teal"

export function ContactAgentModal({
  packageId,
  packageName,
  defaultMessage,
  defaultDestination = "",
  presentation = "modal",
  open = false,
  onClose,
}: ContactAgentModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const today = todayISODate()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: emptyValues(defaultMessage),
  })

  const tripType = watch("tripType")
  const travelDate = watch("travelDate")
  const counts = {
    adults: watch("adults"),
    youth: watch("youth"),
    children: watch("children"),
    infants: watch("infants"),
  }
  const travelerTotal = counts.adults + counts.youth + counts.children + counts.infants

  useEffect(() => {
    if (presentation !== "modal") return
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    }
    if (!open && dialog.open) {
      dialog.close()
    }
  }, [open, presentation])

  useEffect(() => {
    if (presentation === "inline" || open) {
      setSuccessMessage(null)
      setFormError(null)
      reset(emptyValues(defaultMessage))
    }
  }, [open, defaultMessage, packageId, presentation, reset])

  function changeCount(field: TravelerField, next: number) {
    const rule = travelerFields.find((item) => item.key === field)
    const min = rule?.min ?? 0
    setValue(field, Math.min(20, Math.max(min, next)), { shouldValidate: true })
  }

  async function onSubmit(values: EnquiryFormValues) {
    setFormError(null)
    setSending(true)
    try {
      const message = await submitEnquiry({
        name: values.name,
        email: values.email,
        phone: values.phone,
        packageId,
        packageName,
        origin: values.origin,
        destination: values.destination,
        tripType: values.tripType,
        travelDate: values.travelDate,
        returnDate: values.tripType === "round-trip" ? values.returnDate : undefined,
        adults: values.adults,
        youth: values.youth,
        children: values.children,
        infants: values.infants,
        message: values.message,
      })
      setSuccessMessage(message)
    } catch (error) {
      if (error instanceof EnquirySubmitError) {
        setFormError(error.message)
        if (error.fieldErrors) {
          for (const [field, message] of Object.entries(error.fieldErrors)) {
            if (field in enquiryFormSchema.shape) {
              setError(field as keyof EnquiryFormValues, { message })
            }
          }
        }
        return
      }
      setFormError("We could not save your enquiry. Please try again in a moment.")
    } finally {
      setSending(false)
    }
  }

  const form = (
    <div className="w-full rounded-3xl bg-cream p-4 shadow-xl ring-1 ring-ink/10 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id={titleId} className="font-display text-2xl text-teal sm:text-3xl">
            Contact Travel Agent
          </h2>
          {packageId !== "general" ? (
            <>
              <p className="mt-3 text-sm text-mist">Package</p>
              <p className="font-medium">{packageName}</p>
            </>
          ) : null}
        </div>
        {presentation === "modal" ? (
          <button
            type="button"
            className="rounded-full p-2 text-ink hover:bg-cream-deep"
            aria-label="Close"
            onClick={onClose}
          >
            <X />
          </button>
        ) : null}
      </div>

      {successMessage ? (
        <p className="mt-8 rounded-2xl bg-teal px-4 py-5 text-cream" role="status">
          {successMessage}
        </p>
      ) : (
        <form className="mt-6 space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Field label="Full Name" required error={errors.name?.message}>
            <input className={fieldClass} autoComplete="name" {...register("name")} />
          </Field>
          <Field label="Email" required error={errors.email?.message}>
            <input className={fieldClass} type="email" autoComplete="email" {...register("email")} />
          </Field>
          <Field label="Phone / WhatsApp" required error={errors.phone?.message}>
            <input className={fieldClass} type="tel" autoComplete="tel" {...register("phone")} />
          </Field>
          <div>
            <p className="text-xs font-normal text-mist">Search airports worldwide by city, name, or code.</p>
            <div className="mt-1.5 grid gap-4 sm:grid-cols-2">
              <Field label="From" required error={errors.origin?.message}>
                <AirportSearch
                  value={watch("origin")}
                  invalid={Boolean(errors.origin)}
                  onChange={(next) => setValue("origin", next, { shouldValidate: next.length > 0 })}
                />
              </Field>
              <Field label="To" required error={errors.destination?.message}>
                <AirportSearch
                  value={watch("destination")}
                  initialQuery={defaultDestination}
                  invalid={Boolean(errors.destination)}
                  onChange={(next) => setValue("destination", next, { shouldValidate: next.length > 0 })}
                />
              </Field>
            </div>
          </div>

          <fieldset>
            <legend className="text-sm font-medium">
              Trip Type <span aria-hidden="true">*</span>
            </legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {tripTypeOptions.map((option) => {
                const selected = tripType === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={selected}
                    className={`rounded-full border px-2 py-2.5 text-sm font-medium transition ${
                      selected
                        ? "border-teal bg-teal text-cream"
                        : "border-ink/15 bg-white text-ink hover:border-teal/40"
                    }`}
                    onClick={() => {
                      setValue("tripType", option.value, { shouldValidate: true })
                      if (option.value !== "round-trip") {
                        setValue("returnDate", "", { shouldValidate: true })
                      }
                    }}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
            <input type="hidden" {...register("tripType")} />
            {errors.tripType?.message ? (
              <span className="mt-1 block text-sm font-normal text-terracotta">{errors.tripType.message}</span>
            ) : null}
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Travel Date" required error={errors.travelDate?.message}>
              <input className={fieldClass} type="date" min={today} {...register("travelDate")} />
            </Field>
            <Field label="Return Date" required={tripType === "round-trip"} error={errors.returnDate?.message}>
              <input
                className={`${fieldClass} disabled:cursor-not-allowed disabled:bg-cream-deep/60 disabled:text-mist`}
                type="date"
                min={travelDate || today}
                disabled={tripType !== "round-trip"}
                {...register("returnDate")}
              />
              {tripType === "round-trip" ? null : (
                <span className="mt-1 block text-xs font-normal text-mist">Required for a round trip</span>
              )}
            </Field>
          </div>

          <fieldset>
            <legend className="text-sm font-medium">
              Travelers <span aria-hidden="true">*</span>
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {travelerFields.map((category) => (
                <TravelerStepper
                  key={category.key}
                  label={category.label}
                  hint={category.hint}
                  value={counts[category.key]}
                  min={category.min}
                  error={errors[category.key]?.message}
                  onChange={(next) => changeCount(category.key, next)}
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-mist">
              {travelerTotal} {travelerTotal === 1 ? "traveler" : "travelers"}
            </p>
          </fieldset>

          <Field label="Message / Special Requests" error={errors.message?.message}>
            <textarea
              className={`${fieldClass} min-h-28 resize-y`}
              placeholder="Tell us anything that would help plan the trip."
              {...register("message")}
            />
          </Field>

          {formError ? (
            <p className="rounded-xl bg-terracotta/10 px-3 py-2 text-sm text-terracotta" role="alert">
              {formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-full bg-terracotta px-5 py-3 font-semibold text-cream hover:bg-terracotta/90 disabled:opacity-60"
          >
            {sending ? "Sending enquiry..." : "Send Inquiry"}
          </button>
        </form>
      )}
    </div>
  )

  if (presentation === "inline") {
    return form
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="bg-transparent"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose?.()
        }
      }}
    >
      {form}
    </dialog>
  )
}

function emptyValues(message: string): EnquiryFormValues {
  return {
    name: "",
    email: "",
    phone: "",
    origin: "",
    destination: "",
    tripType: "",
    travelDate: "",
    returnDate: "",
    adults: 1,
    youth: 0,
    children: 0,
    infants: 0,
    message,
  }
}

function TravelerStepper({
  label,
  hint,
  value,
  min,
  error,
  onChange,
}: {
  label: string
  hint: string
  value: number
  min: number
  error?: string
  onChange: (next: number) => void
}) {
  const errorId = useId()
  return (
    <div className={`rounded-2xl border bg-white p-3 ${error ? "border-terracotta" : "border-ink/10"}`}>
      <p className="text-sm font-medium text-ink">{label}</p>
      <p className="text-xs text-mist">{hint}</p>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink hover:bg-cream disabled:opacity-40"
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
        >
          <Minus size={16} />
        </button>
        <span className="font-display text-2xl text-ink" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream hover:bg-teal disabled:opacity-40"
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= 20}
          onClick={() => onChange(value + 1)}
        >
          <Plus size={16} />
        </button>
      </div>
      {error ? (
        <span id={errorId} className="mt-2 block text-xs font-normal text-terracotta">
          {error}
        </span>
      ) : null}
    </div>
  )
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: ReactNode
}) {
  const errorId = useId()
  return (
    <label className="block text-sm font-medium">
      <span>
        {label}
        {required ? " *" : null}
      </span>
      {hint ? <span className="mt-0.5 block text-xs font-normal text-mist">{hint}</span> : null}
      <div aria-invalid={error ? true : undefined} aria-describedby={error ? errorId : undefined}>
        {children}
      </div>
      {error ? (
        <span id={errorId} className="mt-1 block text-sm font-normal text-terracotta">
          {error}
        </span>
      ) : null}
    </label>
  )
}
