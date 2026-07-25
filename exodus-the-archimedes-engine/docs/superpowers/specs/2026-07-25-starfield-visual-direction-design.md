# Starfield: a visual direction for the Archimedes Engine wiki

**Date:** 25 July 2026
**Status:** approved, ready for planning
**Supersedes nothing.** Extends `2026-07-23-exodus-wiki-plain-html-design.md`, which established the
plain-HTML architecture. That architecture does not change: no build step, no framework, no
dependencies, works over `file://`.

## Why

The current design is a competent default that says nothing about the book. Five directions were
mocked up in `docs/mockups/` and compared on the same two real pages. Starfield was chosen.

What is actually wrong today, in order of how much it costs a reader:

1. **The 59 illustrations are wasted.** Each appears exactly once, in a ~240 px box, and only after
   the reader has already found the page. No hub shows a single face. This is the largest asset the
   wiki owns and it does no navigational work.
2. **Category hubs are walls of bullets.** `pages/characters/index.html` is 40 names in three
   columns of grey text. Nothing distinguishes a protagonist from a walk-on.
3. **The prose reads as blue noise.** On `finn-jalgori-tobu.html` roughly one word in six is a link
   in saturated `#0b57d0`.
4. **No dark mode**, on a site about a novel that most people read at night.
5. **No orientation.** Long articles have no table of contents; the 11-item sidebar is one flat
   list where "Chapters" sits at the same level as "All book wikis".
6. **A layout bug.** `.article`'s row gap leaves ~55 px of dead space between every `h1` and its
   lead paragraph, because the infobox occupies `grid-row: 1 / span 8` in column 2.

## The direction

Dark-first, image-led. The wiki looks like something read at night, and the illustrations carry
navigation rather than decorating it.

**Dark is the default theme, not a fallback.** The light theme is held to the same standard — it is
what a reader gets in daylight, and Wikipedia's 2024 dark-mode rollout showed that adding a second
theme mostly surfaces contrast bugs that were already there. Both themes are specified as token
sets and both must pass contrast checks.

### Tokens

Defined once in `:root` on `assets/css/wiki.css`, with a light override under
`[data-theme="light"]`. No other file defines colour.

| Token | Dark (default) | Light | Used for |
|---|---|---|---|
| `--bg` | `#0a0e14` | `#f7f8fa` | page ground |
| `--panel` | `#111823` | `#ffffff` | infobox, cards, header |
| `--raised` | `#1a2431` | `#eef1f5` | active nav, hover |
| `--line` | `#22303f` | `#dde2e9` | hairlines, borders |
| `--text` | `#dce3ed` | `#151a21` | body |
| `--muted` | `#8493a8` | `#5a6472` | secondary |
| `--dim` | `#5f6e83` | `#7b8593` | labels, captions |
| `--accent` | `#4fc3d9` | `#10627a` | links, current state |
| `--accent-dim` | `#2b7f92` | `#8fc0cd` | link underline |
| `--warn` | `#e8b25c` | `#8a5d10` | spoiler and stub notices |

Type: `--sans` (Segoe UI / system-ui stack) for body at 18 px / 1.72; `--mono` (ui-monospace stack)
for every datum — infobox labels, categories, counts, timeline years. Measure capped at 66ch.
No web fonts: nothing may be fetched from a CDN, and every page must still render over `file://`.

### Components

| Component | Change | Markup? |
|---|---|---|
| Header | Panel background, brand glyph, nav pills, theme toggle | yes — toggle button |
| Sidebar nav | Grouped under five labels; identical on all 87 pages | yes |
| Article | 66ch column, mono section rules, fixes the row-gap bug | CSS only |
| Infobox → dossier | Full-bleed portrait at the top of the panel, mono labels | CSS only |
| Connections strip | New: character links from the infobox, as faces | yes — generated |
| Category hubs | Card grid with portraits, monogram fallback for the rest | yes — generated |
| Notices | Amber-on-tint spoiler and stub banners | CSS only |
| Tables, timeline | Mono numerics, zebra-free hairline rules | CSS only |

## Decisions that differ from the mockup

These are deliberate; the mockup was an exploration, not a contract.

- **No per-page image captions.** The mockup put "Inferred illustration — no likeness is described
  in the novel" under every portrait. `CLAUDE.md` requires that provenance lives on
  `pages/sources.html` and nowhere else, and a caption on 59 pages is exactly the sprawl that rule
  exists to prevent. Sources already carries this. The `alt` text stays, and hub grids carry one
  line at the top of the page rather than 40 repetitions.
- **Connections are derived, never hand-written.** The mockup implied a new editorial field per
  character. Instead the strip is generated from the infobox that already exists: any `<dd>` that
  links to `pages/characters/*.html` **and** has a matching image in
  `assets/images/characters/` becomes a chip, and its `<dt>` becomes the relationship label
  ("Siblings" → "Sibling", "Allies" → "Ally"). No new data to maintain, and it cannot drift from the
  infobox because it is the infobox.
- **The strip renders only at three or more chips.** Below that it looks like an accident. Pages
  with fewer simply do not get one.
- **Hubs with little art still get cards.** Locations, factions and technology have 5, 4 and 4
  images against many more pages. Entries without art get a monogram plate — the subject's initial
  set in the display face on a category-tinted panel. No invented imagery, and the grid stays
  regular.

## Constraints this must respect

`check-wiki.mjs` enforces these verbatim. Any of them broken fails the build:

- `<a class="skip-link" href="#main-content">` as the first child of `<body>`.
- `<main class="content" id="main-content">` — exact string.
- `<nav aria-label="Wiki">` present, and **byte-identical across all 87 pages**. Regrouping the nav
  is fine; regrouping it inconsistently is a hard failure.
- `class="lead"` on every page but `search.html`; a category footer on every page but the index and
  search; exactly one `h1`; `data-root` correct for depth; a resolvable favicon; the
  `… — Archimedes Engine Wiki` title suffix; `search-index.js`, `search.js` and `lightbox.js` all
  loaded.
- `aria-current="page"` on a nav self-link, and only there.

And two repo-specific traps:

- **The generated-pages trap.** 25 pages are written by `gen-celestials.mjs` and
  `gen-dominions.mjs`. Every markup change must be mirrored into both generators or the next run
  reverts it. `check-wiki.mjs` re-renders them and fails on any difference.
- **Line endings.** The two generators write different endings on purpose (celestials CRLF,
  dominions LF) and normalise at write time. Do not unify them.

## Theme switching without a flash

`assets/js/theme.js` handles the toggle and persists the choice in `localStorage`. That alone
flashes dark before switching to a stored light preference, so a three-line inline script in
`<head>` reads the stored value and stamps `data-theme` on `<html>` before first paint. When
nothing is stored, `prefers-color-scheme` decides, defaulting to dark.

The toggle is a real `<button>` with an accessible name that reflects what it will do. It must work
without JavaScript in the sense that the page is fully readable — JS off simply means the OS
preference wins and the button does nothing visible.

## What ships, in order

Each step ends with all five checks green and is its own commit.

1. **Tokens and chrome.** Rewrite `wiki.css` with both themes; restyle header, nav, article,
   infobox, notices, tables. CSS only — no page touched, no generator affected. The row-gap bug dies
   here.
2. **Theme toggle.** `theme.js`, the inline head snippet, the header button. Sweep script over 87
   pages, mirrored into `templates/article.html` and both generators.
3. **Nav grouping.** One sweep, identical output everywhere, mirrored into the generators.
4. **Hub card grids.** Generate the markup for all five category hubs plus the two rosters.
5. **Connections strips.** Derive and inject; skip pages under three chips.
6. **Root hub.** Bring `assets/css/hub.css` onto the same tokens so the library page and the wiki
   read as one site.

After each of 2 through 5, re-run `apply-seo.mjs`, `gen-sitemap.mjs` and `wire-lightbox-script.mjs`
— all three are idempotent, so a no-op is the expected result and a diff means something moved.

## Out of scope

Restructuring the Timeline or Plot pages beyond restyling, changing any article's words, touching
`search.js` scoring, and regenerating any illustration. The 8 thin-page warnings stay as they are —
they are the documented baseline, not a defect.
