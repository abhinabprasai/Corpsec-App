export default function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-head bento-head reveal">
          <span className="eyebrow">Pricing</span>
          <h2 className="bento-headline"><span className="lead">Plans that scale with your entities.</span> <span className="rest">Start free, incorporate your first entity for one all-in price, or run a whole portfolio on a dedicated plan.</span></h2>
        </div>

        <div className="pricing-grid reveal">

          {/* FREE */}
          <article className="bento-card price-card price-card--free" data-slot="card">
            <div className="bento-card__border"></div>
            <div className="bento-card__border-glow"></div>
            <div className="bento-card__inner price-card__inner">
              <div className="price-card__col price-card__col--main">
                <span className="price-tag" data-slot="badge" data-variant="outline">Free</span>
                <h3 className="price-card__name">Explore</h3>
                <p className="price-card__desc">For founders comparing jurisdictions before they commit to an entity.</p>
                <a href="#recommender" className="btn btn-dark price-card__cta" data-slot="button" data-variant="secondary" data-cta="gabriella">Try the recommender</a>
              </div>
              <div className="price-card__divider" aria-hidden="true"></div>
              <div className="price-card__col price-card__col--meta">
                <div className="price-meta">
                  <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M3 6h12M3 18h7"/></svg> Unlimited recommendations</span>
                  <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3.1-5 7-5s7 1.7 7 5"/><circle cx="17" cy="7" r="2.4"/><path d="M16 11.5c2.9.4 5 1.9 5 4.5"/></svg> Any team size</span>
                </div>
                <div className="price-card__includes">
                  <span className="price-card__label">Free includes:</span>
                  <ul className="price-card__list">
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Jurisdiction recommender (Gabriella)</li>
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Cost, tax &amp; timeline breakdowns</li>
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Compliance checklist, PDF export</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* ENTERPRISE */}
          <article className="bento-card price-card price-card--enterprise" data-slot="card">
            <div className="bento-card__border"></div>
            <div className="bento-card__border-glow"></div>
            <div className="bento-card__inner price-card__inner price-card__inner--enterprise">
              <div className="price-card__top">
                <div className="price-card__col price-card__col--main">
                  <span className="price-tag price-tag--accent" data-slot="badge" data-variant="secondary">Custom pricing</span>
                  <h3 className="price-card__name">Scale</h3>
                  <p className="price-card__desc">For companies running a portfolio of entities across multiple jurisdictions.</p>
                  <a href="#" className="btn btn-dark price-card__cta" data-slot="button" data-variant="secondary" data-cta="contact" data-source="pricing_scale">Talk to sales</a>
                </div>
                <div className="price-globe">
                  <canvas className="price-globe__gfx" data-gfx="globe" aria-hidden="true"></canvas>
                </div>
              </div>
              <div className="price-card__divider price-card__divider--h" aria-hidden="true"></div>
              <div className="price-meta price-meta--row">
                <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Custom entity count</span>
                <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3.1-5 7-5s7 1.7 7 5"/><circle cx="17" cy="7" r="2.4"/><path d="M16 11.5c2.9.4 5 1.9 5 4.5"/></svg> Unlimited seats</span>
              </div>
              <div className="price-card__includes">
                <span className="price-card__label">Enterprise includes:</span>
                <ul className="price-card__list price-card__list--2col">
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Multi-jurisdiction structuring</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Dedicated account manager</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Priority filings &amp; renewals</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Consolidated invoicing</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Banking partner network access</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Licensed local tax advisory</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Compliance monitoring &amp; alerts</li>
                  <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> SLA-backed priority support</li>
                </ul>
              </div>
            </div>
          </article>

          {/* STARTER */}
          <article className="bento-card price-card price-card--starter" data-slot="card">
            <div className="bento-card__border"></div>
            <div className="bento-card__border-glow"></div>
            <div className="bento-card__inner price-card__inner">
              <div className="price-card__col price-card__col--main">
                <span className="price-badge" data-slot="badge" data-variant="default">Most popular</span>
                <span className="price-tag" data-slot="badge" data-variant="outline">From £120/month</span>
                <h3 className="price-card__name">Launch</h3>
                <p className="price-card__desc">For founders incorporating their first entity and getting banked fast.</p>
                <a href="#recommender" className="btn btn-primary price-card__cta" data-slot="button" data-variant="default" data-cta="incorp">Start incorporation</a>
              </div>
              <div className="price-card__divider" aria-hidden="true"></div>
              <div className="price-card__col price-card__col--meta">
                <div className="price-meta">
                  <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> 1 entity, 1 jurisdiction</span>
                  <span className="price-meta__item"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5 4.5 5.5v5c0 4.7 3.2 8.4 7.5 10 4.3-1.6 7.5-5.3 7.5-10v-5L12 2.5Z"/></svg> Registered agent included</span>
                </div>
                <div className="price-card__includes">
                  <span className="price-card__label">Everything in Explore, and:</span>
                  <ul className="price-card__list">
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Full incorporation &amp; registration</li>
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Registered address &amp; local agent</li>
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Banking introduction (Mercury, Wise, Revolut)</li>
                    <li><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.2 2.2L15.8 9.4"/></svg> Document vault &amp; e-signatures</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

        </div>

        <div className="pricing-foot reveal">
          <a href="#" className="btn btn-ghost pricing-foot__btn" data-slot="button" data-variant="outline">Compare all features <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
