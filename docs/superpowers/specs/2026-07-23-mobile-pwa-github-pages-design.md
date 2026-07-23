# Mobile-Friendly Book Wikis + Home Screen Web App — Design

**Date:** 2026-07-23  
**Status:** Approved for implementation planning  
**Project:** Book Wikis collection (`my-books`)  
**Delivery:** Responsive polish + hub install shell (manifest/icons) + public GitHub Pages

---

## 1. Purpose and success criteria

### Purpose

Make the Book Wikis collection **comfortable on iPhone** and **installable as a home-screen web app** that opens the collection hub. Content remains multi-page static HTML. The installed app does **not** require a full offline service worker.

### Constraints and decisions

| Decision | Choice |
|----------|--------|
| Install model | **Add to Home Screen** (not full offline PWA) |
| Hosting | **GitHub Pages** |
| Repo visibility | **Public** (`mortenbrudvik/my-books`) |
| Home-screen target | **Hub only** — one “Book Wikis” icon |
| Mobile UX | **Install shell + polish** on hub **and** Exodus wiki |
| Approach | **A** — static PWA shell + CSS/JS polish, no framework, no service worker |
| Stack | Plain HTML/CSS; existing light JS only where needed |

### Success criteria (v1 “done”)

- Site is live on GitHub Pages from public `main`.
- On iPhone Safari, **Share → Add to Home Screen** installs an app-like icon labeled **Book Wikis**.
- Icon opens the **hub** in standalone (or near-standalone) display.
- Hub and Exodus wiki are usable on a phone: readable text, usable nav/search, no broken layout.
- README documents the public URL, install steps, and that **full spoilers are public**.

---

## 2. Hosting and architecture

### Hosting

| Item | Choice |
|------|--------|
| Repository | `mortenbrudvik/my-books` made **public** |
| Pages source | Deploy from branch `main`, site root = repository root |
| Expected URL | `https://mortenbrudvik.github.io/my-books/` |
| Path rule | **All navigation stays relative** (already true). Absolute root paths (`/…`) must not be introduced. |
| Manifest paths | `start_url` and `scope` must work under the `/my-books/` project site prefix (use relative values such as `./`) |

### Runtime model

1. User visits the public Pages URL (or opens the home-screen icon).
2. Hub loads with install metadata (manifest + Apple tags + icons).
3. User may Add to Home Screen from Safari; subsequent launches open the hub standalone.
4. Navigation into book wikis is normal multi-page relative links; book wikis keep their own CSS/JS.
5. Network required for content (no offline full-wiki cache).

### Directory layout (additions)

```text
books/
  index.html                      # Hub; + PWA/Apple meta
  manifest.webmanifest            # Install metadata (hub)
  assets/
    css/hub.css                   # + mobile polish
    icons/                        # 192 + 512 PNG (and apple-touch-icon)
  README.md                       # Pages URL, install, public spoilers
  docs/superpowers/specs/
    2026-07-23-mobile-pwa-github-pages-design.md
  exodus-the-archimedes-engine/
    assets/css/wiki.css           # + mobile polish
    assets/js/search.js           # menu/search tweaks if needed
    …pages unchanged in content model…
```

### Explicit non-goals (v1)

- Service worker / offline caching of the full wiki
- Separate installable icons per book wiki
- Native App Store app
- Push notifications
- Redesign of content model, search index schema, or article prose
- SPA / frontend framework migration

---

## 3. Install shell (hub only)

### Web app manifest (`manifest.webmanifest`)

| Field | Value |
|-------|--------|
| `name` | `Book Wikis` |
| `short_name` | `Book Wikis` |
| `start_url` | `./` or `./index.html` (relative to manifest URL) |
| `scope` | `./` |
| `display` | `standalone` |
| `theme_color` | Hub dark accent surface, e.g. `#0f1419` |
| `background_color` | e.g. `#1a2332` (matches hub surface) |
| `icons` | At least **192×192** and **512×512** PNG under `assets/icons/` |

Icons: simple, readable “books / wiki” mark on a solid background suitable for iOS home screen (no reliance on transparency-only artwork).

### Hub document head (`index.html`)

- `link rel="manifest"` → `manifest.webmanifest` (relative)
- `meta name="theme-color"` matching manifest theme
- `meta name="apple-mobile-web-app-capable" content="yes"`
- `meta name="apple-mobile-web-app-title" content="Book Wikis"`
- `link rel="apple-touch-icon"` → suitable PNG (e.g. 180×180 or 192)

### Book wiki pages

- **No** separate manifest for Exodus in v1.
- Optional: `theme-color` only if it improves chrome when browsing wiki pages inside the installed app; not required for success.

### iOS behavior note

iOS primarily uses **Add to Home Screen** (Safari share sheet). Chrome-style install banners are out of scope. Manifest + apple-touch-icon + capable meta is sufficient for an app-like home-screen entry.

---

## 4. Mobile polish

### Hub (`hub.css`, small HTML only if required)

- Respect **safe-area** insets (`env(safe-area-inset-*)`) for notched devices.
- Card grid: single column on narrow viewports; no horizontal page overflow.
- Primary CTA and links: comfortable tap targets (about **44×44px** minimum where practical).
- Header compact; base font remains readable (~16px).
- Footer and lead text remain legible on small screens.

### Exodus wiki (`wiki.css` + `search.js` as needed)

**Already present:** viewport meta; menu toggle at ≤720px; sidebar hide/`is-open`; infobox stacks at ≤960px; `wireMenu()` in `search.js`.

**v1 improvements:**

| Area | Change |
|------|--------|
| Header | Stack/wrap cleanly: menu + title + search; search full-width on narrow screens |
| Sidebar | When open: full-width or overlay drawer above content; easy dismiss; optional dimmed backdrop |
| Touch | Larger nav row hit targets; clear menu control |
| Article | No unintended horizontal overflow; wide tables/pre scroll inside container if needed; comfortable padding |
| Search dropdown | Constrained to viewport width; does not spill off-screen |
| Safe areas | Header and main content respect notch / home indicator |

**Implementation preference:** CSS-first. Extend `wireMenu()` only if backdrop/body scroll-lock needs a class toggle.

### Out of polish scope (v1)

- Bottom tab bar / complete mobile chrome redesign
- Gesture-only navigation
- Changing wiki information architecture

---

## 5. Documentation and operations

### Repository and Pages

1. Set repository visibility to **public**.
2. Enable GitHub Pages: branch `main`, folder `/` (root).
3. Confirm site URL: `https://mortenbrudvik.github.io/my-books/`.
4. Push `main` so Pages builds include hub, manifest, icons, and CSS.

### README updates (`README.md`)

Document:

1. Public site URL.
2. iOS: Safari → Share → **Add to Home Screen**.
3. That the site is **public** and wikis contain **full spoilers**.
4. Local `python -m http.server` remains valid for desktop development (install/manifest best tested on HTTPS/Pages).

---

## 6. Error handling and edge cases

| Case | Behavior |
|------|----------|
| `file://` open | Layout polish still applies; install/manifest may be incomplete without HTTPS |
| Project base path `/my-books/` | Relative links + relative manifest `start_url`/`scope` keep the site working |
| Deep Exodus article in standalone | Multi-page navigation + browser history; hub back-link still works |
| Missing icon/manifest | Degraded install experience; treat 404 assets as deploy bugs |
| Public spoilers | By design; warned in README |

---

## 7. Verification

1. **Desktop wide:** Hub and Exodus layouts still correct.
2. **Narrow (~390×844):** Hub cards; Exodus menu, search, article; no full-page horizontal scroll (except intentional table scroll).
3. **Pages deploy:** Hub loads; open Exodus card; **All book wikis** returns to hub.
4. **iPhone Safari:** Add to Home Screen → icon → opens hub standalone.
5. **Assets:** Manifest and icons return HTTP 200 under the Pages path.
6. **Search:** Dropdown usable on narrow width.

Manual verification is sufficient; no automated e2e suite required for v1.

---

## 8. Implementation units

| Unit | Responsibility | Depends on |
|------|----------------|------------|
| `assets/icons/*` | App icons (192, 512, apple-touch) | — |
| `manifest.webmanifest` | Install metadata | Icons |
| Hub `index.html` head | Link manifest + Apple meta | Manifest, icons |
| `assets/css/hub.css` | Hub mobile polish | — |
| `exodus-…/assets/css/wiki.css` | Wiki mobile polish | — |
| `exodus-…/assets/js/search.js` | Menu/backdrop behavior if CSS alone is insufficient | wiki.css classes |
| Repo public + Pages | Live HTTPS | Push of assets |
| `README.md` | URL, install steps, spoiler public warning | Pages URL |

Each unit has one clear purpose. Article body content and search index data are unchanged.
