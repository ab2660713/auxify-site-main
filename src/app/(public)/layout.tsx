import Footer from '@/components/navigation/footer/footer';
import Header from '@/components/navigation/header/header';
import type { ReactNode } from 'react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  const copyrightYear = new Date().getUTCFullYear();

  return (
    <main className="min-h-screen w-full" id="public-content">
      <Header />
      {children}
      <Footer copyrightYear={copyrightYear} />
    </main>
  );
}
