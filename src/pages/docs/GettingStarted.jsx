import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta.jsx';
import CodeBlock from '../../components/CodeBlock.jsx';

export default function GettingStarted() {
  return <><PageMeta title="Getting Started" description="Learn how to get started with the LightRoute reference workflow." path="/docs/getting-started" />
    <p className="eyebrow">Guide / 01</p><h1>Getting Started</h1><p className="lead">Start with a known public route, an explicit allow list, and an expected Markdown file.</p>
    <h2>Before you begin</h2><ul><li>Install a current Node.js release.</li><li>Choose a public page such as <code>/docs</code>.</li><li>Keep draft and private paths out of the allow list.</li></ul>
    <h2>First steps</h2><ol><li>Install the reference site's dependencies.</li><li>Start Vite and open the documentation page.</li><li>Inspect the route configuration and expected fixture.</li></ol>
    <CodeBlock language="shell">{'npm install\nnpm run dev\nnpm run build'}</CodeBlock>
    <p>Continue with the <Link to="/docs/installation">installation guide</Link>, then review the <Link to="/docs/api">API example</Link>. For JavaScript language details, see the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">MDN JavaScript guide</a>.</p>
  </>;
}
