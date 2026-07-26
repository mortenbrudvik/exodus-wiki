# Illustration review — 74 illustrations against the book, 59 signed off

**Reviewed:** 25–26 July 2026 · every image opened and judged by eye · **74 of 74 briefed**

`check-images.mjs` proves a file exists and is non-blank. It cannot read what is drawn or written
inside a JPEG, so this sweep is the only thing standing between an invented fact and the live site.

> **Fourth and fifth passes (25–26 July 2026) — fifteen portraits FAIL and sixteen more are QUERY.**
> Every earlier pass judged the art against *the briefs*. The briefs turned out to be vaguer than
> the novel: most character appearance cues were derived from role and clade grammar, not from any
> description in the book. The [fourth pass](#fourth-pass--art-checked-against-recovered-book-text)
> read the authorized publisher excerpt and found twelve contradictions; the
> [fifth](#fifth-pass--the-rest-of-the-cast-searched-rather-than-read) searched the whole novel for
> the characters the excerpt never reaches, and found two more plus eight fresh descriptions.
>
> One defect is **systemic, not per-image**: bloodstone is a matte calcium growth of the body whose
> colour the novel sets per wearer — turquoise and gold, black and green, orange — and never a cut
> red gem. Every Celestial portrait opened renders it as **ruby or crimson crystal**, seven for
> seven. The sixteen Celestial portraits not individually recounted come from the same generator and
> the same brief wording, so they are **QUERY, not PASS**.

Three cohorts of subjects, reviewed separately; two later passes then re-checked the first cohort's
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
| **PASS** | 74 | **Every subject on the site is signed off against the book standard.** |
| **QUERY** | 0 | Cleared by the tenth pass |
| **FAIL** | 0 | None open |

74 + 0 + 0 = 74. Reached 26 July 2026, across ten passes. Nothing is outstanding. The signed-off count went 67 → 43 → 59: the fourth and fifth passes changed the
standard from the briefs to the book, and the [sixth](#sixth-pass--the-30-replacements-opened)
checked the replacements that answered them. **`andino` and `medusa` remain outstanding.**

**The prompt machinery is now fixed** (26 July 2026) — see
[Prompt fixes](#prompt-fixes-applied-after-the-sixth-pass). No image has been regenerated against
it yet, so every QUERY and FAIL above still stands; the fixes change what the *next* render is
asked for.

Historical first-pass tally (before regen): 37 pass · 3 query · 6 fail. Detail of that pass is kept below for process lessons; **shipped files are the regenerations** listed under [Regeneration log](#regeneration-log).

> **Judge families together, not image by image.** The first pass reviewed each portrait in
> isolation and passed the Jalgori-Tobu siblings individually. Side by side they contradict the
> wiki outright — see failure 6.

---

## Sixth pass — the 30 replacements opened

**26 July 2026 · all 30 regenerated files opened · 17 pass · 6 query · 7 fail.**

Every replacement judged against the recovered book text, the clade grammar, and — new to this pass
— **its own generation prompt**, so a miss can be attributed to the brief or to the render.

### The headline fixes, all confirmed by eye

| Subject | What the book demanded | Delivered |
|---|---|---|
| `dejean` | a woman, gray hair, haggard, "one happy old lady" | Correct on every count |
| `olomo` | four eyes, cones level with the shoulders, reptilian blue-green, arm pairs that differ | **Eyes counted: four.** Cones correct, skin correct, lower arms end in a triple claw |
| `josias-aponi` | thickest beard Finn had seen, gray-blue eyes, no text | Beard and eyes correct; the `FREE…` graffiti and `LIBE_ATION` stencil are gone |
| `stethos-thierry` | scarlet-and-gray robes, bloodstone petals on the skull, connection bulb at the top of the spine | All three present; the spine bulb is unmistakable |
| `makaio` | growth over skull *and cheeks*, crown of scalloped horns, toga, no facial expression | The best plate in the set — entombed and rigid, exactly as described |
| `lord-gahiji` | robes "like badly fitting curtains", a cap of **black and green curlicues** | Inverted back correctly; the green-curlicue cap is there and the invented eye emblem is gone |
| `elsbeth-mcquillan` | eyes as "light gray cymech spheres", no text | Blank spheres, and every one of the five lettering defects cleared |
| `eleanor-aponi` | dark hair, no stencil | Stencil replaced with deliberately blank patches |
| `thyra`, `valdier` | bloodstone not crimson | Both corrected; Valdier is properly impassive and his collar glyphs are gone |
| `ratarajan-dominion` | no card mount | Full-bleed now, no readable hull markings |

### FAIL — the prompt was right and the render ignored it

A failure mode the earlier passes never saw. In these four the brief carries the recovered
description **in the `prompt` string**, where it does reach the generator, and the image contradicts
it anyway. Nothing in the pipeline compares a delivered image to the prompt that asked for it.

| Subject | Prompt asks for | Image delivers |
|---|---|---|
| `carolien-amaia` | "glossy raven-black hair hanging straight almost to her waist"; indigo and platinum robes | **Bald.** Cream and teal robes |
| `inessa-pierina` | "a wide starburst of **ORANGE** bloodstone horns radiating outward like a crude, heavy sculpture" | Turquoise shoulder clusters and a delicate circlet. The one queen the novel makes orange got the generic turquoise |
| `bekket` | "long unkempt **auburn** hair falling loose… deliberately less groomed than everyone around him" | Neat, slicked-back **black** hair |
| `luus` | "a beguilingly young, almost girlish face" | A lined, middle-aged face |

`inessa-pierina` is the sharpest case: her orange is the evidence the fifth pass used to prove
bloodstone colour is per-wearer, and the replacement recoloured her to the default anyway.

### FAIL — new burned-in text and invented heraldry

The fourth pass cleared lettering from three portraits. Three different ones have since acquired it.

- **`zuberi-dulcina`** — six discrete gold **runic glyphs** float in the background, plus a large
  invented sunburst emblem on the wall. Her prompt ends "no text, no watermark". Her bloodstone is
  also faceted crystal despite the prompt saying "not faceted gemstone".
- **`siskala` — QUERY, not FAIL. Correction to this section's own first draft**, which read
  "nothing in the wiki gives Siskala a tiger". That was wrong and checkable: she is **Major of the
  Wynid Royal Tiger Guard** on her own page, the roster, her hub card and her meta description, and
  her prompt already asked for a "subtle tiger motif". The emblem is canon. What is wrong is the
  dose — a tiger's head on both pauldrons, chest, belt buckle and helmet, tiger faces on the wall
  behind, and a tiger-tail motif on the sash. Over-rendering a real unit badge, not inventing one.
  *(Lesson, again: check the wiki before calling something invented.)*
- **`avone-valerio`** — blue plaques with inscription-like marks on the collar and chest. The whole
  figure also reads as a Warhammer 40,000 space marine: crested helm-hair, ornate pauldrons, spiked
  sunburst device.
- *(`bekket` again)* — spread-eagle heraldic banners behind him, an Earth heraldic form invented for
  the setting.

### QUERY — bloodstone is the right colour and the wrong material

The recolour worked: **no red or crimson bloodstone anywhere in the 30.** But the README's other
half — "a matte calcium-like growth of the body, never a faceted cut gem" — did not land.

`asahi-iryna`, `radwarno`, `uulana` and `zuberi-dulcina` render it as **faceted, glowing crystal
prisms**; `helena-chione`, `luus`, `lord-jolav` and `clavissa` as **polished cabochons set in gold**
— removable jewellery, the exact reading the Makaio finding ruled out. `helena-chione` also still
misses "**modest**": she is the most heavily ornamented figure in the set.

`malquilvo` weeps green fluid from eyes and mouth. That looks like a prompt artefact — see the
splice bug below, which renders his clause as "…never ruby or crimson, tear-shaped jewellery".

### Two defects in the prompt machinery, not the art

**1. The bloodstone clause reached 6 of 16 briefs.** The fourth pass called the fix "a one-line
change to every Celestial brief's prompt". Ten of the sixteen never got it:

`clavissa`, `lord-jolav`, `siskala`, `neusch`, `asahi-iryna`, `avone-valerio`, `acelynn`,
`radwarno`, `dagon`, `uulana`.

All ten came out turquoise anyway, so the tally looks fixed — but it is fixed **by luck, not by
instruction**, and any regeneration can put the red back. `asahi-iryna`'s prompt still asks for
"crystalline accents", which is precisely what it delivered.

**2. `${BLOODSTONE}` is spliced mid-noun-phrase.** The constant ends "…and never ruby or crimson",
and every call site appends a noun, so the rendered prompts read:

> …not faceted gemstone, and never ruby or crimson **mantle** / **crown** / **diadem** /
> **cuff ornaments** / **collar**

The prohibition binds to the garment rather than to the bloodstone — "never a crimson mantle" — and
Malquilvo's reads "never ruby or crimson**, tear-shaped jewellery**". Fixing this means putting the
noun inside the constant or ending the clause with punctuation.

## Tenth pass — the seven QUERY portraits cleared. Nothing outstanding.

**26 July 2026 · 7 subjects · 7 pass · 0 fail.** With this pass **all 74 illustrations on the site
are signed off against the book standard**, and no QUERY or FAIL remains.

Every one of these was a *material* complaint rather than a canon contradiction: bloodstone rendered
as faceted crystal or as cabochons set in gold, where the novel makes it a matte growth of the body.
All seven had been written before the shared clause named the positive colour and the porous
material, so all seven cleared on the first attempt with no per-subject retry.

| Subject | Was | Now |
|---|---|---|
| `helena-chione` | Elaborate gold-set turquoise suite — crown, collar, earrings, bracelets | **One** small matte growth at the throat and nothing else. "Modest" finally landed |
| `asahi-iryna` | Faceted glowing crystal shards | A single porous turquoise-and-gold shoulder spur |
| `radwarno` | Faceted shards, marked plaques, read as a human soldier | Elongated pale Celestial, porous growth, plaques gone |
| `uulana` | Faceted crystal, circled-cross pendant, gold sigils on the robe | Porous collar spur; pendant and sigils gone |
| `malquilvo` | Green fluid weeping from eyes and mouth, star brooch | Tear-shaped mourning spurs as a growth; no weeping, no brooch |
| `ramona-ursule` | Columns of text-like marks in the background, scales-of-justice motif | Plain marble; porous collar; both gone |
| `siskala` | Tiger device six times over, including on the wall | Two — a chest patch and a belt buckle |

**`helena-chione` is the one to look at.** Her "modest" had been in the prompt and ignored twice.
Front-loaded as *"HER BLOODSTONE IS MODEST AND RESTRAINED: one small collar ornament only — not a
crown, not a tiara, not a spray, not a matching suite"* it landed immediately, and she is now
visibly the least ornamented queen at court, which is what the novel says she is. That makes it
**five for five** on moving a dropped constraint to the front and restating it as a prohibition.

`siskala` ships two badges rather than the one the prompt asks for — a chest patch and a matching
belt buckle. Recorded rather than failed: a unit patch plus a belt buckle is ordinary uniform
practice, and it is nothing like the six-fold saturation that opened the query.

**Observation across the batch:** four of the seven Celestials came back hairless
(`helena-chione`, `radwarno`, `malquilvo`, and near-shaven `ramona-ursule`). The clade table says
hair colour "varies freely", so nothing is contradicted, and Thyra's braids, Carolien's waist-length
black and Bekket's auburn keep variety in the set overall — but the generator clearly reads
"elongated post-human" as a cue for baldness. Worth steering if the clade starts to look uniform.

### Ninth pass — the eighth pass's five, regenerated the same day

**26 July 2026 · 5 subjects · 5 pass · 0 fail.** All five verified by eye and installed.

| Subject | Now |
|---|---|
| `liliana` | **Flayed-anatomy muscle fibre over the whole torso and arms** — no plates, no cuirass, no emblems, plain unmarked blade |
| `marcellu` | Dim dockside of wet plate, mooring rope and coloured haze — **not one sign** |
| `tose` | Plain scuffed harness and plates; dog tags, stencils and the crossed-rifles tattoo all gone |
| `gyvoy-enfoe` | Plain plaster room, warm light; no holo panel, no wrist readout |
| `terence-wilson-fletcher` | Background thrown entirely to abstract bokeh; no legible shape anywhere in it |

**The scenery clause fixed all four text failures at once, first try.** `NO_TEXT_ANYWHERE` now names
what to remove rather than what to forbid — *no signs, no signage, no neon lettering, no shopfronts,
no billboards, no screens, no display panels, no readouts, no holographic interfaces, no console
text, no dog tags, no identity discs, no name tapes, no stencilled markings…* — and the two prompts
that had actively invited the defect were rewritten with it: `marcellu`'s "dockside neon" became "lit
only by diffuse coloured haze and reflections", and `terence`'s "neon-rain city bokeh" became "thrown
far out of focus into soft coloured bokeh with no legible shapes".

`liliana` is the fourth prompt-was-right-render-ignored-it case and it broke the same way as the
others: her prompt already described the muscle suit in full, and the render drew plate armour
regardless. Front-loading it as **"HER FIELD KIT IS A BIOWARE MUSCLE SUIT, NOT ARMOUR"** with the
explicit negatives fixed it in one round. That is now four for four on this technique.

## Eighth pass — the characters no later pass ever re-judged

**26 July 2026 · 8 subjects · 3 pass · 5 fail.** Prompted by a fair question: *are the rest of the
character images up to snuff?*

They were not, and the reason is structural. The fourth and fifth passes re-opened portraits **where
book text had been recovered**, and the sixth opened **the replacements those passes triggered**. A
character with no recovered description was therefore never re-examined at all — its PASS still came
from the first pass, judged against a brief nobody had validated, under a no-text rule that only
looked at the subject. Thirty of the thirty-nine characters have been opened against the current
standard. `sahdiah` is a thirty-first, opened and passed in the fourth pass. That left **eight**.

| Subject | Verdict | Finding |
|---|---|---|
| `finn-jalgori-tobu` | **PASS** | Uranic ports, human scale, family ancestry correct. Ports are chunkier than the clade table's "subtle" — observation only |
| `otylia-jalgori-tobu` | **PASS** | Matches Finn's ancestry and port design |
| `zelinda-jalgori-tobu` | **PASS** | Ditto. Her red gems are ordinary jewellery — she is Uranic, so no bloodstone rule applies |
| `liliana` | **FAIL** | Contradicts recovered book text, plus two invented emblems and glyphs on the blade |
| `marcellu` | **FAIL** | Background neon signage carrying letterforms |
| `tose` | **FAIL** | Engraved dog tags, stencilled plate markings, invented crossed-rifles insignia |
| `gyvoy-enfoe` | **FAIL** | Legible text in the holo-panel and on the wrist display |
| `terence-wilson-fletcher` | **FAIL** | Dense neon cityscape signage with letterforms throughout |

**Judging the three siblings together, as the first pass failed to.** Finn, Otylia and Zelinda were
opened side by side: consistent East Asian ancestry, consistent neural-port design, plausible as
siblings. The family fix from the first pass has held.

### `liliana` — the last unchecked recovered description

The fifth pass recovered eight new descriptions. Seven belonged to subjects that were already FAIL
and have since been regenerated. The eighth was Liliana's, and her portrait was never opened against
it, because she was not on any fail list.

The novel puts her in a "lightweight **bioware muscle outfit**… like a beefed-up wrestler whose skin
had been stripped away" — exposed musculature. Her own brief spells out "**not plate armour**". The
shipped portrait is a segmented white plate cuirass over a leather jacket: precisely the thing the
brief rules out. It also carries **two eye emblems** on the chest — the same invented device the
fourth pass struck off Lord Gahiji — and a row of glyph-like characters engraved along the blade.

### The pattern: text moved to the background

Four of the five failures are **burned-in text nobody was looking for**, because it is not on the
subject. The first pass hunted caption bars, name tapes and chest stencils and cleaned them up. It
never looked past the figure. So the site still ships:

- neon shop signs with letterforms behind `marcellu` and `terence-wilson-fletcher`,
- holographic UI panels with legible lines behind `gyvoy-enfoe`,
- and `tose`'s dog tags, which are on the subject but read as costume rather than typography.

This is the same defect that appeared on `andino`'s console in the seventh pass, and it has the same
cause: a generator asked for a "neon city" or a "ship's bridge" fills it with signage, and the
`no text` clause reads to it as being about captions and watermarks. **The subtraction clause has to
name the scenery** — no signs, no screens, no readouts, no displays — not just forbid "text".

`tose` also carries a second problem worth naming: dog tags, stencilled plate and a crossed-rifles
tattoo are twenty-first-century military iconography imported wholesale into the 42nd millennium.

### Seventh pass — the remaining seven regenerated, 26 July 2026

**All seven outstanding FAIL subjects rebuilt and verified by eye. No FAIL is now open.** Same route
as `carolien-amaia` (`grok-imagine-image-quality`, 864×1152, ~$0.06 for the batch), same recipe:
front-load the constraint that kept getting dropped, add the subtraction clause, generate two or
three, open every one.

| Subject | Was wrong | Now verified |
|---|---|---|
| `inessa-pierina` | turquoise, delicate circlet | **Burnt-orange** starburst of horns framing the head, matte and porous, "like a crude sculpture" |
| `bekket` | neat slicked black hair, eagle banners | Long loose **unkempt auburn** hair, calculating half-smile, plain ground, no heraldry |
| `luus` | lined middle-aged face | The face of a girl of about seventeen wearing hard political triumph |
| `zuberi-dulcina` | floating runes, sunburst emblem, faceted crystal | No symbols anywhere; cracked **porous** bloodstone crown; plain smoky ground |
| `avone-valerio` | inscription plaques, 40K marine, human soldier | Elongated pale Celestial, plain unmarked armour, turquoise-and-gold growth |
| `andino` | drawn as a man, human eyes, `TRAVELER` patch | Unambiguously a **woman**; **black lens tubes** in place of eyes; **neck pistons**; no patch |
| `medusa` | pale woman, cropped black hair | **Deep black skin**; long **rainbow braids** coiling like serpents; knife harness |

`medusa` is the one worth looking at — the braids visibly writhe, which is the whole reason she has
the name and something three previous passes never got.

**Two subjects needed a second round, and both taught something:**

**`andino`.** The first pair fixed the eyes and pistons but one read ambiguously male — the exact
defect being fixed — and the other put **legible amber text on a bridge console** behind her. Naming
her sex in the first clause and banning console readouts explicitly fixed both. Background screens
are a text vector the `no text` clause does not cover, because the model reads them as scenery
rather than lettering.

**`avone-valerio` — the guard was negative-only.** Both first candidates came back with a **dark red**
bloodstone growth, from a clause that said "never ruby or crimson". `BLOODSTONE_GUARD` named what
the colour must *not* be and never what it must *be*, so the generator kept its default and simply
ignored the prohibition. Adding the positive — *"in faint turquoise and gold — pale blue-green and
gold only"* — and widening the negatives to "never red, rust, ruby, scarlet or crimson" fixed it in
one round, two for two.

That is the same lesson as Carolien's age, in a different disguise: **a constraint stated only as a
prohibition is weak.** Say what you want first, then what you forbid. Both `BLOODSTONE_MATERIAL` and
`BLOODSTONE_GUARD` now do that, which also matters for the seven QUERY portraits, since they were
relying on the same negative-only wording.

### PASS — `carolien-amaia` regenerated, 26 July 2026

**First subject rebuilt against the repaired prompt machinery, and the first shipped by a different
image model** — `grok-imagine-image-quality` via the Grok MCP plugin, 5 candidates at $0.015 total,
864×1152 (the site's 3:4). Recorded because provenance matters: every other plate on the site came
from a different generator.

Verified by eye against the recovered text: **hair is glossy raven-black, straight, hanging to the
waist** (it was bald); skin near-albino; **face is unmistakably adolescent**; robes deep indigo with
platinum; background plain marble with no heraldry, crowns, banners or murals; no text and no brand
marks anywhere. **PASS.**

The bloodstone is the part worth keeping: a matte, porous, lobed turquoise-and-gold growth spreading
over both shoulders — visibly *of the body*, not a gem and not set in metal. That is the first plate
on the site to render the material correctly, and it came from the reworded clause rather than from
anything subject-specific. "Porous" is now folded into `BLOODSTONE_MATERIAL` because it is what made
the difference.

**The first attempt failed, and how it failed is the useful part.** Sent the committed prompt
verbatim, two candidates: both fixed the hair and the bloodstone and both drew a gaunt woman of about
forty, against a prompt that said "host body is only seventeen years old". The age instruction was
buried mid-sentence between two other clauses. Front-loading it — `SHE IS SEVENTEEN YEARS OLD:`
followed by the concrete negatives it must avoid — fixed it in one round, three for three.

So the sixth pass's "prompt was right and the render ignored it" class is **partly a placement
problem**. Being present in the prompt is not enough; a constraint the model keeps dropping has to
be moved to the front and stated as a prohibition, not only as a fact. `luus` fails for the same
reason ("beguilingly young" buried mid-clause) and should get the same treatment.

### Prompt fixes applied after the sixth pass

**26 July 2026 · `write-visual-briefs.mjs` · no images regenerated yet.** Both machinery defects are
closed, and the five prompts that were asking for the wrong material outright are corrected.

**1. `BLOODSTONE` is now a function, so the noun sits inside the clause.** It was a bare string that
call sites suffixed, so `${BLOODSTONE} mantle` rendered as "…and never ruby or crimson **mantle**".
`bloodstone("heavy mantle")` now renders the ornament first and leaves the prohibition terminal.
The material wording is also stronger, because "not faceted gemstone" alone did not stop either
faceted prisms or cabochons set in gold: **"never a cut, faceted or polished gemstone, never set in
metal like jewellery, and never ruby or crimson."** Colour is a second argument, defaulting to
turquoise-and-gold only where the novel is silent — Inessa-Pierina's ORANGE and Gahiji's black-and-
green are spelled out in their own prompts and untouched.

**2. Coverage is 16 of 16, verified rather than assumed.** Ten briefs never had the clause. Five of
those were actively asking for the defect — `clavissa` and `lord-jolav` requested "crystalline
jewellery", `asahi-iryna` and `uulana` "crystalline accents", `acelynn` "mindline crest jewellery" —
which is why those four render as faceted crystal and set gems. They now request a named bloodstone
growth. The other five (`siskala`, `neusch`, `avone-valerio`, `radwarno`, `dagon`) may legitimately
wear none, so they carry `BLOODSTONE_GUARD`: *"any bloodstone visible is …"*, which forbids the red
gem default without forcing an ornament onto a figure the novel never gives one.

Three prompts got a targeted fix for a sixth-pass defect at the same time:

| Subject | Change |
|---|---|
| `helena-chione` | Colour and "modest" were already right and were ignored; the material clause was missing entirely. Now "a modest, restrained collar ornament of calcium-growth bloodstone in gold and turquoise — …" |
| `siskala` | "subtle tiger motif" → "one small tiger-head unit badge and no other repeated emblem", against six of them |
| `avone-valerio` | "rank ornaments without text" → "plain rank ornaments bearing no lettering, inscriptions, plaques or repeated emblems" |

What this does **not** fix is the sixth pass's largest finding: four portraits contradict a
description already sitting in their own prompt. No wording change addresses that, because the
instruction was already there and correct. It needs a compare-image-to-prompt step at review time.

### Clade drift on the three military Celestials

`avone-valerio`, `radwarno` and `siskala` are all "Imperial Celestial" in their own briefs, but all
three read as ordinary weathered human soldiers — no elongation, no post-human beauty, human skin
and proportions. Height is not testable in an upper-body crop, so this is a QUERY on style rather
than a countable contradiction, but three for three is a pattern.

---

## Fifth pass — the rest of the cast, searched rather than read

**26 July 2026 · a 156-query sweep of the publisher preview, covering all 39 characters · 2 new FAIL
· 8 new descriptions recovered · 1 earlier claim of mine corrected.**

The fourth pass used the free PRH excerpt, which is the novel's opening and therefore only covers the
characters who appear early. This pass searched the whole book — every character's name paired with
*hair*, *eyes*, *face* and *skin* against the publisher preview — to reach the rest of the cast. Two
portraits that had passed every previous review turned out to contradict the text badly.

### FAIL — `andino`: drawn as a man, with eyes

Andino is a **woman** — "he valued **her** so", "**she** knew that", "Andino raise **her** head". Her
own article already uses she/her. The portrait is a man, so the image contradicts the page it sits
on. This is the second Dejean-class sex error found in two days, and the pipeline still has nothing
that would catch a third.

She is also extensively rebuilt, and none of it is drawn:

- **She has no eyes.** "…eyes; instead **small black lens tubes protruded from the sockets**", and
  they "whirred smoothly" as they focus. The portrait has ordinary human eyes.
- **"The slim pistons on either side of her neck extending slowly."** The portrait's neck is bare.
- The viewpoint character wonders "what percentage of **her skin**" is still hers.

Plus a shoulder patch reading `TRAVELER`, and invented crescent and wing insignia.

### FAIL — `medusa`: the name is a description, and the portrait ignores it

"A vision in tight leather **as black as her skin**; **rainbow hair sprouting long braids with
integral mech threads that made them writhe like serpents**."

The portrait is a pale woman with cropped black hair. It misses her skin colour and it misses the
serpent-braids — which is not a detail but the reason she is called Medusa. The leather is right.

### Recovered descriptions for eight more characters

None of these had any physical description in their brief before this pass; none of their portraits
had anything to be checked against. All are now in the briefs with citations, and the notable ones
are on the articles.

| Subject | What the novel actually says |
|---|---|
| `carolien-amaia` | Host body **seventeen years old**; "glossy raven hair hung almost to her waist, framing a long face with skin so white she could have been albino" |
| `bekket` | "Tall, if not quite her height. His **auburn hair was long and mildly unkempt**, which gave him a slightly wild appearance so different from the other…"; a young count |
| `inessa-pierina` | "Her head was framed by a **starburst of orange bloodstone horns**, resembling a crude sculpture" |
| `luus` | "Such a **beguilingly young face**" — a triumphant smile looks wrong on it |
| `zuberi-dulcina` | Present in the council chamber **as a skeleton**, which Luus-Marcela smiles at |
| `liliana` | A "lightweight **bioware muscle outfit**… like a beefed-up wrestler whose skin had been stripped away" |
| `valdier` | A face that "remained perfectly impassive"; his daughter admires his poise |
| `elsbeth-mcquillan` | (fourth pass) eyes are "light gray cymech spheres" |

Two attribution traps in that passage, both avoided and both recorded in the briefs so nobody walks
into them later. The "dark olive skin and classic titian hair, cropped short… elfin appearance" on
p. 68 belongs to **a princess Luus selected to taunt the empress**, not to Luus. And Liliana's
"broader nose, and a skin that was almost albino it was so pale" in the late chapters is **a
disguise she puts on**, alongside Terence's and Josias's — not her face.

### Correction — bloodstone is not always turquoise and gold

The fourth pass concluded "bloodstone is turquoise and gold" and I put "never red, never ruby" into
nine prompts on that basis. Inessa-Pierina's **orange** horns show the positive half of that claim
was too strong: colour is per-wearer — turquoise and gold, black and green, orange.

The negative half stands. Nothing in the novel is ruby or crimson, and the material is consistently
a matte calcium growth rather than a cut gem. The prompts now route through one `BLOODSTONE`
constant that says exactly that, and characters the novel colours individually override it.

That is the fourth-pass lesson turning up again one level higher: a rule inferred from two examples
is a sample, not a rule, and it wants checking against a third before it goes into nine prompts.

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
