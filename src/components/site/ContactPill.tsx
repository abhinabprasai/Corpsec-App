import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { isPointOnDark } from "@/lib/sectionTheme"

const WA_NUMBER = "33757905918"
const MAIL = "hello@corpsec.io"

/**
 * Global floating contact pill (WhatsApp + email), liquid glass. Replaces the
 * vanilla dashboard.js pill (which bails out when it finds this #contactPill).
 * Rendered once at the app root so it appears on every route — including the
 * inner pages the vanilla version never reached.
 *
 * Section-aware contrast: the original light-glass pill (rgba(240,242,244,.6))
 * composites *darker* over dark bands, sinking its dark ink text into the
 * background. We probe the zone beneath the pill and switch to an opaque,
 * brighter, harder-shadowed variant over dark sections so it stays legible.
 */
export default function ContactPill() {
  const { t } = useTranslation("common")
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  // fade/slide in shortly after mount (matches the legacy 1.2s reveal, trimmed)
  useEffect(() => {
    const t1 = window.setTimeout(() => setShown(true), 600)
    return () => window.clearTimeout(t1)
  }, [])

  // toggle the dark-section variant from the zone beneath the pill
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let ticking = false
    const update = () => {
      const r = el.getBoundingClientRect()
      const onDark = isPointOnDark(r.left + r.width / 2, r.top + r.height / 2)
      el.classList.toggle("contact-pill--on-dark", onDark)
    }
    const handler = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { update(); ticking = false })
    }
    window.addEventListener("scroll", handler, { passive: true })
    window.addEventListener("resize", handler, { passive: true })
    update()
    const settle = window.setTimeout(update, 350)
    return () => {
      window.removeEventListener("scroll", handler)
      window.removeEventListener("resize", handler)
      window.clearTimeout(settle)
    }
  }, [])

  return (
    <div ref={ref} id="contactPill" className={"contact-pill" + (shown ? " is-in" : "")}>
      <a
        className="cpill-btn cpill-wa"
        href={`https://wa.me/${WA_NUMBER}`}
        target="_blank"
        rel="noopener"
        aria-label={t("contactPill.whatsappAria")}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
        </svg>
        <span className="cpill-label">{t("contactPill.whatsapp")}</span>
      </a>
      <span className="cpill-sep" aria-hidden="true"></span>
      <a className="cpill-btn cpill-mail" href={`mailto:${MAIL}`} aria-label={t("contactPill.emailAria")}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        <span className="cpill-label">{t("contactPill.email")}</span>
      </a>
    </div>
  )
}
