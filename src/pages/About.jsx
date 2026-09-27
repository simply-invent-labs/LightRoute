import PageMeta from '../components/PageMeta.jsx';

export default function About() {
  return <><PageMeta title="About" description="Learn why the LightRoute reference site uses controlled public routes and fixtures." path="/about" />
    <p className="eyebrow">The project</p><h1>About LightRoute</h1><p className="lead">LightRoute explores how a website can expose a deliberate, human-readable view of its public content at build time.</p>
    <h2>Why a reference site?</h2><p>Real websites vary widely. A small, known set of pages makes extraction behavior easier to inspect and compare. Every approved page has a corresponding Markdown fixture; excluded pages deliberately do not.</p>
    <h2>What we test</h2><ul><li>Which routes are allowed or denied</li><li>Whether main article content survives conversion</li><li>Whether navigation and footer content stay out of the result</li><li>Whether metadata and links remain accurate</li></ul>
    <h2>How the fixtures are used</h2><ol><li>Build the reference website.</li><li>Run a future LightRoute converter against approved routes.</li><li>Compare generated files with the expected Markdown fixtures.</li></ol>
    <blockquote><p>Good reference content is predictable enough to test and realistic enough to reveal mistakes.</p></blockquote>
    <p>This project is a content fixture. It does not include the converter, route discovery, or a publishing pipeline.</p>
  </>;
}
