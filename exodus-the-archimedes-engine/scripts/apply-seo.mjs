/**
 * Injects (or refreshes) the SEO head block on every indexed page.
 *
 * Idempotent: the block is delimited by <!-- seo:start --> / <!-- seo:end --> and is
 * replaced wholesale on re-run, so changing a summary in search-index.json and re-running
 * updates every affected page.
 *
 * Generated pages are skipped — gen-celestials.mjs and gen-dominions.mjs emit the same
 * block from the same lib, and check-wiki.mjs proves they still reproduce byte-for-byte.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadIndex, seoRegion, SEO_START, SEO_END } from "./lib/seo.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bookRoot = path.join(__dirname, "..");

const generated = new Set();
for (const g of ["gen-celestials.mjs", "gen-dominions.mjs"]) {
  const src = fs.readFileSync(path.join(__dirname, g), "utf8");
  for (const m of src.matchAll(/file:\s*"([^"]+)"/g)) generated.add(m[1]);
}

let wrote = 0;
let skipped = 0;
const errors = [];

for (const entry of loadIndex()) {
  const abs = path.join(bookRoot, entry.path);
  if (!fs.existsSync(abs)) {
    errors.push(`missing page for index entry ${entry.path}`);
    continue;
  }
  if (generated.has(path.basename(entry.path))) {
    skipped++;
    continue;
  }

  const before = fs.readFileSync(abs, "utf8");
  const eol = before.includes("\r\n") ? "\r\n" : "\n";
  const region = seoRegion(entry.path).split("\n").join(eol);

  // Located by index rather than regex: the markers contain regex metacharacters.
  let after;
  const startIdx = before.indexOf(SEO_START);
  if (startIdx !== -1) {
    const endIdx = before.indexOf(SEO_END);
    if (endIdx === -1) {
      errors.push(`${entry.path}: ${SEO_START} without ${SEO_END}`);
      continue;
    }
    // Swallow the indent before the start marker so we do not accumulate whitespace.
    let from = startIdx;
    while (from > 0 && (before[from - 1] === " " || before[from - 1] === "\t")) from--;
    after = before.slice(0, from) + region + before.slice(endIdx + SEO_END.length);
  } else {
    const titleClose = before.indexOf("</title>");
    if (titleClose === -1) {
      errors.push(`${entry.path}: no </title> to anchor the block`);
      continue;
    }
    const insertAt = titleClose + "</title>".length;
    after = before.slice(0, insertAt) + eol + region + before.slice(insertAt);
  }

  if (after !== before) {
    fs.writeFileSync(abs, after, "utf8");
    wrote++;
  }
}

console.log(`apply-seo: wrote ${wrote}; skipped ${skipped} generated; errors ${errors.length}`);
if (errors.length) {
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}
