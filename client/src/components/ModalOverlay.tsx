import { useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"

type ModalOverlayProps = {
  open: boolean
  onClose?: () => void
  labelledBy: string
  children: ReactNode
}

export function ModalOverlay({ open, onClose, labelledBy, children }: ModalOverlayProps) {
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.querySelectorAll("dialog").forEach((node) => {
      const dialog = node as HTMLDialogElement
      try {
        dialog.close()
      } catch {
        /* ignore */
      }
      dialog.remove()
    })
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-[#0d1418]/70 backdrop-blur-[3px]"
        aria-hidden
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative z-10 flex w-full max-w-[40rem] max-h-[100dvh] flex-col sm:max-h-[calc(100dvh-2rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-scroll max-h-[inherit] overflow-y-auto overscroll-contain">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
