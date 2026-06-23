import { useTranslation } from "react-i18next";

export default function Integrations() {
  const { t } = useTranslation("integrations");
  return (
    <section className="section integrations">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("heading")}</h2>
          <p className="sub">{t("sub")}</p>
        </div>
        <div className="marquee reveal">
          <div className="logos integ-logos">
            <span>Wise</span><span>Mercury</span><span>Carta</span><span>Pulley</span><span>Revolut</span><span>Brex</span>
          </div>
        </div>
      </div>
    </section>
  );
}
