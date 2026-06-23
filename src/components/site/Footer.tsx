import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { useGabriella } from "@/components/gabriella/GabriellaProvider"

export default function Footer() {
  const { open } = useGabriella()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (subscribed) return
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!ok) {
      setSubscribed(false)
      return
    }
    setSubscribed(true)
  }

  return (
    <footer className="footer">
      <span className="foot-watermark" aria-hidden="true"><svg viewBox="0 0 43 43" fill="none"><path fill="currentColor" fillRule="evenodd" d="m0 43 43-9.119V0L0 9.226V43Z" clipRule="evenodd" /></svg></span>
      {/* top: brand + newsletter */}
      <div className="container foot-top">
        <div className="foot-brand">
          <Link className="wordmark on-dark" to="/">Corp<span>/</span>Sec</Link>
          <p>Your company, anywhere it matters.</p>
          <span className="foot-brand__trust">500+ companies incorporated across 79 jurisdictions.</span>
          <button className="foot-gab" type="button" onClick={() => open()}>
            <span className="foot-gab__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="7" width="16" height="12" rx="3" /><path d="M12 7V4M9 13h.01M15 13h.01M9 17h6" /><path d="M2 12v2M22 12v2" /></svg></span>
            <span className="foot-gab__tx"><b>Ask Gabriella <span className="foot-gab__ai">AI</span></b><small>Find your jurisdiction in 2 minutes — free</small></span>
            <span className="foot-gab__go" aria-hidden="true">→</span>
          </button>
        </div>
        <div className="foot-sub">
          <h4>Cross-border briefing</h4>
          <p>Jurisdiction changes, tax-treaty updates and filing deadlines — once a month, no noise.</p>
          <form className="foot-sub-bar" id="footSub" autoComplete="off" onSubmit={handleSubmit}>
            <input type="email" id="footSubInput" placeholder="you@company.com" aria-label="Email address" data-slot="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="btn btn-primary btn-sm" type="submit" data-slot="button" data-variant="default" data-size="sm">Subscribe</button>
          </form>
          <span className="foot-sub__note" id="footSubNote">{subscribed ? "Thanks — you're on the list. Check your inbox to confirm." : "No spam. Unsubscribe anytime."}</span>
        </div>
      </div>

      {/* columns */}
      <div className="container foot-cols">
        <div className="foot-col">
          <h4>Product</h4>
          <button type="button" onClick={() => open()}>Gabriella advisor</button>
          <Link to="/jurisdictions">All 79 jurisdictions</Link>
          <Link to="/compare">Compare jurisdictions</Link>
          <Link to="/#backoffice">Company formation</Link>
          <Link to="/#pricing">Pricing</Link>
        </div>
        <div className="foot-col">
          <h4>Solutions</h4>
          <button type="button" onClick={() => open()}>SaaS &amp; startups</button>
          <button type="button" onClick={() => open()}>Holding companies</button>
          <button type="button" onClick={() => open()}>E-commerce &amp; DTC</button>
          <button type="button" onClick={() => open()}>Crypto &amp; Web3</button>
          <button type="button" onClick={() => open()}>Solo founders</button>
        </div>
        <div className="foot-col">
          <h4>Resources</h4>
          <Link to="/jurisdictions">Jurisdiction guides</Link>
          <Link to="/compare">Compare jurisdictions</Link>
          <Link to="/#how">How it works</Link>
          <Link to="/#faq">Help center</Link>
        </div>
        <div className="foot-col">
          <h4>Company</h4>
          <Link to="/about">About CorpSec</Link>
          <Link to="/about#team">Meet the team</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/contact">Talk to sales</Link>
        </div>
        <div className="foot-col">
          <h4>Legal</h4>
          <Link to="/#">Terms of service</Link>
          <Link to="/#">Privacy policy</Link>
          <Link to="/#">Cookie policy</Link>
          <a href="mailto:hello@corpsec.io">hello@corpsec.io</a>
        </div>
      </div>

      {/* trust / compliance strip */}
      <div className="container foot-trust">
        <div className="foot-badges">
          <span className="foot-badge">256-bit encryption</span>
          <span className="foot-badge">Encrypted document vault</span>
          <span className="foot-badge">GDPR-aligned</span>
          <span className="foot-badge">Licensed CSP network</span>
          <span className="foot-badge">Professional indemnity insured</span>
        </div>
        <p className="foot-disclaimer">CorpSec is a coordination platform. Incorporation, registered-agent and accounting services are delivered by licensed corporate service providers and regulated professionals in each jurisdiction (powered by Koulier, Bookiper and 30+ partners). CorpSec does not provide legal or tax advice.</p>
      </div>

      {/* legal bar */}
      <div className="container foot-bar">
        <span className="foot-copy">© 2026 CorpSec — Your company, anywhere it matters.</span>
        <div className="foot-locale">
          <span className="foot-pill"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" /></svg> English</span>
          <span className="foot-pill">USD $</span>
        </div>
        <div className="foot-social">
          <a href="#" aria-label="CorpSec on LinkedIn"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.1c0-1.22-.02-2.8-1.95-2.8s-2.25 1.32-2.25 2.7V21h-4z" /></svg></a>
          <a href="#" aria-label="CorpSec on X"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
          <a href="#" aria-label="CorpSec on GitHub"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.13-4.55-5.04 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04A9.4 9.4 0 0 1 12 6.85c.85 0 1.71.12 2.51.34 1.91-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.73 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" /></svg></a>
        </div>
      </div>
    </footer>
  )
}
