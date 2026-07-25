# Exodus wiki — content review (verified)

**Reviewed:** 25 July 2026
**Scope:** editorial / coverage review of the *Exodus: The Archimedes Engine* wiki
**Status:** this began as an external LLM pass; every claim below was then re-checked against the
committed repo. Findings that failed verification are recorded in **Corrections**, not deleted —
the pattern behind them is the useful part.

This is a **maintainer reference**, not reader-facing copy. Reader-facing provenance stays on
`pages/sources.html`.

---

## Snapshot (measured)

| Area | Pages | Avg words in `<main>` |
|------|------:|----------------------:|
| Characters | 41 | 347 — **generated 143 / hand 506** |
| Factions | 15 | 479 — **generated 239 / hand 689** |
| Locations | 17 | 375 |
| Technology | 7 | 418 |
| Narrative (book / plot / chapters / timeline / sources) | 5 | 1,227 |
| **Total** | **87** | index entries: 87 |

Deepest: chapters 2,211 · sources 1,503 · plot 1,112 · crown-dominion 1,009 · celestials 947 ·
gyvoy-enfoe 939. Thinnest: avone-valerio 100 · valdier 102 · stethos-thierry 104 · malquilvo 105.

All checks pass: `check-wiki` 87 pages / 87 index entries / 8 advisory warnings;
`check-search-rank` 87 entries / 34 assertions; `check-images` 44 subjects.

---

## What held up

- **The narrative spine is the strongest part of the wiki.** Plot, chapters, timeline, book and
  sources do the work a reader actually comes for, and `sources.html` keeps provenance off the
  in-universe pages as the conventions require.
- **A real depth gradient exists** between hand-authored and generated pages — 143 vs 506 words for
  characters, 239 vs 689 for factions. This is a genuine measured fact. Whether it is a *defect* is
  a separate question; see Corrections.
- **Rosters absorb the long tail correctly.** The Celestials and Dominions rosters carry the
  named-in-passing figures, and the explicit "without dedicated articles" lists make the scoping
  deliberate rather than accidental.
- **Seven search terms genuinely dead-ended.** Verified by running the real `scoreEntry` from
  `search.js` against the committed index. Fixed — see Actioned.

---

## Corrections — claims that did not survive verification

All three failures share one root cause: **inferring search behaviour from whether a dedicated page
exists, instead of running the index.** "No index entry" was asserted where the truth was "no page,
but a working keyword."

| Claim | Reality |
|---|---|
| "Zetian Palace — no index entry" | `zetian` was already a keyword on **Gondiar**, scoring 150 |
| "Camurdy Mountains — no index entry" | `camurdy` was already a keyword on **Anoosha** *and* **Livestone** |
| "Iuntin-Detlef is a real *search will fail* hole" | `iuntin-detlef` was already an **exact keyword on two pages** (Bekket, Uulana), scoring 150 |
| "rekaul … needs an index keyword" | already a keyword on **four** entries |
| "anchor ships / saberstone have no home" | already keywords on **Boksrock** / **Elsbeth McQuillan** |
| "Malquilvo, Radwarno, Acelynn have ~3–5 inbound links" | actually **2, 2, 3** — understated |

**The stub-notice finding was misdiagnosed.** The claim was that the badge is "inverted": Boksrock
carries the only stub notice at 295 words while ~20 shorter pages carry none. The premise is that
stub-ness tracks word count. It does not.

- **Boksrock is correctly labelled.** Its notice reads *"records only what the novel's endgame
  establishes about Boksrock itself"* — a scope statement. The novel never describes Boksrock
  independently; it is only ever an endgame instrument. The article is scope-limited and says so.
- **The 8 flagged pages are complete, not stubs.** `avone-valerio.html` at 100 words carries a
  four-field infobox, a lead naming his function, one section giving the concrete incident chain
  (dispatch → strike broadcast → airstrikes → the flight from Zetian Palace), and six See-also
  links. It states everything the novel establishes about a walk-on general. Labelling it a stub
  would imply missing material that does not exist.

The proposed remedy — adding 8+ stub notices via `gen-celestials.mjs` — would have made the wiki
*less* accurate. No change was made. The rule is now written down in CLAUDE.md so the next reviewer
does not re-derive it wrongly.

---

## Actioned

Commit `492bda8` — **12 keywords across 11 index entries**, mirrored into `search-index.js`, with 11
new ranking assertions pinning them.

| Query | Before | After |
|---|---|---|
| `ghost units` | miss (used on 12 pages) | Celestials |
| `kinnox` | miss | Kelowan |
| `helium sea` | miss | Crown Dominion, Book, Kelowan |
| `zetian palace` | miss | Gondiar |
| `camurdy mountains` | miss | Anoosha, Livestone |
| `everett` | miss | Finn Jalgori-Tobu |
| `cherenkov blade` | 10 (summary only) | Marcellu 160, Liliana 150 |

The defect was **not** missing pages — it was missing *longest-form* keywords, the rule CLAUDE.md
already states. The index honours that rule in 23 of 27 probed multi-word proper nouns; these were
the exceptions. Long forms were added *alongside* the existing heads so both the one-word and the
full query keep an exact match, and the heads are pinned too, so a future tidy-up that swaps short
for long fails the check instead of silently downgrading them.

`russodan` and `bersch` remain unindexed deliberately — 2 and 1 page mentions, below the threshold
where a keyword earns its place.

---

## Open, unactioned

Judgement calls, not defects. None is blocking.

1. **Peripheral tech as concepts.** `ghost units` and `cherenkov blade` now resolve, but neither has
   a home article. A single "weapons and coercion tech" page could gather them. Weigh against the
   DRY rule — they are already explained where they occur.
2. **Ratarajan (145) and Uthara (147)** are the thinnest Dominions. If the novel gives each a
   concrete scene, one incident apiece would lift them; if it does not, they are complete as-is by
   the same reasoning that cleared the eight Celestials.
3. **Section headings are plot-beat oriented** (`Gondiar occupation`, `Capture order and miss`)
   rather than uniform encyclopedia labels. Readable and arguably better; noted only because it is
   inconsistent across the cast.

Explicitly **not** recommended: dedicated Santa Rosa / Zetian Palace articles, an Iuntin-Detlef
page, or longer index summaries. The first two invent canon to solve a search problem now solved by
keywords; the third misreads index summaries, which are result snippets, not ledes — Finn's and
Gyvoy's are 11 and 13 words.

---

## Method

Word counts are the `<main>` body with tags stripped. The generated set is the 25 files named in
`scripts/gen-celestials.mjs` and `scripts/gen-dominions.mjs`. Search claims were checked by
executing `search.js`'s own `fold()` and `scoreEntry()` against `assets/data/search-index.json` —
not by reading prose or assuming page existence. Every proper noun added to the index was confirmed
to appear in the committed prose first.
