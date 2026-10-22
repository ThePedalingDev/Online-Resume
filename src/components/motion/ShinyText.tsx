import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ShinyTextProps = {
  children: ReactNode;
  className?: string;
  as?: 'span' | 'p';
};

/** shiny-text recipe — motion-anything */
export function ShinyText({ children, className, as: Tag = 'span' }: ShinyTextProps) {
  return <Tag className={cn('shiny', className)}>{children}</Tag>;
}
