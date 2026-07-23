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
