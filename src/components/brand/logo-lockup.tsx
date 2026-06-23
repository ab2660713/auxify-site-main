import * as React from 'react';

import { cn } from '@/lib/utils';

import Logo from './logo';
import Wordmark from './wordmark';

type LockupLength = React.CSSProperties['width'];

type LogoLockupStyle = React.CSSProperties & {
  '--logo-lockup-gap': string;
  '--logo-lockup-size': string;
  '--logo-lockup-wordmark-height': string;
};

export type LogoLockupProps = Omit<React.ComponentPropsWithoutRef<'span'>, 'children'> & {
  gap?: LockupLength;
  logoClassName?: string;
  size?: LockupLength;
  wordmarkClassName?: string;
};

const WORDMARK_HEIGHT_RATIO = 0.7;

function toCssLength(value: LockupLength, fallback: string) {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value ?? fallback;
}

const LogoLockup = React.forwardRef<HTMLSpanElement, LogoLockupProps>(
  (
    {
      className,
      gap = 0,
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
    const lockupSize = toCssLength(size, '3rem');
    const lockupStyle: LogoLockupStyle = {
      '--logo-lockup-gap': toCssLength(gap, '0px'),
      '--logo-lockup-size': lockupSize,
      '--logo-lockup-wordmark-height': `calc(${lockupSize} * ${WORDMARK_HEIGHT_RATIO})`,
      ...style,
    };

    return (
      <span
        ref={ref}
        role={isHidden ? undefined : (role ?? 'img')}
        aria-hidden={isHidden || undefined}
        aria-label={isHidden || ariaLabelledBy ? undefined : (ariaLabel ?? 'Auxify')}
        aria-labelledby={isHidden ? undefined : ariaLabelledBy}
        className={cn(
          'inline-flex max-w-full items-center justify-center gap-(--logo-lockup-gap) align-middle',
          className,
        )}
        style={lockupStyle}
        {...props}
      >
        <Logo aria-hidden="true" className={logoClassName} size="var(--logo-lockup-size)" />
        <Wordmark
          aria-hidden="true"
          className={cn('h-(--logo-lockup-wordmark-height) w-auto max-w-full shrink', wordmarkClassName)}
        />
      </span>
    );
  },
);

LogoLockup.displayName = 'LogoLockup';

export default LogoLockup;
