export default function Platform() {
  return (
    <section className="section platform" id="platform">
      <div className="container">
        <div className="platform-head">
          <div className="platform-head__lead reveal">
            <span className="eyebrow">A real customer's stack</span>
            <h2>Watch a company come to life.</h2>
            <p className="sub">Every CorpSec customer gets the same dashboard. Status, renewals, filings, documents — surfaced quietly, never demanding.</p>
          </div>
          <div className="platform-head__note reveal">
            <div className="platform-note" data-lg data-lg-blur="0.5px">
              <canvas className="platform-note__gfx" data-gfx="proofgeo" aria-hidden="true"></canvas>
              <b>Two entities? Twenty? One dashboard.</b>
              <span>About 40% of CorpSec customers run 2–5 entities across countries. The back office consolidates filings, renewals and bookkeeping into one view — one named account manager, one invoice.</span>
            </div>
          </div>
        </div>

        <div className="platform-switch reveal">
          <span className="platform-switch__label">See it for</span>
          <div className="platform-pills" id="platformPills" role="tablist" aria-label="Choose a jurisdiction" data-slot="tabs-list"></div>
        </div>

        <div className="platform-board reveal" id="platformBoard" aria-live="polite">
          {/* rendered by dashboard.js */}
        </div>
      </div>
    </section>
  );
}
