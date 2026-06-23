import * as React from 'react';

import { cn } from '@/lib/utils';

import Logo from './logo';
import Wordmark from './wordmark';

type StackedLength = React.CSSProperties['width'];

type LogoStackedStyle = React.CSSProperties & {
  '--logo-stacked-gap': string;
  '--logo-stacked-size': string;
  '--logo-stacked-wordmark-height': string;
};

export type LogoStackedProps = Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> & {
  gap?: StackedLength;
  logoClassName?: string;
  size?: StackedLength;
  wordmarkClassName?: string;
};

const WORDMARK_HEIGHT_RATIO = 0.7;
const DEFAULT_WORDMARK_OFFSET = 'calc(var(--logo-stacked-size) * -0.24)';

function toCssLength(value: StackedLength, fallback: string) {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value ?? fallback;
}

const LogoStacked = React.forwardRef<HTMLSpanElement, LogoStackedProps>(
  (
    {
      className,
      gap = DEFAULT_WORDMARK_OFFSET,
      logoClassName,
      role,
      size = '3rem',
      style,
      wordmarkClassName,
      'aria-hidden': ariaHidden,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref,
  ) => {
    const isHidden = ariaHidden === true || ariaHidden === 'true';
    const stackedSize = toCssLength(size, '3rem');
    const stackedStyle: LogoStackedStyle = {
      '--logo-stacked-gap': toCssLength(gap, DEFAULT_WORDMARK_OFFSET),
      '--logo-stacked-size': stackedSize,
      '--logo-stacked-wordmark-height': `calc(${stackedSize} * ${WORDMARK_HEIGHT_RATIO})`,
      ...style,
    };

    return (
      <span
        ref={ref}
        role={isHidden ? undefined : (role ?? 'img')}
        aria-hidden={isHidden || undefined}
        aria-label={isHidden || ariaLabelledBy ? undefined : (ariaLabel ?? 'Auxify')}
        aria-labelledby={isHidden ? undefined : ariaLabelledBy}
        className={cn('inline-flex max-w-full flex-col items-center justify-center align-middle', className)}
        style={stackedStyle}
        {...props}
      >
        <Logo aria-hidden="true" className={logoClassName} size="var(--logo-stacked-size)" />
        <Wordmark
          aria-hidden="true"
          className={cn(
            'mt-(--logo-stacked-gap) h-(--logo-stacked-wordmark-height) w-auto max-w-full shrink',
            wordmarkClassName,
          )}
        />
      </span>
    );
  },
);

LogoStacked.displayName = 'LogoStacked';

export default LogoStacked;
