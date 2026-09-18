import React, { useEffect, useRef, useState } from 'react';

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

export const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  className = '',
  duration = 0.5,
  delay = 0,
  yOffset = 16,
  inView = true,
  inViewMargin = '-50px',
  blur = '6px',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!inView);

  useEffect(() => {
    if (!inView) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: inViewMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [inView, inViewMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: isVisible ? 'translateY(0)' : `translateY(${yOffset}px)`,
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : `blur(${blur})`,
        transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'transform, opacity, filter',
      }}
    >
      {children}
    </div>
  );
};
