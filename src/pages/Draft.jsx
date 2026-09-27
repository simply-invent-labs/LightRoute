import PageMeta from '../components/PageMeta.jsx';

export default function Draft() {
  return <><PageMeta title="Draft" description="An intentionally excluded draft route for LightRoute validation." path="/draft" />
    <p className="eyebrow">Excluded test route</p><h1>DRAFT — SHOULD NOT BE EXPOSED BY LIGHTROUTE</h1><p>This unfinished article is available in the React router solely to verify route exclusion. It must never have an expected Markdown fixture.</p>
    <h2>Unpublished notes</h2><p>Draft copy can change without notice and is not approved for public Markdown output.</p>
  </>;
}
