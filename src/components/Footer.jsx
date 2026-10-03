import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="site-footer"><div className="shell footer-inner">
    <p>Cedar Home · Simple ideas for comfortable everyday living.</p>
    <nav aria-label="Footer navigation"><Link to="/docs">Guides</Link><Link to="/about">About</Link><Link to="/pricing">Pricing</Link></nav>
  </div></footer>;
}