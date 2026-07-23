# Book Wikis Hub — Design

**Date:** 2026-07-23  
**Status:** Approved for implementation planning  
**Project:** Root HTML index for the multi-book wiki collection under `books/`  
**Delivery:** Static hub page (plain HTML + hub-only CSS) + light back-links in existing book wikis

---

## 1. Purpose and success criteria

### Purpose

A **personal multi-wiki landing page** at the root of the `books/` collection. It catalogs book reading-companion wikis and links into each one. It is a front door / library portal, not a second encyclopedia and not a cross-wiki search engine.

### Constraints and decisions

| Decision | Choice |
|----------|--------|
| Audience | Personal use (same as individual book wikis) |
| Scope | **Catalog + shared chrome** — header, intro, card grid, footer |
| Card maintenance | **Hand-edited HTML** in the hub `index.html` (no JSON, no build) |
| Visual system | **Distinct hub theme** — same structural ideas as book wikis (header, readable content, responsive layout), separate stylesheet and palette |
| Card content | **Standard** — title, author, year, short blurb, spoiler note, primary link |
| Book-wiki integration | **Yes** — “All book wikis” link in each book wiki sidebar |
| Delivery approach | **Root hub only** (Approach A) |

### Success criteria (v1 “done”)

- Open `books/index.html` and see a clear list of available book wikis.
- From a hub card, open that book’s Main Page (e.g. Exodus wiki).
- From a book wiki page (root and nested), return to the hub via **All book wikis**.
- Collection README documents how to open the hub and how to add another book wiki.
- Adding another book later is: create the wiki folder + paste a new card into the hub HTML + ensure that wiki’s chrome has the hub back-link.

---

## 2. Architecture

### Stack

- **HTML** — single hub page `books/index.html`
- **CSS** — hub-only stylesheet `books/assets/css/hub.css`
- **JS** — none on the hub in v1
- **No** backend, auth, build step, shared CSS with book wikis, or cross-wiki search

### Runtime model

1. User opens `books/index.html` (via local static server preferred, or `file://`).
2. Hub CSS styles header, intro, card grid, and footer.
3. Cards are static HTML; each primary link is a relative path into a book folder’s `index.html`.
4. Book wikis remain independent (own CSS, JS, search index). The hub does not load book assets or search indexes.

### Directory layout

```text
books/
  index.html                      # Hub landing page
  assets/
    css/
      hub.css                     # Hub-only styles
  README.md                       # Collection-level: open hub, add a book
  docs/
    superpowers/
      specs/
        2026-07-23-book-wikis-hub-design.md
  exodus-the-archimedes-engine/
    index.html                    # Existing; sidebar gets hub back-link
    search.html
    pages/…                       # All chrome pages get hub back-link
    templates/article.html        # Template gets hub back-link for new pages
    README.md                     # One-liner pointing at parent hub
    …rest of wiki unchanged…
```

### Explicit non-goals (v1)

- Cross-wiki search
- JSON / data-driven cards
- Build tooling or partials/includes
- Shared CSS tokens with book wikis
- Cover images or deep category links on cards
- Multi-page library site (`about.html`, series pages, etc.)

---

## 3. Hub page content and UI

### Page structure

| Region | Content |
|--------|---------|
| **Header** | Site title: **Book Wikis**. No search box (search stays inside each book wiki). |
| **Intro** | Short lead: personal collection of full-spoiler reading-companion wikis; pick a book to open its wiki. |
| **Card grid** | One hand-authored card per book wiki. |
| **Footer** | Minimal personal-use note; optional hint to open via local static server. |

### Book card fields

| Field | Notes |
|-------|--------|
| **Title** | Book / wiki title; links to the wiki Main Page |
| **Author** | e.g. Peter F. Hamilton |
| **Year** | Publication year when known |
| **Blurb** | 1–2 sentences on what the wiki covers |
| **Spoiler note** | Short badge or line when that wiki is full-spoiler |
| **Primary link** | Clear CTA (e.g. “Open wiki”) to the same Main Page URL as the title |

### v1 card content

**Exodus: The Archimedes Engine**

| Field | Value |
|-------|--------|
| Author | Peter F. Hamilton |
| Year | 2024 |
| Blurb | Full-spoiler companion for characters, locations, factions, technology, timeline, and plot in the Centauri Cluster prequel novel. |
| Spoiler | Full spoilers |
| Link | `exodus-the-archimedes-engine/index.html` |

### Visual direction (`hub.css`)

- Clean, modern “library portal” feel — **not** a clone of Exodus `wiki.css` colors/tokens.
- Distinct hub palette and branding so the hub reads as the collection parent and each book wiki keeps its own identity.
- Structural family resemblance: simple header, readable typography, content max-width, responsive card grid (1 column on narrow viewports → 2+ columns when wide).
- Cards as clear interactive units with hover and keyboard focus affordances.
- Accessibility: semantic landmarks (`header`, `main`, `nav`/`section`, `footer`), visible focus styles, sufficient contrast.

### Adding a book later

1. Add `{slug}/` wiki folder following the existing plain-HTML wiki pattern.
2. Copy a card block in `books/index.html`, fill fields, set the relative primary link.
3. Ensure that wiki’s sidebar chrome includes **All book wikis** with a depth-correct path to `books/index.html`.

---

## 4. Book-wiki integration

### Back-link behavior

| Property | Choice |
|----------|--------|
| Label | `All book wikis` |
| Placement | Top of the left sidebar nav, above “Main Page” |
| Styling | Reuse existing sidebar link styles; optional light separator under the item only if default list styling is insufficient |
| Target | Collection root `index.html` |

### Relative paths (Exodus depths)

| Page location | Hub href |
|---------------|----------|
| Wiki root (`index.html`, `search.html`) | `../index.html` |
| `pages/*.html` | `../../index.html` |
| `pages/*/*.html` | `../../../index.html` |
| `templates/article.html` | `{{ROOT}}../index.html` |

### Files to update in Exodus (v1)

- `templates/article.html`
- All existing HTML pages that share the sidebar chrome:
  - `index.html`, `search.html`
  - All files under `pages/` (including nested category pages)

No change to book-wiki search, content articles, or search indexes. Prefer **zero** `wiki.css` change unless a separator class is clearly needed.

### Exodus README note

One line in `exodus-the-archimedes-engine/README.md`: this wiki is part of the Book Wikis collection; parent hub is `../index.html`.

---

## 5. Collection README

`books/README.md` should document:

1. How to open the hub (e.g. `python -m http.server` from `books/`, then open `/`).
2. That each subdirectory is an independent book wiki.
3. How to add a book: create folder, add hub card, ensure hub back-link in that wiki’s chrome.
4. Pointer to `exodus-the-archimedes-engine/README.md` for in-wiki page authoring conventions.

---

## 6. Error handling and edge cases

| Case | Behavior |
|------|----------|
| Missing book folder | Card may still be listed; link 404s until the wiki exists — do not invent empty placeholder wikis |
| Open via `file://` | Hub works (static HTML/CSS only); book-wiki search remains “prefer local server” as today |
| Wrong `../` depth on back-link | Broken hub return from nested pages — treat as implementation bug; catch in verification |
| Future book wikis | Same sidebar label and path convention relative to collection root |

---

## 7. Verification (manual)

1. Open hub → Exodus card → lands on Exodus Main Page.
2. From Exodus Main Page, sidebar **All book wikis** → hub.
3. From a nested page (e.g. `pages/characters/finn-jalgori-tobu.html`) → hub still works.
4. Hub layout is usable at mobile and desktop widths.
5. Spot-check that existing Exodus nav items and links are unchanged aside from the new hub item.

No automated test suite required for v1.

---

## 8. Implementation units

| Unit | Responsibility | Depends on |
|------|----------------|------------|
| `books/index.html` | Hub markup: chrome, intro, Exodus card, footer | `hub.css` |
| `books/assets/css/hub.css` | Hub visual system only | — |
| `books/README.md` | How to open and extend the collection | Hub exists |
| Exodus chrome updates | Depth-correct **All book wikis** on every chrome page + template | Hub path `../` from wiki root |
| Exodus README line | Points authors at parent hub | Hub exists |

Each unit has one clear purpose. Book wiki article bodies and search remain untouched.
