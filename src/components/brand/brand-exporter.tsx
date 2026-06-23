'use client';

import * as React from 'react';
import { Download, FileDown, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import Logo from './logo';
import Wordmark from './wordmark';

type BrandAssetId = 'logo' | 'wordmark' | 'lockup' | 'stacked';
type ExportFormat = 'svg' | 'png' | 'jpg' | 'jpeg';
type BackgroundMode = 'none' | 'light' | 'dark';

type Dimensions = {
  height: number;
  width: number;
};

type SvgCanvas = Dimensions & {
  x: number;
  y: number;
};

type BackgroundConfig = {
  allowedFormats: ExportFormat[];
  canvasFill: string | null;
  fileSlug: string;
  id: BackgroundMode;
  inkColor: string;
  label: string;
  previewStyle: React.CSSProperties;
  shortLabel: string;
  swatchStyle: React.CSSProperties;
};

type BrandInkStyle = React.CSSProperties & {
  '--brand-ink': string;
};

type BrandAsset = {
  description: string;
  id: BrandAssetId;
  label: string;
  name: string;
  usage: string;
};

type ExportKey = `${BrandAssetId}:${ExportFormat}`;

const ASSETS: BrandAsset[] = [
  {
    description: 'Square mark for app icons, avatars, and compact placements.',
    id: 'logo',
    label: 'Logo',
    name: 'auxify-logo',
    usage: 'App icons',
  },
  {
    description: 'Horizontal wordmark for headers, docs, and partner surfaces.',
    id: 'wordmark',
    label: 'Wordmark',
    name: 'auxify-wordmark',
    usage: 'Headers',
  },
  {
    description: 'Primary horizontal pairing for navigation and launch assets.',
    id: 'lockup',
    label: 'Logo lockup',
    name: 'auxify-logo-lockup',
    usage: 'Navigation',
  },
  {
    description: 'Stacked composition for square and centered brand layouts.',
    id: 'stacked',
    label: 'Logo stacked',
    name: 'auxify-logo-stacked',
    usage: 'Square layouts',
  },
];

const EXPORT_FORMATS: ExportFormat[] = ['svg', 'png', 'jpg', 'jpeg'];
const TRANSPARENT_FORMATS: ExportFormat[] = ['svg', 'png'];
const MAX_SIZE = 4096;
const MIN_SIZE = 16;
const WORDMARK_ASPECT_RATIO = 818 / 344;
const WORDMARK_HEIGHT_RATIO = 0.7;
const STACKED_WORDMARK_OFFSET_RATIO = -0.24;
const LIGHT_BACKGROUND = '#ffffff';
const DARK_BACKGROUND = '#09090b';
const LIGHT_INK = '#000000';
const DARK_INK = '#ffffff';

const TRANSPARENT_PREVIEW_STYLE: React.CSSProperties = {
  backgroundColor: LIGHT_BACKGROUND,
  backgroundImage:
    'linear-gradient(45deg, #e4e4e7 25%, transparent 25%), linear-gradient(-45deg, #e4e4e7 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e4e4e7 75%), linear-gradient(-45deg, transparent 75%, #e4e4e7 75%)',
  backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0',
  backgroundSize: '24px 24px',
};

const BACKGROUND_OPTIONS: BackgroundConfig[] = [
  {
    allowedFormats: TRANSPARENT_FORMATS,
    canvasFill: null,
    fileSlug: 'transparent',
    id: 'none',
    inkColor: LIGHT_INK,
    label: 'No background',
    previewStyle: TRANSPARENT_PREVIEW_STYLE,
    shortLabel: 'None',
    swatchStyle: TRANSPARENT_PREVIEW_STYLE,
  },
  {
    allowedFormats: EXPORT_FORMATS,
    canvasFill: LIGHT_BACKGROUND,
    fileSlug: 'light-bg',
    id: 'light',
    inkColor: LIGHT_INK,
    label: 'Light',
    previewStyle: { backgroundColor: LIGHT_BACKGROUND },
    shortLabel: 'Light',
    swatchStyle: { backgroundColor: LIGHT_BACKGROUND },
  },
  {
    allowedFormats: EXPORT_FORMATS,
    canvasFill: DARK_BACKGROUND,
    fileSlug: 'dark-bg',
    id: 'dark',
    inkColor: DARK_INK,
    label: 'Dark',
    previewStyle: { backgroundColor: DARK_BACKGROUND },
    shortLabel: 'Dark',
    swatchStyle: { backgroundColor: DARK_BACKGROUND },
  },
];

function clampSize(size: number) {
  return Math.min(MAX_SIZE, Math.max(MIN_SIZE, size));
}

function getSizeFromValue(value: string) {
  const nextSize = Number(value);

  if (!Number.isFinite(nextSize)) {
    return null;
  }

  return roundDimension(clampSize(nextSize));
}

function roundDimension(value: number) {
  return Math.max(1, Math.ceil(value));
}

function getAssetDimensions(assetId: BrandAssetId, size: number): Dimensions {
  if (assetId === 'logo') {
    return { height: size, width: size };
  }

  if (assetId === 'wordmark') {
    return {
      height: size,
      width: roundDimension(size * WORDMARK_ASPECT_RATIO),
    };
  }

  const wordmarkHeight = size * WORDMARK_HEIGHT_RATIO;
  const wordmarkWidth = wordmarkHeight * WORDMARK_ASPECT_RATIO;

  if (assetId === 'lockup') {
    return {
      height: size,
      width: roundDimension(size + wordmarkWidth),
    };
  }

  return {
    height: roundDimension(size + size * STACKED_WORDMARK_OFFSET_RATIO + wordmarkHeight),
    width: roundDimension(Math.max(size, wordmarkWidth)),
  };
}

function getExportKey(assetId: BrandAssetId, format: ExportFormat): ExportKey {
  return `${assetId}:${format}`;
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getBrandInkStyle(background: BackgroundConfig): BrandInkStyle {
  return { '--brand-ink': background.inkColor };
}

function getReadableFileSlug(slug: string) {
  return slug.replace('-', ' ');
}

function getFormatSummary(background: BackgroundConfig) {
  return background.allowedFormats.map((format) => format.toUpperCase()).join(', ');
}

function getSvgCanvas(svg: SVGSVGElement, dimensions: Dimensions): SvgCanvas {
  const viewBox = svg.getAttribute('viewBox')?.trim();

  if (!viewBox) {
    return { height: dimensions.height, width: dimensions.width, x: 0, y: 0 };
  }

  const [x, y, width, height] = viewBox.split(/[\s,]+/).map(Number);

  if ([x, y, width, height].every(Number.isFinite) && width > 0 && height > 0) {
    return { height, width, x, y };
  }

  return { height: dimensions.height, width: dimensions.width, x: 0, y: 0 };
}

function addSvgBackground(svg: SVGSVGElement, dimensions: Dimensions, fill: string) {
  const canvas = getSvgCanvas(svg, dimensions);
  const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

  background.setAttribute('x', canvas.x.toString());
  background.setAttribute('y', canvas.y.toString());
  background.setAttribute('width', canvas.width.toString());
  background.setAttribute('height', canvas.height.toString());
  background.setAttribute('fill', fill);

  const firstElement = svg.firstElementChild;

  if (firstElement?.tagName.toLowerCase() === 'title') {
    firstElement.after(background);
    return;
  }

  svg.prepend(background);
}

function inlineComputedPaints(source: SVGSVGElement, clone: SVGSVGElement) {
  const sourceElements = [source, ...Array.from(source.querySelectorAll<SVGElement>('*'))];
  const cloneElements = [clone, ...Array.from(clone.querySelectorAll<SVGElement>('*'))];

  sourceElements.forEach((sourceElement, index) => {
    const cloneElement = cloneElements[index];

    if (!cloneElement) {
      return;
    }

    const fill = sourceElement.getAttribute('fill');
    const stroke = sourceElement.getAttribute('stroke');

    if (fill?.includes('var(')) {
      cloneElement.setAttribute('fill', getComputedStyle(sourceElement).fill);
    }

    if (stroke?.includes('var(')) {
      cloneElement.setAttribute('stroke', getComputedStyle(sourceElement).stroke);
    }
  });
}

function getSvgMarkup(svg: SVGSVGElement, dimensions: Dimensions, background: BackgroundConfig) {
  const clone = svg.cloneNode(true) as SVGSVGElement;

  inlineComputedPaints(svg, clone);

  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('version', '1.1');
  clone.setAttribute('width', dimensions.width.toString());
  clone.setAttribute('height', dimensions.height.toString());

  if (background.canvasFill) {
    addSvgBackground(clone, dimensions, background.canvasFill);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`;
}

async function rasterizeSvg(
  svgMarkup: string,
  dimensions: Dimensions,
  format: Exclude<ExportFormat, 'svg'>,
  background: BackgroundConfig,
) {
  const svgBlob = new Blob([svgMarkup], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const nextImage = new Image();

      nextImage.onload = () => resolve(nextImage);
      nextImage.onerror = () => reject(new Error('Could not render SVG.'));
      nextImage.src = svgUrl;
    });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas is not available in this browser.');
    }

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    if (background.canvasFill) {
      context.fillStyle = background.canvasFill;
      context.fillRect(0, 0, dimensions.width, dimensions.height);
    }

    context.drawImage(image, 0, 0, dimensions.width, dimensions.height);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Could not export image.'));
          }
        },
        format === 'png' ? 'image/png' : 'image/jpeg',
        0.95,
      );
    });
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}

function ExportArtwork({
  assetId,
  dimensions,
  background,
  size,
  svgRef,
}: {
  assetId: BrandAssetId;
  dimensions: Dimensions;
  background: BackgroundConfig;
  size: number;
  svgRef: (node: SVGSVGElement | null) => void;
}) {
  const brandInkStyle = getBrandInkStyle(background);

  if (assetId === 'logo') {
    return <Logo ref={svgRef} width={dimensions.width} height={dimensions.height} style={brandInkStyle} />;
  }

  if (assetId === 'wordmark') {
    return <Wordmark ref={svgRef} width={dimensions.width} height={dimensions.height} style={brandInkStyle} />;
  }

  const logoSize = size;
  const wordmarkHeight = roundDimension(logoSize * WORDMARK_HEIGHT_RATIO);
  const wordmarkWidth = roundDimension(wordmarkHeight * WORDMARK_ASPECT_RATIO);

  if (assetId === 'lockup') {
    return (
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        style={brandInkStyle}
      >
        <title>Auxify Logo Lockup</title>
        <Logo aria-hidden="true" x={0} y={0} width={logoSize} height={logoSize} />
        <Wordmark
          aria-hidden="true"
          x={logoSize}
          y={(dimensions.height - wordmarkHeight) / 2}
          width={wordmarkWidth}
          height={wordmarkHeight}
        />
      </svg>
    );
  }

  const wordmarkTop = logoSize + logoSize * STACKED_WORDMARK_OFFSET_RATIO;

  return (
    <svg
      ref={svgRef}
      width={dimensions.width}
      height={dimensions.height}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      style={brandInkStyle}
    >
      <title>Auxify Logo Stacked</title>
      <Logo aria-hidden="true" x={(dimensions.width - logoSize) / 2} y={0} width={logoSize} height={logoSize} />
      <Wordmark
        aria-hidden="true"
        x={(dimensions.width - wordmarkWidth) / 2}
        y={wordmarkTop}
        width={wordmarkWidth}
        height={wordmarkHeight}
      />
    </svg>
  );
}

export default function BrandExporter() {
  const [backgroundMode, setBackgroundMode] = React.useState<BackgroundMode>('none');
  const [pendingExport, setPendingExport] = React.useState<ExportKey | null>(null);
  const [sizeValue, setSizeValue] = React.useState('512');
  const [status, setStatus] = React.useState<string | null>(null);
  const svgRefs = React.useRef<Record<BrandAssetId, SVGSVGElement | null>>({
    lockup: null,
    logo: null,
    stacked: null,
    wordmark: null,
  });
  const parsedSize = getSizeFromValue(sizeValue);
  const size = parsedSize ?? 512;
  const background = BACKGROUND_OPTIONS.find((option) => option.id === backgroundMode) ?? BACKGROUND_OPTIONS[0];
  const isSizeInvalid = sizeValue.trim().length > 0 && parsedSize === null;

  function handleSizeBlur() {
    setSizeValue(size.toString());
  }

  function handleBackgroundChange(nextMode: BackgroundMode) {
    setBackgroundMode(nextMode);
    setStatus(null);
  }

  async function handleDownload(asset: BrandAsset, format: ExportFormat) {
    const exportKey = getExportKey(asset.id, format);

    if (pendingExport) {
      return;
    }

    const svg = svgRefs.current[asset.id];

    if (!svg) {
      setStatus('The selected asset is not ready yet.');
      return;
    }

    if (!background.allowedFormats.includes(format)) {
      setStatus(`${format.toUpperCase()} exports need a solid background.`);
      return;
    }

    const dimensions = getAssetDimensions(asset.id, size);
    const svgMarkup = getSvgMarkup(svg, dimensions, background);
    const fileName = `${asset.name}-${background.fileSlug}-${dimensions.width}x${dimensions.height}.${format}`;

    setPendingExport(exportKey);
    setStatus(`Preparing ${asset.label} ${format.toUpperCase()} export.`);

    try {
      if (format === 'svg') {
        downloadBlob(new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' }), fileName);
        setStatus(`Downloaded ${fileName}`);
        return;
      }

      const blob = await rasterizeSvg(svgMarkup, dimensions, format, background);
      downloadBlob(blob, fileName);
      setStatus(`Downloaded ${fileName}`);
    } catch (downloadError) {
      setStatus(downloadError instanceof Error ? downloadError.message : 'Could not export image.');
    } finally {
      setPendingExport(null);
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl p-4 flex flex-col gap-8">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">Export brand assets</h1>
          <p className="mt-3 text-balance text-sm leading-6 text-muted-foreground sm:text-base">
            Prepare exact logo files with the right size, background, and format for every product and brand surface.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-sm lg:max-w-xl">
          <label className="grid gap-2 px-2 pt-1 text-sm font-medium text-foreground sm:grid-cols-[7rem_1fr] sm:items-center sm:pt-2">
            <span>Size</span>
            <input
              type="number"
              inputMode="numeric"
              min={MIN_SIZE}
              max={MAX_SIZE}
              step={1}
              value={sizeValue}
              aria-invalid={isSizeInvalid || undefined}
              onBlur={handleSizeBlur}
              onChange={(event) => setSizeValue(event.target.value)}
              className="h-11 rounded-lg border border-input bg-background px-3 text-sm font-medium text-foreground outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20 aria-invalid:border-destructive aria-invalid:ring-destructive/20 sm:h-9"
            />
          </label>

          <fieldset className="grid gap-2 px-2 pb-2 text-sm font-medium text-foreground sm:grid-cols-[7rem_1fr] sm:items-center">
            <legend className="float-left w-full sm:w-auto">Background</legend>
            <div className="grid min-w-0 grid-cols-3 gap-1 rounded-xl bg-muted/70 p-1 ring-1 ring-border/60">
              {BACKGROUND_OPTIONS.map((option) => {
                const isSelected = option.id === background.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-label={option.label}
                    aria-pressed={isSelected}
                    onClick={() => handleBackgroundChange(option.id)}
                    className={cn(
                      'inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-md px-2 text-xs font-medium transition-colors sm:h-8',
                      isSelected
                        ? 'bg-background text-foreground shadow-xs'
                        : 'text-muted-foreground hover:bg-background/70 hover:text-foreground',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="size-3.5 shrink-0 rounded-full border border-zinc-300 dark:border-white/30"
                      style={option.swatchStyle}
                    />
                    <span className="truncate">{option.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      </header>

      {status && (
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground"
        >
          {status}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {ASSETS.map((asset) => {
          const dimensions = getAssetDimensions(asset.id, size);

          return (
            <article
              key={asset.id}
              className="grid grid-cols-1 gap-3 rounded-2xl border border-border/70 bg-card p-3 shadow-sm lg:grid-cols-[minmax(13rem,15rem)_minmax(0,1fr)_minmax(15rem,17rem)]"
            >
              <div className="min-w-0 overflow-hidden rounded-xl border border-border/70 bg-background p-2">
                <div className="mb-2 px-1 text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  Preview
                </div>
                <div
                  className="flex min-h-40 w-full items-center justify-center overflow-auto rounded-lg p-6 [&>svg]:h-auto [&>svg]:max-h-28 [&>svg]:max-w-full"
                  style={background.previewStyle}
                >
                  <ExportArtwork
                    assetId={asset.id}
                    background={background}
                    dimensions={dimensions}
                    size={size}
                    svgRef={(node) => {
                      svgRefs.current[asset.id] = node;
                    }}
                  />
                </div>
              </div>

              <div className="min-w-0 rounded-xl border border-border/70 bg-background p-5">
                <div className="mb-4 text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  Asset
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold text-card-foreground">{asset.label}</h2>
                  <span className="rounded-full border border-border/70 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {asset.usage}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {getReadableFileSlug(background.fileSlug)}
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{asset.description}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="font-mono">
                    {dimensions.width} x {dimensions.height}px
                  </span>
                  <span>{getFormatSummary(background)}</span>
                </div>
              </div>

              <div className="min-w-0 rounded-xl border border-border/70 bg-background p-5 lg:flex lg:items-center lg:justify-end">
                <div className="w-full">
                  <div className="mb-4 flex items-center gap-2 text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase lg:justify-end">
                    <FileDown aria-hidden="true" className="size-3.5" />
                    Exports
                  </div>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {background.allowedFormats.map((format) => {
                      const exportKey = getExportKey(asset.id, format);
                      const isPending = pendingExport === exportKey;

                      return (
                        <Button
                          key={format}
                          type="button"
                          variant="outline"
                          size="lg"
                          disabled={pendingExport !== null}
                          aria-label={`Download ${asset.label} as ${format.toUpperCase()}`}
                          onClick={() => void handleDownload(asset, format)}
                          className="h-11 min-w-24 rounded-full border-border/70 bg-background px-4 text-xs font-medium uppercase hover:bg-muted/70 sm:h-9 sm:min-w-20 dark:bg-background/40 dark:hover:bg-muted/50"
                        >
                          {isPending ? (
                            <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" />
                          ) : (
                            <Download aria-hidden="true" className="size-3.5" />
                          )}
                          {format}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
