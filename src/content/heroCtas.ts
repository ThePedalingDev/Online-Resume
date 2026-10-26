import { contactMailto } from '../config/contact';

export type HeroCta = {
  label: string;
  href: string;
  primary?: boolean;
  download?: boolean;
};

export const heroCtas: HeroCta[] = [
  { label: "See what I've built", href: '#work', primary: true },
  { label: 'Email me', href: contactMailto },
  { label: 'Resume (PDF)', href: '/cert-docs/markus-fourie-resume.pdf', download: true },
];
