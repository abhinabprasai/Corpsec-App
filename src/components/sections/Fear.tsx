import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

export default function Fear() {
  const { t } = useTranslation("fear");
  return (
    <section className="section fear" id="risk">
      <div className="container">
        <div className="section-head bento-head reveal">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="bento-headline"><span className="lead">{t("headline.lead")}</span> <span className="rest">{t("headline.rest")}</span></h2>
          <p className="sub">{t("sub")}</p>
          <a href="#recommender" className="btn btn-primary" data-cta="gabriella">{t("cta")}</a>
        </div>
        <div className="bento reveal">
          <div className="bento-grid">

            <article className="bento-card bento-card--globe" data-bento-card>
              <div className="bento-card__bg"></div>
              <div className="bento-card__gfx gfx-globe" aria-hidden="true">
                <canvas className="bento-gfx" data-gfx="globe"></canvas>
                <span className="bank-pill bank-pill--1">{t("globe.pill.stripe")}<i className="bp-dot bp-no"></i></span>
                <span className="bank-pill bank-pill--2">{t("globe.pill.mercury")}<i className="bp-dot bp-ok"></i></span>
                <span className="bank-pill bank-pill--3">{t("globe.pill.wise")}<i className="bp-dot bp-no"></i></span>
                <span className="gfx-stat">{t("globe.stat")}</span>
              </div>
              <div className="bento-card__inner">
                <h3 className="bento-card__title">{t("globe.title.part1")}<em>{t("globe.title.em")}</em>{t("globe.title.part2")}</h3>
                <p className="bento-card__support">{t("globe.support")}</p>
              </div>
              <span className="bento-card__expand" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2H2v4M10 14h4v-4M2 2l5 5M14 14l-5-5"/></svg></span>
              <div className="bento-card__border" aria-hidden="true"><div className="bento-card__border-glow"></div></div>
            </article>

            <article className="bento-card bento-card--chart" data-bento-card>
              <div className="bento-card__bg"></div>
              <div className="bento-card__gfx gfx-chart" aria-hidden="true">
                <div className="chart-readout">
                  <span className="chart-num" data-leak>{t("chart.num")}</span>
                  <span className="chart-cap">{t("chart.cap")}</span>
                </div>
                <div className="chart-bars">
                  <i style={{ "--h": "18%" } as CSSProperties}></i><i style={{ "--h": "26%" } as CSSProperties}></i><i style={{ "--h": "22%" } as CSSProperties}></i><i style={{ "--h": "38%" } as CSSProperties}></i><i style={{ "--h": "34%" } as CSSProperties}></i><i style={{ "--h": "52%" } as CSSProperties}></i><i style={{ "--h": "48%" } as CSSProperties}></i><i style={{ "--h": "66%" } as CSSProperties}></i><i style={{ "--h": "74%" } as CSSProperties}></i><i style={{ "--h": "92%" } as CSSProperties}></i>
                </div>
                <span className="gfx-stat warn">{t("chart.stat")}</span>
              </div>
              <div className="bento-card__inner">
                <h3 className="bento-card__title">{t("chart.title")}</h3>
                <p className="bento-card__support">{t("chart.support")}</p>
              </div>
              <span className="bento-card__expand" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2H2v4M10 14h4v-4M2 2l5 5M14 14l-5-5"/></svg></span>
              <div className="bento-card__border" aria-hidden="true"><div className="bento-card__border-glow"></div></div>
            </article>

            <article className="bento-card bento-card--burst" data-bento-card>
              <div className="bento-card__bg"></div>
              <div className="bento-card__gfx gfx-burst" aria-hidden="true">
                <canvas className="bento-gfx" data-gfx="burst"></canvas>
                <div className="mini-doc">
                  <div className="mini-doc__top"><span className="mini-doc__tag">{t("burst.docTag")}</span></div>
                  <div className="mini-doc__line"></div>
                  <div className="mini-doc__line w70"></div>
                  <div className="mini-doc__line w85"></div>
                  <div className="mini-doc__foot"><span className="mini-doc__chip">{t("burst.docChip")}</span></div>
                </div>
                <span className="gfx-stat danger">{t("burst.stat")}</span>
              </div>
              <div className="bento-card__inner">
                <h3 className="bento-card__title">{t("burst.title")}</h3>
                <p className="bento-card__support">{t("burst.support")}</p>
              </div>
              <span className="bento-card__expand" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2H2v4M10 14h4v-4M2 2l5 5M14 14l-5-5"/></svg></span>
              <div className="bento-card__border" aria-hidden="true"><div className="bento-card__border-glow"></div></div>
            </article>

            <article className="bento-card bento-card--holo" data-bento-card>
              <div className="bento-card__bg"></div>
              <div className="bento-card__gfx gfx-holo" aria-hidden="true">
                <div className="holo-card">
                  <div className="holo-card__sheen"></div>
                  <div className="holo-card__seal"></div>
                  <div className="holo-card__label">{t("holo.label")}</div>
                  <div className="holo-card__cost">{t("holo.cost")}</div>
                </div>
              </div>
              <div className="bento-card__inner">
                <h3 className="bento-card__title">{t("holo.title")}</h3>
                <p className="bento-card__support">{t("holo.support")}</p>
              </div>
              <span className="bento-card__expand" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2H2v4M10 14h4v-4M2 2l5 5M14 14l-5-5"/></svg></span>
              <div className="bento-card__border" aria-hidden="true"><div className="bento-card__border-glow"></div></div>
            </article>

            <article className="bento-card bento-card--substance" data-bento-card>
              <div className="bento-card__bg"></div>
              <div className="bento-card__gfx gfx-substance" aria-hidden="true">
                <div className="meter" data-meter>
                  <svg viewBox="0 0 120 120">
                    <circle className="meter__track" cx="60" cy="60" r="50"/>
                    <circle className="meter__fill" cx="60" cy="60" r="50"/>
                  </svg>
                  <div className="meter__center"><b>{t("substance.meterValue")}</b><small>{t("substance.meterLabel")}</small></div>
                </div>
                <span className="flag-tag">{t("substance.flagTag")}</span>
                <span className="gfx-stat warn">{t("substance.stat")}</span>
              </div>
              <div className="bento-card__inner">
                <h3 className="bento-card__title">{t("substance.title")}</h3>
                <p className="bento-card__support">{t("substance.support")}</p>
              </div>
              <span className="bento-card__expand" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2H2v4M10 14h4v-4M2 2l5 5M14 14l-5-5"/></svg></span>
              <div className="bento-card__border" aria-hidden="true"><div className="bento-card__border-glow"></div></div>
            </article>

            <article className="bento-card bento-card--table" data-bento-card>
              <div className="bento-card__bg"></div>
              <div className="bento-card__inner">
                <div className="bento-card__text-col">
                  <h3 className="bento-card__title">{t("table.title")}</h3>
                  <p className="bento-card__support">{t("table.support")}</p>
                  <span className="gfx-stat danger">{t("table.stat")}</span>
                </div>
                <div className="ent-table" aria-hidden="true">
                  <div className="ent-row ent-head"><span>{t("table.head.entity")}</span><span>{t("table.head.country")}</span><span>{t("table.head.filing")}</span><span>{t("table.head.status")}</span></div>
                  <div className="ent-row"><span>{t("table.rows.holdco.name")}</span><span>{t("table.rows.holdco.country")}</span><span>{t("table.rows.holdco.filing")}</span><span className="st st-over">{t("table.rows.holdco.status")}</span></div>
                  <div className="ent-row"><span>{t("table.rows.topco.name")}</span><span>{t("table.rows.topco.country")}</span><span>{t("table.rows.topco.filing")}</span><span className="st st-due">{t("table.rows.topco.status")}</span></div>
                  <div className="ent-row"><span>{t("table.rows.opco.name")}</span><span>{t("table.rows.opco.country")}</span><span>{t("table.rows.opco.filing")}</span><span className="st st-over">{t("table.rows.opco.status")}</span></div>
                  <div className="ent-row"><span>{t("table.rows.ipco.name")}</span><span>{t("table.rows.ipco.country")}</span><span>{t("table.rows.ipco.filing")}</span><span className="st st-due">{t("table.rows.ipco.status")}</span></div>
                  <div className="ent-row"><span>{t("table.rows.subco.name")}</span><span>{t("table.rows.subco.country")}</span><span>{t("table.rows.subco.filing")}</span><span className="st st-ok">{t("table.rows.subco.status")}</span></div>
                </div>
              </div>
              <span className="bento-card__expand" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2H2v4M10 14h4v-4M2 2l5 5M14 14l-5-5"/></svg></span>
              <div className="bento-card__border" aria-hidden="true"><div className="bento-card__border-glow"></div></div>
            </article>

          </div>
        </div>
      </div>
    </section>
  );
}
