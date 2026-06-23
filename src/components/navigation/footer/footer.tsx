'use client';

import { ArrowRight } from 'lucide-react';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LogoLockup from '@/components/brand/logo-lockup';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const HEX_COLOR_PATTERN = /^#?([\da-f]{3}|[\da-f]{6})$/i;
const RGB_COLOR_PATTERN = /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)$/i;
const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'support@auxify.live';
const supportEmailHref = `mailto:${supportEmail}` as const;
const consoleSignUpHref = 'https://app.auxify.live/sign-up' as const;
const consoleSignInHref = 'https://app.auxify.live/sign-in' as const;
const privacyPolicyHref = '/privacy' as Route;
const termsHref = '/terms' as Route;
const footerPrimaryCtaClassName = cn(
  buttonVariants({ size: 'lg' }),
  'group/cta relative isolate h-11 overflow-hidden rounded-full border border-primary/35 bg-primary px-5 font-semibold text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.34),inset_0_-2px_0_rgba(0,43,96,0.34),0_18px_36px_-22px_rgba(1,75,170,0.9)] transition-[background-color,box-shadow,transform] duration-300 before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-white/0 before:via-white/28 before:to-white/0 before:transition-transform before:duration-700 after:pointer-events-none after:absolute after:inset-x-2 after:top-1.5 after:h-3 after:rounded-full after:bg-white/18 after:blur-[1px] hover:-translate-y-px hover:bg-primary/95 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-2px_0_rgba(0,43,96,0.3),0_18px_38px_-20px_rgba(1,75,170,0.95)] hover:before:translate-x-full active:translate-y-0 active:shadow-[inset_0_2px_9px_rgba(0,43,96,0.36),0_8px_18px_-16px_rgba(1,75,170,0.8)] focus-visible:ring-primary/35 motion-reduce:transition-none motion-reduce:before:transition-none',
);
const footerSecondaryCtaClassName = cn(
  buttonVariants({ size: 'lg' }),
  'group/sales relative isolate h-11 overflow-hidden rounded-full border border-primary/18 bg-background/76 px-5 font-semibold text-foreground/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-1px_0_rgba(1,75,170,0.1),0_14px_34px_-28px_rgba(1,75,170,0.9)] backdrop-blur-xl transition-[background-color,border-color,box-shadow,color,transform] duration-300 before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-white/0 before:via-primary/14 before:to-white/0 before:transition-transform before:duration-700 after:pointer-events-none after:absolute after:inset-x-2 after:top-1.5 after:h-3 after:rounded-full after:bg-white/58 after:blur-[1px] hover:-translate-y-px hover:border-primary/34 hover:bg-background/90 hover:text-primary hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-1px_0_rgba(1,75,170,0.14),0_18px_42px_-30px_rgba(1,75,170,1)] hover:before:translate-x-full active:translate-y-0 active:bg-background/82 active:text-primary focus-visible:ring-primary/35 motion-reduce:transition-none motion-reduce:before:transition-none',
);
function clampColorChannel(value: number) {
  return Math.min(255, Math.max(0, Math.round(value)));
}

function clampAlpha(value: number) {
  return Math.min(1, Math.max(0, value));
}

// Helper function to convert any CSS color to rgba
const getRGBA = (cssColor: React.CSSProperties['color'], fallback: string = 'rgba(180, 180, 180, 1)'): string => {
  if (typeof window === 'undefined') return fallback;
  if (typeof cssColor !== 'string' || !cssColor.trim()) return fallback;

  const color = cssColor.trim();

  const hexMatch = color.match(HEX_COLOR_PATTERN);
  if (hexMatch) {
    const normalizedHex =
      hexMatch[1].length === 3
        ? hexMatch[1]
            .split('')
            .map((character) => character + character)
            .join('')
        : hexMatch[1];
    const parsed = Number.parseInt(normalizedHex, 16);
    const red = (parsed >> 16) & 255;
    const green = (parsed >> 8) & 255;
    const blue = parsed & 255;

    return `rgba(${red}, ${green}, ${blue}, 1)`;
  }

  const rgbMatch = color.match(RGB_COLOR_PATTERN);
  if (rgbMatch) {
    const red = clampColorChannel(Number(rgbMatch[1]));
    const green = clampColorChannel(Number(rgbMatch[2]));
    const blue = clampColorChannel(Number(rgbMatch[3]));
    const alpha = rgbMatch[4] === undefined ? 1 : clampAlpha(Number(rgbMatch[4]));

    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }

  try {
    const element = document.createElement('span');
    element.style.color = color;
    element.style.position = 'absolute';
    element.style.visibility = 'hidden';
    document.body.appendChild(element);
    const computedColor = window.getComputedStyle(element).color;

    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }

    if (computedColor && computedColor !== color) {
      return getRGBA(computedColor, fallback);
    }
  } catch {
    return fallback;
  }

  return fallback;
};

// Helper function to add opacity to an RGB color string
const colorWithOpacity = (color: string, opacity: number): string => {
  const rgbaColor = getRGBA(color);
  const rgbMatch = rgbaColor.match(RGB_COLOR_PATTERN);

  if (!rgbMatch) return rgbaColor;

  const red = clampColorChannel(Number(rgbMatch[1]));
  const green = clampColorChannel(Number(rgbMatch[2]));
  const blue = clampColorChannel(Number(rgbMatch[3]));

  return `rgba(${red}, ${green}, ${blue}, ${clampAlpha(opacity)})`;
};

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string; // Can be any valid CSS color including hex, rgb, rgba, hsl, var(--color)
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
  text?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: number | string;
  contentMaxWidth?: number;
  textVerticalPosition?: number;
}

type GridParams = {
  cols: number;
  rows: number;
  squares: Float32Array;
  textCells: Uint8Array;
  dpr: number;
};

const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 3,
  gridGap = 3,
  flickerChance = 0.2,
  color = '#B4B4B4',
  width,
  height,
  className,
  maxOpacity = 0.15,
  text = '',
  fontSize = 140,
  fontWeight = 600,
  contentMaxWidth,
  textVerticalPosition = 0.5,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Convert any CSS color to rgba for optimal canvas performance
  const memoizedColor = useMemo(() => {
    return getRGBA(color);
  }, [color]);

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      textCells: Uint8Array,
      dpr: number,
    ) => {
      ctx.clearRect(0, 0, width, height);

      // Draw flickering squares with optimized RGBA colors
      for (let columnIndex = 0; columnIndex < cols; columnIndex++) {
        for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
          const cellIndex = columnIndex * rows + rowIndex;
          const x = columnIndex * (squareSize + gridGap) * dpr;
          const y = rowIndex * (squareSize + gridGap) * dpr;
          const squareWidth = squareSize * dpr;
          const squareHeight = squareSize * dpr;

          const hasText = textCells[cellIndex] === 1;
          const opacity = squares[cellIndex];
          const finalOpacity = hasText ? Math.min(1, opacity * 3 + 0.4) : opacity;

          ctx.fillStyle = colorWithOpacity(memoizedColor, finalOpacity);
          ctx.fillRect(x, y, squareWidth, squareHeight);
        }
      }
    },
    [memoizedColor, squareSize, gridGap],
  );

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const cols = Math.ceil(width / (squareSize + gridGap));
      const rows = Math.ceil(height / (squareSize + gridGap));

      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }

      const textCells = new Uint8Array(cols * rows);

      if (text) {
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = canvas.width;
        maskCanvas.height = canvas.height;
        const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true });

        if (maskCtx) {
          maskCtx.save();
          maskCtx.scale(dpr, dpr);
          const canvasWidth = canvas.width / dpr;
          const canvasHeight = canvas.height / dpr;

          if (contentMaxWidth) {
            const contentWidth = Math.min(canvasWidth, contentMaxWidth);
            const contentLeft = (canvasWidth - contentWidth) / 2;
            maskCtx.beginPath();
            maskCtx.rect(contentLeft, 0, contentWidth, canvasHeight);
            maskCtx.clip();
          }

          maskCtx.fillStyle = 'white';
          maskCtx.font = `${fontWeight} ${fontSize}px "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
          maskCtx.textAlign = 'center';
          maskCtx.textBaseline = 'middle';
          maskCtx.fillText(text, canvasWidth / 2, canvasHeight * textVerticalPosition);
          maskCtx.restore();

          for (let columnIndex = 0; columnIndex < cols; columnIndex++) {
            for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
              const sampleX = Math.min(
                canvas.width - 1,
                Math.floor((columnIndex * (squareSize + gridGap) + squareSize / 2) * dpr),
              );
              const sampleY = Math.min(
                canvas.height - 1,
                Math.floor((rowIndex * (squareSize + gridGap) + squareSize / 2) * dpr),
              );
              const alpha = maskCtx.getImageData(sampleX, sampleY, 1, 1).data[3];

              if (alpha > 0) {
                textCells[columnIndex * rows + rowIndex] = 1;
              }
            }
          }
        }
      }

      return { cols, rows, squares, textCells, dpr };
    },
    [squareSize, gridGap, maxOpacity, text, contentMaxWidth, fontWeight, fontSize, textVerticalPosition],
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      if (prefersReducedMotion) return;

      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity, prefersReducedMotion],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isActive = true;

    const updateMotionPreference = () => {
      if (isActive) {
        setPrefersReducedMotion(mediaQuery.matches);
      }
    };

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => {
      isActive = false;
      mediaQuery.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let gridParams: GridParams;
    let isActive = true;

    const drawCurrentGrid = () => {
      if (!isActive) return;

      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.textCells,
        gridParams.dpr,
      );
    };

    const updateCanvasSize = () => {
      if (!isActive) return;

      const newWidth = width || container.clientWidth;
      const newHeight = height || container.clientHeight;
      gridParams = setupCanvas(canvas, newWidth, newHeight);
      drawCurrentGrid();
    };

    updateCanvasSize();

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isActive || !isInView) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.textCells,
        gridParams.dpr,
      );
      if (isActive && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const resizeObserver = new ResizeObserver(updateCanvasSize);

    resizeObserver.observe(container);
    window.addEventListener('resize', updateCanvasSize);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (isActive) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0 },
    );

    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      isActive = false;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={cn('h-full w-full', className)} {...props}>
      <canvas ref={canvasRef} className="pointer-events-none block h-full w-full" />
    </div>
  );
};

function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    let isActive = true;

    // Handle initial check and subsequent changes
    function checkQuery() {
      const result = window.matchMedia(query);
      if (isActive) {
        setValue(result.matches);
      }
    }

    // Check immediately
    checkQuery();

    // Add resize listener
    window.addEventListener('resize', checkQuery);

    // Add media query change listener
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', checkQuery);

    // Cleanup
    return () => {
      isActive = false;
      window.removeEventListener('resize', checkQuery);
      mediaQuery.removeEventListener('change', checkQuery);
    };
  }, [query]);

  return value;
}

type FooterHref = Route | `/#${string}` | `mailto:${string}` | `https://${string}`;

type FooterLink = {
  label: string;
  href: FooterHref;
};

type FooterLinkColumn = {
  title: string;
  links: readonly FooterLink[];
};

type CertificationLogo = {
  alt: string;
  src: string;
  documentHref?: `/certified/${string}.pdf`;
  className: string;
};

type FooterProps = {
  copyrightYear: number;
};

const legalLinks = [
  { label: 'Privacy Policy', href: privacyPolicyHref },
  { label: 'Terms', href: termsHref },
] satisfies readonly FooterLink[];

const siteConfig = {
  description: 'Run conversations, follow-ups, and handoffs from one reliable AI workspace.',
  footerLinks: [
    {
      title: 'Platform',
      links: [
        { label: 'AI workforce', href: '/#platform' },
        { label: 'Customer operations', href: '/' as Route },
        { label: 'Start free trial', href: consoleSignUpHref },
        { label: 'Sign in', href: consoleSignInHref },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Contact', href: supportEmailHref },
        { label: 'Plans', href: '/#pricing' },
        { label: 'Talk to sales', href: supportEmailHref },
        { label: 'Return to top', href: '/#platform' },
      ],
    },
    {
      title: 'Trust',
      links: [
        { label: 'Security questions', href: supportEmailHref },
        { label: 'Privacy requests', href: supportEmailHref },
        { label: 'Accessibility requests', href: supportEmailHref },
        { label: 'Data questions', href: supportEmailHref },
      ],
    },
  ] satisfies readonly FooterLinkColumn[],
  certificationLogos: [
    {
      alt: 'ISO 27001 certified',
      src: '/certified/27001.png',
      documentHref: '/certified/27001.pdf',
      className: 'object-contain',
    },
    {
      alt: 'ISO 42001 certified',
      src: '/certified/42001.png',
      documentHref: '/certified/42001.pdf',
      className: 'object-cover',
    },
    {
      alt: 'ISO 27701 certified',
      src: '/certified/27701.svg',
      documentHref: '/certified/27701.pdf',
      className: 'object-cover',
    },
    {
      alt: 'DPDPA certified',
      src: '/certified/dpdpa.png',
      documentHref: '/certified/dpiit.pdf',
      className: 'object-contain',
    },
    {
      alt: 'AICPA SOC for Service Organizations badge',
      src: '/certified/soc2.png',
      className: 'object-contain',
    },
  ] satisfies readonly CertificationLogo[],
};

function isHashHref(href: FooterHref): href is `/#${string}` {
  return href.startsWith('/#');
}

function isMailHref(href: FooterHref): href is `mailto:${string}` {
  return href.startsWith('mailto:');
}

function isExternalHref(href: FooterHref): href is `https://${string}` {
  return href.startsWith('https://');
}

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className =
    'group/nav-link relative inline-flex min-h-8 items-center rounded-full px-1.5 py-2 text-sm font-medium text-foreground/68 transition-colors duration-300 hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/25 focus-visible:outline-none motion-reduce:transition-none sm:min-h-9';

  const content = (
    <>
      <span>{link.label}</span>
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-1.5 right-1.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover/nav-link:scale-x-100 motion-reduce:transition-none"
      />
    </>
  );

  if (isHashHref(link.href) || isMailHref(link.href) || isExternalHref(link.href)) {
    return (
      <a className={className} href={link.href}>
        {content}
      </a>
    );
  }

  return (
    <Link className={className} href={link.href}>
      {content}
    </Link>
  );
}

export default function Footer({ copyrightYear }: FooterProps) {
  const compact = useMediaQuery('(max-width: 640px)');
  const tablet = useMediaQuery('(max-width: 1024px)');
  const wide = useMediaQuery('(min-width: 1280px)');
  const flickerFontSize = compact ? 88 : tablet ? 112 : wide ? 188 : 154;
  const flickerChance = compact ? 0.024 : tablet ? 0.032 : 0.04;

  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative isolate scroll-mt-24 w-full overflow-hidden bg-background pb-[clamp(10rem,22vw,18rem)] text-foreground"
      id="footer"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,var(--background)_0%,var(--background)_42%,color-mix(in_oklch,var(--background),var(--primary)_6%)_76%,color-mix(in_oklch,var(--background),var(--primary)_10%)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[clamp(18rem,34vw,28rem)] overflow-hidden opacity-95 mask-[linear-gradient(to_top,black_0%,black_36%,rgba(0,0,0,0.72)_54%,transparent_100%)]"
      >
        <FlickeringGrid
          className="h-full w-full"
          color="#014BAA"
          contentMaxWidth={1280}
          flickerChance={flickerChance}
          fontSize={flickerFontSize}
          fontWeight={700}
          gridGap={compact ? 2 : 3}
          maxOpacity={compact ? 0.18 : 0.24}
          squareSize={2}
          text="Auxify"
          textVerticalPosition={compact ? 0.72 : 0.7}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 p-4 pt-16 pb-3 sm:gap-10 sm:pt-16 sm:pb-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1.42fr)] lg:gap-20 lg:pt-20 lg:pb-8">
        <div className="flex max-w-xl flex-col gap-7 sm:gap-8">
          <Link
            aria-label="Return to Auxify home"
            className="hidden w-fit rounded-md transition-opacity duration-300 outline-none hover:opacity-85 focus-visible:ring-3 focus-visible:ring-primary/25 motion-reduce:transition-none sm:inline-flex"
            href="/"
          >
            <LogoLockup size="3.4rem" wordmarkClassName="w-20 sm:w-24" />
          </Link>

          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase" id="footer-heading">
              AI employees for teams
            </p>
            <p className="max-w-lg text-base leading-7 text-pretty text-foreground/68 sm:text-lg sm:leading-8">
              {siteConfig.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
            <a className={cn(footerPrimaryCtaClassName, 'w-full sm:w-auto')} href={consoleSignUpHref}>
              <span className="relative z-10">Get started</span>
              <ArrowRight
                aria-hidden="true"
                className="relative z-10 size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
            <a className={cn(footerSecondaryCtaClassName, 'w-full sm:w-auto')} href={supportEmailHref}>
              <span className="relative z-10">Talk to sales</span>
              <ArrowRight
                aria-hidden="true"
                className="relative z-10 size-4 transition-transform duration-300 group-hover/sales:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          </div>

          <ul aria-label="Auxify certifications" className="flex flex-wrap items-center gap-3 sm:gap-4">
            {siteConfig.certificationLogos.map(({ alt, src, documentHref, className }) => {
              const logoImage = (
                <Image
                  alt={alt}
                  className={cn('h-14 w-14 shrink-0 drop-shadow-sm sm:h-16 sm:w-16', className)}
                  decoding="async"
                  height={64}
                  loading="lazy"
                  sizes="(min-width: 640px) 64px, 56px"
                  src={src}
                  width={64}
                />
              );

              if (!documentHref) {
                return (
                  <li className="flex items-center" key={src}>
                    {logoImage}
                  </li>
                );
              }

              return (
                <li className="flex items-center" key={src}>
                  <a
                    aria-label={`Open ${alt} document in a new tab`}
                    className="rounded-full transition-[opacity,transform] duration-300 outline-none hover:-translate-y-0.5 hover:opacity-85 focus-visible:ring-3 focus-visible:ring-primary/25 motion-reduce:transition-none"
                    href={documentHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {logoImage}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 sm:gap-y-9 lg:pt-3"
        >
          {siteConfig.footerLinks.map((column) => (
            <div className={cn('min-w-0', column.title === 'Trust' && 'col-span-2 sm:col-span-1')} key={column.title}>
              <h2 className="text-sm font-semibold tracking-tight text-foreground">{column.title}</h2>
              <ul
                className={cn(
                  'mt-3 grid gap-1 sm:mt-4 sm:gap-1.5',
                  column.title === 'Trust' && 'grid-cols-2 gap-x-6 sm:grid-cols-1 sm:gap-x-0',
                )}
              >
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-7xl p-4 pt-0">
        <div className="flex flex-col gap-4 py-5 text-sm text-foreground/58 sm:flex-row sm:items-center sm:justify-between sm:py-6">
          <p>
            &copy; {copyrightYear} Auxify, a product of{' '}
            <a
              className="rounded-sm font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:ring-3 focus-visible:ring-primary/25 focus-visible:outline-none motion-reduce:transition-none"
              href="https://company.getit.express"
              target="_blank"
              rel="noopener noreferrer"
            >
              GETIT EXPRESS PRIVATE LIMITED
            </a>
            . All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:justify-end">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <FooterLinkItem link={link} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
