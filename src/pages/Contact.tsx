import { useEffect, useMemo, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslation } from "react-i18next"
import { useGabriella } from "@/components/gabriella/GabriellaProvider"
import { usePageMeta } from "@/lib/usePageMeta"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const JURISDICTION_VALUES = [
  "singapore",
  "delaware",
  "uk",
  "uae",
  "estonia",
  "hong-kong",
  "other",
] as const

const UNSURE = "__unsure__"

const FAQ_KEYS = ["speed", "account", "person", "jurisdiction"] as const

const schema = z.object({
  firstName: z.string().trim().min(1, "errors.firstName"),
  lastName: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .min(1, "errors.email")
    .email("errors.email"),
  phone: z.string().trim().optional(),
  company: z.string().trim().optional(),
  jurisdiction: z.string().optional(),
  message: z.string().trim().min(1, "errors.message"),
})

type ContactValues = z.infer<typeof schema>

/* Scoped overrides so the shadcn Select trigger + Accordion trigger render
   identically to the original native <select> and <details>/<summary>.
   We do NOT touch legacy.css; these only re-style the shadcn primitives
   to mirror `.cf-field select` and `.cfaq summary`. */
const SCOPED_CSS = `
.contact-form .cf-field [data-slot="select-trigger"]{
  width:100%;min-height:44px;height:auto;padding:11px 36px 11px 13px;
  font-family:var(--font);font-size:14.5px;font-weight:400;color:var(--ink);
  background:var(--n0);border:1px solid var(--input);border-radius:var(--r-md);
  box-shadow:none;white-space:normal;text-align:left;cursor:pointer;
  transition:border-color .18s var(--ease),box-shadow .18s var(--ease);
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2364748d' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 13px center;
}
.contact-form .cf-field [data-slot="select-trigger"]:focus,
.contact-form .cf-field [data-slot="select-trigger"]:focus-visible{
  outline:none;border-color:var(--brand);box-shadow:var(--focus);
}
.contact-form .cf-field [data-slot="select-trigger"] > svg{display:none}
.contact-form .cf-field [data-slot="select-trigger"] [data-slot="select-value"]{
  line-clamp:unset;-webkit-line-clamp:unset;display:block;
}

/* mini FAQ — make the Radix accordion trigger match .cfaq summary */
.contact-faq__list .cfaq [data-slot="accordion-trigger"]{
  display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%;
  padding:18px 4px;font-size:15.5px;font-weight:600;color:var(--ink);
  text-align:left;border-radius:0;
}
.contact-faq__list .cfaq [data-slot="accordion-trigger"]:hover{text-decoration:none}
.contact-faq__list .cfaq [data-slot="accordion-trigger"] > svg{display:none}
.contact-faq__list .cfaq__body{padding:0 4px 18px}
/* Radix uses [data-state=open], the original used [open] — remap the chevron toggle */
.contact-faq__list .cfaq[data-state="open"] .cfaq__chev::before{transform:rotate(-45deg)}
.contact-faq__list .cfaq[data-state="open"] .cfaq__chev::after{transform:rotate(45deg)}
`

export default function Contact() {
  const { t } = useTranslation("contact")
  const { open } = useGabriella()
  const [submittedName, setSubmittedName] = useState<string | null>(null)

  usePageMeta(t("meta.title"), t("meta.description"))

  useEffect(() => {
    document.body.className = "jx-page contact-page"
    return () => {
      document.body.className = ""
    }
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
  } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      jurisdiction: UNSURE,
      message: "",
    },
  })

  function onSubmit(values: ContactValues) {
    setSubmittedName(values.firstName.trim())
  }

  const errorCount = Object.keys(errors).length

  const faqs = useMemo(
    () =>
      FAQ_KEYS.map((key) => ({
        q: t(`faq.items.${key}.q`),
        a: t(`faq.items.${key}.a`),
      })),
    [t]
  )

  return (
    <div id="contact" className="contact-main">
      <style>{SCOPED_CSS}</style>

      {/* ===== HERO ===== */}
      <section className="page-hero page-hero--tight">
        <div className="page-hero__glow" aria-hidden="true"></div>
        <div className="container page-hero__inner reveal">
          <span className="eyebrow">{t("hero.eyebrow")}</span>
          <h1 className="page-hero__title">{t("hero.title")}</h1>
          <p className="page-hero__sub">{t("hero.sub")}</p>
        </div>
      </section>

      {/* ===== CONTACT LAYOUT ===== */}
      <section className="section contact-sec">
        <div className="container">
          <div className="contact-grid">
            {/* LEFT: contact methods */}
            <aside
              className="contact-info reveal"
              aria-label={t("info.ariaLabel")}
            >
              <article className="bento-card contact-card" data-slot="card">
                <div className="bento-card__border"></div>
                <div className="bento-card__border-glow"></div>
                <div className="bento-card__inner">
                  <span className="contact-card__ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <p className="contact-card__label">{t("info.office.label")}</p>
                  <p className="contact-card__val">{t("info.office.value")}</p>
                  <p className="contact-card__note">{t("info.office.note")}</p>
                </div>
              </article>

              <article className="bento-card contact-card" data-slot="card">
                <div className="bento-card__border"></div>
                <div className="bento-card__border-glow"></div>
                <div className="bento-card__inner">
                  <span className="contact-card__ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M4 5c0 8.3 6.7 15 15 15a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-.8-1l-3.4-.7a1 1 0 0 0-1 .3l-1 1.2a12 12 0 0 1-5.3-5.3l1.2-1a1 1 0 0 0 .3-1L9.5 4.8a1 1 0 0 0-1-.8H6a2 2 0 0 0-2 2Z" />
                    </svg>
                  </span>
                  <p className="contact-card__label">{t("info.phone.label")}</p>
                  <p className="contact-card__val">
                    <a href="tel:+6531591180">+65 3159 1180</a>
                  </p>
                  <p className="contact-card__note">{t("info.phone.note")}</p>
                </div>
              </article>

              <article className="bento-card contact-card" data-slot="card">
                <div className="bento-card__border"></div>
                <div className="bento-card__border-glow"></div>
                <div className="bento-card__inner">
                  <span className="contact-card__ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <p className="contact-card__label">{t("info.email.label")}</p>
                  <p className="contact-card__val">
                    <a href="mailto:hello@corpsec.io">hello@corpsec.io</a>
                  </p>
                  <p className="contact-card__note">{t("info.email.note")}</p>
                </div>
              </article>

              <article className="bento-card contact-card" data-slot="card">
                <div className="bento-card__border"></div>
                <div className="bento-card__border-glow"></div>
                <div className="bento-card__inner">
                  <span className="contact-card__ic">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3.5 2" />
                    </svg>
                  </span>
                  <p className="contact-card__label">{t("info.hours.label")}</p>
                  <p className="contact-card__val">{t("info.hours.value")}</p>
                  <p className="contact-card__note">{t("info.hours.note")}</p>
                </div>
              </article>
            </aside>

            {/* RIGHT: form */}
            <div className="contact-form-card reveal">
              {submittedName === null ? (
                <>
                  <div className="contact-form-card__head">
                    <h2>{t("form.head.title")}</h2>
                    <p>
                      {t("form.head.lead")}{" "}
                      <span className="contact-req-key">
                        <span className="req" aria-hidden="true">
                          *
                        </span>{" "}
                        {t("form.head.reqKey")}
                      </span>
                    </p>
                  </div>

                  <form
                    className="contact-form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    <div className="cf-row">
                      <div className="cf-field">
                        <label htmlFor="cfFirst">
                          {t("form.firstName.label")}{" "}
                          <span className="req" aria-hidden="true">
                            *
                          </span>
                        </label>
                        <Input
                          id="cfFirst"
                          type="text"
                          autoComplete="given-name"
                          aria-required="true"
                          aria-invalid={errors.firstName ? true : undefined}
                          aria-describedby="cfFirstErr"
                          className={
                            errors.firstName
                              ? "is-invalid shadow-none"
                              : "shadow-none"
                          }
                          {...register("firstName")}
                        />
                        <span className="cf-error" id="cfFirstErr" role="alert">
                          {errors.firstName?.message
                            ? t(errors.firstName.message)
                            : ""}
                        </span>
                      </div>
                      <div className="cf-field">
                        <label htmlFor="cfLast">{t("form.lastName.label")}</label>
                        <Input
                          id="cfLast"
                          type="text"
                          autoComplete="family-name"
                          className="shadow-none"
                          {...register("lastName")}
                        />
                      </div>
                    </div>

                    <div className="cf-row">
                      <div className="cf-field">
                        <label htmlFor="cfEmail">
                          {t("form.email.label")}{" "}
                          <span className="req" aria-hidden="true">
                            *
                          </span>
                        </label>
                        <Input
                          id="cfEmail"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          aria-required="true"
                          aria-invalid={errors.email ? true : undefined}
                          aria-describedby="cfEmailErr"
                          className={
                            errors.email ? "is-invalid shadow-none" : "shadow-none"
                          }
                          {...register("email")}
                        />
                        <span className="cf-error" id="cfEmailErr" role="alert">
                          {errors.email?.message ? t(errors.email.message) : ""}
                        </span>
                      </div>
                      <div className="cf-field">
                        <label htmlFor="cfPhone">{t("form.phone.label")}</label>
                        <Input
                          id="cfPhone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder={t("form.phone.placeholder")}
                          className="shadow-none"
                          {...register("phone")}
                        />
                      </div>
                    </div>

                    <div className="cf-row">
                      <div className="cf-field">
                        <label htmlFor="cfCompany">{t("form.company.label")}</label>
                        <Input
                          id="cfCompany"
                          type="text"
                          autoComplete="organization"
                          placeholder={t("form.company.placeholder")}
                          className="shadow-none"
                          {...register("company")}
                        />
                      </div>
                      <div className="cf-field">
                        <label htmlFor="cfJur">{t("form.jurisdiction.label")}</label>
                        <Controller
                          control={control}
                          name="jurisdiction"
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                id="cfJur"
                                ref={field.ref}
                                onBlur={field.onBlur}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={UNSURE}>
                                  {t("form.jurisdiction.unsure")}
                                </SelectItem>
                                {JURISDICTION_VALUES.map((value) => (
                                  <SelectItem key={value} value={value}>
                                    {t(`jurisdictions.${value}`)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>

                    <div className="cf-field">
                      <label htmlFor="cfMsg">
                        {t("form.message.label")}{" "}
                        <span className="req" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <Textarea
                        id="cfMsg"
                        rows={4}
                        aria-required="true"
                        aria-invalid={errors.message ? true : undefined}
                        aria-describedby="cfMsgErr"
                        placeholder={t("form.message.placeholder")}
                        className={
                          errors.message ? "is-invalid shadow-none" : "shadow-none"
                        }
                        {...register("message")}
                      />
                      <span className="cf-error" id="cfMsgErr" role="alert">
                        {errors.message?.message ? t(errors.message.message) : ""}
                      </span>
                    </div>

                    <div className="cf-actions">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        data-slot="button"
                        data-variant="default"
                        data-size="lg"
                      >
                        {t("form.submit")} <span aria-hidden="true">→</span>
                      </button>
                      <p className="cf-privacy">{t("form.privacy")}</p>
                    </div>

                    <p className="cf-status" role="status" aria-live="polite">
                      {isSubmitted && errorCount > 0
                        ? t("form.status", { count: errorCount })
                        : ""}
                    </p>
                  </form>
                </>
              ) : (
                <div className="cf-success" tabIndex={-1} ref={(el) => el?.focus()}>
                  <span className="cf-success__ic" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </span>
                  <h2>{t("success.title")}</h2>
                  <p>{t("success.body", { name: submittedName })}</p>
                  <div className="cf-success__cta">
                    <a
                      className="btn btn-ghost"
                      href="/"
                      data-slot="button"
                      data-variant="outline"
                    >
                      {t("success.home")}
                    </a>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-slot="button"
                      data-variant="default"
                      onClick={() => open()}
                    >
                      {t("success.gabriella")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* prefer-not-to-form callout */}
          <div className="contact-alt reveal">
            <div className="contact-alt__inner">
              <div>
                <h2 className="contact-alt__title">{t("alt.title")}</h2>
                <p className="contact-alt__sub">{t("alt.sub")}</p>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-lg"
                data-slot="button"
                data-variant="default"
                data-size="lg"
                onClick={() => open()}
              >
                {t("alt.cta")} <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MINI FAQ ===== */}
      <section className="section band-tint contact-faq">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">{t("faq.eyebrow")}</span>
            <h2>{t("faq.title")}</h2>
          </div>
          <div className="contact-faq__list reveal">
            <Accordion type="single" collapsible>
              {faqs.map((item, i) => (
                <AccordionItem key={i} value={`cfaq-${i}`} className="cfaq">
                  <AccordionTrigger>
                    {item.q}
                    <span className="cfaq__chev" aria-hidden="true"></span>
                  </AccordionTrigger>
                  <AccordionContent className="cfaq__body">
                    <p>{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}
