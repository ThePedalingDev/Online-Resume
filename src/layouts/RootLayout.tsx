import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export function RootLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isHome && !isAdmin && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isHome && !isAdmin && <Footer />}
    </div>
  );
}
