'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const EASE = 'cubic-bezier(0.25, 0.25, 0, 1)';
const OFFSET = 40;

export const Reveal = ({ children, className = '', delay = 0.15, direction = 'up' }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-60px' },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const y = direction === 'up' ? OFFSET : direction === 'down' ? -OFFSET : 0;
  const x = direction === 'left' ? OFFSET : direction === 'right' ? -OFFSET : 0;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate3d(0, 0, 0)' : `translate3d(${x}px, ${y}px, 0)`,
        transition: `opacity 0.5s ${EASE} ${delay}s, transform 0.5s ${EASE} ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
