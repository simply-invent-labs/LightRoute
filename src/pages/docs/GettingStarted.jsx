import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta.jsx';
import CodeBlock from '../../components/CodeBlock.jsx';

export default function GettingStarted() {
  return <><PageMeta title="Getting Started" description="Learn how to begin organizing a room with simple, manageable steps." path="/docs/getting-started" />
    <p className="eyebrow">Guide / 01</p><h1>Getting Started</h1><p className="lead">Start with one small area, a clear purpose, and a little time to sort your belongings.</p>
    <h2>Before you begin</h2><ul><li>Set aside a short, uninterrupted block of time.</li><li>Choose a small area such as <code>one shelf</code>.</li><li>Gather a bag for donations and a basket for misplaced items.</li></ul>
    <h2>First steps</h2><ol><li>Clear the area and group similar items together.</li><li>Decide which items you use and want to keep.</li><li>Return essentials to places that are easy to reach.</li></ol>
    <CodeBlock language="shell">{'Choose one area\nSort similar items\nReturn everyday essentials'}</CodeBlock>
    <p>Continue with the <Link to="/docs/installation">room setup guide</Link>, then review the <Link to="/docs/api">room checklist</Link>. For help with website features, see the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">browser scripting guide</a>.</p>
  </>;
}