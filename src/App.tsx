import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { RootLayout } from '@/layouts/RootLayout';
import { Suspense, lazy } from 'react';

// Lazy load page components for code splitting
const Home = lazy(() => import('@/pages/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('@/pages/About').then(module => ({ default: module.About })));
const Projects = lazy(() => import('@/pages/Projects').then(module => ({ default: module.Projects })));
const Contact = lazy(() => import('@/pages/Contact').then(module => ({ default: module.Contact })));
const Skills = lazy(() => import('@/pages/Skills').then(module => ({ default: module.Skills })));
const Social = lazy(() => import('@/pages/Social').then(module => ({ default: module.Social })));
const Docs = lazy(() => import('@/pages/Docs').then(module => ({ default: module.Docs })));
const NotFound = lazy(() => import('@/pages/NotFound').then(module => ({ default: module.NotFound })));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            } />
            <Route path="/about" element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            } />
            <Route path="/projects" element={
              <Suspense fallback={<PageLoader />}>
                <Projects />
              </Suspense>
            } />
            <Route path="/contact" element={
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            } />
            <Route path="/skills" element={
              <Suspense fallback={<PageLoader />}>
                <Skills />
              </Suspense>
            } />
            <Route path="/social" element={
              <Suspense fallback={<PageLoader />}>
                <Social />
              </Suspense>
            } />
            <Route path="/docs" element={
              <Suspense fallback={<PageLoader />}>
                <Docs />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            } />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
