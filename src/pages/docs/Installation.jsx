import PageMeta from '../../components/PageMeta.jsx';
import CodeBlock from '../../components/CodeBlock.jsx';

export default function Installation() {
  return <><PageMeta title="Installation" description="Install and configure the LightRoute reference website." path="/docs/installation" />
    <p className="eyebrow">Guide / 02</p><h1>Installation</h1><p className="lead">Run this site locally to inspect approved pages and the fixtures beside them.</p>
    <h2>Run the site</h2><p>From the project directory, install packages and start the development server:</p><CodeBlock language="shell">{'npm install\nnpm run dev'}</CodeBlock>
    <p>To verify the production bundle:</p><CodeBlock language="shell">npm run build</CodeBlock>
    <h2>Route configuration</h2><p>The sample configuration makes route policy explicit. A future converter can use these values, but this site does not process them.</p><CodeBlock language="json">{'{\n  "allowedRoutes": ["/", "/about", "/pricing", "/docs"],\n  "excludedRoutes": ["/draft", "/private"],\n  "outputDirectory": "lightroute/generated"\n}'}</CodeBlock>
    <div className="callout warning"><strong>Note</strong><p>The abbreviated example above is for reading. The complete public route list is in <code>lightroute.config.json</code>.</p></div>
    <h2>Build flow</h2><figure><img className="diagram" src="/images/architecture.svg" alt="A public React route passes through an allow list and becomes a Markdown file" /><figcaption>Planned route-to-Markdown flow; conversion is not implemented here.</figcaption></figure>
  </>;
}
