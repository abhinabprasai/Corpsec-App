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
   Incorporation funnel — "Start your company" 5-step flow.
   Ported from assets/forms.js (openIncorporation) into real
   React state. The shadcn Dialog supplies the modal shell; the
   inner content reuses the legacy `gq-*` / `fm-*` class names
   from legacy.css for visual fidelity (same shell Gabriella uses).
   ============================================================ */

/* ---- legacy inline-SVG glyphs (verbatim from forms.js) ----- */
/** The little circled check used on plan options, the success tick,
 *  and the success "what happens next" rows. */
function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={15}
      height={15}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.2 2.2L15.8 9.4" />
    </svg>
  );
}

/** The CorpSec mark used in the funnel header avatar. */
function Mark() {
  return (
    <svg viewBox="0 0 43 43" width={22} height={22} fill="none" aria-hidden="true">
      <path
        fill="#533afd"
        fillRule="evenodd"
        d="m0 43 43-9.119V0L0 9.226V43Z"
      />
    </svg>
  );
}

/* ---- funnel data (verbatim from forms.js) ------------------ */
const JURIS = [
  "Singapore",
  "United Kingdom",
  "Delaware, USA",
  "Estonia",
  "Ireland",
  "Dubai, UAE",
  "Hong Kong",
  "Netherlands",
  "Texas, USA",
  "Cyprus",
  "Other / not sure yet",
];

const ACTIVITIES = [
  "SaaS / software",
  "E-commerce",
  "Consulting / services",
  "Holding company",
  "Trading",
  "Crypto / Web3",
  "Fintech",
  "Agency / creative",
  "Other",
];

interface Package {
  v: string;
  label: string;
  price: string;
  desc: string;
}
const PACKAGES: Package[] = [
  { v: "launch", label: "Launch", price: "from £120/mo", desc: "First entity, fully banked." },
  { v: "growth", label: "Growth", price: "from £240/mo", desc: "Entity + accounting + tax filing." },
  { v: "scale", label: "Scale", price: "Custom", desc: "A portfolio across jurisdictions." },
];

function pkgLabel(v: string): string {
  const p = PACKAGES.find((x) => x.v === v);
  return p ? `${p.label} (${p.price})` : "—";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (v: string) => EMAIL_RE.test((v || "").trim());

/* ---- step machine ------------------------------------------ */
const STEPS = ["jurisdiction", "pkg", "company", "you", "review"] as const;
type StepId = (typeof STEPS)[number];

interface FunnelState {
  jurisdiction: string;
  pkg: string;
  name: string;
  activity: string;
  fullname: string;
  email: string;
}

/* ============================================================
   Context
   ============================================================ */
interface IncorporationApi {
  open: (jurisdiction?: string) => void;
  close: () => void;
}
const IncorporationContext = createContext<IncorporationApi | null>(null);

export function useIncorporation(): IncorporationApi {
  const ctx = useContext(IncorporationContext);
  if (!ctx)
    throw new Error("useIncorporation must be used within <IncorporationProvider>");
  return ctx;
}

/* ============================================================
   Inner funnel — fully React-state driven. Mounted fresh per
   dialog-open via a `key`, so its local state resets each session.
   ============================================================ */
type Phase = "steps" | "done";

function Funnel({
  jurisdiction: seedJurisdiction,
  onClose,
}: {
  jurisdiction: string;
  onClose: () => void;
}) {
  const [state, setState] = useState<FunnelState>({
    jurisdiction: seedJurisdiction || "",
    pkg: "",
    name: "",
    activity: "",
    fullname: "",
    email: "",
  });
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("steps");
  const [emailErr, setEmailErr] = useState(false);

  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = STEPS.length;
  const pct = phase === "done" ? 100 : Math.round((idx / total) * 100);
  const countLabel = phase === "done" ? "Done" : `${idx + 1} / ${total}`;

  const goNext = useCallback(() => {
    setEmailErr(false);
    setIdx((cur) => (cur < total - 1 ? cur + 1 : cur));
  }, [total]);

  const goBack = useCallback(() => {
    setEmailErr(false);
    setIdx((cur) => (cur > 0 ? cur - 1 : cur));
  }, []);

  // plan picker → record + auto-advance after a brief beat (legacy 260ms)
  const pickPkg = useCallback(
    (value: string) => {
      setState((s) => ({ ...s, pkg: value }));
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(goNext, 260);
    },
    [goNext],
  );

  const submitYou = useCallback(() => {
    if (!isValidEmail(state.email)) {
      setEmailErr(true);
      return;
    }
    goNext();
  }, [state.email, goNext]);

  const submit = useCallback(() => {
    setPhase("done");
  }, []);

  /* ---- per-step bodies (faithful port of stepHTML/forms.js) ---- */
  function renderStep() {
    const id: StepId = STEPS[idx];

    if (id === "jurisdiction") {
      return (
        <div className="gq-step">
          <h3 className="gq-q">Where are you incorporating?</h3>
          <p className="gq-help">
            You can change this anytime — or let Gabriella choose for you.
          </p>
          <div className="gq-field">
            <select
              className="gq-select"
              value={state.jurisdiction}
              autoFocus
              onChange={(e) =>
                setState((s) => ({ ...s, jurisdiction: e.target.value }))
              }
            >
              <option value="" disabled>
                Select a jurisdiction
              </option>
              {JURIS.map((j) => (
                <option value={j} key={j}>
                  {j}
                </option>
              ))}
            </select>
          </div>
          <Nav
            onBack={null}
            continueDisabled={!state.jurisdiction}
            onContinue={goNext}
          />
        </div>
      );
    }

    if (id === "pkg") {
      return (
        <div className="gq-step">
          <h3 className="gq-q">Choose your plan</h3>
          <p className="gq-help">
            Every plan includes formation, a registered agent and the dashboard.
          </p>
          <div className="gq-opts gq-opts--pkg">
            {PACKAGES.map((p) => {
              const sel = state.pkg === p.v;
              return (
                <button
                  key={p.v}
                  className={"gq-opt gq-opt--pkg" + (sel ? " is-sel" : "")}
                  type="button"
                  aria-pressed={sel}
                  onClick={() => pickPkg(p.v)}
                >
                  <span className="gq-opt__label">
                    {p.label}
                    <small>{p.desc}</small>
                  </span>
                  <span className="gq-opt__price">{p.price}</span>
                  <span className="gq-opt__check">
                    <Check />
                  </span>
                </button>
              );
            })}
          </div>
          <Nav onBack={goBack} onContinue={goNext} continueDisabled={!state.pkg} />
        </div>
      );
    }

    if (id === "company") {
      return (
        <div className="gq-step">
          <h3 className="gq-q">Your company</h3>
          <p className="gq-help">A couple of basics to prepare your filing.</p>
          <div className="gq-field">
            <label className="gq-flabel">Proposed company name</label>
            <input
              className="gq-input2"
              type="text"
              placeholder="e.g. Northwind Labs"
              autoFocus
              value={state.name}
              onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
            />
          </div>
          <div className="gq-field">
            <label className="gq-flabel">Business activity</label>
            <select
              className="gq-select"
              value={state.activity}
              onChange={(e) =>
                setState((s) => ({ ...s, activity: e.target.value }))
              }
            >
              <option value="" disabled>
                Select an activity
              </option>
              {ACTIVITIES.map((a) => (
                <option value={a} key={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
          <Nav
            onBack={goBack}
            onContinue={goNext}
            continueDisabled={!(state.name.trim() && state.activity)}
          />
        </div>
      );
    }

    if (id === "you") {
      return (
        <div className="gq-step">
          <h3 className="gq-q">Where should we send your filing pack?</h3>
          <p className="gq-help">
            We never share your details. One specialist, one thread.
          </p>
          <div className="gq-field">
            <label className="gq-flabel">Full name</label>
            <input
              className="gq-input2"
              type="text"
              placeholder="Your name"
              autoFocus
              value={state.fullname}
              onChange={(e) =>
                setState((s) => ({ ...s, fullname: e.target.value }))
              }
            />
          </div>
          <div className="gq-field">
            <label className="gq-flabel">Work email</label>
            <input
              className="gq-input2"
              type="email"
              inputMode="email"
              placeholder="you@company.com"
              value={state.email}
              onChange={(e) => {
                setState((s) => ({ ...s, email: e.target.value }));
                setEmailErr(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitYou();
              }}
            />
            {emailErr ? (
              <p className="gq-err">Please enter a valid email.</p>
            ) : null}
          </div>
          <Nav
            onBack={goBack}
            onContinue={submitYou}
            continueDisabled={
              !(state.fullname.trim() && isValidEmail(state.email))
            }
          />
        </div>
      );
    }

    // review
    return (
      <div className="gq-step">
        <h3 className="gq-q">Review &amp; submit</h3>
        <ul className="fm-review">
          <ReviewRow k="Jurisdiction" v={state.jurisdiction} />
          <ReviewRow k="Plan" v={pkgLabel(state.pkg)} />
          <ReviewRow k="Company" v={state.name} />
          <ReviewRow k="Activity" v={state.activity} />
          <ReviewRow k="Contact" v={`${state.fullname} · ${state.email}`} />
        </ul>
        <div className="gq-nav">
          <button className="gq-back" type="button" onClick={goBack}>
            ← Back
          </button>
          <button className="btn btn-primary gq-next" type="button" onClick={submit}>
            Submit application
          </button>
        </div>
      </div>
    );
  }

  function renderStage() {
    if (phase === "done") {
      return (
        <div className="fm-success">
          <span className="gq-tick">
            <Check />
          </span>
          <h3>Application received.</h3>
          <p>
            A CorpSec specialist will confirm your {state.jurisdiction} setup and
            email <b>{state.email}</b> within one business day with your filing
            pack and a fixed, all-in quote.
          </p>
          <div className="fm-success__next">
            <span>
              <Check /> Name &amp; structure check
            </span>
            <span>
              <Check /> Filing prepared by a licensed local partner
            </span>
            <span>
              <Check /> Banking introductions lined up
            </span>
          </div>
          <button className="btn btn-primary btn-lg" type="button" onClick={onClose}>
            Back to site
          </button>
        </div>
      );
    }
    return renderStep();
  }

  return (
    <div className="gq">
      <div className="gq-head">
        <span className="gq-avatar gq-avatar--mark">
          <Mark />
        </span>
        <div className="gq-id">
          <b>Start your company</b>
          <small>Formation in 48h on average</small>
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

/* ---- review row -------------------------------------------- */
function ReviewRow({ k, v }: { k: string; v: string }) {
  return (
    <li>
      <span>{k}</span>
      <b>{v || "—"}</b>
    </li>
  );
}

/* ---- shared step nav (mirrors forms.js `nav()`) ------------ */
function Nav({
  onBack,
  onContinue,
  continueDisabled,
}: {
  onBack: (() => void) | null;
  onContinue: () => void;
  continueDisabled?: boolean;
}) {
  return (
    <div className="gq-nav">
      {onBack ? (
        <button className="gq-back" type="button" onClick={onBack}>
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button
        className="btn btn-primary gq-next"
        type="button"
        disabled={continueDisabled}
        onClick={onContinue}
      >
        Continue
      </button>
    </div>
  );
}

/* ============================================================
   Provider — owns the Dialog shell + open/close API.
   Mirrors GabriellaProvider's CSM shell so both modals share the
   exact same glass panel / scrim treatment.
   ============================================================ */
export function IncorporationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [seed, setSeed] = useState("");
  // bumping the key remounts the Funnel so each open starts fresh
  const [sessionKey, setSessionKey] = useState(0);

  const open = useCallback((jurisdiction?: string) => {
    setSeed(jurisdiction ?? "");
    setSessionKey((k) => k + 1);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const api = useMemo<IncorporationApi>(() => ({ open, close }), [open, close]);

  return (
    <IncorporationContext.Provider value={api}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* Same shell rationale as GabriellaProvider: keep Radix's fixed +
            centering + focus-trap + Esc, and re-skin the box via `gq-dialog`
            (scoped CSS below) to match the legacy `.csm__panel` exactly. */}
        <DialogContent showCloseButton={false} className="gq-dialog">
          <style>{csmPanelCss}{csmOverlayCss}</style>
          <DialogTitle className="sr-only">Start your company</DialogTitle>
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
              <Funnel key={sessionKey} jurisdiction={seed} onClose={close} />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </IncorporationContext.Provider>
  );
}

/* Component-scoped overrides (NOT in legacy.css) — copied verbatim from
   GabriellaProvider so the funnel modal is pixel-identical to the advisor
   modal and the original `.csm__panel`. Radix keeps owning position /
   centering / transform; this only re-skins the box + scrim. */
const csmPanelCss = `
[data-slot="dialog-content"].gq-dialog{
  display:flex;flex-direction:column;gap:0;
  width:100%;max-width:min(560px, calc(100vw - 48px));max-height:90vh;padding:0;
  border-radius:var(--r-xl);
  background:linear-gradient(165deg,rgba(255,255,255,.96),rgba(247,249,253,.95));
  -webkit-backdrop-filter:blur(18px) saturate(1.5);backdrop-filter:blur(18px) saturate(1.5);
  border:1px solid rgba(255,255,255,.8);
  box-shadow:0 30px 90px -20px rgba(6,18,44,.5),inset 0 1px 0 rgba(255,255,255,1);
}
`;

const csmOverlayCss = `
[data-slot="dialog-overlay"]{
  background:rgba(8,16,34,.5) !important;
  -webkit-backdrop-filter:blur(6px) saturate(1.1);backdrop-filter:blur(6px) saturate(1.1);
}
`;
