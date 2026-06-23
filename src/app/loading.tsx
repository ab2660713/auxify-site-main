import { LogoLoader } from '@/components/brand/logo-loader';

export default function Loading() {
  return (
    <main aria-busy="true" className="min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl p-4 grid min-h-screen place-items-center">
        <LogoLoader label="Loading Auxify" />
      </div>
    </main>
  );
}
