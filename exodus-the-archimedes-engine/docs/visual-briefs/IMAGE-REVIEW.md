# Illustration review — all 59 images against the book

**Reviewed:** 25 July 2026 · every image opened and judged by eye · **74 of 74 briefed**

`check-images.mjs` proves a file exists and is non-blank. It cannot read what is drawn or written
inside a JPEG, so this sweep is the only thing standing between an invented fact and the live site.

Three passes, reviewed separately:

| Pass | Subjects | Result |
|---|---|---|
| **First** — characters and ships | 46 | 37 pass · 3 query · 6 fail → **all 46 pass** after regeneration |
| **Second** — places, technology, factions | 13 | 12 pass · 1 query · 0 fail → **all 13 pass** after Heresy regen |
| **Third** — remaining entity pages | 15 | Generated and wired 25 July 2026 evening; eye-pass required before claiming ship-quality |

The second pass is written up under [Second pass](#second-pass--places-technology-and-factions);
everything below it concerns the first. Third-pass slugs are listed under [Third pass](#third-pass--remaining-entity-pages).

| Verdict | Count | Meaning |
|---|---:|---|
| **PASS** | 59 | First pass 46 after regen; second pass 13 after Heresy regen |
| **THIRD (pending full eye-pass)** | 15 | Files + markup installed; spot-checked for text/clade traps |
| **QUERY** | 0 | Cleared by regen |
| **FAIL** | 0 | Cleared by regen |

Historical first-pass tally (before regen): 37 pass · 3 query · 6 fail. Detail of that pass is kept below for process lessons; **shipped files are the regenerations** listed under [Regeneration log](#regeneration-log).

> **Judge families together, not image by image.** The first pass reviewed each portrait in
> isolation and passed the Jalgori-Tobu siblings individually. Side by side they contradict the
> wiki outright — see failure 6.

---

## Second pass — places, technology and factions

**Reviewed 25 July 2026 · 13 subjects · 12 pass · 1 query · 0 fail → all 13 pass after regen.**

**No burned-in text anywhere. No real-world logos. No clade contradictions.** That is the headline,
because it is exactly what the first pass failed on. `write-extra-visual-briefs.mjs` appends a
`NO_TEXT` clause far stronger than the original art direction — *"absolutely no text of any kind: no
captions, no labels, no lettering, no logos, no brand marks, no map names, no UI chrome, no
watermarks"* — and across 13 images it held. The fix worked.

### QUERY (cleared) — `faction/heresy-dominion`

**Prior defect:** canon-clean hangar plate of a capital warship, but **not the image its brief
asked for**. The brief specifies a vast spindly hexapod Celestial (exactly four arms, two legs)
before a huge research warship; the first delivery buried the only figures as small robed silhouettes
too distant to count limbs. Consequence: the Heresy body plan was illustrated nowhere except
Olomo's portrait.

**Regen (25 July 2026):** re-composed via `image_edit` from the Olomo portrait (body-plan anchor)
plus the prior hangar plate (ship/environment). Foreground hexapod shows **exactly four arms and
two legs**; research warship remains in cool blue dock light behind. No caption bars, logos, or
invented labels. **PASS.**

**Verified by eye, independently of the regen note:** arms counted at four, legs at two, expanded
skull with the blue tracery, cool pallor — all matching `heresy-dominion.html`. Worth counting
rather than trusting a prompt, since Olomo shipped with six arms and then five before landing on
four.

One consequence of chaining, recorded rather than treated as a defect: the faction plate is
*recognisably Olomo* — same figure, same pose, same stylus, card and tablet — composited into the
hangar. Clade-accurate, and defensible since the wiki says the Heresy is *"represented chiefly by
archon Olomo"*. But `factions/heresy-dominion.html` and `characters/olomo.html` now carry
near-identical figures, which reads as a duplicate to anyone visiting both. A wider or differently
posed Heresy figure would separate the clade plate from the character portrait.

### PASS — with observations

| Image | Verdict |
|---|---|
| `location/gondiar` | Fertile client agricultural world: estate farmland, a coastal city, ringed giant overhead |
| `location/kelowan` | Georing and Imperial Palace terraced into mountains, both canon. Composition reads as palace on one body with a ringed world beyond; the wiki puts both at Kelowan |
| `location/dolod` | Iron-exotic gas giant with ancient Engine spars — and consistent with the separate Archimedes Engine plate, which is easy to get wrong across two images |
| `location/anoosha` | Mining world: open-pit scars, industrial haze, the Pana-Seak orbital city. The Camurdy terrain reads as mesa and canyon rather than the mountains Finn crashes into |
| `location/hafnir` | Estates, pale manors and a new settler camp — accurate to Finn's domain taking *Diligent* arrivals. But there is **no science-fictional cue anywhere in frame**; it reads as a present-day farm estate and is stylistically the odd one out |
| `technology/archimedes-engine` | **Strong.** Ancient megastructure girdling a dark gas giant, matching the Dolod plate |
| `technology/zpz-generator` | Compact drive core, nested coils, a human for scale in a service bay |
| `technology/livestone` | Self-shaping silicate mid-reshape into vaulted Celestial corridors — the clearest render of a hard concept |
| `technology/mindline` | **Strong.** Neural transfer between two Celestial silhouettes with prior-host faces in the stream, consistent with Makaio's portrait. Figures are deliberately faceless, which avoids inventing likenesses. Faint script-like marks in the memory threads are illegible and assert nothing |
| `faction/celestials` | Tall elegant figures, bloodstone jewellery, livestone terrace — textbook clade grammar |
| `faction/crown-dominion` | Palace mountain complex, georing, fleet, crystalline house heraldry. **Five** banners are shown; the Crown has **six** royal systems, so if banners read as houses, one is missing |
| `faction/travelers` | Salvage yard, worn freighter hulls, EVA crews mid-repair. The ring **gate** is canon-supported — the wiki has *"multi-decade gate hops"* and Tinaja's *"Gate of Heaven"* — so it is not the FTL-portal contradiction it first looks like |
| `faction/heresy-dominion` | **PASS after regen.** Foreground hexapod (four arms, two legs) establishes the clade; research warship behind. Body plan chained from Olomo |

### What the second pass says

- **The widened negative prompt is doing real work.** Zero text across 13 images, against three
  caption bars in 46 on the first pass.
- **Briefs can be silently ignored.** Heresy passed every automated check and read well on the
  first delivery, yet the generator simply did not draw what was asked. Nothing but a human
  comparing brief to asset catches that — `check-images.mjs` sees a file of the right name and size.
  Cleared by re-gen with an explicit body-plan reference image.
- **Cross-image consistency held** where it mattered: Dolod against the Archimedes Engine,
  Mindline against Makaio, and (after regen) Heresy against Olomo. Worth checking deliberately,
  since the first pass failed exactly there with the Jalgori-Tobu siblings.

---

## Third pass — remaining entity pages

**Generated 25 July 2026 evening · 15 subjects · fills every entity page that previously had an
infobox and no plate.** Briefs live in `write-extra-visual-briefs.mjs`; generator-owned faction
pages take `image:` in `gen-dominions.mjs`. Hubs updated so monograms become real shots where a
file exists (factions hub crosses the card floor at ~81%).

| Slug | Kind | Spot-check notes |
|---|---|---|
| `wynid` | location | Pearlescent royal-seat complex; no text |
| `boksrock` | location | Rocky body under Engine-like beams; no text |
| `centauri-cluster` | location | Dense starfield + habitat rings; no text |
| `crown-dominion-systems` | location | Multi-system vista with capital georing; no map labels |
| `entropy-drive` | technology | Propulsion core in bay; no gauge numbers |
| `neural-interface` | technology | Implant / induction-pad study; no brand marks |
| `uranics` | faction | Client aristocrats + livestone orbs (first draft used Edison bulbs — discarded) |
| `elohim` | faction | Dawn Engine rings around terraforming world; first draft had hull script — cleaned |
| `changelings` | faction | Gath-like labour + beetle transport forms; industrial yard |
| `human-liberation` | faction | Arkship assembly rally; no readable slogans |
| `mara-yama` | faction | Dark space citadel + gas giant fleet |
| `talloch-te-dominion` | faction | Shipyard / habitat cluster fabrication |
| `gomatu-dominion` | faction | Partial Dyson lattice under construction |
| `ratarajan-dominion` | faction | Patrol station near gas giant (faint parchment border — not lettering) |
| `uthara-dominion` | faction | Contested frontier habitats under fleet sky |

**Still needs a full side-by-side eye-pass** like the first two (especially family-free, but
cross-check Elohim vs Archimedes Engine / Dolod consistency, and Talloch-Te vs Travelers). Structural
gates (`check-images`, infobox markup, SEO `og:image`) are green for all 74.

---

## Companion plate — *Infinite Totality* on Arcadia’s Moon

**Generated 25 July 2026 · not a separate entity page.** The *Infinite Totality* is the Lidon-built
shell fuselage that disguises the *Arcadia’s Moon*, so the plate lives as a second infobox image on
`pages/locations/arcadias-moon.html` (`assets/images/ships/infinite-totality.jpg`). Brief:
`docs/visual-briefs/infinite-totality.md`. It is **not** listed in `index.json` as its own subject —
`check-images` would require a standalone page that must not exist.

| Check | Result |
|---|---|
| Form | Cone base flaring into a closed sphere — matches the article and p. 817/book-2 docking shape |
| Material | Pale ultrabonded fibre casing; geo-ring debris as provenance cue |
| Text / logos | **None** |
| Relation | Closed shell only — true hull is the regenerated primary plate (golden geodesic + eight ovoids) |

**Verdict: PASS** as a companion disguise plate. Pair with the primary plate: sphere vs closed cone-sphere shell.

---

## Regeneration log

**2026-07-25 (post-review).** Regenerated all six FAIL and three QUERY subjects with a widened
no-text constraint (*no caption bars, name plates, lettering, logos, brand marks*). Olomo
prompt states *exactly four arms / two legs*. Jalgori-Tobu sisters produced via `image_edit`
chained from the new Finn portrait so ancestry matches.

**2026-07-25 (third pass).** Fifteen new plates for remaining entity pages (see above).

**2026-07-25 (companion).** *Infinite Totality* shell plate on `arcadias-moon.html` — see section above.

**2026-07-25 (Arcadia’s Moon true hull).** Regenerated primary plate: golden geodesic sphere of trusses
enclosing interior ovoids near a ringed giant. Prior freighter plate had burned-in hull lettering and
contradicted p. 241. **PASS** on architecture; no text.

**2026-07-25 (sky-blue ovoids).** Recolour pass to sky-blue ovoids (secondary paraphrase; novel does not
fix colour — article prose still omits it). Smoother capsule elements inside the golden cage; count
reads ~eight under perspective. **PASS** as illustration of the atypical hull.

**2026-07-25 (Sahdiah five eyes).** Regenerated portrait after ch. 31 confirmation: primary biological
body with **exactly five eyes**, elongated non-Crown face, merchant-archon finery, nurture-chamber
context. Prior plate was a two-eyed humanoid and wrong for the clade. Pronouns corrected she/her in
generators. **PASS** — eye count verified by eye.

| Slug | Prior defect | Regen check |
|---|---|---|
| `finn-jalgori-tobu` | Invented caption / date | No caption; East Asian family anchor |
| `thyra` | Invented caption / calendar | No caption; bloodstone queen |
| `neusch` | Top caption, House Veyl, age | No caption |
| `olomo` | Six arms vs four (then five on first regen) | **Re-regen:** exactly four arms + two legs, expanded skull |
| `otylia-jalgori-tobu` | Chanel logos + non-matching twin | Teal coat, East Asian twin of Finn, no logos |
| `zelinda-jalgori-tobu` | Non-matching sister | Burgundy heir dress, same family colouring |
| `eleanor-aponi` | CYCLE 9 name tape | Blank tapes; no rank lettering |
| `marcellu` | MARCE-17 marking | Clean suit, no serial |
| `asahi-iryna` | Empire-like cog emblem | Crystal bloodstone ornament only |
| `heresy-dominion` | Ship hangar only; hexapod clade not shown | Four-arm hexapod foreground + research warship; chained from Olomo |

No HTML path changes; same `assets/images/…/<slug>.jpg` targets.

Every textual claim found inside an image was checked against the wiki by grep. Counts below are
page hits across `pages/`.

---

## FAIL — regenerate these six

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

### 6. `otylia-jalgori-tobu` + `zelinda-jalgori-tobu` — siblings with three different ancestries

Finn's infobox states **"Twin of Otylia"**, and the prose repeats it ("His twin sister Otylia",
"Finn's twin"). Zelinda is his sister and the family heir. The three portraits render:

| Sibling | Relation | As drawn |
|---|---|---|
| `finn-jalgori-tobu` | — | East Asian, straight black hair, warm medium skin |
| `otylia-jalgori-tobu` | **twin** | Fair-skinned, blonde, Northern European features |
| `zelinda-jalgori-tobu` | sister, heir | Dark-haired, olive/Mediterranean features |

Three siblings of the same two parents, drawn as three unrelated ancestries — and the twin is the
furthest from him. This is not an inference gap the novel leaves open: the kinship is stated
canon, and no reading of it produces this.

**Root cause, and it is a process bug rather than a prompting accident.** In
`write-visual-briefs.mjs` each subject carries `prompt` and `inference` as *separate fields*. Only
`prompt` reaches the generator; `inference` is documentation. The constraint existed and was
written down — Otylia's brief says under Physical cues *"Young woman twin to Finn ~25"* and flags
*"Family resemblance to Finn implied — shared features, different affect"* — but it lived entirely
in fields the generator never sees. Her prompt said "twin sister" and nothing about resembling
him. Finn's own flag named "dark hair, medium-warm skin" as the intended default; his prompt said
only "aristocratic features". Three portraits, three independent samplings.

The source even groups them under a `// —— Jalgori-Tobu family ——` comment. The family was known;
the requirement just never crossed into the contract.

**Fixed in the briefs.** All three prompts now state the shared family appearance explicitly, with
Finn's delivered colouring as the anchor so the sisters match him rather than the reverse. The
images still need regenerating. Note Finn must be regenerated anyway for his caption bar, so the
anchor and the two sisters should be produced in the same pass.

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
| `arcadias-moon`, `lestari` | Hull names lettered on the hull; both canon-correct (*Arcadia’s Moon* later regenerated to the geodesic true hull with no lettering — see regeneration log) |
| `josias-aponi` | Background graffiti is garbled but reads "FREE"/"LIBERATION", thematically right for a liberation orator |
| `polkadav` | Passengers visible in the windows — apt for the Jalgori-Tobu evacuation hull |
| `cybeles-eagle` | Eagle emblem on the tail; civilian airliner lines, correctly "not navy" |
| `malquilvo` | Weeping blood is an expressive invention, not in the wiki. Reads as grief in a trial setting; no factual claim |
| `radwarno` | Chest emblem is a raised fist — odd iconography for an imperial navy commander |
| `luus` | Reads as an older human woman; the Celestial scale cue is weaker than on Helena or Carolien |
| `gyvoy-enfoe` | Holographic panel with pseudo-glyphs, against the brief's "no UI chrome" |
| `dagon`, `terence-wilson-fletcher` | Heavy neon-noir styling, divergent from the README's "cool-neutral palette, encyclopedia seriousness" |
| `josias-aponi` / `eleanor-aponi` | Grandfather and granddaughter, and they do not read as related either — he is olive/Mediterranean, she is fair European. Two generations and a "long-lived exodus lineage" make this far weaker than the twin case, so it stays a note rather than a failure. Worth locking if either is regenerated |
| `bekket` / `dagon` | The one family that *works*: Thyra's father and uncle share pale skin, black hair and amber eyes, and Thyra is dark-haired like her father |

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
- **`inference[]` is documentation; `prompt` is the contract.** The sibling failure was written
  down correctly in the brief and still happened, because the note lived in a field the generator
  never reads. Anything that must hold in the image belongs in the prompt string.
- **Per-image review misses per-family defects.** Every sibling portrait passed on its own. Judge
  related characters side by side, and check the stated kinship in each infobox before signing off.

## Fixing

Regenerate from `docs/visual-briefs/<slug>.md` with a widened negative prompt — add *no caption, no
name plate, no lettering, no logos, no brand marks, no insignia text* — and drop the new file at the
same path. No markup changes needed: `inject-infobox-images.mjs` is idempotent and the `<img>`
already points at the right filename. For `olomo`, the positive prompt also needs "exactly four
arms" stated explicitly. Re-run all three checks afterwards.

Reader-facing provenance is already handled on `pages/sources.html` under "Reconstructed, not
canon"; it does not need updating per image.
