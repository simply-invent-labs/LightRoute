import { Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta.jsx';

export default function Home() {
  return <><PageMeta title="Home" description="Discover simple routines and practical ideas for organizing your home." path="/" />
    <div className="hero"><p className="eyebrow">Simple ideas for everyday living</p><h1>Less clutter. More comfort.</h1>
      <p className="lead">Cedar Home brings together practical ideas for creating a comfortable, organized home. Explore simple routines, thoughtful storage, and small changes that fit your daily life.</p>
      <div className="actions"><Link className="button" to="/docs/getting-started">Get started</Link><Link className="text-link" to="/docs">Explore the guides →</Link></div>
    </div>
    <section aria-labelledby="benefits"><h2 id="benefits">Make room for everyday life</h2><ul className="feature-list">
      <li><strong>Small steps.</strong> Start with one shelf, drawer, or corner at a time.</li>
      <li><strong>Useful spaces.</strong> Keep everyday essentials easy to find and put away.</li>
      <li><strong>Steady routines.</strong> A few simple habits help your home stay comfortable.</li>
    </ul></section>
    <section className="card-grid" aria-label="Explore Cedar Home"><div className="card"><h2>Read the guide</h2><p>Prepare a small space and choose storage that suits your needs.</p><Link to="/docs/installation">Room setup guide →</Link></div><div className="card"><h2>Plan your rooms</h2><p>Use a simple checklist to organize everyday essentials.</p><Link to="/docs/api">Room checklist →</Link></div></section>
    <p className="muted">For help using websites, visit the <a href="https://developer.mozilla.org/en-US/docs/Web" target="_blank" rel="noreferrer">web reference library</a>.</p>
  </>;
}