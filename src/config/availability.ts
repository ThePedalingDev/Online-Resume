/**
 * Single source of truth for Markus's availability / employment status.
 *
 * Edit `status` (and optionally `employer`) when this changes. The hero
 * Employment stat, the contact availability line, and the HTML meta
 * description all read from here.
 */
export const availability = {
  /** Short status shown in the hero Employment row. */
  status: 'Full time',
  /** Employer / workplace label paired with status in contact and meta. */
  employer: 'Rimitso · KCS',
} as const;

export function availabilityLine(): string {
  return `${availability.status} · ${availability.employer}`;
}

export function siteMetaDescription(): string {
  return `Markus Fourie, full-stack developer in Pretoria. ${availabilityLine()}. React, Node.js, and ASP.NET. Building resource platforms, operational tooling, and charity sites.`;
}
