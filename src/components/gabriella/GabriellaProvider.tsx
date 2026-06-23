import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

/* ============================================================
   Gabriella — AI incorporation advisor questionnaire.
   Ported from assets/gabriella.js into real React state.
   The shadcn Dialog supplies the modal shell; the inner content
   reuses the legacy `gq-*` class names for visual fidelity.
   ============================================================ */

/* ---- icon set (verbatim path strings from legacy) ---------- */
const IC: Record<string, string> = {
  saas: '<path d="M4 5h16v11H4z"/><path d="M2 20h20M9 16v4M15 16v4"/>',
  ecom: '<path d="M6 7h13l-1.4 8.5a2 2 0 0 1-2 1.7H9.4a2 2 0 0 1-2-1.7L6 4H3"/><circle cx="9" cy="20" r="1"/><circle cx="16" cy="20" r="1"/>',
  holding: '<path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6"/>',
  consult: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
  web3: '<path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z"/><path d="m12 7 5 3v5l-5 3-5-3v-5l5-3Z"/>',
  other: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.8 2.6 15.2 0 18M12 3c-2.6 2.8-2.6 15.2 0 18"/>',
  flag: '<path d="M5 3v18M5 4h12l-2 4 2 4H5"/>',
  bank: '<path d="M3 10l9-6 9 6M5 10v9M19 10v9M9 10v9M15 10v9M3 21h18"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
  shield: '<path d="M12 3 5 6v5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-3Z"/>',
  tax: '<path d="M9 3h6l1 4H8l1-4ZM6 7h12l-1 13H7L6 7Z"/><path d="M10 11v5M14 11v5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};

/** Inline SVG with the legacy stroke styling; `dangerouslySetInnerHTML`
 *  is safe here — the path strings are static, author-controlled constants. */
function Svg({ paths }: { paths: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={22}
      height={22}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}

/* ---- steps ------------------------------------------------- */
const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Germany", "France",
  "Netherlands", "Spain", "Italy", "Ireland", "Switzerland", "United Arab Emirates",
  "Saudi Arabia", "India", "Singapore", "Hong Kong", "Australia", "Nigeria",
  "South Africa", "Brazil", "Mexico", "Japan", "Estonia", "Poland", "Other",
];

interface CardOption {
  v: string;
  label: string;
  ic: string;
}
type Step =
  | { id: string; q: string; help?: string; type: "cards"; options: CardOption[] }
  | { id: string; q: string; help?: string; type: "multi"; max: number; options: CardOption[] }
  | { id: string; q: string; help?: string; type: "select"; placeholder: string; options: string[] }
  | { id: string; q: string; help?: string; type: "email" };

const STEPS: Step[] = [
  {
    id: "building", q: "What are you building?",
    help: "This shapes tax treatment and what investors expect to see.", type: "cards",
    options: [
      { v: "saas", label: "SaaS / software", ic: "saas" },
      { v: "ecom", label: "E-commerce", ic: "ecom" },
      { v: "holding", label: "Holding company", ic: "holding" },
      { v: "consult", label: "Consulting / services", ic: "consult" },
      { v: "web3", label: "Crypto / Web3", ic: "web3" },
      { v: "other", label: "Something else", ic: "other" },
    ],
  },
  {
    id: "base", q: "Where are you based?",
    help: "Your residency drives tax exposure and banking access.", type: "select",
    placeholder: "Select your country of residence", options: COUNTRIES,
  },
  {
    id: "market", q: "Where are most of your customers?",
    help: "Revenue location affects the smartest place to register.", type: "cards",
    options: [
      { v: "us", label: "United States", ic: "flag" },
      { v: "eu", label: "Europe", ic: "flag" },
      { v: "uk", label: "United Kingdom", ic: "flag" },
      { v: "me", label: "Middle East", ic: "flag" },
      { v: "asia", label: "Asia-Pacific", ic: "flag" },
      { v: "global", label: "Truly global", ic: "globe" },
    ],
  },
  {
    id: "raising", q: "Are you raising outside capital?",
    help: "Investor familiarity can outweigh a slightly lower tax rate.", type: "cards",
    options: [
      { v: "us_vc", label: "Yes — US investors", ic: "bank" },
      { v: "eu_vc", label: "Yes — EU / UK investors", ic: "bank" },
      { v: "soon", label: "Planning to soon", ic: "clock" },
      { v: "boot", label: "Bootstrapped", ic: "shield" },
    ],
  },
  {
    id: "banking", q: "How soon do you need a bank account?",
    help: "Some jurisdictions open remote banking in days, others take weeks.", type: "cards",
    options: [
      { v: "now", label: "Immediately", ic: "bolt" },
      { v: "month", label: "Within a month", ic: "clock" },
      { v: "flex", label: "I'm flexible", ic: "shield" },
    ],
  },
  {
    id: "priority", q: "What matters most to you?",
    help: "Pick up to two — Gabriella weighs these highest.", type: "multi", max: 2,
    options: [
      { v: "tax", label: "Low tax", ic: "tax" },
      { v: "investor", label: "Investor familiarity", ic: "bank" },
      { v: "speed", label: "Speed & simplicity", ic: "bolt" },
      { v: "privacy", label: "Privacy", ic: "shield" },
      { v: "banking", label: "Strong banking", ic: "globe" },
    ],
  },
  {
    id: "email", q: "Where should Gabriella send your report?",
    help: "Your ranked shortlist with full reasoning. No spam, ever.", type: "email",
  },
];

/* ---- recommendation engine (verbatim heuristic) ------------ */
interface JxEntry {
  name: string;
  iso: string;
  setup: string;
  tax: string;
  why: string;
  banks: string[];
}
const JX: Record<string, JxEntry> = {
  delaware: { name: "Delaware, USA", iso: "us", setup: "2–3 days", tax: "21% federal", why: "The default for startups raising from US VCs — investors know the C-Corp paperwork cold.", banks: ["Mercury", "Brex", "Stripe"] },
  singapore: { name: "Singapore", iso: "sg", setup: "2 days", tax: "17% (with rebates)", why: "Fast remote setup, world-class banking and a credible Asian HQ with strong treaty access.", banks: ["DBS", "Wise", "Aspire"] },
  uk: { name: "United Kingdom", iso: "gb", setup: "24–48 hours", tax: "25% / 19% small", why: "The fastest credible incorporation, strong banking and easy access to EU and US customers.", banks: ["Wise", "Revolut", "Mercury"] },
  estonia: { name: "Estonia", iso: "ee", setup: "1–3 days", tax: "0% on retained", why: "0% tax on reinvested profit and fully digital admin — ideal for lean, remote-first teams.", banks: ["Wise", "Revolut", "LHV"] },
  ireland: { name: "Ireland", iso: "ie", setup: "3–5 days", tax: "12.5% trading", why: "Low corporate tax inside the EU — the classic base for software selling into Europe.", banks: ["Wise", "AIB", "Revolut"] },
  dubai: { name: "Dubai, UAE", iso: "ae", setup: "4–6 days", tax: "9% (0% to AED 375k)", why: "Near-zero tax, premium banking and a fast-growing hub for Middle East and global trade.", banks: ["Mashreq", "WIO", "Emirates NBD"] },
};

interface Answers {
  seed: string;
  building?: string;
  base?: string;
  market?: string;
  raising?: string;
  banking?: string;
  priority?: string[];
  email?: string;
}
interface Recommendation {
  primary: string;
  alts: string[];
}

function recommend(a: Answers): Recommendation {
  let primary = "singapore";
  let alts = ["uk", "estonia"];
  if (a.raising === "us_vc" || (a.market === "us" && a.raising === "soon")) { primary = "delaware"; alts = ["singapore", "uk"]; }
  else if (a.market === "me" || a.base === "United Arab Emirates" || a.base === "Saudi Arabia") { primary = "dubai"; alts = ["uk", "singapore"]; }
  else if (a.market === "asia" || (a.banking === "now" && !!a.priority && a.priority.indexOf("banking") > -1)) { primary = "singapore"; alts = ["uk", "dubai"]; }
  else if (!!a.priority && a.priority.indexOf("tax") > -1 && (a.market === "eu" || a.market === "global")) { primary = "estonia"; alts = ["ireland", "uk"]; }
  else if (a.market === "eu") { primary = "ireland"; alts = ["estonia", "uk"]; }
  else if (a.market === "uk" || a.raising === "eu_vc") { primary = "uk"; alts = ["ireland", "estonia"]; }
  return { primary, alts };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (v: string) => EMAIL_RE.test(v);

/* ============================================================
   Context
   ============================================================ */
interface GabriellaApi {
  open: (seed?: string) => void;
  close: () => void;
}
const GabriellaContext = createContext<GabriellaApi | null>(null);

export function useGabriella(): GabriellaApi {
  const ctx = useContext(GabriellaContext);
  if (!ctx) throw new Error("useGabriella must be used within <GabriellaProvider>");
  return ctx;
}

/* ---- result card ------------------------------------------- */
function JxCard({ jxKey, rank }: { jxKey: string; rank: 1 | 2 }) {
  const j = JX[jxKey];
  return (
    <div className={"gq-rec" + (rank === 1 ? " gq-rec--primary" : "")}>
      <div className="gq-rec__top">
        <img
          className="gq-rec__flag"
          src={`https://flagcdn.com/w40/${j.iso}.png`}
          alt=""
          width={30}
          height={22}
        />
        <div className="gq-rec__id">
          <b>{j.name}</b>
          {rank === 1
            ? <span className="gq-rec__badge">Gabriella&rsquo;s pick</span>
            : <span className="gq-rec__alt">Also strong</span>}
        </div>
        <div className="gq-rec__tax">
          <small>Corp tax</small>
          <b>{j.tax}</b>
        </div>
      </div>
      {rank === 1 ? <p className="gq-rec__why">{j.why}</p> : null}
      <div className="gq-rec__meta">
        <span className="gq-rec__chip">⚡ Setup {j.setup}</span>
        {j.banks.map((b) => (
          <span className="gq-rec__chip" key={b}>{b} ✓</span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Inner questionnaire — fully React-state driven.
   Mounted fresh per dialog-open via a `key`, so its local state
   resets cleanly each session.
   ============================================================ */
type Phase = "questions" | "matching" | "result";

function Questionnaire({ seed, onClose }: { seed: string; onClose: () => void }) {
  const [answers, setAnswers] = useState<Answers>({ seed });
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("questions");
  const [recResult, setRecResult] = useState<Recommendation | null>(null);

  // multi-select working set + email field state for the current step
  const [multiSel, setMultiSel] = useState<string[]>([]);
  const [selectVal, setSelectVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [emailErr, setEmailErr] = useState(false);

  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const matchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = STEPS.length;
  const pct = phase === "questions" ? Math.round((idx / total) * 100) : 100;
  const countLabel =
    phase === "result" ? "Done" : `${Math.min(idx + 1, total)} / ${total}`;

  const goNext = useCallback(() => {
    setIdx((cur) => {
      if (cur < total - 1) {
        // reset per-step transient state for the next step
        setMultiSel([]);
        setSelectVal("");
        setEmailVal("");
        setEmailErr(false);
        return cur + 1;
      }
      return cur; // finish handled by caller for the last step
    });
  }, [total]);

  const goBack = useCallback(() => {
    setIdx((cur) => {
      if (cur > 0) {
        setMultiSel([]);
        setSelectVal("");
        setEmailVal("");
        setEmailErr(false);
        return cur - 1;
      }
      return cur;
    });
  }, []);

  const startMatching = useCallback(
    (finalAnswers: Answers) => {
      const rec = recommend(finalAnswers);
      setPhase("matching");
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion:reduce)").matches;
      matchTimer.current = setTimeout(() => {
        setRecResult(rec);
        setPhase("result");
      }, reduce ? 200 : 1600);
    },
    [],
  );

  const restart = useCallback(() => {
    if (matchTimer.current) clearTimeout(matchTimer.current);
    setAnswers({ seed });
    setRecResult(null);
    setMultiSel([]);
    setSelectVal("");
    setEmailVal("");
    setEmailErr(false);
    setIdx(0);
    setPhase("questions");
  }, [seed]);

  // single-select card → record + auto-advance after a brief beat
  const pickCard = useCallback(
    (stepId: string, value: string) => {
      setAnswers((a) => ({ ...a, [stepId]: value }));
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(goNext, 280);
    },
    [goNext],
  );

  const toggleMulti = useCallback((value: string, max: number) => {
    setMultiSel((cur) => {
      const i = cur.indexOf(value);
      if (i > -1) return cur.filter((x) => x !== value);
      if (cur.length >= max) return cur;
      return [...cur, value];
    });
  }, []);

  const submitMulti = useCallback(
    (stepId: string) => {
      const next = { ...answers, [stepId]: multiSel.slice() };
      setAnswers(next);
      goNext();
    },
    [answers, multiSel, goNext],
  );

  const submitSelect = useCallback(
    (stepId: string) => {
      if (!selectVal) return;
      setAnswers((a) => ({ ...a, [stepId]: selectVal }));
      goNext();
    },
    [selectVal, goNext],
  );

  const submitEmail = useCallback(() => {
    const v = emailVal.trim();
    if (!isValidEmail(v)) {
      setEmailErr(true);
      return;
    }
    const next = { ...answers, email: v };
    setAnswers(next);
    startMatching(next);
  }, [emailVal, answers, startMatching]);

  /* ---- render the active step ---- */
  function renderStep() {
    const step = STEPS[idx];
    const showContinue = step.type !== "cards";

    let body: ReactNode = null;
    if (step.type === "cards") {
      body = (
        <div className="gq-opts">
          {step.options.map((o) => {
            const sel = answers[step.id as keyof Answers] === o.v;
            return (
              <button
                key={o.v}
                className={"gq-opt" + (sel ? " is-sel" : "")}
                type="button"
                onClick={() => pickCard(step.id, o.v)}
              >
                <span className="gq-opt__ic"><Svg paths={IC[o.ic] || IC.other} /></span>
                <span className="gq-opt__label">{o.label}</span>
                <span className="gq-opt__check">
                  <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      );
    } else if (step.type === "multi") {
      body = (
        <div className="gq-opts gq-opts--multi">
          {step.options.map((o) => {
            const sel = multiSel.indexOf(o.v) > -1;
            return (
              <button
                key={o.v}
                className={"gq-opt" + (sel ? " is-sel" : "")}
                type="button"
                aria-pressed={sel}
                onClick={() => toggleMulti(o.v, step.max)}
              >
                <span className="gq-opt__ic"><Svg paths={IC[o.ic] || IC.other} /></span>
                <span className="gq-opt__label">{o.label}</span>
                <span className="gq-opt__check">
                  <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      );
    } else if (step.type === "select") {
      body = (
        <div className="gq-field">
          <select
            className="gq-select"
            value={selectVal}
            autoFocus
            onChange={(e) => setSelectVal(e.target.value)}
          >
            <option value="" disabled>{step.placeholder}</option>
            {step.options.map((c) => (
              <option value={c} key={c}>{c}</option>
            ))}
          </select>
        </div>
      );
    } else if (step.type === "email") {
      body = (
        <div className="gq-field">
          <input
            className="gq-input2"
            type="email"
            inputMode="email"
            placeholder="you@company.com"
            autoFocus
            autoComplete="email"
            value={emailVal}
            onChange={(e) => { setEmailVal(e.target.value); setEmailErr(false); }}
            onKeyDown={(e) => { if (e.key === "Enter") submitEmail(); }}
          />
          {emailErr ? (
            <p className="gq-err">Please enter a valid email address.</p>
          ) : null}
        </div>
      );
    }

    const continueDisabled =
      step.type === "multi" ? multiSel.length === 0
        : step.type === "select" ? !selectVal
          : step.type === "email" ? !isValidEmail(emailVal.trim())
            : false;

    const onContinue =
      step.type === "multi" ? () => submitMulti(step.id)
        : step.type === "select" ? () => submitSelect(step.id)
          : step.type === "email" ? submitEmail
            : undefined;

    return (
      <div className="gq-step">
        <h3 className="gq-q">{step.q}</h3>
        {step.help ? <p className="gq-help">{step.help}</p> : null}
        {body}
        <div className="gq-nav">
          {idx > 0
            ? <button className="gq-back" type="button" onClick={goBack}>← Back</button>
            : <span />}
          {showContinue
            ? (
              <button
                className="btn btn-primary gq-next"
                type="button"
                disabled={continueDisabled}
                onClick={onContinue}
              >
                Continue
              </button>
            )
            : <span className="gq-hint">Select to continue</span>}
        </div>
      </div>
    );
  }

  function renderStage() {
    if (phase === "matching") {
      return (
        <div className="gq-matching">
          <span className="gq-spinner" />
          <p>Gabriella is cross-checking 79 jurisdictions…</p>
        </div>
      );
    }
    if (phase === "result" && recResult) {
      const rec = recResult;
      return (
        <div className="gq-result">
          <div className="gq-result__head">
            <span className="gq-tick">
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 5 5L20 7" />
              </svg>
            </span>
            <h3>
              Your shortlist is ready
              {answers.email ? ` — and on its way to ${answers.email}` : ""}.
            </h3>
          </div>
          <JxCard jxKey={rec.primary} rank={1} />
          <div className="gq-alts">
            {rec.alts.map((k) => <JxCard jxKey={k} rank={2} key={k} />)}
          </div>
          <div className="gq-result__cta">
            <button className="btn btn-primary btn-lg" type="button" onClick={onClose}>
              Start incorporation in {JX[rec.primary].name.split(",")[0]} →
            </button>
            <button className="btn btn-ghost" type="button" onClick={restart}>
              Start over
            </button>
          </div>
          <p className="gq-disclaimer">
            A guided demo recommendation. Your real shortlist is confirmed by a licensed
            local partner before anything is filed.
          </p>
        </div>
      );
    }
    return renderStep();
  }

  return (
    <div className="gq">
      <div className="gq-head">
        <span className="gq-avatar">
          <Svg paths='<path d="M12 3.5l1.6 4.3L18 9.4l-4.4 1.6L12 15.5l-1.6-4.5L6 9.4l4.4-1.6L12 3.5Z"/>' />
        </span>
        <div className="gq-id">
          <b>Gabriella</b>
          <small>AI incorporation advisor</small>
        </div>
        <div className="gq-count">{countLabel}</div>
      </div>
      <div className="gq-progress">
        <i style={{ width: pct + "%" }} />
      </div>
      <div className="gq-stage">{renderStage()}</div>
    </div>
  );
}

/* ============================================================
   Provider — owns the Dialog shell + open/close API.
   ============================================================ */
export function GabriellaProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [seed, setSeed] = useState("");
  // bumping the key remounts the Questionnaire so each open starts fresh
  const [sessionKey, setSessionKey] = useState(0);

  const open = useCallback((s?: string) => {
    setSeed(s ?? "");
    setSessionKey((k) => k + 1);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const api = useMemo<GabriellaApi>(() => ({ open, close }), [open, close]);

  return (
    <GabriellaContext.Provider value={api}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* The shadcn DialogContent keeps Radix's own fixed + centering +
            focus-trap + Esc handling. We deliberately do NOT add the legacy
            `.csm__panel` class — its `position:relative` (meant for the vanilla
            `.csm` flex shell) would knock the panel out of Radix's fixed
            centering. Instead `gq-dialog` (scoped CSS below) re-skins the box to
            match `.csm__panel` exactly: 560px, --r-xl radius, glass gradient bg,
            glass border, the original layered shadow — overriding shadcn's
            bg-background / rounded-lg / border / p-6 / shadow-lg / gap-4 /
            max-w-lg defaults at higher specificity (no `!` utilities, which
            would fight our own scoped rule). */}
        <DialogContent showCloseButton={false} className="gq-dialog">
          <style>{csmPanelCss}{csmOverlayCss}</style>
          <DialogTitle className="sr-only">
            Gabriella — AI incorporation advisor
          </DialogTitle>
          {/* `.csm__close` — round glass X button at top:16/right:16 like the original */}
          <DialogClose
            className="csm__close"
            aria-label="Close"
            data-slot="dialog-close"
          >
            <svg
              viewBox="0 0 24 24"
              width={18}
              height={18}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </DialogClose>
          <div className="csm__content">
            {isOpen ? (
              <Questionnaire key={sessionKey} seed={seed} onClose={close} />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </GabriellaContext.Provider>
  );
}

/* Component-scoped overrides (NOT in legacy.css). Re-skin the shadcn
   DialogContent so its box is pixel-identical to the original `.csm__panel`
   while Radix keeps owning position/centering/transform (its open animation
   and `translate(-50%,-50%)` centering stay intact — we never touch `position`
   or `transform` here). The `[data-slot="dialog-content"].gq-dialog` selector
   is specificity (0,2,0), so it beats every shadcn single-class utility
   (bg-background, rounded-lg, border, p-6, shadow-lg, gap-4, max-w-lg) without
   needing `!important`. Radius / bg / border / shadow values are copied
   verbatim from the original `.csm__panel` rule. */
const csmPanelCss = `
[data-slot="dialog-content"].gq-dialog{
  display:flex;flex-direction:column;gap:0;
  /* 560px cap, but always keep the original .csm 24px gutter on each side so
     the panel never touches the screen edge on narrow viewports. */
  width:100%;max-width:min(560px, calc(100vw - 48px));max-height:90vh;padding:0;
  border-radius:var(--r-xl);
  background:linear-gradient(165deg,rgba(255,255,255,.96),rgba(247,249,253,.95));
  -webkit-backdrop-filter:blur(18px) saturate(1.5);backdrop-filter:blur(18px) saturate(1.5);
  border:1px solid rgba(255,255,255,.8);
  box-shadow:0 30px 90px -20px rgba(6,18,44,.5),inset 0 1px 0 rgba(255,255,255,1);
}
`;

/* Match the original `.csm__scrim` (tinted + blurred) instead of shadcn's flat
   bg-black/50. Scoped globally because Radix renders the overlay in a portal
   sibling we can't add a class to from here without editing the shared dialog
   primitive; the data-slot selector keeps it specific to dialog overlays. */
const csmOverlayCss = `
[data-slot="dialog-overlay"]{
  background:rgba(8,16,34,.5) !important;
  -webkit-backdrop-filter:blur(6px) saturate(1.1);backdrop-filter:blur(6px) saturate(1.1);
}
`;
