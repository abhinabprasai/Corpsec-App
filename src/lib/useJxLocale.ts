import { useTranslation } from "react-i18next"

/**
 * Locale overlay for jurisdiction DATA (names + region labels). The underlying
 * data modules (src/data/*.ts) stay in English as the single source of truth;
 * this hook maps the English name/region a component already has to its French
 * display form via the "data" namespace, falling back to the English string for
 * anything not yet translated. (Deep per-jurisdiction guide bodies — hero/memo/
 * fits — remain English for now; that is a separate staged content pass.)
 */
export function useJxLocale() {
  const { t } = useTranslation("data")
  return {
    /** Localized jurisdiction display name (falls back to the English name). */
    name: (englishName: string) => t(`names.${englishName}`, { defaultValue: englishName }),
    /** Localized region label (falls back to the English region). */
    region: (englishRegion: string) => t(`regions.${englishRegion}`, { defaultValue: englishRegion }),
  }
}
