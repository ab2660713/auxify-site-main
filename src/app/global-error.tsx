'use client';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <main className="min-h-screen w-full bg-slate-50 text-zinc-950">
          <div className="mx-auto w-full max-w-7xl p-4 grid min-h-screen place-items-center">
            <div className="w-full max-w-xl rounded-lg border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/60">
              <p className="text-sm font-semibold uppercase text-emerald-700">Site unavailable</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-normal">Auxify hit a recovery boundary.</h1>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Retry the request. If it keeps failing, use the reference code when reporting the issue.
              </p>
              {error.digest ? <p className="mt-4 text-sm text-zinc-500">Reference: {error.digest}</p> : null}
              <button
                type="button"
                onClick={reset}
                className="mt-6 rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Try again
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
