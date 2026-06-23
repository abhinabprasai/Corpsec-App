export default function Nav() {
  return (
    <header className="nav" id="nav">
      <div className="nav-inner">
        <a className="wordmark" href="#top" aria-label="CorpSec home">Corp<span>/</span>Sec</a>
        <nav className="nav-links" aria-label="Primary">
          <a href="jurisdictions.html">Jurisdictions</a>
          <a href="compare.html">Compare</a>
          <a href="about.html">About</a>
          <a href="contact.html">Contact</a>
        </nav>
        <div className="nav-actions">
          <span className="locale" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg> EN</span>
          <a href="#" className="btn btn-ghost btn-sm" data-slot="button" data-variant="outline" data-size="sm">Log in</a>
          <a href="#recommender" className="btn btn-primary btn-sm" data-slot="button" data-variant="default" data-size="sm" data-cta="incorp">Start my company</a>
        </div>
        <button className="nav-burger" id="burger" aria-label="Open menu" aria-expanded="false" data-slot="button" data-variant="ghost" data-size="icon">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className="nav-drawer" id="drawer">
        <a href="jurisdictions.html">Jurisdictions</a>
        <a href="compare.html">Compare</a>
        <a href="#pricing">Pricing</a>
        <a href="#how">How it works</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="#recommender" className="btn btn-primary" data-slot="button" data-variant="default" data-cta="incorp">Start my company</a>
      </div>
    </header>
  );
}
