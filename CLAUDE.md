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

Search itself does not need the server. Every page loads `assets/data/search-index.js` before
`search.js`, and `loadIndex()` short-circuits on the `window.WIKI_SEARCH_INDEX` global it defines, so
the JSON `fetch` only runs if that script is missing — search behaves the same over `file://`. Serve
over HTTP anyway for realistic relative-link behaviour.

```bash
# The three checks in the repo. Run all three after ANY change to pages, the index, search.js,
# or the images.
cd exodus-the-archimedes-engine
node scripts/check-wiki.mjs         # structure, chrome, voice, name drift, generator sync
node scripts/check-search-rank.mjs  # search folding and ranking
node scripts/check-images.mjs       # brief, asset and infobox-markup coverage for every image
```

All three exit non-zero on failure. `check-wiki.mjs` additionally prints advisory **warnings** that
deliberately do not fail the run (possible name drift, thin pages without a stub notice, orphans,
index titles disagreeing with their `h1`) — 8 thin-page warnings are the expected baseline.

`check-images.mjs` only proves each subject has a brief, a non-blank file and matching markup — it
cannot see *inside* a JPEG. Nothing burned into an image (captions, dates, titles) is greppable or
checkable, so image content is reviewed by eye. See "Illustrations" below.

`check-wiki.mjs --quiet` suppresses the per-check progress lines. There is no linter or formatter.

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

The generators are the source of truth and currently reproduce all 25 pages byte-for-byte.
`check-wiki.mjs` enforces this: it re-renders both generators into a scratch directory (via the
`WIKI_OUT_DIR` env override they accept) and fails if any committed page differs. Any sitewide sweep
over `pages/*.html` must be mirrored into both generators, or the next run reverts it — and the
check will tell you.

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
- `<link rel="icon" href="…assets/icons/favicon.svg" type="image/svg+xml">` in the `<head>`, with the
  same `../` depth as the stylesheet. `check-wiki.mjs` resolves that href and fails if it does not
  land on a non-empty file.
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
- **Prefer a short accurate stub over invented canon.** A stub notice marks coverage that is
  *scope-limited relative to the novel* — the subject has more to it than the article can
  responsibly say. It is **not** a word-count badge. `pages/locations/boksrock.html` carries one at
  ~295 words because the novel only ever treats Boksrock as an endgame instrument, and the notice
  says exactly that. A 100-word generated walk-on that already states everything the novel
  establishes is **complete, not a stub**, and must not be labelled one — that would imply missing
  material that does not exist. So thin-but-complete pages outnumbering stub-notice pages is the
  expected state, not a defect; the 8 thin-page warnings are those pages.
- **Names** use the spelling on the subject's own page (its `<h1>` and search-index title), reused
  everywhere.
- **Ship names** are italicised when they mean the hull (`the <em>Diligent</em>'s ZPZ`) and left
  roman when they mean the people or their politics (`Diligent settlers`). Section headings leave
  ship names roman by convention here.
- **`Uranic` and `Celestial`** are clade names — always capitalised, like a nationality.
- **Spelling** is Oxford British: `-our` (labour, honour, favour), `-re` (centre, theatre, metre),
  `-ise`→**`-ize`** (radicalize, civilization, organized), doubled `-ll-` (travelling), `licence` for
  the noun and `license` for the verb. Two exceptions are proper nouns and stay as they are: the
  **Travelers** faction, and the tie-in title *Creature Catalog* on `pages/sources.html`.
- **DRY**: link rather than restating the same plot beat at length on several pages.

## Illustrations

Infobox images live under `assets/images/{characters,ships}/`, each backed by a maintainer brief in
`docs/visual-briefs/` and listed in that folder's `index.json`. Characters come in at 3:4, ships at
16:9. Celestial portraits are emitted by `gen-celestials.mjs` — the generated-pages trap applies, so
never hand-edit those; every other page is served by `scripts/inject-infobox-images.mjs`, which is
idempotent and skips any page that already has `.infobox-image`. `check-images.mjs` prints the
current counts.

The illustrations are **inferred, not canonical** — no likeness is described in the novel. Two rules
follow, and both have been violated before:

- **No text inside an image.** No caption bars, ranks, house names, service numbers or dates. The
  briefs already specify "no text, no watermark, no UI chrome"; assets have shipped with captions
  anyway, asserting titles and dates (`2784.4`, `c. 478 Post-Collapse`) that appear nowhere in the
  wiki and contradict `timeline.html`'s own "years are approximate" caveat. Burned-in text is
  invented canon that no check can catch — treat a caption bar as a blocking defect.
- **Anything the novel does not fix goes under "Inference flags"** in the brief, not under
  "Physical / design cues (research)". Hair and eye colour, and any visible hardware, are
  inferences unless a page says otherwise.

Reader-facing provenance for the images lives on `pages/sources.html` like all other provenance —
never in article prose.

## External sources (Exodus wiki)

Public materials useful for verification — publishers, official franchise pages, interviews, fan
recaps, parallel wikis, and what *not* to use — are inventoried in:

`exodus-the-archimedes-engine/docs/external-sources-research.md`

That file is a **maintainer reference**, not article copy. Reader-facing provenance stays on
`exodus-the-archimedes-engine/pages/sources.html`, which summarises the same rules and links to the
research doc.

When expanding lore from outside the novel:

1. Prefer the book; secondary sources only cross-check names, order, or franchise vocabulary.
2. Do not merge game-era / TTRPG framing into novel articles unless the book supports it.
3. Do not use unauthorized full-text dumps of the novel.
4. Put any new “we checked X” notes on `pages/sources.html` (and optionally extend the research
   markdown), never in character/location/faction/technology prose.

## Repo etiquette

**Committing and pushing are both pre-authorised** for this repo (owner, 25 July 2026) — you do not
need to ask. This supersedes the older "do not run `git commit`" note in
`docs/superpowers/plans/2026-07-23-book-wikis-hub.md`, which is a historical record.

Pushing `main` publishes to a public website in about a minute, so:

- Run both checks before you commit. They are the gate that replaces asking.
- Prefer several focused commits over one sweeping one; the history is the only review trail.
- After pushing, confirm the Pages run went green (`gh run list --limit 1`) rather than assuming it.

`core.autocrlf=true` on this machine, so mixed CRLF/LF working-tree files produce clean diffs; don't
"fix" line endings or add a `.gitattributes` for them.

Design specs and implementation plans for past work live in `docs/superpowers/` at both the root and
inside the book folder. They are historical records — read them for intent, don't rewrite them.
