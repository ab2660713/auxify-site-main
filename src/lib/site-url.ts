export const siteUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://auxify.live');

export function absoluteUrl(path = '/'): string {
  return new URL(path, siteUrl).toString();
}
