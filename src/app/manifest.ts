import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Auxify - AI-Powered Workforce layer for Customer Operations',
    short_name: 'Auxify',
    description: 'AI-Powered Workforce layer for Customer Operations',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    categories: ['business', 'productivity'],
    dir: 'ltr',
    lang: 'en',
    background_color: '#f8fafc',
    theme_color: '#014BAA',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
        purpose: 'any',
      },
      {
        src: '/icon',
        sizes: '1024x1024',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
