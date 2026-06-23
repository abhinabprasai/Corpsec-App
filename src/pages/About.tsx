import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useGabriella } from "@/components/gabriella/GabriellaProvider"
import { useIncorporation } from "@/components/incorporation/IncorporationProvider"
import { usePageMeta } from "@/lib/usePageMeta"

export default function About() {
  const { t } = useTranslation("about")
  const { open: openGabriella } = useGabriella()
  const { open: openIncorporation } = useIncorporation()

  usePageMeta(
    t("meta.title"),
    t("meta.description")
  )

  useEffect(() => {
    document.body.className = "jx-page about-page"
    return () => { document.body.className = "" }
  }, [])

  return (
    <div id="about" className="about-main">

      {/* ===== HERO ===== */}
      <section className="page-hero">
        <div className="page-hero__glow" aria-hidden="true"></div>
        <div className="container page-hero__inner reveal">
          <span className="eyebrow">{t("hero.eyebrow")}</span>
          <h1 className="page-hero__title">{t("hero.title")}</h1>
          <p className="page-hero__sub">{t("hero.sub")}</p>
          <div className="page-hero__cta">
            <button type="button" onClick={() => openIncorporation()} className="btn btn-primary btn-lg" data-slot="button" data-variant="default" data-size="lg">{t("hero.cta.primary")}</button>
            <a className="btn btn-ghost btn-lg" href="#team" data-slot="button" data-variant="outline" data-size="lg">{t("hero.cta.secondary")}</a>
          </div>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="section about-story">
        <div className="container">
          <div className="section-head about-story__head reveal" style={{ textAlign: "left", marginLeft: 0, maxWidth: 760 }}>
            <span className="eyebrow">{t("story.eyebrow")}</span>
            <h2>{t("story.heading")}</h2>
            <p className="sub">{t("story.sub")}</p>
          </div>
          <div className="about-story__grid reveal">
            <article className="bento-card about-pcard" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <div className="about-pcard__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg></div>
                <h3>{t("story.cards.fit.title")}</h3>
                <p>{t("story.cards.fit.body")}</p>
              </div>
            </article>
            <article className="bento-card about-pcard" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <div className="about-pcard__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v16"/></svg></div>
                <h3>{t("story.cards.dashboard.title")}</h3>
                <p>{t("story.cards.dashboard.body")}</p>
              </div>
            </article>
            <article className="bento-card about-pcard" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <div className="about-pcard__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 4 6v5c0 4.6 3.2 8.3 8 9.7 4.8-1.4 8-5.1 8-9.7V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg></div>
                <h3>{t("story.cards.licensed.title")}</h3>
                <p>{t("story.cards.licensed.body")}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== STATS BAND ===== */}
      <section className="section band-tint about-stats">
        <div className="container">
          <div className="about-stats__grid reveal">
            <div className="about-stat"><b>79</b><span>{t("stats.jurisdictions")}</span></div>
            <div className="about-stat"><b>500+</b><span>{t("stats.companies")}</span></div>
            <div className="about-stat"><b>48h</b><span>{t("stats.speed")}</span></div>
            <div className="about-stat"><b>30+</b><span>{t("stats.partners")}</span></div>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="section about-team" id="team">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t("team.eyebrow")}</span>
            <h2>{t("team.heading")}</h2>
            <p className="sub">{t("team.sub")}</p>
          </div>
          <div className="team-grid reveal">

            <article className="bento-card team-card" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar" data-h="1" aria-hidden="true">MC</span>
                <h3 className="team-card__name">{t("team.maya.name")}</h3>
                <span className="team-card__role">{t("team.maya.role")}</span>
                <p className="team-card__bio">{t("team.maya.bio")}</p>
                <p className="team-card__fun">{t("team.maya.fun")}</p>
              </div>
            </article>

            <article className="bento-card team-card" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar" data-h="2" aria-hidden="true">DO</span>
                <h3 className="team-card__name">{t("team.daniel.name")}</h3>
                <span className="team-card__role">{t("team.daniel.role")}</span>
                <p className="team-card__bio">{t("team.daniel.bio")}</p>
                <p className="team-card__fun">{t("team.daniel.fun")}</p>
              </div>
            </article>

            <article className="bento-card team-card" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar" data-h="3" aria-hidden="true">SM</span>
                <h3 className="team-card__name">{t("team.sofia.name")}</h3>
                <span className="team-card__role">{t("team.sofia.role")}</span>
                <p className="team-card__bio">{t("team.sofia.bio")}</p>
                <p className="team-card__fun">{t("team.sofia.fun")}</p>
              </div>
            </article>

            <article className="bento-card team-card" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar" data-h="4" aria-hidden="true">AP</span>
                <h3 className="team-card__name">{t("team.arjun.name")}</h3>
                <span className="team-card__role">{t("team.arjun.role")}</span>
                <p className="team-card__bio">{t("team.arjun.bio")}</p>
                <p className="team-card__fun">{t("team.arjun.fun")}</p>
              </div>
            </article>

            <article className="bento-card team-card" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar" data-h="5" aria-hidden="true">LB</span>
                <h3 className="team-card__name">{t("team.lena.name")}</h3>
                <span className="team-card__role">{t("team.lena.role")}</span>
                <p className="team-card__bio">{t("team.lena.bio")}</p>
                <p className="team-card__fun">{t("team.lena.fun")}</p>
              </div>
            </article>

            <article className="bento-card team-card team-card--bot" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar team-card__avatar--bot" data-h="6" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 7V4M9 13h.01M15 13h.01M9 17h6"/><path d="M2 12v2M22 12v2"/></svg>
                </span>
                <h3 className="team-card__name">{t("team.gabriella.name")} <span className="team-card__tag">AI</span></h3>
                <span className="team-card__role">{t("team.gabriella.role")}</span>
                <p className="team-card__bio">{t("team.gabriella.bio")}</p>
                <p className="team-card__fun">{t("team.gabriella.fun")}</p>
                <button type="button" onClick={() => openGabriella()} className="team-card__link" data-cta="gabriella">{t("team.gabriella.link")} <span aria-hidden="true">→</span></button>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="jx-cta2"><div className="container">
        <div className="jx-cta2__wrap reveal">
          <h2 className="jx-cta2__line">{t("cta.line.before")} <button type="button" onClick={() => openIncorporation()} className="jx-cta2__pill" data-cta="incorp">{t("cta.line.pill")} <span aria-hidden="true">→</span></button> {t("cta.line.after")}</h2>
          <p className="jx-cta2__sub">{t("cta.sub")} <Link className="jx-cta2__link" to="/contact">{t("cta.link")}</Link></p>
          <div className="jx-cta2__stats"><div><b>79</b><span>{t("cta.stats.jurisdictions")}</span></div><div><b>48h</b><span>{t("cta.stats.speed")}</span></div><div><b>500+</b><span>{t("cta.stats.companies")}</span></div></div>
        </div>
      </div></section>

    </div>
  )
}
