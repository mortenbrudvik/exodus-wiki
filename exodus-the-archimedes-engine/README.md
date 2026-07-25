# Exodus: The Archimedes Engine Wiki

Personal full-spoiler reading companion in plain HTML.

Part of the [Book Wikis](../index.html) collection (parent hub: `../index.html`).

## Open the wiki

From the project root:

```bash
python -m http.server 8080
```

Then open http://localhost:8080/

Search works the same either way: every page loads the embedded `assets/data/search-index.js`, which
takes precedence over the JSON `fetch`. Serve over HTTP anyway so relative links behave as they do
on the deployed site.

## Add a page

1. Copy `templates/article.html` to the right folder under `pages/`.
2. Set `data-root` / `{{ROOT}}` (`../` or `../../`).
3. Write lead, sections, infobox.
4. Link from the category hub.
5. Add the **same** entry to `assets/data/search-index.json` and `assets/data/search-index.js`.
6. Wikilink related articles.
7. Run both checks (below). `check-wiki.mjs` catches the sync steps above if you miss one.

## Generated pages

25 pages are **generated, not hand-edited** — 18 under `pages/characters/` and 7 under
`pages/factions/`. Edit `scripts/gen-celestials.mjs` or `scripts/gen-dominions.mjs` and re-run it:

```bash
node scripts/gen-celestials.mjs
node scripts/gen-dominions.mjs
```

Editing those HTML files directly works until the next run, which silently reverts it. Run
`git diff` afterwards to confirm only the intended lines moved.

## Check the wiki

```bash
node scripts/check-wiki.mjs         # structure, chrome, voice, name drift, generator sync
node scripts/check-search-rank.mjs  # search behaviour and ranking
```

Both exit non-zero on failure, so they work as a pre-commit gate.

`check-wiki.mjs` fails the run on: broken internal links, a page missing from a category hub
or from the search index, the two index files diverging, a wrong `data-root`, missing skip
link / `#main-content` / search scripts, a favicon link that does not resolve to a real file, a
misplaced `aria-current`, sourcing meta-commentary in article prose, and any generated page that
no longer matches its generator.

It also prints **warnings**, which never fail the run because they need judgement: pages whose
spelling looks like a stray variant of an established name, thin pages with no stub notice,
orphans, and index titles that disagree with their `h1`.

`check-search-rank.mjs` asserts query folding, ~15 ranking outcomes against the real index,
that every entry points at a real file, and JSON/JS parity. Add a case whenever you add an
alias or an alternate spelling.

## Conventions

- Filenames: `kebab-case.html`
- Full spoilers are expected
- Prefer stubs over invented canon — a short accurate page beats an invented detail
- Encyclopedic voice: state what the novel does, in the present tense. Do not write about the
  wiki's own sourcing ("public lists", "recaps", "secondary sources") or address the reader
- Names use the spelling on the subject's own page; ship names are italicised when they mean the
  hull (`the <em>Diligent</em>'s ZPZ`) and left roman when they mean the people (`Diligent settlers`)
- `Uranic` and `Celestial` are clade names — always capitalised
- Oxford British spelling: `-our`, `-re`, but `-ize`; `licence` (noun) / `license` (verb). The
  `Travelers` faction and the *Creature Catalog* title are proper nouns and keep their US spelling
- Every page needs `<a class="skip-link" href="#main-content">` as the first child of `<body>`,
  `id="main-content"` on `<main>`, and a `rel="icon"` link to `assets/icons/favicon.svg` at the right
  `../` depth; hub pages carry `aria-current="page"` on their own nav link
- Pages with no infobox use `<article class="article article--wide">`
