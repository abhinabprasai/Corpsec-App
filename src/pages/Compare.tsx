import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover"
import { useGabriella } from "@/components/gabriella/GabriellaProvider"
import { JX_BY_SLUG } from "@/data/jurisdictions"
import { JURISDICTIONS_ALL } from "@/data/allJurisdictions"
import { usePageMeta } from "@/lib/usePageMeta"
import { useJxLocale } from "@/lib/useJxLocale"

/* ── Comparison data for the 6 flagship jurisdictions (the exact fields the
   vanilla compare.js used). Name / iso / region come from JX_DATA (the single
   source of truth); these are the comparison-specific metrics. ────────────── */
interface CmpData {
  region?: string /* row-key only; value always read from the column (JX_DATA) */
  entity: string
  corpTax: string
  vatGst: string
  cgt: string
  personalTax: string
  dividendWH: string
  lossCarry: string
  minCapital: string
  residentDir: string
  setupTime: string
  yearOne: string | null
  annualFilings: string
  banking: string
  bestFor: string[]
}

const CMP_DATA: Record<string, CmpData> = {
  singapore: {
    entity: "Private Limited (Pte Ltd)",
    corpTax: "17% headline · ~8.25% effective on first S$200k",
    vatGst: "9% GST (Jan 2024)",
    cgt: "None",
    personalTax: "Progressive 0–22%",
    dividendWH: "0%",
    lossCarry: "Indefinite",
    minCapital: "S$1",
    residentDir: "Required",
    setupTime: "~10 days",
    yearOne: "From S$5,234 (~$4,130 USD)",
    annualFilings: "Annual Return + AGM; IRAS profits tax return",
    banking: "DBS or OCBC introductions",
    bestFor: ["APAC HQ", "ASEAN & India", "IP & trading", "Treaty network"],
  },
  "hong-kong": {
    entity: "Private company limited by shares",
    corpTax: "8.25% on first HK$2M · 16.5% above",
    vatGst: "None",
    cgt: "None",
    personalTax: "Salaries tax 2–17%",
    dividendWH: "None",
    lossCarry: "Indefinite (trade losses)",
    minCapital: "HK$1 (1 share)",
    residentDir: "Not required",
    setupTime: "~1 week",
    yearOne: "From US$1,950",
    annualFilings: "Annual Return to CR; Profits Tax return to IRD",
    banking: "HSBC or Standard Chartered introductions",
    bestFor: ["Asia trading gateway", "China & Greater Bay", "Foreign-income treatment", "Holding companies"],
  },
  "united-kingdom": {
    entity: "Private limited company (Ltd)",
    corpTax: "25% main rate · 19% small-profits rate (≤£50k profit)",
    vatGst: "20% VAT (register from £90k turnover)",
    cgt: "Included in corporation tax",
    personalTax: "20–45% income tax",
    dividendWH: "None (treaty-dependent)",
    lossCarry: "Indefinite carry-forward; 1 yr carry-back",
    minCapital: "£1",
    residentDir: "Not required",
    setupTime: "~48 hours",
    yearOne: "From £936",
    annualFilings: "Confirmation statement + accounts (CH); CT600 to HMRC",
    banking: "Wise, Revolut, Tide or high-street introductions",
    bestFor: ["EU/UK-facing SaaS", "Fintech", "Holding companies", "Fast setup"],
  },
  estonia: {
    entity: "OÜ (private limited company)",
    corpTax: "0% on retained profits · 22% on distribution (2025)",
    vatGst: "22% VAT",
    cgt: "None at company level (taxed on distribution)",
    personalTax: "20% flat income tax",
    dividendWH: "22% distribution tax (paid by company)",
    lossCarry: "Distribution-tax model — not applicable",
    minCapital: "€0.01 (no upfront payment)",
    residentDir: "Not required",
    setupTime: "~48 hours via e-Residency",
    yearOne: "From €1,678",
    annualFilings: "Annual report to Business Registry; tax return to MTA",
    banking: "LHV or Wise introductions",
    bestFor: ["EU digital-first", "Remote founders", "Reinvest-to-grow", "e-Residency"],
  },
  dubai: {
    entity: "Free Zone LLC (e.g. IFZA) or mainland LLC",
    corpTax: "9% on income over AED 375k · 0% for qualifying free-zone persons",
    vatGst: "5% VAT",
    cgt: "None",
    personalTax: "0% (no personal income tax in UAE)",
    dividendWH: "None",
    lossCarry: "Indefinite",
    minCapital: "AED 1,000 (varies by free zone)",
    residentDir: "Not required",
    setupTime: "~2 weeks",
    yearOne: "From AED 37,500 (~$15,200 USD)",
    annualFilings: "Annual licence renewal; CT return to UAE FTA",
    banking: "Emirates NBD or ADCB introductions",
    bestFor: ["UAE residency & visa", "0% personal tax", "Web3 / crypto", "MENA & Africa gateway"],
  },
  delaware: {
    entity: "C-Corporation (VC standard) or LLC",
    corpTax: "21% federal CIT + Delaware franchise tax",
    vatGst: "No federal VAT — sales tax by state",
    cgt: "Taxed as ordinary income (21% corp rate)",
    personalTax: "Federal 10–37% income tax",
    dividendWH: "30% on non-residents (treaty may reduce)",
    lossCarry: "Indefinite (≤80% of taxable income per year)",
    minCapital: "No minimum",
    residentDir: "Not required (registered agent needed)",
    setupTime: "~5 days",
    yearOne: "From ~$2,038 USD",
    annualFilings: "Delaware franchise tax; federal & state tax returns",
    banking: "Mercury, Brex or major bank introductions",
    bestFor: ["VC-backed startups", "SAFE / priced rounds", "Stock-option plans", "US-market focus"],
  },
}

/* Order of flagship quick-add chips (compare.js FLAGSHIP order). */
const FLAGSHIP = ["singapore", "hong-kong", "united-kingdom", "estonia", "dubai", "delaware"] as const
const MAX = 5

/* ── Row definitions — exact categories / labels from compare.js ROWS.
   `labelKey` holds an i18n key resolved with t() at render. ───────────────── */
type Row =
  | { type: "cat"; labelKey: string }
  | { key: keyof CmpData; labelKey: string; type?: "tags" | "director" | "price" }

const ROWS: Row[] = [
  { type: "cat", labelKey: "rows.cat.glance" },
  { key: "region", labelKey: "rows.region" },
  { key: "entity", labelKey: "rows.entity" },
  { key: "bestFor", labelKey: "rows.bestFor", type: "tags" },
  { type: "cat", labelKey: "rows.cat.tax" },
  { key: "corpTax", labelKey: "rows.corpTax" },
  { key: "vatGst", labelKey: "rows.vatGst" },
  { key: "cgt", labelKey: "rows.cgt" },
  { key: "personalTax", labelKey: "rows.personalTax" },
  { key: "dividendWH", labelKey: "rows.dividendWH" },
  { key: "lossCarry", labelKey: "rows.lossCarry" },
  { type: "cat", labelKey: "rows.cat.incorporation" },
  { key: "minCapital", labelKey: "rows.minCapital" },
  { key: "residentDir", labelKey: "rows.residentDir", type: "director" },
  { key: "setupTime", labelKey: "rows.setupTime" },
  { key: "yearOne", labelKey: "rows.yearOne", type: "price" },
  { type: "cat", labelKey: "rows.cat.ongoing" },
  { key: "annualFilings", labelKey: "rows.annualFilings" },
  { key: "banking", labelKey: "rows.banking" },
]

/* ── Search index over all 79 jurisdictions, mapped to a flagship slug when
   the name matches one of the 6 with full data. ──────────────────────────── */
interface SearchEntry {
  name: string
  iso: string
  region: string
  slug: string | null
  key: string
}

const NAME_TO_SLUG: Record<string, string> = {
  Singapore: "singapore",
  "United Kingdom": "united-kingdom",
  "Dubai, UAE": "dubai",
  "Delaware, USA": "delaware",
  Estonia: "estonia",
  "Hong Kong": "hong-kong",
}

function slugify(n: string): string {
  return n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

const SEARCH_IDX: SearchEntry[] = JURISDICTIONS_ALL.map(([name, iso, region]) => {
  const slug = NAME_TO_SLUG[name] ?? null
  return { name, iso, region, slug, key: slug ?? slugify(name) }
})

function flag(iso: string): string {
  return `https://flagcdn.com/w40/${iso.toLowerCase()}.png`
}

/* ── A selected comparison column. ─────────────────────────────────────────── */
interface Col {
  key: string
  name: string
  iso: string
  region: string
  slug: string | null
  data: CmpData | null /* null === stub (one of the 73 without full data) */
}

function makeCol(entry: SearchEntry): Col {
  const slug = entry.slug
  /* Prefer JX_DATA (single source of truth) for display name / iso / region. */
  const jx = slug ? JX_BY_SLUG[slug] : undefined
  return {
    key: entry.key,
    name: jx?.name ?? entry.name,
    iso: jx?.iso ?? entry.iso,
    region: jx?.region ?? entry.region,
    slug: slug,
    data: slug ? (CMP_DATA[slug] ?? null) : null,
  }
}

export default function Compare() {
  const { t } = useTranslation("compare")
  const { name: locName, region: locRegion } = useJxLocale()
  const { open } = useGabriella()
  const [cols, setCols] = useState<Col[]>([])
  const [search, setSearch] = useState("")
  const [popoverOpen, setPopoverOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const cmdkInputRef = useRef<HTMLInputElement>(null)

  usePageMeta(t("meta.title"), t("meta.description"))

  useEffect(() => {
    document.body.className = "jx-page compare-page"
    return () => {
      document.body.className = ""
    }
  }, [])

  const full = cols.length >= MAX
  const activeKeys = useMemo(() => new Set(cols.map((c) => c.key)), [cols])

  function addByKey(key: string) {
    if (full) return
    if (activeKeys.has(key)) return
    const entry = SEARCH_IDX.find((e) => e.key === key)
    if (!entry) return
    setCols((prev) => [...prev, makeCol(entry)])
  }

  function removeCol(key: string) {
    setCols((prev) => prev.filter((c) => c.key !== key))
  }

  function toggleByKey(key: string) {
    if (activeKeys.has(key)) removeCol(key)
    else addByKey(key)
  }

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase()
    return SEARCH_IDX.filter(
      (e) =>
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.region.toLowerCase().includes(q) ||
        locName(e.name).toLowerCase().includes(q)
    ).slice(0, 40)
  }, [search])

  /* Popular quick-add chips — rendered both in the toolbar and (centered)
     inside the empty-state card, exactly as compare.js renderChips() does. */
  const flagshipChips = FLAGSHIP.map((slug) => {
    const entry = SEARCH_IDX.find((e) => e.slug === slug)
    if (!entry) return null
    const on = activeKeys.has(entry.key)
    const disabled = !on && full
    const jx = JX_BY_SLUG[slug]
    return (
      <button
        key={slug}
        type="button"
        className={`cmp-chip${on ? " is-added" : ""}`}
        disabled={disabled}
        aria-pressed={on || undefined}
        onClick={() => toggleByKey(entry.key)}
      >
        <img src={flag(entry.iso)} alt="" width={18} height={13} loading="lazy" />
        <span>{locName(jx?.name ?? entry.name)}</span>
        {on ? (
          <svg className="cmp-chip__mark" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg className="cmp-chip__mark" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
      </button>
    )
  })

  return (
    <>
      {/* Scoped overrides so the shadcn Popover + cmdk Command render with the
         vanilla .cmp-combo__list / .cmp-opt look. legacy.css is never edited;
         these only neutralize shadcn defaults and re-anchor the absolutely-
         positioned list inside the portal. */}
      <style>{`
        .cmp-combo__list-pop{
          width:var(--radix-popover-trigger-width);
          max-width:520px;
        }
        /* The original list is position:absolute relative to .cmp-combo; inside
           the portal we want it to fill the popover instead. */
        .cmp-combo__list-pop .cmp-combo__list{
          position:static;top:auto;left:auto;right:auto;
          max-height:330px;width:100%;
        }
        /* Neutralize cmdk wrapper paddings/box so .cmp-combo__list drives it. */
        .cmp-combo__cmd{background:transparent;border-radius:0;overflow:visible}
        .cmp-combo__group{padding:0}
        .cmp-combo__group [cmdk-group-heading]{display:none}
        /* Reset cmdk CommandItem defaults; keep only the .cmp-opt look. */
        .cmp-combo__list .cmp-opt{border-radius:9px}
        .cmp-combo__list .cmp-opt[data-selected="true"]{
          background:var(--brand-50,rgba(127,125,252,.12));
        }
        .cmp-combo__list .cmp-opt[data-disabled="true"]{
          opacity:.5;pointer-events:none;cursor:default;
        }
      `}</style>

      {/* ===== HERO ===== */}
      <section className="page-hero">
        <div className="page-hero__glow" aria-hidden="true"></div>
        <div className="container page-hero__inner reveal">
          <span className="eyebrow">{t("hero.eyebrow")}</span>
          <h1 className="page-hero__title">{t("hero.title")}</h1>
          <p className="page-hero__sub">{t("hero.sub")}</p>
          <div className="page-hero__cta">
            <button
              className="btn btn-primary btn-lg"
              data-slot="button"
              data-variant="default"
              data-size="lg"
              onClick={() => open()}
            >
              {t("hero.cta.gabriella")}
            </button>
            <Link className="btn btn-ghost btn-lg" to="/jurisdictions" data-slot="button" data-variant="outline" data-size="lg">
              {t("hero.cta.all")}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== COMPARE TABLE ===== */}
      <section className="section cmp-section">
        <div className="container cmp-container">
          <div className="cmp-header reveal">
            <div>
              <h2 className="cmp-header__title">{t("table.title")}</h2>
              <p className="cmp-header__sub">{t("table.sub")}</p>
            </div>
            <Link to="/jurisdictions" className="btn btn-ghost btn-sm" data-slot="button" data-variant="outline" data-size="sm">
              {t("table.browse")}
            </Link>
          </div>

          {/* Search combobox + quick-add chips + counter — the inline-input
             combobox from the vanilla original. The visible field is the
             .cmp-combo__in input itself; the matching list floats below in a
             Popover anchored to .cmp-combo, styled with the original
             .cmp-combo__list class. cmdk (shadcn Command) drives keyboard
             navigation + active-option highlighting via a hidden input synced
             to the same `search` state. */}
          <div className="cmp-tools">
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverAnchor asChild>
                <div className="cmp-combo">
                  <svg className="cmp-combo__ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  <input
                    ref={inputRef}
                    className="cmp-combo__in"
                    type="text"
                    role="combobox"
                    aria-expanded={popoverOpen}
                    aria-controls="cmpList"
                    aria-autocomplete="list"
                    aria-label={t("search.label")}
                    autoComplete="off"
                    disabled={full}
                    value={search}
                    placeholder={full ? t("search.placeholderFull") : t("search.placeholder")}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      if (!popoverOpen) setPopoverOpen(true)
                    }}
                    onFocus={() => {
                      if (!full) setPopoverOpen(true)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setPopoverOpen(false)
                      } else if (
                        (e.key === "ArrowDown" || e.key === "ArrowUp") &&
                        !popoverOpen &&
                        !full
                      ) {
                        setPopoverOpen(true)
                      } else if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
                        /* Forward to the hidden cmdk input so it moves the
                           active option / selects it. */
                        cmdkInputRef.current?.dispatchEvent(
                          new KeyboardEvent("keydown", { key: e.key, bubbles: true })
                        )
                        if (e.key === "Enter") e.preventDefault()
                      }
                    }}
                  />
                  <span className="cmp-combo__count" aria-live="polite">
                    {cols.length} / {MAX}
                  </span>
                </div>
              </PopoverAnchor>
              <PopoverContent
                className="cmp-combo__list-pop border-0 bg-transparent p-0 shadow-none"
                align="start"
                sideOffset={8}
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <Command shouldFilter={false} loop className="cmp-combo__cmd">
                  {/* Visually-hidden cmdk input drives keyboard navigation &
                     active highlighting; the real visible field is above. */}
                  <CommandInput
                    ref={cmdkInputRef}
                    value={search}
                    onValueChange={setSearch}
                    className="sr-only"
                    aria-hidden="true"
                    tabIndex={-1}
                  />
                  <CommandList id="cmpList" className="cmp-combo__list">
                    <CommandEmpty className="cmp-opt cmp-opt--empty">
                      {t("search.empty")}
                    </CommandEmpty>
                    <CommandGroup className="cmp-combo__group">
                      {matches.map((e) => {
                        const on = activeKeys.has(e.key)
                        return (
                          <CommandItem
                            key={e.key}
                            value={e.key}
                            keywords={[e.name, e.region, locName(e.name)]}
                            disabled={!on && full}
                            onSelect={() => {
                              toggleByKey(e.key)
                              setSearch("")
                              if (cols.length + 1 >= MAX) {
                                setPopoverOpen(false)
                                inputRef.current?.blur()
                              } else {
                                inputRef.current?.focus()
                              }
                            }}
                            className={`cmp-opt${on ? " is-added" : ""}`}
                          >
                            <img
                              className="cmp-opt__flag"
                              src={flag(e.iso)}
                              alt=""
                              width={22}
                              height={16}
                              loading="lazy"
                            />
                            <span className="cmp-opt__name">{locName(e.name)}</span>
                            <span className="cmp-opt__region">{locRegion(e.region)}</span>
                            {e.slug ? <span className="cmp-opt__badge">{t("search.fullData")}</span> : null}
                            {on ? <span className="cmp-opt__added">{t("search.added")}</span> : null}
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="cmp-chips">
              <span className="cmp-chips__lab">{t("chips.popular")}</span>
              <span className="cmp-chips__row">{flagshipChips}</span>
            </div>
          </div>

          {/* Table / empty state */}
          <div
            className={`cmp-outer${cols.length ? "" : " cmp-outer--empty"}`}
            role="region"
            aria-label={t("regionLabel")}
            aria-live="polite"
          >
            {cols.length === 0 ? (
              <div className="cmp-empty">
                <span className="cmp-empty__ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                  </svg>
                </span>
                <h3 className="cmp-empty__title">{t("empty.title")}</h3>
                <p className="cmp-empty__sub">{t("empty.sub")}</p>
                <div className="cmp-chips__row cmp-chips__row--empty">{flagshipChips}</div>
              </div>
            ) : (
              <div className="cmp-scroll">
                <table className="cmp-table">
                  <thead>
                    <tr>
                      <td className="cmp-th cmp-th--label">
                        <span className="cmp-th__metric">{t("th.metric")}</span>
                      </td>
                      {cols.map((col) => (
                        <th className="cmp-th" scope="col" key={col.key}>
                          <div className="cmp-th__top">
                            <img className="cmp-flag" src={flag(col.iso)} alt="" width={26} height={18} loading="lazy" />
                            <button
                              className="cmp-remove"
                              aria-label={t("th.remove", { name: locName(col.name) })}
                              onClick={() => removeCol(col.key)}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>
                          <span className="cmp-th__name">{locName(col.name)}</span>
                          <span className="cmp-th__region">{locRegion(col.region)}</span>
                          {col.slug ? (
                            <Link className="cmp-col-detail" to={`/jurisdiction/${col.slug}`}>
                              {t("th.viewDetails")}
                            </Link>
                          ) : (
                            <span className="cmp-th__stub">{t("th.stub")}</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row, i) => {
                      if (row.type === "cat") {
                        return (
                          <tr className="cmp-cat-row" key={`cat-${i}`}>
                            <td className="cmp-cat-cell" colSpan={cols.length + 1}>
                              {t(row.labelKey)}
                            </td>
                          </tr>
                        )
                      }
                      return (
                        <tr className="cmp-row" key={row.key}>
                          <th className="cmp-td cmp-td--label" scope="row">
                            {t(row.labelKey)}
                          </th>
                          {cols.map((col) => (
                            <td className="cmp-td" key={col.key}>
                              <Cell row={row} col={col} />
                            </td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p className="cmp-disclaimer">{t("disclaimer")}</p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="jx-cta2">
        <div className="container">
          <div className="jx-cta2__wrap reveal">
            <h2 className="jx-cta2__line">
              {t("cta.linePre")}{" "}
              <button className="jx-cta2__pill" onClick={() => open()}>
                {t("cta.pill")} <span aria-hidden="true">→</span>
              </button>{" "}
              {t("cta.linePost")}
            </h2>
            <p className="jx-cta2__sub">
              {t("cta.subPre")}{" "}
              <Link className="jx-cta2__link" to="/contact">
                {t("cta.contact")}
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

/* ── Single comparison cell — mirrors compare.js renderCell. ───────────────── */
function Cell({ row, col }: { row: Extract<Row, { key: keyof CmpData }>; col: Col }) {
  const { t } = useTranslation("compare")
  const { region: locRegion } = useJxLocale()

  /* Region is always sourced from the column (JX_DATA / search index). */
  if ((row.key as string) === "region") return <span>{locRegion(col.region)}</span>

  /* Stub column (one of the 73 without full data). */
  if (!col.data) {
    if (row.type === "price")
      return (
        <Link to="/contact" className="cmp-quote">
          {t("cell.getQuote")}
        </Link>
      )
    return <span className="cmp-dash">—</span>
  }

  const val = (col.data as unknown as Record<string, unknown>)[row.key as string]
  if (val == null || val === "") return <span className="cmp-dash">—</span>

  if (row.type === "tags") {
    const tags = val as string[]
    if (!tags.length) return <span className="cmp-dash">—</span>
    return (
      <>
        {tags.map((tag) => (
          <span className="cmp-tag" key={tag}>
            {tag}
          </span>
        ))}
      </>
    )
  }

  if (row.type === "director") {
    const s = (val as string).toLowerCase()
    const req = s.includes("required") && !s.includes("not")
    return req ? (
      <span className="cmp-badge cmp-badge--warn">{t("cell.required")}</span>
    ) : (
      <span className="cmp-badge cmp-badge--ok">{t("cell.notRequired")}</span>
    )
  }

  if (row.type === "price") {
    return <strong className="cmp-price">{val as string}</strong>
  }

  const lc = (val as string).toLowerCase()
  const isNone = lc === "none" || lc === "0%"
  return isNone ? <span className="cmp-none">{val as string}</span> : <span>{val as string}</span>
}
