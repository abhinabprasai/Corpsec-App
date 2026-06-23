import { useEffect } from "react"

/**
 * Per-route <title> + meta[name=description], restored on unmount. The SPA
 * shares one index.html, so without this every route keeps the homepage title.
 * Single source for page SEO metadata (mirrors the vanilla per-page <title>).
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    let metaEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    const prevDesc = metaEl ? metaEl.getAttribute("content") : null
    if (description != null) {
      if (!metaEl) {
        metaEl = document.createElement("meta")
        metaEl.setAttribute("name", "description")
        document.head.appendChild(metaEl)
      }
      metaEl.setAttribute("content", description)
    }

    return () => {
      document.title = prevTitle
      if (description != null && metaEl && prevDesc != null) {
        metaEl.setAttribute("content", prevDesc)
      }
    }
  }, [title, description])
}
