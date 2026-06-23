import { useTranslation } from "react-i18next";

export default function Logobar() {
  const { t } = useTranslation("logobar");
  return (
    <section className="logobar">
      <div className="container">
        <p className="logobar-label">{t("label.prefix")}<b>{t("label.count")}</b>{t("label.suffix")}</p>
        <div className="jstrip" id="jurisStrip">
          <div className="jstrip-track" id="jurisStripTrack"></div>
        </div>
      </div>
    </section>
  );
}
