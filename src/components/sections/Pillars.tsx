import { useTranslation } from "react-i18next";

export default function Pillars() {
  const { t } = useTranslation("pillars");
  return (
    <section className="section band-tint pillars">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("heading")}</h2>
        </div>
        <div className="grid-4 pillars-grid reveal">
          <div className="pillar">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" />
                <path d="M5 7h14" />
                <path d="M7 3h10" />
                <path d="m5 7-3 6a3 3 0 0 0 6 0L5 7Z" />
                <path d="m19 7-3 6a3 3 0 0 0 6 0l-3-6Z" />
                <path d="M8 21h8" />
              </svg>
            </div>
            <h3>{t("cards.unbiased.title")}</h3>
            <p>{t("cards.unbiased.body")}</p>
          </div>
          <div className="pillar">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.5 4.5 5.5v5c0 4.7 3.2 8.4 7.5 10 4.3-1.6 7.5-5.3 7.5-10v-5L12 2.5Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3>{t("cards.licensed.title")}</h3>
            <p>{t("cards.licensed.body")}</p>
          </div>
          <div className="pillar">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3h14a1 1 0 0 1 1 1v17l-3-2-2 2-3-2-3 2-2-2-3 2V4a1 1 0 0 1 1-1Z" />
                <path d="M8.5 8h7" />
                <path d="M8.5 12h7" />
                <path d="M8.5 16h4" />
              </svg>
            </div>
            <h3>{t("cards.pricing.title")}</h3>
            <p>{t("cards.pricing.body")}</p>
          </div>
          <div className="pillar">
            <div className="ic">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
                <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
                <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
                <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
              </svg>
            </div>
            <h3>{t("cards.dashboard.title")}</h3>
            <p>{t("cards.dashboard.body")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
