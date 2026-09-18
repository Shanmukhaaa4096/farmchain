import React, { CSSProperties } from 'react';

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#FFFDF7',
      shimmerSize = '0.08em',
      shimmerDuration = '3s',
      borderRadius = '9999px',
      background = 'var(--color-terracotta, #C96B45)',
      className = '',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            '--spread': '90deg',
            '--shimmer-color': shimmerColor,
            '--radius': borderRadius,
            '--speed': shimmerDuration,
            '--cut': shimmerSize,
            '--bg': background,
          } as CSSProperties
        }
        className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/20 px-8 py-3.5 text-xs font-sans font-semibold tracking-[0.14em] uppercase text-pure-white [background:var(--bg)] [border-radius:var(--radius)] shadow-soft-terracotta hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ${className}`}
        ref={ref}
        {...props}
      >
        {/* Spark container */}
        <div className="-z-30 blur-[2px] absolute inset-0 overflow-visible [container-type:size]">
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>

        {/* Inner background cut */}
        <div className="absolute inset-[1px] -z-20 rounded-[inherit] bg-inherit" />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  },
);

ShimmerButton.displayName = 'ShimmerButton';
