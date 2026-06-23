import { useTranslation } from "react-i18next";

export default function Pricing() {
  const { t } = useTranslation("pricing");
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-head bento-head reveal">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="bento-headline"><span className="lead">{t("headline.lead")}</span> <span className="rest">{t("headline.rest")}</span></h2>
        </div>

        <div className="pricing-grid reveal">

          {/* FREE */}
          <article className="bento-card price-card price-card--free" data-slot="card">
            <div className="bento-card__border"></div>
            <div className="bento-card__border-glow"></div>
            <div className="bento-card__inner price-card__inner">
              <div className="price-card__col price-card__col--main">
                <span className="price-tag" data-slot="badge" data-variant="outline">{t("free.tag")}</span>
                <h3 className="price-card__name">{t("free.name")}</h3>
                <p className="price-card__desc">{t("free.desc")}</p>
                <a href="#recommender" className="btn btn-dark price-card__cta" data-slot="button" data-variant="secondary" data-cta="gabriella">{t("free.cta")}</a>
              </div>
              <div className="price-card__divider" aria-hidden="true"></div>
              <div className="price-card__col price-card__col--meta">
                <div className="price-meta">
                  <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h12M3 18h7"/></svg> {t("free.meta.recommendations")}</span>
                  <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3.1-5 7-5s7 1.7 7 5"/><circle cx="17" cy="7" r="2.4"/><path d="M16 11.5c2.9.4 5 1.9 5 4.5"/></svg> {t("free.meta.teamSize")}</span>
                </div>
                <div className="price-card__includes">
                  <span className="price-card__label">{t("free.includes.label")}</span>
                  <ul className="price-card__list">
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("free.includes.recommender")}</li>
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("free.includes.breakdowns")}</li>
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("free.includes.checklist")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* ENTERPRISE */}
          <article className="bento-card price-card price-card--enterprise" data-slot="card">
            <div className="bento-card__border"></div>
            <div className="bento-card__border-glow"></div>
            <div className="bento-card__inner price-card__inner price-card__inner--enterprise">
              <div className="price-card__top">
                <div className="price-card__col price-card__col--main">
                  <span className="price-tag price-tag--accent" data-slot="badge" data-variant="secondary">{t("enterprise.tag")}</span>
                  <h3 className="price-card__name">{t("enterprise.name")}</h3>
                  <p className="price-card__desc">{t("enterprise.desc")}</p>
                  <a href="#" className="btn btn-dark price-card__cta" data-slot="button" data-variant="secondary" data-cta="contact" data-source="pricing_scale">{t("enterprise.cta")}</a>
                </div>
                <div className="price-globe">
                  <canvas className="price-globe__gfx" data-gfx="globe" aria-hidden="true"></canvas>
                </div>
              </div>
              <div className="price-card__divider price-card__divider--h" aria-hidden="true"></div>
              <div className="price-meta price-meta--row">
                <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> {t("enterprise.meta.entityCount")}</span>
                <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3.1-5 7-5s7 1.7 7 5"/><circle cx="17" cy="7" r="2.4"/><path d="M16 11.5c2.9.4 5 1.9 5 4.5"/></svg> {t("enterprise.meta.seats")}</span>
              </div>
              <div className="price-card__includes">
                <span className="price-card__label">{t("enterprise.includes.label")}</span>
                <ul className="price-card__list price-card__list--2col">
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("enterprise.includes.structuring")}</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("enterprise.includes.accountManager")}</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("enterprise.includes.filings")}</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("enterprise.includes.invoicing")}</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("enterprise.includes.banking")}</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("enterprise.includes.taxAdvisory")}</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("enterprise.includes.monitoring")}</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("enterprise.includes.support")}</li>
                </ul>
              </div>
            </div>
          </article>

          {/* STARTER */}
          <article className="bento-card price-card price-card--starter" data-slot="card">
            <div className="bento-card__border"></div>
            <div className="bento-card__border-glow"></div>
            <div className="bento-card__inner price-card__inner">
              <div className="price-card__col price-card__col--main">
                <span className="price-badge" data-slot="badge" data-variant="default">{t("starter.badge")}</span>
                <span className="price-tag" data-slot="badge" data-variant="outline">{t("starter.tag")}</span>
                <h3 className="price-card__name">{t("starter.name")}</h3>
                <p className="price-card__desc">{t("starter.desc")}</p>
                <a href="#recommender" className="btn btn-primary price-card__cta" data-slot="button" data-variant="default" data-cta="incorp">{t("starter.cta")}</a>
              </div>
              <div className="price-card__divider" aria-hidden="true"></div>
              <div className="price-card__col price-card__col--meta">
                <div className="price-meta">
                  <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> {t("starter.meta.entity")}</span>
                  <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5 4.5 5.5v5c0 4.7 3.2 8.4 7.5 10 4.3-1.6 7.5-5.3 7.5-10v-5L12 2.5Z"/></svg> {t("starter.meta.agent")}</span>
                </div>
                <div className="price-card__includes">
                  <span className="price-card__label">{t("starter.includes.label")}</span>
                  <ul className="price-card__list">
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("starter.includes.incorporation")}</li>
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("starter.includes.address")}</li>
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("starter.includes.banking")}</li>
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> {t("starter.includes.vault")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

        </div>

        <div className="pricing-foot reveal">
          <a href="#" className="btn btn-ghost pricing-foot__btn" data-slot="button" data-variant="outline">{t("foot.compare")} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
