import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";

const code = readFileSync(new URL("../assets/js/search.js", import.meta.url), "utf8");
const sandbox = { window: {}, document: { readyState: "complete", addEventListener() {}, querySelectorAll: () => [], querySelector: () => null, getElementById: () => null, body: { dataset: { root: "./" }, getAttribute: () => "./" } }, console };
vm.createContext(sandbox);
vm.runInContext(code + "\n;this.WikiSearch = window.WikiSearch;", sandbox);
const { normalizeQuery, scoreEntry, rankResults, resolvePath } = sandbox.window.WikiSearch;

const index = [
  { title: "Exodus: The Helium Sea", path: "pages/book.html", category: "Book", summary: "Publication facts for the concluding novel", keywords: ["hamilton", "publication"] },
  { title: "Sources and provenance", path: "pages/sources.html", category: "Sources", summary: "What this wiki verifies and reconstructs", keywords: ["provenance", "coverage"] },
  { title: "Main Page", path: "index.html", category: "Main", summary: "Reading companion structure", keywords: ["home", "start"] },
];

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

assert(normalizeQuery("  Sources ") === "sources", "normalizeQuery trims/lowercases");
assert(scoreEntry(index[1], "sources") >= 100, "title match scores high");
assert(scoreEntry(index[1], "provenance") >= 40, "keyword match scores");
assert(scoreEntry(index[1], "verifies") >= 10, "summary match scores");
assert(scoreEntry(index[1], "zzzz") === 0, "no match is zero");

const ranked = rankResults(index, "helium sea");
assert(ranked[0].path === "pages/book.html", "best match first");
assert(resolvePath("../", "pages/book.html") === "../pages/book.html", "resolvePath joins root");
assert(resolvePath("./", "/pages/book.html") === "./pages/book.html", "strips leading slash");

// Folding drops case, diacritics and punctuation on both sides of the comparison, so a name
// typed with a space, without an apostrophe, or without its accent still finds the article.
assert(normalizeQuery("Helena-Chione") === "helena chione", "hyphen folds to space");
assert(normalizeQuery("Cybele’s Eagle") === "cybeles eagle", "apostrophe is dropped");
assert(normalizeQuery("Toše") === "tose", "diacritic folds to ASCII");
assert(normalizeQuery("  Peter F. Hamilton ") === "peter f hamilton", "punctuation folds");

// Ranking regressions: each query must land on the article that is actually about it, not on a
// page that merely mentions the name. Guards the alias/prefix weighting in scoreEntry.
const realIndex = JSON.parse(
  readFileSync(new URL("../assets/data/search-index.json", import.meta.url), "utf8")
);
const EXPECTED = [
  ["helium sea", "pages/book.html"],
  ["peter hamilton", "pages/book.html"],
  ["peter f. hamilton", "pages/book.html"],
  ["space opera", "pages/book.html"],
  ["2026", "pages/book.html"],
  ["archimedes engine", "pages/book.html"],
  ["provenance", "pages/sources.html"],
  ["coverage", "pages/sources.html"],
  ["spoilers", "pages/sources.html"],
  ["eternal unanimity", "pages/factions/eternal-unanimity-dominion.html"],
  ["eternal unanimity dominion", "pages/factions/eternal-unanimity-dominion.html"],
  ["unanimity", "pages/factions/eternal-unanimity-dominion.html"],
  ["factions", "pages/factions/index.html"],
];
for (const [q, path] of EXPECTED) {
  const hits = rankResults(realIndex, q);
  assert(hits.length > 0, `query "${q}" returns no results`);
  assert(
    hits[0].path === path,
    `query "${q}" should rank ${path} first, got ${hits[0].path}`
  );
}

// No multi-page reach assertions yet: with four pages there is no roster that could
// shadow the articles beneath it. Add them with the first category hub.

// Every entry must resolve to a file that exists, and no path may be indexed twice.
const seen = new Set();
for (const e of realIndex) {
  assert(!seen.has(e.path), `duplicate index path: ${e.path}`);
  seen.add(e.path);
  const abs = new URL("../" + e.path, import.meta.url);
  assert(existsSync(abs), `index entry points at a missing file: ${e.path}`);
  assert(e.title && e.category && e.summary && e.keywords?.length, `incomplete entry: ${e.path}`);
}

// The JSON index and the file:// fallback script must never drift apart.
const jsSrc = readFileSync(new URL("../assets/data/search-index.js", import.meta.url), "utf8");
const jsIndex = JSON.parse(jsSrc.replace(/^[\s\S]*?=\s*/, "").replace(/;?\s*$/, ""));
assert(
  JSON.stringify(jsIndex) === JSON.stringify(realIndex),
  "search-index.js and search-index.json are out of sync"
);

console.log(
  `check-search-rank: OK (${realIndex.length} entries, ${EXPECTED.length} ranking assertions)`
);
