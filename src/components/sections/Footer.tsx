import { useTranslation } from "react-i18next"

export default function Footer() {
  const { t, i18n } = useTranslation("common")
  const lang = i18n.language === "fr" ? "fr" : "en"
  return (
    <footer className="footer">
      <span className="foot-watermark" aria-hidden="true"><svg viewBox="0 0 43 43" fill="none"><path fill="currentColor" fillRule="evenodd" d="m0 43 43-9.119V0L0 9.226V43Z" clipRule="evenodd"/></svg></span>
      {/* top: brand + newsletter */}
      <div className="container foot-top">
        <div className="foot-brand">
          <a className="wordmark on-dark" href="#top">Corp<span>/</span>Sec</a>
          <p>{t("footer.tagline")}</p>
          <span className="foot-brand__trust">{t("footer.trust")}</span>
          <a className="foot-gab" href="#recommender" data-cta="gabriella">
            <span className="foot-gab__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 7V4M9 13h.01M15 13h.01M9 17h6"/><path d="M2 12v2M22 12v2"/></svg></span>
            <span className="foot-gab__tx"><b>{t("footer.gabriella")} <span className="foot-gab__ai">AI</span></b><small>{t("footer.gabriellaSub")}</small></span>
            <span className="foot-gab__go" aria-hidden="true">→</span>
          </a>
        </div>
        <div className="foot-sub">
          <h4>{t("footer.briefingTitle")}</h4>
          <p>{t("footer.briefingDesc")}</p>
          <form className="foot-sub-bar" id="footSub" autoComplete="off">
            <input type="email" id="footSubInput" placeholder={t("footer.emailPlaceholder")} aria-label={t("footer.emailLabel")} data-slot="input" />
            <button className="btn btn-primary btn-sm" type="submit" data-slot="button" data-variant="default" data-size="sm">{t("footer.subscribe")}</button>
          </form>
          <span className="foot-sub__note" id="footSubNote">{t("footer.subNote")}</span>
        </div>
      </div>

      {/* columns */}
      <div className="container foot-cols">
        <div className="foot-col">
          <h4>{t("footer.cols.product")}</h4>
          <a href="#recommender" data-cta="gabriella">{t("footer.links.gabriellaAdvisor")}</a>
          <a href="jurisdictions.html">{t("footer.links.allJurisdictions")}</a>
          <a href="compare.html">{t("footer.links.compareJurisdictions")}</a>
          <a href="#backoffice">{t("footer.links.companyFormation")}</a>
          <a href="#pricing">{t("footer.links.pricing")}</a>
        </div>
        <div className="foot-col">
          <h4>{t("footer.cols.solutions")}</h4>
          <a href="#recommender" data-cta="gabriella">{t("footer.links.saas")}</a>
          <a href="#recommender" data-cta="gabriella">{t("footer.links.holding")}</a>
          <a href="#recommender" data-cta="gabriella">{t("footer.links.ecommerce")}</a>
          <a href="#recommender" data-cta="gabriella">{t("footer.links.crypto")}</a>
          <a href="#recommender" data-cta="gabriella">{t("footer.links.solo")}</a>
        </div>
        <div className="foot-col">
          <h4>{t("footer.cols.resources")}</h4>
          <a href="jurisdictions.html">{t("footer.links.guides")}</a>
          <a href="compare.html">{t("footer.links.compareJurisdictions")}</a>
          <a href="#how">{t("footer.links.howItWorks")}</a>
          <a href="#faq">{t("footer.links.helpCenter")}</a>
        </div>
        <div className="foot-col">
          <h4>{t("footer.cols.company")}</h4>
          <a href="about.html">{t("footer.links.about")}</a>
          <a href="about.html#team">{t("footer.links.team")}</a>
          <a href="contact.html">{t("footer.links.contact")}</a>
          <a href="contact.html">{t("footer.links.sales")}</a>
        </div>
        <div className="foot-col">
          <h4>{t("footer.cols.legal")}</h4>
          <a href="#">{t("footer.links.terms")}</a>
          <a href="#">{t("footer.links.privacy")}</a>
          <a href="#">{t("footer.links.cookies")}</a>
          <a href="mailto:hello@corpsec.io">hello@corpsec.io</a>
        </div>
      </div>

      {/* trust / compliance strip */}
      <div className="container foot-trust">
        <div className="foot-badges">
          <span className="foot-badge">{t("footer.badges.encryption")}</span>
          <span className="foot-badge">{t("footer.badges.vault")}</span>
          <span className="foot-badge">{t("footer.badges.gdpr")}</span>
          <span className="foot-badge">{t("footer.badges.csp")}</span>
          <span className="foot-badge">{t("footer.badges.insured")}</span>
        </div>
        <p className="foot-disclaimer">{t("footer.disclaimer")}</p>
      </div>

      {/* legal bar */}
      <div className="container foot-bar">
        <span className="foot-copy">{t("footer.copyright")}</span>
        <div className="foot-locale">
          <span className="foot-pill"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg> {t(`language.${lang}`)}</span>
          <span className="foot-pill">USD $</span>
        </div>
        <div className="foot-social">
          <a href="#" aria-label={t("footer.social.linkedin")}><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.1c0-1.22-.02-2.8-1.95-2.8s-2.25 1.32-2.25 2.7V21h-4z"/></svg></a>
          <a href="#" aria-label={t("footer.social.x")}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="#" aria-label={t("footer.social.github")}><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.13-4.55-5.04 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04A9.4 9.4 0 0 1 12 6.85c.85 0 1.71.12 2.51.34 1.91-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.73 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg></a>
        </div>
      </div>
    </footer>
  );
}
