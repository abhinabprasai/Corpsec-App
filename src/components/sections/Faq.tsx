export default function Faq() {
  return (
    <section className="section band-tint faq" id="faq">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">FAQ</span>
          <h2>Questions founders ask before they incorporate.</h2>
        </div>
        <div className="faq-list reveal" data-slot="accordion" data-orientation="vertical">
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">Where should I actually incorporate?<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>That's exactly what Gabriella answers. The recommender ranks 79 jurisdictions against your tax exposure, banking options and investor expectations — free, in two minutes.</p></div>
          </details>
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">Do I have to live in the country I incorporate in?<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>Almost never. Most of our jurisdictions allow 100% remote, non-resident setup. Where local substance or a resident director is required, we provide it.</p></div>
          </details>
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">Can you actually get me a bank account?<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>We make introductions to Mercury, Wise, Revolut and local partners, matched to a jurisdiction they'll onboard. Your country of incorporation — not where you live — decides who'll bank you.</p></div>
          </details>
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">What does it really cost — all in?<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>You see government fees, our fee and recurring annual costs itemised before you commit. No generic tiers, no surprise renewals.</p></div>
          </details>
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">Can I move my company later if I get it wrong?<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>Yes, but re-domiciliation is a five-figure cross-border project. The recommender exists so you don't have to.</p></div>
          </details>
          <details className="faq-item" data-slot="accordion-item">
            <summary data-slot="accordion-trigger">Who actually does the work?<span className="faq-chev" aria-hidden="true"></span></summary>
            <div className="faq-a" data-slot="accordion-content" role="region"><p>Licensed corporate service providers and regulated professionals in each jurisdiction, all with professional indemnity. CorpSec coordinates and gives you one dashboard.</p></div>
          </details>
        </div>
        <div className="faq-foot reveal">
          <span>Still weighing your options?</span>
          <button className="btn btn-primary" type="button" data-slot="button" data-variant="default" data-cta="gabriella">Ask Gabriella — free</button>
        </div>
      </div>
    </section>
  );
}
