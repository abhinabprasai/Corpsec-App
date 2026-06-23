import { useTranslation } from "react-i18next";

export default function Faq() {
  const { t } = useTranslation("faq");
  return (
    <section className="section band-tint faq" id="faq">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("heading")}</h2>
        </div>
        <div className="faq-list reveal" data-slot="accordion" data-orientation="vertical">
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">{t("items.where.q")}<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>{t("items.where.a")}</p></div>
          </details>
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">{t("items.residency.q")}<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>{t("items.residency.a")}</p></div>
          </details>
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">{t("items.banking.q")}<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>{t("items.banking.a")}</p></div>
          </details>
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">{t("items.cost.q")}<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>{t("items.cost.a")}</p></div>
          </details>
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">{t("items.move.q")}<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>{t("items.move.a")}</p></div>
          </details>
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">{t("items.who.q")}<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>{t("items.who.a")}</p></div>
          </details>
        </div>
        <div className="faq-foot reveal">
          <span>{t("foot.prompt")}</span>
          <button className="btn btn-primary" type="button" data-slot="button" data-variant="default" data-cta="gabriella">{t("foot.cta")}</button>
        </div>
      </div>
    </section>
  );
}
