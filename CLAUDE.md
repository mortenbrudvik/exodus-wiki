# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A collection of hand-authored, full-spoiler reading-companion wikis for novels. Plain multi-page
static HTML — **no build step, no framework, no package.json, no dependencies**. The repo root is a
hub that lists each book wiki; each book lives in its own kebab-case folder and is self-contained.

Deployed to GitHub Pages from `main` by `.github/workflows/pages.yml`, which uploads the repo root
verbatim. **The repository and the live site are public.** Articles assume the reader has finished
the book.

Two wikis, only one of them published:

| Folder | Book | State |
|---|---|---|
| `exodus-the-archimedes-engine/` | *Exodus: The Archimedes Engine* (2024) | Live — 87 pages, 74 illustrations |
| `exodus-the-helium-sea/` | *Exodus: The Helium Sea* (2026) | Scaffold — 4 pages, no article coverage, **pruned from the deploy** |

See "The unpublished second wiki" below before touching the Helium Sea folder.

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
# The five checks in the repo. Run all five after ANY change to pages, the index, search.js,
# the images, the SEO block, or the lightbox.
cd exodus-the-archimedes-engine
node scripts/check-wiki.mjs         # structure, chrome, voice, name drift, generator sync
node scripts/check-search-rank.mjs  # search folding and ranking
node scripts/check-images.mjs       # brief, asset and infobox-markup coverage for every image
node scripts/check-seo.mjs          # descriptions, canonicals, social tags, sitemap, robots.txt
node scripts/check-lightbox.mjs     # WikiLightbox open/close, and that every page loads it
```

```bash
# The four checks in the Helium Sea wiki. It has no images, so no check-images.mjs.
cd exodus-the-helium-sea
node scripts/check-wiki.mjs
node scripts/check-search-rank.mjs
node scripts/check-seo.mjs          # asserts this wiki is ABSENT from the sitemap
node scripts/check-lightbox.mjs
```

All five exit non-zero on failure. `check-wiki.mjs` additionally prints advisory **warnings** that
deliberately do not fail the run (possible name drift, thin pages without a stub notice, orphans,
index titles disagreeing with their `h1`) — 7 thin-page warnings are the expected baseline.

`check-images.mjs` only proves each subject has a brief, a non-blank file and matching markup — it
cannot see *inside* a JPEG. Nothing burned into an image (captions, dates, titles) is greppable or
checkable, so image content is reviewed by eye. See "Illustrations" below.

`check-wiki.mjs --quiet` suppresses the per-check progress lines. There is no linter or formatter.

## Findability (SEO)

The site is public and meant to be found. Every indexed page carries a `<!-- seo:start -->` …
`<!-- seo:end -->` block with a meta description, an absolute `rel="canonical"`, Open Graph and
Twitter-card tags. `sitemap.xml` and `robots.txt` live at the **site root**, not the book root.

`scripts/lib/seo.mjs` is the single source of that block. Three consumers call it, so they cannot
drift — and `check-wiki.mjs` re-renders the generators, so a mismatch fails the build:

| Producer | Covers |
|---|---|
| `scripts/apply-seo.mjs` | the 62 hand-authored pages (idempotent; rewrites the marked region) |
| `gen-celestials.mjs` / `gen-dominions.mjs` | the 25 generated pages, via the same `seoRegion()` |
| `scripts/gen-sitemap.mjs` | site-root `sitemap.xml` + `robots.txt` |

Descriptions are **derived from the `summary` field in `search-index.json`**, plus a shared tagline
naming the book and author. So a summary is now doing two jobs — search snippet and search-engine
description — and editing one updates both after `apply-seo.mjs` re-runs. Never hand-edit inside the
seo markers; edit the summary or `lib/seo.mjs` and re-run.

`search.html` is `noindex,follow` and excluded from the sitemap: a search-results page is thin,
duplicate-by-construction content. Site-wide URLs are absolute and hardcoded to
`https://mortenbrudvik.github.io/exodus-wiki` in `lib/seo.mjs` — that constant is the one place to
change if the domain ever does.

The two generators write different line endings (celestials CRLF, dominions LF) and normalize the
whole page at write time, because `seoRegion()` joins with `\n`. Don't "fix" either to match the
other.

## The unpublished second wiki

`exodus-the-helium-sea/` is a scaffold: four pages, no article coverage, because the novel is still
being read. **Do not write anything about book 2's story into it** — and never into book 1's pages,
which are a companion to *The Archimedes Engine* and are read by people mid-duology.

It is kept off the live site three ways:

- pruned from the Pages artifact by the `rm -rf` line in `.github/workflows/pages.yml`;
- absent from the hub `index.html` and from `sitemap.xml`;
- its own `check-seo.mjs` **fails if any of its URLs appear in the sitemap**. That inversion is
  deliberate — it is the opposite of book 1's assertion, so accidentally publishing the empty wiki
  breaks a check instead of going unnoticed.

Four scripts there are adaptations, not copies, and each carries a comment saying so:
`check-wiki.mjs` (empty hub-category loop and empty `GENERATORS`, both of which hard-fail on files a
category-less wiki lacks), `apply-seo.mjs` (no generator skip-set), `stamp-assets.mjs` (does not
stamp the root hub — book 1 owns that line), and `check-lightbox.mjs` (unit test only; the
structural pass needs `docs/visual-briefs/index.json`).

`gen-sitemap.mjs` is **not** copied. The sitemap is site-wide and book 1 owns it; two copies would
overwrite each other. Going live means hoisting that script to cover both books — the full sequence
is in `docs/superpowers/specs/2026-07-25-exodus-helium-sea-scaffold-design.md` §5.

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

Both generators import shared helpers rather than carrying their own copies, so the generated and
hand-authored paths cannot drift: `buildNav` from `scripts/regroup-nav.mjs` and `buildConnections`
from `scripts/lib/connections.mjs`. Change the nav groups or the connections rules in those files
and re-run the generators; do not paste markup into the shells.

The generators are the source of truth and currently reproduce all 25 pages byte-for-byte.
`check-wiki.mjs` enforces this: it re-renders both generators into a scratch directory (via the
`WIKI_OUT_DIR` env override they accept) and fails if any committed page differs. Any sitewide sweep
over `pages/*.html` must be mirrored into both generators, or the next run reverts it — and the
check will tell you.

`scripts/add-dominions-nav*.mjs` and `scripts/fix-dominions-nav-sidebar.mjs` are spent one-shot
migrations. They guard against re-application and are now no-ops; leave them alone.

## Sync invariants

Adding, renaming or removing a page means touching **twelve** things:

1. The `.html` file (copy `templates/article.html`; set `data-root` to `../` or `../../`).
2. Its category hub — every page must be reachable from `pages/<category>/index.html`.
3. `assets/data/search-index.json`.
4. `assets/data/search-index.js` — the `file://` fallback, which must be **content-identical** to
   the JSON. Safest approach: mutate the JSON, then write both files from the same in-memory object.
5. The generator, if the page is one of the 25.
6. `node scripts/apply-seo.mjs` — inserts the page's description/canonical/social block. It reads
   the summary from step 3, so do it after the index, not before.
7. `node scripts/gen-sitemap.mjs` — re-lists the site so crawlers see the new page.
8. `node scripts/wire-lightbox-script.mjs` — every page that loads `search.js` must also load
   `lightbox.js`; `check-lightbox.mjs` fails otherwise.
9. `node scripts/wire-theme-toggle.mjs` — the no-flash stamp in `<head>`, the header button, and
   `theme.js` at the end of `<body>`. See "Theming" below.
10. `node scripts/regroup-nav.mjs` — the grouped sidebar nav, with `aria-current` resolved against
    the page. `check-wiki.mjs` fails if any page's nav labels differ from the rest.
11. `node scripts/build-connections.mjs` — the derived Connections strip, for pages whose infobox
    links three or more illustrated character pages.
12. `node scripts/stamp-assets.mjs` — **run this last.** It rewrites the CSS and JS references that
    the earlier steps insert. See "Cache-busting" below.

If the page belongs to a category hub that shows cards, also run
`node scripts/build-hub-cards.mjs`. If it carries a `.wiki-table`, run
`node scripts/label-table-cells.mjs` — every body cell needs a `data-label` naming its column, or
the table cannot stack on a phone (see below).

Steps 6 to 12 are all idempotent, so re-running them over an unchanged site is a no-op. Order
matters twice: run the generators **before** the sweeps (the sweeps skip generated pages precisely
because the generators already produce the same markup), and run `stamp-assets.mjs` **after
everything else**.

## Cache-busting

Every reference to `wiki.css`, `hub.css`, `search.js`, `lightbox.js`, `theme.js` and
`search-index.js` carries `?v=<hash>`, where the hash is the first 8 hex of a SHA-256 of that
file's own contents. `scripts/lib/assets.mjs` computes it; `scripts/stamp-assets.mjs` applies it;
both generators import `assetV` so the 25 generated pages agree.

Why it exists: GitHub Pages serves HTML and CSS alike with `Cache-Control: max-age=600`, and the
two are fetched at different moments. Without a token, for up to ten minutes after a deploy a
reader can get new markup on a stylesheet cached before it — which strips the grouped nav to bare
paragraphs, kills dark mode, and leaves the theme toggle inert. This happened to a real reader on
25 July 2026.

Things worth knowing before touching it:

- **Per-asset hashes, not one site-wide version.** Editing `wiki.css` rewrites one line across 88
  pages; editing `theme.js` leaves the stylesheet alone. There is nothing to remember to bump.
- **Hashes are computed on LF-normalised content**, because `core.autocrlf` would otherwise flip
  every token on checkout.
- **`file://` still works.** Verified in headless Chrome against a real article: the versioned
  `lightbox.js` and `theme.js` both executed from disk, and a versioned stylesheet applies. Chrome
  ignores the query when resolving a `file:` path.
- **`check-wiki.mjs` strips `?…` before resolving links.** Without that the link check fails on
  every page.
- **What it does not fix:** cached *old* HTML asking for an old token still gets a matched pair —
  stale but coherent, and it self-heals inside the same ten minutes. No URL scheme closes that
  direction, because the token lives in the HTML.

`data-root` is not decoration: `search.js` reads `document.body.getAttribute("data-root")` to
resolve index and result paths from nested folders. A wrong value silently breaks search on that
page only. `regroup-nav.mjs` reads it too, to build depth-correct nav hrefs.

## Theming

Dark is the default and light is a full override — neither is a fallback. The design lives in
`docs/superpowers/specs/2026-07-25-starfield-visual-direction-design.md`.

- Colour is defined **only** in `assets/css/wiki.css` (and `assets/css/hub.css` for the root hub).
  Nothing else names a colour.
- The light tokens appear **twice on purpose**: once under `[data-theme="light"]` for an explicit
  choice, once under `@media (prefers-color-scheme: light) { :root:not([data-theme]) }` for readers
  who have not chosen, including readers with JavaScript off. Plain CSS cannot share one declaration
  block between a selector and a media query. **Keep the two blocks identical** — both carry a
  comment saying so, in each file.
- The no-flash stamp is inline in every page's `<head>` and must stay there. Moving it into
  `theme.js` repaints.
- `theme.js` only owns the button, which ships `hidden` and is revealed by JS, so a reader without
  JavaScript sees no control that cannot work.
- `hub.css` duplicates the palette rather than importing it: a book wiki must stay self-contained,
  and the hub must not depend on any one book's assets. The two are kept in step by hand.

### Contrast floors these tokens have to clear

Both themes, measured against every surface the token actually sits on — `--bg`, `--panel`, and
`--raised` (the mobile sidebar drawer, which is the binding case and easy to forget):

| Token | Floor | Why |
|---|---|---|
| `--dim` | 4.5:1 | It carries *small* text everywhere — section headings at 0.74rem, infobox `dt` at 0.62rem, nav group labels, table headers, the search placeholder. None of it qualifies for the 3:1 large-text allowance. |
| `--control-line` | 3:1 | WCAG 1.4.11. Used by `.search-input`, `.menu-toggle`, `.theme-toggle` — a form field has to be findable as a control. |
| `--line` | none | Decorative hairlines and card edges only. Deliberately below 3:1; do not use it on a control. |

`--dim` shipped at 3.43:1 on `--panel` and was corrected to `#7f8b9c` / `#666e7a`, the quietest
values clearing 4.5:1 on all three surfaces. Re-check with a contrast calculator before changing
either, and remember `--dim` must stay quieter than `--muted` or the hierarchy inverts.

Two cascade traps, both already sprung once:

- **`hidden` loses to an author `display`.** `.theme-toggle` sets `display: inline-flex`, which
  outranks the UA `[hidden] { display: none }` — the button shipped visible and inert for readers
  with JavaScript off. Any element that ships `hidden` needs its own `[hidden]` guard;
  `.wiki-lightbox` and `.theme-toggle` both carry one.
- **Never draw a focus ring inside an image.** `lightbox.js` puts every infobox illustration in the
  tab order. A ring with a negative `outline-offset` lands on arbitrary photo content — teal on a
  dark space scene measured 1.0:1. Let the global `:focus-visible` ring sit outside, against a
  known surface.
- **`:has()` raises specificity, and specificity beats media queries.** `.article:has(.wiki-table)`
  (0,2,0) silently outranked both the plain `.article` rule that collapses to one column at 1100px
  and `.article--wide` (both 0,1,0). Result: a 17rem sidebar track on a 390px phone with the
  infobox crushed to 23px, and a phantom empty column on `sources.html`. Any `:has()` layout rule
  needs its own `min-width` query and, where relevant, a `:not(.article--wide)` guard.

### Tables on a phone

`.wiki-table` stacks into labelled blocks below 720px instead of scrolling sideways — Chapters is
four columns, and at 343px it wrapped prose to two or three words a line. Each `<td>` carries
`data-label` with its column heading, written by `scripts/label-table-cells.mjs` and surfaced with
`content: attr(data-label)`. It is done in markup rather than CSS because the three table-bearing
pages have different column counts (timeline 3, chapters 4, sources 2 and 3), so nothing
position-based works across all of them, and CSS cannot read another element's text. All three are
hand-authored, so no generator mirrors this.

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
- `<title>… — Archimedes Engine Wiki</title>` and the header `site-title` reading **Archimedes
  Engine Wiki**. `check-wiki.mjs` fails on any other suffix. The **hub** at the site root is
  "Exodus" — each book wiki is named for its own book, not the universe, so *Helium Sea* can sit
  beside this one without either claiming to be the whole thing. `SITE_NAME` in `lib/seo.mjs`
  carries the same string into `og:site_name`.
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

Relative links only — everything must work under `https://<user>.github.io/exodus-wiki/`. Book wikis
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
  expected state, not a defect; the 7 thin-page warnings are those pages.
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

Infobox images live under `assets/images/{characters,ships,locations,technology,factions}/`, each
backed by a maintainer brief in `docs/visual-briefs/` and listed in that folder's `index.json`.
Characters are 3:4; everything else is 16:9. `check-images.mjs` prints the current counts.

| Script | Owns |
|---|---|
| `write-visual-briefs.mjs` | briefs for characters and ships |
| `write-extra-visual-briefs.mjs` | briefs for places, tech and factions; merges into the same `index.json` |
| `gen-celestials.mjs` / `gen-dominions.mjs` | images on the 25 generated pages — the generated-pages trap applies, never hand-edit those |
| `inject-infobox-images.mjs` | character and ship images on hand-authored pages |
| `inject-extra-images.mjs` | place, tech and faction images on hand-authored pages |
| `wire-lightbox-script.mjs` | ensures every page loading `search.js` also loads `lightbox.js` |
| `build-hub-cards.mjs` | the card grids on category hubs, with a monogram plate where art is missing |
| `lib/connections.mjs` + `build-connections.mjs` | the derived Connections strip |

**The briefs are generated too, and nothing checks them.** Every `docs/visual-briefs/<slug>.md` and
`index.json` is written by the two `write-*-visual-briefs.mjs` scripts, so hand-editing a `.md` is
reverted the next time one runs — the generated-pages trap again, except `check-wiki.mjs` does not
re-render these, so the loss is silent. Edit the brief object in the script.

This has already cost work once: `sahdiah`, `arcadias-moon`, `aeacus` and `polkadav` were hand-edited
to richer text than the generator held, and the next run flattened all four. If you suspect it,
`git diff docs/visual-briefs/` straight after running the script — anything you did not intend to
touch that changed is content the script does not know about. Recover it with
`git show HEAD:<path>`, port it into the brief object, re-run, and confirm the diff is empty. Two
fields exist because of that recovery: `sources` (per-brief citations) and `companionImage`.

- **Book citations go in the optional `sources` field**, which overrides the generic two-bullet
  Sources section. Without it a citation like "ch. 31" or "p. 241" survives only in the generated
  `.md` and disappears on the next run. `sahdiah.md` and `arcadias-moon.md` are the two that carry
  book citations today.
- **Run `write-visual-briefs.mjs` before `write-extra-visual-briefs.mjs`, always.** The second
  merges the places, technology and faction subjects into the same `index.json`; the first rewrites
  that file from scratch. Running the first alone silently drops ~240 lines and 30-odd subjects,
  which then fails `check-images.mjs`.
- **Known drift:** `aeacus.md` and `polkadav.md` hold committed `prompt`, `setting`, `clothing` and
  `role` text the generator cannot currently reproduce, so a run today reverts them. Sync the script
  to the committed briefs before relying on a clean regeneration.

Two rules the last two scripts in that table encode, both deliberate:

- **Hubs get cards only where most entries are illustrated** (`COVERAGE_FLOOR`, currently 60%). A
  grid of mostly letter-plates reads as broken images. Factions was the one hub the floor held back,
  at 4 images across 14 pages; later passes took it to 13 across 15, so all four hubs carry cards
  today. The floor still gates any new hub, and `build-hub-cards.mjs` prints the percentage when it
  keeps one as a list.
- **Connections are derived from the infobox, never hand-written.** A chip is any `<dd>` link to a
  character page that has a portrait; its `<dt>` becomes the label. So there is no field to maintain
  and the strip cannot contradict the infobox — but it also only knows what the infobox knows, which
  is why Finn's strip omits Gyvoy Enfoe. Fewer than three chips renders nothing.

All the injectors are idempotent and skip pages that already carry the markup.

The illustrations are **inferred where the novel is silent — which is most subjects, but not all.**
Re-reading the authorized publisher excerpt recovered real descriptions for eight characters, so
check the book before assuming a likeness is free to invent; the briefs were written from role and
clade grammar and are vaguer than the text they claim to follow.

`docs/visual-briefs/IMAGE-REVIEW.md` records the by-eye review over six passes: three that checked
the art against the briefs, two that checked the briefs against the novel and re-opened most of the
cast, and a sixth that opened the 30 replacement files. **Current state: 74 briefed · 59 signed off ·
7 query · 8 fail.** Individual regenerations are logged with dates. **Every new illustration needs
adding to that review — `check-images.mjs` cannot see inside a JPEG**, so an unreviewed asset is an
unverified claim on a public page. To check the invariant rather than trusting this paragraph,
confirm every slug in `index.json` appears in `IMAGE-REVIEW.md`.

Three lessons from those passes are worth carrying into any new art:

- **Only `prompt` reaches the generator** — but a correct prompt is not sufficient either. Four
  replacements contradict a description written into their own `prompt` string, so a delivered
  image has to be compared against the prompt that asked for it, by eye, every time.
- **Count what the text counts, and check the material as well as the colour.** Olomo shipped with
  the wrong eye count for three passes because the brief never mentioned eyes; bloodstone was fixed
  from red to turquoise while staying a faceted gem, which the novel rules out just as firmly.
- **A shared constant is not a shared fix.** The bloodstone clause was described as a one-line
  change to every Celestial brief and reached 6 of 16, and `${BLOODSTONE}` splices mid-noun-phrase
  so the prohibition binds to the garment. Verify a sweep landed rather than assuming it did.

Five rules follow, and every one has been violated in shipped assets:

- **No text inside an image.** No caption bars, ranks, house names, service numbers or dates. The
  briefs already specify "no text, no watermark, no UI chrome"; assets shipped with captions anyway,
  inventing `House Veyl`, `3rd Scion`, `2784.4` and `c. 478 Post-Collapse` — none of which appear
  anywhere in the wiki, and the dates contradict `timeline.html`'s own "years are approximate"
  caveat. Captions appear at the **top** of the frame as well as the bottom. Burned-in text is
  invented canon that no check can catch — treat it as a blocking defect.
- **No real-world logos or brand marks.** One portrait shipped wearing the Chanel logo. The site is
  public; the negative prompt must exclude brand marks explicitly.
- **Match the clade body plan.** Heresy Celestials have *four* arms, not six — check the count
  against `heresy-dominion.html` rather than trusting a convincing silhouette.
- **Related characters must look related, and the constraint goes in the `prompt` string.** Finn,
  his twin Otylia and his sister Zelinda shipped as three unrelated ancestries. The requirement was
  written down — in `inference[]`, which is documentation the generator never reads. Only `prompt`
  reaches the image. Check each subject's infobox for stated kinship, and review families side by
  side: every one of those three portraits passed on its own.
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

- Run all five checks before you commit. They are the gate that replaces asking.
- Prefer several focused commits over one sweeping one; the history is the only review trail.
- After pushing, confirm the Pages run went green (`gh run list --limit 1`) rather than assuming it.

`core.autocrlf=true` on this machine, so mixed CRLF/LF working-tree files produce clean diffs; don't
"fix" line endings or add a `.gitattributes` for them.

Design specs and implementation plans for past work live in `docs/superpowers/` at both the root and
inside the book folder. They are historical records — read them for intent, don't rewrite them.
