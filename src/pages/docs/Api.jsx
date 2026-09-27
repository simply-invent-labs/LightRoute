import PageMeta from '../../components/PageMeta.jsx';
import CodeBlock from '../../components/CodeBlock.jsx';

export default function Api() {
  return <><PageMeta title="API Reference" description="Read sample endpoint-style documentation and parameters for LightRoute." path="/docs/api" />
    <p className="eyebrow">Reference / 03</p><h1>API Reference</h1><p className="lead">The endpoint below is illustrative documentation content. This site has no backend service.</p>
    <h2><code>GET /v1/routes/:path</code></h2><p>Returns a sample description of an approved route. A real LightRoute implementation may use a different interface.</p>
    <h3>Parameters</h3><div className="table-scroll"><table><caption>Route lookup parameters</caption><thead><tr><th scope="col">Name</th><th scope="col">Type</th><th scope="col">Required</th><th scope="col">Description</th></tr></thead><tbody><tr><th scope="row"><code>path</code></th><td>string</td><td>Yes</td><td>URL-encoded public route path.</td></tr><tr><th scope="row"><code>format</code></th><td>string</td><td>No</td><td>Requested output format; example: <code>markdown</code>.</td></tr></tbody></table></div>
    <h3>Example request</h3><CodeBlock language="shell">curl https://reference.lightroute.dev/v1/routes/docs%2Fapi?format=markdown</CodeBlock>
    <h3>Example response</h3><CodeBlock language="json">{'{\n  "path": "/docs/api",\n  "title": "API Reference",\n  "language": "en",\n  "approved": true\n}'}</CodeBlock>
    <div className="callout"><strong>Testing detail</strong><p>This example exercises headings, a parameter table, inline code, and a JSON code block.</p></div>
  </>;
}
