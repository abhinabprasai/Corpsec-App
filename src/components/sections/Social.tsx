export default function Social() {
  return (
    <section className="section social" id="proof">
      <div className="container">
        <div className="section-head bento-head reveal">
          <span className="eyebrow">Track record</span>
          <h2 className="bento-headline"><span className="lead">Founders who got it right.</span> <span className="rest">500+ companies incorporated across 79 jurisdictions — here's what the right structure actually changed.</span></h2>
          <p className="sub">The jurisdictions, savings and timelines founders landed on after running the recommender.</p>
        </div>

        <div className="proof-bento reveal">

          {/* LEFT — tall feature card with minimal geometry graphic */}
          <article className="bento-card pcard pcard--feature" data-slot="card">
            <div className="bento-card__border"></div>
            <div className="bento-card__border-glow"></div>
            <canvas className="pcard-gfx" data-gfx="proofgeo" aria-hidden="true"></canvas>
            <div className="bento-card__inner pcard__inner">
              <div className="pcard__metric">
                <span className="pnum">8×</span>
                <span className="pnum-cap">faster to a fully-banked entity</span>
              </div>
              <blockquote className="pquote">
                <span className="pquote-mark" aria-hidden="true">”</span>
                <p>"We were stuck between Delaware, Singapore and Estonia for six weeks. CorpSec ran the numbers in two minutes — we incorporated and opened banking the same week."</p>
              </blockquote>
              <footer className="pperson">
                <img className="pphoto" src="https://i.pravatar.cc/96?img=12" alt="" loading="lazy" width="44" height="44" />
                <span className="pperson-meta"><b>Marcus Chen</b><small>Co-founder & CTO · Vaultly · Estonia</small></span>
                <span className="pbrand" aria-label="Vaultly">
                  <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M9 1.6 2.4 4.3v4.6c0 4 2.8 6.9 6.6 8.1 3.8-1.2 6.6-4.1 6.6-8.1V4.3L9 1.6Z" /></svg>
                </span>
              </footer>
            </div>
          </article>

          {/* TOP RIGHT — wide card spanning two columns */}
          <article className="bento-card pcard pcard--wide" data-slot="card">
            <div className="bento-card__border"></div>
            <div className="bento-card__border-glow"></div>
            <div className="bento-card__inner pcard__inner">
              <div className="pcard__metric pcard__metric--row">
                <span className="pnum">79</span>
                <span className="pnum-cap">jurisdictions, one dashboard, one invoice</span>
              </div>
              <blockquote className="pquote">
                <span className="pquote-mark" aria-hidden="true">”</span>
                <p>"From entity selection to banking and accounting, every detail was handled by licensed local partners. We launched in three countries without ever leaving the dashboard."</p>
              </blockquote>
              <footer className="pperson">
                <img className="pphoto" src="https://i.pravatar.cc/96?img=47" alt="" loading="lazy" width="44" height="44" />
                <span className="pperson-meta"><b>Sarah Lindqvist</b><small>COO · Northwind Labs · Singapore</small></span>
                <span className="pbrand pbrand-lg" aria-label="Northwind Labs">
                  <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 1.8 18 10l-8 8.2L2 10 10 1.8Z" /><path d="M10 6.4 13.6 10 10 13.6 6.4 10 10 6.4Z" /></svg>
                </span>
              </footer>
            </div>
          </article>

          {/* BOTTOM MIDDLE — autoscrolling cycle card */}
          <article className="bento-card pcard pcard--cycle" data-cycle data-cycle-start="0" data-slot="card">
            <div className="bento-card__border"></div>
            <div className="bento-card__border-glow"></div>
            <div className="pcycle-viewport">
              <div className="pcycle-track">
                <div className="pcycle-slide">
                  <span className="pquote-mark" aria-hidden="true">”</span>
                  <p>"Two entities, two countries, one dashboard. I stopped chasing filing deadlines across three providers."</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=33" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>Tom Becker</b><small>CEO · PulseCore · United Kingdom</small></span></footer>
                </div>
                <div className="pcycle-slide">
                  <span className="pquote-mark" aria-hidden="true">”</span>
                  <p>"They flagged Singapore for our Asian customer base and banking. Set up in two days — banking the same week."</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=5" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>Aisha Latif</b><small>Founder · Mirego · Singapore</small></span></footer>
                </div>
                <div className="pcycle-slide">
                  <span className="pquote-mark" aria-hidden="true">”</span>
                  <p>"The recommender saved us $12k versus the quote from local counsel — and it took two minutes."</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=15" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>Diego Moreno</b><small>Founder · Cobalt · Delaware</small></span></footer>
                </div>
              </div>
            </div>
          </article>

          {/* BOTTOM RIGHT — autoscrolling cycle card */}
          <article className="bento-card pcard pcard--cycle" data-cycle data-cycle-start="1" data-slot="card">
            <div className="bento-card__border"></div>
            <div className="bento-card__border-glow"></div>
            <div className="pcycle-viewport">
              <div className="pcycle-track">
                <div className="pcycle-slide">
                  <span className="pquote-mark" aria-hidden="true">”</span>
                  <p>"CorpSec nailed our holding structure with a fast turnaround and real attention to the tax detail. The final setup felt bank-grade."</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=26" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>Hannah Okonkwo</b><small>CFO · Lumen · United Arab Emirates</small></span></footer>
                </div>
                <div className="pcycle-slide">
                  <span className="pquote-mark" aria-hidden="true">”</span>
                  <p>"One account manager, one invoice, three jurisdictions. Renewals just happen now — I never think about them."</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=60" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>Daniel Roth</b><small>CEO · Ember & Co · Germany</small></span></footer>
                </div>
                <div className="pcycle-slide">
                  <span className="pquote-mark" aria-hidden="true">”</span>
                  <p>"We needed a modern structure set up at startup speed. CorpSec delivered — incorporated and compliant in under a week."</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=68" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>Priya Nair</b><small>Founder · Northstar · Ireland</small></span></footer>
                </div>
              </div>
            </div>
          </article>

        </div>

        {/* footer strip: clients · rating · view all */}
        <div className="proof-foot reveal">
          <span className="proof-foot__clients">1,500+ founders trust CorpSec with their entities</span>
          <div className="proof-foot__rating">
            <span className="proof-stars" aria-hidden="true">★★★★★</span>
            <b>4.9</b>
            <small>Based on 1.5k reviews</small>
          </div>
          <a href="#" className="btn btn-ghost proof-foot__btn" data-slot="button" data-variant="outline">View all reviews <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
