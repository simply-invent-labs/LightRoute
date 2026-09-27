import PageMeta from '../components/PageMeta.jsx';

export default function Private() {
  return <><PageMeta title="Private" description="An intentionally excluded dashboard-style route for LightRoute validation." path="/private" />
    <p className="eyebrow">Excluded test route</p><h1>PRIVATE — SHOULD NOT BE EXPOSED BY LIGHTROUTE</h1><p>This mock dashboard is an exclusion fixture. It contains no real account data or authentication.</p>
    <div className="card-grid"><section className="card"><h2>Workspace</h2><p>Example organization</p></section><section className="card"><h2>Recent builds</h2><p>No builds available in this sample.</p></section></div>
  </>;
}
