import type { ReactNode } from 'react';
import Footer from '@/components/navigation/footer/footer';
import Header from '@/components/navigation/header/header';

export default function LegalLayout({ children }: { children: ReactNode }) {
  const copyrightYear = new Date().getUTCFullYear();

  return (
    <main className="min-h-screen w-full" id="legal-content">
      <Header />
      {children}
      <Footer copyrightYear={copyrightYear} />
    </main>
  );
}
