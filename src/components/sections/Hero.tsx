import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation("hero");
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-center" data-par="0.5">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="display">{t("headline.prefix")}<br /><span className="roll" id="heroRoll" aria-hidden="true"><span className="roll__item grad-shine is-in">{t("roll.0")}</span><span className="roll__item grad-shine">{t("roll.1")}</span><span className="roll__item grad-shine">{t("roll.2")}</span><span className="roll__item grad-shine">{t("roll.3")}</span></span><span className="sr-only">{t("srHeadline")}</span></h1>
          <p className="lede">{t("lede")}</p>
          <div className="hero-gab">
            <form className="gab-bar" id="gabBar" autoComplete="off">
              <span className="gab-avatar" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5l1.6 4.3L18 9.4l-4.4 1.6L12 15.5l-1.6-4.5L6 9.4l4.4-1.6L12 3.5Z"/><path d="M18.5 14.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z"/></svg>
              </span>
              <input className="gab-input" id="gabInput" type="text" aria-label={t("gab.ariaLabel")} placeholder={t("gab.placeholder")} data-slot="input" />
              <button className="btn btn-primary gab-send" type="submit" data-slot="button" data-variant="default">
                <span>{t("gab.submit")}</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </form>
            <div className="gab-chips" id="gabChips">
              <button className="gab-chip" type="button">{t("chips.0")}</button>
              <button className="gab-chip" type="button">{t("chips.1")}</button>
              <button className="gab-chip" type="button">{t("chips.2")}</button>
            </div>
            <div className="hero-sublinks">
              <span className="gab-meta"><i className="gab-dot" aria-hidden="true"></i> {t("gab.meta")}</span>
              <a href="#jurisdictions" className="hero-textlink">{t("browseLink")}</a>
            </div>
          </div>
        </div>
        <div className="hero-scrollcue" aria-hidden="true"><span></span>{t("scrollCue")}</div>
      </div>
    </section>
  );
}
