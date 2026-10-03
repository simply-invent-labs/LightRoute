import { Link } from 'react-router-dom';
import PageMeta from '../../components/PageMeta.jsx';

export default function DocsHome() {
  return <><PageMeta title="Home Guides" description="Browse practical Cedar Home guides for organizing rooms and everyday essentials." path="/docs" />
    <p className="eyebrow">Home guides</p><h1>Home guide overview</h1><p className="lead">Explore practical ideas for starting small, arranging useful spaces, and keeping everyday essentials organized. Pick a guide that suits the room you want to refresh.</p>
    <h2>In this guide</h2><ul className="link-list"><li><Link to="/docs/getting-started">Getting started</Link> — choose a space and take the first steps.</li><li><Link to="/docs/installation">Setting up</Link> — prepare storage and arrange everyday essentials.</li><li><Link to="/docs/api">Room checklist</Link> — review a sample plan and a list of useful items.</li></ul>
    <div className="callout"><strong>A gentle reminder</strong><p>You do not need to organize everything at once. A single drawer or shelf is a good place to begin.</p></div>
  </>;
}
