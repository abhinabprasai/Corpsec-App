import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
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

/* ---- funnel data (ported from forms.js; English text now lives
   in i18n — these are the stable i18n keys used as option values) -- */
const JURIS = [
  "singapore",
  "uk",
  "delaware",
  "estonia",
  "ireland",
  "dubai",
  "hongKong",
  "netherlands",
  "texas",
  "cyprus",
  "other",
];

const ACTIVITIES = [
  "saas",
  "ecommerce",
  "consulting",
  "holding",
  "trading",
  "crypto",
  "fintech",
  "agency",
  "other",
];

const PACKAGES = ["launch", "growth", "scale"] as const;

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
  const { t } = useTranslation("incorporation");
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
  const countLabel =
    phase === "done"
      ? t("header.done")
      : t("header.count", { current: idx + 1, total });

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
          <h3 className="gq-q">{t("steps.jurisdiction.q")}</h3>
          <p className="gq-help">{t("steps.jurisdiction.help")}</p>
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
                {t("steps.jurisdiction.placeholder")}
              </option>
              {JURIS.map((j) => (
                <option value={j} key={j}>
                  {t(`jurisdictions.${j}`)}
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
          <h3 className="gq-q">{t("steps.pkg.q")}</h3>
          <p className="gq-help">{t("steps.pkg.help")}</p>
          <div className="gq-opts gq-opts--pkg">
            {PACKAGES.map((p) => {
              const sel = state.pkg === p;
              return (
                <button
                  key={p}
                  className={"gq-opt gq-opt--pkg" + (sel ? " is-sel" : "")}
                  type="button"
                  aria-pressed={sel}
                  onClick={() => pickPkg(p)}
                >
                  <span className="gq-opt__label">
                    {t(`packages.${p}.label`)}
                    <small>{t(`packages.${p}.desc`)}</small>
                  </span>
                  <span className="gq-opt__price">{t(`packages.${p}.price`)}</span>
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
          <h3 className="gq-q">{t("steps.company.q")}</h3>
          <p className="gq-help">{t("steps.company.help")}</p>
          <div className="gq-field">
            <label className="gq-flabel">{t("steps.company.nameLabel")}</label>
            <input
              className="gq-input2"
              type="text"
              placeholder={t("steps.company.namePlaceholder")}
              autoFocus
              value={state.name}
              onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
            />
          </div>
          <div className="gq-field">
            <label className="gq-flabel">{t("steps.company.activityLabel")}</label>
            <select
              className="gq-select"
              value={state.activity}
              onChange={(e) =>
                setState((s) => ({ ...s, activity: e.target.value }))
              }
            >
              <option value="" disabled>
                {t("steps.company.activityPlaceholder")}
              </option>
              {ACTIVITIES.map((a) => (
                <option value={a} key={a}>
                  {t(`activities.${a}`)}
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
          <h3 className="gq-q">{t("steps.you.q")}</h3>
          <p className="gq-help">{t("steps.you.help")}</p>
          <div className="gq-field">
            <label className="gq-flabel">{t("steps.you.nameLabel")}</label>
            <input
              className="gq-input2"
              type="text"
              placeholder={t("steps.you.namePlaceholder")}
              autoFocus
              value={state.fullname}
              onChange={(e) =>
                setState((s) => ({ ...s, fullname: e.target.value }))
              }
            />
          </div>
          <div className="gq-field">
            <label className="gq-flabel">{t("steps.you.emailLabel")}</label>
            <input
              className="gq-input2"
              type="email"
              inputMode="email"
              placeholder={t("steps.you.emailPlaceholder")}
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
              <p className="gq-err">{t("steps.you.emailError")}</p>
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
    const emptyLabel = t("empty");
    const pkgDisplay = state.pkg
      ? t("pkgLabel", {
          label: t(`packages.${state.pkg}.label`),
          price: t(`packages.${state.pkg}.price`),
        })
      : emptyLabel;
    return (
      <div className="gq-step">
        <h3 className="gq-q">{t("steps.review.q")}</h3>
        <ul className="fm-review">
          <ReviewRow
            k={t("steps.review.jurisdiction")}
            v={state.jurisdiction ? t(`jurisdictions.${state.jurisdiction}`) : ""}
          />
          <ReviewRow k={t("steps.review.plan")} v={pkgDisplay} />
          <ReviewRow k={t("steps.review.company")} v={state.name} />
          <ReviewRow
            k={t("steps.review.activity")}
            v={state.activity ? t(`activities.${state.activity}`) : ""}
          />
          <ReviewRow
            k={t("steps.review.contact")}
            v={`${state.fullname} · ${state.email}`}
          />
        </ul>
        <div className="gq-nav">
          <button className="gq-back" type="button" onClick={goBack}>
            {t("nav.back")}
          </button>
          <button className="btn btn-primary gq-next" type="button" onClick={submit}>
            {t("steps.review.submit")}
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
          <h3>{t("success.heading")}</h3>
          <p>
            {t("success.bodyBefore", {
              jurisdiction: state.jurisdiction
                ? t(`jurisdictions.${state.jurisdiction}`)
                : "",
            })}
            <b>{state.email}</b>
            {t("success.bodyAfter")}
          </p>
          <div className="fm-success__next">
            <span>
              <Check /> {t("success.next1")}
            </span>
            <span>
              <Check /> {t("success.next2")}
            </span>
            <span>
              <Check /> {t("success.next3")}
            </span>
          </div>
          <button className="btn btn-primary btn-lg" type="button" onClick={onClose}>
            {t("success.backToSite")}
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
          <b>{t("header.title")}</b>
          <small>{t("header.subtitle")}</small>
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
  const { t } = useTranslation("incorporation");
  return (
    <div className="gq-nav">
      {onBack ? (
        <button className="gq-back" type="button" onClick={onBack}>
          {t("nav.back")}
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
        {t("nav.continue")}
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
  const { t } = useTranslation("incorporation");
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
          <DialogTitle className="sr-only">{t("dialog.title")}</DialogTitle>
          <DialogClose
            className="csm__close"
            aria-label={t("dialog.close")}
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
