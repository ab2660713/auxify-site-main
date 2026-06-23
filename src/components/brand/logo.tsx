import * as React from 'react';

import { cn } from '@/lib/utils';

type SvgProps = Omit<React.ComponentPropsWithoutRef<'svg'>, 'children'>;
type SvgLength = SvgProps['width'];

export type LogoProps = SvgProps & {
  inkColor?: string;
  size?: SvgLength;
};

const Logo = React.forwardRef<SVGSVGElement, LogoProps>(
  (
    {
      className,
      height,
      inkColor = 'var(--brand-ink)',
      role,
      size = '1em',
      width,
      'aria-hidden': ariaHidden,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref,
  ) => {
    const isHidden = ariaHidden === true || ariaHidden === 'true';
    const defaultLabel = 'Auxify Logo';
    const shouldUseDefaultLabel = !isHidden && !ariaLabel && !ariaLabelledBy;

    return (
      <svg
        ref={ref}
        width={width ?? size}
        height={height ?? size}
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('inline-block shrink-0 align-middle', className)}
        role={isHidden ? undefined : (role ?? 'img')}
        aria-hidden={isHidden || undefined}
        aria-label={isHidden ? undefined : (ariaLabel ?? (shouldUseDefaultLabel ? defaultLabel : undefined))}
        aria-labelledby={isHidden ? undefined : ariaLabelledBy}
        {...props}
      >
        {shouldUseDefaultLabel && <title>{defaultLabel}</title>}
        <path
          d="M798.448 380.273C808.459 375.605 820.419 379.918 824.482 390.189C849.272 452.861 854.65 521.718 839.65 587.741C823.169 660.281 783.026 725.278 725.544 772.495C668.061 819.711 596.505 846.465 522.146 848.542C454.466 850.433 387.965 831.783 331.302 795.292C322.016 789.311 320.108 776.742 326.632 767.828L332.702 759.533C339.226 750.62 351.707 748.749 361.056 754.631C408.663 784.586 464.219 799.862 520.742 798.283C583.947 796.517 644.77 773.777 693.63 733.642C742.49 693.508 776.612 638.261 790.62 576.602C803.148 521.462 798.954 463.997 778.816 411.479C774.862 401.165 779.122 389.286 789.132 384.618L798.448 380.273Z"
          fill="#014BAA"
        />
        <path
          d="M257.003 697.266C248.067 703.758 235.504 701.807 229.556 692.5C193.263 635.71 174.846 569.144 176.972 501.472C179.309 427.12 206.312 355.658 253.729 298.34C301.146 241.023 366.283 201.107 438.88 184.88C504.955 170.11 573.793 175.728 636.377 200.737C646.635 204.836 650.905 216.81 646.202 226.805L641.826 236.106C637.123 246.1 625.228 250.318 614.929 246.328C562.481 226.007 505.031 221.613 449.848 233.948C388.14 247.741 332.774 281.669 292.47 330.389C252.165 379.109 229.212 439.852 227.226 503.051C225.45 559.568 240.532 615.177 270.32 662.888C276.17 672.257 274.255 684.732 265.319 691.224L257.003 697.266Z"
          fill="#014BAA"
        />
        <circle cx={733.355} cy={294.651} r={62.8487} transform="rotate(-28 733.355 294.651)" fill="#014BAA" />
        <path
          d="M613.302 403.25C668.531 403.25 713.302 448.022 713.302 503.25V521.126C713.302 576.354 668.531 621.126 613.302 621.126H411.071C355.843 621.126 311.071 576.354 311.071 521.126V503.25C311.071 448.022 355.842 403.25 411.071 403.25H613.302ZM415.819 450.177C381.109 450.177 352.97 478.315 352.97 513.025C352.97 547.736 381.108 575.874 415.819 575.874C450.529 575.874 478.667 547.736 478.667 513.025C478.667 478.315 450.529 450.177 415.819 450.177ZM608.555 450.177C573.845 450.177 545.706 478.315 545.706 513.025C545.706 547.736 573.845 575.874 608.555 575.874C643.265 575.874 671.404 547.736 671.404 513.025C671.404 478.315 643.265 450.177 608.555 450.177Z"
          fill={inkColor}
        />
      </svg>
    );
  },
);

Logo.displayName = 'Logo';

export default Logo;
