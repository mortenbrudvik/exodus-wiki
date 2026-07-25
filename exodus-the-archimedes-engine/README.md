# Exodus: The Archimedes Engine Wiki

Personal full-spoiler reading companion in plain HTML.

Part of the [Book Wikis](../index.html) collection (parent hub: `../index.html`).

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
7. Run `node scripts/check-search-rank.mjs`.

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
node scripts/check-search-rank.mjs
```

Asserts that every index entry points at a real file, that the JSON index and the `file://`
fallback script are identical, and that a set of real queries still ranks the right article
first. Add a case there whenever you add an alias or an alternate spelling.

## Conventions

- Filenames: `kebab-case.html`
- Full spoilers are expected
- Prefer stubs over invented canon — a short accurate page beats an invented detail
- Encyclopedic voice: state what the novel does, in the present tense. Do not write about the
  wiki's own sourcing ("public lists", "recaps", "secondary sources") or address the reader
- Names use the spelling on the subject's own page; ship names are italicised when they mean the
  hull (`the <em>Diligent</em>'s ZPZ`) and left roman when they mean the people (`Diligent settlers`)
- `Uranic` and `Celestial` are clade names — always capitalised
- Every page needs `<a class="skip-link" href="#main-content">` as the first child of `<body>` and
  `id="main-content"` on `<main>`; hub pages carry `aria-current="page"` on their own nav link
- Pages with no infobox use `<article class="article article--wide">`
