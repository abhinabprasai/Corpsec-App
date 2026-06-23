import { useTranslation } from "react-i18next";

export default function HowWorks() {
  const { t } = useTranslation("howworks");
  return (
    <section className="section howworks" id="how">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("heading")}</h2>
          <p className="sub">{t("sub")}</p>
        </div>
        <div className="hw-grid reveal">
          <article className="hw-card" data-slot="card">
            <span className="hw-num">01</span>
            <div className="hw-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/><path d="M11 8v6M8 11h6"/></svg></div>
            <h3>{t("steps.match.title")}</h3>
            <p>{t("steps.match.body")}</p>
            <button className="hw-link" type="button" data-slot="button" data-variant="link" data-cta="gabriella">{t("steps.match.cta")}</button>
          </article>
          <article className="hw-card" data-slot="card">
            <span className="hw-num">02</span>
            <div className="hw-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16v13H4z"/><path d="M9 7V4h6v3"/><path d="m8.5 13 2.2 2.2L16 10.4"/></svg></div>
            <h3>{t("steps.incorporate.title")}</h3>
            <p>{t("steps.incorporate.body")}</p>
            <button className="hw-link" type="button" data-slot="button" data-variant="link" data-cta="incorp">{t("steps.incorporate.cta")}</button>
          </article>
          <article className="hw-card" data-slot="card">
            <span className="hw-num">03</span>
            <div className="hw-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v4h4"/><path d="M12 8v4l3 2"/></svg></div>
            <h3>{t("steps.autopilot.title")}</h3>
            <p>{t("steps.autopilot.body")}</p>
            <a className="hw-link" href="#platform" data-slot="button" data-variant="link">{t("steps.autopilot.cta")}</a>
          </article>
        </div>
      </div>
    </section>
  );
}
