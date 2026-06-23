import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { JX_DATA, JX_BY_SLUG, type Jurisdiction } from "@/data/jurisdictions"
import { JURISDICTIONS_ALL } from "@/data/allJurisdictions"
import { useGabriella } from "@/components/gabriella/GabriellaProvider"
import { Input } from "@/components/ui/input"
import { usePageMeta } from "@/lib/usePageMeta"
import { useJxLocale } from "@/lib/useJxLocale"

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
  const { t } = useTranslation("jurisdictions")
  const { name: locName } = useJxLocale()
  const { open } = useGabriella()
  const [query, setQuery] = useState("")
  const [region, setRegion] = useState(ALL_TAB)

  // Translate region/tab labels for display only; the raw value stays the
  // matching key against imported jurisdiction data. Unknown regions fall back
  // to their raw label.
  const regionLabel = (r: string) => {
    const key = `regions.${r}`
    const translated = t(key)
    return translated === key ? r : translated
  }

  usePageMeta(t("meta.title"), t("meta.description"))

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
      // match the English name/region AND the localized display name, so search
      // works whether the visitor types "Switzerland" or "Suisse".
      return (
        d.name.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        locName(d.name).toLowerCase().includes(q)
      )
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
  }, [q, region, locName])

  const matchCount = grouped.reduce((n, [, list]) => n + list.length, 0)

  return (
    <>
      {/* ===== HERO + SEARCH ===== */}
      <section className="hub-hero">
        <div className="container hub-hero__inner reveal">
          <span className="eyebrow">{t("hero.eyebrow")}</span>
          <h1 className="hub-h1">
            {t("hero.headlineLead")}<br />
            <span className="grad-shine">{t("hero.headlineWord")}</span>{t("hero.headlineEnd")}
          </h1>
          <p className="hub-sub">{t("hero.sub")}</p>
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
              aria-label={t("hero.searchAria")}
              placeholder={t("hero.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <div className="hub-quick" aria-label={t("hero.popularAria")}>
            {JX_DATA.map((j) => (
              <Link key={j.slug} className="hub-pill" to={`/jurisdiction/${j.slug}`}>
                <img src={flag(j.iso)} alt="" width={18} height={14} />
                {locName(j.name)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POPULAR (rich bento cards) ===== */}
      <section className="section hub-pop" id="popular">
        <div className="container">
          <div className="section-head bento-head reveal">
            <span className="eyebrow">{t("popular.eyebrow")}</span>
            <h2 className="bento-headline">
              <span className="lead">{t("popular.headlineLead")}</span>{" "}
              <span className="rest">{t("popular.headlineRest")}</span>
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
                        <b>{locName(j.name)}</b>
                        <small>{j.region ? regionLabel(j.region) : ""}</small>
                      </div>
                    </div>
                    <dl className="hub-card__metrics">
                      {taxBul ? (
                        <div className="hub-card__metric--stack">
                          <dt>{t("card.corpTax")}</dt>
                          <ul className="jx-taxbul">
                            {taxBul.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div>
                          <dt>{t("card.corpTax")}</dt>
                          <dd>{tax}</dd>
                        </div>
                      )}
                      <div className="hub-card__metric--stack">
                        <dt>{t("card.setup")}</dt>
                        <dd>{setup}</dd>
                      </div>
                      <div className="hub-card__metric--stack">
                        <dt>{t("card.from")}</dt>
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
                      {t("card.explore", { name: locName(j.name) })} <span aria-hidden="true">→</span>
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
            <span className="eyebrow">{t("all.eyebrow")}</span>
            <h2>{t("all.headline")}</h2>
            <p className="sub">{t("all.sub")}</p>
          </div>

          <div className="filters reveal" role="tablist" aria-label={t("all.filterAria")}>
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={region === r}
                className={region === r ? "filter active" : "filter"}
                onClick={() => setRegion(r)}
              >
                {regionLabel(r)}
              </button>
            ))}
          </div>

          <div className="hub-all__regions">
            {grouped.map(([regionName, list]) => (
              <div className="hub-region" data-region={regionName} key={regionName}>
                <h3 className="hub-region__h">
                  {regionLabel(regionName)} <span className="hub-region__n">{list.length}</span>
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
                        {locName(j.name)}
                        {j.rich && (
                          <>
                            {" "}
                            <span
                              className="hub-mini__dot"
                              title={t("all.inDepthGuide")}
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
              {t("all.emptyLead")}{" "}
              <button
                className="hw-link"
                type="button"
                onClick={() => open(query.trim() || undefined)}
              >
                {t("all.emptyCta")} →
              </button>
            </p>
          )}
        </div>
      </section>

      {/* ===== SERVICES (merged) ===== */}
      <section className="section hub-svc" id="services">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t("services.eyebrow")}</span>
            <h2>{t("services.headline")}</h2>
            <p className="sub">{t("services.sub")}</p>
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
                <h3>{t("services.form.title")}</h3>
                <p>{t("services.form.body")}</p>
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
                <h3>{t("services.operate.title")}</h3>
                <p>{t("services.operate.body")}</p>
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
                <h3>{t("services.run.title")}</h3>
                <p>{t("services.run.body")}</p>
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
              {t("cta.lead")}{" "}
              <button className="jx-cta2__pill" type="button" onClick={() => open()}>
                {t("cta.pill")} <span aria-hidden="true">→</span>
              </button>{" "}
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
                <b>79</b>
                <span>{t("cta.stats.jurisdictions")}</span>
              </div>
              <div>
                <b>48h</b>
                <span>{t("cta.stats.incorporate")}</span>
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
