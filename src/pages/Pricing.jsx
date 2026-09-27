import PageMeta from '../components/PageMeta.jsx';

export default function Pricing() {
  return <><PageMeta title="Pricing" description="Compare illustrative LightRoute plans in a sample pricing table." path="/pricing" />
    <p className="eyebrow">Sample content</p><h1>Pricing</h1><p className="lead">These plans are fictional. The table exists to test how future Markdown output preserves rows, columns, and inline text.</p>
    <h2>Compare plans</h2><div className="table-scroll"><table><caption>Illustrative monthly plans</caption><thead><tr><th scope="col">Feature</th><th scope="col">Starter</th><th scope="col">Team</th><th scope="col">Enterprise</th></tr></thead><tbody>
      <tr><th scope="row">Monthly price</th><td>Free</td><td>$29</td><td>Contact us</td></tr>
      <tr><th scope="row">Approved routes</th><td>25</td><td>500</td><td>Custom</td></tr>
      <tr><th scope="row">Build checks</th><td>Basic</td><td>Detailed</td><td>Detailed</td></tr>
      <tr><th scope="row">Support</th><td>Community</td><td>Email</td><td>Dedicated</td></tr>
    </tbody></table></div>
    <h2>Choosing a plan</h2><p>The Starter column represents a small documentation site. Team and Enterprise illustrate larger route sets and more involved review. No payments or account flows are connected to this page.</p>
  </>;
}
