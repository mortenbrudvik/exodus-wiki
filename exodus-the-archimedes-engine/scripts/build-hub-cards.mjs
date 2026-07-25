/**
 * Turns category-hub bullet lists into card grids that show the illustrations.
 *
 *   node scripts/build-hub-cards.mjs
 *
 * The hubs were the weakest pages on the site: pages/characters/index.html was
 * 40 names in three columns of grey text, and none of the 59 illustrations
 * appeared on any hub at all.
 *
 * Cards are applied per hub, by image coverage — a grid where most tiles are
 * letter-plates reads as broken images, so a hub only gets cards when most of
 * its entries have art (see COVERAGE_FLOOR). Factions, at 4 images across 14
 * pages, deliberately keeps its list.
 *
 * The card is NOT one big anchor. Hub descriptions contain their own links, and
 * nesting <a> inside <a> is invalid, so the image and name form one link and the
 * description stays a sibling with its links intact.
 *
 * Idempotent: a hub already carrying cards is skipped.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const IMAGE_ROOT = path.join(ROOT, "assets", "images");
const IMAGE_DIRS = ["characters", "ships", "locations", "technology", "factions"];

/** A hub needs this share of its entries illustrated before cards beat a list. */
const COVERAGE_FLOOR = 0.6;

const HUBS = [
  { page: "pages/characters/index.html", shape: "portrait" },
  { page: "pages/locations/index.html", shape: "wide" },
  { page: "pages/technology/index.html", shape: "wide" },
  { page: "pages/factions/index.html", shape: "wide" },
];

/** slug -> "characters/finn-jalgori-tobu.jpg", preferring the page's own category. */
function imageIndex() {
  const byDirSlug = new Map();
  const bySlug = new Map();
  for (const dir of IMAGE_DIRS) {
    const abs = path.join(IMAGE_ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of fs.readdirSync(abs)) {
      if (!file.endsWith(".jpg")) continue;
      const slug = file.slice(0, -4);
      byDirSlug.set(`${dir}/${slug}`, `${dir}/${file}`);
      if (!bySlug.has(slug)) bySlug.set(slug, `${dir}/${file}`);
    }
  }
  return { byDirSlug, bySlug };
}

/** Locate the <div class="hub-list"> … </div> region by counting div depth. */
function hubListRegion(src) {
  const open = src.indexOf('<div class="hub-list">');
  if (open === -1) return null;
  let depth = 0;
  const tag = /<\/?div\b/g;
  tag.lastIndex = open;
  let m;
  while ((m = tag.exec(src))) {
    depth += m[0] === "<div" ? 1 : -1;
    if (depth === 0) return { start: open, end: m.index + "</div>".length };
  }
  return null;
}

const ANCHOR = /<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/;

/** Split one <li> into its subject link and the description that follows. */
function parseItem(inner) {
  const m = inner.match(ANCHOR);
  if (!m) return null;
  const [full, href, name] = m;
  const rest = inner
    .slice(inner.indexOf(full) + full.length)
    .replace(/^\s*(—|&mdash;|-)\s*/, "")
    .trim();
  // In a list the description was a clause continuing "Name — owner of the…".
  // On a card it stands alone, so it takes a capital. A description opening with
  // a tag already starts on a proper noun and is left alone.
  const desc = /^[a-z]/.test(rest) ? rest[0].toUpperCase() + rest.slice(1) : rest;
  return { href, name: name.trim(), desc };
}

function monogram(name) {
  const plain = name.replace(/<[^>]+>/g, "").trim();
  return (plain[0] || "?").toUpperCase();
}

export function buildCards(src, hubPage, shape, images) {
  if (src.includes('class="hub-card"')) return { src, changed: false, coverage: 1 };

  const region = hubListRegion(src);
  if (!region) return { src, changed: false, coverage: 0 };

  const hubDir = path.posix.dirname(hubPage);
  const depth = hubPage.split("/").length - 1;
  const toRoot = "../".repeat(depth);

  const items = [];
  const block = src.slice(region.start, region.end);

  // First pass: resolve every entry so coverage can be measured before committing.
  const rewritten = block.replace(/<li>([\s\S]*?)<\/li>/g, (whole, inner) => {
    const item = parseItem(inner);
    if (!item) return whole;

    const target = path.posix.normalize(path.posix.join(hubDir, item.href));
    const slug = path.posix.basename(target, ".html");
    const category = path.posix.basename(path.posix.dirname(target));
    const rel = images.byDirSlug.get(`${category}/${slug}`) || images.bySlug.get(slug) || null;

    items.push(Boolean(rel));

    const shot = rel
      ? `<span class="hub-card__shot"><img src="${toRoot}assets/images/${rel}" alt="" loading="lazy" decoding="async"></span>`
      : `<span class="hub-card__shot hub-card__shot--mono" aria-hidden="true">${monogram(item.name)}</span>`;

    return (
      `<li class="hub-card">\n` +
      `                <a class="hub-card__link" href="${item.href}">\n` +
      `                  ${shot}\n` +
      `                  <span class="hub-card__name">${item.name}</span>\n` +
      `                </a>\n` +
      (item.desc ? `                <p class="hub-card__role">${item.desc}</p>\n` : "") +
      `              </li>`
    );
  });

  const coverage = items.length ? items.filter(Boolean).length / items.length : 0;
  if (coverage < COVERAGE_FLOOR) return { src, changed: false, coverage };

  // The container stops being a multi-column list of groups: each group now
  // spans the full width so its cards can flow across it. Without this the
  // section grid gives every card grid a single narrow lane.
  const withGrid = rewritten
    .replace('<div class="hub-list">', '<div class="hub-list hub-list--cards">')
    .replace(/<ul>/g, `<ul class="hub-cards hub-cards--${shape}">`);

  return {
    src: src.slice(0, region.start) + withGrid + src.slice(region.end),
    changed: true,
    coverage,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const images = imageIndex();
  for (const { page, shape } of HUBS) {
    const abs = path.join(ROOT, page);
    const src = fs.readFileSync(abs, "utf8");
    const { src: next, changed, coverage } = buildCards(src, page, shape, images);
    const pct = Math.round(coverage * 100);
    if (changed) {
      fs.writeFileSync(abs, next);
      console.log(`build-hub-cards: ${page} -> cards (${pct}% illustrated)`);
    } else if (src.includes('class="hub-card"')) {
      console.log(`build-hub-cards: ${page} already cards`);
    } else {
      console.log(
        `build-hub-cards: ${page} kept as a list (${pct}% illustrated, floor is ${COVERAGE_FLOOR * 100}%)`
      );
    }
  }
}
