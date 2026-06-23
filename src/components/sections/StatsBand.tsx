import { useTranslation } from "react-i18next";

export default function StatsBand() {
  const { t } = useTranslation("statsband");
  return (
    <section className="statband">
      <div className="container">
        <div className="stat-grid reveal">
          <div className="stat-item"><b>79</b><span>{t("jurisdictions")}</span></div>
          <div className="stat-item"><b>500+</b><span>{t("companies")}</span></div>
          <div className="stat-item"><b>48h</b><span>{t("average")}</span></div>
          <div className="stat-item"><b>4.9★</b><span>{t("rating")}</span></div>
        </div>
      </div>
    </section>
  );
}
