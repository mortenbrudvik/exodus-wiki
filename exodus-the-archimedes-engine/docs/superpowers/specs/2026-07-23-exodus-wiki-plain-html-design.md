# Exodus: The Archimedes Engine — Plain HTML Wiki Design

**Date:** 2026-07-23  
**Status:** Approved for implementation planning  
**Project:** Personal reading-companion wiki for *Exodus: The Archimedes Engine*  
**Delivery:** Multi-page static site (plain HTML + shared CSS + light JS)

---

## 1. Purpose and success criteria

### Purpose

A **personal reading companion** for looking up characters, places, factions, technology, timeline, and plot while or after reading the novel.

### Constraints and decisions

| Decision | Choice |
|----------|--------|
| Audience | Personal use (not a public fan platform) |
| Spoilers | **Full spoilers allowed** — treat the book as finished |
| Content depth | **Expanded lore** — overview, main + secondary characters, locations, factions, technology, timeline, plot |
| Article text | **As complete as practical** from public information; user may correct later |
| Site shape | **Multi-page** — one HTML file per article |
| Look and feel | **Clean modern wiki** — Wikipedia-like structure (nav, article, infobox), not a monobook clone |
| Interactivity | **Search is essential**; light client-side JS is fine |
| Build tooling | **None** for v1 — hand-authored HTML |

### Success criteria (v1 “done”)

- Open Main Page offline (via local static server if needed for search).
- Navigate by category hubs and internal wikilinks.
- Find topics via header search (dropdown + full results page).
- Major plot arcs covered on Plot + Timeline and cross-linked from key character/faction pages.
- Secondary topics exist at least as stubs with a one-line summary in the search index.
- README documents how to open the wiki so search works.

---

## 2. Architecture

### Stack

- **HTML** — one file per article; no framework
- **CSS** — single shared stylesheet `assets/css/wiki.css`
- **JS** — `assets/js/search.js` for client-side search only
- **Data** — `assets/data/search-index.json` (with JS-embed fallback if needed)
- **No** backend, auth, build step, or service worker in v1

### Runtime model

1. User opens `index.html` (preferably through a local static file server).
2. Shared CSS styles the common chrome (header, sidebar, article, infobox, footer).
3. Search script loads the index once, caches it in memory, and filters on query.
4. All navigation is normal relative links between HTML files.

### Directory layout

```text
/
  index.html                      # Main Page
  search.html                     # Full search results (?q=)
  README.md                       # How to open / contribute pages
  assets/
    css/wiki.css
    js/search.js
    data/search-index.json        # Primary index (fetch when served over HTTP)
    data/search-index.js          # v1 fallback: window.WIKI_SEARCH_INDEX (keep in sync with JSON)
  pages/
    book.html                     # Book overview
    plot.html
    timeline.html
    characters/
      index.html                  # Category hub
      <name>.html
    locations/
      index.html
      <name>.html
    factions/
      index.html
      <name>.html
    technology/
      index.html
      <name>.html
  templates/
    article.html                  # Copy-paste starter template
```

### Page chrome (every article)

| Region | Role |
|--------|------|
| **Header** | Site title + search box |
| **Left nav** | Main Page, Book, Characters, Locations, Factions, Technology, Timeline, Plot |
| **Article body** | `h1`, lead paragraph, `h2`/`h3` sections, wikilinks |
| **Infobox** | Key facts when useful (right column on wide viewports) |
| **Footer** | Category links / related pages |

Relative asset paths must work from both the site root and nested folders (e.g. `pages/characters/…` → `../../assets/…`).

---

## 3. Content model

### Page types (v1)

| Type | Responsibility | Typical infobox fields |
|------|----------------|------------------------|
| Main Page | Book intro, how to use wiki, key links, site-wide spoiler notice | — |
| Book overview | Author, series/context, premise, publication | Title, author, year, series |
| Characters | Role, arc, relationships, key events (full spoilers) | Affiliation, status, aliases |
| Locations | Description, narrative role, who appears there | Region/system, type, notable events |
| Factions | Goals, structure, conflicts | Leader, side, territory |
| Technology | In-story function and plot importance | Category, users, limitations |
| Timeline | Ordered full-spoiler events with links to articles | — |
| Plot summary | Structured acts/arcs (not chapter dumps) | — |
| Category hubs | Alphabetical or grouped index of pages in that type | — |

### Article conventions

- **Lead:** 2–4 sentences answering “who/what is this?”
- **Sections:** clear `h2`/`h3` structure (e.g. Background, Role in the story, Relationships)
- **Wikilinks:** relative HTML links between articles
- **File names:** `kebab-case.html` (e.g. `archimedes-engine.html`)
- **Stubs:** short page + explicit “Stub: expand when more is known” — do not invent canon
- **Spoilers:** site-wide notice on Main Page only; no per-section spoiler gates
- **Tone:** neutral encyclopedic voice; own-words summaries; no long novel quotations
- **Consistency:** spelling of names established on overview and reused everywhere
- **DRY:** prefer links over repeating the same plot beat on many pages

### Search index entry schema

```json
{
  "title": "Display Name",
  "path": "pages/characters/example.html",
  "category": "Characters",
  "summary": "One-line blurb for results",
  "keywords": ["alias", "faction", "place"]
}
```

- Paths are site-root-relative (e.g. `pages/characters/example.html`).
- `search.js` resolves them using a site-root base declared on each page (e.g. `<body data-root="../../">` or a `<base>`-equivalent convention) so dropdown links work from nested folders.
- Every published article **must** have one index entry in **both** `search-index.json` and `search-index.js` (same content).
- Every listed page appears on its category hub.

### Completeness bar (v1)

- Full articles for major characters, key locations, main factions, and core technology where public info allows.
- Secondary characters/places as shorter articles or stubs.
- Timeline and plot summary present and cross-linked.
- Hubs and search index stay in sync with the file tree.

### Out of scope (v1)

- User accounts, in-browser editing, comments
- Book-cover or copyrighted art (unless user supplies allowed assets later)
- Mobile app shell, offline service worker, PWA
- Chapter-by-chapter reading notes
- Markdown build pipeline, theme toggle, random page, print stylesheet  
  (explicit future options — not required for v1)

---

## 4. UI, navigation, and search

### Visual design

- Neutral background; readable system or web-safe font stack; clear heading hierarchy
- Left sidebar ~220px on desktop
- Main column max-width ~45–50rem
- Infobox: right column on wide screens; full-width stack on narrow screens
- Light borders and subtle section separation — structure inspired by Wikipedia, not a visual clone
- In-article links distinct; visited state slightly muted
- Category chips/links under the article body

### Responsive behavior

- **Desktop:** sidebar + body + infobox
- **Narrow:** header includes a **Menu** control that shows/hides the sidebar; infobox stacks full width above or below the lead

### Search behavior

1. Search box appears in the header on every page.
2. On first use, prefer in-page `window.WIKI_SEARCH_INDEX` if already loaded; otherwise `fetch` `search-index.json`. Cache in memory for the session.
3. Match case-insensitive substrings against `title`, `keywords`, and `summary`.
4. **Dropdown:** top ~8 results (title, category, short summary) while typing (debounced).
5. **Full results:** Enter / Search button → `search.html?q=…` with complete ranked list.
6. **Ranking:** title match > keyword match > summary match; alphabetical title as tie-break.
7. **Empty state:** “No pages matched … — try a character or faction name.”
8. **Index load failure:** clear message (use local server / check path / try JS fallback).

### `file://` and local serving

Some browsers block `fetch` of local JSON under `file://`.

**Mitigations (both in v1; documented in README):**

1. Preferred: open via a simple local static server (e.g. `python -m http.server` or `npx serve`).
2. Always ship `search-index.js` and include it on pages so search still works when JSON `fetch` is blocked (e.g. some `file://` cases).

### Manual page checklist

When adding an article:

1. Copy `templates/article.html`.
2. Fill lead, sections, and infobox.
3. Link from the appropriate category hub.
4. Add the same entry to `search-index.json` and `search-index.js`.
5. Add natural wikilinks from related existing articles.

### Link health

- No automated test suite required for v1.
- Maintain hubs + index when adding pages.
- Optional later: one-off link audit script (not part of v1 scope).

---

## 5. Implementation order

1. **Shell** — CSS layout, shared header/sidebar/footer patterns, search JS + index schema, article template, README open instructions.
2. **Foundation pages** — Main Page, Book overview, empty-or-thin category hubs, `search.html`.
3. **Core lore cluster** — major characters, key locations, main factions, flagship technology topics.
4. **Narrative spine** — full-spoiler Plot summary + Timeline, cross-linked into the cluster.
5. **Secondary coverage** — shorter articles/stubs for secondary characters and places.
6. **Sync pass** — search index completeness, hub lists, spot-check relative paths and search queries.

### Content quality rules during seeding

- Prefer short accurate stubs over invented detail when sources are thin.
- Mark soft uncertainty sparingly (“appears as…”, “in the novel…”) rather than asserting unknown facts.
- Encyclopedic summaries only; no long quotations from the novel.

---

## 6. Verification plan

Manual checks before calling v1 complete:

1. Open Main Page via local server; confirm layout and spoiler notice.
2. Follow 3–5 deep links from hubs into nested article paths and back.
3. Search: known title hit, keyword hit, nonsense query → empty state.
4. Confirm relative CSS/JS paths from `pages/characters/*.html`.
5. Confirm every hub-listed page exists and every article has a search index entry.

---

## 7. Future work (non-goals for v1)

- Markdown (or other) source + static generator for nav/index sync
- Chapter notes page type
- Theme toggle, random article, print CSS
- Richer search (fuzzy match, stem, category filters)
- Optional images supplied by the user

---

## 8. Summary

Build a **hand-authored multi-page plain HTML wiki** with shared modern-wiki styling and **client-side search**. Full spoilers; expanded lore; content as complete as public sources allow, with stubs instead of invention. No build pipeline in v1. Personal offline companion first; structure stays simple enough to evolve later.
