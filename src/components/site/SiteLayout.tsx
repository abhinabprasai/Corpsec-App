import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { useLenis } from "lenis/react"
import { GabriellaProvider } from "@/components/gabriella/GabriellaProvider"
import { IncorporationProvider } from "@/components/incorporation/IncorporationProvider"
import Nav from "@/components/site/Nav"
import Footer from "@/components/site/Footer"
import { useSiteEffects } from "@/lib/useSiteEffects"

/** Reveal-on-scroll for `.reveal` elements (native React replacement for the
 *  vanilla interactions.js observer). Re-runs per route. */
function useReveal(key: string) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"))
    if (!els.length) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion:reduce)").matches
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"))
      return
    }
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) }
      }),
      { threshold: 0.12, rootMargin: "-40px" }
    )
    els.forEach((e) => io.observe(e))
    const t = window.setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((e) => e.classList.add("in"))
    }, 1600)
    return () => { io.disconnect(); window.clearTimeout(t) }
  }, [key])
}

export default function SiteLayout() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  // jump to top on route change (instant — Lenis-aware so it doesn't fight the smooth scroll)
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])
  useReveal(pathname)
  // particle grain, card tilt, button laser glow, edge-rail fades — parity with the vanilla site
  useSiteEffects(pathname)

  return (
    <GabriellaProvider>
      <IncorporationProvider>
        <a className="skip-link" href="#content">Skip to content</a>
        <Nav />
        <main id="content" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
      </IncorporationProvider>
    </GabriellaProvider>
  )
}
