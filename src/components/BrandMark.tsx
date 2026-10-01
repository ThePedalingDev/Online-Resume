import cloudflare from '@/assets/logos/cloudflare.svg';
import corsair from '@/assets/logos/corsair.svg';
import csharp from '@/assets/logos/csharp.svg';
import docker from '@/assets/logos/docker.svg';
import dotnet from '@/assets/logos/dotnet.svg';
import garmin from '@/assets/logos/garmin.svg';
import github from '@/assets/logos/github.svg';
import go from '@/assets/logos/go.svg';
import greensock from '@/assets/logos/greensock.svg';
import instagram from '@/assets/logos/instagram.svg';
import javascript from '@/assets/logos/javascript.svg';
import linkedin from '@/assets/logos/linkedin.svg';
import linux from '@/assets/logos/linux.svg';
import logitech from '@/assets/logos/logitech.svg';
import microsoftazure from '@/assets/logos/microsoftazure.svg';
import nextdotjs from '@/assets/logos/nextdotjs.svg';
import nginx from '@/assets/logos/nginx.svg';
import nodedotjs from '@/assets/logos/nodedotjs.svg';
import openapiinitiative from '@/assets/logos/openapiinitiative.svg';
import postgresql from '@/assets/logos/postgresql.svg';
import python from '@/assets/logos/python.svg';
import react from '@/assets/logos/react.svg';
import steelseries from '@/assets/logos/steelseries.svg';
import strava from '@/assets/logos/strava.svg';
import supabase from '@/assets/logos/supabase.svg';
import tailwindcss from '@/assets/logos/tailwindcss.svg';
import threedotjs from '@/assets/logos/threedotjs.svg';
import typescript from '@/assets/logos/typescript.svg';

const MARKS = {
  cloudflare,
  corsair,
  csharp,
  docker,
  dotnet,
  garmin,
  github,
  go,
  greensock,
  instagram,
  javascript,
  linkedin,
  linux,
  logitech,
  microsoftazure,
  nextdotjs,
  nginx,
  nodedotjs,
  openapiinitiative,
  postgresql,
  python,
  react,
  steelseries,
  strava,
  supabase,
  tailwindcss,
  threedotjs,
  typescript,
} as const;

export type BrandMarkName = keyof typeof MARKS;

export function BrandMark({ name }: { name: BrandMarkName }) {
  const url = MARKS[name];
  return (
    <span
      className="brand-mark"
      aria-hidden="true"
      style={{
        maskImage: `url("${url}")`,
        WebkitMaskImage: `url("${url}")`,
      }}
    />
  );
}
