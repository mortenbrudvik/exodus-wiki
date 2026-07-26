/**
 * Structural check: required illustrated subjects have research briefs,
 * non-empty image files, and infobox <img> markup.
 *
 * Discovery:
 * - Every individual character page (not hubs)
 * - Every ship-typed location page (hub Ships list + Type heuristics)
 * - Every subject in docs/visual-briefs/index.json with kind
 *   location | technology | faction (second-pass extras must stay covered)
 *
 * Exit non-zero on failure.
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

const CHAR_EXCLUDE = new Set(["index.html", "celestials-roster.html"]);
const FACTION_EXCLUDE = new Set(["index.html", "dominions-roster.html"]);

function pageDirForKind(kind) {
  if (kind === "character") return "characters";
  if (kind === "ship" || kind === "location") return "locations";
  if (kind === "technology") return "technology";
  if (kind === "faction" || kind === "hub") return "factions";
  return null;
}

/**
 * `hub` subjects are index pages, not subjects with an infobox.
 *
 * dominions-roster.html is `article--wide` with no infobox — the same shape as
 * celestials-roster.html — so its plate lives on the category hub's card instead of on the page.
 * Without this kind the asset would be invisible to the check: faction pages are only ever reached
 * through index.json, so an unlisted image is never verified at all, and CLAUDE.md is explicit that
 * an unreviewed asset is an unverified claim on a public page.
 *
 * The rule is therefore the same as any other subject except for where the markup must appear:
 * the parent hub carries the <img>, not the subject page.
 */
const HUB_KINDS = new Set(["hub"]);

function imagePathFor(kind, slug) {
  if (kind === "character") return `assets/images/characters/${slug}.jpg`;
  if (kind === "ship") return `assets/images/ships/${slug}.jpg`;
  if (kind === "location") return `assets/images/locations/${slug}.jpg`;
  if (kind === "technology") return `assets/images/technology/${slug}.jpg`;
  if (kind === "faction" || kind === "hub") return `assets/images/factions/${slug}.jpg`;
  return null;
}

function discoverShipSlugs() {
  const locDir = path.join(root, "pages", "locations");
  const hub = fs.readFileSync(path.join(locDir, "index.html"), "utf8");
  const hubShips = new Set();
  const shipsSection = hub.match(
    /<h2>Ships\s*&amp;\s*vessels<\/h2>[\s\S]*?(?=<h2>|<\/div>\s*<footer|$)/i
  );
  if (shipsSection) {
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

function checkSubject({ slug, kind }) {
  const pageSub = pageDirForKind(kind);
  const imageRel = imagePathFor(kind, slug);
  if (!pageSub || !imageRel) {
    errors.push(`${slug}: unknown kind ${kind}`);
    return;
  }

  const pageRel = path.join("pages", pageSub, `${slug}.html`);
  const pageAbs = path.join(root, pageRel);
  if (!fs.existsSync(pageAbs)) {
    errors.push(`${slug}: page missing at ${pageRel}`);
    return;
  }

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

  const imgSrc = imageRel.replace(/\\/g, "/");

  if (HUB_KINDS.has(kind)) {
    // The plate belongs to the category hub's card for this page, not to the page itself.
    const hubRel = path.join("pages", pageSub, "index.html");
    const hubHtml = fs.readFileSync(path.join(root, hubRel), "utf8");
    if (!hubHtml.includes(`${slug}.html`)) {
      errors.push(`${slug}: not linked from ${hubRel}`);
    }
    if (!hubHtml.includes(imgSrc)) {
      errors.push(`${slug}: ${hubRel} card does not show ${imageRel}`);
    }
    const html = fs.readFileSync(pageAbs, "utf8");
    if (html.includes("infobox-image")) {
      errors.push(
        `${slug}: has .infobox-image markup — it is kind "hub", so either drop the markup or change the kind`
      );
    }
    return;
  }

  const html = fs.readFileSync(pageAbs, "utf8");
  if (!html.includes("infobox-image")) {
    errors.push(`${slug}: page lacks .infobox-image markup`);
  }
  if (!html.includes(imgSrc)) {
    errors.push(`${slug}: page img src does not include ${imageRel}`);
  }
}

/** @type {Map<string, string>} slug -> kind */
const required = new Map();

for (const slug of discoverCharacterSlugs()) {
  required.set(slug, "character");
}
for (const slug of discoverShipSlugs()) {
  required.set(slug, "ship");
}
for (const s of index.subjects) {
  if (
    s.kind === "location" ||
    s.kind === "technology" ||
    s.kind === "faction" ||
    HUB_KINDS.has(s.kind)
  ) {
    required.set(s.slug, s.kind);
  }
}

for (const [slug, kind] of [...required.entries()].sort((a, b) =>
  a[0].localeCompare(b[0])
)) {
  checkSubject({ slug, kind });
}

const css = fs.readFileSync(path.join(root, "assets", "css", "wiki.css"), "utf8");
if (!css.includes(".infobox-image")) {
  errors.push("wiki.css missing .infobox-image rules");
}

// Orphan index entries
for (const s of index.subjects) {
  const pageSub = pageDirForKind(s.kind);
  if (!pageSub) {
    errors.push(`${s.slug}: index.json has unknown kind ${s.kind}`);
    continue;
  }
  const pageRel = path.join("pages", pageSub, `${s.slug}.html`);
  if (!fs.existsSync(path.join(root, pageRel))) {
    errors.push(`${s.slug}: index.json entry has no page at ${pageRel}`);
  }
}

if (errors.length) {
  console.error(`check-images: ${errors.length} failure(s)`);
  for (const e of errors) console.error(" -", e);
  process.exit(1);
}

const counts = {};
for (const kind of required.values()) {
  counts[kind] = (counts[kind] || 0) + 1;
}
const plurals = {
  character: "characters",
  ship: "ships",
  location: "locations",
  technology: "technologies",
  faction: "factions",
  hub: "hub pages",
};
const summary = Object.entries(counts)
  .map(([k, n]) => `${n} ${n === 1 ? k : plurals[k] || k + "s"}`)
  .join(" + ");
console.log(
  `check-images: OK — ${required.size} subjects (${summary}); briefs, images ≥${MIN_BYTES}B, infobox markup`
);
// silence unused
void FACTION_EXCLUDE;
