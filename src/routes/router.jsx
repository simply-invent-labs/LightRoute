import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import DocsLayout from '../layouts/DocsLayout.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Pricing from '../pages/Pricing.jsx';
import Draft from '../pages/Draft.jsx';
import Private from '../pages/Private.jsx';
import DocsHome from '../pages/docs/DocsHome.jsx';
import GettingStarted from '../pages/docs/GettingStarted.jsx';
import Installation from '../pages/docs/Installation.jsx';
import Api from '../pages/docs/Api.jsx';

export default function Router() {
  return <Routes>
    <Route path="/" element={<MainLayout><Home /></MainLayout>} />
    <Route path="/about" element={<MainLayout><About /></MainLayout>} />
    <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
    <Route path="/docs" element={<DocsLayout><DocsHome /></DocsLayout>} />
    <Route path="/docs/getting-started" element={<DocsLayout><GettingStarted /></DocsLayout>} />
    <Route path="/docs/installation" element={<DocsLayout><Installation /></DocsLayout>} />
    <Route path="/docs/api" element={<DocsLayout><Api /></DocsLayout>} />
    <Route path="/draft" element={<MainLayout><Draft /></MainLayout>} />
    <Route path="/private" element={<MainLayout><Private /></MainLayout>} />
    <Route path="*" element={<MainLayout><h1>Page not found</h1><p>The page you are looking for is unavailable.</p></MainLayout>} />
  </Routes>;
}