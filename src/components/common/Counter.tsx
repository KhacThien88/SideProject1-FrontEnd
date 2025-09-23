import React, { useEffect, useRef, useState } from 'react';

export interface CounterProps {
  end: number;
  duration?: number; // ms
  suffix?: string;
  prefix?: string;
  start?: number;
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  end,
  duration = 1500,
  suffix = '',
  prefix = '',
  start = 0,
  className = '',
}) => {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, start]);

  return (
    <span className={`tabular-nums font-bold ${className}`}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};
