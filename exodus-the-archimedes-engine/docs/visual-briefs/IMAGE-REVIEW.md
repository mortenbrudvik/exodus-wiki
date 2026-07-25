# Illustration review — all 46 images against the book

**Reviewed:** 25 July 2026 · every image opened and judged by eye · **46 of 46 complete**

`check-images.mjs` proves a file exists and is non-blank. It cannot read what is drawn or written
inside a JPEG, so this sweep is the only thing standing between an invented fact and the live site.

| Verdict | Count | Meaning |
|---|---:|---|
| **PASS** | 38 | Consistent with the wiki; safe to keep |
| **QUERY** | 3 | Defensible but worth a decision |
| **FAIL** | 5 | Contradicts the wiki or carries third-party IP — regenerate |

Every textual claim found inside an image was checked against the wiki by grep. Counts below are
page hits across `pages/`.

---

## FAIL — regenerate these five

### 1. `finn-jalgori-tobu` — caption bar inventing rank and date

> *JALGORI-TOBU, Finn — Uranic House Minor, 3rd Scion, Active Field Service 2784.4*

| Claim | Wiki |
|---|---|
| `House Minor` | **0 hits** |
| `Scion` | **0 hits** |
| `Active Field Service` | **0 hits** |
| `2784` | **0 hits** |

His page gives the role as "Protagonist; Minsterialis of Hafnir; Engine operator". The date is the
worst of it: `timeline.html` states outright that "years are approximate… reconstructed from 'N
years ago' dialogue", and this burns a decimal-precise year into the protagonist's portrait.

### 2. `thyra` — caption bar inventing a title and a second, incompatible calendar

> *Thyra as Helena-Thyra, Imperial Celestial Usurper Queen, c. 478 Post-Collapse*

| Claim | Wiki |
|---|---|
| `Usurper Queen` | **0 hits** (the page says "usurped as Helena-Thyra") |
| `Post-Collapse` | **0 hits** (the wiki's era labels are "coronation era", "settlement era") |
| `478` | **0 hits** |

Note this dates the same setting as `2784.4` on Finn. Two images, two invented and mutually
incompatible dating systems.

### 3. `neusch` — caption bar, this one at the **top** of the frame

> *NEUSCH – Imperial Celestial, Heir of House Veyl, Spymaster Archon's Son (Age 23 cycles)*

Partly right, which makes it more dangerous, not less:

| Claim | Wiki |
|---|---|
| `Imperial Celestial` | ✅ correct |
| `Spymaster Archon's Son` | ✅ correct — his page has "Heir of a spymaster line"; Makaio-Faraji is "Archon / spymaster of Queen Helena-Chione" |
| `House Veyl` | ❌ **0 hits** — the wiki says "Wynid archon household" |
| `Age 23 cycles` | ❌ no age given for Neusch; `cycles` appears once in the whole wiki, as a *verb* ("the Imperial Accord cycles the empress role") |

Captions are not confined to the bottom edge — check the top of every frame.

### 4. `otylia-jalgori-tobu` — real-world trademark

Her hair carries the **Chanel interlocking-C logo**, twice: once at the temple, once lower on the
braid. This is a live trademark on a public site, and it is nonsense in-universe. A failure category
the brief never anticipated, so the negative prompt does not exclude it.

### 5. `olomo` — clade contradiction

`heresy-dominion.html`: *"Heresy citizens are close to three metres tall with spindly six-limb
builds (two legs, four arms)."*

The image shows **six arms**, not four — eight limbs against the wiki's six. Everything else is
right (elongated cranium matching "expanded skulls", cool pallor, alien-cut robes), which is why it
reads as convincing at a glance.

---

## QUERY — your call

### `eleanor-aponi` — uniform name tape

Reads `APONI` / `LT | CYCLE 9`. Two of three elements are canon: the surname, and `LT` matches her
page's "Role: Lieutenant". **`CYCLE 9` is invented** — no such designation exists. This is a
diegetic garment patch rather than a caption bar, so it is far milder than the three above, but it
is still a fabricated unit on a public page.

### `marcellu` — garment marking `MARCE-17`

A small chest marking inventing a designation. Same class as `CYCLE 9`, smaller and less legible.

### `asahi-iryna` — emblem resembling third-party IP

The chest and belt emblem is a spoked cog closely recalling the **Star Wars Galactic Empire**
crest. Combined with the "Imperial" styling it reads as borrowed iconography. Not EXODUS marketing
art — which is what the brief actually prohibits — but the same concern as Otylia's logo.

---

## PASS — with observations worth keeping

These are consistent with the wiki. Notes are refinements, not defects.

| Image | Note |
|---|---|
| `helena-chione` | **Exemplary.** Elongated proportions, bloodstone growths spreading over shoulders and wrists — matches "growths that eventually entomb a host" precisely |
| `makaio` | **Exemplary.** The mindline is rendered literally: threads linking him to prior host faces, matching multi-host succession |
| `siskala` | Tiger iconography throughout, matching her page's "Tiger Guard and new life" |
| `liliana` | Carries a glowing purple blade — the cherenkov blade she kills Marcellu with |
| `elsbeth-mcquillan` | Shoulder patch reads *Hell welcomes careful drivers* — **canon**, it is an indexed keyword on her page |
| `andino` | Shoulder patch reads `TRAVELER`, correctly using the faction's American-spelling proper noun |
| `arcadias-moon`, `lestari` | Hull names lettered on the hull; both canon-correct |
| `josias-aponi` | Background graffiti is garbled but reads "FREE"/"LIBERATION", thematically right for a liberation orator |
| `polkadav` | Passengers visible in the windows — apt for the Jalgori-Tobu evacuation hull |
| `cybeles-eagle` | Eagle emblem on the tail; civilian airliner lines, correctly "not navy" |
| `malquilvo` | Weeping blood is an expressive invention, not in the wiki. Reads as grief in a trial setting; no factual claim |
| `radwarno` | Chest emblem is a raised fist — odd iconography for an imperial navy commander |
| `luus` | Reads as an older human woman; the Celestial scale cue is weaker than on Helena or Carolien |
| `gyvoy-enfoe` | Holographic panel with pseudo-glyphs, against the brief's "no UI chrome" |
| `dagon`, `terence-wilson-fletcher` | Heavy neon-noir styling, divergent from the README's "cool-neutral palette, encyclopedia seriousness" |
| `zelinda-jalgori-tobu` | Renaissance-portrait styling rather than "cinematic sci-fi"; canon-clean |

Clean with nothing to add: `acelynn`, `avone-valerio`, `bekket`, `carolien-amaia`, `clavissa`,
`dejean`, `inessa-pierina`, `lord-gahiji`, `lord-jolav`, `medusa`, `ramona-ursule`, `sahdiah`,
`stethos-thierry`, `tose`, `uulana`, `valdier`, `zuberi-dulcina`, `aeacus`, `alumata`,
`arkship-diligent`.

---

## What this sweep says about the process

- **The clade grammar works.** Where the wiki fixes a trait, the images follow it — bloodstone,
  mindline succession, Tiger Guard, Uranic human scale, hull classes. The briefs are doing their job.
- **Text is the failure mode.** Every canon-breaking defect is text burned into pixels. Where the
  generator was left to invent a caption it invented ranks, houses and dates; where the brief named
  a real phrase (*Hell welcomes careful drivers*, `TRAVELER`, hull names) it rendered it correctly.
- **The negative prompt is too narrow.** "No text, no watermark, no UI chrome" did not stop caption
  bars, and nothing addressed real-world logos at all.
- **Partial accuracy is the trap.** Neusch's caption is half right. A reviewer skimming for
  nonsense would pass it.

## Fixing

Regenerate from `docs/visual-briefs/<slug>.md` with a widened negative prompt — add *no caption, no
name plate, no lettering, no logos, no brand marks, no insignia text* — and drop the new file at the
same path. No markup changes needed: `inject-infobox-images.mjs` is idempotent and the `<img>`
already points at the right filename. For `olomo`, the positive prompt also needs "exactly four
arms" stated explicitly. Re-run all three checks afterwards.

Reader-facing provenance is already handled on `pages/sources.html` under "Reconstructed, not
canon"; it does not need updating per image.
