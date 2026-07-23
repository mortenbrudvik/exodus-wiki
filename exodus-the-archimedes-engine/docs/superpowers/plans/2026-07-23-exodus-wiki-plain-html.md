# Exodus Wiki (Plain HTML) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page plain-HTML personal wiki for *Exodus: The Archimedes Engine* with shared modern-wiki styling, full-spoiler expanded lore, and client-side search.

**Architecture:** Hand-authored HTML articles under `pages/`, one shared stylesheet, and `search.js` that ranks a dual search index (`search-index.json` + `search-index.js`). Every page declares `data-root` so asset and result links resolve from nested folders. No build step, no framework.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript (ES2019+), optional local static server (`python -m http.server` or `npx serve`).

## Global Constraints

- Audience: personal reading companion (not a public platform).
- Spoilers: full spoilers allowed site-wide; banner on Main Page only.
- Content depth: expanded lore (overview, main + secondary characters, locations, factions, technology, timeline, plot).
- Writing: encyclopedic own-words summaries; no long novel quotations; prefer stubs over invented canon.
- Site shape: multi-page, one HTML file per article; `kebab-case.html` filenames.
- Look: clean modern wiki (sidebar + article + infobox), not a Wikipedia skin clone.
- Search: essential; dual index JSON + JS embed kept in sync.
- Build tooling: none for v1.
- **Do not create git commits** (user preference: never commit).
- Prefer public secondary sources for seed content; mark soft uncertainty when sources conflict (e.g. which queen is serving Empress at which date).
- Relative paths must work from root and from `pages/*/*`.

### File map (v1)

| Path | Responsibility |
|------|----------------|
| `assets/css/wiki.css` | Layout, typography, infobox, responsive menu, search UI |
| `assets/js/search.js` | Index load, ranking, dropdown, results page wiring |
| `assets/data/search-index.json` | Search corpus (array of entries) |
| `assets/data/search-index.js` | Same corpus as `window.WIKI_SEARCH_INDEX` |
| `templates/article.html` | Copy-paste starter with chrome + placeholders |
| `index.html` | Main Page |
| `search.html` | Full search results |
| `README.md` | How to open, add pages, keep index in sync |
| `pages/book.html` | Book overview |
| `pages/plot.html` | Full-spoiler plot summary |
| `pages/timeline.html` | Ordered events |
| `pages/characters/index.html` | Character hub |
| `pages/characters/*.html` | Character articles |
| `pages/locations/index.html` + `*.html` | Location hub + articles |
| `pages/factions/index.html` + `*.html` | Faction hub + articles |
| `pages/technology/index.html` + `*.html` | Technology hub + articles |
| `scripts/check-search-rank.mjs` | Tiny Node check for ranking pure functions |

### v1 page inventory (must exist)

**Foundation:** `index.html`, `search.html`, `pages/book.html`, four category hubs, `pages/plot.html`, `pages/timeline.html`

**Characters (full):** `finn-jalgori-tobu`, `eleanor-aponi`, `josias-aponi`, `helena-chione`, `thyra`, `terence-wilson-fletcher`, `lord-gahiji`, `andino`, `otylia-jalgori-tobu`, `clavissa`

**Characters (stub/secondary):** `zelinda-jalgori-tobu`, `carolien-amaia`, `olomo`, `liliana`, `medusa`, `elsbeth-mcquillan`, `dejean`, `bekket`

**Locations:** `centauri-cluster`, `crown-dominion-systems`, `kelowan`, `wynid`, `anoosha`, `gondiar`, `dolod`, `hafnir`, `arkship-diligent`

**Factions:** `crown-dominion`, `celestials`, `uranics`, `travelers`, `human-liberation`

**Technology:** `archimedes-engine`, `mindline`, `livestone`, `zpz-generator`, `entropy-drive`, `neural-interface`

### Shared chrome contract

Every HTML page must include:

```html
<body data-root="PATH_TO_SITE_ROOT">
```

Examples:

- Root pages (`index.html`, `search.html`): `data-root="./"`
- `pages/book.html`, `pages/plot.html`, `pages/timeline.html`: `data-root="../"`
- `pages/characters/foo.html`: `data-root="../../"`

Header search form action: `{data-root}search.html`  
CSS href: `{data-root}assets/css/wiki.css`  
Scripts (order): `{data-root}assets/data/search-index.js` then `{data-root}assets/js/search.js`

Sidebar links (adjust with `data-root`):

- Main Page → `{root}index.html`
- Book → `{root}pages/book.html`
- Characters → `{root}pages/characters/index.html`
- Locations → `{root}pages/locations/index.html`
- Factions → `{root}pages/factions/index.html`
- Technology → `{root}pages/technology/index.html`
- Timeline → `{root}pages/timeline.html`
- Plot → `{root}pages/plot.html`

### Search entry shape

```json
{
  "title": "string",
  "path": "index.html | search.html | pages/....html",
  "category": "Main | Book | Characters | Locations | Factions | Technology | Plot | Timeline | Search",
  "summary": "one line",
  "keywords": ["..."]
}
```

### Ranking rules (must match tests)

Given query `q` (trimmed, lowercased; empty → no results):

- Score entry: +100 if `title` contains `q`; +40 if any `keyword` contains `q`; +10 if `summary` contains `q`
- Drop score 0
- Sort by score desc, then `title` localeCompare asc
- Dropdown shows top 8; full page shows all

---

### Task 1: Stylesheet, article template, README

**Files:**
- Create: `assets/css/wiki.css`
- Create: `templates/article.html`
- Create: `README.md`

**Interfaces:**
- Consumes: none
- Produces: CSS class contract used by all pages:
  - Layout: `.site-header`, `.menu-toggle`, `.layout`, `.sidebar`, `.sidebar.is-open`, `.content`, `.article`, `.infobox`, `.article-footer`, `.stub-notice`, `.spoiler-banner`, `.categories`
  - Search: `.search-form`, `.search-input`, `.search-dropdown`, `.search-dropdown.is-open`, `.search-hit`, `.search-empty`, `.search-error`
  - Prose: `.lead`, article `h1`/`h2`/`h3`, `.wiki-table`

- [ ] **Step 1: Create `assets/css/wiki.css`**

```css
/* Exodus wiki — clean modern wiki layout */
:root {
  --bg: #f6f7f9;
  --surface: #ffffff;
  --text: #1a1a1a;
  --muted: #5c6570;
  --border: #d8dee6;
  --link: #0b57d0;
  --link-visited: #5b2a86;
  --accent: #1f3a5f;
  --banner-bg: #fff4e5;
  --banner-border: #e0a800;
  --stub-bg: #eef6ff;
  --sidebar-width: 15rem;
  --content-max: 48rem;
  --font: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  margin: 0;
  font-family: var(--font);
  color: var(--text);
  background: var(--bg);
  line-height: 1.55;
}

a {
  color: var(--link);
}

a:visited {
  color: var(--link-visited);
}

.site-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  padding: 0.75rem 1rem;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
}

.site-title {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  margin-right: auto;
}

.site-title:visited {
  color: var(--accent);
}

.menu-toggle {
  display: none;
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 0.4rem 0.75rem;
  border-radius: 0.35rem;
  cursor: pointer;
  font: inherit;
}

.search-form {
  position: relative;
  display: flex;
  gap: 0.35rem;
  min-width: min(100%, 18rem);
  flex: 1 1 14rem;
  max-width: 22rem;
}

.search-input {
  flex: 1;
  padding: 0.45rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 0.35rem;
  font: inherit;
}

.search-form button {
  padding: 0.45rem 0.75rem;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;
  border-radius: 0.35rem;
  cursor: pointer;
  font: inherit;
}

.search-dropdown {
  display: none;
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.35rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  max-height: 20rem;
  overflow: auto;
  z-index: 30;
}

.search-dropdown.is-open {
  display: block;
}

.search-hit {
  display: block;
  padding: 0.55rem 0.75rem;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid var(--border);
}

.search-hit:last-child {
  border-bottom: 0;
}

.search-hit:hover,
.search-hit:focus {
  background: #f0f4fa;
}

.search-hit .hit-title {
  font-weight: 600;
  color: var(--link);
}

.search-hit .hit-meta {
  font-size: 0.85rem;
  color: var(--muted);
}

.search-empty,
.search-error {
  padding: 0.75rem;
  color: var(--muted);
}

.layout {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  gap: 0;
  min-height: calc(100vh - 4rem);
}

.sidebar {
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 1rem 0.75rem 2rem;
}

.sidebar nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar nav a {
  display: block;
  padding: 0.4rem 0.6rem;
  border-radius: 0.3rem;
  text-decoration: none;
}

.sidebar nav a:hover,
.sidebar nav a[aria-current="page"] {
  background: #e8eef7;
}

.content {
  padding: 1.25rem 1.25rem 3rem;
}

.article {
  max-width: calc(var(--content-max) + 16rem);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, var(--content-max)) minmax(12rem, 16rem);
  gap: 1.25rem 1.5rem;
  align-items: start;
}

.article > header,
.article > .lead,
.article > section,
.article > .stub-notice,
.article > .article-footer,
.article > .categories {
  grid-column: 1;
}

.article > .infobox {
  grid-column: 2;
  grid-row: 1 / span 8;
}

.article h1 {
  margin: 0 0 0.5rem;
  font-size: 1.85rem;
  line-height: 1.2;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.35rem;
}

.lead {
  font-size: 1.05rem;
  color: #222;
}

.article section h2 {
  margin: 1.5rem 0 0.5rem;
  font-size: 1.25rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.2rem;
}

.article section h3 {
  margin: 1rem 0 0.35rem;
  font-size: 1.05rem;
}

.infobox {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.4rem;
  padding: 0.75rem;
  font-size: 0.92rem;
}

.infobox h2 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  text-align: center;
}

.infobox dl {
  margin: 0;
}

.infobox dt {
  font-weight: 600;
  margin-top: 0.45rem;
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.infobox dd {
  margin: 0.1rem 0 0;
}

.spoiler-banner {
  background: var(--banner-bg);
  border: 1px solid var(--banner-border);
  border-radius: 0.4rem;
  padding: 0.75rem 1rem;
  margin: 0 0 1rem;
}

.stub-notice {
  background: var(--stub-bg);
  border: 1px solid #b7d0f0;
  border-radius: 0.4rem;
  padding: 0.65rem 0.85rem;
  margin: 0 0 1rem;
}

.categories {
  margin-top: 1.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
  font-size: 0.95rem;
}

.categories a {
  margin-right: 0.5rem;
}

.wiki-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0.75rem 0;
  font-size: 0.95rem;
}

.wiki-table th,
.wiki-table td {
  border: 1px solid var(--border);
  padding: 0.4rem 0.55rem;
  text-align: left;
  vertical-align: top;
}

.wiki-table th {
  background: #eef2f7;
}

.hub-list {
  columns: 2;
  gap: 1.5rem;
}

.hub-list ul {
  margin-top: 0.25rem;
}

@media (max-width: 960px) {
  .article {
    grid-template-columns: 1fr;
  }

  .article > .infobox {
    grid-column: 1;
    grid-row: auto;
    order: -1;
  }

  .hub-list {
    columns: 1;
  }
}

@media (max-width: 720px) {
  .menu-toggle {
    display: inline-block;
  }

  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }

  .sidebar.is-open {
    display: block;
  }
}
```

- [ ] **Step 2: Create `templates/article.html`**

Use placeholders `{{TITLE}}`, `{{ROOT}}` (e.g. `../../`), `{{CATEGORY_HREF}}`, `{{CATEGORY_NAME}}`. Include full chrome:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{TITLE}} — Exodus Wiki</title>
  <link rel="stylesheet" href="{{ROOT}}assets/css/wiki.css">
</head>
<body data-root="{{ROOT}}">
  <header class="site-header">
    <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-sidebar">Menu</button>
    <a class="site-title" href="{{ROOT}}index.html">Exodus Wiki</a>
    <form class="search-form" action="{{ROOT}}search.html" method="get" role="search">
      <input class="search-input" type="search" name="q" placeholder="Search wiki…" autocomplete="off" aria-label="Search">
      <button type="submit">Search</button>
      <div class="search-dropdown" hidden></div>
    </form>
  </header>
  <div class="layout">
    <aside class="sidebar" id="site-sidebar">
      <nav aria-label="Wiki">
        <ul>
          <li><a href="{{ROOT}}index.html">Main Page</a></li>
          <li><a href="{{ROOT}}pages/book.html">Book</a></li>
          <li><a href="{{ROOT}}pages/characters/index.html">Characters</a></li>
          <li><a href="{{ROOT}}pages/locations/index.html">Locations</a></li>
          <li><a href="{{ROOT}}pages/factions/index.html">Factions</a></li>
          <li><a href="{{ROOT}}pages/technology/index.html">Technology</a></li>
          <li><a href="{{ROOT}}pages/timeline.html">Timeline</a></li>
          <li><a href="{{ROOT}}pages/plot.html">Plot</a></li>
        </ul>
      </nav>
    </aside>
    <main class="content">
      <article class="article">
        <header>
          <h1>{{TITLE}}</h1>
        </header>
        <!-- Optional: <p class="stub-notice"><strong>Stub:</strong> expand when more is known.</p> -->
        <aside class="infobox">
          <h2>{{TITLE}}</h2>
          <dl>
            <dt>Type</dt>
            <dd>…</dd>
          </dl>
        </aside>
        <p class="lead">Lead paragraph (2–4 sentences).</p>
        <section>
          <h2>Background</h2>
          <p>…</p>
        </section>
        <section>
          <h2>Role in the story</h2>
          <p>…</p>
        </section>
        <footer class="article-footer categories">
          Categories:
          <a href="{{CATEGORY_HREF}}">{{CATEGORY_NAME}}</a>
        </footer>
      </article>
    </main>
  </div>
  <script src="{{ROOT}}assets/data/search-index.js"></script>
  <script src="{{ROOT}}assets/js/search.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create `README.md`**

```markdown
# Exodus: The Archimedes Engine Wiki

Personal full-spoiler reading companion in plain HTML.

## Open the wiki

From the project root:

```bash
python -m http.server 8080
```

Then open http://localhost:8080/

Search also loads an embedded index script, so basic search may work via `file://`, but a local server is preferred.

## Add a page

1. Copy `templates/article.html` to the right folder under `pages/`.
2. Set `data-root` / `{{ROOT}}` (`../` or `../../`).
3. Write lead, sections, infobox.
4. Link from the category hub.
5. Add the **same** entry to `assets/data/search-index.json` and `assets/data/search-index.js`.
6. Wikilink related articles.

## Conventions

- Filenames: `kebab-case.html`
- Full spoilers are expected
- Prefer stubs over invented canon
```

- [ ] **Step 4: Verify files exist**

Run:

```powershell
Test-Path assets/css/wiki.css, templates/article.html, README.md
```

Expected: `True` for each.

---

### Task 2: Search module, dual index scaffold, search page, ranking check

**Files:**
- Create: `assets/js/search.js`
- Create: `assets/data/search-index.json` (minimal seed; expanded in later tasks)
- Create: `assets/data/search-index.js`
- Create: `search.html`
- Create: `scripts/check-search-rank.mjs`

**Interfaces:**
- Consumes: `window.WIKI_SEARCH_INDEX` optional array; `body[data-root]`; `.search-form` / `.search-input` / `.search-dropdown`
- Produces (on `window.WikiSearch`):
  - `normalizeQuery(q: string): string`
  - `scoreEntry(entry, q: string): number`
  - `rankResults(index: Array, q: string): Array`
  - `resolvePath(root: string, path: string): string`
  - `initSearch(): void`

- [ ] **Step 1: Write ranking checker first (expected fail if search.js missing)**

Create `scripts/check-search-rank.mjs`:

```js
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import vm from "node:vm";

const code = readFileSync(new URL("../assets/js/search.js", import.meta.url), "utf8");
const sandbox = { window: {}, document: { readyState: "complete", addEventListener() {}, querySelectorAll: () => [], querySelector: () => null, body: { dataset: { root: "./" } } }, console };
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
```

- [ ] **Step 2: Run checker — expect failure**

```powershell
node scripts/check-search-rank.mjs
```

Expected: error loading or missing `WikiSearch`.

- [ ] **Step 3: Implement `assets/js/search.js`**

```js
(function (window, document) {
  "use strict";

  function normalizeQuery(q) {
    return String(q || "").trim().toLowerCase();
  }

  function scoreEntry(entry, q) {
    if (!q) return 0;
    var score = 0;
    var title = String(entry.title || "").toLowerCase();
    var summary = String(entry.summary || "").toLowerCase();
    var keywords = Array.isArray(entry.keywords) ? entry.keywords : [];
    if (title.indexOf(q) !== -1) score += 100;
    for (var i = 0; i < keywords.length; i++) {
      if (String(keywords[i]).toLowerCase().indexOf(q) !== -1) {
        score += 40;
        break;
      }
    }
    if (summary.indexOf(q) !== -1) score += 10;
    return score;
  }

  function rankResults(index, q) {
    var query = normalizeQuery(q);
    if (!query) return [];
    var scored = [];
    for (var i = 0; i < index.length; i++) {
      var s = scoreEntry(index[i], query);
      if (s > 0) scored.push({ entry: index[i], score: s });
    }
    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return String(a.entry.title).localeCompare(String(b.entry.title));
    });
    return scored.map(function (x) { return x.entry; });
  }

  function resolvePath(root, path) {
    var r = root || "./";
    if (r.slice(-1) !== "/") r += "/";
    var p = String(path || "").replace(/^\//, "");
    return r + p;
  }

  var cachedIndex = null;
  var loading = null;

  function getRoot() {
    var body = document.body;
    return (body && body.getAttribute("data-root")) || "./";
  }

  function loadIndex() {
    if (cachedIndex) return Promise.resolve(cachedIndex);
    if (Array.isArray(window.WIKI_SEARCH_INDEX) && window.WIKI_SEARCH_INDEX.length) {
      cachedIndex = window.WIKI_SEARCH_INDEX;
      return Promise.resolve(cachedIndex);
    }
    if (loading) return loading;
    var url = resolvePath(getRoot(), "assets/data/search-index.json");
    loading = fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        cachedIndex = Array.isArray(data) ? data : [];
        return cachedIndex;
      })
      .catch(function (err) {
        loading = null;
        throw err;
      });
    return loading;
  }

  function renderHits(container, hits, root) {
    container.innerHTML = "";
    if (!hits.length) {
      var empty = document.createElement("div");
      empty.className = "search-empty";
      empty.textContent = "No pages matched — try a character or faction name.";
      container.appendChild(empty);
      return;
    }
    hits.forEach(function (hit) {
      var a = document.createElement("a");
      a.className = "search-hit";
      a.href = resolvePath(root, hit.path);
      a.innerHTML =
        '<div class="hit-title"></div><div class="hit-meta"></div>';
      a.querySelector(".hit-title").textContent = hit.title;
      a.querySelector(".hit-meta").textContent =
        (hit.category || "") + (hit.summary ? " — " + hit.summary : "");
      container.appendChild(a);
    });
  }

  function wireForm(form) {
    var input = form.querySelector(".search-input");
    var dropdown = form.querySelector(".search-dropdown");
    if (!input || !dropdown) return;
    var root = getRoot();
    var timer = null;

    function close() {
      dropdown.classList.remove("is-open");
      dropdown.hidden = true;
    }

    function open() {
      dropdown.hidden = false;
      dropdown.classList.add("is-open");
    }

    input.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var q = input.value;
        if (!normalizeQuery(q)) {
          close();
          return;
        }
        loadIndex()
          .then(function (index) {
            var hits = rankResults(index, q).slice(0, 8);
            renderHits(dropdown, hits, root);
            open();
          })
          .catch(function () {
            dropdown.innerHTML = '<div class="search-error">Search index failed to load. Use a local server or check search-index.js.</div>';
            open();
          });
      }, 150);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    document.addEventListener("click", function (e) {
      if (!form.contains(e.target)) close();
    });
  }

  function wireMenu() {
    var btn = document.querySelector(".menu-toggle");
    var sidebar = document.getElementById("site-sidebar");
    if (!btn || !sidebar) return;
    btn.addEventListener("click", function () {
      var open = sidebar.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function wireResultsPage() {
    var mount = document.getElementById("search-results");
    if (!mount) return;
    var params = new URLSearchParams(window.location.search);
    var q = params.get("q") || "";
    var input = document.querySelector(".search-input");
    if (input) input.value = q;
    var root = getRoot();
    var heading = document.getElementById("search-query-label");
    if (heading) heading.textContent = q ? 'Results for “' + q + '”' : "Search";
    loadIndex()
      .then(function (index) {
        var hits = rankResults(index, q);
        if (!normalizeQuery(q)) {
          mount.innerHTML = '<p class="search-empty">Type a query in the search box.</p>';
          return;
        }
        if (!hits.length) {
          mount.innerHTML = '<p class="search-empty">No pages matched “' + q.replace(/</g, "") + '” — try a character or faction name.</p>';
          return;
        }
        var ul = document.createElement("ul");
        hits.forEach(function (hit) {
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.href = resolvePath(root, hit.path);
          a.textContent = hit.title;
          li.appendChild(a);
          var meta = document.createElement("div");
          meta.className = "hit-meta";
          meta.textContent = (hit.category || "") + (hit.summary ? " — " + hit.summary : "");
          li.appendChild(meta);
          ul.appendChild(li);
        });
        mount.innerHTML = "";
        mount.appendChild(ul);
      })
      .catch(function () {
        mount.innerHTML = '<p class="search-error">Search index failed to load. Prefer <code>python -m http.server</code> from the project root, and ensure <code>assets/data/search-index.js</code> is present.</p>';
      });
  }

  function initSearch() {
    wireMenu();
    document.querySelectorAll(".search-form").forEach(wireForm);
    wireResultsPage();
  }

  window.WikiSearch = {
    normalizeQuery: normalizeQuery,
    scoreEntry: scoreEntry,
    rankResults: rankResults,
    resolvePath: resolvePath,
    initSearch: initSearch,
    loadIndex: loadIndex,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearch);
  } else {
    initSearch();
  }
})(window, document);
```

- [ ] **Step 4: Seed dual index (foundation only; later tasks append)**

`assets/data/search-index.json`:

```json
[
  {
    "title": "Main Page",
    "path": "index.html",
    "category": "Main",
    "summary": "Exodus wiki home and spoiler notice",
    "keywords": ["home", "start", "wiki"]
  },
  {
    "title": "Search",
    "path": "search.html",
    "category": "Search",
    "summary": "Full search results",
    "keywords": ["find"]
  }
]
```

`assets/data/search-index.js`:

```js
window.WIKI_SEARCH_INDEX = [
  {
    "title": "Main Page",
    "path": "index.html",
    "category": "Main",
    "summary": "Exodus wiki home and spoiler notice",
    "keywords": ["home", "start", "wiki"]
  },
  {
    "title": "Search",
    "path": "search.html",
    "category": "Search",
    "summary": "Full search results",
    "keywords": ["find"]
  }
];
```

- [ ] **Step 5: Create `search.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Search — Exodus Wiki</title>
  <link rel="stylesheet" href="assets/css/wiki.css">
</head>
<body data-root="./">
  <header class="site-header">
    <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-sidebar">Menu</button>
    <a class="site-title" href="index.html">Exodus Wiki</a>
    <form class="search-form" action="search.html" method="get" role="search">
      <input class="search-input" type="search" name="q" placeholder="Search wiki…" autocomplete="off" aria-label="Search">
      <button type="submit">Search</button>
      <div class="search-dropdown" hidden></div>
    </form>
  </header>
  <div class="layout">
    <aside class="sidebar" id="site-sidebar">
      <nav aria-label="Wiki">
        <ul>
          <li><a href="index.html">Main Page</a></li>
          <li><a href="pages/book.html">Book</a></li>
          <li><a href="pages/characters/index.html">Characters</a></li>
          <li><a href="pages/locations/index.html">Locations</a></li>
          <li><a href="pages/factions/index.html">Factions</a></li>
          <li><a href="pages/technology/index.html">Technology</a></li>
          <li><a href="pages/timeline.html">Timeline</a></li>
          <li><a href="pages/plot.html">Plot</a></li>
        </ul>
      </nav>
    </aside>
    <main class="content">
      <article class="article" style="grid-template-columns: 1fr;">
        <header>
          <h1 id="search-query-label">Search</h1>
        </header>
        <div id="search-results"></div>
      </article>
    </main>
  </div>
  <script src="assets/data/search-index.js"></script>
  <script src="assets/js/search.js"></script>
</body>
</html>
```

- [ ] **Step 6: Run ranking checker — expect pass**

```powershell
node scripts/check-search-rank.mjs
```

Expected: `check-search-rank: OK`

---

### Task 3: Main Page, book overview, category hubs

**Files:**
- Create: `index.html`
- Create: `pages/book.html`
- Create: `pages/characters/index.html`
- Create: `pages/locations/index.html`
- Create: `pages/factions/index.html`
- Create: `pages/technology/index.html`
- Modify: both search index files (add Book + hub entries)

**Interfaces:**
- Consumes: chrome contract, CSS, search scripts from Task 1–2
- Produces: navigable foundation pages with `data-root` set correctly

- [ ] **Step 1: Create `index.html` (Main Page)**

Include spoiler banner, short intro, and links to Book / Characters / Locations / Factions / Technology / Timeline / Plot. State that the wiki is a personal full-spoiler companion for Peter F. Hamilton’s novel (prequel context for the *Exodus* game universe is fine in one sentence). Use `data-root="./"` and full header/sidebar chrome as in `search.html`.

Lead content requirements:

- What the wiki is for
- Spoiler banner text: “This wiki assumes you have finished *Exodus: The Archimedes Engine*. Articles contain full spoilers.”
- “Start here” list linking to Book, Plot, Timeline, and major characters Finn / Thyra / Terence once those files exist (link them anyway; Task 4 creates them)

- [ ] **Step 2: Create `pages/book.html`**

`data-root="../"`. Infobox: Title, Author (Peter F. Hamilton), Publisher (Random House Worlds), Published (17 September 2024), Pages (~928), Series (Exodus; followed by *Exodus: The Helium Sea*), Genre (science fiction / space opera).

Sections:

- **Overview** — distant future Centauri Cluster; Celestials vs later-arriving humans; Crown Dominion politics; arkship *Diligent* thread
- **Setting** — link Locations / Factions / Technology hubs
- **Major characters** — short list with links (files from Task 4+)
- **See also** — Plot, Timeline

- [ ] **Step 3: Create four category hubs**

Each hub: `data-root="../../"` (they live in `pages/<cat>/index.html`), heading, brief intro, `<div class="hub-list">` with lists matching the v1 inventory (link every planned file even if created in later tasks).

- `pages/characters/index.html` — groups: Protagonists & Diligent; Celestial court; Gondiar humans; Travelers & others
- `pages/locations/index.html` — alphabetical list of location pages
- `pages/factions/index.html` — faction list
- `pages/technology/index.html` — tech list

- [ ] **Step 4: Update dual search index**

Add entries for Book + four hubs (titles: “Characters”, “Locations”, “Factions”, “Technology” hubs with paths to each `index.html`). Keep JSON and JS identical arrays.

- [ ] **Step 5: Smoke-open foundation**

```powershell
python -m http.server 8080
```

Browse `http://localhost:8080/`, open Book and each hub, confirm CSS loads and Menu works at narrow width. Stop server when done.

---

### Task 4: Core character articles

**Files:**
- Create all full character pages under `pages/characters/`:
  - `finn-jalgori-tobu.html`
  - `eleanor-aponi.html`
  - `josias-aponi.html`
  - `helena-chione.html`
  - `thyra.html`
  - `terence-wilson-fletcher.html`
  - `lord-gahiji.html`
  - `andino.html`
  - `otylia-jalgori-tobu.html`
  - `clavissa.html`
- Modify: dual search index (add all ten)

**Interfaces:**
- Consumes: `templates/article.html` pattern; `data-root="../../"`
- Produces: encyclopedic articles with infobox + lead + ≥2 sections + category footer; wikilinks to locations/factions/tech (may 404 until later tasks — create correct hrefs now)

- [ ] **Step 1: Write the ten full articles**

For each page use the shared chrome. Content minimums (own words; full spoilers OK):

| File | Infobox keys | Must cover |
|------|--------------|------------|
| `finn-jalgori-tobu.html` | Affiliation Uranic / Jalgori-Tobu; Role protagonist; Home Gondiar / Hafnir | Survives dump over Anoosha; alliance with *Diligent*; ZPZ & Engine plot; family |
| `eleanor-aponi.html` | Affiliation *Diligent*; Relation Josias | Rescues Finn; lieutenant/ally; memory/rekaul beat re Gyvoy |
| `josias-aponi.html` | Role owner *Diligent* / agitator | Rhetoric; Hafnir deal; politics; Regal Democrats; broadcast strike |
| `helena-chione.html` | Title Now and Forever Queen of Wynid | Court; mindline; pregnancy/succession pressures; Thyra’s usurpation → Helena-Thyra thread |
| `thyra.html` | Title Congregant → Queen of Wynid | Trials; mindline hijack; hardline politics; Dolod/Boksrock endgame |
| `terence-wilson-fletcher.html` | Role detective Santa Rosa | Informant network; Celestial archon contact; Makaio-Spirit; manhunt threads |
| `lord-gahiji.html` | Role Chief Archon (Helena) | Political operator; later court shifts |
| `andino.html` | Role captain *Arcadia’s Moon* | Traveler involvement; ambiguous motives |
| `otylia-jalgori-tobu.html` | Relation Finn’s twin | Serki/ministerial role; marriage to Josias; later crisis |
| `clavissa.html` | Relation Helena’s congregant daughter | Court dynamics; survival of politics under Thyra |

Cross-link liberally (`../locations/…`, `../factions/…`, `../technology/…`, sibling characters).

- [ ] **Step 2: Add ten search entries** to JSON + JS (keywords include aliases: Finbar, Ellie, Helena-Thyra, etc.)

- [ ] **Step 3: Spot-check**

Open `pages/characters/finn-jalgori-tobu.html` via local server; confirm styles, sidebar, and search dropdown for “finn”.

---

### Task 5: Location articles

**Files:**
- Create under `pages/locations/`:
  - `centauri-cluster.html`
  - `crown-dominion-systems.html`
  - `kelowan.html`
  - `wynid.html`
  - `anoosha.html`
  - `gondiar.html`
  - `dolod.html`
  - `hafnir.html`
  - `arkship-diligent.html` (treat ship as location/setting page)
- Modify: dual search index

- [ ] **Step 1: Write nine location articles** (`data-root="../../"`)

| File | Must cover |
|------|------------|
| `centauri-cluster.html` | Far-future human sphere after Sol exodus; stage for Celestial dominions |
| `crown-dominion-systems.html` | Six systems / queens overview; rotation of Empress; link Kelowan, Wynid |
| `kelowan.html` | Dominion capital system; Imperial politics; HeSea economic stakes; endgame chaos |
| `wynid.html` | Helena-Chione’s seat; trials; Thyra’s coup |
| `anoosha.html` | Crash/rescue; Camurdy Mountains; livestone beat |
| `gondiar.html` | Santa Rosa; Jalgori-Tobu; Terence; crackdowns |
| `dolod.html` | Iron exotic gas giant / Engine; trajectory crisis |
| `hafnir.html` | Land deal settlement for *Diligent* humans |
| `arkship-diligent.html` | Late arkship; crew; refits; ZPZ; final maneuvers |

- [ ] **Step 2: Dual index entries** for all nine

- [ ] **Step 3: From Main Page → Locations hub → Kelowan → linked character**, confirm no broken CSS paths

---

### Task 6: Faction articles

**Files:**
- Create under `pages/factions/`:
  - `crown-dominion.html`
  - `celestials.html`
  - `uranics.html`
  - `travelers.html`
  - `human-liberation.html`
- Modify: dual search index

- [ ] **Step 1: Write five faction articles**

| File | Must cover |
|------|------------|
| `crown-dominion.html` | Imperial Accord among queens; human underclass; capital Kelowan |
| `celestials.html` | Transhuman ruling clade; archons; mindlines; Great Game politics |
| `uranics.html` | Later-arrival humans; second-class status; social friction |
| `travelers.html` | Interstellar free agents/ships (*Arcadia’s Moon*, etc.) |
| `human-liberation.html` | Resistance / Regal Democrats / strikes; Celestial countermeasures |

Link queens, Finn, Terence, Travelers tech as relevant.

- [ ] **Step 2: Dual index entries**

---

### Task 7: Technology articles

**Files:**
- Create under `pages/technology/`:
  - `archimedes-engine.html`
  - `mindline.html`
  - `livestone.html`
  - `zpz-generator.html`
  - `entropy-drive.html`
  - `neural-interface.html`
- Modify: dual search index

- [ ] **Step 1: Write six technology articles**

| File | Must cover |
|------|------------|
| `archimedes-engine.html` | Megastructure engineering; terraforming/orbit roles in setting; Dolod operation |
| `mindline.html` | Celestial continuity/succession; Thyra’s hijack |
| `livestone.html` | Self-shaping silicate; Finn’s shelter |
| `zpz-generator.html` | Drive/power tech sought for *Diligent* |
| `entropy-drive.html` | Ship drives; bargaining chip |
| `neural-interface.html` | Ubiquitous interface tech; bioware; coercion risks |

- [ ] **Step 2: Dual index entries** (keywords: engine, mindline, ZPZ, etc.)

---

### Task 8: Plot summary and timeline

**Files:**
- Create: `pages/plot.html`
- Create: `pages/timeline.html`
- Modify: dual search index

- [ ] **Step 1: Write `pages/plot.html`** (`data-root="../"`)

Structure as acts/arcs (not chapter list), full spoilers:

1. **Setup** — Finn’s fall; *Diligent* arrival; Crown court / Thyra’s rise begins  
2. **Entanglements** — Hafnir deal; Terence’s investigations; Traveler interference; tech acquisition (ZPZ, Engine OS path)  
3. **Escalation** — Thyra’s succession; Gondiar repression; assassinations and false flags  
4. **Climax** — Dolod / Archimedes Engine / momentum transfer; Boksrock threat; Imperial crisis  
5. **Aftermath** — Resistance not finished; board set for wider conflict / sequel hooks  

Every major named beat should wikilink at least once to character/location/tech pages.

- [ ] **Step 2: Write `pages/timeline.html`**

Ordered list or table of approximate era markers drawn from public recaps (label dates as approximate where needed). Each row: period/label, event, links. Include macro context (exodus from Sol / cluster settlement) briefly, then novel-span events (Dolod detection, *Diligent* arrival, coronation era, trials, Engine climax).

- [ ] **Step 3: Dual index entries** for Plot + Timeline

- [ ] **Step 4: From Plot, click 5 links into nested pages; use browser back; confirm no missing assets**

---

### Task 9: Secondary stubs + full index sync

**Files:**
- Create stub characters: `zelinda-jalgori-tobu.html`, `carolien-amaia.html`, `olomo.html`, `liliana.html`, `medusa.html`, `elsbeth-mcquillan.html`, `dejean.html`, `bekket.html`
- Modify: all four hubs if any links missing
- Modify: dual search index — **every** HTML page in inventory must appear exactly once

- [ ] **Step 1: Create eight stubs**

Each stub:

- `.stub-notice` explaining it is a stub  
- 2–4 sentence lead with known public role  
- Infobox with role/affiliation  
- “See also” links to full articles  

- [ ] **Step 2: Rebuild complete dual index**

Ensure one entry per page in the inventory (Main, Search, Book, Plot, Timeline, 4 hubs, all articles). JSON array and `window.WIKI_SEARCH_INDEX` must match. Prefer generating carefully by hand checklist rather than inventing a build tool.

Checklist command (PowerShell) to list HTML files:

```powershell
Get-ChildItem -Recurse -Filter *.html | Where-Object { $_.FullName -notmatch '\\templates\\' } | ForEach-Object { $_.FullName.Substring((Get-Location).Path.Length + 1) }
```

Compare to index `path` values.

- [ ] **Step 3: Hub completeness**

Every article linked from its category hub; hubs list matches inventory.

---

### Task 10: End-to-end verification

**Files:**
- Modify only if verification finds bugs (CSS paths, missing index rows, typos in `data-root`)

- [ ] **Step 1: Ranking regression**

```powershell
node scripts/check-search-rank.mjs
```

Expected: `check-search-rank: OK`

- [ ] **Step 2: Serve and manual script**

```powershell
python -m http.server 8080
```

Verify:

1. Main Page spoiler banner visible  
2. Sidebar links: Book, each hub, Timeline, Plot  
3. Deep link: Characters → Finn → Anoosha → Archimedes Engine  
4. Search “thyra” → dropdown hit → article  
5. Search “zzzznonexistent” → empty message  
6. `search.html?q=engine` → Archimedes Engine listed first among engine hits  
7. Resize narrow → Menu toggles sidebar  
8. Optional: open `index.html` via `file://` and confirm embedded index still yields some search results  

- [ ] **Step 3: Index parity**

Confirm `search-index.json` and `search-index.js` entry counts equal and paths resolve (no 404 on spot checks of 10 random entries).

- [ ] **Step 4: Content honesty pass**

Skim Plot + Thyra + Finn: no long novel quotes; no clearly invented proper nouns beyond public sources; stub notices present on stubs only.

---

## Self-review (plan vs spec)

| Spec requirement | Task |
|------------------|------|
| Multi-page plain HTML | 1–9 |
| Shared CSS modern wiki layout | 1 |
| Header search + dropdown + `search.html` | 2, 10 |
| Dual JSON + JS index | 2, 9 |
| `data-root` path resolution | 2–9 |
| Full spoilers, Main banner | 3 |
| Expanded lore types | 4–8 |
| Category hubs | 3, 9 |
| Article template + README | 1 |
| Timeline + plot cross-links | 8 |
| Secondary stubs | 9 |
| Manual verification | 10 |
| No build step | all |
| No git commits | Global Constraints |

No TBD placeholders remain. Ranking API names are consistent (`normalizeQuery`, `scoreEntry`, `rankResults`, `resolvePath`, `WikiSearch`).
