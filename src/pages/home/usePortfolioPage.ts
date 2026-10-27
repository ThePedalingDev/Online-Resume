import { useEffect, useRef, useState } from 'react';
import { CONTACT_EMAIL } from '@/config/contact';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useReveal() {
  useEffect(() => {
    const rm = prefersReducedMotion();
    const els = document.querySelectorAll('.portfolio-redesign .reveal');
    if (rm) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useNavSectionActive() {
  useEffect(() => {
    const nav = [...document.querySelectorAll<HTMLAnchorElement>('.portfolio-redesign .nav a')];
    const sections = document.querySelectorAll<HTMLElement>('.portfolio-redesign main section[id]');
    const so = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            nav.forEach((a) =>
              a.setAttribute('aria-current', a.hash === `#${e.target.id}` ? 'true' : 'false'),
            );
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => so.observe(s));
    return () => so.disconnect();
  }, []);
}

export function useHeroLogLines() {
  useEffect(() => {
    const lines = [...document.querySelectorAll<HTMLElement>('.portfolio-redesign .panel .line')];
    const rm = prefersReducedMotion();
    if (rm) {
      lines.forEach((l) => l.classList.add('on'));
      return;
    }
    lines.forEach((l, i) => {
      window.setTimeout(() => l.classList.add('on'), 300 + i * 420);
    });
  }, []);
}

export function useCopyEmail() {
  const [label, setLabel] = useState('Copy email');
  const copying = useRef(false);

  const copy = async () => {
    if (copying.current) return;
    copying.current = true;
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setLabel('Copied');
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
    window.setTimeout(() => {
      setLabel('Copy email');
      copying.current = false;
    }, 2000);
  };

  return { label, copy };
}
