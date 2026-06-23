export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-center" data-par="0.5">
          <span className="eyebrow">Global incorporation</span>
          <h1 className="display">Your company,<br /><span className="roll" id="heroRoll" aria-hidden="true"><span className="roll__item grad-shine is-in">incorporated.</span><span className="roll__item grad-shine">live in 48 hours.</span><span className="roll__item grad-shine">where it matters.</span><span className="roll__item grad-shine">in any jurisdiction.</span></span><span className="sr-only">Your company — incorporated, live in 48 hours, where it matters, in any jurisdiction.</span></h1>
          <p className="lede">Incorporation, registered address, accounting — across 79 jurisdictions. You tell us where. We handle the rest.</p>
          <div className="hero-gab">
            <form className="gab-bar" id="gabBar" autoComplete="off">
              <span className="gab-avatar" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5l1.6 4.3L18 9.4l-4.4 1.6L12 15.5l-1.6-4.5L6 9.4l4.4-1.6L12 3.5Z"/><path d="M18.5 14.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z"/></svg>
              </span>
              <input className="gab-input" id="gabInput" type="text" aria-label="Ask Gabriella where to incorporate" placeholder="Ask Gabriella where to incorporate…" data-slot="input" />
              <button className="btn btn-primary gab-send" type="submit" data-slot="button" data-variant="default">
                <span>Ask Gabriella</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </form>
            <div className="gab-chips" id="gabChips">
              <button className="gab-chip" type="button">SaaS founder raising in the US</button>
              <button className="gab-chip" type="button">Lowest-tax holding company</button>
              <button className="gab-chip" type="button">Fastest route to a bank account</button>
            </div>
            <div className="hero-sublinks">
              <span className="gab-meta"><i className="gab-dot" aria-hidden="true"></i> Gabriella · AI incorporation advisor</span>
              <a href="#jurisdictions" className="hero-textlink">or browse 79 jurisdictions →</a>
            </div>
          </div>
        </div>
        <div className="hero-scrollcue" aria-hidden="true"><span></span>Scroll to explore live markets</div>
      </div>
    </section>
  );
}
