import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subtext?: string;
  duration?: number;
  className?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  label,
  subtext,
  duration = 1800,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, value]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, value, duration]);

  return (
    <div
      ref={ref}
      className={cn(
        "p-6 sm:p-8 rounded-[28px] bg-[#FBF8F2] border border-[#2F4A3A]/10 shadow-soft",
        "flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-200",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between pb-3">
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#C77B58] bg-[#F1C9B8]/40 px-2.5 py-0.5 rounded-full border border-[#C77B58]/25">
          SAMPLE DATA
        </span>
        <span className="w-2 h-2 rounded-full bg-[#A8B89A] animate-pulse"></span>
      </div>

      <div className="space-y-1 my-2">
        <div className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#163323] tracking-tight">
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </div>
        <div className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2F4A3A]">
          {label}
        </div>
      </div>

      {subtext && (
        <p className="font-sans text-xs text-[#2F4A3A]/70 pt-2 border-t border-[#2F4A3A]/10">
          {subtext}
        </p>
      )}
    </div>
  );
};
