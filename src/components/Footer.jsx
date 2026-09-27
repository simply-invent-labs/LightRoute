import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="site-footer"><div className="shell footer-inner">
    <p>LightRoute reference site · Controlled content for route and extraction tests.</p>
    <nav aria-label="Footer navigation"><Link to="/docs">Documentation</Link><Link to="/about">About</Link><Link to="/pricing">Pricing</Link></nav>
  </div></footer>;
}
