import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useGabriella } from "@/components/gabriella/GabriellaProvider"
import { useIncorporation } from "@/components/incorporation/IncorporationProvider"
import { usePageMeta } from "@/lib/usePageMeta"

export default function About() {
  const { open: openGabriella } = useGabriella()
  const { open: openIncorporation } = useIncorporation()

  usePageMeta(
    "About — the team behind CorpSec | CorpSec",
    "We turned 79 jurisdictions and 30+ licensed local partners into one back office — so founders stop guessing where to incorporate. Meet the people (and the AI) who run it."
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
          <span className="eyebrow">About CorpSec</span>
          <h1 className="page-hero__title">We made “where should I incorporate?” a two-minute question.</h1>
          <p className="page-hero__sub">CorpSec turns 79 jurisdictions and 30+ licensed local partners into one back office. You tell us where — or let our advisor tell you. We handle the formation, the address, the filings and the accounting. One dashboard. One invoice.</p>
          <div className="page-hero__cta">
            <button type="button" onClick={() => openIncorporation()} className="btn btn-primary btn-lg" data-slot="button" data-variant="default" data-size="lg">Start my company</button>
            <a className="btn btn-ghost btn-lg" href="#team" data-slot="button" data-variant="outline" data-size="lg">Meet the team</a>
          </div>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="section about-story">
        <div className="container">
          <div className="section-head about-story__head reveal" style={{ textAlign: "left", marginLeft: 0, maxWidth: 760 }}>
            <span className="eyebrow">Why we built it</span>
            <h2>Picking the wrong jurisdiction is a six-figure mistake — we got tired of watching founders make it.</h2>
            <p className="sub">The “right” answer depends on your investors, customers, bank and tax exposure — and the wrong one can stall a round or cost years to unwind. The advice was scattered across four advisors who each sold what they had. So we built the opposite.</p>
          </div>
          <div className="about-story__grid reveal">
            <article className="bento-card about-pcard" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <div className="about-pcard__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg></div>
                <h3>The fit, not the margin</h3>
                <p>Our advisor ranks all 79 jurisdictions for your situation. We get paid the same wherever you land — so the recommendation is the one that’s actually right for you.</p>
              </div>
            </article>
            <article className="bento-card about-pcard" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <div className="about-pcard__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v16"/></svg></div>
                <h3>One dashboard, one invoice</h3>
                <p>Every renewal, filing and bookkeeping deadline is handled by licensed local partners and surfaced in one place. No chasing registries in languages you don’t speak.</p>
              </div>
            </article>
            <article className="bento-card about-pcard" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <div className="about-pcard__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 4 6v5c0 4.6 3.2 8.3 8 9.7 4.8-1.4 8-5.1 8-9.7V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg></div>
                <h3>Licensed, insured, accountable</h3>
                <p>Work is delivered by regulated corporate-service providers and accountants in each jurisdiction — professional-indemnity insured, not a forum thread and a prayer.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== STATS BAND ===== */}
      <section className="section band-tint about-stats">
        <div className="container">
          <div className="about-stats__grid reveal">
            <div className="about-stat"><b>79</b><span>jurisdictions covered</span></div>
            <div className="about-stat"><b>500+</b><span>companies incorporated</span></div>
            <div className="about-stat"><b>48h</b><span>average to incorporate</span></div>
            <div className="about-stat"><b>30+</b><span>licensed local partners</span></div>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="section about-team" id="team">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">The humans (and one who isn’t)</span>
            <h2>The people who keep your company in good standing.</h2>
            <p className="sub">Credentials first, personality second — but we’d be lying if we said the second part didn’t matter.</p>
          </div>
          <div className="team-grid reveal">

            <article className="bento-card team-card" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar" data-h="1" aria-hidden="true">MC</span>
                <h3 className="team-card__name">Maya Chen</h3>
                <span className="team-card__role">Co-founder &amp; CEO</span>
                <p className="team-card__bio">Eight years structuring cross-border holdings at a Big Four firm before deciding the spreadsheets had won. Started CorpSec so founders stop emailing four advisors to answer one question.</p>
                <p className="team-card__fun">Can recite the corporate tax rate of any country you shout at her. Please don’t test this at parties.</p>
              </div>
            </article>

            <article className="bento-card team-card" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar" data-h="2" aria-hidden="true">DO</span>
                <h3 className="team-card__name">Daniel Okonkwo</h3>
                <span className="team-card__role">Co-founder &amp; Head of Legal</span>
                <p className="team-card__bio">Qualified solicitor who has filed in 14 jurisdictions and read more articles of association than is medically advisable. Keeps our jurisdiction data honest and current.</p>
                <p className="team-card__fun">Firmly believes a boring cap table is a beautiful cap table.</p>
              </div>
            </article>

            <article className="bento-card team-card" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar" data-h="3" aria-hidden="true">SM</span>
                <h3 className="team-card__name">Sofia Marchetti</h3>
                <span className="team-card__role">Head of Partnerships</span>
                <p className="team-card__bio">Vets and manages the 30+ licensed local providers behind every filing — so you never have to cold-email a registry in a language you don’t speak.</p>
                <p className="team-card__fun">Maintains a personal vendetta against vague invoices.</p>
              </div>
            </article>

            <article className="bento-card team-card" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar" data-h="4" aria-hidden="true">AP</span>
                <h3 className="team-card__name">Arjun Patel</h3>
                <span className="team-card__role">Head of Product &amp; Engineering</span>
                <p className="team-card__bio">Built the dashboard that turns 30+ partners and a wall of deadlines into one calendar and one invoice. Spends his day removing steps from the flow.</p>
                <p className="team-card__fun">Measures success in deadlines you never had to remember.</p>
              </div>
            </article>

            <article className="bento-card team-card" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar" data-h="5" aria-hidden="true">LB</span>
                <h3 className="team-card__name">Lena Brandt</h3>
                <span className="team-card__role">Head of Operations</span>
                <p className="team-card__bio">Keeps 500+ companies in good standing across every time zone. If a filing is due next month, Lena already knows — and so will you.</p>
                <p className="team-card__fun">Runs on flat whites and a colour-coded calendar she refuses to explain.</p>
              </div>
            </article>

            <article className="bento-card team-card team-card--bot" data-slot="card">
              <div className="bento-card__border"></div><div className="bento-card__border-glow"></div>
              <div className="bento-card__inner">
                <span className="team-card__avatar team-card__avatar--bot" data-h="6" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 7V4M9 13h.01M15 13h.01M9 17h6"/><path d="M2 12v2M22 12v2"/></svg>
                </span>
                <h3 className="team-card__name">Gabriella <span className="team-card__tag">AI</span></h3>
                <span className="team-card__role">Incorporation Advisor</span>
                <p className="team-card__bio">Not a person — our advisor. Eight questions, two minutes, a ranked shortlist with the reasoning spelled out. Recommends the fit, not the margin.</p>
                <p className="team-card__fun">Doesn’t sleep, doesn’t upsell, and has strong, unsolicited opinions about Delaware.</p>
                <button type="button" onClick={() => openGabriella()} className="team-card__link" data-cta="gabriella">Ask Gabriella <span aria-hidden="true">→</span></button>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="jx-cta2"><div className="container">
        <div className="jx-cta2__wrap reveal">
          <h2 className="jx-cta2__line">Ready when you are. <button type="button" onClick={() => openIncorporation()} className="jx-cta2__pill" data-cta="incorp">Start my company <span aria-hidden="true">→</span></button> or talk to a real human first.</h2>
          <p className="jx-cta2__sub">Formation, address, accounting — in 48h on average. <Link className="jx-cta2__link" to="/contact">Contact the team →</Link></p>
          <div className="jx-cta2__stats"><div><b>79</b><span>jurisdictions</span></div><div><b>48h</b><span>avg. to incorporate</span></div><div><b>500+</b><span>companies</span></div></div>
        </div>
      </div></section>

    </div>
  )
}
