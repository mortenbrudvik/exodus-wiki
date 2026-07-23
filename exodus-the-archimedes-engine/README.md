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

## Conventions

- Filenames: `kebab-case.html`
- Full spoilers are expected
- Prefer stubs over invented canon
