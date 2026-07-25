# Exodus Wiki — full-spoiler reading companions for the novels

[![Deploy GitHub Pages](https://github.com/mortenbrudvik/exodus-wiki/actions/workflows/pages.yml/badge.svg)](https://github.com/mortenbrudvik/exodus-wiki/actions/workflows/pages.yml)

Hand-written, **full-spoiler** reading-companion wikis for Peter F. Hamilton’s **Exodus** novels — plain multi-page static HTML with **no build step, no framework and no dependencies**. Browse on desktop or add to an iPhone home screen.

One wiki so far, with *Exodus: The Helium Sea* (2026) to follow: **[*Exodus: The Archimedes Engine*](https://mortenbrudvik.github.io/exodus-wiki/exodus-the-archimedes-engine/)** (2024, Random House Worlds) — **87 pages** covering characters, locations, factions, technology, timeline, plot and chapter summaries, with client-side search, 59 original illustrations, and a [sources page](https://mortenbrudvik.github.io/exodus-wiki/exodus-the-archimedes-engine/pages/sources.html) recording what is verified and what is reconstructed.

> **Spoiler warning:** This repository and the live site are **public**. Articles assume you have finished the book.

[![The arkship Diligent](exodus-the-archimedes-engine/assets/images/ships/arkship-diligent.jpg)](https://mortenbrudvik.github.io/exodus-wiki/exodus-the-archimedes-engine/pages/locations/arkship-diligent.html)

<sub>The arkship *Diligent* — one of 59 original illustrations made for this wiki. They are **inferred, not canonical**: the novel fixes almost no one's appearance. See [Sources and provenance](https://mortenbrudvik.github.io/exodus-wiki/exodus-the-archimedes-engine/pages/sources.html).</sub>

## Live site

**[Open the Exodus wiki →](https://mortenbrudvik.github.io/exodus-wiki/)**

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
4. Keep the name **Exodus** and add it.

The home-screen icon opens the collection hub in a standalone window. From there you can open each book wiki. Content needs network access (no offline full-wiki cache).

## What’s inside

A small **hub** lists the Exodus novels covered so far. Each book is a self-contained plain-HTML wiki (sidebar nav, articles, client-side search).

| Wiki | Book | Folder |
|------|------|--------|
| [Archimedes Engine Wiki](https://mortenbrudvik.github.io/exodus-wiki/exodus-the-archimedes-engine/) | *Exodus: The Archimedes Engine* (2024) | [`exodus-the-archimedes-engine/`](exodus-the-archimedes-engine/) |
| *scaffolded, not published* | *Exodus: The Helium Sea* (2026) | [`exodus-the-helium-sea/`](exodus-the-helium-sea/) |

The Helium Sea folder holds structure and tooling only — no article coverage — and is excluded from
the deployed site until it has articles. See its [README](exodus-the-helium-sea/README.md).

Categories in a book wiki: characters, locations, factions, technology, timeline, plot, chapters.

Scope is the **novels**. The *Exodus* game shares the setting, but its lore is unreleased and shifting, and mixing it in would mean running a second, weaker evidence standard next to [Sources and provenance](https://mortenbrudvik.github.io/exodus-wiki/exodus-the-archimedes-engine/pages/sources.html). The book always wins.

## Project layout

```text
.
├── index.html                 # Collection hub
├── manifest.webmanifest       # Home-screen install metadata
├── assets/
│   ├── css/hub.css            # Hub styles
│   └── icons/                 # App icons
├── exodus-the-archimedes-engine/   # Example book wiki
├── exodus-the-helium-sea/          # Scaffold; pruned from the deploy until it has articles
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

## Add the next book wiki

1. Create a kebab-case folder with its own `index.html` and assets (e.g. `exodus-the-helium-sea/`).
2. Copy a card block in the root `index.html` (title, author, year, blurb, spoiler note, links).
3. Add an **All book wikis** sidebar link to the hub (`../index.html` from the wiki root; deeper pages need more `../`).
4. Give it its own `scripts/lib/seo.mjs` consumers — descriptions, sitemap and checks are per-book, and `gen-sitemap.mjs` writes the shared site-root `sitemap.xml`, so it needs to learn about the second book's index.

## Tech

- Static HTML + CSS + light JS (no build step, no framework)
- Installable hub via web app manifest + Apple meta tags (**not** a full offline PWA — no service worker)
- Mobile-friendly layout (responsive hub; overlay nav on book wikis)
- Relative links only (works under `https://…github.io/exodus-wiki/`)

## License / use

Personal reading companion. Content is encyclopedic own-words summary material for private study; treat spoilers and public visibility accordingly.
