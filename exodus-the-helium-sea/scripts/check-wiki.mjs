/**
 * Structural and editorial checks for the Helium Sea wiki.
 *
 *   node scripts/check-wiki.mjs           # run everything
 *   node scripts/check-wiki.mjs --quiet   # failures and warnings only
 *
 * Exits 1 if any hard check fails. Warnings are advisory and never fail the run:
 * they are heuristics (possible name drift, thin pages) that need human judgement.
 *
 * Companion to check-search-rank.mjs, which covers search behaviour and ranking.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..").replace(/\\/g, "/");
const QUIET = process.argv.includes("--quiet");

const failures = [];
const warnings = [];
const fail = (check, msg) => failures.push(`${check}: ${msg}`);
const warn = (check, msg) => warnings.push(`${check}: ${msg}`);
const rel = (p) => p.replace(/\\/g, "/").replace(ROOT + "/", "");
const note = (s) => {
  if (!QUIET) console.log(s);
};

const SKIP_DIRS = new Set([".git", ".idea", "docs", "node_modules", "scripts", "assets", "templates"]);

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith(".html")) acc.push(p.replace(/\\/g, "/"));
  }
  return acc;
}

const pages = walk(ROOT).sort();
const html = new Map(pages.map((p) => [p, fs.readFileSync(p, "utf8")]));

// search.html is reached through the header form, not a link; it is a legitimate orphan.
const ORPHAN_OK = new Set(["search.html"]);
// The Main Page is the category root; search.html is a UI route, not an article.
const NO_FOOTER_OK = new Set(["index.html", "search.html"]);
const NO_LEAD_OK = new Set(["search.html"]);

note(`\nHelium Sea wiki checks — ${pages.length} pages\n${"=".repeat(46)}`);

/* ------------------------------------------------------------------ *
 * 1. Link integrity and orphans
 * ------------------------------------------------------------------ */
const linkedFrom = new Map();
for (const p of pages) {
  const dir = path.dirname(p);
  const src = html.get(p);
  const check = (attrRe, label) => {
    for (const m of src.matchAll(attrRe)) {
      const target = m[1];
      if (/^(https?:|mailto:|#|data:)/.test(target)) continue;
      // Strip the fragment AND the cache-busting query: assets carry ?v=<hash>
      // (see scripts/stamp-assets.mjs), and the file on disk has no such suffix.
      const [file] = target.split("#")[0].split("?");
      if (!file) continue;
      const abs = path.resolve(dir, file).replace(/\\/g, "/");
      if (!fs.existsSync(abs)) fail("links", `${rel(p)} -> ${label}="${target}" does not exist`);
      else if (abs.startsWith(ROOT) && abs.endsWith(".html")) {
        if (!linkedFrom.has(rel(abs))) linkedFrom.set(rel(abs), []);
        linkedFrom.get(rel(abs)).push(rel(p));
      }
    }
  };
  check(/href="([^"]+)"/g, "href");
  check(/src="([^"]+)"/g, "src");
}
note(`  links            ${failures.length ? "FAIL" : "ok"}`);

for (const p of pages) {
  const r = rel(p);
  if (r === "index.html" || ORPHAN_OK.has(r)) continue;
  if (!linkedFrom.has(r)) warn("orphans", `${r} is not linked from any page`);
}

/* ------------------------------------------------------------------ *
 * 2. Search index: parity, coverage, integrity
 * ------------------------------------------------------------------ */
const jsonPath = ROOT + "/assets/data/search-index.json";
const jsPath = ROOT + "/assets/data/search-index.js";
const index = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const jsIndex = JSON.parse(
  fs.readFileSync(jsPath, "utf8").replace(/^[\s\S]*?=\s*/, "").replace(/;?\s*$/, "")
);

if (JSON.stringify(index) !== JSON.stringify(jsIndex)) {
  fail("index", "search-index.js and search-index.json have diverged — write both from one object");
}

const indexed = new Set();
for (const e of index) {
  if (indexed.has(e.path)) fail("index", `duplicate entry for ${e.path}`);
  indexed.add(e.path);
  if (!fs.existsSync(path.join(ROOT, e.path))) fail("index", `entry points at missing file ${e.path}`);
  for (const field of ["title", "category", "summary"]) {
    if (!e[field]) fail("index", `${e.path} has no ${field}`);
  }
  if (!e.keywords?.length) fail("index", `${e.path} has no keywords`);
  const target = html.get(ROOT + "/" + e.path);
  if (target) {
    const h1 = (target.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
    if (h1) {
      const plain = h1.replace(/<[^>]+>/g, "").trim();
      if (plain !== e.title) {
        warn("index", `${e.path} title "${e.title}" differs from its h1 "${plain}"`);
      }
    }
  }
}
for (const p of pages) {
  if (!indexed.has(rel(p))) fail("index", `${rel(p)} has no search index entry`);
}
note(`  index            ${failures.some((f) => f.startsWith("index")) ? "FAIL" : "ok"} (${index.length} entries)`);

/* ------------------------------------------------------------------ *
 * 3. Hub coverage — every page reachable from its category hub
 * ------------------------------------------------------------------ */
// Category hubs that must list every page under pages/<category>/.
for (const category of ["factions", "locations"]) {
  const hub = `pages/${category}/index.html`;
  const hubSrc = html.get(ROOT + "/" + hub);
  if (!hubSrc) {
    fail("hubs", `missing hub ${hub}`);
    continue;
  }
  const body = hubSrc.split(/<main class="content"[^>]*>/)[1] || "";
  const listed = new Set();
  for (const m of body.matchAll(/href="([^"]+)"/g)) {
    const [file] = m[1].split("#");
    if (!file || /^https?:/.test(file)) continue;
    const abs = path.resolve(path.dirname(ROOT + "/" + hub), file).replace(/\\/g, "/");
    if (abs.startsWith(ROOT)) listed.add(rel(abs));
  }
  for (const p of pages) {
    const r = rel(p);
    if (path.dirname(r) !== `pages/${category}` || r === hub) continue;
    if (!listed.has(r)) fail("hubs", `${r} is not listed on ${hub}`);
  }
}
note(`  hubs             ${failures.some((f) => f.startsWith("hubs")) ? "FAIL" : "ok"}`);

/* ------------------------------------------------------------------ *
 * 4. Shared chrome — nav, data-root, skip link, aria-current
 * ------------------------------------------------------------------ */
const navVariants = new Map();
for (const p of pages) {
  const src = html.get(p);
  const r = rel(p);

  // data-root is what search.js uses to resolve the index and result links.
  const depth = r.split("/").length - 1;
  const expected = depth === 0 ? "./" : "../".repeat(depth);
  const actual = (src.match(/data-root="([^"]*)"/) || [])[1];
  if (actual !== expected) fail("chrome", `${r} has data-root="${actual}", expected "${expected}"`);

  if (!/<a class="skip-link" href="#main-content">/.test(src)) fail("chrome", `${r} has no skip link`);
  if (!/<main class="content" id="main-content">/.test(src)) fail("chrome", `${r} has no #main-content landmark`);
  if (!/<meta name="viewport"/.test(src)) fail("chrome", `${r} has no viewport meta`);
  if (!/assets\/data\/search-index\.js/.test(src)) fail("chrome", `${r} does not load the index fallback`);
  if (!/assets\/js\/search\.js/.test(src)) fail("chrome", `${r} does not load search.js`);
  if (!/assets\/js\/lightbox\.js/.test(src)) fail("chrome", `${r} does not load lightbox.js`);
  if (!/<title>[^<]*— Helium Sea Wiki<\/title>/.test(src)) fail("chrome", `${r} title is not "… — Helium Sea Wiki"`);

  // Favicon: every page must link a real icon asset with depth-correct relative href.
  const iconHref = (src.match(/<link[^>]+rel="icon"[^>]*>/) || [])[0];
  if (!iconHref) {
    fail("chrome", `${r} has no favicon <link rel="icon">`);
  } else {
    const href = (iconHref.match(/href="([^"]+)"/) || [])[1];
    if (!href) {
      fail("chrome", `${r} favicon link has no href`);
    } else {
      const absIcon = path.resolve(path.dirname(p), href).replace(/\\/g, "/");
      if (!fs.existsSync(absIcon)) {
        fail("chrome", `${r} favicon href="${href}" does not resolve to a file`);
      } else if (fs.statSync(absIcon).size === 0) {
        fail("chrome", `${r} favicon resolves to an empty file`);
      }
    }
  }

  const h1s = [...src.matchAll(/<h1[^>]*>/g)];
  if (h1s.length !== 1) fail("chrome", `${r} has ${h1s.length} h1 elements, expected 1`);
  if (/\{\{[A-Z_]+\}\}/.test(src)) fail("chrome", `${r} still contains a template placeholder`);
  if (!NO_FOOTER_OK.has(r) && !/class="article-footer categories"/.test(src)) {
    fail("chrome", `${r} has no category footer`);
  }
  if (!NO_LEAD_OK.has(r) && !/class="lead"/.test(src)) fail("chrome", `${r} has no lead paragraph`);

  const nav = (src.match(/<nav aria-label="Wiki">([\s\S]*?)<\/nav>/) || [])[1];
  if (!nav) {
    fail("chrome", `${r} has no sidebar nav`);
    continue;
  }
  const labels = [...nav.matchAll(/>([^<>]+)<\/a>/g)].map((m) => m[1].trim()).join(" | ");
  if (!navVariants.has(labels)) navVariants.set(labels, []);
  navVariants.get(labels).push(r);

  // aria-current marks the link pointing at this very page, and nothing else.
  for (const m of nav.matchAll(/<a href="([^"]+)"([^>]*)>/g)) {
    const abs = path.resolve(path.dirname(p), m[1]).replace(/\\/g, "/");
    const isSelf = abs === p;
    const marked = /aria-current="page"/.test(m[2]);
    if (isSelf && !marked) fail("chrome", `${r} nav link to itself lacks aria-current="page"`);
    if (!isSelf && marked) fail("chrome", `${r} has aria-current on a link to ${rel(abs)}`);
  }
}
if (navVariants.size > 1) {
  fail("chrome", `sidebar nav differs across pages (${navVariants.size} variants)`);
  for (const [labels, list] of navVariants) {
    fail("chrome", `  [${list.length} pages] ${labels.slice(0, 90)} — e.g. ${list[0]}`);
  }
}
note(`  chrome           ${failures.some((f) => f.startsWith("chrome")) ? "FAIL" : "ok"}`);

/* ------------------------------------------------------------------ *
 * 5. Editorial voice — the wiki must not narrate its own sourcing
 * ------------------------------------------------------------------ */
const BANNED = [
  [/soft uncertainty/i, "sourcing-confidence label"],
  [/soft count/i, "sourcing-confidence label"],
  [/public (recaps?|lists?|lore|sources?|summaries|character lists?|mindline lists?)/i, "source as subject"],
  [/secondary (sources?|commentary|lore)/i, "source as subject"],
  [/official (character lists?|lore|and trailer materials)/i, "source as subject"],
  [/\bin recaps\b|\(recaps\)|endgame recaps|timeline recaps/i, "source as subject"],
  [/excerpt(:| lore| beats| scenes| diplomacy| claim)/i, "raw note artefact"],
  [/wikipedia/i, "citing an aggregator in article prose"],
  [/for wiki purposes/i, "editorial directive to the author"],
  [/this wiki (files|treats)|wiki seed/i, "fourth-wall break"],
  [/mindline list/i, "infobox provenance label"],
  [/\breviewers?\b|critics often|game sources/i, "real-world reception inside an in-universe article"],
];
// Prose files only: sources.html is the one page allowed to discuss sourcing.
const VOICE_EXEMPT = new Set(["pages/sources.html"]);
let voiceHits = 0;
for (const p of pages) {
  const r = rel(p);
  if (VOICE_EXEMPT.has(r)) continue;
  const body = html.get(p).split(/<main class="content"[^>]*>/)[1] || "";
  const lines = body.split(/\r?\n/);
  lines.forEach((line, i) => {
    const text = line.replace(/<[^>]+>/g, " ");
    for (const [re, why] of BANNED) {
      const m = text.match(re);
      if (m) {
        fail("voice", `${r}:${i + 1} "${m[0].trim()}" — ${why}`);
        voiceHits++;
      }
    }
  });
}
note(`  voice            ${voiceHits ? "FAIL" : "ok"}`);

/* ------------------------------------------------------------------ *
 * 6. Name drift — one entity spelled two ways
 * ------------------------------------------------------------------ */
/*
 * Comparing every capitalised word against every other drowns in English morphology
 * ("Operates"/"Operator") and sentence-initial function words. So instead: treat the
 * search index and the page headings as the curated entity vocabulary, and look for
 * RARE prose spellings that sit within an edit or two of a vocabulary entry. That is
 * the signature of drift — one established spelling plus a stray variant.
 */
const fold = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// Documented alternates and successive mindline hosts. Keyed on the folded spelling.
const DELIBERATE = new Set([
  "tallach te", // the Talloch-Te article documents this second spelling itself
  "tallach", // ...and the bare element appears in that same sentence
]);

const vocabulary = new Set();
for (const e of index) {
  vocabulary.add(fold(e.title));
  for (const k of e.keywords) vocabulary.add(fold(k));
}
for (const p of pages) {
  const h = (html.get(p).match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
  if (h) vocabulary.add(fold(h.replace(/<[^>]+>/g, "")));
}
// Individual elements of compound names count as known too (Makaio, Faraji, Detlef…).
for (const v of [...vocabulary]) {
  for (const part of v.split(" ")) if (part.length >= 5) vocabulary.add(part);
}

function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      best = Math.min(best, cur[j]);
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

// Only count capitalisation that cannot be explained by a sentence start or an infobox
// label — i.e. a capital in the middle of a running sentence. That is what separates a
// proper noun from "Interfaces" heading a <dt>.
const counts = new Map();
const seenIn = new Map();
for (const p of pages) {
  const body = (html.get(p).split(/<main class="content"[^>]*>/)[1] || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/g, " ");
  for (const m of body.matchAll(/\b[A-Z][a-zà-ÿ]{2,}(?:-[A-Z][a-zà-ÿ]{2,})*\b/g)) {
    // Keep only capitals that a sentence start or an infobox label cannot explain, so
    // "Interfaces" heading a <dt> is ignored while "and Iuntin-Detlef, senior" counts.
    const prev = body.slice(0, m.index).replace(/\s+$/, "").slice(-1);
    if (!prev || '.!?:;>"'.includes(prev)) continue;
    const token = fold(m[0].replace(/[’']s$/, ""));
    if (token.length < 6) continue;
    counts.set(token, (counts.get(token) || 0) + 1);
    if (!seenIn.has(token)) seenIn.set(token, new Set());
    seenIn.get(token).add(rel(p));
  }
}

const commonPrefix = (a, b) => {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
};
const isInflection = (a, b) => {
  const [s, l] = a.length <= b.length ? [a, b] : [b, a];
  return l === s + "s" || l === s + "es" || l === s.replace(/y$/, "ies");
};

/*
 * Compare prose against prose. A spelling used more than a handful of times is this
 * wiki's established form; anything rare and nearly identical to it is the suspect.
 * Matching rare prose against index *keywords* instead would flag ordinary English
 * ("operates" vs the keyword "operator"), because keywords are not all proper nouns.
 */
const RARE = 3;
const established = new Set();
for (const [token, n] of counts) if (n > RARE) established.add(token);
for (const p of pages) {
  const h = (html.get(p).match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1];
  if (!h) continue;
  const t = fold(h.replace(/<[^>]+>/g, ""));
  established.add(t);
  for (const part of t.split(" ")) if (part.length >= 6) established.add(part);
}
const establishedList = [...established].filter((v) => v.length >= 6);

let drifts = 0;
for (const [token, n] of [...counts].sort((a, b) => a[0].localeCompare(b[0]))) {
  if (n > RARE || vocabulary.has(token) || DELIBERATE.has(token)) continue;
  let near = null;
  for (const v of establishedList) {
    if (v === token || isInflection(token, v)) continue;
    // Drift keeps the stem and mangles the tail; unrelated names diverge immediately.
    if (commonPrefix(token, v) < 4) continue;
    if (editDistance(token, v, 2) <= 2) {
      near = v;
      break;
    }
  }
  if (!near) continue;
  drifts++;
  warn(
    "names",
    `"${token}" (${n}×, in ${[...seenIn.get(token)].slice(0, 2).join(", ")}) ` +
      `looks like a stray variant of the established "${near}"`
  );
}
note(`  names            ${drifts ? drifts + " to review" : "ok"} (${counts.size} names, ${vocabulary.size} in vocabulary)`);

/* ------------------------------------------------------------------ *
 * 7. Generated pages still match their generators
 * ------------------------------------------------------------------ */
// No generated pages in this wiki — book 1's gen-celestials/gen-dominions are a
// book-1 concept. Add entries here if this wiki ever grows a generator.
const GENERATORS = [];
let drift = 0;
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "wiki-gen-"));
try {
  for (const [script, subdir] of GENERATORS) {
    const out = path.join(scratch, subdir.replace("/", "-"));
    fs.mkdirSync(out, { recursive: true });
    execFileSync(process.execPath, [path.join(__dirname, script)], {
      env: { ...process.env, WIKI_OUT_DIR: out },
      stdio: "pipe",
    });
    for (const f of fs.readdirSync(out)) {
      const committed = path.join(ROOT, subdir, f);
      if (!fs.existsSync(committed)) {
        fail("generated", `${script} emits ${subdir}/${f}, which is not committed`);
        drift++;
        continue;
      }
      const a = fs.readFileSync(path.join(out, f), "utf8").replace(/\r\n/g, "\n");
      const b = fs.readFileSync(committed, "utf8").replace(/\r\n/g, "\n");
      if (a !== b) {
        fail("generated", `${subdir}/${f} differs from ${script} output — edit the script, then re-run it`);
        drift++;
      }
    }
  }
} finally {
  fs.rmSync(scratch, { recursive: true, force: true });
}
note(`  generated        ${drift ? "FAIL" : "ok"} (no generators in this wiki)`);

/* ------------------------------------------------------------------ *
 * 8. Thin pages should say so
 * ------------------------------------------------------------------ */
const THIN_WORDS = 120;
/* A category index is a list: its length measures how many articles the category
 * happens to contain, not how well it covers anything, and a stub notice on one
 * would be a lie. pages/technology/index.html sits at 119 words purely because
 * technology has six articles — it fell under the line when the hubs moved to
 * card markup and lost their " — " separators, which this counter treats as
 * words. The heuristic is for articles; hubs are exempt. */
const isCategoryIndex = (r) => /^pages\/[^/]+\/index\.html$/.test(r);
for (const p of pages) {
  const r = rel(p);
  if (NO_LEAD_OK.has(r) || isCategoryIndex(r)) continue;
  const body = (html.get(p).split(/<main class="content"[^>]*>/)[1] || "").replace(/<[^>]+>/g, " ");
  const words = body.split(/\s+/).filter(Boolean).length;
  if (words < THIN_WORDS && !/class="stub-notice"/.test(html.get(p))) {
    warn("thin", `${r} is ${words} words and carries no stub notice`);
  }
}

/* ------------------------------------------------------------------ *
 * Report
 * ------------------------------------------------------------------ */
if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}) — advisory, review by hand:`);
  for (const w of warnings) console.log("  " + w);
}
if (failures.length) {
  console.log(`\nFailures (${failures.length}):`);
  for (const f of failures) console.log("  " + f);
  console.log(`\ncheck-wiki: FAILED (${failures.length} problems)`);
  process.exit(1);
}
console.log(
  `\ncheck-wiki: OK — ${pages.length} pages, ${index.length} index entries, ` +
    `${warnings.length} warning${warnings.length === 1 ? "" : "s"}`
);
