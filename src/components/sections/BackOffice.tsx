import { useTranslation } from "react-i18next";

export default function BackOffice() {
  const { t } = useTranslation("backoffice");
  return (
    <section className="section band-tint backoffice" id="backoffice">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("heading")}</h2>
          <p className="sub">{t("sub")}</p>
        </div>
        <div className="tabs reveal" id="boTabs" data-slot="tabs-list" role="tablist">
          <button className="tab active" data-tab="form" data-slot="tabs-trigger" role="tab" data-state="active">{t("tabs.form.label")} <small>{t("tabs.form.small")}</small></button>
          <button className="tab" data-tab="operate" data-slot="tabs-trigger" role="tab" data-state="inactive">{t("tabs.operate.label")} <small>{t("tabs.operate.small")}</small></button>
          <button className="tab" data-tab="run" data-slot="tabs-trigger" role="tab" data-state="inactive">{t("tabs.run.label")} <small>{t("tabs.run.small")}</small></button>
        </div>
        <div className="tab-panels reveal">
          <div className="tab-panel active" data-panel="form" data-slot="tabs-content" role="tabpanel" data-state="active">
            <div className="panel-copy">
              <h3>{t("panels.form.title")}</h3>
              <ul className="ticks">
                <li>{t("panels.form.items.incorporation")}</li><li>{t("panels.form.items.shareTransfers")}</li><li>{t("panels.form.items.directorAppointments")}</li><li>{t("panels.form.items.apostilles")}</li><li>{t("panels.form.items.shareCertificates")}</li>
              </ul>
              <p className="from">{t("from")} <b>£249</b>{t("panels.form.priceSuffix")}</p>
            </div>
            <div className="panel-mock"><div className="mini-ui mini-form"></div></div>
          </div>
          <div className="tab-panel" data-panel="operate" data-slot="tabs-content" role="tabpanel" data-state="inactive">
            <div className="panel-copy">
              <h3>{t("panels.operate.title")}</h3>
              <ul className="ticks">
                <li>{t("panels.operate.items.registeredAddress")}</li><li>{t("panels.operate.items.corporateSecretary")}</li><li>{t("panels.operate.items.nomineeDirector")}</li><li>{t("panels.operate.items.annualReturn")}</li><li>{t("panels.operate.items.kycUpdates")}</li>
              </ul>
              <p className="from">{t("from")} <b>£180</b>{t("panels.operate.priceSuffix")}</p>
            </div>
            <div className="panel-mock"><div className="mini-ui mini-operate"></div></div>
          </div>
          <div className="tab-panel" data-panel="run" data-slot="tabs-content" role="tabpanel" data-state="inactive">
            <div className="panel-copy">
              <h3>{t("panels.run.title")}</h3>
              <ul className="ticks">
                <li>{t("panels.run.items.bookkeeping")}</li><li>{t("panels.run.items.taxFiling")}</li><li>{t("panels.run.items.payroll")}</li><li>{t("panels.run.items.vatGst")}</li><li>{t("panels.run.items.auditSupport")}</li><li>{t("panels.run.items.cfoServices")}</li>
              </ul>
              <p className="from">{t("from")} <b>£120</b>{t("panels.run.priceSuffix")}</p>
            </div>
            <div className="panel-mock"><div className="mini-ui mini-run"></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
