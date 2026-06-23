import { useEffect, useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { useGabriella } from "@/components/gabriella/GabriellaProvider"

const LINKS = [
  { to: "/jurisdictions", label: "Jurisdictions" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

// Mobile drawer link set — mirrors the original `.nav-drawer` (index.html): the
// primary links plus the homepage in-page sections, mapped to React routes.
const DRAWER_LINKS = [
  { to: "/jurisdictions", label: "Jurisdictions" },
  { to: "/compare", label: "Compare" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

/**
 * Shared nav for the inner (non-home) routes. The homepage keeps its own
 * vanilla-driven nav (sections/Nav). Here the original nav.js scroll behavior
 * is reimplemented as a real React effect that toggles the SAME classes
 * (`scrolled` + `collapsed`) the legacy CSS targets, so legacy.css renders the
 * glass-on-scroll + Dynamic-Island collapse identically. The mobile burger is a
 * real shadcn Sheet styled to match the legacy `.nav-drawer` glass sheet.
 */
export default function Nav() {
  const { open } = useGabriella()
  const headerRef = useRef<HTMLElement>(null)

  // glass-on-scroll (y>24) + collapse-on-scroll-down / expand-on-scroll-up,
  // ported verbatim from assets/nav.js so the legacy `.scrolled` / `.collapsed`
  // rules drive the visual transition.
  useEffect(() => {
    const nav = headerRef.current
    if (!nav) return
    let lastY = window.scrollY || 0
    let ticking = false
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0
      nav.classList.toggle("scrolled", y > 24)
      if (y < 120) nav.classList.remove("collapsed")
      else if (y > lastY + 3) nav.classList.add("collapsed")
      else if (y < lastY - 3) nav.classList.remove("collapsed")
      lastY = y
    }
    const handler = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { onScroll(); ticking = false })
    }
    window.addEventListener("scroll", handler, { passive: true })
    onScroll() // sync initial state (e.g. landing already scrolled)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header className="nav" id="nav" ref={headerRef}>
      <div className="nav-inner">
        <Link className="wordmark" to="/" aria-label="CorpSec home">
          Corp<span>/</span>Sec
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to}>{l.label}</NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <span className="locale" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" /></svg> EN
          </span>
          <Link to="/contact" className="btn btn-ghost btn-sm" data-slot="button" data-variant="outline" data-size="sm">Log in</Link>
          <button type="button" onClick={() => open()} className="btn btn-primary btn-sm" data-slot="button" data-variant="default" data-size="sm" data-cta="incorp">Start my company</button>
        </div>

        <Sheet>
          <SheetTrigger className="nav-burger" aria-label="Open menu" data-slot="button" data-variant="ghost" data-size="icon">
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
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="nav-drawer nav-drawer--sheet">
              {DRAWER_LINKS.map((l) => (
                <SheetClose asChild key={l.to}>
                  <NavLink to={l.to}>{l.label}</NavLink>
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
                  Start my company
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
