import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import gearEpic from '@/assets/gear/epic-sworks.webp';
import gearGarmin from '@/assets/gear/garmin-edge-840.webp';
import gearHeadset from '@/assets/gear/arctis-nova-pro.webp';
import gearKeyboard from '@/assets/gear/corsair-vanguard-96.webp';
import gearLaptop from '@/assets/gear/rog-zephyrus-g16.webp';
import gearMouse from '@/assets/gear/logitech-g-pro.webp';
import gearScicon from '@/assets/gear/scicon-aeroshade.webp';
import gearWilier from '@/assets/gear/wilier-rave.webp';
import gearMonitor from '@/assets/gear/alienware-aw2725dm.webp';
import gearLightBar from '@/assets/gear/xiaomi-monitor-light-bar.webp';
import gearHelmet from '@/assets/gear/met-manta.webp';
import gearShoes from '@/assets/gear/shimano-sh-xc903.webp';
import gearVictus from '@/assets/gear/hp-victus-15.webp';
import { BrandMark, type BrandMarkName } from '@/components/BrandMark';
import { fetchContent } from '@/lib/content';
import { defaultGearCoding, defaultGearCycling } from '@/lib/siteDefaults';

type GearItemT = { name: string; spec: string; cat: string; href: string };

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${inView ? 'is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const GEAR_MARKS: Record<string, BrandMarkName> = {
  'Corsair Vanguard 96': 'corsair',
  'Logitech G Pro': 'logitech',
  'Arctis Nova Pro Wireless': 'steelseries',
  'Garmin Edge 840': 'garmin',
};

const GEAR_IMAGES: Record<string, string> = {
  'ROG Zephyrus G16': gearLaptop,
  'HP Victus 15': gearVictus,
  'Alienware AW2725DM': gearMonitor,
  'Xiaomi Monitor Light Bar': gearLightBar,
  'Corsair Vanguard 96': gearKeyboard,
  'Logitech G Pro': gearMouse,
  'Arctis Nova Pro Wireless': gearHeadset,
  'Epic S-Works 7': gearEpic,
  'Rave SLR ID2': gearWilier,
  'MET Manta': gearHelmet,
  'Shimano SH-XC903': gearShoes,
  'Aeroshade 2.0 Titanium': gearScicon,
  'Garmin Edge 840': gearGarmin,
};

function GearItem({ item, idx }: { item: GearItemT; idx: number }) {
  const image = GEAR_IMAGES[item.name];
  const mark = GEAR_MARKS[item.name];
  return (
    <Reveal delay={idx * 60}>
      <article className="gear-item">
        <div className="gear-render">
          {image ? <img src={image} alt={item.name} loading="lazy" decoding="async" /> : null}
        </div>
        <div className="gear-body">
          <div>
            <h3>{mark ? <BrandMark name={mark} /> : null}{item.name}</h3>
            <p className="gear-spec">{item.spec}</p>
          </div>
          <div className="gear-meta">
            <span className="gm-cat">{item.cat}</span>
            {item.href !== '#' ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">View →</a>
            ) : (
              <span className="gm-cat">Internal</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Uses() {
  const [coding, setCoding] = useState<GearItemT[]>(defaultGearCoding);
  const [cycling, setCycling] = useState<GearItemT[]>(defaultGearCycling);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const [gc, gr] = await Promise.all([
          fetchContent<GearItemT[]>('gearCoding', ac.signal),
          fetchContent<GearItemT[]>('gearCycling', ac.signal),
        ]);
        if (Array.isArray(gc.value) && gc.value.some((item) => /alienware|victus/i.test(item.name))) setCoding(gc.value);
        if (Array.isArray(gr.value) && gr.value.some((item) => /manta|xc903/i.test(item.name))) setCycling(gr.value);
      } catch {
        // Keep defaults when backend is down.
      }
    })();
    return () => ac.abort();
  }, []);

  return (
    <div className="editorial uses-page">
      <nav className="ed-nav">
        <div className="ed-nav-inner">
          <Link to="/" className="ed-nav-brand">Markus Fourie</Link>
          <div className="ed-nav-links">
            <Link to="/">Home</Link>
            <Link to="/#projects">Work</Link>
            <Link to="/#contact">Contact</Link>
          </div>
          <a className="ed-nav-cta" href="/#contact">Get in touch</a>
        </div>
      </nav>
      <section id="uses">
        <div className="ed-shell">
          <div className="eyebrow-row">
            <span className="section-marker">Uses</span>
            <span className="num">Desk · Dirt · 2026</span>
          </div>
          <div className="ed-grid12">
            <Reveal className="gear-head">
              <h1 className="section-title">
                The <em>tools</em> I reach for: desk and dirt.
              </h1>
            </Reveal>
            <Reveal className="gear-intro" delay={120}>
              <p>
                Two tracks, same philosophy: buy once, use daily, maintain it well.
                Product links live here so the home page can stay focused on the work.
              </p>
            </Reveal>
            <div className="gear-tracks">
              <div className="gear-track">
                <Reveal>
                  <div className="gear-track-head">
                    <h2>Coding <em>kit</em></h2>
                    <span className="cnt">{coding.length} items</span>
                  </div>
                </Reveal>
                {coding.map((item, i) => (
                  <GearItem key={`${item.name}-${i}`} item={item} idx={i} />
                ))}
              </div>
              <div className="gear-track">
                <Reveal>
                  <div className="gear-track-head">
                    <h2>Cycling <em>kit</em></h2>
                    <span className="cnt">{cycling.length} items</span>
                  </div>
                </Reveal>
                {cycling.map((item, i) => (
                  <GearItem key={`${item.name}-${i}`} item={item} idx={i} />
                ))}
              </div>
            </div>
            <Reveal className="uses-back" delay={80}>
              <Link className="btn-text" to="/">← Back to home</Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
