const defaultBaseUrl = 'http://127.0.0.1:3000';
const baseUrl = normalizeOrigin(process.env.AUXIFY_SITE_BASE_URL ?? defaultBaseUrl, 'AUXIFY_SITE_BASE_URL');

await checkHealth();
await checkPages();
await checkRobotsAndSitemap();
await checkSecurityHeaders();

console.log(`Site deployment verification passed for ${baseUrl}`);

async function checkHealth() {
  const response = await request('/api/health');
  assert(response.status === 200, `Expected /api/health to return 200, received ${response.status}.`);
  const body = await response.json();
  assert(body?.status === 'ok', 'Expected /api/health body to be { status: "ok" }.');
}

async function checkPages() {
  for (const path of ['/', '/contact', '/privacy', '/terms']) {
    const response = await request(path);
    const html = await response.text();

    assert(response.status === 200, `Expected ${path} to return 200, received ${response.status}.`);
    assert(html.includes('Auxify'), `Expected ${path} to include Auxify content.`);
  }
}

async function checkRobotsAndSitemap() {
  const robots = await request('/robots.txt');
  assert(robots.status === 200, `Expected /robots.txt to return 200, received ${robots.status}.`);
  assert((await robots.text()).includes('Sitemap:'), 'Expected robots.txt to include Sitemap.');

  const sitemap = await request('/sitemap.xml');
  assert(sitemap.status === 200, `Expected /sitemap.xml to return 200, received ${sitemap.status}.`);
  assert((await sitemap.text()).includes('<urlset'), 'Expected sitemap.xml to include urlset.');
}

async function checkSecurityHeaders() {
  const response = await request('/');

  assert(response.headers.get('x-content-type-options') === 'nosniff', 'Expected x-content-type-options=nosniff.');
  assert(response.headers.get('x-frame-options') === 'DENY', 'Expected x-frame-options=DENY.');
  assert(response.headers.get('content-security-policy'), 'Expected content-security-policy header.');
}

function request(path, init = {}) {
  return fetch(new URL(path, baseUrl), {
    redirect: 'manual',
    ...init,
  });
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

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
