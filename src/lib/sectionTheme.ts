/**
 * Background-zone detection for the chrome that floats over the page (nav,
 * contact pill). Rather than sampling pixels (fooled by the fixed particle
 * canvas + glass layers), we test the probe point against the bounding boxes of
 * the site's known dark-background zones. Verbatim from legacy.css: the space
 * hero, the jurisdictions globe band (.juris2), the night recommender band
 * (.band-dark), the gradient CTA (.band-primary) and the footer are dark; every
 * other section is light. Inner-page heroes can opt in with [data-nav-dark].
 */
const DARK_SELECTOR =
  ".hero, .juris2, .band-dark, .band-primary, .footer, [data-nav-dark]"

export function isPointOnDark(x: number, y: number): boolean {
  const zones = document.querySelectorAll<HTMLElement>(DARK_SELECTOR)
  for (let i = 0; i < zones.length; i++) {
    const r = zones[i].getBoundingClientRect()
    if (r.width === 0 && r.height === 0) continue
    if (r.left <= x && r.right >= x && r.top <= y && r.bottom >= y) return true
  }
  return false
}
