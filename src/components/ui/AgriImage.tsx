import React, { useState } from 'react';
import { Sprout } from 'lucide-react';

export interface AgriImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g. '16/9', '3/4', '4/3', '1/1'
  priority?: boolean;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
}

export const AgriImage: React.FC<AgriImageProps> = ({
  src,
  alt,
  aspectRatio,
  priority = false,
  fallbackSrc = '/hero_indian_agriculture.jpg',
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (!error && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setError(true);
    } else {
      setError(true);
      setLoaded(true);
    }
  };

  return (
    <div 
      className={`relative overflow-hidden bg-warm-cream border-ink-black ${containerClassName}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Agricultural Shimmer Placeholder / Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#EADEC9] bg-furrow-pattern flex items-center justify-center animate-pulse z-0">
          <div className="flex flex-col items-center gap-2 text-farm-green opacity-40">
            <Sprout className="w-8 h-8 stroke-[1.5] animate-wind-sway" />
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
              LOADING FARMLAND DATA...
            </span>
          </div>
        </div>
      )}

      {/* Main Image or Fallback SVG */}
      {error && !currentSrc ? (
        <div className="absolute inset-0 bg-farm-green text-harvest-yellow flex flex-col items-center justify-center p-6 text-center font-mono text-xs">
          <Sprout className="w-12 h-12 stroke-[2] mb-2" />
          <strong className="font-heading font-black text-sm uppercase">FARMCHAIN HARVEST NETWORK</strong>
          <span className="text-[10px] text-warm-cream mt-1">Direct Field-to-Dock Traceability</span>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};
