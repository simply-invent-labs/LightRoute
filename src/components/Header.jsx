import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return <header className="site-header">
    <div className="shell header-inner">
      <Link className="brand" to="/" aria-label="LightRoute home"><img src="/images/logo.svg" alt="" /><span>LightRoute</span><small>Reference site</small></Link>
      <nav aria-label="Primary navigation" className="top-nav">
        <NavLink to="/" end>Home</NavLink><NavLink to="/docs">Docs</NavLink><NavLink to="/about">About</NavLink><NavLink to="/pricing">Pricing</NavLink>
      </nav>
    </div>
  </header>;
}
