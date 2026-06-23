import { useTranslation } from "react-i18next";

export default function Jurisdictions() {
  const { t } = useTranslation("homejur");
  return (
    <section className="juris2" id="jurisdictions">
      <div className="container juris2-grid">
        <div className="juris2-left">
          <div className="juris2-head">
            <span className="eyebrow light">{t("eyebrow")}</span>
            <h2 className="on-dark">{t("heading.line1")}<br />{t("heading.line2")}</h2>
            <p className="sub on-dark-sub">{t("sub")}</p>
          </div>
          <div className="jsearch jsearch--pair" id="jSearch">
            <div className="jpair">
              <div className="jfield">
                <label className="jfield__lab" htmlFor="jPassport">{t("passport.label")}</label>
                <div className="jcombo" id="jPassportCombo">
                  <span className="jcombo__flag" id="jPassportFlag" aria-hidden="true"></span>
                  <input className="jcombo__in" id="jPassport" type="text" role="combobox" aria-expanded="false" aria-controls="jPassportList" aria-autocomplete="list" aria-label={t("passport.ariaLabel")} autoComplete="off" placeholder={t("passport.placeholder")} />
                  <svg className="jcombo__chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                  <ul className="jcombo__list" id="jPassportList" role="listbox" aria-label={t("passport.listLabel")} hidden></ul>
                </div>
              </div>
              <span className="jpair__link" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
              </span>
              <div className="jfield">
                <label className="jfield__lab" htmlFor="jDest">{t("dest.label")}</label>
                <div className="jcombo" id="jDestCombo">
                  <span className="jcombo__flag" id="jDestFlag" aria-hidden="true"></span>
                  <input className="jcombo__in" id="jDest" type="text" role="combobox" aria-expanded="false" aria-controls="jDestList" aria-autocomplete="list" aria-label={t("dest.ariaLabel")} autoComplete="off" placeholder={t("dest.placeholder")} />
                  <svg className="jcombo__chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                  <ul className="jcombo__list" id="jDestList" role="listbox" aria-label={t("dest.listLabel")} hidden></ul>
                </div>
              </div>
            </div>
            <button type="button" className="btn btn-primary jpair__go" id="jPairGo" hidden>
              <span className="jpair__go-tx">{t("cta")}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
        <div className="juris2-right" aria-hidden="true"></div>
      </div>
    </section>
  );
}
