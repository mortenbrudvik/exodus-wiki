import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";

const code = readFileSync(new URL("../assets/js/search.js", import.meta.url), "utf8");
const sandbox = { window: {}, document: { readyState: "complete", addEventListener() {}, querySelectorAll: () => [], querySelector: () => null, getElementById: () => null, body: { dataset: { root: "./" }, getAttribute: () => "./" } }, console };
vm.createContext(sandbox);
vm.runInContext(code + "\n;this.WikiSearch = window.WikiSearch;", sandbox);
const { normalizeQuery, scoreEntry, rankResults, resolvePath } = sandbox.window.WikiSearch;

const index = [
  { title: "Finn Jalgori-Tobu", path: "pages/characters/finn-jalgori-tobu.html", category: "Characters", summary: "Uranic protagonist", keywords: ["finbar", "hafnir"] },
  { title: "Archimedes Engine", path: "pages/technology/archimedes-engine.html", category: "Technology", summary: "Orbital engineering megastructure", keywords: ["engine", "dolod"] },
  { title: "Anoosha", path: "pages/locations/anoosha.html", category: "Locations", summary: "World where Finn is rescued", keywords: ["camurdy"] },
];

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

assert(normalizeQuery("  Finn ") === "finn", "normalizeQuery trims/lowercases");
assert(scoreEntry(index[0], "finn") >= 100, "title match scores high");
assert(scoreEntry(index[0], "hafnir") >= 40, "keyword match scores");
assert(scoreEntry(index[0], "protagonist") >= 10, "summary match scores");
assert(scoreEntry(index[0], "zzzz") === 0, "no match is zero");

const ranked = rankResults(index, "engine");
assert(ranked[0].title === "Archimedes Engine", "best match first");
assert(resolvePath("../../", "pages/book.html") === "../../pages/book.html", "resolvePath joins root");
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
  ["helena chione", "pages/characters/helena-chione.html"],
  ["makaio-faraji", "pages/characters/makaio.html"],
  ["uulana-shoigu", "pages/characters/uulana.html"],
  ["jolav-dabny", "pages/characters/lord-jolav.html"],
  ["malquilvo-beaumont", "pages/characters/malquilvo.html"],
  ["helena-thyra", "pages/characters/thyra.html"],
  ["celestials", "pages/factions/celestials.html"],
  ["tose", "pages/characters/tose.html"],
  ["minsterialis", "pages/characters/finn-jalgori-tobu.html"],
  ["terrik papuan", "pages/technology/zpz-generator.html"],
  ["cybele's eagle", "pages/locations/cybeles-eagle.html"],
  ["peter hamilton", "pages/book.html"],
  ["space opera", "pages/book.html"],
  ["hell welcomes careful drivers", "pages/characters/elsbeth-mcquillan.html"],
  ["boksrock", "pages/locations/boksrock.html"],
  // The ship Neusch lends Terence now has its own page, so the correct spelling and the earlier
  // misspelling both resolve to the hull rather than to the character who lends it.
  ["aeacus", "pages/locations/aeacus.html"],
  ["aecus", "pages/locations/aeacus.html"],
  // Hazard vocabulary belongs to the page that actually describes the encounter, not to the
  // technology the scene happens to be about: "nightweid" used to land on the Archimedes Engine
  // page, which never mentions them.
  ["nightweid", "pages/characters/elsbeth-mcquillan.html"],
  ["saberstones", "pages/characters/elsbeth-mcquillan.html"],
  // The Changelings page is where the setting's engineered underclass is explained, so the
  // species names and the drug taken from them resolve there rather than to a passing user.
  ["changelings", "pages/factions/changelings.html"],
  ["gath", "pages/factions/changelings.html"],
  ["moaksha", "pages/factions/changelings.html"],
  ["rekaul", "pages/factions/changelings.html"],
  // Two-word proper nouns must be indexed in full. Matching is query-as-substring-of-keyword,
  // so a bare head ("zetian", "camurdy", "helium") answers the one-word query but leaves the
  // longer, more natural query with nothing to match.
  ["zetian palace", "pages/locations/gondiar.html"],
  ["zetian", "pages/locations/gondiar.html"],
  ["camurdy mountains", "pages/locations/anoosha.html"],
  ["camurdy", "pages/locations/anoosha.html"],
  ["helium sea", "pages/factions/crown-dominion.html"],
  ["helium", "pages/factions/crown-dominion.html"],
  ["cherenkov blade", "pages/characters/marcellu.html"],
  // Vocabulary that carried no keyword at all: each is used across many pages but belongs to
  // the one that defines it.
  ["ghost units", "pages/factions/celestials.html"],
  ["kinnox", "pages/locations/kelowan.html"],
  // Indexed under the full name so the bare forename still matches as a substring.
  ["everett", "pages/characters/finn-jalgori-tobu.html"],
  ["everett callan mathias", "pages/characters/finn-jalgori-tobu.html"],
];
for (const [q, path] of EXPECTED) {
  const hits = rankResults(realIndex, q);
  assert(hits.length > 0, `query "${q}" returns no results`);
  assert(
    hits[0].path === path,
    `query "${q}" should rank ${path} first, got ${hits[0].path}`
  );
}

// Queries that must reach the individual Dominion pages, not just the roster.
const dominionHits = rankResults(realIndex, "dominions").map((h) => h.path);
for (const p of ["pages/factions/heresy-dominion.html", "pages/factions/elohim.html"]) {
  assert(dominionHits.includes(p), `"dominions" should reach ${p}`);
}

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
