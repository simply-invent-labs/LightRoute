import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta.jsx';

export default function Home() {
  return <><PageMeta title="Home" description="Explore a controlled website for testing LightRoute's future Markdown generation." path="/" />
    <div className="hero"><p className="eyebrow">A reference site for build-time content</p><h1>Clear routes. Clean Markdown.</h1>
      <p className="lead">LightRoute is a planned build-time system that turns approved public website routes into readable Markdown files. This site supplies the controlled pages it will eventually process.</p>
      <div className="actions"><Link className="button" to="/docs/getting-started">Get started</Link><Link className="text-link" to="/docs">Explore the docs →</Link></div>
    </div>
    <section aria-labelledby="benefits"><h2 id="benefits">Why this reference exists</h2><ul className="feature-list">
      <li><strong>Explicit routes.</strong> An allow list identifies pages that may be published.</li>
      <li><strong>Useful structure.</strong> Headings, links, lists, code, and images exercise extraction rules.</li>
      <li><strong>Repeatable output.</strong> Handwritten fixtures give future builds a stable comparison.</li>
    </ul></section>
    <section className="card-grid" aria-label="Explore LightRoute"><div className="card"><h2>Read the guide</h2><p>Follow the setup sequence and inspect a sample configuration.</p><Link to="/docs/installation">Installation guide →</Link></div><div className="card"><h2>Review the API</h2><p>See endpoint-style content, parameters, and JSON examples.</p><Link to="/docs/api">API reference →</Link></div></section>
    <p className="muted">For context on the web platform, visit the <a href="https://developer.mozilla.org/en-US/docs/Web" target="_blank" rel="noreferrer">MDN Web Docs</a>.</p>
  </>;
}
