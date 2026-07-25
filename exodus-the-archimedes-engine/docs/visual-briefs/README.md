# Visual briefs — research-grounded wiki illustrations

Maintainer-only notes for original encyclopedia illustrations. **Not** reader-facing article prose.

## Art direction (site-wide)

- **Medium:** Highly detailed digital sci-fi illustration (cinematic portrait or vehicle plate), not cartoon, not icon, not photobash collage.
- **Characters:** Upper-body / ¾ portrait, subject-centred, shallow depth of field, soft architectural or starfield backdrop; 3:4 feel.
- **Ships:** Exterior hull plate, three-quarter view, readable silhouette, space or drydock lighting; 16:9 feel.
- **Unity:** Cool-neutral palette with warm skin/hull accents; encyclopedia seriousness (no comic speech, no UI chrome, no watermark text).
- **Originality:** Guided by novel + wiki research only. Do not reproduce official EXODUS marketing art.

## Clade visual grammar (from wiki canon)

| Clade | Body plan / cues | Dress / tech |
|---|---|---|
| **Imperial Celestial** | Tall elegant humanoids (queens up to ~3 m; elongated proportions); post-human beauty; athanasia culture | Court robes, bloodstone jewellery/growths that eventually entomb a host; neural mindline status; livestone architecture hints |
| **Heresy Celestial** | ~3 m spindly **hexapods** — two legs, four arms, expanded skulls, cooler body temperature | Alien-refined robes/armour for multi-limb anatomy; research/archon severity |
| **Talloch-Te archon** | Still Celestial (not baseline); trader-dominion status more than a unique body-plan claim in the novel | Merchant-archon finery; deniable-ops cool rather than Crown court pomp |
| **Uranic** | Fully human appearance; intermediate status; neural interface ports subtle at temples/neck | Client aristocracy — Gondiar estate / ministerial dress, elegant but subordinate to Celestial scale |
| **Baseline / Diligent** | Late-arkship humans; Earth-exodus memory culture | Shipboard uniforms, practical field kit, settler politics |
| **Traveler / mercenary** | Baseline or mixed human | Worn ship gear, salvage harnesses, deniable commercial dress |

## Ship classes

| Hull | Class read |
|---|---|
| *Diligent* | Massive late-human **generation arkship** — city-scale modules, colony decks, utilitarian megastructure |
| *Arcadia’s Moon* | Mid-size **Traveler charter** hull — modular, deniable, working freighter-explorer |
| *Alumata* | Sleek Crown **archon ship** — elegant, intelligence yacht, smaller than Heresy capital hulls |
| *Cybele’s Eagle* | Compact **deniable passenger** transport — civilian lines, not navy |
| *Lestari* | Enfoe **commercial** starship — dynasty freighter, Traveler-adjacent commerce |
| *Polkadav* | Mid **transport / rendezvous** hull — Jalgori-Tobu family evacuation to the *Diligent* |
| *Aeacus* | Compact Crown **household Celestial** hull — lent by Neusch to Terence |

## Coverage list

See individual `*.md` briefs in this folder. Filenames match page slugs.

## Review

`check-images.mjs` cannot see inside a JPEG, so delivered assets are checked by eye. All 46 were
reviewed on 25 July 2026 — results in [IMAGE-REVIEW.md](IMAGE-REVIEW.md): 37 pass, 3 query, 6 fail.

**`inference[]` in `write-visual-briefs.mjs` is documentation — only `prompt` reaches the
generator.** Anything that must hold in the delivered image goes in the prompt string. Family
resemblance is the case that already failed this way: Finn, his twin Otylia and his sister Zelinda
shipped as three unrelated ancestries even though the briefs recorded the requirement.

Every canon-breaking defect found was **text burned into the image**. Caption bars invented houses,
ranks and dates (`House Veyl`, `3rd Scion`, `2784.4`, `c. 478 Post-Collapse`) that appear nowhere in
the wiki, and one portrait carries a real-world brand logo. The "no text, no watermark" line above
did not prevent any of it, so widen the negative prompt when regenerating: **no caption, no name
plate, no lettering, no logos, no brand marks, no insignia text**. Check the top of the frame as
well as the bottom.

## Image paths

- Characters → `assets/images/characters/<slug>.jpg` (portrait 3:4)
- Ships → `assets/images/ships/<slug>.jpg` (wide 16:9)
- Places → `assets/images/locations/<slug>.jpg` (wide 16:9)
- Technology → `assets/images/technology/<slug>.jpg` (wide 16:9)
- Factions → `assets/images/factions/<slug>.jpg` (wide 16:9)

Second-pass illustrated extras (not full category coverage): Gondiar, Kelowan, Dolod, Anoosha, Hafnir; Archimedes Engine, ZPZ, livestone, mindline; Celestials, Heresy Dominion, Travelers, Crown Dominion.
