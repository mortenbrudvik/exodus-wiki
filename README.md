# Book Wikis

Personal collection of full-spoiler reading-companion wikis (plain HTML).

> **Public site:** This repository is public. Wikis contain **full spoilers**.

## Live site

**https://mortenbrudvik.github.io/my-books/**

### Install on iPhone (Add to Home Screen)

1. Open the live site in **Safari** (not an in-app browser).
2. Tap the **Share** button.
3. Tap **Add to Home Screen**.
4. Confirm the name **Book Wikis**.

The home-screen icon opens the collection hub. Book wikis open from hub cards and keep working as multi-page sites.

## Open locally

From this directory (`books/`):

```bash
python -m http.server 8080
```

Then open http://localhost:8080/

Install/manifest behavior is best verified on the HTTPS Pages URL.

## Book wikis

| Wiki | Folder |
|------|--------|
| Exodus: The Archimedes Engine | [`exodus-the-archimedes-engine/`](exodus-the-archimedes-engine/) |

For in-wiki page authoring (templates, search index), see that folder’s README.

## Add a book wiki

1. Create a new folder (kebab-case slug), with its own `index.html` and assets.
2. Copy a card block in the root `index.html`, fill title / author / year / blurb / spoiler / links.
3. In that wiki’s sidebar chrome, add **All book wikis** pointing at the collection root `index.html` with a depth-correct relative path (`../index.html` from the wiki root).

## Hub files

- `index.html` — catalog landing page (PWA/Apple meta)
- `manifest.webmanifest` — home-screen install metadata
- `assets/css/hub.css` — hub-only styles
- `assets/icons/` — app icons
