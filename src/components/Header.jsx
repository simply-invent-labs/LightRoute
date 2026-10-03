import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return <header className="site-header">
    <div className="shell header-inner">
      <Link className="brand" to="/" aria-label="Cedar Home home"><img src="/images/logo.svg" alt="" /><span>Cedar Home</span><small>Everyday living</small></Link>
      <nav aria-label="Primary navigation" className="top-nav">
        <NavLink to="/" end>Home</NavLink><NavLink to="/docs">Guides</NavLink><NavLink to="/about">About</NavLink><NavLink to="/pricing">Pricing</NavLink>
      </nav>
    </div>
  </header>;
}