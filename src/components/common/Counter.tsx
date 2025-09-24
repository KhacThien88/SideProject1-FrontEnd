import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  start?: number;
  className?: string;
  decimals?: number;
}

export const Counter: React.FC<CounterProps> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  start = 0,
  className = '',
  decimals = 0,
}) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = start;
    const endValue = end;
    const totalChange = endValue - startValue;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (totalChange * easeOutQuart);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, start, end, duration]);

  const formatNumber = (num: number) => {
    return decimals > 0 ? num.toFixed(decimals) : Math.floor(num).toString();
  };

  return (
    <span ref={counterRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};