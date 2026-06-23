import { useEffect, useMemo, useState, type CSSProperties } from "react"
import { Link } from "react-router-dom"
import { JX_DATA, JX_BY_SLUG } from "@/data/jurisdictions"
import { JURISDICTIONS_ALL } from "@/data/allJurisdictions"
import { useGabriella } from "@/components/gabriella/GabriellaProvider"
import { Input } from "@/components/ui/input"

const flag = (iso: string) => `https://flagcdn.com/w40/${iso.toLowerCase()}.png`

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
                  {list.map((j) =>
                    j.rich ? (
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
                          {j.name}{" "}
                          <span
                            className="hub-mini__dot"
                            title="In-depth guide"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="hub-mini__go" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    ) : (
                      <button
                        key={j.slug + j.name}
                        type="button"
                        className="hub-mini"
                        style={{ textAlign: "left" } as CSSProperties}
                        onClick={() =>
                          open(
                            `I'm considering incorporating in ${j.name} (${j.region}). Is it a good fit for me?`,
                          )
                        }
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
                        <span className="hub-mini__name">{j.name}</span>
                        <span className="hub-mini__go" aria-hidden="true">
                          →
                        </span>
                      </button>
                    ),
                  )}
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
