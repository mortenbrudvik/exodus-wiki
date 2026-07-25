/**
 * Single source of truth for the per-page SEO head block.
 *
 * Hand-authored pages get it from apply-seo.mjs; the 25 generated pages get it from
 * gen-celestials.mjs / gen-dominions.mjs. Both call seoBlock(), so the two can never
 * drift — and check-wiki.mjs re-renders the generators and would fail if they did.
 *
 * Descriptions reuse the curated summaries in assets/data/search-index.json rather than
 * inventing a second set of blurbs, so a page's snippet and its search entry always agree.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bookRoot = path.join(__dirname, "..", "..");

export const SITE = "https://mortenbrudvik.github.io/exodus-wiki";
export const BOOK = "exodus-the-helium-sea";
export const SITE_NAME = "Helium Sea Wiki";
export const BOOK_TITLE = "Exodus: The Helium Sea";
export const AUTHOR = "Peter F. Hamilton";

/** Appended to every description so each page names the book and author it belongs to. */
const TAGLINE = `full-spoiler reading companion to ${BOOK_TITLE} by ${AUTHOR}`;

/** Pages that are the site rather than an article in it. */
const WEBSITE_PAGES = new Set(["index.html", "search.html"]);

/**
 * A search-results page is thin, duplicate-by-construction content. Keep it out of the
 * index but let crawlers follow its links. Also excluded from the sitemap.
 */
export const NOINDEX_PAGES = new Set(["search.html"]);

let cachedIndex = null;
export function loadIndex() {
  if (!cachedIndex) {
    cachedIndex = JSON.parse(
      fs.readFileSync(path.join(bookRoot, "assets", "data", "search-index.json"), "utf8")
    );
  }
  return cachedIndex;
}

export function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function describe(summary) {
  const trimmed = String(summary).trim().replace(/[.\s]+$/, "");
  return `${trimmed} — ${TAGLINE}.`;
}

/** Absolute URL for a page path relative to the book root. */
export function pageUrl(relPath) {
  return `${SITE}/${BOOK}/${relPath}`;
}

/**
 * Where a page directory's illustrations may live. Image slugs match page slugs, so the
 * only ambiguity is pages/locations/, which holds both places and named ships.
 */
const IMAGE_DIRS = {
  characters: ["characters"],
  locations: ["locations", "ships"],
  factions: ["factions"],
  technology: ["technology"],
};

/** Social image for a page: its own illustration when it has one, else the site icon. */
export function imageUrl(relPath) {
  const slug = path.basename(relPath, ".html");
  const m = relPath.match(/^pages\/([^/]+)\//);
  for (const kind of (m && IMAGE_DIRS[m[1]]) || []) {
    const rel = `assets/images/${kind}/${slug}.jpg`;
    if (fs.existsSync(path.join(bookRoot, rel))) return `${SITE}/${BOOK}/${rel}`;
  }
  return `${SITE}/assets/icons/icon-512.png`;
}

/**
 * The head block for one page, as "\n"-joined indented lines with no trailing newline.
 * Callers join into their own file and normalize line endings to their convention.
 */
export function seoBlock(relPath, indent = "  ") {
  const entry = loadIndex().find((e) => e.path === relPath);
  if (!entry) throw new Error(`seoBlock: no search-index entry for ${relPath}`);

  const url = pageUrl(relPath);
  const desc = escapeAttr(describe(entry.summary));
  const title = escapeAttr(entry.title);
  const img = imageUrl(relPath);
  const type = WEBSITE_PAGES.has(relPath) ? "website" : "article";

  return [
    `<meta name="description" content="${desc}">`,
    `<link rel="canonical" href="${url}">`,
    ...(NOINDEX_PAGES.has(relPath) ? [`<meta name="robots" content="noindex,follow">`] : []),
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${desc}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${img}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
  ]
    .map((line) => indent + line)
    .join("\n");
}

/** Marks the injected region so apply-seo.mjs can replace it idempotently. */
export const SEO_START = "<!-- seo:start -->";
export const SEO_END = "<!-- seo:end -->";

/** The block wrapped in its markers, "\n"-joined. */
export function seoRegion(relPath, indent = "  ") {
  return [indent + SEO_START, seoBlock(relPath, indent), indent + SEO_END].join("\n");
}
