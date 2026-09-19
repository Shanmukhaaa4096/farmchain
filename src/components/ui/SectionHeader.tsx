import React from 'react';
import { WavySquiggle } from './SketchAccents';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowColor?: string;
  title: React.ReactNode;
  highlightWord?: string;
  squiggleColor?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  eyebrowColor = 'text-[#C77B58]',
  title,
  highlightWord,
  squiggleColor = '#C77B58',
  description,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={cn("space-y-3 max-w-3xl", isCenter && "mx-auto text-center", className)}>
      {eyebrow && (
        <span
          className={cn(
            "font-sans text-xs font-bold uppercase tracking-[0.18em] block",
            eyebrowColor
          )}
        >
          {eyebrow}
        </span>
      )}

      <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#163323] leading-[1.01] tracking-tight">
        {title}
        {highlightWord && (
          <span className="relative inline-block ml-2 text-[#C77B58]">
            {highlightWord}
            <span
              className={cn(
                "absolute left-0 -bottom-2.5 sm:-bottom-3 w-full flex pointer-events-none",
                isCenter ? "justify-center" : "justify-start"
              )}
            >
              <WavySquiggle color={squiggleColor} className="w-full h-3 sm:h-4" />
            </span>
          </span>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            "font-sans text-base sm:text-lg text-[#2F4A3A]/80 leading-relaxed max-w-[55ch] pt-2",
            isCenter && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
