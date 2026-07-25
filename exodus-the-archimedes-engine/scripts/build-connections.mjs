/**
 * Injects the derived "Connections" strip into hand-authored pages.
 *
 *   node scripts/build-connections.mjs
 *
 * The strip is built from the page's own infobox by lib/connections.mjs — see
 * that file for why it is derived rather than written. This script only places
 * it: immediately before the category footer, which is the last thing in every
 * article.
 *
 * Idempotent. Generated pages are skipped: both generators call buildConnections
 * from their own shells, so injecting here would be reverted on the next run.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { buildConnections, infoboxOf } from "./lib/connections.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SKIP_DIRS = new Set([".git", "docs", "node_modules", "scripts", "assets", "templates"]);

/** Pages written by gen-celestials.mjs / gen-dominions.mjs. */
function generatedPages() {
  const out = new Set();
  for (const [script, dir] of [
    ["gen-celestials.mjs", "pages/characters"],
    ["gen-dominions.mjs", "pages/factions"],
  ]) {
    const src = fs.readFileSync(path.join(__dirname, script), "utf8");
    for (const [, file] of src.matchAll(/file:\s*"([^"]+)"/g)) out.add(`${dir}/${file}`);
  }
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
  const generated = generatedPages();
  let added = 0;
  let skipped = 0;

  for (const p of walk(ROOT).sort()) {
    const rel = path.relative(ROOT, p).replace(/\\/g, "/");
    if (generated.has(rel)) continue;

    const src = fs.readFileSync(p, "utf8");
    if (src.includes('class="connections"')) {
      skipped += 1;
      continue;
    }

    const section = buildConnections(infoboxOf(src), rel);
    if (!section) {
      skipped += 1;
      continue;
    }

    const eol = src.includes("\r\n") ? "\r\n" : "\n";
    const block = section.split("\n").join(eol);
    const next = src.replace(
      /^([ \t]*<footer class="article-footer categories">)/m,
      `${block}${eol}$1`
    );
    if (next === src) {
      console.error(`build-connections: ${rel} has no category footer to insert before`);
      process.exit(1);
    }

    fs.writeFileSync(p, next);
    added += 1;
  }

  console.log(
    `build-connections: ${added} page(s) gained a strip, ${skipped} skipped (already had one, ` +
      `no infobox, or fewer than the minimum chips)`
  );
}
