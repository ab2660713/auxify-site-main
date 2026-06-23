# Auxify Site

Public website, pricing, landing pages, blog, and SEO pages for Auxify at `auxify.live`. Onboarded-user product screens belong in `auxify-console/` at `app.auxify.live`.

## Requirements

- Node.js 24.15.0 for local development. Node 24 or newer is enforced by `package.json` and `.npmrc`.
- pnpm 11.1.2 for local development. pnpm 11 or newer is enforced by `package.json` and `.npmrc`.

Use Corepack to activate the pinned package manager:

```bash
corepack enable
corepack prepare pnpm@11.1.2 --activate
```

This repo includes `.node-version` and `.nvmrc` so version managers can select Node 24.15.0 automatically.

## Setup

```bash
pnpm install
```

For CI or clean verification, use the lockfile exactly:

```bash
pnpm install --frozen-lockfile
```

## Development

```bash
pnpm dev
```

The site runs on `http://localhost:3000` by default. When running it beside other Auxify apps, use another port:

```bash
pnpm dev -- -p 3002
```

## Environment

Copy `.env.example` to `.env.local` for local development. For production containers, pass public build-time values during `docker build` and runtime values through the container service.

- `PORT` is the runtime HTTP port inside the container, normally `3000`.
- `HOSTNAME` is the runtime bind host, normally `0.0.0.0` in containers.
- `NEXT_PUBLIC_BASE_URL` is the build-time public website origin, normally `https://auxify.live`. Rebuild the image if this value changes because Next.js inlines `NEXT_PUBLIC_*` values during `next build`.

## Health

The container health endpoint is available at:

```text
GET /api/health
```

It returns `200` with `{ "status": "ok" }` when the Next.js server is responsive.

Next.js Route Handlers in this repo run on the Node.js runtime by default for custom container deployment. Do not opt into Edge Runtime unless the handler only uses Web-standard APIs and the runtime trade-off is intentional.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm build
pnpm audit
```

Use `pnpm format` to apply Prettier formatting.

## Production

```bash
pnpm build
pnpm start
```

The production start script runs the generated Next.js standalone server. Run `pnpm build` before `pnpm start`.

## Container

Build and run the production container locally:

```bash
docker build \
	--build-arg NEXT_PUBLIC_BASE_URL=https://auxify.live \
	-t auxify-site .
docker run --rm -p 3000:3000 --env-file .env.local auxify-site
```

The image runs the Next.js standalone server on `0.0.0.0:3000`, disables the framework powered-by header, applies baseline security/CSP headers, sends `X-Accel-Buffering: no` for reverse proxies that support streaming, and includes a Docker `HEALTHCHECK` against `/api/health`. Put a reverse proxy or load balancer in front of the container for TLS, malformed request handling, payload limits, rate limiting, and slow connection protection.

## SEO

The public site owns indexable metadata, canonical URLs, robots, and sitemap output. `NEXT_PUBLIC_BASE_URL` is used to generate absolute metadata URLs, `/robots.txt`, and `/sitemap.xml`.

## Repository Boundary

Public marketing website work belongs in this repo. Backend API work belongs in `auxify-core/`, SaaS dashboard work belongs in `auxify-console/`, and documentation or interface contracts belong in `auxify-docs/`.
