import { NavLink } from 'react-router-dom';

const links = [
  ['/docs', 'Overview'],
  ['/docs/getting-started', 'Getting started'],
  ['/docs/installation', 'Installation'],
  ['/docs/api', 'API reference']
];

export default function Sidebar() {
  return <aside className="docs-sidebar" aria-label="Documentation sidebar">
    <div className="sidebar-sticky"><p className="eyebrow">Documentation</p><nav aria-label="Documentation navigation">
      {links.map(([path, label]) => <NavLink key={path} to={path} end={path === '/docs'}>{label}</NavLink>)}
    </nav><div className="sidebar-note">These routes are public fixtures. Navigation is intentionally outside the article.</div></div>
  </aside>;
}
