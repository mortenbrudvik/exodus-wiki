# Book Wikis

Personal **full-spoiler** reading companions for novels — plain multi-page HTML wikis you can browse on desktop or add to an iPhone home screen.

> **Spoiler warning:** This repository and the live site are **public**. Articles assume you have finished the book.

## Live site

**[Open Book Wikis →](https://mortenbrudvik.github.io/my-books/)**

| | |
|---|---|
| Hub | https://mortenbrudvik.github.io/my-books/ |
| Repository | https://github.com/mortenbrudvik/my-books |
| Hosting | GitHub Pages (deployed from `main`) |

### Install on iPhone

Use **Safari** (not an in-app browser):

1. Open the [live site](https://mortenbrudvik.github.io/my-books/).
2. Tap **Share**.
3. Tap **Add to Home Screen**.
4. Keep the name **Book Wikis** and add it.

The home-screen icon opens the collection hub in a standalone window. From there you can open each book wiki. Content needs network access (no offline full-wiki cache).

## What’s inside

A small **hub** lists available book wikis. Each book is a self-contained plain-HTML wiki (sidebar nav, articles, client-side search).

| Wiki | Book | Folder |
|------|------|--------|
| [Exodus Wiki](https://mortenbrudvik.github.io/my-books/exodus-the-archimedes-engine/) | *Exodus: The Archimedes Engine* (Peter F. Hamilton, 2024) | [`exodus-the-archimedes-engine/`](exodus-the-archimedes-engine/) |

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
- Relative links only (works under `https://…github.io/my-books/`)

## License / use

Personal reading companion. Content is encyclopedic own-words summary material for private study; treat spoilers and public visibility accordingly.
