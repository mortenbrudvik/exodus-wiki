# Mobile PWA + GitHub Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a phone-friendly Book Wikis hub that installs via iOS Add to Home Screen, polish hub + Exodus mobile layout, and publish the public site on GitHub Pages.

**Architecture:** Keep multi-page static HTML. Add a root web app manifest + icons for the hub only. Improve `hub.css` and Exodus `wiki.css`/`search.js` for narrow viewports and safe areas. Make the repo public and enable GitHub Pages from `main` at repository root so the site is served at `https://mortenbrudvik.github.io/my-books/`.

**Tech Stack:** Plain HTML/CSS/JS, Web App Manifest, Apple touch meta tags, GitHub Pages (`gh`), no service worker, no build step.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-23-mobile-pwa-github-pages-design.md` — implement only what it requires.
- **Relative paths only** — no absolute root URLs (`/…`); site lives under `/my-books/` on Pages.
- Manifest `start_url` and `scope` are relative (`./`).
- Hub-only install shell; do not add per-book manifests.
- No service worker / offline full-wiki cache.
- Do not rewrite article body content or search-index schema.
- Repo: `mortenbrudvik/my-books`, branch `main`.
- Icon theme colors: hub dark `#0f1419` / `#1a2332` / accent `#5b9fd4`.

## File map

| Path | Action | Responsibility |
|------|--------|----------------|
| `assets/icons/icon-192.png` | Create | Manifest icon 192 |
| `assets/icons/icon-512.png` | Create | Manifest icon 512 |
| `assets/icons/apple-touch-icon.png` | Create | iOS home screen icon (180) |
| `manifest.webmanifest` | Create | Install metadata |
| `index.html` | Modify | Manifest + Apple meta tags |
| `assets/css/hub.css` | Modify | Hub mobile polish + safe areas |
| `exodus-the-archimedes-engine/assets/css/wiki.css` | Modify | Wiki mobile polish |
| `exodus-the-archimedes-engine/assets/js/search.js` | Modify | Menu backdrop / body scroll lock |
| `README.md` | Modify | Public URL, install steps, spoiler warning |

---

### Task 1: App icons

**Files:**
- Create: `assets/icons/icon-192.png`
- Create: `assets/icons/icon-512.png`
- Create: `assets/icons/apple-touch-icon.png`

**Interfaces:**
- Consumes: nothing
- Produces: PNG paths used by Task 2 manifest and hub head:
  - `assets/icons/icon-192.png` (192×192)
  - `assets/icons/icon-512.png` (512×512)
  - `assets/icons/apple-touch-icon.png` (180×180)

- [ ] **Step 1: Create icons directory**

```powershell
New-Item -ItemType Directory -Force -Path "assets/icons" | Out-Null
```

- [ ] **Step 2: Generate solid branded PNGs (Windows System.Drawing)**

Run from repo root (`books/`):

```powershell
Add-Type -AssemblyName System.Drawing

function New-BookIcon([int]$Size, [string]$Path) {
  $bmp = New-Object System.Drawing.Bitmap $Size, $Size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml("#0f1419"))

  $margin = [int]($Size * 0.18)
  $bookW = [int]($Size * 0.42)
  $bookH = [int]($Size * 0.55)
  $x = [int](($Size - $bookW) / 2)
  $y = [int](($Size - $bookH) / 2)

  $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#5b9fd4"))
  $g.FillRectangle($brush, $x, $y, $bookW, $bookH)

  $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#1a2332"), [Math]::Max(2, $Size / 64.0))
  $g.DrawLine($pen, $x + $bookW / 2, $y, $x + $bookW / 2, $y + $bookH)

  $fontSize = [Math]::Max(10, [int]($Size * 0.12))
  $font = New-Object System.Drawing.Font "Segoe UI", $fontSize, ([System.Drawing.FontStyle]::Bold)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml("#e8eef6"))
  $sf = New-Object System.Drawing.StringFormat
  $sf.Alignment = [System.Drawing.StringAlignment]::Center
  $sf.LineAlignment = [System.Drawing.StringAlignment]::Center
  $rect = New-Object System.Drawing.RectangleF 0, ([float]($Size * 0.72)), $Size, ([float]($Size * 0.2))
  if ($Size -ge 180) {
    $g.DrawString("BW", $font, $textBrush, $rect, $sf)
  }

  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose(); $brush.Dispose(); $pen.Dispose(); $font.Dispose(); $textBrush.Dispose()
}

New-BookIcon 192 (Join-Path (Get-Location) "assets/icons/icon-192.png")
New-BookIcon 512 (Join-Path (Get-Location) "assets/icons/icon-512.png")
New-BookIcon 180 (Join-Path (Get-Location) "assets/icons/apple-touch-icon.png")

Get-ChildItem assets/icons | Format-Table Name, Length
```

Expected: three PNG files, non-zero size.

- [ ] **Step 3: Commit**

```bash
git add assets/icons/
git commit -m "Add Book Wikis home-screen app icons."
```

---

### Task 2: Manifest + hub install meta

**Files:**
- Create: `manifest.webmanifest`
- Modify: `index.html` (head section)

**Interfaces:**
- Consumes: icon paths from Task 1
- Produces: installable hub document at site root

- [ ] **Step 1: Write `manifest.webmanifest`**

```json
{
  "name": "Book Wikis",
  "short_name": "Book Wikis",
  "description": "Personal full-spoiler reading-companion wikis",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "background_color": "#1a2332",
  "theme_color": "#0f1419",
  "icons": [
    {
      "src": "assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

- [ ] **Step 2: Update hub `index.html` head**

Replace the `<head>` block with:

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Book Wikis</title>
  <meta name="theme-color" content="#0f1419">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Book Wikis">
  <link rel="manifest" href="manifest.webmanifest">
  <link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">
  <link rel="stylesheet" href="assets/css/hub.css">
</head>
```

Leave the rest of `index.html` unchanged.

- [ ] **Step 3: Local smoke check**

```powershell
python -m http.server 8080
```

In another shell:

```powershell
@(
  "http://localhost:8080/",
  "http://localhost:8080/manifest.webmanifest",
  "http://localhost:8080/assets/icons/icon-192.png",
  "http://localhost:8080/assets/icons/apple-touch-icon.png"
) | ForEach-Object {
  $r = Invoke-WebRequest -Uri $_ -UseBasicParsing
  Write-Host "$($r.StatusCode) $_"
}
```

Expected: all `200`. Stop the server when done.

- [ ] **Step 4: Commit**

```bash
git add manifest.webmanifest index.html
git commit -m "Add web app manifest and Apple install meta for hub."
```

---

### Task 3: Hub mobile polish

**Files:**
- Modify: `assets/css/hub.css`

**Interfaces:**
- Consumes: existing hub class names (`.site-header`, `.layout`, `.book-card`, `.book-card__cta`, `.site-footer`)
- Produces: safe-area padding, larger CTA tap target, no horizontal overflow on narrow screens

- [ ] **Step 1: Extend `:root` / `body` and chrome for safe areas**

At the top of `hub.css` after existing `:root` block, ensure body uses safe-area padding. Apply these edits:

1. Update `body` rules to:

```css
body {
  margin: 0;
  min-height: 100vh;
  min-height: 100dvh;
  font-family: var(--hub-font);
  color: var(--hub-text);
  background: var(--hub-bg);
  line-height: 1.55;
  padding-left: env(safe-area-inset-left, 0);
  padding-right: env(safe-area-inset-right, 0);
}
```

2. Update `.site-header` to:

```css
.site-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  padding-top: calc(1rem + env(safe-area-inset-top, 0px));
  background: var(--hub-surface);
  border-bottom: 1px solid var(--hub-border);
  position: sticky;
  top: 0;
  z-index: 10;
}
```

3. Update `.layout` padding bottom to include home indicator:

```css
.layout {
  max-width: var(--hub-content-max);
  margin: 0 auto;
  padding: 2rem 1.25rem 3rem;
  padding-bottom: calc(3rem + env(safe-area-inset-bottom, 0px));
}
```

4. Update `.book-card__cta` for tap size:

```css
.book-card__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  margin-top: 0.25rem;
  min-height: 2.75rem;
  padding: 0.55rem 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--hub-bg);
  background: var(--hub-accent);
  border-radius: 0.35rem;
  text-decoration: none;
}
```

5. Add overflow guard (append near end of file):

```css
img,
svg,
video {
  max-width: 100%;
  height: auto;
}

.book-card {
  min-width: 0;
}

.site-footer {
  padding-bottom: calc(2rem + env(safe-area-inset-bottom, 0px));
}
```

(If `.site-footer` already has padding rules, merge so bottom uses the `calc` form and keep existing horizontal/max-width rules.)

- [ ] **Step 2: Visual check at mobile width**

Serve locally, open hub, DevTools device mode ~390×844:

- No horizontal scrollbar on the page
- CTA easy to tap
- Content not under a simulated notch (safe-area may be 0 on desktop — OK)

- [ ] **Step 3: Commit**

```bash
git add assets/css/hub.css
git commit -m "Polish Book Wikis hub layout for mobile safe areas."
```

---

### Task 4: Exodus mobile polish (CSS + menu JS)

**Files:**
- Modify: `exodus-the-archimedes-engine/assets/css/wiki.css`
- Modify: `exodus-the-archimedes-engine/assets/js/search.js`

**Interfaces:**
- Consumes: existing `.menu-toggle`, `#site-sidebar`, `.sidebar.is-open`, `.site-header`, `.search-form`, `.search-dropdown`
- Produces: classes `body.nav-open` and optional `.sidebar-backdrop` behavior driven by JS; CSS overlay drawer on narrow screens

- [ ] **Step 1: Replace/extend the mobile `@media (max-width: 720px)` block in `wiki.css`**

Find the existing block starting at `@media (max-width: 720px)` and **replace the entire media query** with:

```css
@media (max-width: 720px) {
  .site-header {
    padding-top: calc(0.75rem + env(safe-area-inset-top, 0px));
    padding-left: calc(1rem + env(safe-area-inset-left, 0px));
    padding-right: calc(1rem + env(safe-area-inset-right, 0px));
  }

  .menu-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    min-width: 2.75rem;
    padding: 0.45rem 0.75rem;
  }

  .site-title {
    flex: 1 1 auto;
    min-width: 0;
  }

  .search-form {
    flex: 1 1 100%;
    max-width: none;
    min-width: 0;
    order: 3;
  }

  .search-input {
    min-height: 2.75rem;
    font-size: 1rem;
  }

  .search-form button {
    min-height: 2.75rem;
  }

  .search-dropdown {
    max-height: min(20rem, 50vh);
    left: 0;
    right: 0;
  }

  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: min(18rem, 86vw);
    z-index: 40;
    border-right: 1px solid var(--border);
    border-bottom: 0;
    padding-top: calc(1rem + env(safe-area-inset-top, 0px));
    padding-bottom: calc(2rem + env(safe-area-inset-bottom, 0px));
    overflow-y: auto;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);
  }

  .sidebar.is-open {
    display: block;
  }

  .sidebar nav a {
    padding: 0.7rem 0.75rem;
    min-height: 2.75rem;
  }

  .sidebar-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(15, 20, 25, 0.45);
    z-index: 35;
  }

  .sidebar-backdrop.is-open {
    display: block;
  }

  body.nav-open {
    overflow: hidden;
  }

  .content {
    padding-left: calc(1rem + env(safe-area-inset-left, 0px));
    padding-right: calc(1rem + env(safe-area-inset-right, 0px));
    padding-bottom: calc(2rem + env(safe-area-inset-bottom, 0px));
  }

  .wiki-table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
```

Also update base `body` (outside media query) to allow safe horizontal insets without breaking desktop:

```css
body {
  margin: 0;
  font-family: var(--font);
  color: var(--text);
  background: var(--bg);
  line-height: 1.55;
}
```

(Keep existing body rules; only add safe-area if not already present — desktop grid layout should remain unchanged.)

- [ ] **Step 2: Extend `wireMenu()` in `search.js`**

Replace the existing `wireMenu` function with:

```javascript
  function wireMenu() {
    var btn = document.querySelector(".menu-toggle");
    var sidebar = document.getElementById("site-sidebar");
    if (!btn || !sidebar) return;

    var backdrop = document.querySelector(".sidebar-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "sidebar-backdrop";
      backdrop.hidden = true;
      document.body.appendChild(backdrop);
    }

    function setOpen(open) {
      sidebar.classList.toggle("is-open", open);
      backdrop.classList.toggle("is-open", open);
      backdrop.hidden = !open;
      document.body.classList.toggle("nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }

    btn.addEventListener("click", function () {
      setOpen(!sidebar.classList.contains("is-open"));
    });

    backdrop.addEventListener("click", function () {
      setOpen(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }
```

No HTML template changes required — backdrop is created at runtime.

- [ ] **Step 3: Local mobile checks**

Serve from `books/`:

```powershell
python -m http.server 8080
```

Open:

- `http://localhost:8080/exodus-the-archimedes-engine/index.html`
- Nested: `.../pages/characters/finn-jalgori-tobu.html`

At ~390px width:

1. Menu button visible; opens overlay sidebar
2. Backdrop click closes menu
3. Search row full width under title
4. Article readable; tables can scroll horizontally inside container if wide
5. Desktop width still shows persistent sidebar (no menu button)

- [ ] **Step 4: Commit**

```bash
git add exodus-the-archimedes-engine/assets/css/wiki.css exodus-the-archimedes-engine/assets/js/search.js
git commit -m "Improve Exodus wiki mobile nav, search, and safe areas."
```

---

### Task 5: README — public site + install instructions

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: Pages URL `https://mortenbrudvik.github.io/my-books/`
- Produces: operator docs for install and public spoilers

- [ ] **Step 1: Replace `README.md` content with**

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "Document public Pages URL and iPhone home-screen install."
```

---

### Task 6: Public repo + GitHub Pages + push

**Files:** none in tree (remote config only)

**Interfaces:**
- Consumes: commits from Tasks 1–5 on `main`
- Produces: live HTTPS site

- [ ] **Step 1: Confirm branch and remote**

```bash
git branch --show-current
git remote -v
git log --oneline -8
```

Expected: `main`, `origin` → `mortenbrudvik/my-books`.

- [ ] **Step 2: Make repository public**

```bash
gh repo edit mortenbrudvik/my-books --visibility public --accept-visibility-change-consequences
```

Verify:

```bash
gh repo view mortenbrudvik/my-books --json visibility,url -q .
```

Expected: `"visibility":"PUBLIC"`.

- [ ] **Step 3: Enable GitHub Pages from `main` root**

```bash
gh api -X POST repos/mortenbrudvik/my-books/pages -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"
```

If the API returns that Pages already exists, update instead:

```bash
gh api -X PUT repos/mortenbrudvik/my-books/pages -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"
```

- [ ] **Step 4: Push `main`**

```bash
git push -u origin main
```

- [ ] **Step 5: Wait for Pages and verify HTTP**

```bash
gh api repos/mortenbrudvik/my-books/pages --jq "{status:status,html_url:html_url,cname:cname}"
```

Then (may need 1–2 minutes after first enable):

```powershell
@(
  "https://mortenbrudvik.github.io/my-books/",
  "https://mortenbrudvik.github.io/my-books/manifest.webmanifest",
  "https://mortenbrudvik.github.io/my-books/assets/icons/icon-192.png",
  "https://mortenbrudvik.github.io/my-books/exodus-the-archimedes-engine/index.html"
) | ForEach-Object {
  try {
    $r = Invoke-WebRequest -Uri $_ -UseBasicParsing
    Write-Host "$($r.StatusCode) $_"
  } catch {
    Write-Host "FAIL $_"
  }
}
```

Expected: all `200`. If FAIL, recheck Pages status and retry after deploy finishes.

---

### Task 7: End-to-end verification checklist

**Files:** none

- [ ] **Step 1: Desktop wide** — Hub and Exodus look correct; sidebar visible on Exodus without menu button.

- [ ] **Step 2: Narrow local (~390×844)** — Hub cards; Exodus menu overlay + backdrop; search full width; **All book wikis** still works.

- [ ] **Step 3: Production paths**

| Check | Expected |
|-------|----------|
| Hub URL | 200, Book Wikis title |
| Open Exodus card | Exodus Main Page |
| Nested character page | Renders; menu works |
| Manifest URL | JSON with `start_url` `./` |
| Icon URLs | 200 PNG |

- [ ] **Step 4: iPhone (manual)**

1. Safari → live hub URL  
2. Share → Add to Home Screen  
3. Open icon → hub in standalone  
4. Open Exodus, navigate, return via **All book wikis**

- [ ] **Step 5: Done when all Task 7 checks pass**

No further commits required unless fixes are needed.

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Public repo | Task 6 |
| GitHub Pages `main` root | Task 6 |
| Manifest + icons + Apple meta | Tasks 1–2 |
| Hub-only install | Tasks 1–2 |
| Relative start_url/scope | Task 2 |
| Hub mobile polish / safe areas | Task 3 |
| Exodus mobile polish | Task 4 |
| Menu backdrop / scroll lock | Task 4 |
| README URL + install + spoilers public | Task 5 |
| No service worker | Not added (correct) |
| Verification | Tasks 2–3, 4, 6–7 |

No placeholders. Icon paths and class names (`nav-open`, `sidebar-backdrop`) are consistent across Tasks 1–4.
