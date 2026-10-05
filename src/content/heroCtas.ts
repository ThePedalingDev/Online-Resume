export type HeroCta = {
  label: string;
  href: string;
  primary?: boolean;
  download?: boolean;
};

export const heroCtas: HeroCta[] = [
  { label: "See what I've built", href: '#work', primary: true },
  { label: 'Start a conversation', href: 'mailto:markusfourie@icloud.com' },
  { label: 'Download my resume (PDF)', href: '/cert-docs/markus-fourie-resume.pdf', download: true },
  { label: 'My gear', href: '/uses' },
];
