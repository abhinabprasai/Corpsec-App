import { useTranslation } from "react-i18next";

export default function Recommender() {
  const { t } = useTranslation("recommender");
  return (
    <section className="section band-dark recommender" id="recommender">
      <div className="container two-col">
        <div className="reveal">
          <span className="eyebrow light">{t("eyebrow")}</span>
          <h2 className="on-dark">{t("heading.line1")}<br />{t("heading.line2")}</h2>
          <p className="sub on-dark-sub">{t("sub")}</p>
          <div className="chips">
            <span className="chip">{t("chips.free")}</span><span className="chip">{t("chips.noLogin")}</span><span className="chip">{t("chips.noSalesCall")}</span>
          </div>
          <a href="#recommender" className="btn btn-white" data-cta="gabriella">{t("cta")}</a>
        </div>
        <div className="reveal">
          <div className="steps">
            <span className="step done">{t("steps.profile")}</span><span className="step-sep"></span>
            <span className="step done">{t("steps.matching")}</span><span className="step-sep"></span>
            <span className="step active">{t("steps.reportReady")}</span>
          </div>
          <div className="reco-card" data-lg data-lg-blur="0.5px">
            <div className="reco-top">
              <span className="iso big">SG</span>
              <div>
                <div className="reco-name">{t("card.country")} <span className="reco-rank">{t("card.rank")}</span></div>
                <div className="reco-meta">{t("card.meta")}</div>
              </div>
              <span className="reco-tax">{t("card.taxLabel")}<br /><b>~8.25%</b></span>
            </div>
            <div className="reco-banking">
              <span>{t("card.banking")}</span>
              <span className="bk">{t("card.bankRemote")}</span><span className="bk">{t("card.bankStripe")}</span><span className="bk">{t("card.bankWise")}</span><span className="bk">{t("card.bankMercury")}</span>
            </div>
            <div className="reco-foot">
              <span className="reco-also">{t("card.alsoConsidered")}</span>
              <a href="#" className="btn btn-primary btn-sm" data-cta="incorp" data-jur="Singapore">{t("card.start")}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
