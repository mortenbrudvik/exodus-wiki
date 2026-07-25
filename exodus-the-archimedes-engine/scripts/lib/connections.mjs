/**
 * Builds the "Connections" strip from a page's own infobox.
 *
 * The strip is derived, never hand-authored. Every chip comes from a <dd> that
 * already links to a character page with an illustration, and its label is the
 * <dt> that introduced it. That means there is no new editorial field to keep up
 * to date, and the strip cannot drift from the infobox — it *is* the infobox,
 * shown as faces instead of a list of names.
 *
 * Used by scripts/build-connections.mjs for hand-authored pages and imported
 * directly by both generators, so the 25 generated pages stay byte-identical.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const PORTRAIT_DIR = path.join(ROOT, "assets", "images", "characters");

/** Fewer chips than this and the strip reads as an accident rather than a section. */
export const MIN_CHIPS = 3;

/** Labels that are not simply "drop the s". */
const SINGULAR = new Map([
  ["allies", "Ally"],
  ["enemies", "Enemy"],
  ["adversaries", "Adversary"],
  ["rivals", "Rival"],
  ["children", "Child"],
  ["crew", "Crew"],
  ["family", "Family"],
  ["issue", "Issue"],
]);

function singular(label) {
  const clean = label.replace(/<[^>]+>/g, "").trim().replace(/:$/, "");
  const key = clean.toLowerCase();
  if (SINGULAR.has(key)) return SINGULAR.get(key);
  const one = /s$/i.test(clean) && !/ss$/i.test(clean) ? clean.slice(0, -1) : clean;
  return one.charAt(0).toUpperCase() + one.slice(1);
}

let portraits = null;
function hasPortrait(slug) {
  if (!portraits) {
    portraits = new Set(
      fs.existsSync(PORTRAIT_DIR)
        ? fs.readdirSync(PORTRAIT_DIR).filter((f) => f.endsWith(".jpg")).map((f) => f.slice(0, -4))
        : []
    );
  }
  return portraits.has(slug);
}

/**
 * @param {string} infoboxHtml  the page's <aside class="infobox"> markup
 * @param {string} pageRel      the page's path relative to the wiki root
 * @param {string} indent       leading whitespace for the outer <section>
 * @returns {string} the section markup, or "" when there is nothing worth showing
 */
export function buildConnections(infoboxHtml, pageRel, indent = "        ") {
  if (!infoboxHtml) return "";

  const pageDir = path.posix.dirname(pageRel);
  const depth = pageRel.split("/").length - 1;
  const toRoot = "../".repeat(depth);
  const selfSlug = path.posix.basename(pageRel, ".html");

  const seen = new Set([selfSlug]);
  const chips = [];

  const pairs = infoboxHtml.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g);
  for (const [, dt, dd] of pairs) {
    const rel = singular(dt);
    for (const [, href, name] of dd.matchAll(/<a\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
      if (/^(https?:)?\/\//.test(href) || href.startsWith("#")) continue;

      const target = path.posix.normalize(path.posix.join(pageDir, href.split("#")[0]));
      if (path.posix.dirname(target) !== "pages/characters") continue;

      const slug = path.posix.basename(target, ".html");
      if (seen.has(slug) || !hasPortrait(slug)) continue;
      seen.add(slug);

      chips.push({
        href,
        rel,
        // Names arrive with markup (<em>, nested tags); the chip wants the words.
        name: name.replace(/<[^>]+>/g, "").trim(),
        img: `${toRoot}assets/images/characters/${slug}.jpg`,
      });
    }
  }

  if (chips.length < MIN_CHIPS) return "";

  const i = indent;
  const items = chips
    .map(
      (c) =>
        `${i}    <li><a href="${c.href}">` +
        `<img src="${c.img}" alt="" loading="lazy" decoding="async">` +
        `<span class="conn-who"><span class="conn-rel">${c.rel}</span>` +
        `<span class="conn-name">${c.name}</span></span></a></li>`
    )
    .join("\n");

  return (
    `${i}<section class="connections">\n` +
    `${i}  <h2>Connections</h2>\n` +
    `${i}  <ul>\n${items}\n${i}  </ul>\n` +
    `${i}</section>`
  );
}

/** Pull the infobox out of a full page, for callers that only have the page. */
export function infoboxOf(src) {
  const m = src.match(/<aside class="infobox">[\s\S]*?<\/aside>/);
  return m ? m[0] : "";
}
