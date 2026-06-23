import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/theme/theme-provider';
import { absoluteUrl, siteUrl } from '../lib/site-url';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: 'Auxify',
  title: {
    default: 'Auxify | AI-Powered Workforce layer for Customer Operations',
    template: '%s | Auxify',
  },
  description: 'AI-Powered Workforce layer for Customer Operations',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/'),
    siteName: 'Auxify',
    title: 'Auxify | AI-Powered Workforce layer for Customer Operations',
    description: 'AI-Powered Workforce layer for Customer Operations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auxify | AI-Powered Workforce layer for Customer Operations',
    description: 'AI-Powered Workforce layer for Customer Operations',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
