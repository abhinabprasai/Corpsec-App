import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { JX_DATA, JX_BY_SLUG, type Jurisdiction } from "@/data/jurisdictions"
import { JURISDICTIONS_ALL } from "@/data/allJurisdictions"
import { useGabriella } from "@/components/gabriella/GabriellaProvider"
import { Input } from "@/components/ui/input"

const flag = (iso: string) => `https://flagcdn.com/w40/${iso.toLowerCase()}.png`

interface LabelValue {
  label: string
  value: string
}

/** metric(): read a memo/fiscal value by label regex — mirrors hub.js metric(). */
function metric(j: Jurisdiction, re: RegExp): string {
  const memo = (j.memo as LabelValue[] | undefined) || []
  const m = memo.filter((x) => re.test(x.label))[0]
  if (m) return m.value
  const fiscal = (j.fiscal as LabelValue[] | undefined) || []
  const f = fiscal.filter((x) => re.test(x.label))[0]
  return f ? f.value : "—"
}

/** Long corporate-tax sentences → tidy bullet list (mirrors hub.js taxBullets). */
function taxBullets(val: string): string[] | null {
  const parts = String(val)
    .split(/;\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
  if (parts.length < 2) return null
  return parts
}

/** Mirrors the vanilla slugify so flagship rows resolve to their JX_BY_SLUG key. */
function slugify(name: string): string {
  return name
    .split(/[,(]/)[0]
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

interface DirEntry {
  name: string
  iso: string
  region: string
  slug: string
  rich: boolean
}

const ALL_TAB = "All"
const REGION_ORDER = [
  "North America",
  "Europe",
  "Asia",
  "Middle East",
  "Offshore",
  "Latin America",
  "South America",
  "Africa",
  "Oceania",
  "Other",
]

/** Build the directory once: 79 entries with their flagship flag + region order. */
const DIRECTORY: DirEntry[] = JURISDICTIONS_ALL.map(([name, iso, region]) => {
  const slug = slugify(name)
  return { name, iso, region: region || "Other", slug, rich: !!JX_BY_SLUG[slug] }
})

const REGIONS: string[] = (() => {
  const present = Array.from(new Set(DIRECTORY.map((d) => d.region)))
  present.sort((a, b) => {
    const ia = REGION_ORDER.indexOf(a)
    const ib = REGION_ORDER.indexOf(b)
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
  })
  return [ALL_TAB, ...present]
})()

export default function Jurisdictions() {
  const { open } = useGabriella()
  const [query, setQuery] = useState("")
  const [region, setRegion] = useState(ALL_TAB)

  useEffect(() => {
    document.body.className = "jx-page"
    return () => {
      document.body.className = ""
    }
  }, [])

  const q = query.trim().toLowerCase()

  // Filtered + grouped directory, preserving region order.
  const grouped = useMemo(() => {
    const filtered = DIRECTORY.filter((d) => {
      if (region !== ALL_TAB && d.region !== region) return false
      if (!q) return true
      return d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q)
    })
    const byRegion = new Map<string, DirEntry[]>()
    for (const d of filtered) {
      const list = byRegion.get(d.region)
      if (list) list.push(d)
      else byRegion.set(d.region, [d])
    }
    return Array.from(byRegion.entries()).sort((a, b) => {
      const ia = REGION_ORDER.indexOf(a[0])
      const ib = REGION_ORDER.indexOf(b[0])
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
    })
  }, [q, region])

  const matchCount = grouped.reduce((n, [, list]) => n + list.length, 0)

  return (
    <>
      {/* ===== HERO + SEARCH ===== */}
      <section className="hub-hero">
        <div className="container hub-hero__inner reveal">
          <span className="eyebrow">79 jurisdictions · one back office</span>
          <h1 className="hub-h1">
            Find where to<br />
            <span className="grad-shine">incorporate</span>.
          </h1>
          <p className="hub-sub">
            Search any country, compare tax, speed and all-in cost, then set up with a licensed local
            partner — incorporation and every back-office service in one place.
          </p>
          <form
            className="hub-search"
            role="search"
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <svg
              className="hub-search__ic"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <Input
              className="hub-search__in"
              type="text"
              aria-label="Search jurisdictions"
              placeholder="Search — Singapore, Delaware, Dubai…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <div className="hub-quick" aria-label="Popular jurisdictions">
            {JX_DATA.map((j) => (
              <Link key={j.slug} className="hub-pill" to={`/jurisdiction/${j.slug}`}>
                <img src={flag(j.iso)} alt="" width={18} height={14} />
                {j.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR (rich bento cards) ===== */}
      <section className="section hub-pop" id="popular">
        <div className="container">
          <div className="section-head bento-head reveal">
            <span className="eyebrow">Most chosen</span>
            <h2 className="bento-headline">
              <span className="lead">Where founders actually go.</span>{" "}
              <span className="rest">
                The jurisdictions we cover in depth — tax, setup and all-in cost up front.
              </span>
            </h2>
          </div>
          <div className="hub-pop__grid" id="jxPopular">
            {JX_DATA.map((j) => {
              const tax = metric(j, /corp/i)
              const setup = metric(j, /setup|active|timing/i)
              const bundle = j.bundle as { priceLabel?: string } | undefined
              const price = (bundle && bundle.priceLabel) || "—"
              const tags = ((j.bestForTags as string[] | undefined) || []).slice(0, 2)
              const taxBul = taxBullets(tax)
              return (
                <Link
                  key={j.slug}
                  className="bento-card hub-card reveal"
                  data-slot="card"
                  to={`/jurisdiction/${j.slug}`}
                >
                  <div className="bento-card__border" />
                  <div className="bento-card__border-glow" />
                  <div className="bento-card__inner">
                    <div className="hub-card__top">
                      <span className="jx-flag-chip">
                        <img src={flag(j.iso)} alt="" width={34} height={26} />
                      </span>
                      <div className="hub-card__id">
                        <b>{j.name}</b>
                        <small>{j.region || ""}</small>
                      </div>
                    </div>
                    <dl className="hub-card__metrics">
                      {taxBul ? (
                        <div className="hub-card__metric--stack">
                          <dt>Corp tax</dt>
                          <ul className="jx-taxbul">
                            {taxBul.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div>
                          <dt>Corp tax</dt>
                          <dd>{tax}</dd>
                        </div>
                      )}
                      <div className="hub-card__metric--stack">
                        <dt>Setup</dt>
                        <dd>{setup}</dd>
                      </div>
                      <div className="hub-card__metric--stack">
                        <dt>From</dt>
                        <dd>{price}</dd>
                      </div>
                    </dl>
                    <div className="hub-card__tags">
                      {tags.map((t) => (
                        <span key={t} className="hub-card__tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="hub-card__go">
                      Explore {j.name} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== ALL BY REGION ===== */}
      <section className="section band-tint hub-all" id="all">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Full coverage</span>
            <h2>All 79 jurisdictions.</h2>
            <p className="sub">Filter by region or search to narrow instantly.</p>
          </div>

          <div className="filters reveal" role="tablist" aria-label="Filter by region">
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={region === r}
                className={region === r ? "filter active" : "filter"}
                onClick={() => setRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="hub-all__regions">
            {grouped.map(([regionName, list]) => (
              <div className="hub-region" data-region={regionName} key={regionName}>
                <h3 className="hub-region__h">
                  {regionName} <span className="hub-region__n">{list.length}</span>
                </h3>
                <div className="hub-region__grid">
                  {list.map((j) => (
                    <Link
                      key={j.slug + j.name}
                      className="hub-mini"
                      to={`/jurisdiction/${j.slug}`}
                    >
                      <span className="jx-flag-chip jx-flag-chip--sm">
                        <img
                          src={flag(j.iso)}
                          alt=""
                          width={24}
                          height={18}
                          loading="lazy"
                        />
                      </span>
                      <span className="hub-mini__name">
                        {j.name}
                        {j.rich && (
                          <>
                            {" "}
                            <span
                              className="hub-mini__dot"
                              title="In-depth guide"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </span>
                      <span className="hub-mini__go" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {matchCount === 0 && (
            <p className="hub-all__empty">
              No jurisdiction matches that search.{" "}
              <button
                className="hw-link"
                type="button"
                onClick={() => open(query.trim() || undefined)}
              >
                Ask Gabriella instead →
              </button>
            </p>
          )}
        </div>
      </section>

      {/* ===== SERVICES (merged) ===== */}
      <section className="section hub-svc" id="services">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">What we handle — in every jurisdiction</span>
            <h2>Incorporation is step one. We run the rest.</h2>
            <p className="sub">
              Every service below is delivered locally, in the jurisdiction you choose — as a full
              bundle or à la carte on any country page.
            </p>
          </div>
          <div className="hub-svc__grid reveal">
            <article className="bento-card hub-svccard" data-slot="card">
              <div className="bento-card__border" />
              <div className="bento-card__border-glow" />
              <div className="bento-card__inner">
                <div className="hub-svccard__ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 7h16v13H4z" />
                    <path d="M9 7V4h6v3" />
                    <path d="m8.5 13 2.2 2.2L16 10.4" />
                  </svg>
                </div>
                <h3>Form</h3>
                <p>
                  Incorporation, registered agent, share issuance, director appointments — filed
                  with the local registry.
                </p>
              </div>
            </article>
            <article className="bento-card hub-svccard" data-slot="card">
              <div className="bento-card__border" />
              <div className="bento-card__border-glow" />
              <div className="bento-card__inner">
                <div className="hub-svccard__ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2.5 4.5 5.5v5c0 4.7 3.2 8.4 7.5 10 4.3-1.6 7.5-5.3 7.5-10v-5L12 2.5Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3>Operate</h3>
                <p>
                  Registered address, corporate secretary, annual returns, KYC and good-standing —
                  kept current, every year.
                </p>
              </div>
            </article>
            <article className="bento-card hub-svccard" data-slot="card">
              <div className="bento-card__border" />
              <div className="bento-card__border-glow" />
              <div className="bento-card__inner">
                <div className="hub-svccard__ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 3h14a1 1 0 0 1 1 1v17l-3-2-2 2-3-2-3 2-2-2-3 2V4a1 1 0 0 1 1-1Z" />
                    <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
                  </svg>
                </div>
                <h3>Run</h3>
                <p>
                  Bookkeeping, tax filing, payroll, VAT/GST and banking introductions — certified
                  accountants in your jurisdiction.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section jx-cta2">
        <div className="container">
          <div className="jx-cta2__wrap reveal">
            <h2 className="jx-cta2__line">
              Not sure where to start?{" "}
              <button className="jx-cta2__pill" type="button" onClick={() => open()}>
                Ask Gabriella — free <span aria-hidden="true">→</span>
              </button>{" "}
              to rank all 79 for you.
            </h2>
            <p className="jx-cta2__sub">
              Eight questions, two minutes — matched on tax, banking and investor needs.{" "}
              <Link className="jx-cta2__link" to="/contact">
                Talk to a specialist →
              </Link>
            </p>
            <div className="jx-cta2__stats">
              <div>
                <b>79</b>
                <span>jurisdictions</span>
              </div>
              <div>
                <b>48h</b>
                <span>avg. to incorporate</span>
              </div>
              <div>
                <b>500+</b>
                <span>companies</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
