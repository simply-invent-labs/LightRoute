import PageMeta from '../components/PageMeta.jsx';

export default function Pricing() {
  return <><PageMeta title="Pricing" description="Compare fictional Cedar Home membership options for everyday organization." path="/pricing" />
    <p className="eyebrow">Membership examples</p><h1>Pricing</h1><p className="lead">These fictional memberships illustrate different ways to explore home organization ideas. Use the comparison to think about the level of guidance you prefer.</p>
    <h2>Compare plans</h2><div className="table-scroll"><table><caption>Illustrative monthly plans</caption><thead><tr><th scope="col">Feature</th><th scope="col">Basic</th><th scope="col">Household</th><th scope="col">Personal</th></tr></thead><tbody>
      <tr><th scope="row">Monthly price</th><td>Free</td><td>$29</td><td>Custom</td></tr>
      <tr><th scope="row">Guide collections</th><td>25</td><td>500</td><td>Custom</td></tr>
      <tr><th scope="row">Planning resources</th><td>Essential</td><td>Extended</td><td>Extended</td></tr>
      <tr><th scope="row">Support</th><td>Community</td><td>Email</td><td>Dedicated</td></tr>
    </tbody></table></div>
    <h2>Choosing a plan</h2><p>Basic offers a starting point for a single room. Household and Personal illustrate broader collections and more individual guidance. These examples are informational, and purchases are unavailable.</p>
  </>;
}