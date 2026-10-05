import type { CmsKey } from '@/lib/content';
import { availability } from '@/config/availability';
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
  kicker: 'Full-stack developer · Pretoria, ZA',
  lead: 'I build structured systems for the real world: resource platforms, operational tooling, and charity sites.',
  sub: 'React, Node.js, and ASP.NET Core. BSc Computer & Information Sciences.',
  work: availability.employer,
  employment: availability.status,
  imageUrl: '',
  imageAlt: 'Markus Fourie',
};

export const defaultAbout = {
  ledeHtml: 'I build operational software, and I race. Small steps, a long view.',
  sideHtml: [
    'Operational platforms for Rimitso Management Services and Katanga Contracting Services. BSc Computer and Information Sciences, Varsity College (now Emeris), final year 2025. Top Achiever, 2025. <a href="https://golden-key-international-honou.verified.cv/en/verify/20892159851455" target="_blank" rel="noopener noreferrer">Golden Key</a> Top Performer, 23 April 2025.',
    '<a href="https://skillance.co.za/" target="_blank" rel="noopener noreferrer">Skillance</a>, a side hustle with <a href="https://www.linkedin.com/in/kyle-nel-026742193/" target="_blank" rel="noopener noreferrer">Kyle Nel</a>, a good friend and colleague. Launch still to come.',
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
}> = [
  { year: '2021', chip: 'Potchefstroom', title: 'Physics and mathematics at North-West University',
    desc: 'Started in 2020 on the Potchefstroom campus. Passed 8 semester subjects, then left the degree. The first plan was mechanical engineering. Software was the wider brief.',
    tags: ['NWU', 'Physics', 'Mathematics'] },
  { year: '2023', chip: 'Varsity College', title: 'Started the BSc in Computer and Information Sciences',
    desc: 'Pretoria campus, now Emeris. C#, Java, and the web stack. Tutored first-year students in the IT department through 2024.',
    tags: ['Emeris', 'C#', 'Java'] },
  { year: '2024', chip: 'First production work', title: 'Eridge RDA, then Afrisist',
    desc: 'Shipped the Eridge RDA site for a UK charity: React, Vite, and Supabase, with a CMS for volunteers, programmes, and events. Built the Afrisist fleet alarm desk. Rode the Trans Baviaans, the 24-hour mountain bike marathon.',
    tags: ['Eridge RDA', 'Afrisist', 'Trans Baviaans'],
    project: 'eridge-rda' },
  { year: '2025', chip: 'Final year', title: 'The degree, between the UK and South Africa',
    desc: 'Final year of the BSc at Varsity College, now Emeris. Full time software developer at Rimitso Management Services for Katanga Contracting Services. Moved between the UK and South Africa for networking and experience.',
    tags: ['Rimitso', 'KCS', 'Emeris'] },
  { year: '2026', chip: 'Full time', title: 'Rimitso and KCS',
    desc: 'No longer studying. Full time with Rimitso Management Services and Katanga Contracting Services. Rode the full Ford Trailseeker series, including #6 Wellington at Bosman Family Vineyards on 12 September.',
    tags: ['Rimitso', 'KCS', 'Trailseeker'],
    project: 'katanga-rms' },
];

export const defaultCycling = {
  introHtml: 'Cross-country marathon and endurance. In 2024 I rode the <a href="https://transbaviaans.co.za/" target="_blank" rel="noopener noreferrer">Trans Baviaans</a>. In 2026 I rode the full <a href="https://trailseeker.co.za/mtb/events/6-wellington-2026/" target="_blank" rel="noopener noreferrer">Ford Trailseeker</a> series, including #6 Wellington on 12 September at Bosman Family Vineyards. The film is a ride along the Cape Peninsula with Matthew Waldeck. The metrics update after every ride.',
};

export const defaultGallery = [
  { cls: 'g-1', n: '12 Sep 2026', l: 'Trailseeker · Wellington', url: '' },
  { cls: 'g-2', n: 'Studio', l: 'Work from home desk setup', url: '' },
  { cls: 'g-3', n: 'Bike', l: 'S-Works MTB with new upgrades', url: '' },
  { cls: 'g-4', n: 'Race', l: 'Always race ready', url: '' },
  { cls: 'g-5', n: 'Ride', l: 'Long gravel ride', url: '' },
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

export const defaultStack = [
  { name: 'Web', items: [
    { n: 'HTML, CSS, JavaScript', y: '5 yrs' },
    { n: 'TypeScript', y: '4 yrs' },
    { n: 'React', y: '4 yrs' },
    { n: 'Tailwind CSS', y: '3 yrs' },
    { n: 'Node.js / Express', y: '4 yrs' },
    { n: 'SQL', y: '4 yrs' },
    { n: 'PostgreSQL', y: '3 yrs' },
    { n: 'C#', y: '4 yrs' },
    { n: 'ASP.NET Core', y: '3 yrs' },
    { n: 'EF Core', y: '3 yrs' },
    { n: 'REST / OpenAPI', y: 'in use' },
    { n: 'Next.js', y: '2 yrs' },
    { n: 'Supabase', y: '2 yrs' },
    { n: 'GSAP', y: '2 yrs' },
    { n: 'Three.js', y: '1 yr' },
    { n: 'Python', y: '2 yrs' },
    { n: 'Go', y: 'learning' },
  ]},
  { name: 'Mobile', items: [{ n: 'iOS and Android', y: 'in progress' }] },
  { name: 'Cloud and network', items: [
    { n: 'Linux', y: 'in use' },
    { n: 'Docker', y: '2 yrs' },
    { n: 'Nginx', y: '2 yrs' },
    { n: 'GitHub Actions', y: '2 yrs' },
    { n: 'Azure', y: '1 yr' },
    { n: 'Cloudflare tunnels', y: '1 yr' },
  ]},
  { name: 'Security', items: [
    { n: 'Environment secrets', y: 'in use' },
    { n: 'Role-based access', y: 'in use' },
  ]},
];

export const defaultDocs = {
  intro: 'CV from October 2025, the Golden Key record, and the Varsity College results. The college is now Emeris. The degree\'s final year was 2025.',
  items: [
    { label: 'CV', href: '/cert-docs/251024%20Markus%20Fourie%20CV.pdf', note: 'October 2025 · Full' },
    { label: 'Abridged CV', href: '/cert-docs/251024%20Markus%20Fourie%20Abridged%20Resume.pdf', note: 'October 2025 · One page' },
    { label: 'Golden Key', href: '/cert-docs/VC_GoldenKey.pdf', note: 'Top Performer · 23 April 2025' },
    { label: 'Golden Key verify', href: 'https://golden-key-international-honou.verified.cv/en/verify/20892159851455', note: 'External record' },
    { label: 'Academic results', href: '/cert-docs/VarsityCollege_Results.zip', note: 'Varsity College · ZIP' },
  ],
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
