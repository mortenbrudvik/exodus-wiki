# Visual briefs — research-grounded wiki illustrations

Maintainer-only notes for original encyclopedia illustrations. **Not** reader-facing article prose.

## Art direction (site-wide)

- **Medium:** Highly detailed digital sci-fi illustration (cinematic portrait or vehicle plate), not cartoon, not icon, not photobash collage.
- **Characters:** Upper-body / ¾ portrait, subject-centred, shallow depth of field, soft architectural or starfield backdrop; 3:4 feel.
- **Ships:** Exterior hull plate, three-quarter view, readable silhouette, space or drydock lighting; 16:9 feel.
- **Unity:** Cool-neutral palette with warm skin/hull accents; encyclopedia seriousness (no comic speech, no UI chrome, no watermark text).
- **Originality:** Guided by novel + wiki research only. Do not reproduce official EXODUS marketing art.
- **Naturalism (preferred, owner 26 July 2026):** `carolien-amaia` is the reference plate. Aim for
  restrained and photographic — real skin texture, plain even light, an uncluttered background, and
  one clear focal ornament — over the ornate, gem-encrusted, heavily-patterned look most of the
  earlier portraits share. The lever that produced it was explicit subtraction in the prompt: *"plain
  light, uncluttered background, no heraldic emblems, no crowns, no repeated motifs, no banners, no
  portraits or murals behind her."* Without those negatives the generator fills space with invented
  heraldry, which is also where the burned-in-emblem defects keep coming from — so this is a
  correctness lever, not only a taste one.

## Clade visual grammar (from wiki canon)

| Clade | Body plan / cues | Dress / tech |
|---|---|---|
| **Imperial Celestial** | Tall elegant humanoids (queens up to ~3 m; elongated proportions, long limbs); post-human beauty; athanasia culture. **Both sexes carry a marsupial womb**; a child is near full height by seven (over 2 m) and only broadens after ten, when puberty triggers the womb's final growth phase. **Hair and skin colour vary freely within a line** — a queen's daughters share only her eye colour | Court robes and togas, bloodstone jewellery/growths that eventually entomb a host; neural induction pad in the **palm**, connection patch at the **top of the spine**; livestone architecture hints |
| **Heresy Celestial** | ~3 m spindly **hexapods** — two legs, four arms, **four eyes that blink in unison**. Skull **extended into cones on both sides, level with the shoulders**, housing an inflated brain; the low body temperature exists to keep it from overheating. Skin **almost reptilian**, wrapped tight enough to read as an **exoskeleton, in blues and greens**. **The arm pairs differ**: the upper ends in four elongated three-jointed fingers and a thumb, the lower dangles like stiff rope with bulbous elbows and a simple **triple claw** | Multilayered robes cut for multi-limb anatomy, lower arms left hanging free; research/archon severity |
| **Talloch-Te archon** | Multi-body Celestials (primary + secondary bodies; mind partition); **five eyes** on Sahdiah’s primary body; bodymorph / gravity form; not Crown two-eyed humanoid, not Heresy hexapod | Merchant-archon finery; nurture-chamber / ship-linked presence; deniable-ops cool |
| **Uranic** | Fully human appearance; intermediate status; neural interface ports subtle at temples/neck | Client aristocracy — Gondiar estate / ministerial dress, elegant but subordinate to Celestial scale |
| **Baseline / Diligent** | Late-arkship humans; Earth-exodus memory culture | Shipboard uniforms, practical field kit, settler politics |
| **Traveler / mercenary** | Baseline or mixed human | Worn ship gear, salvage harnesses, deniable commercial dress |

### Bloodstone is a growth, not a gemstone — and its colour varies

**Corrected 26 July 2026.** An earlier draft of this section said flatly "bloodstone is turquoise and
gold". That is right for Makaio-Yalbo and Helena-Chione and wrong as a general rule: Gahiji-Calder's
is "black and green curlicues", and Inessa-Pierina's is "a starburst of **orange** bloodstone horns".
Colour is per-wearer, so take it from the character's own brief and only fall back to turquoise-and-gold
where the novel is silent.

What holds across every wearer is the *material*: a matte calcium-like growth of the body, never a
faceted cut gem, and nowhere in the text ruby or crimson.

### The original note, still accurate on the red

A recurring error in the delivered art. Bloodstone is a **calcium-like biotech** the wearer directs,
and the novel names a colour each time: growths "embellished … with faint hues of turquoise and gold",
a queen in "modest gold-and-turquoise bloodstone ornamentations", an archon who cares little for
court decorum in "a cap of black and green curlicues", and a blunter queen under "a starburst of
orange bloodstone horns". Nothing in the book is red — the
real-world mineral called bloodstone is green flecked with red, and the generator appears to have
followed the mineral rather than the text. Several portraits ship with crimson and magenta crystal
sprays; treat that as a defect on regeneration.

It also **immobilises**. At full growth it covers the skull and cheeks, leaves only mouth, nose and
eyes clear, throws out a crown of scalloped horns, brocades the body in a lacework under the toga,
and "prevented any significant facial expression". A late-stage host should look rigid, not
bejewelled.

## Ship classes

| Hull | Class read |
|---|---|
| *Diligent* | Massive late-human **generation arkship** — city-scale modules, colony decks, utilitarian megastructure |
| *Arcadia’s Moon* | **Atypical Traveler charter** — golden geodesic sphere of trusses with eight interior ovoids that reconfigure by flight status; deniable (disguised as *Infinite Totality*) |
| *Alumata* | Sleek Crown **archon ship** — elegant, intelligence yacht, smaller than Heresy capital hulls |
| *Cybele’s Eagle* | Compact **deniable passenger** transport — civilian lines, not navy |
| *Lestari* | Enfoe **commercial** starship — dynasty freighter, Traveler-adjacent commerce |
| *Polkadav* | Mid **transport / rendezvous** hull — Jalgori-Tobu family evacuation to the *Diligent* |
| *Aeacus* | Compact Crown **household Celestial** hull — lent by Neusch to Terence |

## Coverage list

See individual `*.md` briefs in this folder. Filenames match page slugs.

## Generating an image

Nothing in this repo generates images — no script here calls an image model, and the JPEGs arrive
from outside it. The path used for `carolien-amaia` on 26 July 2026, which is the one to reuse:

**Grok MCP plugin → `grok_generate_image`**, model **`grok-imagine-image-quality`**.

- **The `image` alias is stale and 404s.** It resolves to `grok-2-image-1212`, which the API no
  longer serves. Name `grok-imagine-image-quality` (or `grok-imagine-image`) explicitly. Check with
  `grok_models` if that changes again.
- **Cost is negligible** — about $0.003 an image, so generate 3 and choose, never 1 and hope.
- **`response_format: "url"` returns temporary links.** Download them immediately (`curl -o`) or
  they expire. Base64 works too but floods the transcript with a megabyte of data.
- **The tool takes no size or aspect argument.** Portrait prompts came back 864×1152, which is
  exactly the 3:4 characters need. **Whether it will produce 16:9 for ships, places, technology and
  factions is untested** — if it will not, those need a different route or a post-crop.

The loop: take the prompt **verbatim from the brief** (that is the whole point of keeping it there),
generate three, open every one, install the best, re-run the five checks, and log the verdict in
[IMAGE-REVIEW.md](IMAGE-REVIEW.md). If the render drops a constraint, do not just retry — move that
constraint to the front of the prompt, restate it as a prohibition, and **update the brief to the
wording that actually worked**, so the recorded prompt stays the one that produced the shipped file.

## Review

`check-images.mjs` cannot see inside a JPEG, so delivered assets are checked by eye. Results are in
[IMAGE-REVIEW.md](IMAGE-REVIEW.md). **Current state: 74 briefed · 67 signed off · 7 query · 0 fail.** No FAIL is open, and **all 39
characters have now been opened against the book standard.** The eighth pass found five failures
among the characters no later pass had re-judged — four for **background** text (neon signage, holo
panels) that earlier passes never looked for — and the ninth regenerated all five the same day.
The seven remaining QUERY portraits carry bloodstone as faceted crystal or set jewellery rather
than a growth.

Six passes so far. The first three checked the art against the briefs; the fourth and fifth checked
the briefs against the novel and re-opened most of the cast; the sixth opened the 30 replacement
files. That sixth pass confirmed the big fixes — Olomo's four eyes, Makaio's entombing growth,
Dejean's sex, and every burned-in caption the fourth pass listed — and **no red bloodstone survives
anywhere**. What it also found:

- Four portraits contradict a description that *is* in their own prompt (`carolien-amaia` bald
  against "raven hair almost to her waist"; `inessa-pierina` turquoise against **ORANGE**; `bekket`
  neat black against "long unkempt auburn"; `luus` middle-aged against "beguilingly young").
  `carolien-amaia` has since been fixed, and the fix was **placement**: the buried constraint had to
  move to the front of the prompt and be restated as a prohibition before the model would honour it.
- New invented heraldry and lettering in `zuberi-dulcina`, `siskala`, `avone-valerio`, `bekket`.
- Bloodstone is the right colour but often the wrong **material** — faceted crystal or set
  jewellery rather than a matte growth.
- The bloodstone clause reached only **6 of the 16** Celestial briefs, and `${BLOODSTONE}` spliced
  mid-phrase so the prohibition bound to the garment ("never ruby or crimson *mantle*"). **Both are
  now fixed** — `bloodstone()` puts the ornament inside the clause, coverage is 16 of 16, and the
  five prompts that asked for "crystalline jewellery" ask for a growth. No image regenerated yet.

`andino` and `medusa` are still not regenerated.

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

Second- and third-pass extras now cover **all** location, technology, and faction entity pages
(not only the original selective shortlist). Characters and ships were already full.
