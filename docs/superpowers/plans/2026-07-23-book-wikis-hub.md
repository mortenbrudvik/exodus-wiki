# Book Wikis Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a root HTML hub at `books/` that catalogs book wikis with distinct portal chrome, link into the Exodus wiki, and add depth-correct “All book wikis” back-links on every Exodus chrome page.

**Architecture:** Single static hub page (`index.html` + `assets/css/hub.css`) at the collection root. Book cards are hand-authored HTML. Each book wiki stays independent; Exodus sidebars gain one hub link with a path that matches page depth (`../`, `../../`, or `../../../` + `index.html`). No hub JS, no build step, no cross-wiki search.

**Tech Stack:** Plain HTML5, CSS3 (custom properties), no frameworks, no npm. Manual verification in a browser (local static server preferred).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-23-book-wikis-hub-design.md` — follow it; do not expand scope.
- No build tooling, JSON cards, or hub JavaScript in v1.
- Hub theme must be **distinct** from Exodus `wiki.css` (do not import or copy its color tokens).
- Hand-edited cards only; one Exodus card in v1.
- Sidebar label exact text: `All book wikis`.
- Do **not** modify article body content, search indexes, or search.js.
- Prefer zero changes to `exodus-the-archimedes-engine/assets/css/wiki.css`.
- **Do not run `git commit`** (user preference; tree may not be a git repo).

## File map

| Path | Action | Responsibility |
|------|--------|----------------|
| `index.html` | Create | Hub landing page markup |
| `assets/css/hub.css` | Create | Hub-only visual system |
| `README.md` | Create | How to open hub / add books |
| `exodus-the-archimedes-engine/**/*.html` (chrome pages) | Modify | Insert hub back-link in sidebar |
| `exodus-the-archimedes-engine/templates/article.html` | Modify | Template gets hub back-link |
| `exodus-the-archimedes-engine/README.md` | Modify | One line pointing at parent hub |

Paths above are relative to `books/` (workspace root).

---

### Task 1: Hub stylesheet

**Files:**
- Create: `assets/css/hub.css`

**Interfaces:**
- Consumes: nothing
- Produces: CSS classes used by Task 2 — `.site-header`, `.site-title`, `.layout`, `.intro`, `.card-grid`, `.book-card`, `.book-card__title`, `.book-card__meta`, `.book-card__blurb`, `.book-card__spoiler`, `.book-card__cta`, `.site-footer`, focus/hover states, responsive grid

- [ ] **Step 1: Create the assets directory**

```powershell
New-Item -ItemType Directory -Force -Path "assets/css" | Out-Null
```

- [ ] **Step 2: Write `assets/css/hub.css`**

Write the full file:

```css
/* Book Wikis hub — library portal (distinct from per-book wiki themes) */
:root {
  --hub-bg: #0f1419;
  --hub-surface: #1a2332;
  --hub-surface-elevated: #243044;
  --hub-text: #e8eef6;
  --hub-muted: #9aa8bc;
  --hub-border: #334155;
  --hub-accent: #5b9fd4;
  --hub-accent-hover: #7eb6e0;
  --hub-spoiler-bg: #3d2e14;
  --hub-spoiler-text: #f0d78c;
  --hub-spoiler-border: #8a6a28;
  --hub-content-max: 56rem;
  --hub-font: system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif;
  --hub-radius: 0.5rem;
  --hub-focus: #7eb6e0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: var(--hub-font);
  color: var(--hub-text);
  background: var(--hub-bg);
  line-height: 1.55;
}

a {
  color: var(--hub-accent);
}

a:hover {
  color: var(--hub-accent-hover);
}

a:focus-visible {
  outline: 2px solid var(--hub-focus);
  outline-offset: 2px;
}

.site-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  background: var(--hub-surface);
  border-bottom: 1px solid var(--hub-border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.site-title {
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: 0.02em;
  color: var(--hub-text);
  text-decoration: none;
}

.site-title:visited {
  color: var(--hub-text);
}

.site-title:hover {
  color: var(--hub-accent-hover);
}

.layout {
  max-width: var(--hub-content-max);
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
}

.intro {
  margin-bottom: 2rem;
}

.intro h1 {
  margin: 0 0 0.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.25;
}

.intro .lead {
  margin: 0;
  color: var(--hub-muted);
  font-size: 1.05rem;
  max-width: 40rem;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (min-width: 40rem) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 56rem) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.book-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 1.35rem;
  background: var(--hub-surface);
  border: 1px solid var(--hub-border);
  border-radius: var(--hub-radius);
  transition: border-color 0.15s ease, background 0.15s ease;
}

.book-card:hover,
.book-card:focus-within {
  border-color: var(--hub-accent);
  background: var(--hub-surface-elevated);
}

.book-card__title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
}

.book-card__title a {
  color: var(--hub-text);
  text-decoration: none;
}

.book-card__title a:visited {
  color: var(--hub-text);
}

.book-card__title a:hover {
  color: var(--hub-accent-hover);
}

.book-card__meta {
  margin: 0;
  font-size: 0.9rem;
  color: var(--hub-muted);
}

.book-card__blurb {
  margin: 0;
  flex: 1;
  color: var(--hub-text);
  font-size: 0.95rem;
}

.book-card__spoiler {
  display: inline-block;
  align-self: flex-start;
  margin: 0;
  padding: 0.2rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--hub-spoiler-text);
  background: var(--hub-spoiler-bg);
  border: 1px solid var(--hub-spoiler-border);
  border-radius: 0.25rem;
}

.book-card__cta {
  display: inline-block;
  align-self: flex-start;
  margin-top: 0.25rem;
  padding: 0.45rem 0.9rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--hub-bg);
  background: var(--hub-accent);
  border-radius: 0.35rem;
  text-decoration: none;
}

.book-card__cta:visited {
  color: var(--hub-bg);
}

.book-card__cta:hover {
  color: var(--hub-bg);
  background: var(--hub-accent-hover);
}

.site-footer {
  max-width: var(--hub-content-max);
  margin: 0 auto;
  padding: 0 1.25rem 2rem;
  font-size: 0.875rem;
  color: var(--hub-muted);
}

.site-footer p {
  margin: 0;
}
```

- [ ] **Step 3: Verify the file exists and is non-empty**

```powershell
Get-Item "assets/css/hub.css" | Select-Object FullName, Length
```

Expected: `Length` greater than 2000.

---

### Task 2: Hub landing page

**Files:**
- Create: `index.html`
- Test: open in browser (manual)

**Interfaces:**
- Consumes: `assets/css/hub.css` classes from Task 1
- Produces: working hub at collection root with one Exodus card linking to `exodus-the-archimedes-engine/index.html`

- [ ] **Step 1: Write `index.html`**

Write the full file at the `books/` root:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Book Wikis</title>
  <link rel="stylesheet" href="assets/css/hub.css">
</head>
<body>
  <header class="site-header">
    <a class="site-title" href="index.html">Book Wikis</a>
  </header>

  <main class="layout">
    <section class="intro" aria-labelledby="hub-heading">
      <h1 id="hub-heading">Book Wikis</h1>
      <p class="lead">
        A personal collection of full-spoiler reading-companion wikis.
        Pick a book to open its wiki — characters, places, factions, technology, timeline, and plot.
      </p>
    </section>

    <section aria-labelledby="books-heading">
      <h2 id="books-heading" class="visually-hidden" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">Available wikis</h2>
      <ul class="card-grid">
        <li>
          <article class="book-card">
            <h3 class="book-card__title">
              <a href="exodus-the-archimedes-engine/index.html">Exodus: The Archimedes Engine</a>
            </h3>
            <p class="book-card__meta">Peter F. Hamilton · 2024</p>
            <p class="book-card__blurb">
              Full-spoiler companion for characters, locations, factions, technology, timeline,
              and plot in the Centauri Cluster prequel novel.
            </p>
            <p class="book-card__spoiler">Full spoilers</p>
            <a class="book-card__cta" href="exodus-the-archimedes-engine/index.html">Open wiki</a>
          </article>
        </li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <p>Personal use. Open this folder with a local static server if book-wiki search fails under <code>file://</code>.</p>
  </footer>
</body>
</html>
```

- [ ] **Step 2: Smoke-check relative paths**

```powershell
Test-Path "index.html"
Test-Path "assets/css/hub.css"
Test-Path "exodus-the-archimedes-engine/index.html"
```

Expected: all three `True`.

- [ ] **Step 3: Open hub in a browser and verify visually**

From `books/`:

```powershell
python -m http.server 8080
```

Open http://localhost:8080/

Check:

1. Dark hub theme (not the light Exodus wiki look).
2. Header shows **Book Wikis**.
3. One card: title, author/year, blurb, Full spoilers badge, Open wiki button.
4. Card title link and Open wiki both go to the Exodus Main Page.
5. Layout readable at a narrow window and a wide window.

Stop the server when done (Ctrl+C).

---

### Task 3: Collection README

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: hub paths from Tasks 1–2
- Produces: collection-level operator docs

- [ ] **Step 1: Write `README.md` at `books/` root**

```markdown
# Book Wikis

Personal collection of full-spoiler reading-companion wikis (plain HTML).

## Open the hub

From this directory (`books/`):

```bash
python -m http.server 8080
```

Then open http://localhost:8080/

The hub is `index.html`. Each subdirectory is an independent book wiki.

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

- `index.html` — catalog landing page
- `assets/css/hub.css` — hub-only styles (not shared with book wikis)
```

- [ ] **Step 2: Confirm the file is readable**

```powershell
Get-Content "README.md" -Head 15
```

Expected: starts with `# Book Wikis`.

---

### Task 4: Exodus sidebar back-links (all chrome pages)

**Files:**
- Modify: every HTML file under `exodus-the-archimedes-engine/` that has `<nav aria-label="Wiki">`, including `templates/article.html` (see list below)
- Do **not** modify article body text outside the sidebar nav

**Interfaces:**
- Consumes: hub at `books/index.html`
- Produces: first sidebar item on every chrome page is **All book wikis** with depth-correct href

**Depth rules (exact):**

| Pages | Insert before first `<li>` in wiki nav |
|-------|----------------------------------------|
| Wiki root: `index.html`, `search.html` | `<li><a href="../index.html">All book wikis</a></li>` |
| `pages/*.html` (not nested) | `<li><a href="../../index.html">All book wikis</a></li>` |
| `pages/*/*.html` | `<li><a href="../../../index.html">All book wikis</a></li>` |
| `templates/article.html` | `<li><a href="{{ROOT}}../index.html">All book wikis</a></li>` |

**Complete file groups:**

**Root (href `../index.html`):**
- `exodus-the-archimedes-engine/index.html`
- `exodus-the-archimedes-engine/search.html`

**`pages/` one level (href `../../index.html`):**
- `exodus-the-archimedes-engine/pages/book.html`
- `exodus-the-archimedes-engine/pages/chapters.html`
- `exodus-the-archimedes-engine/pages/plot.html`
- `exodus-the-archimedes-engine/pages/timeline.html`

**Nested `pages/*/*` (href `../../../index.html`):**
- All HTML under `pages/characters/`, `pages/locations/`, `pages/factions/`, `pages/technology/` (including each category `index.html`)

**Template:**
- `exodus-the-archimedes-engine/templates/article.html` → `{{ROOT}}../index.html`

- [ ] **Step 1: Apply root-depth insertion**

For each of `exodus-the-archimedes-engine/index.html` and `exodus-the-archimedes-engine/search.html`, change:

```html
        <ul>
          <li><a href="index.html">Main Page</a></li>
```

to:

```html
        <ul>
          <li><a href="../index.html">All book wikis</a></li>
          <li><a href="index.html">Main Page</a></li>
```

- [ ] **Step 2: Apply `pages/` one-level insertion**

For each of `book.html`, `chapters.html`, `plot.html`, `timeline.html` under `pages/`, change:

```html
        <ul>
          <li><a href="../index.html">Main Page</a></li>
```

to:

```html
        <ul>
          <li><a href="../../index.html">All book wikis</a></li>
          <li><a href="../index.html">Main Page</a></li>
```

- [ ] **Step 3: Apply nested-page insertion (batch)**

From `books/`, run PowerShell so every nested page under characters/locations/factions/technology gets the hub link once (skip if already present):

```powershell
$nested = Get-ChildItem -Path "exodus-the-archimedes-engine/pages" -Recurse -Filter "*.html" |
  Where-Object { $_.Directory.Name -in @("characters","locations","factions","technology") }

$old = @"
        <ul>
          <li><a href="../../index.html">Main Page</a></li>
"@

$new = @"
        <ul>
          <li><a href="../../../index.html">All book wikis</a></li>
          <li><a href="../../index.html">Main Page</a></li>
"@

foreach ($f in $nested) {
  $text = Get-Content -Raw -Path $f.FullName
  if ($text -match 'All book wikis') { Write-Host "SKIP $($f.FullName)"; continue }
  if ($text -notlike "*$old*") { Write-Host "NO MATCH $($f.FullName)"; continue }
  Set-Content -Path $f.FullName -Value ($text.Replace($old, $new)) -NoNewline
  Write-Host "OK $($f.Name)"
}
```

Expected: every nested file prints `OK` or already `SKIP` with the link present. No `NO MATCH` for real chrome pages.

- [ ] **Step 4: Update the article template**

In `exodus-the-archimedes-engine/templates/article.html`, change:

```html
        <ul>
          <li><a href="{{ROOT}}index.html">Main Page</a></li>
```

to:

```html
        <ul>
          <li><a href="{{ROOT}}../index.html">All book wikis</a></li>
          <li><a href="{{ROOT}}index.html">Main Page</a></li>
```

- [ ] **Step 5: Verify counts**

```powershell
$hits = Select-String -Path "exodus-the-archimedes-engine/**/*.html" -Pattern "All book wikis" -SimpleMatch
$hits.Count
$hits | Select-Object -First 5 Path, Line
```

Expected: count equals total HTML chrome files including template (approximately 50). Every hit’s line should include `All book wikis`.

- [ ] **Step 6: Spot-check three depths in the browser**

With `python -m http.server 8080` from `books/`:

1. http://localhost:8080/exodus-the-archimedes-engine/index.html → click **All book wikis** → hub  
2. http://localhost:8080/exodus-the-archimedes-engine/pages/book.html → **All book wikis** → hub  
3. http://localhost:8080/exodus-the-archimedes-engine/pages/characters/finn-jalgori-tobu.html → **All book wikis** → hub  

Existing nav items (Main Page, Book, Characters, …) must still be present and work.

---

### Task 5: Exodus README parent pointer

**Files:**
- Modify: `exodus-the-archimedes-engine/README.md`

**Interfaces:**
- Consumes: hub at `../index.html`
- Produces: one-line parent collection pointer

- [ ] **Step 1: Prepend a short collection note after the title**

Current start:

```markdown
# Exodus: The Archimedes Engine Wiki

Personal full-spoiler reading companion in plain HTML.
```

Replace with:

```markdown
# Exodus: The Archimedes Engine Wiki

Personal full-spoiler reading companion in plain HTML.

Part of the [Book Wikis](../index.html) collection (parent hub: `../index.html`).
```

- [ ] **Step 2: Confirm the line exists**

```powershell
Select-String -Path "exodus-the-archimedes-engine/README.md" -Pattern "Book Wikis"
```

Expected: one match mentioning the parent hub.

---

### Task 6: End-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full manual checklist**

From `books/`:

```powershell
python -m http.server 8080
```

| # | Check | Expected |
|---|--------|----------|
| 1 | Open `/` | Hub dark theme, Book Wikis header, one Exodus card |
| 2 | Click card title | Exodus Main Page |
| 3 | Click Open wiki | Exodus Main Page |
| 4 | Exodus sidebar first item | **All book wikis** |
| 5 | Click **All book wikis** on Main Page | Returns to hub |
| 6 | Nested character page → hub link | Returns to hub |
| 7 | Exodus Main Page other nav | Still works (Characters, etc.) |
| 8 | Hub at ~360px width | Readable single-column card |
| 9 | Hub at desktop width | Card grid / comfortable layout |
| 10 | `README.md` at books root | Documents open + add book |

- [ ] **Step 2: Confirm no accidental wiki.css / search-index edits**

```powershell
git -C . status 2>$null
# If not a git repo, instead:
Get-Item "exodus-the-archimedes-engine/assets/css/wiki.css","exodus-the-archimedes-engine/assets/data/search-index.json","exodus-the-archimedes-engine/assets/js/search.js" | Select-Object Name, LastWriteTime
```

Expected: wiki.css, search index, and search.js were not modified for this feature (timestamps only change if you edited them by mistake).

- [ ] **Step 3: Done criteria**

All of Task 6 Step 1 checks pass. Spec success criteria satisfied:

- Hub lists book wikis  
- Card opens Exodus  
- Nested and root wiki pages return to hub  
- Collection README documents open + add flow  

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Root hub `index.html` + shared chrome | Task 2 |
| Distinct `hub.css` | Task 1 |
| Hand-edited standard card (title, author, year, blurb, spoiler, CTA) | Task 2 |
| Title + CTA both link to wiki Main Page | Task 2 |
| No hub JS / no JSON / no build | Tasks 1–2 |
| Collection README | Task 3 |
| All book wikis sidebar link, all depths | Task 4 |
| Template updated | Task 4 Step 4 |
| Exodus README parent line | Task 5 |
| Manual verification paths | Task 6 |
| Non-goals (search, shared CSS, covers) | Not implemented (correct) |
| No git commit | Global constraint |

No placeholders left in this plan. Property names match between Task 1 CSS and Task 2 HTML.
