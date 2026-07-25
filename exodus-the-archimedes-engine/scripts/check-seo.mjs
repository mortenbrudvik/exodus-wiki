/**
 * Verifies the machinery that makes the wiki findable from outside:
 * per-page description/canonical/social tags, and the site-root sitemap and robots.txt.
 *
 * Exit non-zero on failure. Run after adding, renaming or removing a page, or after
 * editing a summary in search-index.json.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadIndex, pageUrl, imageUrl, describe, escapeAttr, SITE, NOINDEX_PAGES } from "./lib/seo.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bookRoot = path.join(__dirname, "..");
const siteRoot = path.join(bookRoot, "..");

const errors = [];
const fail = (m) => errors.push(m);

const index = loadIndex();
const titles = new Map();

for (const entry of index) {
  const rel = entry.path;
  const abs = path.join(bookRoot, rel);
  if (!fs.existsSync(abs)) {
    fail(`${rel}: page missing`);
    continue;
  }
  const src = fs.readFileSync(abs, "utf8");

  if (!src.includes("<!-- seo:start -->") || !src.includes("<!-- seo:end -->")) {
    fail(`${rel}: no seo:start/seo:end block — run apply-seo.mjs`);
    continue;
  }

  const want = escapeAttr(describe(entry.summary));
  const desc = (src.match(/<meta name="description" content="([^"]*)">/) || [])[1];
  if (!desc) fail(`${rel}: no meta description`);
  else if (desc !== want) fail(`${rel}: description is stale — re-run apply-seo.mjs`);

  const url = pageUrl(rel);
  const canonical = (src.match(/<link rel="canonical" href="([^"]*)">/) || [])[1];
  if (canonical !== url) fail(`${rel}: canonical is "${canonical}", expected "${url}"`);

  const ogUrl = (src.match(/<meta property="og:url" content="([^"]*)">/) || [])[1];
  if (ogUrl !== url) fail(`${rel}: og:url disagrees with canonical`);

  const ogDesc = (src.match(/<meta property="og:description" content="([^"]*)">/) || [])[1];
  if (ogDesc !== desc) fail(`${rel}: og:description disagrees with meta description`);

  // A social image must be a real file, not a 404 in someone's link preview.
  const ogImage = (src.match(/<meta property="og:image" content="([^"]*)">/) || [])[1];
  if (!ogImage) fail(`${rel}: no og:image`);
  else {
    if (ogImage !== imageUrl(rel)) fail(`${rel}: og:image is stale — re-run apply-seo.mjs`);
    if (!ogImage.startsWith(SITE + "/")) fail(`${rel}: og:image is not an absolute site URL`);
    const local = path.join(siteRoot, ogImage.slice(SITE.length + 1));
    if (!fs.existsSync(local)) fail(`${rel}: og:image does not resolve to a file (${ogImage})`);
  }

  const noindexed = /<meta name="robots" content="noindex/.test(src);
  if (NOINDEX_PAGES.has(rel) && !noindexed) fail(`${rel}: expected noindex`);
  if (!NOINDEX_PAGES.has(rel) && noindexed) fail(`${rel}: unexpectedly noindexed`);

  // Duplicate <title>s split ranking signals between pages competing for the same query.
  const title = (src.match(/<title>([^<]*)<\/title>/) || [])[1];
  if (title) {
    if (titles.has(title)) fail(`duplicate <title> "${title}" on ${rel} and ${titles.get(title)}`);
    else titles.set(title, rel);
  }
}

// —— Site-root artefacts ——
const sitemapPath = path.join(siteRoot, "sitemap.xml");
const robotsPath = path.join(siteRoot, "robots.txt");

if (!fs.existsSync(sitemapPath)) {
  fail("sitemap.xml missing at site root — run gen-sitemap.mjs");
} else {
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const listed = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  const expected = new Set([
    `${SITE}/`,
    ...index.filter((e) => !NOINDEX_PAGES.has(e.path)).map((e) => pageUrl(e.path)),
  ]);
  for (const u of expected) if (!listed.has(u)) fail(`sitemap.xml is missing ${u}`);
  for (const u of listed) if (!expected.has(u)) fail(`sitemap.xml lists unknown ${u}`);
}

if (!fs.existsSync(robotsPath)) {
  fail("robots.txt missing at site root — run gen-sitemap.mjs");
} else {
  const robots = fs.readFileSync(robotsPath, "utf8");
  if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt does not point at the sitemap");
  if (/^\s*Disallow:\s*\/\s*$/m.test(robots)) fail("robots.txt disallows the whole site");
}

// The hub is outside the book, so it is checked separately.
const hub = fs.readFileSync(path.join(siteRoot, "index.html"), "utf8");
for (const [label, re] of [
  ["meta description", /<meta name="description" content="[^"]+">/],
  ["canonical", new RegExp(`<link rel="canonical" href="${SITE}/">`)],
  ["og:title", /<meta property="og:title" content="[^"]+">/],
]) {
  if (!re.test(hub)) fail(`hub index.html has no ${label}`);
}

if (errors.length) {
  console.error(`check-seo: ${errors.length} failure(s)`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(
  `check-seo: OK — ${index.length} pages with descriptions, canonicals and social tags; ` +
    `sitemap and robots.txt in sync`
);
