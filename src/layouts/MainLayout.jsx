import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function MainLayout({ children }) {
  return <><Header /><main id="main-content" className="shell page-main"><article className="content">{children}</article></main><Footer /></>;
}
