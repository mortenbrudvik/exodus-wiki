# Helium Sea Wiki Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up `exodus-the-helium-sea/` as a four-page, fully-tooled but article-free book wiki that is kept out of the published site until it has content.

**Architecture:** A second self-contained book folder beside `exodus-the-archimedes-engine/`, carrying byte-identical copies of the shared CSS/JS and retargeted copies of the eleven book-agnostic scripts. The site root (`sitemap.xml`, `robots.txt`, hub `index.html`) stays owned by book 1. The new wiki is pruned from the GitHub Pages artifact, and its own `check-seo.mjs` asserts its URLs are absent from the sitemap so an accidental publish fails a check.

**Tech Stack:** Plain static HTML/CSS/JS, Node ESM scripts (`node scripts/*.mjs`), no build step, no package.json, no dependencies. Git Bash or PowerShell on Windows; `core.autocrlf=true`.

**Spec:** `docs/superpowers/specs/2026-07-25-exodus-helium-sea-scaffold-design.md`

## Global Constraints

- **No article content about book 2's story.** The owner is still reading. Every page ships only facts already sourced in this repository.
- **`SITE`** is `https://mortenbrudvik.github.io/exodus-wiki` — unchanged, same site.
- **`BOOK`** is `exodus-the-helium-sea`; **`BOOK_TITLE`** is `Exodus: The Helium Sea`; **`SITE_NAME`** and the `<title>` suffix are `Helium Sea Wiki`; **`AUTHOR`** is `Peter F. Hamilton`.
- **Do not modify anything under `exodus-the-archimedes-engine/`.** Book 1 is untouched by every task except the final verification, which only *runs* its checks.
- **Do not modify `sitemap.xml` or `robots.txt`.** Book 1 owns them. `gen-sitemap.mjs` is not copied.
- **Do not add a hub card** to the root `index.html`.
- **Relative links only.** Everything must work under `https://<user>.github.io/exodus-wiki/` and over `file://`.
- **Spelling is Oxford British:** `-our`, `-re`, `-ise`→`-ize`, doubled `-ll-`.
- **Encyclopedic voice.** Never let the wiki's source material be the grammatical subject. `check-wiki.mjs` enforces a banned-phrase list; `pages/sources.html` is the only exempt page.
- **`node scripts/stamp-assets.mjs` runs last** in any sweep sequence.

## Spec deltas found while planning

Four adaptations the spec did not name. They do not change the design, only the file list:

| File | Spec said | Reality |
|---|---|---|
| `check-lightbox.mjs` | copied | Lines 258–280 read `docs/visual-briefs/index.json` and crash without it. The structural half is dropped; the `WikiLightbox` unit test is kept |
| `apply-seo.mjs` | copied | Lines 19–23 read `gen-celestials.mjs`/`gen-dominions.mjs` to build a skip-set and throw ENOENT without them. That block is dropped |
| `stamp-assets.mjs` | copied | Lines 69–79 also stamp the root hub. Dropped, so book 1 remains sole owner of the hub line |
| `check-wiki.mjs` | "book name + nav expectations retargeted" | Also line 130's hardcoded `["characters","locations","factions","technology"]` hub loop, which *hard-fails* on a missing hub, and lines 396–399's generator list |

---

### Task 1: Foundation — folder, assets, and the book-agnostic scripts

**Files:**
- Create: `exodus-the-helium-sea/assets/css/wiki.css` (copy)
- Create: `exodus-the-helium-sea/assets/js/{search,lightbox,theme}.js` (copies)
- Create: `exodus-the-helium-sea/assets/icons/favicon.svg` (copy)
- Create: `exodus-the-helium-sea/scripts/lib/assets.mjs` (copy, verbatim)
- Create: `exodus-the-helium-sea/scripts/wire-lightbox-script.mjs` (copy, verbatim)
- Create: `exodus-the-helium-sea/scripts/wire-theme-toggle.mjs` (copy, verbatim)
- Create: `exodus-the-helium-sea/scripts/lib/seo.mjs` (copy with 3 constants changed)

**Interfaces:**
- Consumes: nothing.
- Produces: `scripts/lib/seo.mjs` exporting `SITE`, `BOOK`, `SITE_NAME`, `BOOK_TITLE`, `AUTHOR`, `NOINDEX_PAGES: Set<string>`, `loadIndex(): Array<{title,path,category,summary,keywords}>`, `escapeAttr(s): string`, `describe(summary): string`, `pageUrl(relPath): string`, `imageUrl(relPath): string`, `seoBlock(relPath, indent?): string`, `seoRegion(relPath, indent?): string`, `SEO_START`, `SEO_END`. `scripts/lib/assets.mjs` exporting `VERSIONED: string[]`, `HUB_VERSIONED: string[]`, `assetV(rel): string`, `hubAssetV(rel): string`.

- [ ] **Step 1: Write the failing test**

Create `exodus-the-helium-sea/scripts/check-constants.mjs` — a throwaway smoke test deleted in Step 7:

```js
import { SITE, BOOK, SITE_NAME, BOOK_TITLE, AUTHOR, pageUrl } from "./lib/seo.mjs";
import { VERSIONED, assetV } from "./lib/assets.mjs";

const eq = (a, b, m) => { if (a !== b) throw new Error(`FAIL: ${m} — got "${a}", want "${b}"`); };

eq(SITE, "https://mortenbrudvik.github.io/exodus-wiki", "SITE");
eq(BOOK, "exodus-the-helium-sea", "BOOK");
eq(SITE_NAME, "Helium Sea Wiki", "SITE_NAME");
eq(BOOK_TITLE, "Exodus: The Helium Sea", "BOOK_TITLE");
eq(AUTHOR, "Peter F. Hamilton", "AUTHOR");
eq(
  pageUrl("pages/book.html"),
  "https://mortenbrudvik.github.io/exodus-wiki/exodus-the-helium-sea/pages/book.html",
  "pageUrl"
);
eq(VERSIONED.length, 5, "VERSIONED asset count");
for (const a of VERSIONED) {
  if (a === "assets/data/search-index.js") continue; // written in Task 2
  if (!/^[0-9a-f]{8}$/.test(assetV(a))) throw new Error(`FAIL: ${a} has no 8-hex hash`);
}
console.log("check-constants: OK");
```

- [ ] **Step 2: Run it to verify it fails**

```bash
cd exodus-the-helium-sea && node scripts/check-constants.mjs
```

Expected: FAIL — `Cannot find module .../scripts/lib/seo.mjs` (nothing has been copied yet).

- [ ] **Step 3: Create the folder and copy the assets**

From the repo root:

```bash
mkdir -p exodus-the-helium-sea/assets/css exodus-the-helium-sea/assets/js \
         exodus-the-helium-sea/assets/icons exodus-the-helium-sea/assets/data \
         exodus-the-helium-sea/pages exodus-the-helium-sea/scripts/lib \
         exodus-the-helium-sea/templates
cp exodus-the-archimedes-engine/assets/css/wiki.css      exodus-the-helium-sea/assets/css/
cp exodus-the-archimedes-engine/assets/js/search.js      exodus-the-helium-sea/assets/js/
cp exodus-the-archimedes-engine/assets/js/lightbox.js    exodus-the-helium-sea/assets/js/
cp exodus-the-archimedes-engine/assets/js/theme.js       exodus-the-helium-sea/assets/js/
cp exodus-the-archimedes-engine/assets/icons/favicon.svg exodus-the-helium-sea/assets/icons/
```

Copy these three verbatim — they contain no book-specific strings:

```bash
cp exodus-the-archimedes-engine/scripts/lib/assets.mjs           exodus-the-helium-sea/scripts/lib/
cp exodus-the-archimedes-engine/scripts/wire-lightbox-script.mjs exodus-the-helium-sea/scripts/
cp exodus-the-archimedes-engine/scripts/wire-theme-toggle.mjs    exodus-the-helium-sea/scripts/
```

Do **not** copy `wiki.css` by hand-editing it afterwards — the duplicated light-token blocks and the
`[hidden]` guards must survive byte-for-byte.

- [ ] **Step 4: Copy and retarget `lib/seo.mjs`**

```bash
cp exodus-the-archimedes-engine/scripts/lib/seo.mjs exodus-the-helium-sea/scripts/lib/seo.mjs
```

Then change exactly three lines (18 stays as-is, 22 stays as-is):

```js
export const SITE = "https://mortenbrudvik.github.io/exodus-wiki";
export const BOOK = "exodus-the-helium-sea";
export const SITE_NAME = "Helium Sea Wiki";
export const BOOK_TITLE = "Exodus: The Helium Sea";
export const AUTHOR = "Peter F. Hamilton";
```

Leave `IMAGE_DIRS`, `imageUrl`, `WEBSITE_PAGES`, `NOINDEX_PAGES` and every function untouched.
`imageUrl` falls back to `${SITE}/assets/icons/icon-512.png` when no illustration exists, which is
correct for all four pages and is a real file at the site root.

- [ ] **Step 5: Run the test to verify it passes**

```bash
cd exodus-the-helium-sea && node scripts/check-constants.mjs
```

Expected: `check-constants: OK`

- [ ] **Step 6: Confirm the copies are byte-identical where they should be**

```bash
git diff --no-index exodus-the-archimedes-engine/assets/css/wiki.css exodus-the-helium-sea/assets/css/wiki.css
git diff --no-index exodus-the-archimedes-engine/scripts/lib/assets.mjs exodus-the-helium-sea/scripts/lib/assets.mjs
git diff --no-index exodus-the-archimedes-engine/scripts/wire-theme-toggle.mjs exodus-the-helium-sea/scripts/wire-theme-toggle.mjs
```

Expected: no output from any of the three (exit 0). If `git diff --no-index` reports only line-ending
noise, that is acceptable — `core.autocrlf=true` is expected here and must not be "fixed".

- [ ] **Step 7: Delete the smoke test and commit**

```bash
rm exodus-the-helium-sea/scripts/check-constants.mjs
git add exodus-the-helium-sea
git commit -m "Copy the shared assets and book-agnostic tooling into a Helium Sea folder."
```

---

### Task 2: The four pages, the search index, and a passing `check-wiki.mjs`

**Files:**
- Create: `exodus-the-helium-sea/index.html`
- Create: `exodus-the-helium-sea/search.html`
- Create: `exodus-the-helium-sea/pages/book.html`
- Create: `exodus-the-helium-sea/pages/sources.html`
- Create: `exodus-the-helium-sea/templates/article.html`
- Create: `exodus-the-helium-sea/assets/data/search-index.json`
- Create: `exodus-the-helium-sea/assets/data/search-index.js`
- Create: `exodus-the-helium-sea/scripts/check-wiki.mjs` (copy with 4 edits)

**Interfaces:**
- Consumes: `scripts/lib/seo.mjs` from Task 1 (not imported by `check-wiki.mjs`, but the index shape it validates is the shape `loadIndex()` returns).
- Produces: `assets/data/search-index.json` with exactly 4 entries at paths `index.html`, `search.html`, `pages/book.html`, `pages/sources.html`; `assets/data/search-index.js` assigning the identical array to `window.WIKI_SEARCH_INDEX`.

- [ ] **Step 1: Copy `check-wiki.mjs` and make its four edits**

```bash
cp exodus-the-archimedes-engine/scripts/check-wiki.mjs exodus-the-helium-sea/scripts/check-wiki.mjs
```

**Edit 1** — the banner and the doc comment, line 2 and line 52:

```js
 * Structural and editorial checks for the Helium Sea wiki.
```

```js
note(`\nHelium Sea wiki checks — ${pages.length} pages\n${"=".repeat(46)}`);
```

**Edit 2** — the title suffix, line 173:

```js
  if (!/<title>[^<]*— Helium Sea Wiki<\/title>/.test(src)) fail("chrome", `${r} title is not "… — Helium Sea Wiki"`);
```

**Edit 3** — the hub-coverage loop, line 130. The book-1 version hard-fails on a missing hub, and
this wiki has no category hubs yet. Replace the array with an empty one and say why:

```js
/* ------------------------------------------------------------------ *
 * 3. Hub coverage — every page reachable from its category hub
 * ------------------------------------------------------------------ */
// No category hubs yet: this wiki has no article coverage. Add a category name
// here the moment pages/<category>/index.html exists, or its articles can go
// unreachable without failing anything.
for (const category of []) {
```

**Edit 4** — the generator-sync section, lines 396–399 and the note at 428. This wiki has no
generators, and `execFileSync` on a missing script throws:

```js
// No generated pages in this wiki — book 1's gen-celestials/gen-dominions are a
// book-1 concept. Add entries here if this wiki ever grows a generator.
const GENERATORS = [];
```

```js
note(`  generated        ${drift ? "FAIL" : "ok"} (no generators in this wiki)`);
```

- [ ] **Step 2: Run it to verify it fails**

```bash
cd exodus-the-helium-sea && node scripts/check-wiki.mjs
```

Expected: FAIL — the index file does not exist yet, so the run dies at line 93 with
`ENOENT: no such file or directory, open '.../assets/data/search-index.json'`.

- [ ] **Step 3: Write `assets/data/search-index.json`**

```json
[
  {
    "title": "Main Page",
    "path": "index.html",
    "category": "Main",
    "summary": "Reading companion for Exodus: The Helium Sea — structure in place, article coverage not yet written",
    "keywords": [
      "home",
      "start",
      "wiki",
      "helium sea"
    ]
  },
  {
    "title": "Search",
    "path": "search.html",
    "category": "Search",
    "summary": "Full search results",
    "keywords": [
      "find"
    ]
  },
  {
    "title": "Exodus: The Helium Sea",
    "path": "pages/book.html",
    "category": "Book",
    "summary": "Book overview: publication facts for the novel that concludes the Exodus duology",
    "keywords": [
      "hamilton",
      "peter f. hamilton",
      "peter hamilton",
      "novel",
      "overview",
      "publication",
      "helium sea",
      "2026",
      "space opera",
      "exodus game",
      "archimedes engine"
    ]
  },
  {
    "title": "Sources and provenance",
    "path": "pages/sources.html",
    "category": "Sources",
    "summary": "What this wiki verifies, what it reconstructs, and how far coverage currently extends",
    "keywords": [
      "sources",
      "provenance",
      "verification",
      "coverage",
      "spoilers"
    ]
  }
]
```

- [ ] **Step 4: Write `assets/data/search-index.js` from the same content**

It must be **content-identical** to the JSON — `check-wiki.mjs:98` compares the two after parsing.
Write it as the same array assigned to the global:

```js
window.WIKI_SEARCH_INDEX = [
  {
    "title": "Main Page",
    "path": "index.html",
    "category": "Main",
    "summary": "Reading companion for Exodus: The Helium Sea — structure in place, article coverage not yet written",
    "keywords": [
      "home",
      "start",
      "wiki",
      "helium sea"
    ]
  },
  {
    "title": "Search",
    "path": "search.html",
    "category": "Search",
    "summary": "Full search results",
    "keywords": [
      "find"
    ]
  },
  {
    "title": "Exodus: The Helium Sea",
    "path": "pages/book.html",
    "category": "Book",
    "summary": "Book overview: publication facts for the novel that concludes the Exodus duology",
    "keywords": [
      "hamilton",
      "peter f. hamilton",
      "peter hamilton",
      "novel",
      "overview",
      "publication",
      "helium sea",
      "2026",
      "space opera",
      "exodus game",
      "archimedes engine"
    ]
  },
  {
    "title": "Sources and provenance",
    "path": "pages/sources.html",
    "category": "Sources",
    "summary": "What this wiki verifies, what it reconstructs, and how far coverage currently extends",
    "keywords": [
      "sources",
      "provenance",
      "verification",
      "coverage",
      "spoilers"
    ]
  }
];
```

- [ ] **Step 5: Write `index.html`**

The `<!-- seo:start -->`/`<!-- seo:end -->` block and the `?v=` tokens are deliberately absent —
Tasks 3 and 5 insert them. The nav already carries `aria-current="page"` on the self-link, because
`check-wiki.mjs:215` fails without it and `regroup-nav.mjs` does not run until Task 4.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Full-spoiler companion to Exodus: The Helium Sea — Helium Sea Wiki</title>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Helium Sea Wiki",
    "alternateName": "Exodus: The Helium Sea wiki",
    "url": "https://mortenbrudvik.github.io/exodus-wiki/exodus-the-helium-sea/",
    "inLanguage": "en",
    "about": {
      "@type": "Book",
      "name": "Exodus: The Helium Sea",
      "author": { "@type": "Person", "name": "Peter F. Hamilton" }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://mortenbrudvik.github.io/exodus-wiki/exodus-the-helium-sea/search.html?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
  </script>
  <link rel="stylesheet" href="assets/css/wiki.css">
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <script>(function(){try{var t=localStorage.getItem("wiki-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})();</script>
</head>
<body data-root="./">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-sidebar">Menu</button>
    <a class="site-title" href="index.html">Helium Sea Wiki</a>
    <form class="search-form" action="search.html" method="get" role="search">
      <input class="search-input" type="search" name="q" placeholder="Search wiki…" autocomplete="off" aria-label="Search">
      <button type="submit">Search</button>
      <div class="search-dropdown" hidden></div>
    </form>
    <button type="button" class="theme-toggle" data-theme-toggle hidden>Theme</button>
  </header>
  <div class="layout">
    <aside class="sidebar" id="site-sidebar">
      <nav aria-label="Wiki">
        <p class="nav-label">This wiki</p>
        <ul>
          <li><a href="index.html" aria-current="page">Main Page</a></li>
          <li><a href="pages/book.html">Book</a></li>
        </ul>
        <p class="nav-label">Elsewhere</p>
        <ul>
          <li><a href="../index.html">All book wikis</a></li>
        </ul>
      </nav>
    </aside>
    <main class="content" id="main-content">
      <article class="article article--wide">
        <header>
          <h1>Main Page</h1>
        </header>

        <div class="spoiler-banner" role="note">
          <strong>Spoilers:</strong> This wiki is a full-spoiler companion to <em>Exodus: The Helium Sea</em>. Articles will assume the novel has been finished.
        </div>

        <p class="lead">
          This is a personal full-spoiler reading companion for Peter F. Hamilton’s 2026 novel
          <em>Exodus: The Helium Sea</em>, the second of his two <em>Exodus</em> novels and the one
          that concludes the story begun in <em>Exodus: The Archimedes Engine</em>. It will cover
          people, places, factions, technology, timeline, and plot.
        </p>

        <section>
          <h2>Coverage</h2>
          <p>
            Article coverage has not started. The wiki currently holds its structure and two pages
            that need no reading of the novel: publication facts on the
            <a href="pages/book.html">Book</a> page, and the standards this wiki holds itself to on
            <a href="pages/sources.html">Sources and provenance</a>. Categories for characters,
            locations, factions and technology will appear in the sidebar as they are written.
          </p>
          <p>
            The companion to the first novel is complete and available from the
            <a href="../index.html">collection hub</a>: it covers the Centauri Cluster, the Crown
            Dominion, the arkship <em>Diligent</em>, and the events this novel follows on from.
          </p>
        </section>

        <section>
          <h2>About this wiki</h2>
          <p>
            Articles are encyclopedic original summaries written for this wiki. Long novel quotations
            are avoided. Where the novel does not fix a date or an ordering, the wiki says so on
            <a href="pages/sources.html">Sources and provenance</a> rather than in article prose.
            Header search works from the filesystem as well as over HTTP, because every page loads an
            embedded copy of the index.
          </p>
        </section>
      </article>
    </main>
  </div>
  <script src="assets/data/search-index.js"></script>
  <script src="assets/js/search.js"></script>
  <script src="assets/js/lightbox.js"></script>
  <script src="assets/js/theme.js"></script>
</body>
</html>
```

- [ ] **Step 6: Write `search.html`**

Identical chrome; no `.lead` and no category footer, both of which `check-wiki.mjs` exempts for this
path (`NO_LEAD_OK`, `NO_FOOTER_OK`). No `aria-current` anywhere — `search.html` has no nav self-link.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Search — Helium Sea Wiki</title>
  <link rel="stylesheet" href="assets/css/wiki.css">
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <script>(function(){try{var t=localStorage.getItem("wiki-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})();</script>
</head>
<body data-root="./">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-sidebar">Menu</button>
    <a class="site-title" href="index.html">Helium Sea Wiki</a>
    <form class="search-form" action="search.html" method="get" role="search">
      <input class="search-input" type="search" name="q" placeholder="Search wiki…" autocomplete="off" aria-label="Search">
      <button type="submit">Search</button>
      <div class="search-dropdown" hidden></div>
    </form>
    <button type="button" class="theme-toggle" data-theme-toggle hidden>Theme</button>
  </header>
  <div class="layout">
    <aside class="sidebar" id="site-sidebar">
      <nav aria-label="Wiki">
        <p class="nav-label">This wiki</p>
        <ul>
          <li><a href="index.html">Main Page</a></li>
          <li><a href="pages/book.html">Book</a></li>
        </ul>
        <p class="nav-label">Elsewhere</p>
        <ul>
          <li><a href="../index.html">All book wikis</a></li>
        </ul>
      </nav>
    </aside>
    <main class="content" id="main-content">
      <article class="article article--wide">
        <header>
          <h1 id="search-query-label">Search</h1>
        </header>
        <div id="search-results"></div>
      </article>
    </main>
  </div>
  <script src="assets/data/search-index.js"></script>
  <script src="assets/js/search.js"></script>
  <script src="assets/js/lightbox.js"></script>
  <script src="assets/js/theme.js"></script>
</body>
</html>
```

- [ ] **Step 7: Write `pages/book.html`**

`data-root="../"`. The nav "Book" link carries `aria-current="page"`. Uses `.article` with an
infobox, so no `article--wide`. The footer matches book 1's `book.html:189-192`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Exodus: The Helium Sea — Helium Sea Wiki</title>
  <link rel="stylesheet" href="../assets/css/wiki.css">
  <link rel="icon" href="../assets/icons/favicon.svg" type="image/svg+xml">
  <script>(function(){try{var t=localStorage.getItem("wiki-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})();</script>
</head>
<body data-root="../">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-sidebar">Menu</button>
    <a class="site-title" href="../index.html">Helium Sea Wiki</a>
    <form class="search-form" action="../search.html" method="get" role="search">
      <input class="search-input" type="search" name="q" placeholder="Search wiki…" autocomplete="off" aria-label="Search">
      <button type="submit">Search</button>
      <div class="search-dropdown" hidden></div>
    </form>
    <button type="button" class="theme-toggle" data-theme-toggle hidden>Theme</button>
  </header>
  <div class="layout">
    <aside class="sidebar" id="site-sidebar">
      <nav aria-label="Wiki">
        <p class="nav-label">This wiki</p>
        <ul>
          <li><a href="../index.html">Main Page</a></li>
          <li><a href="book.html" aria-current="page">Book</a></li>
        </ul>
        <p class="nav-label">Elsewhere</p>
        <ul>
          <li><a href="../../index.html">All book wikis</a></li>
        </ul>
      </nav>
    </aside>
    <main class="content" id="main-content">
      <article class="article">
        <header>
          <h1>Exodus: The Helium Sea</h1>
        </header>
        <aside class="infobox">
          <h2><em>Exodus: The Helium Sea</em></h2>
          <dl>
            <dt>Title</dt>
            <dd>Exodus: The Helium Sea</dd>
            <dt>Author</dt>
            <dd>Peter F. Hamilton</dd>
            <dt>Publisher</dt>
            <dd>Random House Worlds</dd>
            <dt>Published</dt>
            <dd>16 June 2026</dd>
            <dt>Series</dt>
            <dd>Exodus; follows <em>Exodus: The Archimedes Engine</em> (2024)</dd>
            <dt>Genre</dt>
            <dd>Science fiction / space opera</dd>
          </dl>
        </aside>
        <p class="lead">
          <em>Exodus: The Helium Sea</em> is a 2026 science-fiction novel by Peter F. Hamilton and the
          second of his two novels set in the <em>Exodus</em> universe. It concludes the story opened
          by <em>Exodus: The Archimedes Engine</em>, which left the Centauri Cluster’s Celestial
          dominions, its Uranic populations and a world-moving engine poised for a wider conflict.
        </p>

        <section>
          <h2>Publication</h2>
          <p>
            The novel was published on 16 June 2026 by Random House Worlds, under the same two-book
            agreement that produced <em>Exodus: The Archimedes Engine</em> in September 2024. Both are
            original tie-in novels for <em>Exodus</em>, a science-fiction role-playing game from
            Archetype Entertainment, a division of Wizards of the Coast, and both are set long before
            the game’s own events.
          </p>
          <p>
            Where the first novel is a prequel establishing the Cluster, this one closes the duology.
            The wiki records nothing further about its contents yet — see
            <a href="sources.html">Sources and provenance</a> for how far coverage extends.
          </p>
        </section>

        <section>
          <h2>The first novel</h2>
          <p>
            <em>Exodus: The Archimedes Engine</em> has its own complete companion in this collection,
            covering its cast, worlds, dominions, technology, timeline and plot. Readers coming to the
            second novel will find the Crown Dominion, the arkship <em>Diligent</em>, the Travelers and
            the Archimedes Engine itself documented there. Open it from the
            <a href="../../index.html">collection hub</a>.
          </p>
        </section>

        <footer class="article-footer categories">
          Categories:
          <a href="../index.html">Main</a>
        </footer>
      </article>
    </main>
  </div>
  <script src="../assets/data/search-index.js"></script>
  <script src="../assets/js/search.js"></script>
  <script src="../assets/js/lightbox.js"></script>
  <script src="../assets/js/theme.js"></script>
</body>
</html>
```

- [ ] **Step 8: Write `pages/sources.html`**

`data-root="../"`. No nav self-link, so no `aria-current`. This is the one page exempt from the voice
check (`VOICE_EXEMPT` at `check-wiki.mjs:245`), which is why it may name outside references directly.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sources and provenance — Helium Sea Wiki</title>
  <link rel="stylesheet" href="../assets/css/wiki.css">
  <link rel="icon" href="../assets/icons/favicon.svg" type="image/svg+xml">
  <script>(function(){try{var t=localStorage.getItem("wiki-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})();</script>
</head>
<body data-root="../">
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-sidebar">Menu</button>
    <a class="site-title" href="../index.html">Helium Sea Wiki</a>
    <form class="search-form" action="../search.html" method="get" role="search">
      <input class="search-input" type="search" name="q" placeholder="Search wiki…" autocomplete="off" aria-label="Search">
      <button type="submit">Search</button>
      <div class="search-dropdown" hidden></div>
    </form>
    <button type="button" class="theme-toggle" data-theme-toggle hidden>Theme</button>
  </header>
  <div class="layout">
    <aside class="sidebar" id="site-sidebar">
      <nav aria-label="Wiki">
        <p class="nav-label">This wiki</p>
        <ul>
          <li><a href="../index.html">Main Page</a></li>
          <li><a href="book.html">Book</a></li>
        </ul>
        <p class="nav-label">Elsewhere</p>
        <ul>
          <li><a href="../../index.html">All book wikis</a></li>
        </ul>
      </nav>
    </aside>
    <main class="content" id="main-content">
      <article class="article article--wide">
        <header>
          <h1>Sources and provenance</h1>
        </header>

        <p class="lead">
          This page records where this wiki’s claims come from and how far its coverage extends. It is
          the only page that discusses sourcing: article prose states what the novel does, and leaves
          questions of confidence here.
        </p>

        <section>
          <h2>Coverage status</h2>
          <p>
            No article coverage yet. The wiki holds its structure, the publication facts on the
            <a href="book.html">Book</a> page, and this page. Nothing here summarizes the novel’s
            events, and no character, location, faction or technology articles exist. That will change
            as the novel is read.
          </p>
        </section>

        <section>
          <h2>Standards</h2>
          <ul>
            <li>
              <strong>The book wins.</strong> Secondary material is used only to cross-check names,
              ordering, or franchise vocabulary — never to supply plot the novel does not.
            </li>
            <li>
              <strong>No game-era lore as novel canon.</strong> The <em>Exodus</em> game shares the
              setting, but its lore is unreleased and shifting; mixing it in would mean running a
              second, weaker evidence standard.
            </li>
            <li>
              <strong>No unauthorized full-text dumps</strong> of the novel.
            </li>
            <li>
              <strong>A short accurate stub beats invented canon.</strong> Where the novel establishes
              little, the article says little and says so.
            </li>
          </ul>
        </section>

        <section>
          <h2>Verified claims</h2>
          <table class="data-table">
            <thead>
              <tr><th scope="col">Claim</th><th scope="col">Reference</th></tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Claim"><em>Exodus: The Helium Sea</em> concludes the story; published 16 June 2026</td>
                <td data-label="Reference">
                  <a href="https://www.exodusgame.com/en-US/news/exodus-the-helium-sea-peter-f-hamiltons-stunning-conclusion-arrives-june-16-2026">Exodus Game — <em>The Helium Sea</em> announcement</a>
                </td>
              </tr>
              <tr>
                <td data-label="Claim">Two Hamilton novels commissioned for the <em>Exodus</em> universe</td>
                <td data-label="Reference">
                  <a href="https://www.exodusgame.com/en-US/news/agreement-with-random-house-worlds-for-exodus-game">Exodus Game — Random House Worlds agreement</a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <footer class="article-footer categories">
          Categories:
          <a href="../index.html">Main</a>
        </footer>
      </article>
    </main>
  </div>
  <script src="../assets/data/search-index.js"></script>
  <script src="../assets/js/search.js"></script>
  <script src="../assets/js/lightbox.js"></script>
  <script src="../assets/js/theme.js"></script>
</body>
</html>
```

- [ ] **Step 9: Write `templates/article.html`**

Copy book 1's template and change the title suffix and the nav block to this wiki's three links.
`check-wiki.mjs` skips `templates/`, so the `{{ROOT}}` placeholders are safe.

```bash
cp exodus-the-archimedes-engine/templates/article.html exodus-the-helium-sea/templates/article.html
```

Then change line 6 to:

```html
  <title>{{TITLE}} — Helium Sea Wiki</title>
```

line 20 to:

```html
    <a class="site-title" href="{{ROOT}}index.html">Helium Sea Wiki</a>
```

and replace the whole `<nav aria-label="Wiki">…</nav>` block with:

```html
      <nav aria-label="Wiki">
        <p class="nav-label">This wiki</p>
        <ul>
          <li><a href="{{ROOT}}index.html">Main Page</a></li>
          <li><a href="{{ROOT}}pages/book.html">Book</a></li>
        </ul>
        <p class="nav-label">Elsewhere</p>
        <ul>
          <li><a href="{{ROOT}}../index.html">All book wikis</a></li>
        </ul>
      </nav>
```

- [ ] **Step 10: Run `check-wiki.mjs` to verify it passes**

```bash
cd exodus-the-helium-sea && node scripts/check-wiki.mjs
```

Expected: `check-wiki: OK — 4 pages, 4 index entries, 0 warnings`

If a **thin** warning appears for `pages/book.html` or `pages/sources.html`, the page is under 120
words of body text. Do not add a stub notice to silence it — a stub notice means coverage is
scope-limited relative to the novel, which is not what an unwritten wiki is. Expand the page with
more of the publication or standards material instead.

If a **voice** failure appears, a banned phrase reached prose. `pages/sources.html` is exempt; on the
other three, rewrite so the wiki's source material is not the grammatical subject.

- [ ] **Step 11: Commit**

```bash
git add exodus-the-helium-sea
git commit -m "Add the four Helium Sea shell pages and a check-wiki adapted to a wiki with no categories."
```

---

### Task 3: SEO block and the dark-site assertion

**Files:**
- Create: `exodus-the-helium-sea/scripts/apply-seo.mjs` (copy, generator skip-set removed)
- Create: `exodus-the-helium-sea/scripts/check-seo.mjs` (copy, sitemap block inverted)
- Modify: all four pages (by running `apply-seo.mjs`)

**Interfaces:**
- Consumes: `loadIndex`, `seoRegion`, `SEO_START`, `SEO_END`, `pageUrl`, `imageUrl`, `describe`, `escapeAttr`, `SITE`, `NOINDEX_PAGES` from `scripts/lib/seo.mjs` (Task 1).
- Produces: a `<!-- seo:start -->…<!-- seo:end -->` region in each of the four pages, inserted immediately after `</title>`.

- [ ] **Step 1: Copy `check-seo.mjs` and invert its site-root block**

```bash
cp exodus-the-archimedes-engine/scripts/check-seo.mjs exodus-the-helium-sea/scripts/check-seo.mjs
```

Replace lines 74–97 (from `// —— Site-root artefacts ——` through the `robots.txt` block) with:

```js
// —— Site-root artefacts ——
// This wiki is deliberately unpublished: it is pruned from the Pages artifact in
// .github/workflows/pages.yml and has no hub card. Book 1 owns sitemap.xml and
// robots.txt, and gen-sitemap.mjs is not copied here.
//
// So the assertion is INVERTED against book 1's: none of this wiki's URLs may
// appear in the sitemap. Publishing the empty wiki by accident fails this check
// rather than going unnoticed. When the wiki goes live, step 3 of the go-live
// checklist in docs/superpowers/specs/2026-07-25-exodus-helium-sea-scaffold-design.md
// flips this back to the positive form book 1 uses.
const sitemapPath = path.join(siteRoot, "sitemap.xml");
const robotsPath = path.join(siteRoot, "robots.txt");

if (!fs.existsSync(sitemapPath)) {
  fail("sitemap.xml missing at site root — book 1 owns it; run its gen-sitemap.mjs");
} else {
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const listed = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  for (const e of index) {
    const u = pageUrl(e.path);
    if (listed.has(u)) fail(`sitemap.xml lists ${u} — this wiki must stay unpublished`);
  }
}

if (!fs.existsSync(robotsPath)) {
  fail("robots.txt missing at site root — book 1 owns it; run its gen-sitemap.mjs");
} else {
  const robots = fs.readFileSync(robotsPath, "utf8");
  if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt does not point at the sitemap");
  if (/^\s*Disallow:\s*\/\s*$/m.test(robots)) fail("robots.txt disallows the whole site");
}
```

Also change the final success line (119) so it does not claim a sitemap it does not own:

```js
console.log(
  `check-seo: OK — ${index.length} pages with descriptions, canonicals and social tags; ` +
    `none of them published to the sitemap`
);
```

Leave the hub check at lines 100–107 as it is: it asserts the hub has a description, canonical and
`og:title`, all of which are true and none of which this wiki changes.

- [ ] **Step 2: Run it to verify it fails**

```bash
cd exodus-the-helium-sea && node scripts/check-seo.mjs
```

Expected: FAIL with four lines of the form
`index.html: no seo:start/seo:end block — run apply-seo.mjs`, one per page, and exit code 1.

- [ ] **Step 3: Copy `apply-seo.mjs` and drop the generator skip-set**

```bash
cp exodus-the-archimedes-engine/scripts/apply-seo.mjs exodus-the-helium-sea/scripts/apply-seo.mjs
```

Delete lines 19–23 (the `const generated = new Set()` block, which reads two scripts this wiki does
not have and throws ENOENT), and delete the skip branch at lines 35–38:

```js
  if (generated.has(path.basename(entry.path))) {
    skipped++;
    continue;
  }
```

Keep the `skipped` counter declaration and the closing log line so the output shape is unchanged;
`skipped` simply stays 0. Update the header comment's last paragraph to:

```js
/**
 * Injects (or refreshes) the SEO head block on every indexed page.
 *
 * Idempotent: the block is delimited by <!-- seo:start --> / <!-- seo:end --> and is
 * replaced wholesale on re-run, so changing a summary in search-index.json and re-running
 * updates every affected page.
 *
 * This wiki has no generated pages, so nothing is skipped.
 */
```

- [ ] **Step 4: Run the sweep**

```bash
cd exodus-the-helium-sea && node scripts/apply-seo.mjs
```

Expected: `apply-seo: wrote 4; skipped 0 generated; errors 0`

- [ ] **Step 5: Run `check-seo.mjs` to verify it passes**

```bash
cd exodus-the-helium-sea && node scripts/check-seo.mjs
```

Expected: `check-seo: OK — 4 pages with descriptions, canonicals and social tags; none of them published to the sitemap`

- [ ] **Step 6: Confirm `search.html` got its noindex and the others did not**

```bash
grep -c 'name="robots" content="noindex' search.html index.html pages/book.html pages/sources.html
```

Expected: `search.html:1`, and `0` for the other three. This is `NOINDEX_PAGES` doing its job.

- [ ] **Step 7: Confirm the site root is untouched**

```bash
cd .. && git status --porcelain sitemap.xml robots.txt index.html
```

Expected: no output. If any of the three is modified, something wrote to the site root — stop and
find it before continuing.

- [ ] **Step 8: Run `check-wiki.mjs` again**

```bash
cd exodus-the-helium-sea && node scripts/check-wiki.mjs
```

Expected: still `check-wiki: OK — 4 pages, 4 index entries, 0 warnings`

- [ ] **Step 9: Commit**

```bash
git add exodus-the-helium-sea
git commit -m "Give the Helium Sea shell its SEO block, and a check that fails if it reaches the sitemap."
```

---

### Task 4: Chrome sweeps and the lightbox check

**Files:**
- Create: `exodus-the-helium-sea/scripts/regroup-nav.mjs` (copy, `NAV_GROUPS` rewritten)
- Create: `exodus-the-helium-sea/scripts/check-lightbox.mjs` (copy, structural half dropped)
- Modify: possibly none of the four pages — they were authored already wired

**Interfaces:**
- Consumes: nothing from earlier tasks at runtime.
- Produces: `scripts/regroup-nav.mjs` exporting `NAV_GROUPS: Array<[string, Array<[string, string]>]>` and `buildNav(root, pageRel, indent?): string`. A future generator would import `buildNav`; nothing does yet.

- [ ] **Step 1: Copy `check-lightbox.mjs` and drop its structural half**

```bash
cp exodus-the-archimedes-engine/scripts/check-lightbox.mjs exodus-the-helium-sea/scripts/check-lightbox.mjs
```

Delete lines 258–280 — the `// Structural: every illustrated page loads lightbox.js` block. It reads
`docs/visual-briefs/index.json`, which this wiki has no reason to have, and would crash on the
`readFileSync`. Replace the final `console.log` with:

```js
// No structural pass: this wiki has no illustrations yet, so there are no
// illustrated pages to prove load lightbox.js. Restore book 1's block — which
// walks docs/visual-briefs/index.json — with the first illustration.
console.log("check-lightbox: OK — open/close against shipped WikiLightbox");
```

Keep the entire fixture and the `WikiLightbox` open/close assertions above it: they drive the real
shipped `assets/js/lightbox.js`, which this wiki has a byte-identical copy of.

- [ ] **Step 2: Run it to verify it passes**

```bash
cd exodus-the-helium-sea && node scripts/check-lightbox.mjs
```

Expected: `check-lightbox: OK — open/close against shipped WikiLightbox`

This one is green on first run by design — the code under test was copied working in Task 1, and the
edit removes an assertion that cannot apply rather than adding one.

- [ ] **Step 3: Copy `regroup-nav.mjs` and rewrite `NAV_GROUPS`**

```bash
cp exodus-the-archimedes-engine/scripts/regroup-nav.mjs exodus-the-helium-sea/scripts/regroup-nav.mjs
```

Replace the `NAV_GROUPS` export (lines 29–51) with:

```js
/** Groups, in render order. Targets are relative to the wiki root. */
export const NAV_GROUPS = [
  ["This wiki", [["index.html", "Main Page"], ["pages/book.html", "Book"]]],
  // Outside the wiki root: one more ../ than everything else.
  ["Elsewhere", [["../index.html", "All book wikis"]]],
];
```

Update the header comment's first paragraph, which describes book 1's eleven links:

```js
/**
 * Rebuilds the grouped sidebar nav on every page.
 *
 *   node scripts/regroup-nav.mjs
 *
 * This wiki has no article coverage yet, so the nav is three links. Add a group
 * entry here — never in page markup — as each category hub is written, and
 * re-run: check-wiki.mjs requires every page to produce an identical sequence of
 * nav *labels*, so a hand-edited page fails with "sidebar nav differs across
 * pages".
 *
 * Idempotent: a page that already carries this nav is left alone.
 */
```

Note `pages/sources.html` is deliberately not in `NAV_GROUPS` — book 1 keeps its sources page off the
sidebar too, and the Main Page and Book page both link it, so `check-wiki.mjs`'s orphan warning stays
quiet.

- [ ] **Step 4: Run the three chrome sweeps**

```bash
cd exodus-the-helium-sea
node scripts/wire-lightbox-script.mjs
node scripts/wire-theme-toggle.mjs
node scripts/regroup-nav.mjs
```

Expected, because the pages were authored already wired:
- `wire-lightbox-script: 0 updated, 4 skipped`
- `wire-theme-toggle: 0 page(s) updated, 4 already wired`
- `regroup-nav` reports 0 changed, or rewrites the nav to a byte-identical block.

If `regroup-nav` reports changes, inspect them with `git diff`. A change to `aria-current` placement
is a real correction and should be kept; a change to link order means the hand-authored nav and
`NAV_GROUPS` disagree, and `NAV_GROUPS` is the source of truth.

- [ ] **Step 5: Run `check-wiki.mjs` to verify nothing regressed**

```bash
cd exodus-the-helium-sea && node scripts/check-wiki.mjs
```

Expected: `check-wiki: OK — 4 pages, 4 index entries, 0 warnings`

- [ ] **Step 6: Commit**

```bash
git add exodus-the-helium-sea
git commit -m "Wire the Helium Sea chrome sweeps and keep the lightbox unit test without its image pass."
```

---

### Task 5: Cache-busting tokens

**Files:**
- Create: `exodus-the-helium-sea/scripts/stamp-assets.mjs` (copy, hub half dropped)
- Modify: all four pages (by running it)

**Interfaces:**
- Consumes: `VERSIONED`, `assetV` from `scripts/lib/assets.mjs` (Task 1).
- Produces: `scripts/stamp-assets.mjs` exporting `stampOne(src, assetRel, version): string` and `stampPage(src, assets, versionFor): string`.

- [ ] **Step 1: Copy `stamp-assets.mjs` and drop the hub half**

```bash
cp exodus-the-archimedes-engine/scripts/stamp-assets.mjs exodus-the-helium-sea/scripts/stamp-assets.mjs
```

Three edits:

1. Drop `HUB_VERSIONED` and `hubAssetV` from the import on line 21:

```js
import { VERSIONED, assetV } from "./lib/assets.mjs";
```

2. Delete `SITE_ROOT` (line 25) and the whole hub block (lines 69–79).

3. Replace the two `console.log` calls at the end with:

```js
  const versions = VERSIONED.map((a) => `${path.basename(a)}=${assetV(a)}`).join(" ");
  console.log(
    `stamp-assets: ${changed} wiki page(s) stamped, ${pages.length - changed} already current`
  );
  console.log(`  ${versions}`);
```

Then replace the last paragraph of the header comment — the one about covering the root hub — with:

```
 * Does NOT touch the root hub. Book 1's copy owns assets/css/hub.css; two books
 * writing the same line would be a no-op today, since the token is derived from
 * that file's own contents, but single ownership is what keeps it that way.
```

- [ ] **Step 2: Verify the pages carry no tokens yet**

```bash
cd exodus-the-helium-sea && grep -c '?v=' index.html search.html pages/book.html pages/sources.html
```

Expected: `0` for all four.

- [ ] **Step 3: Run the stamp**

```bash
cd exodus-the-helium-sea && node scripts/stamp-assets.mjs
```

Expected: `stamp-assets: 4 wiki page(s) stamped, 0 already current`, then a line listing five
`name=hash` pairs.

- [ ] **Step 4: Verify the tokens landed**

```bash
cd exodus-the-helium-sea && grep -c '?v=' index.html search.html pages/book.html pages/sources.html
```

Expected: `5` for `index.html`, `search.html`, `pages/book.html` and `pages/sources.html` — one each
for `wiki.css`, `search-index.js`, `search.js`, `lightbox.js` and `theme.js`.

- [ ] **Step 5: Verify idempotence**

```bash
cd exodus-the-helium-sea && node scripts/stamp-assets.mjs
```

Expected: `stamp-assets: 0 wiki page(s) stamped, 4 already current`

- [ ] **Step 6: Verify the hub was not touched**

```bash
cd .. && git status --porcelain index.html
```

Expected: no output.

- [ ] **Step 7: Re-run the three checks written so far**

```bash
cd exodus-the-helium-sea
node scripts/check-wiki.mjs && node scripts/check-seo.mjs && node scripts/check-lightbox.mjs
```

Expected: all three OK. `check-wiki.mjs` strips `?…` before resolving links (line 67), which is why
the tokens do not break the link check.

- [ ] **Step 8: Commit**

```bash
git add exodus-the-helium-sea
git commit -m "Stamp the Helium Sea assets, leaving the hub stylesheet to book 1."
```

---

### Task 6: Search ranking check

**Files:**
- Create: `exodus-the-helium-sea/scripts/check-search-rank.mjs` (copy, fixture and expectations rewritten)

**Interfaces:**
- Consumes: `assets/js/search.js` (Task 1) and `assets/data/search-index.json` (Task 2).
- Produces: nothing other tasks use.

- [ ] **Step 1: Copy the check**

```bash
cp exodus-the-archimedes-engine/scripts/check-search-rank.mjs exodus-the-helium-sea/scripts/check-search-rank.mjs
```

- [ ] **Step 2: Replace the synthetic fixture (lines 10–14)**

Book 1's fixture names its own cast. Use this wiki's own subjects so the file does not carry another
book's characters:

```js
const index = [
  { title: "Exodus: The Helium Sea", path: "pages/book.html", category: "Book", summary: "Publication facts for the concluding novel", keywords: ["hamilton", "publication"] },
  { title: "Sources and provenance", path: "pages/sources.html", category: "Sources", summary: "What this wiki verifies and reconstructs", keywords: ["provenance", "coverage"] },
  { title: "Main Page", path: "index.html", category: "Main", summary: "Reading companion structure", keywords: ["home", "start"] },
];
```

- [ ] **Step 3: Replace the generic assertions (lines 20–29)**

```js
assert(normalizeQuery("  Sources ") === "sources", "normalizeQuery trims/lowercases");
assert(scoreEntry(index[1], "sources") >= 100, "title match scores high");
assert(scoreEntry(index[1], "provenance") >= 40, "keyword match scores");
assert(scoreEntry(index[1], "verifies") >= 10, "summary match scores");
assert(scoreEntry(index[1], "zzzz") === 0, "no match is zero");

const ranked = rankResults(index, "helium sea");
assert(ranked[0].path === "pages/book.html", "best match first");
assert(resolvePath("../", "pages/book.html") === "../pages/book.html", "resolvePath joins root");
assert(resolvePath("./", "/pages/book.html") === "./pages/book.html", "strips leading slash");
```

Keep the four folding assertions at lines 33–36 exactly as they are — they test `fold()` itself, not
this book's content, and `"Toše"`/`"Cybele’s Eagle"` are fine as folding inputs regardless of which
wiki they sit in.

- [ ] **Step 4: Replace the `EXPECTED` ranking table**

Book 1's table names 15+ of its own articles. This wiki has four pages, so the meaningful
regressions are the aliases that must land on the Book page rather than the Main Page:

```js
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
];
```

Leave the `for (const [q, path] of EXPECTED)` loop at the end of the file unchanged. Note the script
has no success message — it ends with that loop and prints nothing when everything passes.

- [ ] **Step 5: Run it**

```bash
cd exodus-the-helium-sea && node scripts/check-search-rank.mjs && echo "search-rank OK"
```

Expected: `search-rank OK` and nothing else. A failure prints an `assert` message and exits 1.

If `["helium sea", "pages/book.html"]` fails and resolves to `index.html` instead, that is the
Main Page's `"helium sea"` keyword competing. Matching is query-as-substring-of-keyword and
exact-keyword scores 150 against title-substring's 100, so both pages match exactly — remove
`"helium sea"` from the Main Page entry's keywords in **both** `search-index.json` and
`search-index.js`, then re-run `node scripts/apply-seo.mjs` and `node scripts/stamp-assets.mjs`
because the index contents changed.

- [ ] **Step 6: Commit**

```bash
git add exodus-the-helium-sea
git commit -m "Cover the Helium Sea search index with ranking cases of its own."
```

---

### Task 7: Keep it off the live site, and document the two-wiki state

**Files:**
- Modify: `.github/workflows/pages.yml:35`
- Modify: `CLAUDE.md` (root)
- Modify: `README.md:43` (root)
- Create: `exodus-the-helium-sea/README.md`

**Interfaces:**
- Consumes: everything above.
- Produces: nothing consumed by other tasks. This is the last task.

- [ ] **Step 1: Add the prune path**

In `.github/workflows/pages.yml`, change line 35 from:

```yaml
        run: rm -rf docs exodus-the-archimedes-engine/docs
```

to:

```yaml
        run: rm -rf docs exodus-the-archimedes-engine/docs exodus-the-helium-sea
```

and extend the comment above it with a sentence naming why the whole folder goes, not just its docs:

```yaml
        # …existing comment…
        # exodus-the-helium-sea goes entirely: it is a scaffold with no article
        # coverage, and an empty wiki indexed as thin content would cost the site
        # that is deliberately built to be found. Remove this path when it has
        # articles — see docs/superpowers/specs/2026-07-25-exodus-helium-sea-scaffold-design.md.
```

- [ ] **Step 2: Verify the prune covers what you think**

```bash
git ls-files exodus-the-helium-sea | wc -l
```

Note the count. Every one of those files is excluded from the deploy by the line above; none is
excluded from the public repository, which is intended and safe because the folder contains no
spoilers.

- [ ] **Step 3: Write `exodus-the-helium-sea/README.md`**

```markdown
# Exodus: The Helium Sea Wiki

Personal full-spoiler reading companion in plain HTML. Part of the
[Exodus reading companions](../index.html) hub.

> **Not published.** This wiki has no article coverage yet. It is pruned from the GitHub Pages
> artifact by `.github/workflows/pages.yml`, has no card on the hub, and appears in no sitemap.
> `scripts/check-seo.mjs` fails if any of its pages reach `sitemap.xml`.

## Open the wiki

From the repository root — never from this folder, or the hub link and relative asset paths break:

```bash
python -m http.server 8080
```

Then open http://localhost:8080/exodus-the-helium-sea/

## Coverage status

Four pages: Main Page, `pages/book.html` (publication facts), `pages/sources.html` (provenance and
coverage status), and `search.html`. Nothing about the novel's events is recorded yet.

## Add a page

1. Copy `templates/article.html` into `pages/`; set `data-root` / `{{ROOT}}` (`../` or `../../`).
2. Write lead, sections, infobox.
3. Add the **same** entry to `assets/data/search-index.json` and `assets/data/search-index.js` —
   write both from one in-memory object, they must be content-identical.
4. If the page belongs to a new category, add the category hub, add it to `NAV_GROUPS` in
   `scripts/regroup-nav.mjs`, and add the category name to the hub-coverage loop in
   `scripts/check-wiki.mjs`.
5. Run the sweeps, in this order:

```bash
node scripts/apply-seo.mjs
node scripts/wire-lightbox-script.mjs
node scripts/wire-theme-toggle.mjs
node scripts/regroup-nav.mjs
node scripts/stamp-assets.mjs   # last — it rewrites lines the others insert
```

`gen-sitemap.mjs` is deliberately absent: it is site-wide, and book 1 owns `sitemap.xml` while this
wiki stays unpublished.

## Check the wiki

```bash
node scripts/check-wiki.mjs         # structure, chrome, voice, name drift
node scripts/check-search-rank.mjs  # search folding and ranking
node scripts/check-seo.mjs          # descriptions, canonicals, social tags, and absence from the sitemap
node scripts/check-lightbox.mjs     # WikiLightbox open/close
```

All four exit non-zero on failure. `check-images.mjs` is not here yet — it requires
`docs/visual-briefs/index.json`, which arrives with the first illustration.

## Going live

The full sequence is in
`docs/superpowers/specs/2026-07-25-exodus-helium-sea-scaffold-design.md` §5.
```

- [ ] **Step 4: Update the root `README.md`**

Replace line 43:

```markdown
| *planned* | *Exodus: The Helium Sea* (2026) | — |
```

with:

```markdown
| *scaffolded, not published* | *Exodus: The Helium Sea* (2026) | [`exodus-the-helium-sea/`](exodus-the-helium-sea/) |
```

and add below the table:

> The Helium Sea folder holds structure and tooling only — no article coverage — and is excluded
> from the deployed site until it has articles.

Also update line 7, which currently says "One wiki so far, with *Exodus: The Helium Sea* (2026) to
follow" — that stays accurate for the live site and needs no change. Verify it reads correctly
against the new table row rather than assuming.

- [ ] **Step 5: Update the root `CLAUDE.md`**

Three changes:

1. Under **What this is**, replace "Currently one wiki: `exodus-the-archimedes-engine/` …" with a
   two-row description naming both folders, and state that `exodus-the-helium-sea/` is a scaffold
   with no article coverage that is pruned from the deploy.

2. Under **Commands**, add a second block after book 1's five checks:

````markdown
```bash
# The four checks in the Helium Sea wiki. It has no images, so no check-images.mjs.
cd exodus-the-helium-sea
node scripts/check-wiki.mjs
node scripts/check-search-rank.mjs
node scripts/check-seo.mjs          # asserts this wiki is ABSENT from the sitemap
node scripts/check-lightbox.mjs
```
````

3. Add a short section after **Findability (SEO)**:

````markdown
## The unpublished second wiki

`exodus-the-helium-sea/` is a scaffold: four pages, no article coverage, because the novel is still
being read. It is kept off the live site three ways — pruned from the Pages artifact in
`pages.yml`, absent from the hub and `sitemap.xml`, and its own `check-seo.mjs` **fails if any of
its URLs appear in the sitemap**. That inversion is deliberate: it is the opposite of book 1's
assertion, so accidentally publishing the empty wiki breaks a check instead of going unnoticed.

`gen-sitemap.mjs` is not copied into it. The sitemap is site-wide and book 1 owns it; two copies
would overwrite each other. Going live means hoisting that script to cover both books — the full
sequence is in `docs/superpowers/specs/2026-07-25-exodus-helium-sea-scaffold-design.md` §5.
````

- [ ] **Step 6: Run all four checks in book 2**

```bash
cd exodus-the-helium-sea
node scripts/check-wiki.mjs && node scripts/check-search-rank.mjs && \
node scripts/check-seo.mjs && node scripts/check-lightbox.mjs && echo "ALL FOUR PASS"
```

Expected: `ALL FOUR PASS` at the end. Three of the checks print an OK line; `check-search-rank.mjs`
prints nothing on success, so the chained `echo` is what proves it ran and exited 0.

- [ ] **Step 7: Run all five checks in book 1 — the real guard**

```bash
cd exodus-the-archimedes-engine
node scripts/check-wiki.mjs && node scripts/check-search-rank.mjs && \
node scripts/check-images.mjs && node scripts/check-seo.mjs && node scripts/check-lightbox.mjs && \
echo "BOOK 1 STILL PASSES"
```

Expected: `BOOK 1 STILL PASSES`, with `check-wiki.mjs` reporting its usual **8 thin-page warnings** — that is
the documented baseline, not a regression. Any other change means the new folder disturbed the shared
site root; stop and find it.

- [ ] **Step 8: Confirm the site root is untouched**

```bash
cd .. && git status --porcelain
```

Expected: modifications to `.github/workflows/pages.yml`, `CLAUDE.md`, `README.md` and new files
under `exodus-the-helium-sea/` only. **`sitemap.xml`, `robots.txt` and the root `index.html` must not
appear.**

- [ ] **Step 9: Serve and look at it**

```bash
python -m http.server 8080
```

Check by eye:
- http://localhost:8080/ shows **one** book card, unchanged.
- http://localhost:8080/exodus-the-helium-sea/ loads with correct styling, a working theme toggle,
  and a sidebar of three links.
- Typing "hamilton" in the header search returns the Book page.
- **All book wikis** returns to the hub from both the wiki root and `pages/book.html`.

- [ ] **Step 10: Commit**

```bash
git add .github/workflows/pages.yml CLAUDE.md README.md exodus-the-helium-sea/README.md
git commit -m "Keep the Helium Sea scaffold out of the deploy and document the two-wiki state."
```

- [ ] **Step 11: Push and confirm the deploy**

Pushing publishes to a public site in about a minute. The expectation is that **nothing visible
changes** — the new folder is pruned.

```bash
git push
gh run list --limit 1
```

Then confirm the run went green, and that https://mortenbrudvik.github.io/exodus-wiki/exodus-the-helium-sea/
returns **404**. A 200 there means the prune line did not take effect — fix it before doing anything
else.
