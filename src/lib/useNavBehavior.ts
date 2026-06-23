import { useEffect } from "react"
import { isPointOnDark } from "@/lib/sectionTheme"

/**
 * The single source of truth for nav chrome behavior, shared by the homepage nav
 * (sections/Nav) and the inner-page nav (site/Nav) so they behave identically.
 * Ported 1:1 from the original assets/app.js + nav.js, plus section-aware theming:
 *
 *  • glass-on-scroll      — `scrolled` once past 24px
 *  • hide-on-scroll-down  — `collapsed` shrinks the bar to its wordmark pill
 *  • show-on-scroll-up    — `collapsed` lifts the moment you scroll up
 *  • show-on-hover        — pure CSS (`.nav.collapsed:hover`), preserved
 *  • color-by-section     — `nav--on-dark` / `nav--on-light` toggled from the
 *                           background zone directly beneath the bar, so text and
 *                           icons stay legible whether the bar floats over a dark
 *                           band or a light one.
 *
 * Replaces the vanilla app.js nav listener (which is now disabled on the homepage)
 * so Lenis smooth-scroll can't desync the two implementations.
 */
export function useNavBehavior(navRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    let lastY = window.scrollY || 0
    let ticking = false

    const updateTheme = () => {
      const rect = nav.getBoundingClientRect()
      // probe just below the bar's bottom edge, at its horizontal centre
      const x = rect.left + rect.width / 2
      const y = rect.bottom + 4
      const onDark = isPointOnDark(x, y)
      nav.classList.toggle("nav--on-dark", onDark)
      nav.classList.toggle("nav--on-light", !onDark)
    }

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0
      nav.classList.toggle("scrolled", y > 24)
      if (y < 120) nav.classList.remove("collapsed")
      else if (y > lastY + 3) nav.classList.add("collapsed")
      else if (y < lastY - 3) nav.classList.remove("collapsed")
      lastY = y
      updateTheme()
    }

    const handler = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { onScroll(); ticking = false })
    }

    window.addEventListener("scroll", handler, { passive: true })
    window.addEventListener("resize", handler, { passive: true })
    onScroll() // sync initial state (handles landing already scrolled / route change)
    // re-probe once layout settles (fonts, images, route content height changes)
    const settle = window.setTimeout(updateTheme, 350)

    return () => {
      window.removeEventListener("scroll", handler)
      window.removeEventListener("resize", handler)
      window.clearTimeout(settle)
    }
  }, [navRef])
}
