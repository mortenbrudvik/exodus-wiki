# Book Wikis — full-spoiler reading companions for novels

[![Deploy GitHub Pages](https://github.com/mortenbrudvik/exodus-wiki/actions/workflows/pages.yml/badge.svg)](https://github.com/mortenbrudvik/exodus-wiki/actions/workflows/pages.yml)

Hand-written, **full-spoiler** reading-companion wikis for novels — plain multi-page static HTML with **no build step, no framework and no dependencies**. Browse on desktop or add to an iPhone home screen.

Currently one wiki: **[*Exodus: The Archimedes Engine*](https://mortenbrudvik.github.io/exodus-wiki/exodus-the-archimedes-engine/)** by Peter F. Hamilton (2024, Random House Worlds) — **87 pages** covering characters, locations, factions, technology, timeline, plot and chapter summaries, with client-side search, 59 original illustrations, and a [sources page](https://mortenbrudvik.github.io/exodus-wiki/exodus-the-archimedes-engine/pages/sources.html) recording what is verified and what is reconstructed.

> **Spoiler warning:** This repository and the live site are **public**. Articles assume you have finished the book.

[![The arkship Diligent](exodus-the-archimedes-engine/assets/images/ships/arkship-diligent.jpg)](https://mortenbrudvik.github.io/exodus-wiki/exodus-the-archimedes-engine/pages/locations/arkship-diligent.html)

<sub>The arkship *Diligent* — one of 59 original illustrations made for this wiki. They are **inferred, not canonical**: the novel fixes almost no one's appearance. See [Sources and provenance](https://mortenbrudvik.github.io/exodus-wiki/exodus-the-archimedes-engine/pages/sources.html).</sub>

## Live site

**[Open Book Wikis →](https://mortenbrudvik.github.io/exodus-wiki/)**

| | |
|---|---|
| Hub | https://mortenbrudvik.github.io/exodus-wiki/ |
| Repository | https://github.com/mortenbrudvik/exodus-wiki |
| Hosting | GitHub Pages (deployed from `main`) |

### Install on iPhone

Use **Safari** (not an in-app browser):

1. Open the [live site](https://mortenbrudvik.github.io/exodus-wiki/).
2. Tap **Share**.
3. Tap **Add to Home Screen**.
4. Keep the name **Book Wikis** and add it.

The home-screen icon opens the collection hub in a standalone window. From there you can open each book wiki. Content needs network access (no offline full-wiki cache).

## What’s inside

A small **hub** lists available book wikis. Each book is a self-contained plain-HTML wiki (sidebar nav, articles, client-side search).

| Wiki | Book | Folder |
|------|------|--------|
| [Exodus Wiki](https://mortenbrudvik.github.io/exodus-wiki/exodus-the-archimedes-engine/) | *Exodus: The Archimedes Engine* (Peter F. Hamilton, 2024) | [`exodus-the-archimedes-engine/`](exodus-the-archimedes-engine/) |

Categories in a typical book wiki: characters, locations, factions, technology, timeline, plot, chapters.

## Project layout

```text
.
├── index.html                 # Collection hub
├── manifest.webmanifest       # Home-screen install metadata
├── assets/
│   ├── css/hub.css            # Hub styles
│   └── icons/                 # App icons
├── exodus-the-archimedes-engine/   # Example book wiki
└── .github/workflows/pages.yml     # GitHub Pages deploy
```

Hub files are independent of each book’s CSS/JS. Book wikis link back to the hub via **All book wikis** in the sidebar.

## Run locally

```bash
# from the repository root
python -m http.server 8080
```

Open http://localhost:8080/

Home-screen install works best on the HTTPS Pages URL.

### Book wiki notes

For page templates, search index, and conventions inside a book folder, see that wiki’s own README (e.g. [`exodus-the-archimedes-engine/README.md`](exodus-the-archimedes-engine/README.md)).

## Add another book wiki

1. Create a kebab-case folder with its own `index.html` and assets.
2. Copy a card block in the root `index.html` (title, author, year, blurb, spoiler note, links).
3. Add an **All book wikis** sidebar link to the collection root (`../index.html` from the wiki root; deeper pages need more `../`).

## Tech

- Static HTML + CSS + light JS (no build step, no framework)
- Installable hub via web app manifest + Apple meta tags (**not** a full offline PWA — no service worker)
- Mobile-friendly layout (responsive hub; overlay nav on book wikis)
- Relative links only (works under `https://…github.io/exodus-wiki/`)

## License / use

Personal reading companion. Content is encyclopedic own-words summary material for private study; treat spoilers and public visibility accordingly.
