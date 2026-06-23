import { useTranslation } from "react-i18next";

export default function Platform() {
  const { t } = useTranslation("platform");
  return (
    <section className="section platform" id="platform">
      <div className="container">
        <div className="platform-head">
          <div className="platform-head__lead reveal">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2>{t("heading")}</h2>
            <p className="sub">{t("sub")}</p>
          </div>
          <div className="platform-head__note reveal">
            <div className="platform-note" data-lg data-lg-blur="0.5px">
              <canvas className="platform-note__gfx" data-gfx="proofgeo" aria-hidden="true"></canvas>
              <b>{t("note.title")}</b>
              <span>{t("note.body")}</span>
            </div>
          </div>
        </div>

        <div className="platform-switch reveal">
          <span className="platform-switch__label">{t("switchLabel")}</span>
          <div className="platform-pills" id="platformPills" role="tablist" aria-label={t("pillsAria")} data-slot="tabs-list"></div>
        </div>

        <div className="platform-board reveal" id="platformBoard" aria-live="polite">
          {/* rendered by dashboard.js */}
        </div>
      </div>
    </section>
  );
}
