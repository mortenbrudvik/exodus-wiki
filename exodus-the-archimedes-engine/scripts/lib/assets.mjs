/**
 * Cache-busting tokens for the shared CSS and JS.
 *
 * GitHub Pages serves everything with `Cache-Control: max-age=600` and applies
 * it to HTML and CSS alike. The two are fetched at different moments, so for up
 * to ten minutes after a deploy a reader's browser can pair freshly-fetched
 * markup with a stylesheet it cached before the deploy. That is not a symmetric
 * inconvenience: new HTML on the old stylesheet loses every selector the current
 * chrome depends on — the grouped nav collapses to bare paragraphs, the theme
 * toggle renders as a default button, dark mode disappears entirely. It happened
 * to a real reader on 25 July 2026.
 *
 * Each asset is versioned by a hash of its OWN contents, so a token changes only
 * when that file does. Editing wiki.css rewrites one link across 88 pages;
 * editing theme.js leaves the stylesheet link alone.
 *
 * Verified safe from the filesystem: Chrome resolves `file:///…/wiki.css?v=abc`
 * to the file and applies it, so the `file://` requirement in CLAUDE.md holds.
 *
 * Honest limit: this closes the new-HTML/old-CSS direction only. The reverse —
 * cached old HTML asking for an old token — still serves a matched pair, which
 * is stale but coherent, and self-heals within the same ten minutes.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WIKI_ROOT = path.join(__dirname, "..", "..");
const SITE_ROOT = path.join(WIKI_ROOT, "..");

/** Wiki-root-relative asset paths that carry a version token. */
export const VERSIONED = [
  "assets/css/wiki.css",
  "assets/js/search.js",
  "assets/js/lightbox.js",
  "assets/js/theme.js",
  "assets/data/search-index.js",
];

/** The root hub is its own page with its own stylesheet, and the same exposure. */
export const HUB_VERSIONED = ["assets/css/hub.css"];

const cache = new Map();

function hashFile(abs) {
  if (cache.has(abs)) return cache.get(abs);
  // Line endings differ across the tree (core.autocrlf), and a hash that flips
  // with them would churn every page on checkout. Normalise before hashing.
  const body = fs.readFileSync(abs, "utf8").replace(/\r\n/g, "\n");
  const h = crypto.createHash("sha256").update(body).digest("hex").slice(0, 8);
  cache.set(abs, h);
  return h;
}

/** @param {string} rel wiki-root-relative, e.g. "assets/css/wiki.css" */
export const assetV = (rel) => hashFile(path.join(WIKI_ROOT, rel));

/** @param {string} rel site-root-relative, e.g. "assets/css/hub.css" */
export const hubAssetV = (rel) => hashFile(path.join(SITE_ROOT, rel));
