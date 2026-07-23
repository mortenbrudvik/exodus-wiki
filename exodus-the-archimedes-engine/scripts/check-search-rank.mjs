import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
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

console.log("check-search-rank: OK");
