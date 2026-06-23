export default function Logobar() {
  return (
    <section className="logobar">
      <div className="container">
        <p className="logobar-label">All <b>79 jurisdictions</b> we cover</p>
        <div className="jstrip" id="jurisStrip">
          <div className="jstrip-track" id="jurisStripTrack"></div>
        </div>
      </div>
    </section>
  );
}
