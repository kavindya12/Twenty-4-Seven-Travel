import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { EnquirySubmitError, submitEnquiry } from "../lib/api"
import { enquiryFormSchema, type EnquiryFormValues } from "../lib/enquirySchema"

type ContactAgentModalProps = {
  packageId: string
  packageName: string
  defaultMessage: string
  presentation?: "modal" | "inline"
  open?: boolean
  onClose?: () => void
}

const fieldClass =
  "mt-1 w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-ink outline-none focus:border-teal"

export function ContactAgentModal({
  packageId,
  packageName,
  defaultMessage,
  presentation = "modal",
  open = false,
  onClose,
}: ContactAgentModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      travelDate: "",
      travelers: 1,
      message: defaultMessage,
    },
  })

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
      reset({
        name: "",
        email: "",
        phone: "",
        travelDate: "",
        travelers: 1,
        message: defaultMessage,
      })
    }
  }, [open, defaultMessage, packageId, presentation, reset])

  async function onSubmit(values: EnquiryFormValues) {
    setFormError(null)
    setSending(true)
    try {
      const message = await submitEnquiry({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        packageId,
        packageName,
        travelDate: values.travelDate,
        travelers: values.travelers,
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
    <div className="w-full max-w-lg rounded-3xl bg-cream p-4 shadow-xl ring-1 ring-ink/10 sm:p-8">
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
          <Field label="Phone" error={errors.phone?.message}>
            <input className={fieldClass} type="tel" autoComplete="tel" {...register("phone")} />
          </Field>
          <Field label="Travel Date" required error={errors.travelDate?.message}>
            <input className={fieldClass} type="date" {...register("travelDate")} />
          </Field>
          <Field label="Number of Travelers" required error={errors.travelers?.message}>
            <input
              className={fieldClass}
              type="number"
              inputMode="numeric"
              {...register("travelers", { valueAsNumber: true })}
            />
          </Field>
          <Field label="Message" required error={errors.message?.message}>
            <textarea className={`${fieldClass} min-h-28 resize-y`} {...register("message")} />
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
            {sending ? "Sending enquiry..." : "Send Enquiry"}
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

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
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
