export default function FinalCta() {
  return (
    <section className="section band-primary finalcta">
      <div className="container center reveal">
        <h2 className="on-dark">Start where it actually matters.</h2>
        <p className="sub on-dark-sub">Formation, address and accounting — 48h on average. Not sure where to begin? Two minutes, no login.</p>
        <div className="hero-cta center-cta">
          <a href="#recommender" className="btn btn-white btn-lg" data-slot="button" data-variant="secondary" data-size="lg" data-cta="gabriella">Find my jurisdiction</a>
          <a href="#" className="btn btn-ghost-light btn-lg" data-slot="button" data-variant="outline" data-size="lg" data-cta="contact" data-source="final_cta">Talk to sales</a>
        </div>
        <p className="cta-trust">79 jurisdictions · 19 services · 500+ founders incorporated</p>
      </div>
    </section>
  );
}
