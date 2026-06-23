export default function BackOffice() {
  return (
    <section className="section band-tint backoffice" id="backoffice">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">The back office</span>
          <h2>We run the back office. In any country.</h2>
          <p className="sub">Every filing, every renewal, every compliance deadline — handled by licensed local partners, surfaced through one dashboard.</p>
        </div>
        <div className="tabs reveal" id="boTabs" data-slot="tabs-list" role="tablist">
          <button className="tab active" data-tab="form" data-slot="tabs-trigger" role="tab" data-state="active">Form <small>· Stand it up</small></button>
          <button className="tab" data-tab="operate" data-slot="tabs-trigger" role="tab" data-state="inactive">Operate <small>· Stay in good standing</small></button>
          <button className="tab" data-tab="run" data-slot="tabs-trigger" role="tab" data-state="inactive">Run <small>· Run the finances</small></button>
        </div>
        <div className="tab-panels reveal">
          <div className="tab-panel active" data-panel="form" data-slot="tabs-content" role="tabpanel" data-state="active">
            <div className="panel-copy">
              <h3>The legal entity, fully formed.</h3>
              <ul className="ticks">
                <li>Incorporation</li><li>Share transfers</li><li>Director appointments</li><li>Apostilles</li><li>Share certificates</li>
              </ul>
              <p className="from">From <b>£249</b> · United Kingdom</p>
            </div>
            <div className="panel-mock"><div className="mini-ui mini-form"></div></div>
          </div>
          <div className="tab-panel" data-panel="operate" data-slot="tabs-content" role="tabpanel" data-state="inactive">
            <div className="panel-copy">
              <h3>Good standing, kept.</h3>
              <ul className="ticks">
                <li>Registered address</li><li>Corporate secretary</li><li>Nominee director</li><li>Annual return</li><li>KYC updates</li>
              </ul>
              <p className="from">From <b>£180</b>/year · United Kingdom</p>
            </div>
            <div className="panel-mock"><div className="mini-ui mini-operate"></div></div>
          </div>
          <div className="tab-panel" data-panel="run" data-slot="tabs-content" role="tabpanel" data-state="inactive">
            <div className="panel-copy">
              <h3>The financial machinery your investors will check.</h3>
              <ul className="ticks">
                <li>Bookkeeping</li><li>Tax filing</li><li>Payroll</li><li>VAT / GST</li><li>Audit support</li><li>CFO services</li>
              </ul>
              <p className="from">From <b>£120</b>/month · United Kingdom</p>
            </div>
            <div className="panel-mock"><div className="mini-ui mini-run"></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
