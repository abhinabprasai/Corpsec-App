import type { CSSProperties } from "react";

export default function Fear() {
  return (
    <section className="section fear" id="risk">
      <div className="container">
        <div className="section-head bento-head reveal">
          <span className="eyebrow">The risk</span>
          <h2 className="bento-headline"><span className="lead">Pick the wrong jurisdiction once.</span> <span className="rest">Then spend years — and six figures — paying tax authorities, banks and lawyers to undo it.</span></h2>
          <p className="sub">We recommend the right fit across 79 jurisdictions, not the one that pays us most.</p>
          <a href="#recommender" className="btn btn-primary" data-cta="gabriella">Find my jurisdiction — free</a>
        </div>
        <div className="bento reveal">
          <div className="bento-grid">

            <article className="bento-card bento-card--globe" data-bento-card>
              <div className="bento-card__bg"></div>
              <div className="bento-card__gfx gfx-globe" aria-hidden="true">
                <canvas className="bento-gfx" data-gfx="globe"></canvas>
                <span className="bank-pill bank-pill--1">Stripe<i className="bp-dot bp-no"></i></span>
                <span className="bank-pill bank-pill--2">Mercury<i className="bp-dot bp-ok"></i></span>
                <span className="bank-pill bank-pill--3">Wise<i className="bp-dot bp-no"></i></span>
                <span className="gfx-stat">3 providers · 3 country lists</span>
              </div>
              <div className="bento-card__inner">
                <h3 className="bento-card__title">Where you incorporate <em>and</em> where you live both decide whether Stripe, Mercury, and Wise will onboard you.</h3>
                <p className="bento-card__support">Mercury and Wise gate on your country of residence; Stripe on the company's country. Miss either list and you're locked out.</p>
              </div>
              <span className="bento-card__expand" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2H2v4M10 14h4v-4M2 2l5 5M14 14l-5-5"/></svg></span>
              <div className="bento-card__border" aria-hidden="true"><div className="bento-card__border-glow"></div></div>
            </article>

            <article className="bento-card bento-card--chart" data-bento-card>
              <div className="bento-card__bg"></div>
              <div className="bento-card__gfx gfx-chart" aria-hidden="true">
                <div className="chart-readout">
                  <span className="chart-num" data-leak>$0</span>
                  <span className="chart-cap">Cumulative leakage</span>
                </div>
                <div className="chart-bars">
                  <i style={{ "--h": "18%" } as CSSProperties}></i><i style={{ "--h": "26%" } as CSSProperties}></i><i style={{ "--h": "22%" } as CSSProperties}></i><i style={{ "--h": "38%" } as CSSProperties}></i><i style={{ "--h": "34%" } as CSSProperties}></i><i style={{ "--h": "52%" } as CSSProperties}></i><i style={{ "--h": "48%" } as CSSProperties}></i><i style={{ "--h": "66%" } as CSSProperties}></i><i style={{ "--h": "74%" } as CSSProperties}></i><i style={{ "--h": "92%" } as CSSProperties}></i>
                </div>
                <span className="gfx-stat warn">Margin eroded</span>
              </div>
              <div className="bento-card__inner">
                <h3 className="bento-card__title">A zero-tax offshore company can still be taxed at home — CFC rules and treaty gaps quietly erode every cross-border dollar.</h3>
                <p className="bento-card__support">Tax follows the people who control the company, not the registry.</p>
              </div>
              <span className="bento-card__expand" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2H2v4M10 14h4v-4M2 2l5 5M14 14l-5-5"/></svg></span>
              <div className="bento-card__border" aria-hidden="true"><div className="bento-card__border-glow"></div></div>
            </article>

            <article className="bento-card bento-card--burst" data-bento-card>
              <div className="bento-card__bg"></div>
              <div className="bento-card__gfx gfx-burst" aria-hidden="true">
                <canvas className="bento-gfx" data-gfx="burst"></canvas>
                <div className="mini-doc">
                  <div className="mini-doc__top"><span className="mini-doc__tag">Term sheet</span></div>
                  <div className="mini-doc__line"></div>
                  <div className="mini-doc__line w70"></div>
                  <div className="mini-doc__line w85"></div>
                  <div className="mini-doc__foot"><span className="mini-doc__chip">Due diligence</span></div>
                </div>
                <span className="gfx-stat danger">Round stalled</span>
              </div>
              <div className="bento-card__inner">
                <h3 className="bento-card__title">VCs read a jurisdiction mismatch as amateur execution, and a non-Delaware entity can stall the round mid-diligence.</h3>
                <p className="bento-card__support">Most US venture money requires a Delaware C-corp.</p>
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
                  <div className="holo-card__label">Certificate of Incorporation</div>
                  <div className="holo-card__cost">$25–75k</div>
                </div>
              </div>
              <div className="bento-card__inner">
                <h3 className="bento-card__title">Moving a mis-incorporated entity is a full cross-border reorganization — legal and accounting fees routinely run five figures.</h3>
                <p className="bento-card__support">The flip triggers tax advice in two countries and fresh consents.</p>
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
                  <div className="meter__center"><b>Low</b><small>Substance level</small></div>
                </div>
                <span className="flag-tag">Grey-list watch</span>
                <span className="gfx-stat warn">Substance: low</span>
              </div>
              <div className="bento-card__inner">
                <h3 className="bento-card__title">Offshore hubs now demand real economic substance — and one grey- or blacklisting can wreck your banking and tax position overnight.</h3>
                <p className="bento-card__support">Lists change after you incorporate, often with little warning.</p>
              </div>
              <span className="bento-card__expand" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2H2v4M10 14h4v-4M2 2l5 5M14 14l-5-5"/></svg></span>
              <div className="bento-card__border" aria-hidden="true"><div className="bento-card__border-glow"></div></div>
            </article>

            <article className="bento-card bento-card--table" data-bento-card>
              <div className="bento-card__bg"></div>
              <div className="bento-card__inner">
                <div className="bento-card__text-col">
                  <h3 className="bento-card__title">One missed filing can dissolve the entity holding your IP, bank accounts and cap table.</h3>
                  <p className="bento-card__support">Lost good standing surfaces at the worst moment — mid-raise.</p>
                  <span className="gfx-stat danger">3 entities · 2 overdue</span>
                </div>
                <div className="ent-table" aria-hidden="true">
                  <div className="ent-row ent-head"><span>Entity</span><span>Country</span><span>Filing</span><span>Status</span></div>
                  <div className="ent-row"><span>HoldCo</span><span>BVI</span><span>Economic substance</span><span className="st st-over">Overdue</span></div>
                  <div className="ent-row"><span>TopCo</span><span>Delaware</span><span>Franchise tax</span><span className="st st-due">Due</span></div>
                  <div className="ent-row"><span>OpCo</span><span>UK</span><span>Confirmation stmt</span><span className="st st-over">Overdue</span></div>
                  <div className="ent-row"><span>IP Co</span><span>Cayman</span><span>Annual return</span><span className="st st-due">Due</span></div>
                  <div className="ent-row"><span>SubCo</span><span>Singapore</span><span>Annual filing</span><span className="st st-ok">Filed</span></div>
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
