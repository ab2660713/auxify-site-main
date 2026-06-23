'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';

import LogoLockup from '@/components/brand/logo-lockup';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigationItems = [
  { label: 'Platform', href: '/platform' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const consoleUrl = 'https://app.auxify.live';
const desktopNavigationQuery = '(min-width: 960px)';
const floatingEasing = 'ease-[cubic-bezier(0.22,1,0.36,1)]';
const focusableHeaderSelector = 'a[href], button:not([disabled])';
const desktopCtaClassName = cn(
  buttonVariants({ size: 'sm' }),
  'group/cta relative h-9 rounded-full bg-[#1B3FFF] px-5 text-[0.82rem] font-semibold text-white shadow-md shadow-[#1B3FFF]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3B5EFF] hover:shadow-lg hover:shadow-[#1B3FFF]/40 active:translate-y-0 active:shadow-sm focus-visible:ring-2 focus-visible:ring-[#1B3FFF]/50 focus-visible:ring-offset-2',
);
const mobileCtaClassName = cn(
  buttonVariants({ size: 'lg' }),
  'relative h-12 w-full rounded-full bg-[#1B3FFF] text-base font-semibold text-white shadow-lg shadow-[#1B3FFF]/30 transition-all duration-300 hover:bg-[#3B5EFF] hover:shadow-xl hover:shadow-[#1B3FFF]/40 active:shadow-sm focus-visible:ring-2 focus-visible:ring-[#1B3FFF]/50 focus-visible:ring-offset-2',
);

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const isScrolledRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isFloating = isScrolled || isMobileMenuOpen;

  useEffect(() => {
    let isActive = true;

    const handleScroll = () => {
      if (!isActive) {
        return;
      }

      const nextIsScrolled = window.scrollY > 20 || (document.scrollingElement?.scrollTop ?? 0) > 20;

      if (nextIsScrolled === isScrolledRef.current) {
        return;
      }

      isScrolledRef.current = nextIsScrolled;
      setIsScrolled(nextIsScrolled);
    };

    const scrollTargets: EventTarget[] = [window, document];

    if (document.scrollingElement) {
      scrollTargets.push(document.scrollingElement);
    }

    handleScroll();
    scrollTargets.forEach((target) => target.addEventListener('scroll', handleScroll, { passive: true }));

    return () => {
      isActive = false;
      scrollTargets.forEach((target) => target.removeEventListener('scroll', handleScroll));
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'contain';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const desktopNavigation = window.matchMedia(desktopNavigationQuery);
    let isActive = true;

    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (isActive && event.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    desktopNavigation.addEventListener('change', closeMenuOnDesktop);

    return () => {
      isActive = false;
      desktopNavigation.removeEventListener('change', closeMenuOnDesktop);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const getFocusableElements = () => {
      const header = headerRef.current;

      if (!header) {
        return [];
      }

      return Array.from(header.querySelectorAll<HTMLElement>(focusableHeaderSelector)).filter((element) => {
        const style = window.getComputedStyle(element);

        return element.tabIndex >= 0 && style.display !== 'none' && style.visibility !== 'hidden';
      });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!headerRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    let isActive = true;
    const handleActiveKeyDown = (event: KeyboardEvent) => {
      if (isActive) {
        handleKeyDown(event);
      }
    };

    document.addEventListener('keydown', handleActiveKeyDown);

    return () => {
      isActive = false;
      document.removeEventListener('keydown', handleActiveKeyDown);
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header ref={headerRef} className="fixed left-0 right-0 top-0 z-50 px-4">
        <nav
          aria-label="Primary navigation"
          style={{
            transform: isFloating ? 'translate3d(0, 1rem, 0)' : 'translate3d(0, 0, 0)',
          }}
          className={cn(
            'relative z-50 w-full overflow-visible transition-transform duration-500 will-change-transform motion-reduce:transition-none',
            floatingEasing,
          )}
        >
          <div
            aria-hidden="true"
            style={{
              borderRadius: isFloating ? '1rem' : '0px',
              left: isFloating ? 'max(0px, calc((100% - 80rem) / 2))' : '0px',
              right: isFloating ? 'max(0px, calc((100% - 80rem) / 2))' : '0px',
            }}
            className={cn(
              'pointer-events-none absolute inset-y-0 z-0 ring-1 ring-inset transition-[left,right,border-radius,background-color,box-shadow,backdrop-filter] duration-500 motion-reduce:transition-none',
              floatingEasing,
              isFloating
                ? 'bg-background/86 shadow-[0_22px_70px_-48px_rgba(2,6,23,0.55)] ring-border/70 backdrop-blur-xl dark:bg-background/82 dark:ring-white/10'
                : 'bg-background/72 ring-transparent backdrop-blur-md dark:bg-background/70',
            )}
          />

          <div className="relative z-10 mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-2">
            <Link
              href="/"
              aria-label="Auxify home"
              onClick={closeMobileMenu}
              className={cn(
                '-ml-1 flex min-w-0 items-center rounded-md px-1 py-1 transition-opacity duration-300 hover:opacity-85 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/25 motion-reduce:transition-none',
                isFloating ? 'opacity-95' : 'opacity-100',
              )}
            >
              <LogoLockup size="2.2rem" className="transition-opacity duration-300 sm:max-w-none" />
            </Link>

            <div className="hidden items-center gap-6 min-[960px]:flex lg:gap-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group/nav-link relative rounded-full px-1.5 py-2 text-sm font-medium text-foreground/68 transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/25',
                    isFloating ? 'text-foreground/72' : 'text-foreground/64',
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover/nav-link:w-full',
                      isFloating ? 'bg-primary' : 'bg-foreground',
                    )}
                  />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center min-[960px]:flex">
                <Link href={consoleUrl} className={desktopCtaClassName}>
                  <span className="relative z-10">Get started</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="relative z-10 transition-transform group-hover/cta:translate-x-0.5"
                  />
                </Link>
              </div>

              <button
                type="button"
                aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="site-mobile-navigation"
                onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
                className={cn(
                  'relative -mr-1 grid size-11 place-items-center text-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/25 motion-reduce:transition-none min-[960px]:hidden',
                  isFloating ? 'text-foreground' : 'text-foreground/85',
                )}
              >
                <Menu
                  aria-hidden="true"
                  className={cn(
                    'absolute size-5 transition-all duration-300 ease-out motion-reduce:transition-none',
                    isMobileMenuOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100',
                  )}
                />
                <X
                  aria-hidden="true"
                  className={cn(
                    'absolute size-5 transition-all duration-300 ease-out motion-reduce:transition-none',
                    isMobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0',
                  )}
                />
              </button>
            </div>
          </div>
        </nav>

        <div
          id="site-mobile-navigation"
          aria-hidden={!isMobileMenuOpen}
          inert={isMobileMenuOpen ? undefined : true}
          className={cn(
            'fixed inset-0 z-40 bg-background transition-all duration-500 motion-reduce:transition-none min-[960px]:hidden',
            isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-6 pb-8 pt-24 sm:px-8">
            <div className="flex flex-1 flex-col justify-center gap-6">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  tabIndex={isMobileMenuOpen ? undefined : -1}
                  className={cn(
                    'group/mobile-link relative w-fit rounded-md px-1 text-4xl font-semibold tracking-tight text-foreground transition-all duration-500 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/25 motion-reduce:transition-none sm:text-5xl',
                    isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                  )}
                  style={{ transitionDelay: isMobileMenuOpen ? `${index * 75}ms` : '0ms' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div
              className={cn(
                'border-t border-foreground/10 pt-6 transition-all duration-500 motion-reduce:transition-none sm:pt-8',
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
              )}
              style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}
            >
              <Link
                href={consoleUrl}
                onClick={closeMobileMenu}
                tabIndex={isMobileMenuOpen ? undefined : -1}
                className={mobileCtaClassName}
              >
                <span className="relative z-10">Get started</span>
                <ArrowRight aria-hidden="true" className="relative z-10" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div aria-hidden="true" className="h-14" />
    </>
  );
}
