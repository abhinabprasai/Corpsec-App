/** Load an external script exactly once site-wide (shared across the homepage
 *  bridge and the inner-page effects), preserving insertion order for callers
 *  that await sequentially. Returns a cached promise on repeat calls. */
const cache = new Map<string, Promise<void>>()

export function loadScriptOnce(src: string, opts?: { module?: boolean }): Promise<void> {
  const existing = cache.get(src)
  if (existing) return existing
  const p = new Promise<void>((resolve) => {
    const el = document.createElement("script")
    if (opts?.module) el.type = "module"
    el.src = src
    el.async = false // defer-like ordering within a synchronous burst
    el.onload = () => resolve()
    el.onerror = () => resolve()
    document.body.appendChild(el)
  })
  cache.set(src, p)
  return p
}
