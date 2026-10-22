import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type StarBorderProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

/** star-border recipe — motion-anything */
export function StarBorder<T extends ElementType = 'span'>({
  as,
  children,
  className,
  ...props
}: StarBorderProps<T>) {
  const Tag = as ?? 'span';
  return (
    <Tag className={cn('star', className)} {...props}>
      {children}
    </Tag>
  );
}
