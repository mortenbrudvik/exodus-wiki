/**
 * Injects infobox portrait/ship images into hand-authored article pages.
 * Generator-owned celestial pages are updated via gen-celestials.mjs instead.
 * Idempotent: skips pages that already have .infobox-image.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const briefs = JSON.parse(
  fs.readFileSync(path.join(root, "docs", "visual-briefs", "index.json"), "utf8")
);

const GEN_CELESTIALS = new Set(
  [
    "makaio",
    "sahdiah",
    "lord-jolav",
    "siskala",
    "acelynn",
    "ramona-ursule",
    "inessa-pierina",
    "luus",
    "zuberi-dulcina",
    "uulana",
    "valdier",
    "stethos-thierry",
    "asahi-iryna",
    "avone-valerio",
    "dagon",
    "radwarno",
    "neusch",
    "malquilvo",
  ]
);

function inject(html, { slug, title, kind, image }) {
  if (html.includes("infobox-image")) return { html, changed: false };

  const rel =
    kind === "ship"
      ? `../../assets/images/ships/${slug}.jpg`
      : `../../assets/images/characters/${slug}.jpg`;
  const cls = kind === "ship" ? "infobox-image infobox-image--ship" : "infobox-image";
  const wh = kind === "ship" ? 'width="640" height="360"' : 'width="320" height="427"';
  const alt = title.replace(/"/g, "&quot;");
  const block = `          <div class="${cls}">
            <img src="${rel}" alt="${alt}" ${wh} loading="lazy">
          </div>
`;

  // After the first <h2>…</h2> inside the infobox (title line).
  const re = /(<aside class="infobox">\s*<h2>[\s\S]*?<\/h2>\s*)/;
  if (!re.test(html)) {
    return { html, changed: false, error: "no infobox h2 match" };
  }
  const next = html.replace(re, `$1${block}`);
  return { html: next, changed: next !== html };
}

let ok = 0;
let skip = 0;
const errors = [];

for (const s of briefs.subjects) {
  if (s.kind === "character" && GEN_CELESTIALS.has(s.slug)) {
    skip++;
    continue; // owned by gen-celestials.mjs
  }
  const pagePath =
    s.kind === "ship"
      ? path.join(root, "pages", "locations", `${s.slug}.html`)
      : path.join(root, "pages", "characters", `${s.slug}.html`);
  if (!fs.existsSync(pagePath)) {
    errors.push(`missing page ${pagePath}`);
    continue;
  }
  const before = fs.readFileSync(pagePath, "utf8");
  const { html, changed, error } = inject(before, s);
  if (error) errors.push(`${s.slug}: ${error}`);
  else if (changed) {
    fs.writeFileSync(pagePath, html, "utf8");
    ok++;
  } else {
    skip++;
  }
}

console.log(`injected ${ok}; skipped ${skip}; errors ${errors.length}`);
if (errors.length) {
  for (const e of errors) console.error(" ", e);
  process.exit(1);
}
