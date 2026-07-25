# Helium Sea Wiki Scaffold — Design

**Date:** 2026-07-25
**Status:** Approved for implementation planning
**Project:** Second book wiki folder `exodus-the-helium-sea/`, created empty and kept off the published site
**Delivery:** Four-page static wiki shell + retargeted copies of the book-agnostic tooling + one deploy-prune line

---

## 1. Purpose and success criteria

### Purpose

Stand up the structure and tooling for a reading-companion wiki for *Exodus: The Helium Sea* (Peter
F. Hamilton, 16 June 2026) **before** there is anything to write in it. The owner is still reading
the novel. When article writing starts, the machinery — search index, SEO block, nav, theme, cache
busting, checks — should already be correct, so the first article is an article and not an
infrastructure project.

The site is public and deploys from `main` in about a minute. An empty wiki must therefore not be
reachable from it.

### Constraints and decisions

| Decision | Choice |
|----------|--------|
| Content available | **None.** Owner is still reading; no article content about book 2's story |
| Live-site visibility | **Off the published artifact entirely** until articles exist |
| Tooling strategy | **Self-contained copy**, retargeted — not shared root tooling |
| Page set | **Minimum honest shell** — four pages, each carrying only verifiable content |
| Sidebar nav | Grows with the wiki; links only to pages that exist |
| Book 1 | **Untouched**, except the root docs that describe the collection |

### Success criteria

- `exodus-the-helium-sea/` exists, serves locally from the repo root, and its own checks pass.
- Book 1's five checks still pass — the new folder disturbed nothing at the shared site root.
- Nothing in the published artifact mentions or links the new wiki; `sitemap.xml` is unchanged.
- Writing the first real article is: author the page, add it to the index, run the sweeps.

### Explicit non-goals

- Any article content about book 2's plot, characters, locations, factions or technology.
- Illustrations, visual briefs, hub cards, Connections strips.
- Refactoring book 1's tooling into shared root scripts.
- A hub card, sitemap entry, or cover image for book 2.

---

## 2. Architecture

### Folder layout

```text
exodus-the-helium-sea/
  index.html                       # Main Page
  search.html                      # search UI route (noindex, as in book 1)
  README.md
  pages/
    book.html                      # publication facts
    sources.html                   # provenance rules + coverage status
  assets/
    css/wiki.css                   # copied verbatim from book 1
    js/search.js                   # copied verbatim
    js/lightbox.js                 # copied verbatim
    js/theme.js                    # copied verbatim
    data/search-index.json         # 4 entries
    data/search-index.js           # content-identical file:// fallback
    icons/favicon.svg              # copied verbatim
  templates/
    article.html                   # copied; title suffix retargeted
  scripts/
    lib/seo.mjs                    # constants retargeted
    lib/assets.mjs                 # verbatim
    apply-seo.mjs
    stamp-assets.mjs
    wire-lightbox-script.mjs
    wire-theme-toggle.mjs
    regroup-nav.mjs                # NAV_GROUPS rewritten
    check-wiki.mjs                 # book name + nav expectations retargeted
    check-search-rank.mjs          # cases rewritten for this book's index
    check-seo.mjs                  # sitemap assertion inverted (see §4)
    check-lightbox.mjs
```

`assets/images/` is not created — git does not track empty directories, and there are no
illustrations. It arrives with the first image.

### Why a copy rather than shared tooling

`CLAUDE.md` states each book wiki is self-contained, and `hub.css` already duplicates the palette
for the same reason: a book wiki must not depend on another book's assets. Hoisting the
book-agnostic scripts to a root `scripts/` would remove the duplication but would refactor 87 pages'
worth of working, verified tooling in service of a wiki with no content. The accepted cost is that a
genuine bug fix in a copied script must be applied twice.

### Scripts deliberately **not** copied

| Script(s) | Reason |
|---|---|
| `gen-celestials.mjs`, `gen-dominions.mjs` | Book-1 content generators; the 25 generated pages are a book-1 concept |
| `write-visual-briefs.mjs`, `write-extra-visual-briefs.mjs` | No illustrations to brief |
| `inject-infobox-images.mjs`, `inject-extra-images.mjs` | Nothing to inject |
| `build-hub-cards.mjs` | Needs category hubs with entries |
| `build-connections.mjs`, `lib/connections.mjs` | Needs infoboxes linking illustrated character pages |
| `check-images.mjs` | **Cannot pass**: `check-images.mjs:24` hard-exits when `docs/visual-briefs/index.json` is absent, which it is in an image-free wiki. Arrives with the first illustration |
| `add-dominions-nav.mjs`, `add-dominions-nav-factions.mjs`, `fix-dominions-nav-sidebar.mjs` | Spent book-1 migrations, already no-ops |
| `gen-sitemap.mjs` | Site-wide, not book-scoped — see §4 |

---

## 3. Naming, constants and chrome

### `scripts/lib/seo.mjs` constants

| Constant | Value |
|---|---|
| `SITE` | `https://mortenbrudvik.github.io/exodus-wiki` (unchanged — same site) |
| `BOOK` | `exodus-the-helium-sea` |
| `SITE_NAME` | `Helium Sea Wiki` |
| `BOOK_TITLE` | `Exodus: The Helium Sea` |
| `AUTHOR` | `Peter F. Hamilton` |

Each wiki is named for its own book, not the universe — so the header `site-title` and the
`<title>` suffix are **Helium Sea Wiki**, and `check-wiki.mjs`'s suffix assertion is retargeted to
match. The hub at the site root remains "Exodus".

### Sidebar nav

`NAV_GROUPS` in this book's `regroup-nav.mjs`:

```js
export const NAV_GROUPS = [
  ["This wiki", [["index.html", "Main Page"], ["pages/book.html", "Book"]]],
  ["Elsewhere", [["../index.html", "All book wikis"]]],
];
```

Three links, because `check-wiki.mjs` fails on a link to a page that does not exist. The nav grows as
categories arrive; `regroup-nav.mjs` is idempotent and rewrites every page, so growth is cheap.

`pages/sources.html` is **not** in the nav, matching book 1, where it is reached from the Main Page,
`book.html`, `chapters.html` and `timeline.html` rather than the sidebar. Book 2's Main Page links
it, so it is not an orphan.

### The four pages

| Page | Content |
|---|---|
| `index.html` | Main Page. What the wiki will cover, the full-spoiler warning, a link to Book and to Sources. States that article coverage has not started — no category links, because there are no categories |
| `pages/book.html` | Infobox and prose limited to publication facts: title, author, publisher, published 16 June 2026, series (concludes the duology begun by *Exodus: The Archimedes Engine*, 2024), genre. The publisher line carries Random House Worlds, from the two-novel agreement already cited at `exodus-the-archimedes-engine/pages/sources.html:125`. Page count omitted — not established by any source already in this repo. Links across to the Archimedes Engine wiki |
| `pages/sources.html` | The provenance rules for this book, the same shape as book 1's: what is verified, what is reconstructed, and that coverage has not started. Carries the `exodusgame.com` announcement reference already cited at `exodus-the-archimedes-engine/pages/sources.html:129` |
| `search.html` | The search UI route. `noindex,follow` and excluded from any future sitemap, as in book 1 |

All four are authored from facts already present and sourced in this repository. None asserts
anything about the novel's story.

### Chrome invariants carried over

Skip link, `id="main-content"`, favicon with depth-correct href, `data-root`, the no-flash theme
stamp inline in `<head>`, the `hidden` theme-toggle button revealed by `theme.js`, and the four
end-of-body scripts. `wiki.css` is copied byte-for-byte, which preserves the deliberate duplicate
light-token blocks and the `[hidden]` guards.

---

## 4. Staying dark

Three mechanisms, of which the third is the one that still works when everyone has forgotten this
document.

**1. Pruned from the published artifact.** `.github/workflows/pages.yml:35` becomes:

```yaml
run: rm -rf docs exodus-the-archimedes-engine/docs exodus-the-helium-sea
```

The folder stays in the public repository — which is fine, it contains no spoilers — but never
reaches the site. Reversing it later is deleting one path.

**2. Absent from hub and sitemap.** No card in the root `index.html`. `gen-sitemap.mjs` is not
copied, so nothing regenerates `sitemap.xml` from book 2's index; book 1's copy continues to own the
file and its output is unchanged.

**3. Enforced by check.** Book 2's `check-seo.mjs` inverts the site-root assertion. Book 1's copy
builds the expected URL set from its own index and fails on any `<loc>` outside it
(`check-seo.mjs:83-88`); copied verbatim into book 2 that logic would reject every one of book 1's
URLs as unknown. Instead, while the book is dark, book 2's copy asserts:

- every `pageUrl(entry.path)` for its own index is **absent** from the site-root `sitemap.xml`;
- `sitemap.xml` and `robots.txt` still exist (book 1 owns them);
- per-page description, canonical, `og:*` and title-uniqueness checks run unchanged.

So publishing the empty wiki by accident becomes a failing check rather than something to notice.

The inverted block carries a comment naming the go-live step that flips it, so the two halves cannot
drift apart silently.

---

## 5. Documentation changes

### Updated now

| File | Change |
|---|---|
| `CLAUDE.md` (root) | "Currently one wiki" is no longer true. Add the second wiki, its command block, the dark-site rule and why it exists, and the go-live checklist below |
| `README.md` (root) | The *planned* row for *Helium Sea* becomes a scaffolded-but-unpublished row, with a note that it is not on the live site |
| `exodus-the-helium-sea/README.md` | New: what this wiki is, that it has no article coverage yet, how to run its checks, and that it is pruned from the deploy |

### Go-live checklist — written down, not executed

When the wiki has real article coverage:

1. Remove `exodus-the-helium-sea` from the `pages.yml` prune line.
2. Hoist `gen-sitemap.mjs` to a root-level script that reads **both** books' indexes into one
   `sitemap.xml`, and have both books' `check-seo.mjs` validate against that combined set.
3. Flip book 2's inverted sitemap assertion back to the positive form.
4. Add the hub card in the root `index.html`, with a cover image and the same non-free-cover
   provenance note book 1 carries.
5. Update both READMEs and the root `CLAUDE.md`.

---

## 6. Sync invariants for the new wiki

The eleven-step list in `CLAUDE.md` applies to book 2 with four steps absent until the content that
needs them exists. For the shell, adding a page means:

1. The `.html` file (from `templates/article.html`; `data-root` set to `../` or `../../`).
2. `assets/data/search-index.json`.
3. `assets/data/search-index.js` — content-identical; write both from the same in-memory object.
4. `node scripts/apply-seo.mjs`.
5. `node scripts/wire-lightbox-script.mjs`.
6. `node scripts/wire-theme-toggle.mjs`.
7. `node scripts/regroup-nav.mjs`.
8. `node scripts/stamp-assets.mjs` — **last**, as in book 1.

Absent until they apply: the category hub step (no hubs yet), the generator step (no generators),
`gen-sitemap.mjs` (site-wide, book 1 owns it), and `build-connections.mjs` / `build-hub-cards.mjs`.

---

## 7. Error handling and edge cases

| Case | Behavior |
|---|---|
| Someone runs book 2's `gen-sitemap.mjs` | Impossible — not copied. Book 1's copy is the only one, and its output is unaffected by book 2 |
| Someone adds a hub card early | `check-seo.mjs` in book 1 does not check for absent cards, so this is caught by review, not tooling. The prune line still keeps the target off the site, so the card would 404 — an honest failure, not a silent one |
| Book 2 accidentally enters `sitemap.xml` | Book 2's inverted assertion fails |
| `file://` browsing | Works: `search-index.js` short-circuits the fetch, and versioned assets resolve, exactly as in book 1 |
| Line endings | `core.autocrlf=true`; copied files keep their existing endings, and asset hashes are computed on LF-normalised content |
| Duplicate `<title>` across books | Not possible to detect from one book's `check-seo.mjs`, and not a problem while book 2 is unpublished. Folded into go-live step 2 |

---

## 8. Verification

1. `cd exodus-the-helium-sea && node scripts/check-wiki.mjs` → passes.
2. `node scripts/check-search-rank.mjs`, `check-seo.mjs`, `check-lightbox.mjs` → pass.
3. `cd exodus-the-archimedes-engine` → all **five** checks still pass. This is the real guard: it
   proves the new folder did not disturb `sitemap.xml`, `robots.txt` or the hub.
4. `git diff` shows `sitemap.xml` and `robots.txt` unchanged.
5. Serve from the repo root; the hub shows **one** card; `/exodus-the-helium-sea/` loads with working
   theme toggle, search dropdown and back-link to the hub.
6. Open a book-2 page over `file://` and confirm search still returns results.
7. Confirm the deploy prune: the `pages.yml` run line lists the new folder.

---

## 9. Implementation units

| Unit | Responsibility | Depends on |
|---|---|---|
| `assets/` copy | Byte-identical CSS/JS/icon from book 1 | — |
| `scripts/lib/` | `seo.mjs` constants for this book; `assets.mjs` verbatim | assets copied |
| Four pages + `templates/article.html` | The shell's markup and its authoring template | `scripts/lib/seo.mjs` |
| `assets/data/search-index.{json,js}` | Four entries; the two files content-identical | pages exist |
| Sweeps (`apply-seo`, `wire-*`, `regroup-nav`, `stamp-assets`) | Insert SEO, scripts, nav, cache-busting tokens | index + pages |
| Checks (`check-wiki`, `check-search-rank`, `check-seo`, `check-lightbox`) | Validate the shell; `check-seo` also enforces the dark-site invariant | everything above |
| `pages.yml` prune line | Keep the folder out of the published artifact | folder exists |
| Docs (`CLAUDE.md`, both READMEs) | Describe the two-wiki state and the go-live sequence | folder exists |
