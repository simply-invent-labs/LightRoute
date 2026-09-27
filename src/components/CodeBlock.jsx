export default function CodeBlock({ language, children }) {
  return <div className="code-wrap"><div className="code-label">{language}</div><pre><code className={`language-${language}`}>{children}</code></pre></div>;
}
