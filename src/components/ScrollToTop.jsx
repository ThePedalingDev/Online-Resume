import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop resets the scroll position to the top of the page whenever
 * the route changes. Without this component, navigating between pages
 * could leave the scroll at an arbitrary position.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}