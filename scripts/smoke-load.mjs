const baseUrl = normalizeOrigin(process.env.AUXIFY_SITE_BASE_URL ?? 'http://127.0.0.1:3000', 'AUXIFY_SITE_BASE_URL');
const path = process.env.AUXIFY_LOAD_PATH ?? '/api/health';
const durationMs = normalizePositiveInteger(process.env.AUXIFY_LOAD_DURATION_MS ?? '10000', 'AUXIFY_LOAD_DURATION_MS');
const concurrency = normalizePositiveInteger(process.env.AUXIFY_LOAD_CONCURRENCY ?? '20', 'AUXIFY_LOAD_CONCURRENCY');
const maxP95Ms = normalizePositiveInteger(process.env.AUXIFY_LOAD_MAX_P95_MS ?? '500', 'AUXIFY_LOAD_MAX_P95_MS');
const maxErrorRate = Number(process.env.AUXIFY_LOAD_MAX_ERROR_RATE ?? '0.01');

if (!Number.isFinite(maxErrorRate) || maxErrorRate < 0 || maxErrorRate > 1) {
  throw new Error('AUXIFY_LOAD_MAX_ERROR_RATE must be between 0 and 1.');
}

const deadline = Date.now() + durationMs;
const latencies = [];
let successes = 0;
let failures = 0;

await Promise.all(Array.from({ length: concurrency }, () => worker()));

const total = successes + failures;
const p95 = percentile(latencies, 0.95);
const errorRate = total === 0 ? 1 : failures / total;

console.log(
  JSON.stringify(
    { baseUrl, concurrency, durationMs, errorRate, failures, maxErrorRate, maxP95Ms, p95, path, successes, total },
    null,
    2,
  ),
);

if (total === 0) throw new Error('Smoke load produced no requests.');
if (errorRate > maxErrorRate) throw new Error(`Smoke load error rate ${errorRate} exceeded ${maxErrorRate}.`);
if (p95 > maxP95Ms) throw new Error(`Smoke load p95 ${p95}ms exceeded ${maxP95Ms}ms.`);

async function worker() {
  while (Date.now() < deadline) {
    const startedAt = performance.now();

    try {
      const response = await fetch(new URL(path, baseUrl));
      const elapsedMs = performance.now() - startedAt;

      if (response.ok) {
        successes += 1;
        latencies.push(elapsedMs);
      } else {
        failures += 1;
      }
    } catch {
      failures += 1;
    }
  }
}

function percentile(values, ratio) {
  if (!values.length) return Number.POSITIVE_INFINITY;
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

function normalizePositiveInteger(value, name) {
  const numberValue = Number(value);
  if (!Number.isInteger(numberValue) || numberValue < 1) throw new Error(`${name} must be a positive integer.`);
  return numberValue;
}
