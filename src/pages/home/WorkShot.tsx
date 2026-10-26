import type { WorkImage } from '@/content/work';

type WorkShotProps = {
  image: WorkImage;
  eager?: boolean;
  className?: string;
  objectPosition?: string;
};

export function WorkShot({ image, eager = false, className = '', objectPosition }: WorkShotProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={image.srcsetAvif} sizes={image.sizes} />
      <source type="image/webp" srcSet={image.srcsetWebp} sizes={image.sizes} />
      <img
        className={className}
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={image.sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={objectPosition ? { objectPosition } : undefined}
      />
    </picture>
  );
}
