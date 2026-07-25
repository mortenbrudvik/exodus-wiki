/**
 * Regroups the sidebar nav from one flat list of 11 links into four labelled
 * groups, on every page.
 *
 *   node scripts/regroup-nav.mjs
 *
 * The flat list put "Chapters" at the same level as "All book wikis" — an exit
 * link to a different site sitting among the wiki's own sections. The same 11
 * destinations stay; only their grouping and order change, and "All book wikis"
 * moves to the end where an exit belongs.
 *
 * check-wiki.mjs requires every page to produce an identical sequence of nav
 * *labels* — it reads anchor text, not markup — so the group headings are safe
 * but the link order is not: change it here and nowhere else, or the run fails
 * with "sidebar nav differs across pages".
 *
 * Idempotent: a page that already carries the grouped nav is left alone. Run it
 * after the generators, whose shells carry the same block.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SKIP_DIRS = new Set([".git", "docs", "node_modules", "scripts", "assets", "templates"]);

/** Groups, in render order. Targets are relative to the wiki root. */
export const NAV_GROUPS = [
  ["This wiki", [["index.html", "Main Page"], ["pages/book.html", "Book"]]],
  [
    "Articles",
    [
      ["pages/characters/index.html", "Characters"],
      ["pages/locations/index.html", "Locations"],
      ["pages/factions/index.html", "Factions"],
      ["pages/factions/dominions-roster.html", "Dominions"],
      ["pages/technology/index.html", "Technology"],
    ],
  ],
  [
    "Reading the novel",
    [
      ["pages/plot.html", "Plot"],
      ["pages/chapters.html", "Chapters"],
      ["pages/timeline.html", "Timeline"],
    ],
  ],
  // Outside the wiki root: one more ../ than everything else.
  ["Elsewhere", [["../index.html", "All book wikis"]]],
];

/** Collapse "../../" + "pages/x.html" into a clean relative href. */
function joinRel(root, target) {
  const parts = `${root}/${target}`.split("/").filter((s) => s && s !== ".");
  const out = [];
  for (const part of parts) {
    if (part === ".." && out.length && out[out.length - 1] !== "..") out.pop();
    else out.push(part);
  }
  return out.join("/") || "index.html";
}

export function buildNav(root, pageRel, indent = "      ") {
  const i = indent;
  const lines = [`${i}<nav aria-label="Wiki">`];

  for (const [label, links] of NAV_GROUPS) {
    lines.push(`${i}  <p class="nav-label">${label}</p>`);
    lines.push(`${i}  <ul>`);
    for (const [target, text] of links) {
      const href = joinRel(root, target);
      // aria-current belongs on a link to this very page, and only there.
      const isSelf = target !== "../index.html" && target === pageRel;
      const current = isSelf ? ' aria-current="page"' : "";
      lines.push(`${i}    <li><a href="${href}"${current}>${text}</a></li>`);
    }
    lines.push(`${i}  </ul>`);
  }

  lines.push(`${i}</nav>`);
  return lines.join("\n");
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
  const pages = walk(ROOT).sort();
  let changed = 0;

  for (const p of pages) {
    const src = fs.readFileSync(p, "utf8");
    if (src.includes('class="nav-label"')) continue;

    const rel = path.relative(ROOT, p).replace(/\\/g, "/");
    const root = (src.match(/data-root="([^"]*)"/) || [])[1];
    if (root === undefined) {
      console.error(`regroup-nav: ${rel} has no data-root`);
      process.exit(1);
    }

    const eol = src.includes("\r\n") ? "\r\n" : "\n";
    const nav = buildNav(root, rel).split("\n").join(eol);
    const next = src.replace(/^[ \t]*<nav aria-label="Wiki">[\s\S]*?<\/nav>/m, nav);
    if (next === src) {
      console.error(`regroup-nav: ${rel} has no sidebar nav to replace`);
      process.exit(1);
    }

    fs.writeFileSync(p, next);
    changed += 1;
  }

  console.log(`regroup-nav: ${changed} page(s) regrouped, ${pages.length - changed} already grouped`);
}
