# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A collection of hand-authored, full-spoiler reading-companion wikis for novels. Plain multi-page
static HTML — **no build step, no framework, no package.json, no dependencies**. The repo root is a
hub that lists each book wiki; each book lives in its own kebab-case folder and is self-contained.

Deployed to GitHub Pages from `main` by `.github/workflows/pages.yml`, which uploads the repo root
verbatim. **The repository and the live site are public.** Articles assume the reader has finished
the book.

Currently one wiki: `exodus-the-archimedes-engine/` (*Exodus: The Archimedes Engine*, Peter F.
Hamilton, 2024).

## Commands

```bash
# Serve from the repository ROOT — never a book subfolder, or the "All book wikis"
# link and the hub's relative asset paths break.
python -m http.server 8080
```

```powershell
.\serve.ps1                                          # serve on 8080 and open the hub
.\serve.ps1 -Port 3000 -Path /exodus-the-archimedes-engine/
.\serve.ps1 -NoBrowser
```

Prefer HTTP over `file://`: search `fetch`es its JSON index. A JS fallback index is also shipped so
`file://` degrades rather than breaking.

```bash
# The only test in the repo. Run after ANY change to pages, the search index, or search.js.
cd exodus-the-archimedes-engine && node scripts/check-search-rank.mjs
```

It asserts query normalisation, ~15 ranking outcomes against the real index, that every index entry
points at an existing file, that no path is indexed twice, and that the two index files are
identical. There is no linter, formatter, or other test framework.

## The generated-pages trap

**25 pages under `exodus-the-archimedes-engine/` are generated, not hand-authored.** Editing their
HTML directly appears to work and is silently reverted the next time a generator runs.

| Generator | Writes |
|---|---|
| `scripts/gen-celestials.mjs` | 18 pages in `pages/characters/` |
| `scripts/gen-dominions.mjs` | 7 pages in `pages/factions/` |

Get the exact list with `grep -oE 'file: "[^"]+"' scripts/gen-*.mjs`. To change one of those pages,
edit the generator's template literal or infobox tuple array and re-run it:

```bash
node scripts/gen-celestials.mjs && node scripts/gen-dominions.mjs
```

The generators are the source of truth and currently reproduce all 25 pages byte-for-byte. To verify
no drift after editing, copy each generator to a temp dir with its `const dir = …` line pointed at a
scratch directory, run it, and diff against `pages/`. Any sitewide sweep over `pages/*.html` must be
mirrored into both generators or it will be lost.

`scripts/add-dominions-nav*.mjs` and `scripts/fix-dominions-nav-sidebar.mjs` are spent one-shot
migrations. They guard against re-application and are now no-ops; leave them alone.

## Sync invariants

Adding, renaming or removing a page means touching **four or five** things:

1. The `.html` file (copy `templates/article.html`; set `data-root` to `../` or `../../`).
2. Its category hub — every page must be reachable from `pages/<category>/index.html`.
3. `assets/data/search-index.json`.
4. `assets/data/search-index.js` — the `file://` fallback, which must be **content-identical** to
   the JSON. Safest approach: mutate the JSON, then write both files from the same in-memory object.
5. The generator, if the page is one of the 25.

`data-root` is not decoration: `search.js` reads `document.body.getAttribute("data-root")` to
resolve index and result paths from nested folders. A wrong value silently breaks search on that
page only.

## Search architecture

`assets/js/search.js` exposes `window.WikiSearch` and wires the header dropdown, the `search.html`
results page, and the mobile nav drawer. Two behaviours are easy to break:

- **`fold()`** lowercases, strips diacritics, drops apostrophes, and collapses all other
  punctuation to single spaces. Queries *and* index fields both pass through it, so they must never
  be normalised differently. This is what makes `helena chione`, `Helena-Chione`, `tose` → `Toše`,
  and `cybeles eagle` all resolve.
- **Scoring tiers** (`scoreEntry`): exact title 250, title prefix 125, title substring 100, exact
  keyword 150, keyword substring 40, summary 10, plus 15 when the query extends the title
  (`makaio faraji` over `Makaio`). Exact-keyword outranks title-substring deliberately, so an alias
  lands on its own subject rather than an incidental page that merely mentions the name.

Matching is **query-as-substring-of-keyword**, so always index the *longest* form: `terrik papuan`,
not `terrik` — otherwise the longer, more natural query fails. When you add an alias or alternate
spelling, add a case to `check-search-rank.mjs`.

## Page chrome invariants

Every page carries identical chrome; compare against `templates/article.html` before hand-writing
one:

- `<a class="skip-link" href="#main-content">` as the first child of `<body>`, and
  `id="main-content"` on `<main class="content">`.
- The 11-item sidebar nav, byte-identical across all pages.
- `aria-current="page"` on the nav link pointing at the current page — only the hub-level pages
  (Main Page, Book, each category index, Dominions roster, Timeline, Plot, Chapters) have a
  self-link to mark.
- Pages with no infobox use `<article class="article article--wide">`; pages with one use plain
  `.article` and rely on the two-column grid. Do not reintroduce inline
  `style="grid-template-columns: 1fr"`.
- `.hub-list` is a CSS grid, not multi-column, so multi-line entries never split across the gutter.

Relative links only — everything must work under `https://<user>.github.io/my-books/`. Book wikis
reach the hub via `../index.html` from a wiki root, with one more `../` per nesting level.

## Editorial conventions

These are enforced conventions, not suggestions, and past passes have violated them at scale:

- **Encyclopedic voice.** State what the novel does, in the present tense. Never let the wiki's
  source material be the grammatical subject. Banned: "Public lists place…", "Secondary sources…",
  "in recaps", "Excerpt:", "Soft uncertainty applies…", "For wiki purposes, treat X as…", naming
  Wikipedia, addressing the reader, and real-world critical reception inside in-universe articles.
- **Provenance lives on one page.** `pages/sources.html` is the only home for sourcing,
  verification dates and confidence notes. Article prose does not discuss its own reliability.
- **Prefer a short accurate stub over invented canon.** Thin pages carry
  `<p class="stub-notice">`; see `pages/locations/boksrock.html`.
- **Names** use the spelling on the subject's own page (its `<h1>` and search-index title), reused
  everywhere.
- **Ship names** are italicised when they mean the hull (`the <em>Diligent</em>'s ZPZ`) and left
  roman when they mean the people or their politics (`Diligent settlers`). Section headings leave
  ship names roman by convention here.
- **`Uranic` and `Celestial`** are clade names — always capitalised, like a nationality.
- **DRY**: link rather than restating the same plot beat at length on several pages.

## Repo etiquette

Per a standing user preference recorded in `docs/superpowers/plans/`, **do not run `git commit`**
unless asked. Pushing to `main` publishes to the live site.

`core.autocrlf=true` on this machine, so mixed CRLF/LF working-tree files produce clean diffs; don't
"fix" line endings or add a `.gitattributes` for them.

Design specs and implementation plans for past work live in `docs/superpowers/` at both the root and
inside the book folder. They are historical records — read them for intent, don't rewrite them.
