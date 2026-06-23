import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useNavBehavior } from "@/lib/useNavBehavior"
import LanguageSwitcher from "@/components/site/LanguageSwitcher"

/**
 * Homepage nav. Behavior (glass-on-scroll, hide-on-down / show-on-up collapse,
 * section-aware color) is driven by the shared `useNavBehavior` hook — the same
 * one the inner-page nav uses — so the two are identical. `data-react-nav` tells
 * the vanilla app.js bridge to skip its own scroll wiring (it keeps owning the
 * accessible mobile drawer via #burger / #drawer); this stops the two listeners
 * from fighting under Lenis smooth-scroll, which was leaving the bar un-collapsed.
 */
export default function Nav() {
  const { t } = useTranslation("common")
  const ref = useRef<HTMLElement>(null)
  useNavBehavior(ref)

  return (
    <header className="nav" id="nav" data-react-nav ref={ref}>
      <div className="nav-inner">
        <a className="wordmark" href="#top" aria-label={t("nav.home")}>Corp<span>/</span>Sec</a>
        <nav className="nav-links" aria-label={t("nav.primary")}>
          <a href="jurisdictions.html">{t("nav.jurisdictions")}</a>
          <a href="compare.html">{t("nav.compare")}</a>
          <a href="about.html">{t("nav.about")}</a>
          <a href="contact.html">{t("nav.contact")}</a>
        </nav>
        <div className="nav-actions">
          <LanguageSwitcher />
          <a href="#" className="btn btn-ghost btn-sm" data-slot="button" data-variant="outline" data-size="sm">{t("nav.login")}</a>
          <a href="#recommender" className="btn btn-primary btn-sm" data-slot="button" data-variant="default" data-size="sm" data-cta="incorp">{t("nav.startCompany")}</a>
        </div>
        <button className="nav-burger" id="burger" aria-label={t("nav.openMenu")} aria-expanded="false" data-slot="button" data-variant="ghost" data-size="icon">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className="nav-drawer" id="drawer">
        <a href="jurisdictions.html">{t("nav.jurisdictions")}</a>
        <a href="compare.html">{t("nav.compare")}</a>
        <a href="#pricing">{t("nav.pricing")}</a>
        <a href="#how">{t("nav.howItWorks")}</a>
        <a href="about.html">{t("nav.about")}</a>
        <a href="contact.html">{t("nav.contact")}</a>
        <a href="#recommender" className="btn btn-primary" data-slot="button" data-variant="default" data-cta="incorp">{t("nav.startCompany")}</a>
      </div>
    </header>
  );
}
