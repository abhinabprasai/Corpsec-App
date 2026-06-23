export default function HowWorks() {
  return (
    <section className="section howworks" id="how">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">How it works</span>
          <h2>Three steps from idea to incorporated.</h2>
          <p className="sub">No lawyers to chase, no jurisdiction guesswork, no paperwork you have to read twice.</p>
        </div>
        <div className="hw-grid reveal">
          <article className="hw-card" data-slot="card">
            <span className="hw-num">01</span>
            <div className="hw-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/><path d="M11 8v6M8 11h6"/></svg></div>
            <h3>Get matched</h3>
            <p>Answer eight questions. Gabriella ranks 79 jurisdictions against your tax, banking and investor needs — free, no login.</p>
            <button className="hw-link" type="button" data-slot="button" data-variant="link" data-cta="gabriella">Run the recommender →</button>
          </article>
          <article className="hw-card" data-slot="card">
            <span className="hw-num">02</span>
            <div className="hw-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16v13H4z"/><path d="M9 7V4h6v3"/><path d="m8.5 13 2.2 2.2L16 10.4"/></svg></div>
            <h3>Incorporate remotely</h3>
            <p>We file with the registry, appoint your registered agent and hand you signed documents — banking introductions included. 48h average.</p>
            <button className="hw-link" type="button" data-slot="button" data-variant="link" data-cta="incorp">Start incorporation →</button>
          </article>
          <article className="hw-card" data-slot="card">
            <span className="hw-num">03</span>
            <div className="hw-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v4h4"/><path d="M12 8v4l3 2"/></svg></div>
            <h3>Runs on autopilot</h3>
            <p>Every renewal, filing and bookkeeping deadline handled by licensed local partners, surfaced in one dashboard — one invoice.</p>
            <a className="hw-link" href="#platform" data-slot="button" data-variant="link">See the dashboard →</a>
          </article>
        </div>
      </div>
    </section>
  );
}
