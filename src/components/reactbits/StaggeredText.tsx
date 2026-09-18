import React, { useEffect, useState } from 'react';

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p' | 'div';
}

export const StaggeredText: React.FC<StaggeredTextProps> = ({
  text,
  className = '',
  delay = 50,
  stagger = 35,
  as: Component = 'span'
}) => {
  const [mounted, setMounted] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Component className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em] overflow-hidden align-top">
          <span
            className={`inline-block transition-all duration-500 ease-out transform ${
              mounted
                ? 'translate-y-0 opacity-100 rotate-0'
                : 'translate-y-[110%] opacity-0 rotate-1'
            }`}
            style={{
              transitionDelay: `${wordIndex * stagger}ms`,
              willChange: 'transform, opacity'
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
