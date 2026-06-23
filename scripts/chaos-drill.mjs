const baseUrl = normalizeOrigin(process.env.AUXIFY_SITE_BASE_URL ?? 'http://127.0.0.1:3000', 'AUXIFY_SITE_BASE_URL');
const paths = normalizePaths(process.env.AUXIFY_CHAOS_PATHS ?? '/api/health,/', 'AUXIFY_CHAOS_PATHS');
const durationMs = normalizePositiveInteger(
  process.env.AUXIFY_CHAOS_DURATION_MS ?? '120000',
  'AUXIFY_CHAOS_DURATION_MS',
);
const intervalMs = normalizePositiveInteger(process.env.AUXIFY_CHAOS_INTERVAL_MS ?? '500', 'AUXIFY_CHAOS_INTERVAL_MS');
const timeoutMs = normalizePositiveInteger(process.env.AUXIFY_CHAOS_TIMEOUT_MS ?? '5000', 'AUXIFY_CHAOS_TIMEOUT_MS');
const recoveryWindowMs = Math.min(
  durationMs,
  normalizePositiveInteger(process.env.AUXIFY_CHAOS_RECOVERY_WINDOW_MS ?? '15000', 'AUXIFY_CHAOS_RECOVERY_WINDOW_MS'),
);
const maxP95Ms = normalizePositiveInteger(process.env.AUXIFY_CHAOS_MAX_P95_MS ?? '1000', 'AUXIFY_CHAOS_MAX_P95_MS');
const maxErrorRate = normalizeRate(process.env.AUXIFY_CHAOS_MAX_ERROR_RATE ?? '0.1', 'AUXIFY_CHAOS_MAX_ERROR_RATE');
const maxOutageMs = normalizePositiveInteger(
  process.env.AUXIFY_CHAOS_MAX_OUTAGE_MS ?? '15000',
  'AUXIFY_CHAOS_MAX_OUTAGE_MS',
);
const expectDisruption = normalizeBoolean(
  process.env.AUXIFY_CHAOS_EXPECT_DISRUPTION ?? 'false',
  'AUXIFY_CHAOS_EXPECT_DISRUPTION',
);
const scenario = process.env.AUXIFY_CHAOS_SCENARIO ?? 'manual-staging-fault';
const requestIdPrefix = process.env.AUXIFY_CHAOS_REQUEST_ID_PREFIX ?? 'auxify-site-chaos';
const commonHeaders = buildHeaders('AUXIFY_CHAOS');

const startedAt = Date.now();
const samples = [];
let sequence = 0;

while (Date.now() - startedAt < durationMs) {
  const cycleStartedAt = Date.now();

  for (const path of paths) {
    samples.push(await probe(path, sequence));
    sequence += 1;
  }

  const cycleElapsedMs = Date.now() - cycleStartedAt;
  if (cycleElapsedMs < intervalMs) {
    await wait(intervalMs - cycleElapsedMs);
  }
}

const successes = samples.filter((sample) => sample.ok).length;
const failures = samples.length - successes;
const latencies = samples.filter((sample) => sample.ok).map((sample) => sample.elapsedMs);
const p95 = percentile(latencies, 0.95);
const errorRate = samples.length === 0 ? 1 : failures / samples.length;
const maxConsecutiveFailureMs = estimateMaxConsecutiveFailureMs(samples, intervalMs);
const finalWindowStartedAt = durationMs - recoveryWindowMs;
const finalWindowSuccesses = samples.filter((sample) => sample.relativeMs >= finalWindowStartedAt && sample.ok).length;

console.log(
  JSON.stringify(
    {
      baseUrl,
      durationMs,
      errorRate,
      expectDisruption,
      failures,
      finalWindowSuccesses,
      intervalMs,
      maxConsecutiveFailureMs,
      maxErrorRate,
      maxOutageMs,
      maxP95Ms,
      p95,
      paths,
      recoveryWindowMs,
      scenario,
      successes,
      total: samples.length,
    },
    null,
    2,
  ),
);

if (!samples.length) {
  throw new Error('Chaos drill produced no probes.');
}

if (expectDisruption && failures === 0) {
  throw new Error('Chaos drill expected a disruption, but all probes succeeded.');
}

if (errorRate > maxErrorRate) {
  throw new Error(`Chaos drill error rate ${errorRate} exceeded ${maxErrorRate}.`);
}

if (maxConsecutiveFailureMs > maxOutageMs) {
  throw new Error(`Chaos drill outage ${maxConsecutiveFailureMs}ms exceeded ${maxOutageMs}ms.`);
}

if (p95 > maxP95Ms) {
  throw new Error(`Chaos drill p95 ${p95}ms exceeded ${maxP95Ms}ms.`);
}

if (finalWindowSuccesses === 0) {
  throw new Error('Chaos drill did not recover in the final recovery window.');
}

async function probe(path, requestNumber) {
  const probeStartedAt = performance.now();
  const relativeMs = Date.now() - startedAt;

  try {
    const response = await fetch(new URL(path, baseUrl), {
      headers: {
        ...commonHeaders,
        'x-request-id': `${requestIdPrefix}-${requestNumber}`,
      },
      redirect: 'manual',
      signal: AbortSignal.timeout(timeoutMs),
    });
    const elapsedMs = performance.now() - probeStartedAt;
    await response.arrayBuffer().catch(() => undefined);

    return {
      elapsedMs,
      ok: response.status >= 200 && response.status < 400,
      path,
      relativeMs,
      status: response.status,
    };
  } catch (error) {
    return {
      elapsedMs: performance.now() - probeStartedAt,
      error: error instanceof Error ? error.name : 'UnknownError',
      ok: false,
      path,
      relativeMs,
    };
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

function estimateMaxConsecutiveFailureMs(values, interval) {
  let maxFailureMs = 0;
  let streakStartMs;
  let lastFailureMs;

  for (const sample of values) {
    if (sample.ok) {
      if (streakStartMs !== undefined) {
        maxFailureMs = Math.max(maxFailureMs, lastFailureMs - streakStartMs + interval);
      }
      streakStartMs = undefined;
      lastFailureMs = undefined;
      continue;
    }

    streakStartMs ??= sample.relativeMs;
    lastFailureMs = sample.relativeMs;
  }

  if (streakStartMs !== undefined) {
    maxFailureMs = Math.max(maxFailureMs, lastFailureMs - streakStartMs + interval);
  }

  return maxFailureMs;
}

function percentile(values, ratio) {
  if (!values.length) {
    return Number.POSITIVE_INFINITY;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.ceil(sorted.length * ratio) - 1);

  return Math.round(sorted[index]);
}

function normalizeBoolean(value, name) {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  throw new Error(`${name} must be true or false.`);
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

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
