import { ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"
import { WhatsAppIcon } from "../WhatsAppIcon"
import { ukContact, whatsappUrl } from "../../lib/contact"

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col gap-3 sm:right-6 sm:bottom-6">
      <a
        href={whatsappUrl(ukContact.whatsapp)}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp UK ${ukContact.display}`}
        title={ukContact.display}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink/20 transition hover:scale-105"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </a>
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-teal text-cream shadow-lg shadow-ink/20 transition hover:scale-105 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ChevronUp size={22} />
      </button>
    </div>
  )
}
