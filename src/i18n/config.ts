import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

/**
 * i18n bootstrap. Every translation namespace lives in
 * `src/i18n/locales/<lng>/<ns>.json` and is auto-registered via Vite's
 * `import.meta.glob` — so adding a page/section translation is just dropping a
 * JSON file, no edit here. Runtime language swap (single URL) with localStorage
 * persistence + `<html lang>` sync; a `window.__I18N` bridge feeds the homepage's
 * remaining vanilla widgets (gabriella/forms/dashboard) the active dictionary.
 */
const modules = import.meta.glob("./locales/*/*.json", { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>

type Resources = Record<string, Record<string, Record<string, unknown>>>
const resources: Resources = {}
for (const path in modules) {
  const m = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/)
  if (!m) continue
  const [, lng, ns] = m
  ;(resources[lng] ||= {})[ns] = modules[path].default
}

export const SUPPORTED = ["en", "fr"] as const
export type Lang = (typeof SUPPORTED)[number]
export const LANG_LABEL: Record<Lang, string> = { en: "English", fr: "Français" }
export const LANG_SHORT: Record<Lang, string> = { en: "EN", fr: "FR" }

const allNamespaces = Object.keys(resources.en ?? { common: {} })

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: SUPPORTED as unknown as string[],
    defaultNS: "common",
    ns: allNamespaces,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "corpsec_lang",
      caches: ["localStorage"],
    },
    returnNull: false,
  })

/** Keep <html lang> + the vanilla-module bridge in sync with the active language. */
function syncLang(lng: string) {
  const l = (SUPPORTED as readonly string[]).includes(lng) ? lng : "en"
  document.documentElement.lang = l
  // Bridge for the homepage's still-vanilla widgets (forms.js / gabriella.js /
  // dashboard.js / globe tooltips): they read window.__I18N.t(key) with an
  // English fallback baked into the call site.
  const w = window as unknown as { __I18N?: { lang: string; t: (k: string) => string | undefined } }
  w.__I18N = {
    lang: l,
    t: (key: string) => i18n.t(key, { ns: "vanilla", defaultValue: "" }) || undefined,
  }
  window.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang: l } }))
}
syncLang(i18n.language)
i18n.on("languageChanged", syncLang)

export default i18n
