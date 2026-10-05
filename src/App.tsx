import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SmoothScroll } from '@/components/SmoothScroll';
import { RootLayout } from '@/layouts/RootLayout';
import { Suspense, lazy, useEffect, useState, type ReactNode } from 'react';
import { AdminLogin } from '@/pages/AdminLogin';
import { Admin } from '@/pages/Admin';
import { Home } from '@/pages/Home';

const About = lazy(() => import('@/pages/About').then(module => ({ default: module.About })));
const Projects = lazy(() => import('@/pages/Projects').then(module => ({ default: module.Projects })));
const Contact = lazy(() => import('@/pages/Contact').then(module => ({ default: module.Contact })));
const Skills = lazy(() => import('@/pages/Skills').then(module => ({ default: module.Skills })));
const Social = lazy(() => import('@/pages/Social').then(module => ({ default: module.Social })));
const Uses = lazy(() => import('@/pages/Uses').then(module => ({ default: module.Uses })));
const NotFound = lazy(() => import('@/pages/NotFound').then(module => ({ default: module.NotFound })));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

function BrowserSmoothScroll({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) return <>{children}</>;
  return <SmoothScroll>{children}</SmoothScroll>;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserSmoothScroll>
        <Router>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
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
              <Route path="/docs" element={<Navigate to="/#docs" replace />} />
              <Route path="/uses" element={
                <Suspense fallback={<PageLoader />}>
                  <Uses />
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
      </BrowserSmoothScroll>
    </ThemeProvider>
  );
}

export default App;
