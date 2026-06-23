import { useTranslation } from "react-i18next";

export default function FinalCta() {
  const { t } = useTranslation("finalcta");
  return (
    <section className="section band-primary finalcta">
      <div className="container center reveal">
        <h2 className="on-dark">{t("heading")}</h2>
        <p className="sub on-dark-sub">{t("sub")}</p>
        <div className="hero-cta center-cta">
          <a href="#recommender" className="btn btn-white btn-lg" data-slot="button" data-variant="secondary" data-size="lg" data-cta="gabriella">{t("cta.primary")}</a>
          <a href="#" className="btn btn-ghost-light btn-lg" data-slot="button" data-variant="outline" data-size="lg" data-cta="contact" data-source="final_cta">{t("cta.secondary")}</a>
        </div>
        <p className="cta-trust">{t("trust")}</p>
      </div>
    </section>
  );
}
