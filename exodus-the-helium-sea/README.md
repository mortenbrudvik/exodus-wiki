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

Article coverage is starting. In addition to Main Page, `pages/book.html`, `pages/sources.html`,
and `search.html`, the wiki has **Factions** (Eternal Unanimity Dominion) and **Locations**
(Janton-Io) stubs. Still pruned from the live site until go-live (§5 of the design spec).

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
`docs/visual-briefs/index.json`, which arrives with the first illustration. `check-lightbox.mjs`
likewise carries only its unit test; book 1's structural pass over illustrated pages comes back with
the images.

## Going live

The full sequence is in
`docs/superpowers/specs/2026-07-25-exodus-helium-sea-scaffold-design.md` §5.
