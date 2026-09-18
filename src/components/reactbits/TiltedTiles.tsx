import React, { useState, useRef, useEffect } from 'react';

interface TiltedTilesProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
}

export const TiltedTiles: React.FC<TiltedTilesProps> = ({
  children,
  className = '',
  maxTilt = 7, // Subtle, restrained tilt
  perspective = 900
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect coarse pointer (mobile / tablet touch) to disable 3D tilt
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized -1 to +1
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    setTilt({
      x: -yPct * maxTilt,
      y: xPct * maxTilt
    });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        perspective: isTouchDevice ? 'none' : `${perspective}px`,
        transform: isTouchDevice 
          ? 'none' 
          : isHovered 
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-2px)` 
            : 'rotateX(0deg) rotateY(0deg) translateY(0px)'
      }}
    >
      {children}
    </div>
  );
};
