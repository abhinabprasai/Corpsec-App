import { useTranslation } from "react-i18next";

export default function Social() {
  const { t } = useTranslation("social");
  return (
    <section className="section social" id="proof">
      <div className="container">
        <div className="section-head bento-head reveal">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="bento-headline"><span className="lead">{t("headline.lead")}</span> <span className="rest">{t("headline.rest")}</span></h2>
          <p className="sub">{t("sub")}</p>
        </div>

        <div className="proof-bento reveal">

          {/* LEFT — tall feature card with minimal geometry graphic */}
          <article className="bento-card pcard pcard--feature" data-slot="card">
            <div className="bento-card__border"></div>
            <div className="bento-card__border-glow"></div>
            <canvas className="pcard-gfx" data-gfx="proofgeo" aria-hidden="true"></canvas>
            <div className="bento-card__inner pcard__inner">
              <div className="pcard__metric">
                <span className="pnum">{t("feature.metric")}</span>
                <span className="pnum-cap">{t("feature.caption")}</span>
              </div>
              <blockquote className="pquote">
                <span className="pquote-mark" aria-hidden="true">”</span>
                <p>{t("feature.quote")}</p>
              </blockquote>
              <footer className="pperson">
                <img className="pphoto" src="https://i.pravatar.cc/96?img=12" alt="" loading="lazy" width="44" height="44" />
                <span className="pperson-meta"><b>{t("feature.name")}</b><small>{t("feature.role")}</small></span>
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
                <span className="pnum">{t("wide.metric")}</span>
                <span className="pnum-cap">{t("wide.caption")}</span>
              </div>
              <blockquote className="pquote">
                <span className="pquote-mark" aria-hidden="true">”</span>
                <p>{t("wide.quote")}</p>
              </blockquote>
              <footer className="pperson">
                <img className="pphoto" src="https://i.pravatar.cc/96?img=47" alt="" loading="lazy" width="44" height="44" />
                <span className="pperson-meta"><b>{t("wide.name")}</b><small>{t("wide.role")}</small></span>
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
                  <p>{t("cycle1.slide1.quote")}</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=33" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>{t("cycle1.slide1.name")}</b><small>{t("cycle1.slide1.role")}</small></span></footer>
                </div>
                <div className="pcycle-slide">
                  <span className="pquote-mark" aria-hidden="true">”</span>
                  <p>{t("cycle1.slide2.quote")}</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=5" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>{t("cycle1.slide2.name")}</b><small>{t("cycle1.slide2.role")}</small></span></footer>
                </div>
                <div className="pcycle-slide">
                  <span className="pquote-mark" aria-hidden="true">”</span>
                  <p>{t("cycle1.slide3.quote")}</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=15" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>{t("cycle1.slide3.name")}</b><small>{t("cycle1.slide3.role")}</small></span></footer>
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
                  <p>{t("cycle2.slide1.quote")}</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=26" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>{t("cycle2.slide1.name")}</b><small>{t("cycle2.slide1.role")}</small></span></footer>
                </div>
                <div className="pcycle-slide">
                  <span className="pquote-mark" aria-hidden="true">”</span>
                  <p>{t("cycle2.slide2.quote")}</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=60" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>{t("cycle2.slide2.name")}</b><small>{t("cycle2.slide2.role")}</small></span></footer>
                </div>
                <div className="pcycle-slide">
                  <span className="pquote-mark" aria-hidden="true">”</span>
                  <p>{t("cycle2.slide3.quote")}</p>
                  <footer className="pperson"><img className="pphoto" src="https://i.pravatar.cc/96?img=68" alt="" loading="lazy" width="36" height="36" /><span className="pperson-meta"><b>{t("cycle2.slide3.name")}</b><small>{t("cycle2.slide3.role")}</small></span></footer>
                </div>
              </div>
            </div>
          </article>

        </div>

        {/* footer strip: clients · rating · view all */}
        <div className="proof-foot reveal">
          <span className="proof-foot__clients">{t("foot.clients")}</span>
          <div className="proof-foot__rating">
            <span className="proof-stars" aria-hidden="true">★★★★★</span>
            <b>4.9</b>
            <small>{t("foot.ratingBasis")}</small>
          </div>
          <a href="#" className="btn btn-ghost proof-foot__btn" data-slot="button" data-variant="outline">{t("foot.viewAll")} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
