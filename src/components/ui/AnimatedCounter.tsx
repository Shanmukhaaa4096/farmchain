import React, { useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1200,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  // Directly render genuine metric value without simulated/fake counter spinning
  return (
    <span className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};
