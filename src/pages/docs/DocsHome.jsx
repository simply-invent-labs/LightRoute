import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta.jsx';

export default function DocsHome() {
  return <><PageMeta title="Documentation" description="Browse the LightRoute reference documentation and its public test routes." path="/docs" />
    <p className="eyebrow">Documentation</p><h1>Documentation overview</h1><p className="lead">This guide describes a future build-time workflow and supplies content shapes for extraction tests. The documentation sidebar is outside the main article.</p>
    <h2>In this guide</h2><ul className="link-list"><li><Link to="/docs/getting-started">Getting started</Link> — understand the workflow and first steps.</li><li><Link to="/docs/installation">Installation</Link> — review commands, configuration, and the build flow.</li><li><Link to="/docs/api">API reference</Link> — inspect endpoint examples and a parameter table.</li></ul>
    <div className="callout"><strong>Fixture note</strong><p>The pages describe an intended interface. The LightRoute converter is intentionally outside this project.</p></div>
  </>;
}
