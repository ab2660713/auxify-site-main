const baseUrl = normalizeOrigin(process.env.AUXIFY_SITE_BASE_URL ?? 'http://127.0.0.1:3000', 'AUXIFY_SITE_BASE_URL');
const paths = normalizePaths(
  process.env.AUXIFY_STRESS_PATHS ?? '/api/health,/,/contact,/privacy,/terms,/robots.txt,/sitemap.xml',
  'AUXIFY_STRESS_PATHS',
);
const durationMs = normalizePositiveInteger(
  process.env.AUXIFY_STRESS_DURATION_MS ?? '60000',
  'AUXIFY_STRESS_DURATION_MS',
);
const concurrency = normalizePositiveInteger(
  process.env.AUXIFY_STRESS_CONCURRENCY ?? '50',
  'AUXIFY_STRESS_CONCURRENCY',
);
const timeoutMs = normalizePositiveInteger(process.env.AUXIFY_STRESS_TIMEOUT_MS ?? '5000', 'AUXIFY_STRESS_TIMEOUT_MS');
const maxP95Ms = normalizePositiveInteger(process.env.AUXIFY_STRESS_MAX_P95_MS ?? '750', 'AUXIFY_STRESS_MAX_P95_MS');
const maxP99Ms = normalizePositiveInteger(process.env.AUXIFY_STRESS_MAX_P99_MS ?? '1500', 'AUXIFY_STRESS_MAX_P99_MS');
const maxErrorRate = normalizeRate(process.env.AUXIFY_STRESS_MAX_ERROR_RATE ?? '0.01', 'AUXIFY_STRESS_MAX_ERROR_RATE');
const requestIdPrefix = process.env.AUXIFY_STRESS_REQUEST_ID_PREFIX ?? 'auxify-site-stress';
const commonHeaders = buildHeaders('AUXIFY_STRESS');

const deadline = Date.now() + durationMs;
const latencies = [];
const statusCounts = new Map();
const errorCounts = new Map();
const pathStats = new Map(paths.map((path) => [path, { failures: 0, successes: 0 }]));
let failures = 0;
let requestSequence = 0;
let successes = 0;

await Promise.all(Array.from({ length: concurrency }, (_, workerIndex) => worker(workerIndex)));

const total = successes + failures;
const p50 = percentile(latencies, 0.5);
const p95 = percentile(latencies, 0.95);
const p99 = percentile(latencies, 0.99);
const errorRate = total === 0 ? 1 : failures / total;
const requestsPerSecond = total / (durationMs / 1000);

console.log(
  JSON.stringify(
    {
      baseUrl,
      concurrency,
      durationMs,
      errorCounts: objectFromCounts(errorCounts),
      errorRate,
      failures,
      maxErrorRate,
      maxP95Ms,
      maxP99Ms,
      p50,
      p95,
      p99,
      paths: [...pathStats.entries()].map(([path, stats]) => ({ path, ...stats })),
      requestsPerSecond: Math.round(requestsPerSecond * 100) / 100,
      statusCounts: objectFromCounts(statusCounts),
      successes,
      total,
    },
    null,
    2,
  ),
);

if (total === 0) {
  throw new Error('Stress load produced no requests.');
}

if (errorRate > maxErrorRate) {
  throw new Error(`Stress load error rate ${errorRate} exceeded ${maxErrorRate}.`);
}

if (p95 > maxP95Ms) {
  throw new Error(`Stress load p95 ${p95}ms exceeded ${maxP95Ms}ms.`);
}

if (p99 > maxP99Ms) {
  throw new Error(`Stress load p99 ${p99}ms exceeded ${maxP99Ms}ms.`);
}

async function worker(workerIndex) {
  while (Date.now() < deadline) {
    const sequence = requestSequence;
    requestSequence += 1;
    const path = paths[(sequence + workerIndex) % paths.length];
    const startedAt = performance.now();

    try {
      const response = await fetch(new URL(path, baseUrl), {
        headers: {
          ...commonHeaders,
          'x-request-id': `${requestIdPrefix}-${sequence}`,
        },
        redirect: 'manual',
        signal: AbortSignal.timeout(timeoutMs),
      });
      const elapsedMs = performance.now() - startedAt;

      statusCounts.set(response.status, (statusCounts.get(response.status) ?? 0) + 1);
      await response.arrayBuffer().catch(() => undefined);

      if (response.status >= 200 && response.status < 400) {
        successes += 1;
        latencies.push(elapsedMs);
        pathStats.get(path).successes += 1;
      } else {
        failures += 1;
        pathStats.get(path).failures += 1;
      }
    } catch (error) {
      failures += 1;
      pathStats.get(path).failures += 1;
      const errorName = error instanceof Error ? error.name : 'UnknownError';
      errorCounts.set(errorName, (errorCounts.get(errorName) ?? 0) + 1);
    }
  }
}

function buildHeaders(prefix) {
  const headers = {};
  const authorization = process.env[`${prefix}_AUTHORIZATION`];
  const cookie = process.env[`${prefix}_COOKIE`];
  const origin = process.env[`${prefix}_ORIGIN`];

  if (authorization) {
    headers.authorization = authorization;
  }

  if (cookie) {
    headers.cookie = cookie;
  }

  if (origin) {
    headers.origin = normalizeOrigin(origin, `${prefix}_ORIGIN`);
  }

  return headers;
}

function objectFromCounts(counts) {
  return Object.fromEntries(
    [...counts.entries()].sort((left, right) => String(left[0]).localeCompare(String(right[0]))),
  );
}

function percentile(values, ratio) {
  if (!values.length) {
    return Number.POSITIVE_INFINITY;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.ceil(sorted.length * ratio) - 1);

  return Math.round(sorted[index]);
}

function normalizeOrigin(value, name) {
  let url;

  try {
    url = new URL(value);
  } catch {
    throw new Error(`${name} must be a valid HTTP(S) origin.`);
  }

  if ((url.protocol !== 'http:' && url.protocol !== 'https:') || url.pathname !== '/' || url.search || url.hash) {
    throw new Error(`${name} must be a valid HTTP(S) origin.`);
  }

  return url.origin;
}

function normalizePaths(value, name) {
  const values = value
    .split(',')
    .map((path) => path.trim())
    .filter(Boolean);

  if (!values.length) {
    throw new Error(`${name} must include at least one path.`);
  }

  for (const path of values) {
    if (!path.startsWith('/') || path.startsWith('//')) {
      throw new Error(`${name} entries must be absolute HTTP paths.`);
    }
  }

  return values;
}

function normalizePositiveInteger(value, name) {
  const numberValue = Number(value);

  if (!Number.isInteger(numberValue) || numberValue < 1) {
    throw new Error(`${name} must be a positive integer.`);
  }

  return numberValue;
}

function normalizeRate(value, name) {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue) || numberValue < 0 || numberValue > 1) {
    throw new Error(`${name} must be between 0 and 1.`);
  }

  return numberValue;
}
