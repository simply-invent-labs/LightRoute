import { NavLink } from 'react-router-dom';

const links = [
  ['/docs', 'Overview'],
  ['/docs/getting-started', 'Getting started'],
  ['/docs/installation', 'Setting up'],
  ['/docs/api', 'Room checklist']
];

export default function Sidebar() {
  return <aside className="docs-sidebar" aria-label="Home guide sidebar">
    <div className="sidebar-sticky"><p className="eyebrow">Home guide</p><nav aria-label="Home guide navigation">
      {links.map(([path, label]) => <NavLink key={path} to={path} end={path === '/docs'}>{label}</NavLink>)}
    </nav><div className="sidebar-note">Small steps can make a room feel calmer. Choose one area and begin there.</div></div>
  </aside>;
}