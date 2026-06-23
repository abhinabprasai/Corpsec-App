export default function Recommender() {
  return (
    <section className="section band-dark recommender" id="recommender">
      <div className="container two-col">
        <div className="reveal">
          <span className="eyebrow light">The advisor</span>
          <h2 className="on-dark">Eight questions. Two minutes.<br />The right jurisdiction.</h2>
          <p className="sub on-dark-sub">Gabriella cross-checks 79 jurisdictions against your tax exposure, banking options, investor optics and residency — then shows you the ranked shortlist with a full explanation of why.</p>
          <div className="chips">
            <span className="chip">✓ Free</span><span className="chip">✓ No login</span><span className="chip">✓ No sales call</span>
          </div>
          <a href="#recommender" className="btn btn-white" data-cta="gabriella">Start the 2-minute match</a>
        </div>
        <div className="reveal">
          <div className="steps">
            <span className="step done">Profile</span><span className="step-sep"></span>
            <span className="step done">Matching</span><span className="step-sep"></span>
            <span className="step active">Report ready</span>
          </div>
          <div className="reco-card" data-lg data-lg-blur="0.5px">
            <div className="reco-top">
              <span className="iso big">SG</span>
              <div>
                <div className="reco-name">Singapore <span className="reco-rank">ranked #1</span></div>
                <div className="reco-meta">Setup 2 days · First year SGD 5,234</div>
              </div>
              <span className="reco-tax">Corp tax<br /><b>~8.25%</b></span>
            </div>
            <div className="reco-banking">
              <span>Banking</span>
              <span className="bk">Remote ✓</span><span className="bk">Stripe ✓</span><span className="bk">Wise ✓</span><span className="bk">Mercury ✓</span>
            </div>
            <div className="reco-foot">
              <span className="reco-also">Also considered: Estonia · UK · Delaware</span>
              <a href="#" className="btn btn-primary btn-sm" data-cta="incorp" data-jur="Singapore">Start in Singapore →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
