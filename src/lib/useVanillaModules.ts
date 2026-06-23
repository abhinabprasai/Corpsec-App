import { useEffect } from "react"
import { loadScriptOnce } from "@/lib/loadScript"

/**
 * Homepage bridge — mounts the original site's hand-tuned vanilla modules after
 * React commits (they query by #id / .class). Replaced by native React/shadcn
 * incrementally. perf.js is loaded in index.html <head>.
 */
let homeStarted = false

const CLASSIC = [
  "/assets/d3.v7.min.js",
  "/assets/globe.js",
  "/assets/jurisdictions.js",
  "/assets/app.js",
  "/assets/dashboard.js",
  "/assets/gabriella.js",
  "/assets/forms.js",
  "/assets/liquidglass.js",
  "/assets/particles.js",
  "/assets/interactions.js",
]

export function useVanillaModules() {
  useEffect(() => {
    if (homeStarted) return
    homeStarted = true
    ;(async () => {
      for (const src of CLASSIC) await loadScriptOnce(src)
      const P = (window as unknown as { __PERF?: { mobile?: boolean; saveData?: boolean } }).__PERF || {}
      if (!P.mobile && !P.saveData) {
        const cards = document.querySelectorAll("[data-gfx]")
        if (cards.length) {
          const load = () => loadScriptOnce("/assets/bento3d.js", { module: true })
          if ("IntersectionObserver" in window) {
            const io = new IntersectionObserver((es, o) => {
              for (const e of es) if (e.isIntersecting) { o.disconnect(); load(); break }
            }, { rootMargin: "400px" })
            cards.forEach((c) => io.observe(c))
          } else {
            load()
          }
        }
      }
    })()
  }, [])
}
