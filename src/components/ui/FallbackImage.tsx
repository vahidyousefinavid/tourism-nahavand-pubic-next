'use client';
import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface Props {
  src: string | null | undefined;
  alt?: string;
  className?: string;
}

export function FallbackImage({ src, alt = '', className = '' }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <Building2 className="w-10 h-10 text-gray-300" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
