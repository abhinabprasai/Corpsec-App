import { useEffect, useState, type CSSProperties } from "react"
import { useTranslation } from "react-i18next"
import { useParams, Link } from "react-router-dom"
import { useGabriella } from "@/components/gabriella/GabriellaProvider"
import { JX_BY_SLUG, type Jurisdiction } from "@/data/jurisdictions"
import { JURISDICTIONS_ALL } from "@/data/allJurisdictions"
import { useJxLocale } from "@/lib/useJxLocale"

/* ── Shapes for the rich fields that live under Jurisdiction's `[k:string]: unknown`
   index signature. Read off the data object at runtime; typed locally for safety. */
type Row = { label: string; value: string }
type Fit = { title: string; body: string }
type Alt = { slug: string; name: string; reason: string }
type Bundle = { priceLabel?: string; recurringLabel?: string; includes?: string[] }
type AddonItem = { name: string; price: string }
type AddonGroup = { group: string; items: AddonItem[] }
type Phase = { phase: string; when: string; items: string[] }
type Faq = { q: string; a: string }
type Source = { label: string; url: string }

const flag = (iso: string) => `https://flagcdn.com/w40/${iso.toLowerCase()}.png`
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
const firstNum = (s: string) => {
  const m = String(s).replace(/,/g, "").match(/(\d{2,})/)
  return m ? +m[1] : 0
}

/** Mirrors the slugify in Jurisdictions.tsx so a directory name resolves to the
   same slug used for routing (split on "," / "(", first segment, dashed). */
function slugify(name: string): string {
  return name
    .split(/[,(]/)[0]
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** Shape for a known-but-not-yet-rich jurisdiction looked up from JURISDICTIONS_ALL. */
type KnownJx = { name: string; iso: string; region: string }

/** Resolve a slug to a directory entry (name/iso/region) when it isn't a rich one. */
function findKnown(slug: string): KnownJx | undefined {
  const row = JURISDICTIONS_ALL.find(([name]) => slugify(name) === slug)
  return row ? { name: row[0], iso: row[1], region: row[2] } : undefined
}

/** Set the description meta tag, creating it if absent; returns the previous value
   (or null) so the caller can restore it on unmount. */
function setMetaDescription(val: string): string | null {
  let m = document.querySelector('meta[name="description"]')
  if (!m) {
    m = document.createElement("meta")
    m.setAttribute("name", "description")
    document.head.appendChild(m)
  }
  const prev = m.getAttribute("content")
  m.setAttribute("content", val)
  return prev
}

/* Pull a headline metric from memo[] (then fiscal[]) by label regex. */
function metric(j: Jurisdiction, re: RegExp): string {
  const memo = (j.memo as Row[] | undefined) ?? []
  const m = memo.find((x) => re.test(x.label))
  if (m) return m.value
  const fiscal = (j.fiscal as Row[] | undefined) ?? []
  const f = fiscal.find((x) => re.test(x.label))
  return f ? f.value : "—"
}

/* Long "a; b; c" tax strings → tidy bullet list. */
function taxBullets(val: string) {
  const parts = String(val).split(/;\s*/).map((s) => s.trim()).filter(Boolean)
  if (parts.length < 2) return null
  return (
    <ul className="jx-taxbul">
      {parts.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  )
}

const IcTax = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)
const IcClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 3.5" />
  </svg>
)
const IcTag = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2H7a1 1 0 0 0-.707.293l-4 4A1 1 0 0 0 2 7v5a1 1 0 0 0 .293.707l9 9a1 1 0 0 0 1.414 0l8-8a1 1 0 0 0 0-1.414l-9-9A1 1 0 0 0 12 2Z" />
    <circle cx="7" cy="7" r="1" fill="currentColor" />
  </svg>
)
const Check = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.2 2.2L15.8 9.4" />
  </svg>
)
const STEP_ICONS = [
  <svg key="doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7Z" /><path d="M14 3v4h4" /><path d="M9 13h6M9 17h4" /></svg>,
  <svg key="build" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6" /></svg>,
  <svg key="rocket" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M14.5 4.5C18 4 20 6 19.5 9.5c-.4 2.7-3.5 6.3-7 8.5l-4-4c2.2-3.5 5.8-6.6 8.5-7Z" /><circle cx="14.5" cy="9.5" r="1.5" /></svg>,
]

/* Compare card — anchor (current) or alternative (links to its own page). */
function CompareCard({ j, isAnchor, reason }: { j: Jurisdiction; isAnchor: boolean; reason?: string }) {
  const { t } = useTranslation("jurdetail")
  const { name: locName, region: locRegion } = useJxLocale()
  const jName = locName(j.name as string)
  const tax = metric(j, /corp/i)
  const setup = metric(j, /setup|active|timing/i)
  const price = (j.bundle as Bundle | undefined)?.priceLabel ?? "—"
  const taxBul = taxBullets(tax)
  return (
    <article className={`bento-card jx-cmp${isAnchor ? " jx-cmp--anchor" : ""} reveal`} data-slot="card">
      <div className="bento-card__border" />
      <div className="bento-card__border-glow" />
      <div className="bento-card__inner">
        {isAnchor && <span className="jx-cmp__badge">{t("compare.viewing")}</span>}
        <div className="jx-cmp__head">
          <span className="jx-flag-chip jx-flag-chip--sm">
            <img src={flag(j.iso)} alt="" width={28} height={21} />
          </span>
          <div>
            <b>{jName}</b>
            <small>{j.region ? locRegion(j.region as string) : ""}</small>
          </div>
        </div>
        <dl className="jx-cmp__metrics">
          {taxBul ? (
            <div className="jx-cmp__metric--stack">
              <dt>{t("compare.corporateTax")}</dt>
              {taxBul}
            </div>
          ) : (
            <div>
              <dt>{t("compare.corporateTax")}</dt>
              <dd>{tax}</dd>
            </div>
          )}
          <div className="jx-cmp__metric--stack">
            <dt>{t("compare.setupTime")}</dt>
            <dd>{setup}</dd>
          </div>
          <div className="jx-cmp__metric--stack">
            <dt>{t("compare.from")}</dt>
            <dd>{price}</dd>
          </div>
        </dl>
        {reason && <p className="jx-cmp__why">{reason}</p>}
        {isAnchor ? (
          <span className="jx-cmp__cur">{t("compare.current")}</span>
        ) : (
          <Link className="jx-cmp__link" to={`/jurisdiction/${j.slug}`}>
            {t("compare.view", { name: jName })} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  )
}

function AltFallback({ a }: { a: Alt }) {
  const { t } = useTranslation("jurdetail")
  const { name: locName } = useJxLocale()
  const aName = locName(a.name)
  return (
    <article className="bento-card jx-cmp reveal" data-slot="card">
      <div className="bento-card__border" />
      <div className="bento-card__inner">
        <div className="jx-cmp__head">
          <div>
            <b>{aName}</b>
          </div>
        </div>
        <p className="jx-cmp__why">{a.reason}</p>
        <Link className="jx-cmp__link" to={`/jurisdiction/${a.slug}`}>
          {t("compare.view", { name: aName })} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

export default function JurisdictionDetail() {
  const { t } = useTranslation("jurdetail")
  const { name: locName, region: locRegion } = useJxLocale()
  const { slug } = useParams<{ slug: string }>()
  const { open } = useGabriella()
  const d = slug ? JX_BY_SLUG[slug] : undefined
  // Not rich, but a known directory entry → branded "soon" landing.
  const known = !d && slug ? findKnown(slug) : undefined
  // Localized display name — English data stays the source of truth (keys, logic).
  const dName = d ? locName(d.name as string) : ""

  useEffect(() => {
    document.body.className = "jx-page"

    // SEO: title + description, restored on unmount.
    const prevTitle = document.title
    let prevDesc: string | null = null
    if (d) {
      const metaTitle = d.metaTitle as string | undefined
      const metaDescription = d.metaDescription as string | undefined
      if (metaTitle) document.title = metaTitle
      if (metaDescription) prevDesc = setMetaDescription(metaDescription)
    } else if (known) {
      document.title = t("soon.metaTitle", { name: locName(known.name) })
      prevDesc = setMetaDescription(t("soon.metaDescription", { name: locName(known.name) }))
    }

    return () => {
      document.body.className = ""
      document.title = prevTitle
      if (prevDesc !== null) setMetaDescription(prevDesc)
    }
  }, [d, known, t, locName])

  // Detail tabs (Fiscal / Legal) — real React state, replacing the vanilla wireTabs.
  const [tab, setTab] = useState<"fiscal" | "legal">("fiscal")
  // À-la-carte selection — replaces the vanilla cart wiring.
  const [picked, setPicked] = useState<Record<string, number>>({})

  // Known jurisdiction whose in-depth guide isn't written yet → branded landing.
  if (!d && known) {
    return (
      <section className="section jx-empty">
        <div className="container center">
          <Link
            className="jx-back"
            to="/jurisdictions"
            style={{ justifyContent: "center", marginBottom: "18px" } as CSSProperties}
          >
            <span aria-hidden="true">←</span> {t("backToAll")}
          </Link>
          {known.iso && (
            <span
              className="jx-flag-chip jx-flag-chip--xl"
              style={{ margin: "0 auto 18px", display: "inline-flex" } as CSSProperties}
            >
              <img src={flag(known.iso)} alt={t("flagAlt", { name: locName(known.name) })} width={52} height={39} />
            </span>
          )}
          <span className="eyebrow">{known.region ? locRegion(known.region) : t("soon.eyebrowFallback")}</span>
          <h1 className="display" style={{ fontSize: "clamp(28px,5vw,44px)" }}>
            {t("soon.heading", { name: locName(known.name) })}
          </h1>
          <p className="sub" style={{ maxWidth: "54ch", margin: "14px auto 26px" }}>
            {t("soon.body", { name: locName(known.name) })}
          </p>
          <div className="hero-cta center-cta" style={{ justifyContent: "center" }}>
            <Link
              className="btn btn-primary"
              to="/contact"
              data-slot="button"
              data-variant="default"
            >
              {t("soon.ctaSpecialist", { name: known.name })}
            </Link>
            <Link className="btn btn-ghost" to="/jurisdictions" data-slot="button" data-variant="outline">
              {t("soon.ctaBrowse")}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // Truly-unknown slug → generic fallback.
  if (!d) {
    return (
      <section className="section jx-empty">
        <div className="container center">
          <span className="eyebrow">{t("unknown.eyebrow")}</span>
          <h1 className="display" style={{ fontSize: "clamp(28px,5vw,44px)" }}>
            {t("unknown.heading")}
          </h1>
          <p className="sub" style={{ maxWidth: "48ch", margin: "14px auto 26px" }}>
            {t("unknown.body")}
          </p>
          <div className="hero-cta center-cta" style={{ justifyContent: "center" }}>
            <Link className="btn btn-primary" to="/jurisdictions" data-slot="button" data-variant="default">
              {t("unknown.ctaBrowse")}
            </Link>
            <button
              type="button"
              className="btn btn-ghost"
              data-slot="button"
              data-variant="outline"
              onClick={() => open(t("unknown.askPrompt"))}
            >
              {t("unknown.ctaAsk")}
            </button>
          </div>
        </div>
      </section>
    )
  }

  const hero = d.hero as { h1: string; sub: string }
  const tags = (d.bestForTags as string[] | undefined) ?? []
  const fits = (d.fits as Fit[] | undefined) ?? []
  const alternatives = (d.alternatives as Alt[] | undefined) ?? []
  const fiscal = (d.fiscal as Row[] | undefined) ?? []
  const legal = (d.legal as Row[] | undefined) ?? []
  const bundle = (d.bundle as Bundle | undefined) ?? {}
  const addons = (d.addons as AddonGroup[] | undefined) ?? []
  const timeline = (d.timeline as Phase[] | undefined) ?? []
  const faqs = (d.faqs as Faq[] | undefined) ?? []
  const sources = (d.sources as Source[] | undefined) ?? []
  const cur = d.currency || ""

  const cols = (d.flagColors as string[] | undefined)?.length
    ? (d.flagColors as string[])
    : ["#5b9bff", "#665efd"]
  const c1 = cols[0]
  const c2 = cols[1] || cols[0]

  const taxVal = metric(d, /corp/i)
  const setupVal = metric(d, /setup|active|timing/i)
  const priceShort = (bundle.priceLabel ?? "—").split("(")[0].trim()
  const taxBul = taxBullets(taxVal)
  const taxSub = taxVal === "—" ? t("hero.taxSubContact") : t("hero.taxSubRate")

  // Pricing: bundle vs. à-la-carte savings.
  const bundleAmt = firstNum(bundle.priceLabel ?? "")
  const bundleLabel = (bundle.priceLabel ?? "").split("(")[0].trim()
  const incItems = bundle.includes ?? []
  const incTotal = incItems.reduce((s, line) => {
    const m = line.replace(/,/g, "").match(/(\d{3,})/g)
    return s + (m ? +m[0] : 0)
  }, 0)
  const saved = incTotal > bundleAmt + 200 ? incTotal - bundleAmt : 0

  const toggle = (key: string, amount: number, on: boolean) =>
    setPicked((prev) => {
      const next = { ...prev }
      if (on) next[key] = amount
      else delete next[key]
      return next
    })

  const selKeys = Object.keys(picked)
  const selCount = selKeys.length
  const selTotal = selKeys.reduce((s, k) => s + picked[k], 0)

  const fiscalRows = fiscal
  const legalRows = legal

  return (
    <>
      {/* ───────── Hero (bento) ───────── */}
      <section className="jx-hero jx-hero--bento" style={{ "--c1": c1, "--c2": c2 } as CSSProperties}>
        <div className="container">
          <Link className="jx-back" to="/jurisdictions">
            <span aria-hidden="true">←</span> {t("backToAll")}
          </Link>
          <div className="jx-hero__bento">
            {/* Main card */}
            <article className="bento-card jx-bento-main reveal" data-slot="card" aria-label={t("hero.overviewAria", { name: dName })}>
              <div className="bento-card__border" />
              <div className="bento-card__border-glow" />
              <div className="bento-card__inner">
                <div className="jx-bento-main__head">
                  <span className="jx-flag-chip jx-flag-chip--xl">
                    <img src={flag(d.iso)} alt={t("flagAlt", { name: dName })} width={52} height={39} loading="eager" />
                  </span>
                  <div>
                    <span className="eyebrow">{d.region ? locRegion(d.region as string) : ""}</span>
                    <h1 className="jx-h1">{dName}</h1>
                  </div>
                </div>
                <p className="jx-sub">{hero.sub}</p>
                <div className="jx-tags jx-bento-main__tags">
                  {tags.map((t) => (
                    <span className="jx-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="jx-bento-main__act">
                  <div className="jx-bento-main__price">
                    <span className="jx-bento-stat__ic jx-bento-main__price-ic">
                      <IcTag />
                    </span>
                    <div>
                      <span className="jx-bento-stat__label">{t("hero.bundleFrom")}</span>
                      <span className="jx-bento-main__prval">{priceShort}</span>
                    </div>
                  </div>
                  <div className="jx-bento-main__cta">
                    <a className="btn btn-primary" href="#pricing" data-slot="button" data-variant="default">
                      {t("hero.buildPackage")}
                    </a>
                    <Link
                      className="btn btn-ghost"
                      to="/contact"
                      data-slot="button"
                      data-variant="outline"
                    >
                      {t("hero.talkSpecialist")}
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Corp tax stat */}
            <article className="bento-card jx-bento-stat reveal" data-slot="card">
              <div className="bento-card__border" />
              <div className="bento-card__border-glow" />
              <div className="bento-card__inner">
                <span className="jx-bento-stat__ic">
                  <IcTax />
                </span>
                <span className="jx-bento-stat__label">{t("hero.corporateTax")}</span>
                {taxBul ?? <span className="jx-bento-stat__val">{taxVal}</span>}
                <span className="jx-bento-stat__sub">{taxSub}</span>
              </div>
            </article>

            {/* Setup time stat */}
            <article className="bento-card jx-bento-stat reveal" data-slot="card">
              <div className="bento-card__border" />
              <div className="bento-card__border-glow" />
              <div className="bento-card__inner">
                <span className="jx-bento-stat__ic">
                  <IcClock />
                </span>
                <span className="jx-bento-stat__label">{t("hero.setupTime")}</span>
                <span className="jx-bento-stat__val">{setupVal}</span>
                <span className="jx-bento-stat__sub">{t("hero.setupSub")}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ───────── Fits ───────── */}
      {fits.length > 0 && (
        <section className="section jx-fits">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{t("fits.eyebrow")}</span>
              <h2>{t("fits.heading", { name: dName })}</h2>
              <p className="sub">{t("fits.sub")}</p>
            </div>
            <div className="jx-fits__grid">
              {fits.map((f, i) => (
                <article className="bento-card jx-fit reveal" data-slot="card" key={i}>
                  <div className="bento-card__border" />
                  <div className="bento-card__border-glow" />
                  <div className="bento-card__inner">
                    <span className="jx-fit__n">{pad(i + 1)}</span>
                    <h3>{f.title}</h3>
                    <p>{f.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── Compare ───────── */}
      <section className="section band-tint jx-compare" id="compare">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t("compare.eyebrow")}</span>
            <h2>{t("compare.heading", { name: dName })}</h2>
            <p className="sub">{t("compare.sub", { name: dName })}</p>
          </div>
          <div className="jx-cmp__grid">
            <CompareCard j={d} isAnchor />
            {alternatives.map((a) => {
              const j = JX_BY_SLUG[a.slug]
              return j ? (
                <CompareCard key={a.slug} j={j} isAnchor={false} reason={a.reason} />
              ) : (
                <AltFallback key={a.slug} a={a} />
              )
            })}
          </div>
          <div className="jx-cmp__foot reveal">
            <Link className="btn btn-ghost" to="/compare" data-slot="button" data-variant="outline">
              {t("compare.allSideBySide")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── Detail (Fiscal / Legal tabs) ───────── */}
      <section className="section jx-detail">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t("detail.eyebrow")}</span>
            <h2>{t("detail.heading")}</h2>
          </div>
          <div className="bento-card jx-detail__card reveal" data-slot="card">
            <div className="bento-card__border" />
            <div className="bento-card__inner">
              <div
                className="jx-tabs"
                role="tablist"
                aria-label={t("detail.tabsAria")}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault()
                    setTab((t) => (t === "fiscal" ? "legal" : "fiscal"))
                  } else if (e.key === "Home") {
                    e.preventDefault()
                    setTab("fiscal")
                  } else if (e.key === "End") {
                    e.preventDefault()
                    setTab("legal")
                  }
                }}
              >
                <button
                  type="button"
                  id="jxtab-fiscal"
                  className={`jx-tab${tab === "fiscal" ? " is-on" : ""}`}
                  role="tab"
                  aria-selected={tab === "fiscal"}
                  aria-controls="jxpanel-fiscal"
                  tabIndex={tab === "fiscal" ? 0 : -1}
                  data-slot="tabs-trigger"
                  data-state={tab === "fiscal" ? "active" : "inactive"}
                  onClick={() => setTab("fiscal")}
                >
                  {t("detail.tabFiscal")}
                </button>
                <button
                  type="button"
                  id="jxtab-legal"
                  className={`jx-tab${tab === "legal" ? " is-on" : ""}`}
                  role="tab"
                  aria-selected={tab === "legal"}
                  aria-controls="jxpanel-legal"
                  tabIndex={tab === "legal" ? 0 : -1}
                  data-slot="tabs-trigger"
                  data-state={tab === "legal" ? "active" : "inactive"}
                  onClick={() => setTab("legal")}
                >
                  {t("detail.tabLegal")}
                </button>
              </div>
              <div
                className={`jx-tabpanel${tab === "fiscal" ? " is-on" : ""}`}
                id="jxpanel-fiscal"
                role="tabpanel"
                aria-labelledby="jxtab-fiscal"
                data-panel="fiscal"
                data-slot="tabs-content"
                tabIndex={0}
              >
                <table className="jx-table">
                  <tbody>
                    {fiscalRows.map((r, i) => (
                      <tr key={i}>
                        <th scope="row">{r.label}</th>
                        <td>{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className={`jx-tabpanel${tab === "legal" ? " is-on" : ""}`}
                id="jxpanel-legal"
                role="tabpanel"
                aria-labelledby="jxtab-legal"
                data-panel="legal"
                data-slot="tabs-content"
                tabIndex={0}
              >
                <table className="jx-table">
                  <tbody>
                    {legalRows.map((r, i) => (
                      <tr key={i}>
                        <th scope="row">{r.label}</th>
                        <td>{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Pricing (à la carte) ───────── */}
      <section className="section band-tint jx-price" id="pricing">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t("pricing.eyebrow")}</span>
            <h2>{t("pricing.heading")}</h2>
            <p className="sub">{t("pricing.sub", { name: dName })}</p>
          </div>

          {/* Bundle card */}
          <article className="bento-card jx-pkg--bundle jx-pkg--full reveal" data-slot="card">
            <div className="bento-card__border" />
            <div className="bento-card__border-glow" />
            <div className="bento-card__inner jx-bundle-inner">
              <div className="jx-bundle-left">
                <div className="jx-bundle-badges">
                  <span className="price-badge" data-slot="badge" data-variant="default">
                    {t("pricing.completeBundle")}
                  </span>
                  <span className="jx-bundle-popular">{t("pricing.mostPopular")}</span>
                </div>
                <div className="jx-bundle-amt">{bundleLabel}</div>
                <div className="jx-bundle-rec">{bundle.recurringLabel ?? ""}</div>
                <span className="jx-bundle-save-badge">
                  <Check />
                  {saved
                    ? t("pricing.save", { cur, amount: saved.toLocaleString() })
                    : t("pricing.oneInvoice")}
                </span>
                <label className="jx-pick jx-bundle-pick">
                  <input
                    type="checkbox"
                    className="jx-pick__in"
                    checked={!!picked[`${d.name} formation bundle`]}
                    onChange={(e) => toggle(`${d.name} formation bundle`, bundleAmt, e.target.checked)}
                  />
                  <span className="jx-pick__box" aria-hidden="true" />
                  <span className="jx-bundle-pick-label">{t("pricing.addBundle")}</span>
                </label>
              </div>
              <div className="jx-bundle-right">
                <h4 className="jx-bundle-inc-h">{t("pricing.whatsIncluded")}</h4>
                <ul className="jx-bundle-inc">
                  {incItems.map((x, i) => (
                    <li key={i}>
                      <Check />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          <div className="jx-price-divider">
            <span>{t("pricing.divider")}</span>
          </div>

          <div className="jx-svc__grid" id="services">
            {addons.map((g, gi) => (
              <article className="bento-card jx-pkg reveal" data-slot="card" key={gi}>
                <div className="bento-card__border" />
                <div className="bento-card__border-glow" />
                <div className="bento-card__inner">
                  <h3 className="jx-pkg__group">{g.group}</h3>
                  <div className="jx-svc-list">
                    {g.items.map((it, ii) => {
                      const amt = firstNum(it.price)
                      const key = `${g.group}:${it.name}`
                      return (
                        <label className="jx-svc-row" key={ii}>
                          <input
                            type="checkbox"
                            className="jx-pick__in"
                            checked={!!picked[key]}
                            onChange={(e) => toggle(key, amt, e.target.checked)}
                          />
                          <span className="jx-pick__box" aria-hidden="true" />
                          <span className="jx-svc-row__name">{it.name}</span>
                          <span className="jx-svc-row__price">{it.price}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {selCount > 0 && (
          <div className="jx-cart" id="jxCart">
            <div className="container jx-cart__inner">
              <div className="jx-cart__info" role="status" aria-live="polite">
                <span className="jx-cart__count">
                  {t("cart.selected", { count: selCount })}
                </span>
                <span className="jx-cart__total">
                  {selTotal ? t("cart.total", { cur, amount: selTotal.toLocaleString() }) : ""}
                </span>
              </div>
              <button
                className="jx-cart__btn"
                type="button"
                onClick={() =>
                  open(
                    t("cart.checkoutPrompt", {
                      name: dName,
                      services: selKeys.map((k) => k.split(":").pop()).join(", "),
                    })
                  )
                }
              >
                {t("cart.checkout")} <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ───────── Timeline ───────── */}
      {timeline.length > 0 && (
        <section className="section jx-timeline">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{t("timeline.eyebrow")}</span>
              <h2>{t("timeline.heading")}</h2>
              <p className="sub">{t("timeline.sub")}</p>
            </div>
            <div className="jx-steps">
              {timeline.map((p, i) => (
                <article className="bento-card jx-step reveal" data-slot="card" key={i}>
                  <div className="bento-card__border" />
                  <div className="bento-card__border-glow" />
                  <div className="bento-card__inner">
                    <div className="jx-step__top">
                      <span className="jx-step__num">{pad(i + 1)}</span>
                      <span className="jx-step__ic">{STEP_ICONS[i] ?? STEP_ICONS[0]}</span>
                    </div>
                    <div className="jx-step__when">{p.when}</div>
                    <h3>{p.phase}</h3>
                    <ul>
                      {p.items.map((x, j) => (
                        <li key={j}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────── FAQ + sources ───────── */}
      {faqs.length > 0 && (
        <section className="section jx-faq" id="faq">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">{t("faq.eyebrow")}</span>
              <h2>{t("faq.heading", { name: dName })}</h2>
            </div>
            <div className="faq-list reveal">
              {faqs.map((f, i) => (
                <details className="faq-item" data-slot="accordion-item" key={i}>
                  <summary data-slot="accordion-trigger">
                    {f.q}
                    <span className="faq-chev" aria-hidden="true" />
                  </summary>
                  <div className="faq-a" data-slot="accordion-content" role="region">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
            {sources.length > 0 && (
              <div className="jx-sources reveal">
                <span>{t("faq.sources")}</span>
                {sources.map((s, i) => (
                  <a className="jx-src" href={s.url} target="_blank" rel="noopener" key={i}>
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ───────── Final CTA ───────── */}
      <section className="section jx-cta2">
        <div className="container">
          <div className="jx-cta2__wrap reveal">
            <h2 className="jx-cta2__line">
              {t("cta.lead", { name: dName })}{" "}
              <a className="jx-cta2__pill" href="#pricing">
                {t("cta.pill")} <span aria-hidden="true">→</span>
              </a>{" "}
              {t("cta.tail")}
            </h2>
            <p className="jx-cta2__sub">
              {t("cta.sub")}{" "}
              <Link className="jx-cta2__link" to="/contact">
                {t("cta.specialist")} →
              </Link>
            </p>
            <div className="jx-cta2__stats">
              <div>
                <b>48h</b>
                <span>{t("cta.stats.filing")}</span>
              </div>
              <div>
                <b>79</b>
                <span>{t("cta.stats.jurisdictions")}</span>
              </div>
              <div>
                <b>500+</b>
                <span>{t("cta.stats.companies")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
