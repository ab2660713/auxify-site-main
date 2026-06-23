import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen w-full bg-slate-50 text-zinc-950">
      <div className="mx-auto w-full max-w-7xl p-4 grid min-h-screen place-items-center">
        <div className="w-full max-w-xl rounded-lg border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/60">
          <p className="text-sm font-semibold uppercase text-emerald-700">404</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal">Page not found.</h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            The page you are looking for is not published on the Auxify public site.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
