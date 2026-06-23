import { useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { useIncorporation } from "@/components/incorporation/IncorporationProvider"
import { useNavBehavior } from "@/lib/useNavBehavior"
import LanguageSwitcher from "@/components/site/LanguageSwitcher"

const LINKS = [
  { to: "/jurisdictions", key: "jurisdictions" },
  { to: "/compare", key: "compare" },
  { to: "/about", key: "about" },
  { to: "/contact", key: "contact" },
] as const

// Mobile drawer link set — mirrors the original `.nav-drawer` (index.html): the
// primary links plus the homepage in-page sections, mapped to React routes.
const DRAWER_LINKS = [
  { to: "/jurisdictions", key: "jurisdictions" },
  { to: "/compare", key: "compare" },
  { to: "/about", key: "about" },
  { to: "/contact", key: "contact" },
] as const

/**
 * Shared nav for the inner (non-home) routes. The homepage keeps its own
 * vanilla-driven nav (sections/Nav). Here the original nav.js scroll behavior
 * is reimplemented as a real React effect that toggles the SAME classes
 * (`scrolled` + `collapsed`) the legacy CSS targets, so legacy.css renders the
 * glass-on-scroll + Dynamic-Island collapse identically. The mobile burger is a
 * real shadcn Sheet styled to match the legacy `.nav-drawer` glass sheet.
 */
export default function Nav() {
  const { open } = useIncorporation()
  const { t } = useTranslation("common")
  const headerRef = useRef<HTMLElement>(null)

  // glass-on-scroll + hide-on-down / show-on-up collapse + section-aware color,
  // shared with the homepage nav so both behave identically.
  useNavBehavior(headerRef)

  return (
    <header className="nav" id="nav" ref={headerRef}>
      <div className="nav-inner">
        {/* full-load nav to home: the homepage runs the vanilla module bridge,
            which only wires the DOM on a fresh document load — a client-side
            <Link> would remount Home without re-initializing globe/dashboard/etc. */}
        <a className="wordmark" href="/" aria-label={t("nav.home")}>
          Corp<span>/</span>Sec
        </a>
        <nav className="nav-links" aria-label={t("nav.primary")}>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to}>{t(`nav.${l.key}`)}</NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher />
          <Link to="/contact" className="btn btn-ghost btn-sm" data-slot="button" data-variant="outline" data-size="sm">{t("nav.login")}</Link>
          <button type="button" onClick={() => open()} className="btn btn-primary btn-sm" data-slot="button" data-variant="default" data-size="sm" data-cta="incorp">{t("nav.startCompany")}</button>
        </div>

        <Sheet>
          <SheetTrigger className="nav-burger" aria-label={t("nav.openMenu")} data-slot="button" data-variant="ghost" data-size="icon">
            <span></span><span></span><span></span>
          </SheetTrigger>
          {/* Reuse the legacy `.nav-drawer` look: dark glass sheet, links list with
              hairline separators + a primary CTA. The shadcn Content provides the
              accessible dialog shell + slide animation; component-scoped styles
              below restyle it (without touching legacy.css). */}
          <SheetContent
            side="right"
            className="nav-drawer-sheet w-[min(86vw,440px)] border-0 bg-transparent p-0 shadow-none"
          >
            <SheetTitle className="sr-only">{t("nav.menu")}</SheetTitle>
            <div className="nav-drawer nav-drawer--sheet">
              {DRAWER_LINKS.map((l) => (
                <SheetClose asChild key={l.to}>
                  <NavLink to={l.to}>{t(`nav.${l.key}`)}</NavLink>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <button
                  type="button"
                  onClick={() => open()}
                  className="btn btn-primary"
                  data-slot="button"
                  data-variant="default"
                  data-cta="incorp"
                >
                  {t("nav.startCompany")}
                </button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Drawer styling — scoped to this Sheet so the legacy `.nav-drawer`
          presentation (display:none until `.nav.open`, which never fires here)
          is overridden into an always-visible flex column inside the Sheet,
          and the Sheet's default panel chrome is removed. legacy.css untouched. */}
      <style>{`
        .nav-drawer-sheet { display: flex; align-items: flex-start; justify-content: flex-end; }
        .nav-drawer.nav-drawer--sheet {
          display: flex;
          width: 100%;
          margin: 0;
          border-radius: 0;
          box-shadow: none;
          padding: 64px 24px 28px;
          background: rgba(16,26,44,.92);
          height: 100%;
        }
        .nav-drawer.nav-drawer--sheet > .btn { width: 100%; justify-content: center; }
      `}</style>
    </header>
  )
}
