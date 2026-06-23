FROM node:24.15.0-alpine AS deps

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.1.2 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM deps AS builder

WORKDIR /app
ARG NEXT_PUBLIC_BASE_URL=https://auxify.live
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
COPY . .
RUN mkdir -p public && pnpm build

FROM node:24.15.0-alpine AS runner

WORKDIR /app
ARG NEXT_PUBLIC_BASE_URL=https://auxify.live
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD node -e "const http = require('node:http'); const port = process.env.PORT || 3000; const req = http.get({ host: '127.0.0.1', port, path: '/api/health', timeout: 2000 }, (res) => process.exit(res.statusCode === 200 ? 0 : 1)); req.on('error', () => process.exit(1)); req.on('timeout', () => req.destroy());"

CMD ["node", "server.js"]
