'use client';

import { useState } from 'react';

interface SigilImageProps {
  url: string;
  alt: string;
  size: 28 | 32;
}

export function SigilImage({ url, alt, size }: SigilImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded bg-neutral-800 text-sm"
        role="img"
        aria-label={alt}
      >
        🔏
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      width={size}
      height={size}
      className="rounded object-cover"
      style={{ width: size, height: size }}
      onError={() => setHasError(true)}
    />
  );
}
