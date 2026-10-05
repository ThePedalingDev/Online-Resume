import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export function RootLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isUses = pathname === '/uses';
  const isAdmin = pathname.startsWith('/admin');
  const editorial = isHome || isUses;

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!editorial && !isAdmin && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!editorial && !isAdmin && <Footer />}
    </div>
  );
}
