import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Sidebar from '../components/Sidebar.jsx';

export default function DocsLayout({ children }) {
  return <><Header /><div className="shell docs-grid"><Sidebar /><main id="main-content" className="docs-main"><article className="content">{children}</article></main></div><Footer /></>;
}
