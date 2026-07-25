/**
 * Stamps a content-hash cache-busting token onto every shared CSS and JS
 * reference, so a deploy can never pair new markup with an old stylesheet.
 *
 *   node scripts/stamp-assets.mjs
 *
 * See scripts/lib/assets.mjs for why, and for the limits of what this fixes.
 *
 * Idempotent: the token is derived from file contents, so running it twice in a
 * row is a no-op, and running it after an asset edit rewrites only that asset's
 * references. Run it LAST — after the generators and after every other sweep,
 * because it rewrites lines those scripts insert.
 *
 * Covers the root hub too: index.html loads assets/css/hub.css, which was
 * rewritten in the same redesign and has identical exposure. gen-sitemap.mjs
 * already writes to the site root, so reaching up one level is established here.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { VERSIONED, HUB_VERSIONED, assetV, hubAssetV } from "./lib/assets.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WIKI_ROOT = path.join(__dirname, "..");
const SITE_ROOT = path.join(WIKI_ROOT, "..");
const SKIP_DIRS = new Set([".git", "docs", "node_modules", "scripts", "assets", "templates"]);

/**
 * Rewrites href="…/<asset>" and src="…/<asset>" — with or without an existing
 * ?v= — to carry `version`. The leading path is whatever depth the page needs,
 * so it is captured and preserved rather than recomputed.
 */
export function stampOne(src, assetRel, version) {
  const esc = assetRel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`((?:href|src)=")([^"]*?${esc})(\\?v=[0-9a-f]+)?(")`, "g");
  return src.replace(re, (_m, pre, pathPart, _old, post) => `${pre}${pathPart}?v=${version}${post}`);
}

export function stampPage(src, assets, versionFor) {
  let out = src;
  for (const a of assets) out = stampOne(out, a, versionFor(a));
  return out;
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), out);
    } else if (entry.name.endsWith(".html")) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  let changed = 0;
  const pages = walk(WIKI_ROOT).sort();

  for (const p of pages) {
    const src = fs.readFileSync(p, "utf8");
    const next = stampPage(src, VERSIONED, assetV);
    if (next !== src) {
      fs.writeFileSync(p, next);
      changed += 1;
    }
  }

  // The hub sits outside the wiki and loads its own stylesheet.
  const hub = path.join(SITE_ROOT, "index.html");
  let hubChanged = false;
  if (fs.existsSync(hub)) {
    const src = fs.readFileSync(hub, "utf8");
    const next = stampPage(src, HUB_VERSIONED, hubAssetV);
    if (next !== src) {
      fs.writeFileSync(hub, next);
      hubChanged = true;
    }
  }

  const versions = VERSIONED.map((a) => `${path.basename(a)}=${assetV(a)}`).join(" ");
  console.log(
    `stamp-assets: ${changed} wiki page(s) stamped, ${pages.length - changed} already current` +
      `${hubChanged ? ", hub updated" : ", hub already current"}`
  );
  console.log(`  ${versions} hub.css=${hubAssetV("assets/css/hub.css")}`);
}
