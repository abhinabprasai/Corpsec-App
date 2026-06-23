import { type ReactNode } from "react"
import { ReactLenis } from "lenis/react"

/**
 * Site-wide smooth scrolling via Lenis — the same engine behind Locomotive v5,
 * which the original CorpSec site used, so the feel matches. Mounted once at the
 * app root so EVERY route (home + inner pages) gets it.
 *
 * Lenis smooths the NATIVE scroll position (it doesn't transform a container),
 * so `window.scrollY` stays accurate — the homepage globe scroll-scene, the nav
 * glass/collapse states, particles tint ranges and count-ups all keep working.
 *
 * Disabled under prefers-reduced-motion (renders children with native scroll).
 * Internally-scrollable surfaces (modals, the combobox dropdown) opt out with
 * `data-lenis-prevent` so their own scrolling stays native.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce =
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion:reduce)").matches

  if (reduce) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09, // weighted glide, Locomotive-like
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  )
}
