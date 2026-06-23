import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import { SUPPORTED, LANG_LABEL, LANG_SHORT, type Lang } from "@/i18n/config"

const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
  </svg>
)

/**
 * Language selector for the nav. Replaces the old static "EN" locale chip with
 * an accessible disclosure menu (button + listbox) that swaps the site language
 * at runtime via i18next. The choice is persisted to localStorage by the
 * language detector, so it survives reloads and route changes.
 */
export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation("common")
  const [open, setOpen] = useState(false)
  const [menuPos, setMenuPos] = useState<{ top: number; right: number }>({ top: 0, right: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const current = (SUPPORTED as readonly string[]).includes(i18n.language)
    ? (i18n.language as Lang)
    : "en"

  const computePos = () => {
    if (!btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    setMenuPos({ top: r.bottom + 10, right: window.innerWidth - r.right })
  }

  const toggle = () => {
    if (!open) computePos()
    setOpen((v) => !v)
  }

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node
      const inBtn = btnRef.current?.contains(target)
      const inMenu = menuRef.current?.contains(target)
      if (!inBtn && !inMenu) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btnRef.current?.focus() } }
    const onScroll = () => computePos()
    const onResize = () => computePos()
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

  const choose = (lng: Lang) => {
    i18n.changeLanguage(lng)
    setOpen(false)
    btnRef.current?.focus()
  }

  const menu = open ? (
    <ul
      ref={menuRef}
      className="lang-switch__menu"
      role="listbox"
      aria-label={t("language.label")}
      style={{ position: "fixed", top: menuPos.top, right: menuPos.right, left: "auto" }}
    >
      {SUPPORTED.map((lng) => (
        <li key={lng} role="option" aria-selected={lng === current}>
          <button
            type="button"
            className={"lang-switch__opt" + (lng === current ? " is-active" : "")}
            onClick={() => choose(lng)}
          >
            <span>{LANG_LABEL[lng]}</span>
            {lng === current && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="m20 6-11 11-5-5" />
              </svg>
            )}
          </button>
        </li>
      ))}
    </ul>
  ) : null

  return (
    <div className="lang-switch">
      <button
        ref={btnRef}
        type="button"
        className="locale lang-switch__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language.select")}
        onClick={toggle}
      >
        <GlobeIcon />
        <span className="lang-switch__code">{LANG_SHORT[current]}</span>
        <svg className="lang-switch__caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {createPortal(menu, document.body)}
    </div>
  )
}
