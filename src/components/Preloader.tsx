import { useEffect, useRef, useState } from "react"

/**
 * Branded full-screen preloader (lusion.co-inspired): the CorpSec wordmark, a
 * progress line + counter, then a curtain-wipe reveal. Waits on REAL resources —
 * web fonts (document.fonts.ready) and the window load event (images, the d3/
 * three chunks the homepage pulls) — plus a short minimum so the reveal reads.
 * Mounts once at app start; removes itself and never returns on route changes.
 */
export default function Preloader() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion:reduce)").matches

  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)   // triggers the curtain wipe
  const [gone, setGone] = useState(false)    // fully unmounts after the wipe
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    let p = 0

    // ease toward 90% while waiting, so the counter always feels alive
    const tick = () => {
      p = Math.min(90, p + (90 - p) * 0.045)
      setProgress(Math.round(p))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts
      ? (document as Document & { fonts: FontFaceSet }).fonts.ready
      : Promise.resolve()
    const winLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }))
    const minTime = new Promise<void>((r) => window.setTimeout(r, reduce ? 0 : 1100))

    let cancelled = false
    Promise.all([fontsReady, winLoaded, minTime]).then(() => {
      if (cancelled) return
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      setProgress(100)
      window.setTimeout(() => setDone(true), reduce ? 0 : 480)
      window.setTimeout(() => setGone(true), reduce ? 250 : 1500) // after the wipe transition
    })

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [reduce])

  if (gone) return null

  return (
    <div className={`preloader${done ? " is-done" : ""}`} role="status" aria-live="polite" aria-label="Loading">
      <div className="preloader__inner">
        <div className="preloader__word" aria-hidden="true">
          Corp<span>/</span>Sec
        </div>
        <div className="preloader__bar" aria-hidden="true">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className="preloader__meta" aria-hidden="true">
          <span>Incorporating worldwide</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  )
}
