import { useEffect } from "react"
import { loadScriptOnce } from "@/lib/loadScript"

/**
 * Inner-page parity with the vanilla site's cross-cutting visual effects:
 *  • particles.js — the site-wide sandpaper grain field (fixed full-viewport canvas)
 *  • interactions.js — bento-card tilt, cursor-follow button laser glow, edge-rail
 *    fade over dark sections, count-up stats, scroll-reveal, subtle parallax
 * These are decorative enhancements (not components); we reuse the tuned originals.
 * perf.js (window.__PERF) is already loaded in index.html <head>.
 *
 * `routeKey` re-triggers a re-measure (particles recomputes doc height + the
 * dark/light tint ranges; interactions re-scans) whenever the route changes.
 */
let started = false

export function useSiteEffects(routeKey: string) {
  useEffect(() => {
    if (!started) {
      started = true
      ;(async () => {
        await loadScriptOnce("/assets/particles.js")
        await loadScriptOnce("/assets/interactions.js")
      })()
    }
  }, [])

  useEffect(() => {
    // let the new route's DOM commit, then nudge the effect modules to re-measure
    const t = window.setTimeout(() => {
      window.dispatchEvent(new Event("resize")) // particles re-measures doc height + tint ranges
      const fx = (window as unknown as { Interactions?: { refresh?: () => void } }).Interactions
      fx?.refresh?.() // re-bind tilt + scroll-reveal on the new route's elements
    }, 60)
    return () => window.clearTimeout(t)
  }, [routeKey])
}
