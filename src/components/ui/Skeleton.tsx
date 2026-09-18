import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  height?: string | number;
  width?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  height,
  width,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'card':
        return 'rounded-2xl';
      case 'rectangular':
        return 'rounded-xl';
      case 'text':
      default:
        return 'rounded-md h-4';
    }
  };

  const style: React.CSSProperties = {
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
  };

  return (
    <div
      style={style}
      className={`relative overflow-hidden bg-dark-text/10 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-pure-white/40 before:to-transparent ${getVariantStyles()} ${className}`}
    />
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`rounded-3xl border border-dark-text/10 bg-pure-white p-6 shadow-soft-sm ${className}`}>
    <div className="flex items-center gap-3 mb-4">
      <Skeleton variant="circular" width={44} height={44} />
      <div className="flex-1 space-y-2">
        <Skeleton width="60%" height={16} />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
    <Skeleton variant="rectangular" height={140} className="mb-4" />
    <div className="space-y-2">
      <Skeleton width="100%" height={14} />
      <Skeleton width="80%" height={14} />
    </div>
  </div>
);
