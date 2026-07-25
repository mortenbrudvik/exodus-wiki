/**
 * Inject infobox images for location / technology / faction brief subjects
 * that are hand-authored (not generator-owned).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const index = JSON.parse(
  fs.readFileSync(path.join(root, "docs", "visual-briefs", "index.json"), "utf8")
);

const GEN_FACTIONS = new Set(["heresy-dominion"]); // gen-dominions.mjs

function dirFor(kind) {
  if (kind === "location") return "locations";
  if (kind === "technology") return "technology";
  if (kind === "faction") return "factions";
  return null;
}

function imageSubdir(kind) {
  return dirFor(kind);
}

let ok = 0;
let skip = 0;
const errors = [];

for (const s of index.subjects) {
  if (!["location", "technology", "faction"].includes(s.kind)) continue;
  if (GEN_FACTIONS.has(s.slug)) {
    skip++;
    continue;
  }
  const dir = dirFor(s.kind);
  const pagePath = path.join(root, "pages", dir, `${s.slug}.html`);
  if (!fs.existsSync(pagePath)) {
    errors.push(`missing page ${pagePath}`);
    continue;
  }
  let html = fs.readFileSync(pagePath, "utf8");
  if (html.includes("infobox-image")) {
    skip++;
    continue;
  }
  const rel = `../../assets/images/${imageSubdir(s.kind)}/${s.slug}.jpg`;
  const alt = s.title.replace(/"/g, "&quot;");
  const block = `          <div class="infobox-image infobox-image--wide">
            <img src="${rel}" alt="${alt}" width="640" height="360" loading="lazy">
          </div>
`;
  const re = /(<aside class="infobox">\s*<h2>[\s\S]*?<\/h2>\s*)/;
  if (!re.test(html)) {
    errors.push(`${s.slug}: no infobox h2`);
    continue;
  }
  html = html.replace(re, `$1${block}`);
  fs.writeFileSync(pagePath, html, "utf8");
  ok++;
  console.log("injected", s.slug);
}

console.log(`inject-extra-images: ${ok} injected, ${skip} skipped, ${errors.length} errors`);
if (errors.length) {
  for (const e of errors) console.error(" ", e);
  process.exit(1);
}
