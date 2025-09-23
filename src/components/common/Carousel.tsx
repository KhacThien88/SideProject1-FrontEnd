import React, { useEffect, useRef, useState } from 'react';

export interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number; // ms
}

export const Carousel: React.FC<CarouselProps> = ({ items, autoPlay = true, interval = 3000 }) => {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    timer.current = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [autoPlay, interval, items.length]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${index * 100}%)`, width: `${items.length * 100}%` }}>
        {items.map((it, i) => (
          <div key={i} className="w-full flex-shrink-0 px-2">
            {it}
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {items.map((_, i) => (
          <button key={i} aria-label={`dot-${i}`} className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary-500' : 'bg-neutral-300'}`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </div>
  );
};
