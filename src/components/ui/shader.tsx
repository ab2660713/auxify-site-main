'use client';

import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
import { cn } from '@/lib/utils';

interface ShaderBackgroundProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

const shaderColors = ['#1B3FFF', '#014BAA', '#3B5EFF', '#2563EB'];

export function ShaderBackground({ children, className, ...props }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [shaderSize, setShaderSize] = useState<{ height: number; width: number } | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isActive = true;
    const handleChange = () => {
      if (isActive) {
        setPrefersReducedMotion(mediaQuery.matches);
      }
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      isActive = false;
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    let isActive = true;

    if (!container) {
      return;
    }

    const updateShaderSize = () => {
      if (!isActive) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const width = Math.ceil(rect.width);
      const height = Math.ceil(rect.height);

      if (width <= 0 || height <= 0) {
        return;
      }

      setShaderSize((currentSize) => {
        if (currentSize?.width === width && currentSize.height === height) {
          return currentSize;
        }

        return { height, width };
      });
    };

    const resizeObserver = new ResizeObserver(updateShaderSize);
    resizeObserver.observe(container);
    updateShaderSize();

    return () => {
      isActive = false;
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={cn('group relative isolate min-h-162.5 w-full overflow-hidden bg-[#0a1e5c]', className)}
      ref={containerRef}
      {...props}
    >
      {shaderSize ? (
        <MeshGradient
          aria-hidden="true"
          className="absolute inset-0 -z-20 opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.01] motion-reduce:transform-none"
          colors={shaderColors}
          distortion={0.34}
          grainMixer={0}
          grainOverlay={0}
          height={shaderSize.height}
          key={`${shaderSize.width}x${shaderSize.height}`}
          maxPixelCount={1800000}
          minPixelRatio={1}
          speed={prefersReducedMotion ? 0 : 0.8}
          swirl={1}
          width={shaderSize.width}
        />
      ) : null}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(118deg,rgba(75,184,250,0.22)_0%,transparent_31%,rgba(255,255,255,0.08)_52%,transparent_76%),linear-gradient(180deg,rgba(4,8,22,0.02),rgba(4,8,22,0.2)_54%,rgba(4,8,22,0.4)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.06),transparent_22%,transparent_78%,rgba(255,255,255,0.05))]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,8,22,0.15)_0%,transparent_18%,transparent_82%,rgba(4,8,22,0.15)_100%)]" />

      {children}
    </div>
  );
}
