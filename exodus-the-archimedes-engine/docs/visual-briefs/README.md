# Visual briefs — research-grounded wiki illustrations

Maintainer-only notes for original encyclopedia illustrations. **Not** reader-facing article prose.

## Art direction (site-wide)

- **Medium:** Highly detailed digital sci-fi illustration (cinematic portrait or vehicle plate), not cartoon, not icon, not photobash collage.
- **Characters:** Upper-body / ¾ portrait, subject-centred, shallow depth of field, soft architectural or starfield backdrop; 3:4 feel.
- **Ships:** Exterior hull plate, three-quarter view, readable silhouette, space or drydock lighting; 16:9 feel.
- **Unity:** Cool-neutral palette with warm skin/hull accents; encyclopedia seriousness (no comic speech, no UI chrome, no watermark text).
- **Originality:** Guided by novel + wiki research only. Do not reproduce official EXODUS marketing art.
- **Family resemblance (owner rule, 26 July 2026): if the book does not explicitly say otherwise,
  relatives should match.** Blood relations share bearing, proportions and colouring unless the
  novel describes one of them differently — and any feature the novel *does* fix for a line is
  mandatory for every member of it. Judge a family side by side, never image by image; this has
  now failed twice, on the Jalgori-Tobu siblings and on Helena-Chione's daughters.
- **Period fit — the costume must belong to the era.** The novel is set around 42,000 AD, tens of
  thousands of years after the Sol exodus, so nothing may borrow a garment from Earth's recent past:
  no lounge suit, necktie or cravat, no twentieth-century dress collar and cuffs, no trench coat or
  notch lapels, no dog tags or modern rank chevrons, and no Georgian or Victorian mouldings (dado
  rails, wainscot, cornices) in a room. Build status and role from **cut, seam, fastening and
  material** — standing and mandarin collars, asymmetric closures, seamed panels, unfamiliar
  fabrics. `marcellu` and `gyvoy-enfoe` are the reference plates; `FAR_FUTURE_DRESS` in
  `write-visual-briefs.mjs` is the clause. This is easy to miss because it is not text, not canon
  and not clade: ten review passes went by with a man in a suit and tie on a public page.
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
| **Imperial Celestial** | Tall elegant humanoids (queens up to ~3 m; elongated proportions, long limbs); post-human beauty; athanasia culture. **Both sexes carry a marsupial womb**; a child is near full height by seven (over 2 m) and only broadens after ten, when puberty triggers the womb's final growth phase. **Family resemblance is the default.** The novel guarantees one inherited feature — Helena's daughters all share her **intense green eyes** — and says hair and skin colour are not fixed by the line. That is licence to vary, not an instruction to: unless the book explicitly describes a relative differently, draw them as family in bearing, proportions and colouring | Court robes and togas, bloodstone jewellery/growths that eventually entomb a host; neural induction pad in the **palm**, connection patch at the **top of the spine**; livestone architecture hints |
| **Heresy Celestial** | ~3 m spindly **hexapods** — two legs, four arms, **four eyes that blink in unison**. Skull **extended into cones on both sides, level with the shoulders**, housing an inflated brain; the low body temperature exists to keep it from overheating. Skin **almost reptilian**, wrapped tight enough to read as an **exoskeleton, in blues and greens**. **The arm pairs differ**: the upper ends in four elongated three-jointed fingers and a thumb, the lower dangles like stiff rope with bulbous elbows and a simple **triple claw** | Multilayered robes cut for multi-limb anatomy, lower arms left hanging free; research/archon severity |
| **Talloch-Te archon** | Multi-body Celestials (primary + secondary bodies; mind partition); **five eyes** on Sahdiah’s primary body; bodymorph / gravity form; not Crown two-eyed humanoid, not Heresy hexapod | Merchant-archon finery; nurture-chamber / ship-linked presence; deniable-ops cool |
| **Uranic** | Fully human appearance; intermediate status. The interface is **bloodstone, not hardware**: quiescent **bloodstone buds and node connections** embedded at the temples and running back along the skull, dormant calcium-growth nodes of the body — never chunky metal sockets or tech ports. Colouring varies widely across the uranic nobility, so take skin and hair from the individual family (the Jalgori-Tobus are fair-skinned with identical **intense green eyes**) | Client aristocracy — Gondiar estate / ministerial dress, elegant but subordinate to Celestial scale |
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
[IMAGE-REVIEW.md](IMAGE-REVIEW.md). **Current state: 74 briefed · 74 signed off · 0 query · 0 fail.** Every illustration on the site has
been opened by eye and judged against the novel. Reached 26 July 2026 over ten passes.

The first three checked the art against the briefs; the fourth and fifth checked the briefs against
the novel and re-opened most of the cast; the sixth opened the replacements; the seventh through
tenth regenerated everything still outstanding. Four lessons came out of it, and they are the useful
part of the record:

- **A constraint stated only as a prohibition is weak.** Say what you want, then what you forbid.
  "Never ruby or crimson" alone produced red bloodstone twice; adding "in faint turquoise and gold"
  fixed it immediately.
- **A correct prompt is not sufficient.** Five portraits contradicted a description sitting in their
  own `prompt` string. Moving it to the front and restating it as a prohibition fixed all five.
- **Name the scenery, not just the text.** Neon signs, holo panels and console readouts all shipped
  past a `no text` clause the generator read as being about captions.
- **Compare the delivered image to the prompt that asked for it, by eye, every time.** Nothing else
  in the pipeline can.
- **Check period fit.** Added as a criterion only at the eleventh pass, after `gyvoy-enfoe` was
  found wearing a suit and tie. Ten passes had checked text, canon, clade and material and never
  asked whether the clothes belonged to the era.

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
