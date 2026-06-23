export default function Jurisdictions() {
  return (
    <section className="juris2" id="jurisdictions">
      <div className="container juris2-grid">
        <div className="juris2-left">
          <div className="juris2-head">
            <span className="eyebrow light">Live markets</span>
            <h2 className="on-dark">Seven jurisdictions,<br />live for checkout today.</h2>
            <p className="sub on-dark-sub">Hover a market — the globe turns to show you exactly where you'll incorporate. Real prices, remote setup, licensed local partners.</p>
          </div>
          <div className="jsearch jsearch--pair" id="jSearch">
            <div className="jpair">
              <div className="jfield">
                <label className="jfield__lab" htmlFor="jPassport">My passport</label>
                <div className="jcombo" id="jPassportCombo">
                  <span className="jcombo__flag" id="jPassportFlag" aria-hidden="true"></span>
                  <input className="jcombo__in" id="jPassport" type="text" role="combobox" aria-expanded="false" aria-controls="jPassportList" aria-autocomplete="list" aria-label="My passport — country of citizenship" autoComplete="off" placeholder="Country of citizenship" />
                  <svg className="jcombo__chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                  <ul className="jcombo__list" id="jPassportList" role="listbox" aria-label="Passport country" hidden></ul>
                </div>
              </div>
              <span className="jpair__link" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
              </span>
              <div className="jfield">
                <label className="jfield__lab" htmlFor="jDest">Country to incorporate</label>
                <div className="jcombo" id="jDestCombo">
                  <span className="jcombo__flag" id="jDestFlag" aria-hidden="true"></span>
                  <input className="jcombo__in" id="jDest" type="text" role="combobox" aria-expanded="false" aria-controls="jDestList" aria-autocomplete="list" aria-label="Country to incorporate in" autoComplete="off" placeholder="Where to set up" />
                  <svg className="jcombo__chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                  <ul className="jcombo__list" id="jDestList" role="listbox" aria-label="Destination jurisdiction" hidden></ul>
                </div>
              </div>
            </div>
            <button type="button" className="btn btn-primary jpair__go" id="jPairGo" hidden>
              <span className="jpair__go-tx">Start incorporation</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
        <div className="juris2-right" aria-hidden="true"></div>
      </div>
    </section>
  );
}
