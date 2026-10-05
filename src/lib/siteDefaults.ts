import type { CmsKey } from '@/lib/content';
import { availability } from '@/config/availability';
import { journeyNodes, stackGroups, paperTrail } from '@/content/site';
import { type ProjectTagId } from '@/data/projectTags';

export const SECTION_LABELS: Record<CmsKey, string> = {
  hero: 'Hero',
  about: 'About',
  journey: 'Journey',
  cycling: 'Cycling',
  gallery: 'Gallery',
  stack: 'Stack',
  gearCoding: 'Coding kit',
  gearCycling: 'Cycling kit',
  docs: 'Docs',
};

export const defaultHero = {
  kicker: 'Full-stack developer in Pretoria',
  lead: 'Software that holds up outside the office.',
  sub: "Right now that's the Resource Management System Katanga Contracting Services runs its sites, assets and shifts on.",
  work: availability.employer,
  employment: availability.status,
  imageUrl: '',
  imageAlt: 'Markus Fourie in profile, wearing a cap and a dark polo shirt',
};

export const defaultAbout = {
  ledeHtml:
    "I didn't take the straight road into software. I started in physics and maths, switched to a computing degree, and was shipping production work before I graduated.",
  sideHtml: [
    'Operations software for Katanga Contracting Services. BSc Computer and Information Sciences, Varsity College (now Emeris), final year 2025. Top Achiever, 2025. <a href="https://golden-key-international-honou.verified.cv/en/verify/20892159851455" target="_blank" rel="noopener noreferrer">Golden Key</a> Top Performer, 23 April 2025.',
    '<a href="https://skillance.co.za/" target="_blank" rel="noopener noreferrer">Skillance</a>, co-built with <a href="https://www.linkedin.com/in/kyle-nel-026742193/" target="_blank" rel="noopener noreferrer">Kyle Nel</a>.',
  ],
  images: [
    { slot: 'one', url: '', label: 'With Kyle Nel', meta: 'BSc · 2025' },
    { slot: 'two', url: '', label: 'Top Achiever · 2025', meta: 'Varsity College' },
    { slot: 'three', url: '', label: 'Golden Key · Top Performer', meta: '23 Apr 2025' },
  ],
};

export const defaultJourney: Array<{
  year: string;
  chip: string;
  title: string;
  desc: string;
  tags: string[];
  project?: ProjectTagId;
}> = journeyNodes.map((n) => ({
  year: n.year,
  chip: n.chip,
  title: n.title,
  desc: n.desc,
  tags: [...n.tags],
  project: n.project,
}));

export const defaultCycling = {
  introHtml:
    'When I close the laptop, I ride: mostly cross-country marathons and long endurance days. In 2024 I rode the <a href="https://transbaviaans.co.za/" target="_blank" rel="noopener noreferrer">Trans Baviaans</a>, the 24-hour mountain bike marathon. This year I rode the full <a href="https://trailseeker.co.za/mtb/events/6-wellington-2026/" target="_blank" rel="noopener noreferrer">Ford Trailseeker</a> series, including #6 Wellington at Bosman Family Vineyards on 12 September.',
};

export const defaultGallery = [
  { cls: 'g-1', n: '12 Sep 2026', l: 'Trailseeker #6, Wellington', url: '' },
  { cls: 'g-2', n: 'Studio', l: 'The home desk', url: '' },
  { cls: 'g-3', n: 'Bike', l: 'My S-Works, freshly upgraded', url: '' },
  { cls: 'g-4', n: 'Race', l: 'Race morning', url: '' },
  { cls: 'g-5', n: 'Ride', l: 'A long gravel day', url: '' },
];

export const defaultGearCoding = [
  { name: 'ROG Zephyrus G16', spec: '16-inch daily driver', cat: 'Compute', href: 'https://rog.asus.com/laptops/rog-zephyrus/rog-zephyrus-g16-2025-gu605/' },
  { name: 'HP Victus 15', spec: '15-inch home lab', cat: 'Lab', href: 'https://www.hp.com/us-en/shop/pdp/victus-gaming-laptop-15-fb3025nr' },
  { name: 'Alienware AW2725DM', spec: 'Dell · 27-inch QHD', cat: 'Display', href: 'https://www.dell.com/en-us/shop/alienware-27-gaming-monitor-aw2725dm/apd/210-bpky/monitors-monitor-accessories' },
  { name: 'Xiaomi Monitor Light Bar', spec: 'Mounts on the monitor', cat: 'Light', href: 'https://www.mi.com/uk/product/mi-computer-monitor-light-bar/' },
  { name: 'Corsair Vanguard 96', spec: '96% mechanical · 8,000 Hz', cat: 'Input', href: 'https://www.corsair.com/us/en/p/keyboards/ch-91e911e-na/vanguard-96-mechanical-gaming-keyboard-corsair-mlx-quantum-ch-91e911e-na' },
  { name: 'Logitech G Pro', spec: 'LIGHTSPEED wireless', cat: 'Input', href: 'https://www.logitechg.com/en-us/shop/p/pro-wireless-mouse' },
  { name: 'Arctis Nova Pro Wireless', spec: 'SteelSeries · ANC · hot-swap battery', cat: 'Audio', href: 'https://steelseries.com/gaming-headsets/arctis-nova-pro' },
];

export const defaultGearCycling = [
  { name: 'Epic S-Works 7', spec: 'Specialized · full-suspension XC', cat: 'MTB', href: 'https://www.specialized.com/us/en/s-works-epic-sram-xx1-axs-rockshox-ultimate-brain/p/205828' },
  { name: 'Rave SLR ID2', spec: 'Wilier · gravel race bike', cat: 'Gravel', href: 'https://www.wilier.com/en/bikes/gravel/rave-slr-id2' },
  { name: 'MET Manta', spec: 'Holographic colour helmet', cat: 'Helmet', href: 'https://www.met-helmets.com/en/shop/cycling-helmets/tri-aero-helmets/manta-mips/' },
  { name: 'Shimano SH-XC903', spec: 'Wide unisex MTB shoes', cat: 'Shoes', href: 'https://ride.shimano.com/products/sh-xc903' },
  { name: 'Aeroshade 2.0 Titanium', spec: 'Scicon · cycling eyewear', cat: 'Eyewear', href: 'https://sciconsports.com/en/products/aeroshade-2-0-titanium-ey440801' },
  { name: 'Garmin Edge 840', spec: 'GPS bike computer', cat: 'Compute', href: 'https://www.garmin.com/en-US/p/798777/' },
];

export const defaultStack = stackGroups;

export const defaultDocs = {
  intro: "If you'd rather read it than scroll it, it's all here.",
  items: paperTrail.map(({ label, href, note }) => ({ label, href, note })),
};

const DEFAULTS: Record<CmsKey, unknown> = {
  hero: defaultHero,
  about: defaultAbout,
  journey: defaultJourney,
  cycling: defaultCycling,
  gallery: defaultGallery,
  stack: defaultStack,
  gearCoding: defaultGearCoding,
  gearCycling: defaultGearCycling,
  docs: defaultDocs,
};

function isEmptyCms(value: unknown): boolean {
  if (value == null) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value as object).length === 0;
  return false;
}

export function resolveDraft(key: CmsKey, value: unknown): unknown {
  const base = structuredClone(DEFAULTS[key]);
  if (isEmptyCms(value)) return base;
  if (Array.isArray(base)) return value;
  if (base && typeof base === 'object' && value && typeof value === 'object' && !Array.isArray(value)) {
    return { ...(base as object), ...(value as object) };
  }
  return value;
}
