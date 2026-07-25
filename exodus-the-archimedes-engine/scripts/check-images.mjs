/**
 * Structural check: every visual-brief subject has a non-empty image file
 * and an <img> in its article infobox pointing at that asset.
 * Exit non-zero on failure (gating test for wiki images).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const briefsPath = path.join(root, "docs", "visual-briefs", "index.json");

if (!fs.existsSync(briefsPath)) {
  console.error("FAIL: missing docs/visual-briefs/index.json");
  process.exit(1);
}

const { subjects } = JSON.parse(fs.readFileSync(briefsPath, "utf8"));
const errors = [];
const MIN_BYTES = 8000; // reject blank/tiny placeholders

for (const s of subjects) {
  const imgAbs = path.join(root, s.image);
  if (!fs.existsSync(imgAbs)) {
    errors.push(`${s.slug}: image missing at ${s.image}`);
    continue;
  }
  const size = fs.statSync(imgAbs).size;
  if (size < MIN_BYTES) {
    errors.push(`${s.slug}: image too small (${size} bytes) at ${s.image}`);
  }

  const pageRel =
    s.kind === "ship"
      ? path.join("pages", "locations", `${s.slug}.html`)
      : path.join("pages", "characters", `${s.slug}.html`);
  const pageAbs = path.join(root, pageRel);
  if (!fs.existsSync(pageAbs)) {
    errors.push(`${s.slug}: page missing at ${pageRel}`);
    continue;
  }
  const html = fs.readFileSync(pageAbs, "utf8");
  if (!html.includes("infobox-image")) {
    errors.push(`${s.slug}: page lacks .infobox-image markup`);
  }
  const expectedSrc =
    s.kind === "ship"
      ? `assets/images/ships/${s.slug}.jpg`
      : `assets/images/characters/${s.slug}.jpg`;
  if (!html.includes(expectedSrc)) {
    errors.push(`${s.slug}: page img src does not include ${expectedSrc}`);
  }
  // Brief must exist
  const briefMd = path.join(root, "docs", "visual-briefs", `${s.slug}.md`);
  if (!fs.existsSync(briefMd)) {
    errors.push(`${s.slug}: brief missing docs/visual-briefs/${s.slug}.md`);
  }
}

// CSS pattern must exist
const css = fs.readFileSync(path.join(root, "assets", "css", "wiki.css"), "utf8");
if (!css.includes(".infobox-image")) {
  errors.push("wiki.css missing .infobox-image rules");
}

if (errors.length) {
  console.error(`check-images: ${errors.length} failure(s)`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(
  `check-images: OK — ${subjects.length} subjects with briefs, images (≥${MIN_BYTES}B), and infobox markup`
);
