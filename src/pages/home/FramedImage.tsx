type FramedImageProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  fit?: 'cover' | 'contain';
  objectPosition?: string;
  priority?: boolean;
  className?: string;
};

export function FramedImage({
  src,
  width,
  height,
  alt,
  fit = 'cover',
  objectPosition = 'center',
  priority = false,
  className = '',
}: FramedImageProps) {
  return (
    <div className={`framed-media is-${fit} ${className}`.trim()}>
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        loading={priority ? 'eager' : 'lazy'}
        style={{ objectPosition }}
      />
    </div>
  );
}
