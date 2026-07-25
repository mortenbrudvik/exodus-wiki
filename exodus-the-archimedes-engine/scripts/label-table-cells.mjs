/**
 * Gives every `.wiki-table` body cell a `data-label` naming its column, so the
 * table can stack into labelled blocks on a phone.
 *
 *   node scripts/label-table-cells.mjs
 *
 * Why not do it in CSS alone: the three table-bearing pages have different
 * column counts — timeline 3, chapters 4, sources 2 and 3 — so nothing
 * position-based works across all of them, and a four-column table squeezed
 * into 343px wraps its prose to two or three words a line. The header text is
 * the only thing that reliably identifies a column, and CSS cannot read another
 * element's text. `content: attr(data-label)` can.
 *
 * Idempotent: cells that already carry a label are left alone. All three pages
 * are hand-authored, so no generator has to mirror this.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SKIP_DIRS = new Set([".git", "docs", "node_modules", "scripts", "assets", "templates"]);

const decode = (s) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();

/** Quote-safe for an HTML attribute value. */
const attr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

export function labelTables(src) {
  return src.replace(
    /<table class="wiki-table">([\s\S]*?)<\/table>/g,
    (whole, inner) => {
      const head = inner.match(/<thead>([\s\S]*?)<\/thead>/);
      if (!head) return whole;

      const headers = [...head[1].matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map((m) => decode(m[1]));
      if (!headers.length) return whole;

      const body = inner.match(/<tbody>([\s\S]*?)<\/tbody>/);
      if (!body) return whole;

      const labelled = body[1].replace(/<tr>([\s\S]*?)<\/tr>/g, (row, cells) => {
        let i = 0;
        const next = cells.replace(/<td(\s[^>]*)?>/g, (tag, existing) => {
          const label = headers[i] ?? "";
          i += 1;
          if (existing && /\bdata-label=/.test(existing)) return tag;
          const extra = existing || "";
          return label ? `<td${extra} data-label="${attr(label)}">` : tag;
        });
        return `<tr>${next}</tr>`;
      });

      return whole.replace(body[1], labelled);
    }
  );
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
  let scanned = 0;

  for (const p of walk(ROOT).sort()) {
    const src = fs.readFileSync(p, "utf8");
    if (!src.includes('class="wiki-table"')) continue;
    scanned += 1;
    const next = labelTables(src);
    if (next !== src) {
      fs.writeFileSync(p, next);
      changed += 1;
    }
  }

  console.log(
    `label-table-cells: ${changed} of ${scanned} page(s) with tables updated` +
      `${changed === 0 ? " (all already labelled)" : ""}`
  );
}
