# Illustration review — 74 illustrations against the book, 45 signed off

**Reviewed:** 25–26 July 2026 · every image opened and judged by eye · **74 of 74 briefed**

`check-images.mjs` proves a file exists and is non-blank. It cannot read what is drawn or written
inside a JPEG, so this sweep is the only thing standing between an invented fact and the live site.

> **Fourth pass (25–26 July 2026) — twelve portraits FAIL and sixteen more are QUERY.**
> Every earlier pass judged the art against *the briefs*. The briefs turned out to be vaguer than
> the novel: most character appearance cues were derived from role and clade grammar, not from any
> description in the book. Re-reading the authorized publisher excerpt recovered real descriptions,
> and twelve shipped portraits contradict them.
>
> One defect is **systemic, not per-image**: the novel's bloodstone is turquoise and gold, and every
> Celestial portrait opened so far renders it as **red or crimson gemstone** — five for five on the
> first sample, seven for seven once Carolien-Amaia and Valdier were checked. The sixteen Celestial
> portraits not yet individually recounted come from the same generator and the same brief wording,
> so they are **QUERY, not PASS**. See
> [Fourth pass](#fourth-pass--art-checked-against-recovered-book-text).

Three cohorts of subjects, reviewed separately; a fourth pass then re-checked the first cohort's
portraits against recovered book text:

| Pass | Subjects | Result |
|---|---|---|
| **First** — characters and ships | 46 | 37 pass · 3 query · 6 fail → **all 46 pass** after regeneration |
| **Second** — places, technology, factions | 13 | 12 pass · 1 query · 0 fail → **all 13 pass** after Heresy regen |
| **Third** — remaining entity pages | 15 | 14 pass · 0 query · 1 fail → eye-pass completed 26 July 2026; `ratarajan-dominion` ships a card-mount border |

The second pass is written up under [Second pass](#second-pass--places-technology-and-factions);
everything below it concerns the first. Third-pass slugs are listed under [Third pass](#third-pass--remaining-entity-pages).

| Verdict | Count | Meaning |
|---|---:|---|
| **PASS** | 45 | First, second and third pass after regen, less everything the fourth pass re-opened |
| **QUERY** | 16 | Bloodstone recolour shipped 26 July 2026 (turquoise/gold); still need individual eye-pass after recolour |
| **FAIL** | 13 | **Art regenerated 26 July 2026** against book text — see regeneration log; re-eye-pass before restoring PASS tallies |

45 + 16 + 13 = 74. The fourth pass is the reason the signed-off count fell from 67; nothing regressed
in the art, the standard it is measured against changed from the briefs to the book. Replacement
files for all 13 FAIL subjects, the 16 QUERY Celestials, and `factions/celestials.jpg` are on disk
as of 26 July 2026.

Historical first-pass tally (before regen): 37 pass · 3 query · 6 fail. Detail of that pass is kept below for process lessons; **shipped files are the regenerations** listed under [Regeneration log](#regeneration-log).

> **Judge families together, not image by image.** The first pass reviewed each portrait in
> isolation and passed the Jalgori-Tobu siblings individually. Side by side they contradict the
> wiki outright — see failure 6.

---

## Fourth pass — art checked against recovered book text

**Reviewed 25–26 July 2026 · 13 portraits opened · 12 fail · 1 pass · 16 more left QUERY.**

> **Correction to this section's own first draft.** It originally read "8 subjects · 6 fail · 2 pass"
> and marked `makaio` PASS. That was written from the *brief* rather than from the image — the
> Makaio portrait had not been opened. When it was, it failed. Five further portraits with recovered
> descriptions had also never been eye-checked. The lesson of this pass applied to the pass itself.

The three earlier passes asked "does the image match the brief?" This one asks "does the brief match
the book?" — and for characters the answer was mostly no. The briefs' `cues` were built from each
subject's *role* plus the clade grammar table, so a portrait could pass every check while
contradicting a sentence printed in the novel.

Source for all of it is the **authorized Penguin Random House excerpt**
(`https://sites.prh.com/exodusexcerpt`), which is the book's own opening text, plus page-numbered
snippets from the publisher preview. Quotations are recorded in the `sources` field of each brief.

### FAIL — `dejean`: wrong sex

The novel's captain of the *Diligent* is a woman — "Dejean placed **her** hand on a panel… 'Palm ID
lock,' **she** told him"; "seeing **her** with gray hair and a face that was noticeably haggard";
"You've made me **one happy old lady**." The brief asked for a "weathered middle-aged man", the
portrait delivers one, and `dejean.html` used *he/his* in two places. Brief and page are corrected;
**the portrait must be regenerated.**

This is the same class of defect as the Sahdiah pronoun error, and it survived three review passes
because nothing in the pipeline ever checked a character's sex against the text.

### FAIL — `olomo`: two eyes, should be four

"Olomo's **four eyes** blinked simultaneously" — stated twice. The portrait has two. The first pass
caught this figure shipping with six then five arms and stopped once the arm count was right;
nobody counted eyes, because the brief never mentioned them.

Three further mismatches from the same paragraph, none previously recorded anywhere:

- Skull should be **"extended cones that came out level with his shoulders"**. The portrait has a
  single smooth swept-back dome.
- Skin should be **"almost reptilian… mistaken for an exoskeleton shaded with subtle hues of blue
  and green"**. The portrait is smooth grey-blue with no green and no reptilian texture.
- **The arm pairs differ.** Upper hands have "four fingers and a thumb… elongated fingers had three
  joints apiece"; the lower arms "dangled out of the robe like inflexible ropes with bulbous elbows,
  and their hands were a simple **triple claw**". The portrait draws four similar arms.

### FAIL — `josias-aponi`: no beard, wrong eyes, burned-in text

"He had **the thickest beard Finn had ever seen**" and "**The gray-blue eyes** that stared down at
him were the most judgmental he'd ever known." The portrait is clean-shaven with dark brown eyes —
it contradicts the only two physical facts the novel gives him.

It also carries **burned-in text**, which the earlier passes were supposed to have eliminated:
graffiti reading `FREE…` / `HOL…` on the wall behind him, and `AR..7 LIBE_ATION` stencilled on his
shirt pocket. Plus an invented sunburst emblem on the collar and breast. Invented slogans on a
liberation politician are exactly the kind of fabricated canon the no-text rule exists to prevent.

### FAIL — `stethos-thierry`: contradicts its own wiki page

The novel gives him "**scarlet-and-gray robes** flared out into a collar that almost touched the
**bloodstone petals** that embellished his skull", covering "the permanent connection bulb melded
with the neural interface patch at the top of his spine", at "**two and a half meters tall**".

`stethos-thierry.html` already records all of this correctly. The portrait shows **dark grey-black
robes with a flat collar** and renders the interface as **metal implants and fibre-optic cable** —
no scarlet, no bloodstone. The image and the page it sits on disagree, on the live site.

### FAIL — `helena-chione`: wrong eyes, wrong bloodstone

"Other than sharing the same **intense green eyes**…" — the daughters' one inherited feature, so it
is hers. The portrait has pale blue-grey eyes. Her bloodstone is "**modest gold-and-turquoise**";
the portrait covers her in an elaborate spray of **crimson and magenta** crystal. Both the colour
and the word *modest* are wrong.

### FAIL — `eleanor-aponi`: burned-in text (re-opened)

Dark hair is correct — "a fringe of **dark hair** spilling out from the hood" — which also retires
the brief's old inference flag claiming her hair colour was unspecified. Her face reads square
rather than the stated **heart-shaped**, which is arguable.

Not arguable: the bulkhead behind her carries a stencilled **`C.O…`**. The first pass logged a
"uniform name tape" on this image under QUERY and the regeneration did not clear lettering from the
background.

### FAIL — `makaio`: bloodstone drawn as shoulder jewellery

The novel's bloodstone is not jewellery. Over eighteen months it grows "to cover most of his skull
and cheeks, leaving only his mouth, nose, and eyes unencumbered", throws out "a crown of **scalloped
horns**… curling around each other… with faint hues of **turquoise and gold**", brocades the body
"beneath the formal toga" in a lacework, and **"prevented any significant facial expression"**.

The portrait gives him a completely bare face, a mobile expressive one at that, a tailored coat
rather than a toga, and puts the bloodstone entirely in **two crimson crystal epaulettes**. It is
the one reading the text rules out: decorative, removable, and on the shoulders. A late-stage Yalbo
should look entombed and rigid.

Read instead as the grown **Faraji** host it still fails — that host is "an easy two and a half
meters high, with a **flattish face and wide, gold-tinged eyes**", and the portrait's face is narrow
with dark eyes.

### FAIL — `lord-gahiji`: the portrait inverts his defining trait

He is the courtier who **cannot be bothered with court dress**: "gray-and-silver robes of state
hanging like badly fitting curtains", and a bloodstone headdress spur "little more than **a cap of
black and green curlicues**" over his spine patch, because "her chief archon had always paid minimal
observance to court decorum".

The portrait makes him the most opulently dressed figure in the character set — immaculately
tailored pale blue-lilac robes, lilac and aqua gemstones set across every panel, silver chains, and
**no headdress at all**. Wrong colour, wrong fit, missing the one ornament he does wear, and it
reverses the characterisation the description exists to carry. It also invents an **eye emblem** on
the pendant, a symbol that appears nowhere in the wiki.

### FAIL — `elsbeth-mcquillan`: organic eyes, and text on the uniform

Her one fixed feature is that her eyes are **"light gray cymech spheres"** — replaced, blank, and
specifically unreadable, which is the point: Ellie cannot tell where she is looking. The portrait
gives her ordinary hazel eyes with a warm, readable expression.

It also carries the heaviest **burned-in text** of any image on the site: a shoulder patch reading
`HELL WELCO… CARE…UL DRIVERS`, `McQ` stencilled on the chest plate, tally marks, and lettering on
the headset. The tank's name is canon; rendering it as legible embroidery is not, and the no-text
rule exists precisely so the art cannot assert typography the book never describes.

### FAIL — `thyra`: braids right, bloodstone wrong

The braiding is correct and worth keeping — congregant hair is bound up and dressed, matching the
recovered "hair was artfully arranged in braids" and the tresses bound around bloodstone spurs.

But the crown and collar are **crimson crystal**, and her line's bloodstone is turquoise and gold.
Her eyes are pale blue where Helena's daughters "shar[e] the same intense green eyes" — that one is
a QUERY rather than a FAIL, since the green is stated for the daughters at the Coronation and not
for Thyra by name.

### FAIL — `carolien-amaia` and `valdier`: sampled, and both red

Opened only to test whether the bloodstone-colour defect was systemic. Both wear large **red and
crimson crystal** mantles. Carolien-Amaia's cloak is clasped with an invented **serpent** motif;
Valdier's collar plates carry small glyph-like markings that read as lettering.

### PASS — `sahdiah`

**Five eyes, counted: five.** One at the centre of the brow and two on each side. Given that Olomo
shipped with the wrong eye count and nobody noticed for three passes, this one was worth recounting,
and it holds. No Crown two-eyed face, no Heresy extra arms, clade-correct.

*Observation, not a defect:* the shoulder plates and robe carry engraved glyph-like marks, and two
pendants are recognisable **anchors**. The glyphs read as alien ornament rather than legible text,
so they clear the no-text rule, but an Earth maritime anchor on a Talloch-Te trader is an odd
import. Worth a look on any future regen.

### The systemic one — bloodstone is red across the whole clade

Every Celestial portrait opened in this pass renders bloodstone as **red or crimson faceted
gemstone**: `helena-chione`, `makaio`, `thyra`, `carolien-amaia`, `valdier`, and — in lilac and aqua
rather than red, but equally wrong — `lord-gahiji`. Seven for seven.

The novel never once makes it red. It is "a calcium-like biotech" in "faint hues of **turquoise and
gold**"; a queen wears "modest **gold-and-turquoise** bloodstone ornamentations"; an under-dressed
archon wears "a cap of **black and green** curlicues". The real-world mineral called bloodstone is
green flecked with red, and the generator appears to have followed the mineral instead of the text.

Consequence for the tally: the **sixteen** Imperial Celestial portraits not individually opened here
share the generator and the same brief wording, so they are recorded as **QUERY**, not PASS. That is
a prediction, not a verdict — each still needs opening — but on a 7/7 sample it is the honest
default. They are `clavissa`, `luus`, `inessa-pierina`, `ramona-ursule`, `zuberi-dulcina`, `bekket`,
`lord-jolav`, `siskala`, `neusch`, `asahi-iryna`, `avone-valerio`, `acelynn`, `radwarno`, `dagon`,
`malquilvo`, `uulana`.

Fixing this is a one-line change to every Celestial brief's prompt, not a per-image judgement call.

### What this pass says about the process

- **A brief that was never checked against the book is not evidence.** Three review passes
  validated the images against briefs that nobody had validated against the novel. "Cues
  grounded in wiki article + clade grammar" appeared in the `inference` field of most characters and
  meant, in practice, *derived from their job title*.
- **Count what the text counts.** Arms were counted because the brief said FOUR ARMS in capitals.
  Eyes were not, because the brief was silent. Anything numbered in the novel belongs in the prompt
  as a number.
- **Bloodstone is turquoise and gold.** The real-world mineral is green flecked with red, and the
  generator followed the mineral. Every Celestial portrait opened has red crystal — 7 for 7.
- **Burned-in text is not fixed.** Three of the thirteen images in this pass carry lettering, on a
  site whose own review doc calls that a blocking defect.
- **A verdict written from the brief is not a verdict.** This section's first draft passed `makaio`
  without opening `makaio.jpg`, in a pass whose entire subject was the gap between briefs and
  reality. If an image has not been opened, its row is QUERY, never PASS.
- **Sample before you tally.** The bloodstone error was first written up as six unlucky portraits.
  Opening two more Celestials at random made it 7/7 and turned a list of incidents into one
  generator-level defect with a one-line fix. Check whether a defect is per-image before counting it
  per-image.

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

### Eye-pass completed — 26 July 2026 · 14 pass · 1 fail

Every one of the fifteen opened and judged against the article it illustrates, the clade grammar in
[README.md](README.md), and its own generation prompt. No burned-in text, captions, hull names, map
labels, gauge numbers or slogans in any of the fifteen — the negative prompts held everywhere except
the border noted below. No real-world logos or brand marks. No clade contradictions: the only plates
showing figures close enough to read are `uranics` (fully human client aristocrats, correct),
`changelings` (Gath-like labour, correct) and `human-liberation` (baseline humans, correct); no
Celestial is close enough to test the bloodstone palette or a limb count.

**FAIL — `ratarajan-dominion`.** The plate is matted inside a cream parchment border with a notched
tab at the top left, so it reads as a mounted card rather than a full-bleed encyclopedia plate. The
third-pass spot-check recorded this as "faint parchment border — not lettering", which is true and
beside the point: its own prompt ends "no UI chrome", and a decorative mount is chrome. It is also
the only plate in all 74 that is not full-bleed, and the empty tab sits exactly where a caption
label would go. Regenerate; nothing else about the plate is wrong.

**Cross-checks the third pass asked for, both clear:**

- *Elohim vs Archimedes Engine / Dolod.* Distinct and consistent. The Engine plate is a rust-dark
  gas giant wrapped in heavy ring structures with orange-violet conduits; Elohim is a slim gold
  lattice and firing engines around a green-blue terraformed world. That matches the article's split
  — Elohim are the Dawn Era engineers who moved worlds into life bands, and Dolod is one body whose
  Engine still works millennia later. No reader would confuse the two plates.
- *Talloch-Te vs Travelers.* Distinct. Travelers are scrappy — patched sails, mixed salvage hulls,
  EVA crews in orange around a ring gate. Talloch-Te is refined industry — gold geodesic scaffolds
  and pale ovoid hulls in an ordered fabrication yard. The peer-power / deniable-operator split
  reads correctly at a glance.

**Observations kept, none blocking:**

- `crown-dominion-systems` renders some crystalline fleet markers warm pink rather than the
  "pearlescent and indigo" the brief asks for. They are abstract fleet markers, not bloodstone, so
  this is not the red-bloodstone defect — but keep them cool if it is ever regenerated, because a
  Crown plate full of pink crystal invites exactly that misreading.
- `neural-interface` places the pad and patch at ear and neck. Correct for the Uranic subject shown,
  and the article fixes no location; note only that the palm induction pad and spine-top connection
  patch in the clade table are *Imperial Celestial* anatomy and would look different.
- `entropy-drive` reads as a heavy-industry foundry with human crews rather than a starship bay.
  Defensible — the article frames entropy drives as tradeable, salvageable hardware — but it is the
  warmest, grubbiest plate in the set against a cool-neutral site direction.
- `gomatu-dominion` and `boksrock` both put face-on spiral galaxies in the near sky. A space-art
  convention, not a book contradiction, though it sits oddly with the franchise's no-FTL hard-SF
  framing.
- `human-liberation` shows only the clandestine-rally facet of what the article calls a "movement
  ecology" that also includes legalist parties. A partial view, not a wrong one.

Structural gates (`check-images`, infobox markup, SEO `og:image`) are green for all 74.

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

**2026-07-26 (fourth-pass regen).** Regenerated all 13 open FAILs against recovered book text, then
recoloured bloodstone on the 16 QUERY Imperial Celestials (plus `factions/celestials.jpg`) from red
to **turquoise and gold**.

| Slug | Regen check |
|---|---|
| `dejean` | Woman captain, grey hair, haggard; blank name tapes |
| `olomo` | Four eyes, shoulder-level skull cones, blue-green reptilian skin, four arms |
| `josias-aponi` | Thick full beard, grey-blue eyes; no graffiti/slogans |
| `stethos-thierry` | Scarlet-and-grey robes, turquoise-gold bloodstone petals, spine connection bulb |
| `helena-chione` | Intense green eyes; gold-and-turquoise bloodstone (not crimson) |
| `eleanor-aponi` | Dark fringe, plain bulkhead; no stencil lettering |
| `makaio` | Late-stage skull/cheek bloodstone + scalloped horns in turquoise/gold; toga; rigid face |
| `lord-gahiji` | Ill-fitting grey-silver robes; black-and-green bloodstone cap |
| `elsbeth-mcquillan` | Light-grey cymech sphere eyes; no uniform lettering |
| `thyra` | Braids kept; turquoise-gold bloodstone; green eyes |
| `carolien-amaia` | Turquoise-gold bloodstone; no serpent clasp |
| `valdier` | Turquoise-gold collar; caption bar removed |
| `ratarajan-dominion` | Full-bleed plate; parchment card-mount gone |
| QUERY 16 + `celestials` | Bloodstone recolour pass only (composition retained) |

Fourth-pass FAIL and QUERY tallies should be re-eye-checked before claiming PASS on every row;
structural gates are green.

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
