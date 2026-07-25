/**
 * Structural check: every individual character page and every ship-typed
 * location page has a research brief, a non-empty image file, and infobox
 * <img> markup pointing at that asset.
 *
 * Discovery is from the pages tree (not only index.json), so missing ships
 * cannot green-light by omission. Exit non-zero on failure.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const briefsPath = path.join(root, "docs", "visual-briefs", "index.json");
const MIN_BYTES = 8000;

const errors = [];

if (!fs.existsSync(briefsPath)) {
  console.error("FAIL: missing docs/visual-briefs/index.json");
  process.exit(1);
}

const index = JSON.parse(fs.readFileSync(briefsPath, "utf8"));
const bySlug = new Map(index.subjects.map((s) => [s.slug, s]));

/** Character pages that are hubs/rosters, not individual subjects. */
const CHAR_EXCLUDE = new Set(["index.html", "celestials-roster.html"]);

/**
 * A location page is ship-typed when its Type dd mentions hull/ship/vessel
 * language, or when the locations hub lists it under Ships & vessels.
 */
function discoverShipSlugs() {
  const locDir = path.join(root, "pages", "locations");
  const hub = fs.readFileSync(path.join(locDir, "index.html"), "utf8");
  const hubShips = new Set();
  const shipsSection = hub.match(
    /<h2>Ships\s*&amp;\s*vessels<\/h2>[\s\S]*?(?=<h2>|<\/div>\s*<footer|$)/i
  );
  if (shipsSection) {
    // Only location-relative ship pages (e.g. polkadav.html), not ../characters/...
    for (const m of shipsSection[0].matchAll(/href="([^"/]+\.html)"/g)) {
      const slug = m[1].replace(/\.html$/, "");
      if (slug !== "index") hubShips.add(slug);
    }
  }

  const fromType = new Set();
  for (const f of fs.readdirSync(locDir)) {
    if (!f.endsWith(".html") || f === "index.html") continue;
    const html = fs.readFileSync(path.join(locDir, f), "utf8");
    const typeM = html.match(/<dt>Type<\/dt>\s*<dd>([\s\S]*?)<\/dd>/i);
    const type = typeM
      ? typeM[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      : "";
    if (/ship|hull|arkship|vessel|freighter|transport|charter/i.test(type)) {
      fromType.add(f.replace(/\.html$/, ""));
    }
  }

  return new Set([...hubShips, ...fromType]);
}

function discoverCharacterSlugs() {
  const dir = path.join(root, "pages", "characters");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".html") && !CHAR_EXCLUDE.has(f))
    .map((f) => f.replace(/\.html$/, ""));
}

function checkSubject({ slug, kind, titleHint }) {
  const pageRel =
    kind === "ship"
      ? path.join("pages", "locations", `${slug}.html`)
      : path.join("pages", "characters", `${slug}.html`);
  const pageAbs = path.join(root, pageRel);
  if (!fs.existsSync(pageAbs)) {
    errors.push(`${slug}: page missing at ${pageRel}`);
    return;
  }

  const imageRel =
    kind === "ship"
      ? `assets/images/ships/${slug}.jpg`
      : `assets/images/characters/${slug}.jpg`;
  const imgAbs = path.join(root, imageRel);
  if (!fs.existsSync(imgAbs)) {
    errors.push(`${slug}: image missing at ${imageRel}`);
  } else {
    const size = fs.statSync(imgAbs).size;
    if (size < MIN_BYTES) {
      errors.push(`${slug}: image too small (${size} bytes) at ${imageRel}`);
    }
  }

  const briefMd = path.join(root, "docs", "visual-briefs", `${slug}.md`);
  if (!fs.existsSync(briefMd)) {
    errors.push(`${slug}: brief missing docs/visual-briefs/${slug}.md`);
  }

  if (!bySlug.has(slug)) {
    errors.push(`${slug}: not listed in docs/visual-briefs/index.json`);
  } else if (bySlug.get(slug).kind !== kind) {
    errors.push(
      `${slug}: index.json kind is ${bySlug.get(slug).kind}, expected ${kind}`
    );
  }

  const html = fs.readFileSync(pageAbs, "utf8");
  if (!html.includes("infobox-image")) {
    errors.push(`${slug}: page lacks .infobox-image markup`);
  }
  if (!html.includes(imageRel.replace(/\\/g, "/"))) {
    errors.push(`${slug}: page img src does not include ${imageRel}`);
  }

  // optional titleHint unused — reserved for future h1 cross-check
  void titleHint;
}

const charSlugs = discoverCharacterSlugs();
const shipSlugs = discoverShipSlugs();

for (const slug of charSlugs) {
  checkSubject({ slug, kind: "character" });
}
for (const slug of [...shipSlugs].sort()) {
  checkSubject({ slug, kind: "ship" });
}

// CSS pattern must exist
const css = fs.readFileSync(path.join(root, "assets", "css", "wiki.css"), "utf8");
if (!css.includes(".infobox-image")) {
  errors.push("wiki.css missing .infobox-image rules");
}

// Orphan index entries (listed but no page) — soft? No, fail.
for (const s of index.subjects) {
  const pageRel =
    s.kind === "ship"
      ? path.join("pages", "locations", `${s.slug}.html`)
      : path.join("pages", "characters", `${s.slug}.html`);
  if (!fs.existsSync(path.join(root, pageRel))) {
    errors.push(`${s.slug}: index.json entry has no page at ${pageRel}`);
  }
}

if (errors.length) {
  console.error(`check-images: ${errors.length} failure(s)`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

console.log(
  `check-images: OK — ${charSlugs.length} characters + ${shipSlugs.size} ships ` +
    `(discovered from pages; briefs, images ≥${MIN_BYTES}B, infobox markup)`
);
