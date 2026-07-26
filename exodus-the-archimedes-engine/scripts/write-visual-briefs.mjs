/**
 * Writes research-grounded visual briefs under docs/visual-briefs/.
 * Source of truth for illustration intent (not reader-facing article prose).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "docs", "visual-briefs");

/**
 * `STYLE_BASE` carries no negative clause. `STYLE` appends the original short one.
 * `NO_TEXT` is the widened negative adopted after the first review pass found caption bars,
 * invented house names and a real-world brand logo burned into delivered art — use it for any
 * brief being regenerated, and never remove it from one that already has it.
 */
const STYLE_BASE =
  "Highly detailed cinematic sci-fi encyclopedia illustration, rich textures, sharp focus, painterly digital art with photographic detail, soft volumetric lighting.";

const NO_TEXT =
  "Absolutely no text, no captions, no labels, no lettering, no logos, no brand marks, no watermarks, no UI chrome.";

/**
 * Bloodstone is a **calcium-like biotech growth**, not jewellery, and the generator kept drawing it
 * as faceted ruby crystal — the colour of the real-world mineral rather than of the thing in the
 * book. Colour varies by wearer and is stated per character where the novel gives it: turquoise and
 * gold (Makaio, Helena-Chione), black and green (Gahiji), orange (Inessa-Pierina). Nothing in the
 * text is ruby or crimson. This constant is the default for wearers the novel does not colour.
 */
/**
 * Bloodstone in a prompt.
 *
 * The novel fixes its COLOUR per wearer — turquoise and gold, black and green, orange — and its
 * MATERIAL for everyone: a matte calcium growth of the body, never a cut gem. Two forms:
 *
 *   bloodstone("collar-crown")   the subject wears one; pass a colour where the novel names one
 *   BLOODSTONE_GUARD             the subject may wear none, but forbid the red-gem default anyway
 *
 * The ornament noun goes INSIDE the clause on purpose. This was a bare string that call sites
 * suffixed — `${BLOODSTONE} mantle` — which rendered as "…and never ruby or crimson mantle", so the
 * prohibition bound to the garment rather than to the growth. Every Celestial portrait in the sixth
 * pass came back the right colour and the wrong material.
 */
const BLOODSTONE_MATERIAL =
  "a bone-like matte porous growth of the body, never a cut, faceted or polished gemstone, never set in metal like jewellery, and never red, rust, ruby, scarlet or crimson";

const bloodstone = (item, colour = "faint turquoise and gold") =>
  `a ${item} of calcium-growth bloodstone in ${colour} — ${BLOODSTONE_MATERIAL}`;

// The guard must name the colour it DOES want, not only the ones it forbids. Its first version said
// "never ruby or crimson" and nothing more, and Avone-Valerio came back with a red growth twice out
// of two — a negative alone leaves the generator free to pick the default it was always picking.
const BLOODSTONE_GUARD = `any bloodstone visible is in faint turquoise and gold — pale blue-green and gold only, ${BLOODSTONE_MATERIAL}`;

/**
 * Text the earlier passes never hunted, because it is not on the figure. Neon shop signs, holo UI
 * panels, console readouts and dog tags all shipped past a `no text` clause the generator read as
 * being about captions and watermarks. Naming the *scenery* is what closes it.
 */
/**
 * Period fit. Ten passes checked burned-in text, invented heraldry, canon and clade, and never once
 * asked whether the clothes belonged to the era. Gyvoy Enfoe shipped in a lounge suit and necktie —
 * an 1860s Western garment — in a story set around 42,000 AD. Marcellu is the counter-example worth
 * copying: mandarin collar, seamed panels, no lapels, and he still reads as a sharp commercial
 * operator without borrowing anything from Earth's recent past.
 */
const FAR_FUTURE_DRESS =
  "Costume must belong to the far future, not to Earth's recent past: no lounge suit, no necktie, bow tie or cravat, no dress-shirt collar and cuffs of twentieth-century cut, no trench coat, no notch lapels, no dog tags, rank chevrons or webbing of modern military pattern, and no Georgian or Victorian interior mouldings such as dado rails, wainscot panelling or cornices. Convey status and role through cut, seam, fastening and material instead — standing or mandarin collars, asymmetric closures, seamed panels, unfamiliar fabrics.";

const noTextAnywhere = (badgeException = "") =>
  "Plain even light and an uncluttered background. NO TEXT ANYWHERE IN THE FRAME, on the subject or behind them: no signs, no signage, no neon lettering, no shopfronts, no billboards, no screens, no display panels, no readouts, no holographic interfaces, no console text, no dog tags, no identity discs, no name tapes, no stencilled markings, " +
  (badgeException
    ? `no badges, insignia, emblems or crests other than ${badgeException}, `
    : "no unit badges, no insignia, no heraldic emblems, no crests, ") +
  "no repeated motifs, no banners, no murals, no floating symbols or runes, no captions, no labels, no numbers, no logos, no brand marks, no watermarks.";

// Siskala is the one subject with a canon device: she is Major of the Wynid Royal Tiger Guard on her
// own page, so the blanket "no insignia" would delete something the wiki actually establishes.
const NO_TEXT_ANYWHERE = noTextAnywhere();

const STYLE =
  "Highly detailed cinematic sci-fi encyclopedia illustration, rich textures, sharp focus, painterly digital art with photographic detail, soft volumetric lighting, no text, no watermark, no UI chrome.";

/**
 * `sources` is optional and overrides the generic two-bullet default. Set it whenever a brief
 * cites a specific page or chapter of the novel — without it the citation lives only in the
 * generated .md and the next run of this script silently discards it.
 */
/** @typedef {{ slug: string, title: string, kind: 'character'|'ship', clade: string, role: string, cues: string[], clothing: string, setting: string, prompt: string, inference: string[], sources?: string[], image: string, companionImage?: string }} Brief */

/** @type {Brief[]} */
const briefs = [
  // —— Protagonists / Diligent human core ——
  {
    slug: "finn-jalgori-tobu",
    title: "Finn Jalgori-Tobu",
    kind: "character",
    clade: "Uranic aristocrat (~25)",
    role: "Adventure-thread protagonist; Minsterialis of Hafnir; later Traveler-aspirant / Engine operator",
    cues: [
      "Human male, mid-twenties, athletic aristocratic build",
      "Fully human face (not Celestial-tall); restless confident expression",
      "Subtle neural interface ports at temples/neck (Uranic trait)",
      "Not a godlike Celestial — client-class human scale",
    ],
    clothing: "Mixed Uranic estate fashion and Traveler field kit — dark tailored jacket over practical spacer layers, neural-compatible gloves",
    setting: "Neutral dark space-station backdrop with faint Gondiar green-world glow",
    prompt: `${STYLE} Portrait of Finn Jalgori-Tobu, a 25-year-old Uranic human aristocrat from a far-future space empire: athletic young man with aristocratic East Asian features and straight black hair, fair, pale, light-toned skin — not warm, not medium, not tan — and the family's INTENSE GREEN EYES, vivid green, identical across the immediate family. At the temples and running back along the skull, quiescent bloodstone buds and node connections are embedded in the skin: small dormant calcium-growth nodes in faint turquoise and gold, part of the body rather than metal sockets or hardware, never chunky black tech ports, restless determined expression, wearing a dark tailored spacer jacket over practical field layers. Client nobility aesthetic, not godlike alien. Upper-body three-quarter portrait, soft starfield and estate architecture behind him.`,
    inference: [
      "Hair/eye colour and ancestry are not fixed in the wiki. The delivered portrait's East Asian colouring is now stated in the prompt so that it is reproducible and so that his twin Otylia and sister Zelinda can be locked to the same family appearance",
    ],
    sources: [
      "**The novel DOES describe him** (owner, from the full text, 26 July 2026), correcting an earlier entry here that claimed it did not. Fair/pale, light-pigmented skin — his \"freezing skin\" is called out during high-altitude atmospheric exposure. His **immediate family share identical intense green eyes**. At his temples and along his skull are **quiescent bloodstone buds and node connections** — integrated biotech that lets him link Celestial technology, not metal ports",
      "The earlier \"no description\" entry came from running the publisher excerpt through a summarising fetch, which reported none. That is reading a summary, not reading the text — the same class of error as writing a verdict from a brief. Treat an automated \"nothing found\" as unproven, never as verified absence",
      "The broader uranic nobility spans a wide variety of hair and skin colours, so pale skin is Finn's family trait rather than a clade rule",
      "What the novel does fix: 25 years old, third son of the Jalgori-Tobu family, Minsterialis of Hafnir, a uranic with neural interfaces, and **twin of Otylia** — so the two must be locked to one ancestry and colouring",
      "Wiki article `pages/characters/finn-jalgori-tobu.html`",
      "Clade grammar: `docs/visual-briefs/README.md`, faction pages (Celestials / Uranics / Travelers / Heresy)",
    ],
    image: "assets/images/characters/finn-jalgori-tobu.jpg",
  },
  {
    slug: "eleanor-aponi",
    title: "Eleanor Aponi",
    kind: "character",
    clade: "Baseline late-arkship human (~23)",
    role: "Diligent lieutenant; Finn’s field partner; Josias’s granddaughter",
    cues: [
      "**Heart-shaped face with a fringe of dark hair** — stated at her first appearance",
      "Young woman ~23, competent military bearing",
      "Baseline human (no Celestial elongation, no bloodstone)",
      "Shipboard practicality over court beauty",
    ],
    clothing: "Late-arkship lieutenant uniform — functional jumpsuit/harness with Diligent crew insignia hints, utility straps",
    setting: "Arkship corridor lighting, cool metal bulkheads",
    prompt: `${STYLE} Portrait of Eleanor Ellie Aponi, a skilled 23-year-old lieutenant from a late-arriving human generation arkship: competent young woman with a distinctly heart-shaped face and a fringe of dark hair, practical military bearing, baseline human features, wearing a functional grey-blue arkship lieutenant uniform with harness straps. Field partner energy, not court fashion. Upper-body portrait, cool bulkhead lighting.`,
    inference: [
      "Hair length is not fixed — the book says only 'a fringe of dark hair spilling out from the hood'. Colour is canon; the crop is not",
    ],
    sources: [
      "Novel, ch. 2 (Finn's rescue): “a heart-shaped face with a fringe of dark hair spilling out from the hood”",
      "Wiki article `pages/characters/eleanor-aponi.html`",
    ],
    image: "assets/images/characters/eleanor-aponi.jpg",
  },
  {
    slug: "josias-aponi",
    title: "Josias Aponi",
    kind: "character",
    clade: "Baseline late-arkship human (~51 intro)",
    role: "Owner-orator of Diligent; liberation agitator; Regal Democrats president",
    cues: [
      "**The thickest beard Finn had ever seen** — his single stated feature, and non-negotiable",
      "**Grey-blue eyes**, and the most judgmental Finn has ever met",
      "Middle-aged man ~50s, forceful orator presence",
      "Political fire rather than soldier physique",
    ],
    clothing: "Formal arkship-owner coat over practical layers — half statesman, half settler politician",
    setting: "Assembly-hall lighting with arkship windows",
    prompt: `${STYLE} Portrait of Josias Aponi, a 51-year-old human arkship owner and fiery political orator: middle-aged man with a huge, thick, full grey-flecked beard covering his jaw and chest, piercing grey-blue eyes with a judgmental stare, wearing a formal dark owner’s coat over practical settler layers. Liberation agitator energy. Upper-body portrait, warm assembly-hall light and arkship viewport glow. No text, no lettering, no graffiti, no slogans, no signage, no insignia text anywhere in frame.`,
    inference: [
      "Hair colour and skin tone are not fixed by the novel — only the beard and the grey-blue eyes are",
    ],
    sources: [
      "Novel, ch. 2: “He had the thickest beard Finn had ever seen” and “The gray-blue eyes that stared down at him were the most judgmental he’d ever known”",
      "Wiki article `pages/characters/josias-aponi.html`",
    ],
    image: "assets/images/characters/josias-aponi.jpg",
  },
  {
    slug: "dejean",
    title: "Dejean",
    kind: "character",
    clade: "Baseline late-arkship human (59)",
    role: "Captain of arkship Diligent",
    cues: [
      "**Dejean is a woman** — she/her throughout; she calls herself “one happy old lady”",
      "**Grey hair**, and by the later chapters a noticeably haggard face",
      "Fifty-nine-year-old professional ship captain",
      "Weathered competence, steady not theatrical",
    ],
    clothing: "Arkship captain’s uniform — clean lines, rank tabs, practical belt kit",
    setting: "Bridge console glow",
    prompt: `${STYLE} Portrait of Captain Dejean, a 59-year-old woman commanding a human generation arkship: weathered older woman with grey hair, a lined careworn face and a calm competent expression, wearing a clean grey arkship captain’s uniform with subtle rank tabs. Steady professional, not politician. Upper-body portrait, cool bridge console lighting. No text, no lettering, no name plate, no insignia text anywhere in frame.`,
    inference: [
      "Skin tone and hair length are not fixed by the novel — her sex, her grey hair and the haggard face are",
    ],
    sources: [
      "Novel: “Dejean placed her hand on a panel… ‘Palm ID lock,’ she told him”; “seeing her with gray hair and a face that was noticeably haggard”; “You’ve made me one happy old lady”",
      "Wiki article `pages/characters/dejean.html`",
    ],
    image: "assets/images/characters/dejean.jpg",
  },
  {
    slug: "elsbeth-mcquillan",
    title: "Elsbeth McQuillan",
    kind: "character",
    clade: "Baseline human specialist",
    role: "Owner-commander of tank Hell Welcomes Careful Drivers; drive-team boss",
    cues: [
      "**Her eyes are light-grey cymech spheres** — replaced, not organic, and blank enough that Ellie cannot read her expression from them",
      "Fearless ground-combat specialist",
      "Tank commander grit, not court elegance",
    ],
    clothing: "Armoured tanker coveralls, headset, gauntlets; dust and carbon scoring",
    setting: "Dim vehicle bay / red combat interior light",
    prompt: `${STYLE} Portrait of Elsbeth McQuillan, fearless tank commander of Hell Welcomes Careful Drivers: tough woman in armoured tanker coveralls and headset, gauntlets, carbon scoring on gear, confident battlefield expression — and in place of natural eyes, two smooth featureless light-grey mechanical spheres set in her sockets, unreadable. Ground-war specialist aesthetic. Upper-body portrait, red-tinged vehicle-bay lighting.`,
    inference: [
      "Age, hair and skin tone are not stated — mid-thirties to forties professional",
      "The cymech eyes are the one fixed feature and must survive regeneration",
    ],
    sources: [
      "Novel, p. 452: “Her eyes were light gray cymech spheres, so Ellie couldn’t tell if she was…” — named in the next line by Binopal as “Elsbeth McQuillan… just about the finest drive team boss we got”",
      "Wiki article `pages/characters/elsbeth-mcquillan.html`",
    ],
    image: "assets/images/characters/elsbeth-mcquillan.jpg",
  },
  {
    slug: "terence-wilson-fletcher",
    title: "Terence Wilson-Fletcher",
    kind: "character",
    clade: "Baseline/Uranic-adjacent human detective (~24)",
    role: "Santa Rosa detective; later intelligence head carrying Makaio-Spirit",
    cues: [
      "Young detective ~24, sharp observant face",
      "Human-scale investigator, not court aristocrat",
      "Later host to archon spirit — keep portrait pre-glow, human detective first",
    ],
    clothing: "Gondiar city detective layers — smart-casual coat, neural-link earpiece optional",
    setting: "Rain-slick Santa Rosa night streets soft-focus",
    prompt: `${STYLE} Upper-body portrait of Terence Wilson-Fletcher, a 24-year-old detective on a far-future colony city: sharp-eyed young man with a thoughtful intense expression, short neat hair, a dark weatherproof investigator overcoat cut with a standing collar and seamed panels over civilian layers, subtle earpiece — NOT a trench coat, no notch lapels, no storm flap, no belted waist. ${FAR_FUTURE_DRESS} Human investigator aesthetic. A rain-wet street at night behind him, thrown far out of focus into soft coloured bokeh with no legible shapes — no shop signs, no neon lettering, no billboards, no screens. ${NO_TEXT_ANYWHERE}`,
    inference: ["Exact ethnicity not fixed — mixed urban Gondiar look"],
    image: "assets/images/characters/terence-wilson-fletcher.jpg",
  },

  // —— Jalgori-Tobu family ——
  {
    slug: "otylia-jalgori-tobu",
    title: "Otylia Jalgori-Tobu",
    kind: "character",
    clade: "Uranic aristocrat (Finn’s twin)",
    role: "Minsterialis of Serki; institutional counterpoint to Finn",
    cues: [
      "Young woman twin to Finn ~25",
      "Uranic neural ports subtle",
      "Grounded administrative presence vs Finn’s restlessness",
    ],
    clothing: "Uranic ministerial formalwear — clean tailored coat, estate colours",
    setting: "Palace/ministerial office soft light",
    prompt: `${STYLE} Portrait of Otylia Jalgori-Tobu, a 25-year-old Uranic aristocratic twin sister and political manager: composed young woman with an intelligent steady expression, tailored ministerial coat in deep teal and black. She is the twin of Finn Jalgori-Tobu and must share his ancestry and colouring — the same East Asian features and straight black hair, fair, pale, light-toned skin — not warm, not medium, not tan — and the family's INTENSE GREEN EYES, vivid green, identical across the immediate family. At the temples and running back along the skull, quiescent bloodstone buds and node connections are embedded in the skin: small dormant calcium-growth nodes in faint turquoise and gold, part of the body rather than metal sockets or hardware, never chunky black tech ports — differing in affect, not in family resemblance. Institutional calm. Upper-body portrait, soft palace office light.`,
    inference: [
      "Family resemblance to Finn is stated in the wiki (twin), so colouring is locked to his in the prompt itself — not left to the generator",
    ],
    image: "assets/images/characters/otylia-jalgori-tobu.jpg",
  },
  {
    slug: "zelinda-jalgori-tobu",
    title: "Zelinda Jalgori-Tobu",
    kind: "character",
    clade: "Uranic aristocrat (heir)",
    role: "First daughter and heir; pragmatic family leader",
    cues: [
      "Slightly older-sister gravitas among siblings",
      "Uranic client aristocracy",
      "Pragmatic loyalty to family rule",
    ],
    clothing: "Formal heir dress of Gondiar client nobility — rich but not Celestial-scale robes",
    setting: "Estate salon with livestone architectural hint",
    prompt: `${STYLE} Portrait of Zelinda Jalgori-Tobu, Uranic aristocratic heir of a client noble family: composed young woman with a pragmatic confident expression, elegant deep-burgundy formal gown. She is the elder sister of Finn and Otylia Jalgori-Tobu and shares the family's ancestry and colouring — East Asian features and straight black hair, fair, pale, light-toned skin — not warm, not medium, not tan — and the family's INTENSE GREEN EYES, vivid green, identical across the immediate family. At the temples and running back along the skull, quiescent bloodstone buds and node connections are embedded in the skin: small dormant calcium-growth nodes in faint turquoise and gold, part of the body rather than metal sockets or hardware, never chunky black tech ports. Upper-body portrait, warm salon light and subtle livestone wall texture.`,
    inference: [
      "Sister to Finn and Otylia, so colouring is locked to the family's in the prompt itself — not left to the generator",
    ],
    image: "assets/images/characters/zelinda-jalgori-tobu.jpg",
  },

  // —— Imperial Celestial queens & court ——
  {
    slug: "helena-chione",
    title: "Helena-Chione",
    kind: "character",
    clade: "Imperial Celestial queen (~3 m humanoid scale)",
    role: "Now and Forever Queen of Wynid; next-in-line empress",
    cues: [
      "**Intense green eyes** — her line’s one shared feature; her daughters inherit exactly this and nothing else",
      "**Three metres tall, the tallest of her court** — her datamaster at 2.5 m is explicitly shorter",
      "**Modest gold-and-turquoise bloodstone ornamentations**, worn deliberately restrained and kept level",
      "Tall elegant post-human woman — elongated regal proportions, long limbs",
      "Strategic calm, not Thyra’s hardline cruelty",
    ],
    clothing:
      "Court dress restrained by queenly choice — modest gold-and-turquoise bloodstone ornamentation. Her Coronation regalia is separate and far grander: nanoactive armour thinner than skin under an emerald polonaise robe embroidered with gold and platinum that glows from within",
    setting: "Wynid court livestone hall, cool luminous architecture",
    prompt: `${STYLE} Upper-body portrait of Helena-Chione, Imperial Celestial Now and Forever Queen of Wynid. HER BLOODSTONE IS MODEST AND RESTRAINED: one small collar ornament only — not a crown, not a tiara, not a spray, not a matching suite of necklace, earrings and bracelets. She is the least ornamented queen at court, and that restraint is the point. Extremely tall elegant post-human woman with elongated regal proportions and long limbs, luminous pale skin, striking intense green eyes, serene strategic expression, wearing an emerald polonaise robe embroidered with glowing gold and platinum thread, with ${bloodstone("modest, restrained collar ornament", "gold and turquoise")}. Godlike court beauty, restrained rather than gaudy, emphasizing height, soft livestone palace glow. ${NO_TEXT_ANYWHERE}`,
    inference: [
      "Face shape and skin tone are not described — serene post-human beauty as clade default",
      "Hair is not stated for her specifically; her daughters have “a variety of hair and skin colors”, so the clade is not uniformly bald",
    ],
    sources: [
      "Novel, prologue/ch. 1: “at three meters she was the tallest of her court”; “her modest gold-and-turquoise bloodstone ornamentations”; daughters “sharing the same intense green eyes”; Coronation regalia “an emerald polonaise robe embroidered with gold and platinum thread”",
      "Wiki article `pages/characters/helena-chione.html`",
    ],
    image: "assets/images/characters/helena-chione.jpg",
  },
  {
    slug: "thyra",
    title: "Thyra",
    kind: "character",
    clade: "Imperial Celestial congregant → queen (Helena-Thyra)",
    role: "Usurping Queen of Wynid; hardline mindline seizer",
    cues: [
      "Younger Celestial woman than Helena; congregant-trial survivor",
      "Hardline cunning, ruthless eyes",
      "**She has hair, worn long and dressed** — braided or bound into tresses, not bald",
      "**Congregant hair styling is functional**: tresses are bound around her bloodstone spurs to keep them out of the way, and braids are arranged to leave the neural pad at the nape of her neck exposed",
      "As a daughter of Helena’s line she should carry the family’s **intense green eyes**",
    ],
    clothing: "Sharp black-and-crimson royal armour-robes, bloodstone crown-collar, military severity",
    setting: "Throne-side shadow with fleet viewport",
    prompt: `${STYLE} Portrait of Thyra as Helena-Thyra, Imperial Celestial usurper queen and daughter of Helena-Chione: tall post-human young woman with elongated elegant features, a long neck, luminous pale skin of the Wynid royal line and cold ruthless intense green eyes, her long dark hair dressed in artful braids bound around the bloodstone spurs at her head and drawn up to leave the neural pad at the nape of her neck exposed, wearing sharp black and crimson armour-robes with ${bloodstone("collar-crown")}. Hardline power. Upper-body portrait, dramatic side lighting and fleet viewport glow.`,
    inference: [
      "Youth vs Helena — younger adult Celestial",
      "The braid/spur/nape-pad styling comes from preview snippets whose surrounding sentence is cut; it is certainly congregant court styling, and most likely hers. Treat it as clade-safe rather than uniquely Thyra",
      "Green eyes are inherited from Helena’s line by the daughters described at the Coronation, not stated for Thyra by name",
    ],
    image: "assets/images/characters/thyra.jpg",
  },
  {
    slug: "clavissa",
    title: "Clavissa",
    kind: "character",
    clade: "Imperial Celestial congregant daughter",
    role: "Daughter of Helena and Jolav; survivor sidelined by Thyra",
    cues: [
      "Celestial young woman, court sibling of Thyra",
      "Less triumphant — residual loyalist / survivor affect",
      "Tall Imperial humanoid proportions",
    ],
    clothing: "Softer court dress than Thyra — silver-blue congregant robes, modest bloodstone accents",
    setting: "Quieter court gallery light",
    prompt: `${STYLE} Upper-body portrait of Clavissa, Imperial Celestial congregant daughter of Queen Helena-Chione. SHE HAS HER MOTHER’S INTENSE GREEN EYES: vivid green, the one feature every daughter of Helena inherits — not grey, not blue. Tall elegant post-human young woman with elongated proportions and a long neck, luminous pale skin of the Wynid royal line, careful wary expression, silver-blue court robes, ${bloodstone("modest collar ornament")}, elongated proportions. Survivor of succession culture, not the usurper, soft gallery light. ${NO_TEXT_ANYWHERE}`,
    inference: [],
    image: "assets/images/characters/clavissa.jpg",
  },
  {
    slug: "carolien-amaia",
    title: "Carolien-Amaia",
    kind: "character",
    clade: "Imperial Celestial empress / Verak queen",
    role: "Now and Forever Queen of Verak holding rotating imperial throne",
    cues: [
      "**Her host body is seventeen years old** at the Coronation — young, not matronly, whatever the sixty-year term implies",
      "**Glossy raven hair hanging almost to her waist**",
      "**A long face, with skin so white she could pass for albino**",
      "Peak Imperial Celestial sovereign at Kelowan Palace; empress-scale presence",
    ],
    clothing: "Imperial palace regalia — deep indigo and platinum, heavy bloodstone mantle",
    setting: "Imperial Palace mountain-engulfing architecture suggestion",
    prompt: `${STYLE} Upper-body portrait of Carolien-Amaia, Imperial Celestial empress of the Crown Dominion. SHE IS SEVENTEEN YEARS OLD: the face must be an adolescent girl's — smooth unlined youthful skin, soft round cheeks, no age lines, no gauntness, not a middle-aged or mature woman. A strikingly young long face, skin so white she could almost be albino, and glossy raven-black hair hanging straight almost to her waist. Calm commanding expression — absolute imperial authority worn on a teenager's face, and that contrast is the point of the picture. Deep indigo and platinum imperial robes, ${bloodstone("heavy mantle")}, elongated post-human proportions. Plain grand palace light, uncluttered background, no heraldic emblems, no crowns, no repeated motifs, no banners, no portraits or murals behind her.`,
    inference: [
      "Eye colour is not stated for her",
      "The unsettling gap between a seventeen-year-old host and an empress of the Crown Dominion is the point of the description — do not age her up",
    ],
    sources: [
      "Novel, p. 67: “Her new host body was young: seventeen years. Glossy raven hair hung almost to her waist, framing a long face with skin so white she could have been albino”",
      "Wiki article `pages/characters/carolien-amaia.html`",
    ],
    image: "assets/images/characters/carolien-amaia.jpg",
  },
  {
    slug: "luus",
    title: "Luus",
    kind: "character",
    clade: "Imperial Celestial queen (Bassa)",
    role: "Now and Forever Queen of Bassa; prior empress at coronation hinge",
    cues: [
      "**A beguilingly young face** — the narration notes how wrong a smile of triumph looks on it",
      "Peer queen of Crown Accord; Imperial humanoid tall form",
      "Politically the senior hand, whatever the face suggests",
    ],
    clothing: "Bassa royal colours — emerald and gold court robes with bloodstone diadem",
    setting: "Coronation-era court",
    prompt: `${STYLE} Upper-body portrait of Luus-Marcela, Imperial Celestial Now and Forever Queen of Bassa. SHE HAS THE FACE OF A GIRL OF ABOUT SEVENTEEN: smooth unlined youthful skin, soft round cheeks, no age lines, no crow's feet, no gauntness, not a middle-aged or mature woman. On that beguilingly young, almost girlish face she wears an expression of hard political triumph that does not belong on it, and that contrast is the point of the picture. Tall elegant post-human sovereign, emerald and gold robes with ${bloodstone("diadem")}. Plain even light, uncluttered background, no heraldic emblems, no crests, no repeated motifs, no banners, no murals, no floating symbols or runes.`,
    inference: [
      "Hair and eye colour are not stated for her",
      "The 'dark olive skin and classic titian hair, cropped short' in the same passage belongs to **a princess Luus selected to taunt the empress**, not to Luus — do not attribute it to her",
    ],
    sources: [
      "Novel, p. 68: “Luus-Marcela sat beside Helena-Chione and awarded Zuberi-Dulcina’s skeleton an undisguised smile of triumph that looked so wrong on such a beguilingly young face”",
      "Wiki article `pages/characters/luus.html`",
    ],
    image: "assets/images/characters/luus.jpg",
  },
  {
    slug: "inessa-pierina",
    title: "Inessa-Pierina",
    kind: "character",
    clade: "Imperial Celestial queen (Cheluli)",
    role: "Now and Forever Queen of Cheluli",
    cues: [
      "**Her head is framed by a starburst of orange bloodstone horns**, which the narration likens to a crude sculpture",
      "Growls rather than speaks in council — the least polished of the peer queens",
      "Peer queen seat under Imperial Accord; tall Imperial humanoid",
    ],
    clothing: "Cheluli court white-and-copper robes, under a radiating orange bloodstone headpiece",
    setting: "Formal queen portrait backdrop",
    prompt: `${STYLE} Upper-body portrait of Inessa-Pierina, Imperial Celestial queen of Cheluli. HER BLOODSTONE IS ORANGE, NOT TURQUOISE AND NOT GREEN: a wide starburst of burnt-orange bloodstone horns radiating outward all around her head like a crude, heavy, unfinished sculpture — a matte porous calcium growth of the body, never a cut, faceted or polished gemstone, never set in metal like jewellery. Tall post-human regal woman with a blunt, impatient expression, white and copper court robes. The least polished of the peer queens. Plain even light, uncluttered background, no heraldic emblems, no crests, no repeated motifs, no banners, no murals, no floating symbols or runes.`,
    inference: [
      "Hair, skin and eye colour are not stated — the orange horns are, and they are the one thing that distinguishes her silhouette",
      "Her orange is why the shared `BLOODSTONE` default says colour varies: it is not turquoise-and-gold for everyone",
    ],
    sources: [
      "Novel, p. 68: “Her head was framed by a starburst of orange bloodstone horns, resembling a crude sculpture…”",
      "Wiki article `pages/characters/inessa-pierina.html`",
    ],
    image: "assets/images/characters/inessa-pierina.jpg",
  },
  {
    slug: "ramona-ursule",
    title: "Ramona-Ursule",
    kind: "character",
    clade: "Imperial Celestial queen (Nizinsk)",
    role: "Now and Forever Queen of Nizinsk; hosts politics trial elevating Thyra",
    cues: ["Peer queen; trial-host authority", "Tall Imperial humanoid"],
    clothing: "Nizinsk court amethyst and silver robes, judicial bloodstone staff-collar",
    setting: "Politics-trial chamber light",
    prompt: `${STYLE} Portrait of Ramona-Ursule, Imperial Celestial queen of Nizinsk: tall post-human woman with sharp assessing eyes, amethyst and silver robes, ${bloodstone("collar")}. Host of multi-dominion politics trial, cool chamber light. ${NO_TEXT_ANYWHERE}`,
    inference: [],
    image: "assets/images/characters/ramona-ursule.jpg",
  },
  {
    slug: "zuberi-dulcina",
    title: "Zuberi-Dulcina",
    kind: "character",
    clade: "Imperial Celestial queen (historical)",
    role: "Fallen Queen of Kelowan; trauma of the Imperial Accord era",
    cues: [
      "Historical figure — war queen who pushed further evolution",
      "Memorial/tragic grandeur rather than living court polish",
      "Tall Imperial humanoid",
    ],
    clothing: "War-era Imperial armour-robes in blackened gold, cracked bloodstone crown",
    setting: "Dim historical haze, ruined glory",
    prompt: `${STYLE} Upper-body portrait of Zuberi-Dulcina, historical Imperial Celestial queen of Kelowan. ABSOLUTELY NO SYMBOLS ANYWHERE: no runes, no glyphs, no floating characters, no sunburst or star emblems, no heraldry, no inscriptions, no lettering of any kind, in the air or on the walls or on her armour. Tall post-human war sovereign with a tragic commanding expression, blackened-gold armour robes, ${bloodstone("cracked crown")}. Fallen empire grandeur, smoky dramatic light, plain uncluttered background.`,
    inference: [
      "Historical reconstruction — the novel gives no portrait of her alive",
      "**Her skeleton is physically present** in the Council of the Empress chamber, and Luus-Marcela smiles at it in triumph. A memorial plate of the displayed remains would be better sourced than this imagined living portrait",
    ],
    sources: [
      "Novel, p. 68: “Luus-Marcela… awarded Zuberi-Dulcina’s skeleton an undisguised smile of triumph”",
      "Wiki article `pages/characters/zuberi-dulcina.html`",
    ],
    image: "assets/images/characters/zuberi-dulcina.jpg",
  },
  {
    slug: "bekket",
    title: "Bekket",
    kind: "character",
    clade: "Imperial Celestial lord (Uixic / Zuberi-linked)",
    role: "Father of Thyra (“Oneshot”); power behind Helena-Thyra court",
    cues: [
      "**Long auburn hair, mildly unkempt**, which gives him “a slightly wild appearance” unlike the rest of the court",
      "**Tall, but not quite Helena-Chione's height** — so under three metres",
      "**A young count** when Helena takes him; “hardly her usual type”",
      "Mocked as Oneshot for single-child siring vs clutch norms; political schemer",
    ],
    clothing: "Dark court suit with bloodstone cuff growths, Uixic noble cut",
    setting: "Shadowed court corridor",
    prompt: `${STYLE} Upper-body portrait of Lord Bekket, Imperial Celestial court schemer and father of a usurper queen. HIS HAIR IS LONG, LOOSE, UNKEMPT AND AUBURN: coppery red-brown, falling well past his collar and deliberately untidy — not black, not dark brown, not short, not slicked back, not tied up. It gives him a slightly wild, un-courtly look, deliberately less groomed than everyone around him. A young post-human man, tall but not the tallest, with a calculating half-smile. Dark tailored court suit, ${bloodstone("pair of cuff ornaments")}. Plain even light, uncluttered background, no heraldic emblems, no crests, no repeated motifs, no banners, no murals, no floating symbols or runes.`,
    inference: [
      "Eye colour and skin tone are not stated — the auburn hair, its unkempt length and his youth are",
    ],
    sources: [
      "Novel, p. 56: “He was tall, if not quite her height. His auburn hair was long and mildly unkempt, which gave him a slightly wild appearance so different from the other…”; p. 70: “The young count was hardly her usual type”",
      "Wiki article `pages/characters/bekket.html`",
    ],
    image: "assets/images/characters/bekket.jpg",
  },
  {
    slug: "lord-gahiji",
    title: "Lord Gahiji",
    kind: "character",
    clade: "Imperial Celestial archon",
    role: "Chief Archon to Helena-Chione; political acumen",
    cues: [
      "**Grey-and-silver robes of state that hang “like badly fitting curtains”** — he wears them badly, and the queen privately smiles at it",
      "**Deliberately minimal bloodstone**: a headdress spur that is “little more than a cap of black and green curlicues”, concealing his spine connection patch",
      "Under-decorated on purpose — he pays minimal observance to court decorum and is senior enough to get away with it",
      "Senior male Celestial statesman; court mind, not battlefield glory",
    ],
    clothing: "Grey-and-silver robes of state, ill-fitting; small black-and-green bloodstone cap over the spine patch",
    setting: "Council chamber",
    prompt: `${STYLE} Portrait of Lord Gahiji-Calder, Chief Archon to an Imperial Celestial queen: tall post-human older man with shrewd political eyes and elongated proportions, wearing grey-and-silver robes of state that hang loose and ill-fitting like badly hung curtains, and only a small cap of black-and-green bloodstone curlicues on his head instead of a grand headdress. Deliberately under-dressed for court. Statesman not soldier. Upper-body portrait, cool council light.`,
    inference: [
      "Face and skin tone not described",
      "The novel styles him **Gahiji-Calder**; the wiki page title is `Lord Gahiji`",
    ],
    sources: [
      "Novel, ch. 1: “his gray-and-silver robes of state hanging like badly fitting curtains”; “His bloodstone headdress spur was little more than a cap of black and green curlicues that concealed his spine connection patch”",
      "Wiki article `pages/characters/lord-gahiji.html`",
    ],
    image: "assets/images/characters/lord-gahiji.jpg",
  },
  {
    slug: "lord-jolav",
    title: "Lord Jolav",
    kind: "character",
    clade: "Imperial Celestial consort",
    role: "Consort to Helena-Chione; father of Clavissa; residual opposition",
    cues: ["Male consort of queen", "Quiet opposition after coup", "Tall Imperial humanoid"],
    clothing: "Consort court dress — restrained silver-black, bloodstone wedding band ornaments",
    setting: "Private court anteroom",
    prompt: `${STYLE} Portrait of Lord Jolav, Imperial Celestial consort to a queen: tall elegant post-human man with restrained worried dignity, silver-black consort robes, ${bloodstone("subtle collar ornament")}. Quiet opposition energy. Upper-body portrait, soft anteroom light.`,
    inference: [],
    image: "assets/images/characters/lord-jolav.jpg",
  },
  {
    slug: "valdier",
    title: "Lord Valdier",
    kind: "character",
    clade: "Imperial Celestial elder",
    role: "Father of Helena-Chione; Master of the Court",
    cues: ["Older generation of Wynid protocol", "Master of Court formality", "Tall Imperial humanoid elder"],
    clothing: "Heavy Master of the Court robes, protocol staff-collar of bloodstone",
    setting: "Coronation introduction chamber",
    prompt: `${STYLE} Portrait of Lord Valdier, elderly Imperial Celestial Master of the Court and royal father: tall post-human elder man with formal austere expression, heavy ceremonial robes, ${bloodstone("protocol collar")}. Old-guard court. Upper-body portrait, formal gold light.`,
    inference: [],
    image: "assets/images/characters/valdier.jpg",
  },
  {
    slug: "stethos-thierry",
    title: "Lord Stethos-Thierry",
    kind: "character",
    clade: "Imperial Celestial datamaster",
    role: "Court datamaster permanently interfaced for Helena-Chione",
    cues: [
      "**Scarlet-and-grey robes flaring out into a high collar** that almost touches the bloodstone on his skull",
      "**Bloodstone petals embellishing his skull** — calcium swirls, not machinery, and they cover the permanent connection bulb melded with the neural interface patch at the top of his spine",
      "**Two and a half metres tall** — explicitly shorter than his three-metre queen",
      "Permanently connected to networks; information-officer stillness",
    ],
    clothing: "Scarlet-and-grey robes with a wide flared collar; bloodstone petals over the crown and spine patch",
    setting: "Data-hall soft hologlyphs (no readable text)",
    prompt: `${STYLE} Portrait of Lord Stethos-Thierry, Imperial Celestial court datamaster: post-human man two and a half metres tall with calm vacant-focused expression, wearing scarlet-and-grey robes that flare out into a tall stiff collar rising almost to his head, his skull embellished with swirled petals of pale bloodstone that cover a connection bulb at the nape of his spine. Organic crystalline growth, not metal machinery. Upper-body portrait, cool holographic bokeh without readable text.`,
    inference: [
      "Face, skin tone and hair are not described",
      "The delivered portrait renders his interface as metal implants and fibre-optic cable; the novel makes it bloodstone",
    ],
    sources: [
      "Novel, ch. 1: “At two and a half meters tall he was shorter than his queen… His scarlet-and-gray robes flared out into a collar that almost touched the bloodstone petals that embellished his skull. The calcium swirls… covered the permanent connection bulb melded with the neural interface patch at the top of his spine”",
      "Wiki article `pages/characters/stethos-thierry.html`",
    ],
    image: "assets/images/characters/stethos-thierry.jpg",
  },
  {
    slug: "siskala",
    title: "Siskala",
    kind: "character",
    clade: "Imperial Celestial (new life / military)",
    role: "Major of the Wynid Royal Tiger Guard; daughter of Helena (not mindline host)",
    cues: [
      "Military professional face of court",
      "Daughter of queen but not congregant mindline rival",
      "Tall Celestial athletic build",
    ],
    clothing: "Royal Tiger Guard armour — feline-motif plates, dark gold and black, practical helm under arm",
    setting: "Palace guard corridor",
    prompt: `${STYLE} Upper-body portrait of Major Siskala of the Wynid Royal Tiger Guard, a daughter of Queen Helena-Chione. SHE IS AN IMPERIAL CELESTIAL, NOT A HUMAN SOLDIER: unnaturally tall with elongated proportions, long limbs and a notably long neck, holding her mother’s upright regal poise even in armour — no ordinary human soldier build, no thick neck, no slouch. SHE HAS HER MOTHER’S INTENSE GREEN EYES: vivid green, the one feature every daughter of Helena inherits — not brown, not hazel, not blue. Luminous pale post-human skin of the Wynid royal line, so she reads unmistakably as Helena-Chione’s daughter. Athletic woman warrior, sharp professional expression, dark gold and black guard armour carrying one small tiger-head unit badge and no other repeated emblem, helmet under arm. ${BLOODSTONE_GUARD}. Court military, not queen, cool corridor light. ${noTextAnywhere("the single small tiger-head badge of the Royal Tiger Guard described above")}`,
    inference: [],
    image: "assets/images/characters/siskala.jpg",
  },
  {
    slug: "makaio",
    title: "Makaio",
    kind: "character",
    clade: "Imperial Celestial archon (multi-host mindline)",
    role: "Spymaster of Helena-Chione; Makaio-Yalbo → Makaio-Faraji",
    cues: [
      "**Terminal-stage bloodstone**: after eighteen months of growth it covers most of his skull and cheeks, leaving only mouth, nose and eyes clear",
      "**A crown of scalloped horns** wound out from that base, curling around each other, in faint hues of turquoise and gold",
      "**The rest of the body brocaded under a formal toga**, bloodstone spreading along the limbs in a lacework pattern that is making movement difficult",
      "**The bloodstone prevents any significant facial expression**, and shrouds the neck so he can barely incline his head",
    ],
    clothing: "Formal toga over bloodstone lacework; the growth, not the cloth, is the costume",
    setting: "Shipboard intelligence suite (Alumata feel)",
    prompt: `${STYLE} Portrait of Makaio-Yalbo, Imperial Celestial archon spymaster near the end of his host body: tall post-human man whose skull and cheeks are almost entirely encased in pale calcium-like bloodstone, leaving only his mouth, nose and piercing eyes uncovered, with a crown of scalloped horns curling around one another above it, faintly tinted turquoise and gold; his neck and body are brocaded with the same growth in a lacework pattern beneath a formal toga. Rigid, expressionless, immensely powerful. Upper-body portrait, dim shipboard intelligence-suite light.`,
    inference: [
      "This is the **Yalbo** host at the end of its life. The grown **Faraji** host is described separately: “an easy two and a half meters high, with a flattish face and wide, gold-tinged eyes”. Either is defensible for the portrait — pick one and say which",
      "Yalbo's skin tone is not described; Faraji's eyes are",
    ],
    sources: [
      "Novel, prologue: “expanding to cover most of his skull and cheeks, leaving only his mouth, nose, and eyes unencumbered. From that base a crown of scalloped horns had wound their way out… with faint hues of turquoise and gold. The rest of his body, beneath the formal toga he wore, was equally brocaded by growths of bloodstone”; “The bloodstone prevented any significant facial expression”",
      "Novel, p. 225 (adult Faraji host): “Makaio-Faraji was an easy two and a half meters high, with a flattish face and wide, gold-tinged eyes”",
      "Wiki article `pages/characters/makaio.html`",
    ],
    image: "assets/images/characters/makaio.jpg",
  },
  {
    slug: "neusch",
    title: "Neusch",
    kind: "character",
    clade: "Imperial Celestial (archon household)",
    role: "Son of Makaio-Faraji; continues investigation with neural gifts",
    cues: ["Younger male Celestial of archon line", "Neural gifts visible as interface glow", "Residual opposition"],
    clothing: "Junior archon household attire — dark slim coat, neural-gift collar lights",
    setting: "Quiet investigation chamber",
    prompt: `${STYLE} Portrait of Neusch, young Imperial Celestial son of a spymaster archon: tall young post-human man with intense focused eyes, dark slim coat, glowing neural-gift collar, elongated proportions. ${BLOODSTONE_GUARD}. Investigator heir energy. Upper-body portrait, cool chamber light.`,
    inference: [],
    image: "assets/images/characters/neusch.jpg",
  },
  {
    slug: "asahi-iryna",
    title: "Asahi-Iryna",
    kind: "character",
    clade: "Imperial Celestial archon (hardline)",
    role: "Replaces Makaio’s Wynid oversight under hardliners; pursues Diligent",
    cues: ["Hardline apparatus archon", "Tall Imperial humanoid", "Navy-adjacent severity"],
    clothing: "Hardline archon uniform-robes in black and Wynid crimson",
    setting: "Fleet command antechamber",
    prompt: `${STYLE} Portrait of Asahi-Iryna, hardline Imperial Celestial archon: tall post-human figure with severe expression, black and crimson archon uniform-robes, ${bloodstone("severe shoulder spur")}, elongated proportions. Ruthless oversight, cold fleet light. ${NO_TEXT_ANYWHERE}`,
    inference: [
      "Gender presentation as androgynous-elegant Celestial unless wiki specifies; page name reads feminine — present as woman. **Unverified: this is a guess from the name, not from the text.** Dejean was inferred male the same way and the novel makes her a woman — confirm against the book before regenerating.",
    ],
    image: "assets/images/characters/asahi-iryna.jpg",
  },
  {
    slug: "avone-valerio",
    title: "Avone-Valerio",
    kind: "character",
    clade: "Imperial Celestial navy general",
    role: "Commands hardline navy lockdown of Gondiar",
    cues: ["Military general of Crown navy", "Ghost units / occupation authority", "Tall Imperial humanoid"],
    clothing: "Celestial navy general armour — angular plates, rank glyphs (no readable text), dark steel-blue",
    setting: "Occupation HQ / navy bridge",
    prompt: `${STYLE} Upper-body portrait of General Avone-Valerio, Imperial Celestial navy commander. HE IS AN IMPERIAL CELESTIAL, NOT A HUMAN SOLDIER: unnaturally tall with elongated limbs and a long neck, pale refined post-human features, no stubble, no weathered human soldier face, no military crest or mohawk. NO LETTERING OR PLAQUES ANYWHERE: rank is shown by plain unmarked metal, never by inscribed bars, ribbons, badges or repeated emblems. Cold commanding expression, angular steel-blue navy armour plates. ${BLOODSTONE_GUARD}. Plain even light, uncluttered background, no heraldic emblems, no crests, no repeated motifs, no banners, no murals, no floating symbols or runes.`,
    inference: [
      "Presented as masculine general. **Unverified: this is a guess from the name, not from the text.** Dejean was inferred male the same way and the novel makes her a woman — confirm against the book before regenerating.",
    ],
    image: "assets/images/characters/avone-valerio.jpg",
  },
  {
    slug: "acelynn",
    title: "Acelynn",
    kind: "character",
    clade: "Imperial Celestial chief archon (Verak)",
    role: "Chief Archon to Carolien-Amaia of Verak",
    cues: ["Verak counterpart to Gahiji", "Major Crown mindline", "Tall Imperial humanoid"],
    clothing: "Verak chief-archon robes — indigo and silver, mindline crest",
    setting: "Imperial Palace Verak wing",
    prompt: `${STYLE} Portrait of Acelynn, Chief Archon to the Verak queen and imperial throne: tall post-human Celestial with composed political expression, indigo and silver archon robes, ${bloodstone("mindline crest")}. Senior crown mindline. Upper-body portrait, palace light.`,
    inference: [
      "Present as woman per name convention in wiki. **Unverified: this is a guess from the name, not from the text.** Dejean was inferred male the same way and the novel makes her a woman — confirm against the book before regenerating.",
    ],
    image: "assets/images/characters/acelynn.jpg",
  },
  {
    slug: "radwarno",
    title: "Radwarno",
    kind: "character",
    clade: "Imperial Celestial navy commander (Verak)",
    role: "Leads Verak fleet elements at Kelowan; ordered to capture Diligent",
    cues: ["Fleet commander", "Tall Imperial humanoid", "Capture-order severity"],
    clothing: "Verak fleet commander armour-coat, helium-navy colours",
    setting: "Kelowan fleet formation viewport",
    prompt: `${STYLE} Upper-body portrait of Commander Radwarno, Verak Imperial Celestial fleet officer. HE IS AN IMPERIAL CELESTIAL, NOT A HUMAN SOLDIER: unnaturally tall with elongated limbs and a long neck, pale refined post-human features, no stubble, no scarred human soldier face, no military crest. Stern focused expression, dark navy armour-coat with helium-blue accents, elongated proportions. ${BLOODSTONE_GUARD}. Fleet capture authority, starfield fleet light. ${NO_TEXT_ANYWHERE}`,
    inference: [],
    image: "assets/images/characters/radwarno.jpg",
  },
  {
    slug: "dagon",
    title: "Dagon",
    kind: "character",
    clade: "Imperial Celestial operator (Thyra’s uncle)",
    role: "Offworld operator in gang networks; Gyvoy imposture network",
    cues: [
      "Celestial who can pass in human underworld contexts via disguise/cover",
      "Reveal: Thyra’s uncle — still Imperial clade",
      "Dangerous dual face: court blood + street cover",
    ],
    clothing: "Layered deniable merchant coat over Celestial under-armour, half-shadowed face",
    setting: "Santa Rosa underworld night",
    prompt: `${STYLE} Portrait of Dagon, Imperial Celestial covert operator posing in human underworld networks: tall elegant man with predatory calm eyes, layered dark merchant coat over subtle high-tech under-armour, elongated post-human proportions barely hidden. ${BLOODSTONE_GUARD}. Dual-face spy. Upper-body portrait, neon underworld bokeh.`,
    inference: [],
    image: "assets/images/characters/dagon.jpg",
  },
  {
    slug: "malquilvo",
    title: "Malquilvo",
    kind: "character",
    clade: "Imperial Celestial court parent",
    role: "Wynid court figure; parent of Valeri killed in trial",
    cues: ["Grief and accusation at court", "Tall Imperial humanoid", "Secondary court presence"],
    clothing: "Court mourning-leaning greys with bloodstone tear-jewellery",
    setting: "Court public gallery",
    prompt: `${STYLE} Portrait of Malquilvo, Imperial Celestial court parent in mourning and accusation: tall post-human figure with anguished stern expression, grey court robes, ${bloodstone("set of tear-shaped mourning spurs")}. Tragic court politics, cold public-gallery light. ${NO_TEXT_ANYWHERE}`,
    inference: [
      "Present as masculine parent figure. **Unverified: this is a guess from the name, not from the text.** Dejean was inferred male the same way and the novel makes her a woman — confirm against the book before regenerating.",
    ],
    image: "assets/images/characters/malquilvo.jpg",
  },
  {
    slug: "uulana",
    title: "Uulana",
    kind: "character",
    clade: "Imperial Celestial (Uulana-Lyon / hardline cluster)",
    role: "Wynid political cluster: investigator Uulana-Lyon and hardline identity politics",
    cues: ["Composite page for Uulana political line", "Investigative archon severity", "Tall Imperial humanoid"],
    clothing: "Investigator-archon charcoal robes with hardline crimson lining",
    setting: "Ambush-risk corridor of court",
    prompt: `${STYLE} Portrait of Uulana as Wynid Imperial Celestial investigator-archon type: tall post-human figure with sharp vigilant eyes, charcoal robes with crimson lining, ${bloodstone("small collar spur")}. Political investigation under threat, tense corridor light. ${NO_TEXT_ANYWHERE}`,
    inference: ["Page covers multiple hosts/identities — single composite investigator face"],
    image: "assets/images/characters/uulana.jpg",
  },

  // —— Other Celestials ——
  {
    slug: "olomo",
    title: "Olomo",
    kind: "character",
    clade: "Heresy Celestial hexapod (~3 m)",
    role: "Archon of the Heresy Dominion",
    cues: [
      "CRITICAL: spindly hexapod — two legs, FOUR arms, close to three metres tall",
      "**CRITICAL: FOUR EYES**, which blink simultaneously. The delivered portrait has two — this is a canon defect, not a style choice",
      "**The two arm pairs are not alike.** The top set ends in a near-standard hand: four fingers and a thumb, but elongated with three joints apiece. The lower set dangles from the robe like inflexible rope with bulbous elbows, ending in a simple triple claw",
      "**Skull extended into cones on both sides, level with the shoulders** — the brain is inflated, not merely enlarged, and the low body temperature exists to stop it overheating",
      "**Skin almost reptilian**, wrapped so tightly it reads as an exoskeleton, shaded with subtle hues of blue *and green*",
      "Multilayered robe; neural induction pad in the palm for greeting",
    ],
    clothing: "Multilayered archon robe cut for four arms; the lower pair hangs free of it",
    setting: "Large Heresy ship interior with cool blue light",
    prompt: `${STYLE} Portrait of Olomo, archon of the Heresy Dominion: a towering three-metre spindly post-human with TWO legs and FOUR long slim arms, and FOUR EYES set in his face that blink together. Both sides of his skull extend into long cones reaching out level with his shoulders, housing an inflated brain. His skin is almost reptilian, wrapped so tightly over him it looks like an exoskeleton, shaded in subtle blues and greens. His upper pair of hands have four elongated three-jointed fingers and a thumb; his lower pair of arms hang from the robe like stiff ropes with bulbous elbows, ending in simple triple claws. He wears a multilayered dark robe. Clearly non-humanoid Celestial. Upper body showing all four arms and all four eyes, cool blue starship light.`,
    inference: [
      "Robe colour is not stated — dark research finery is the wiki’s inference",
    ],
    sources: [
      "Novel, prologue: “close to three meters tall thanks to a spindly body and six long, slim limbs—two legs and four arms”; “The hand was close to standard in that it had four fingers and a thumb, though the elongated fingers had three joints apiece. His lower set of arms dangled out of the robe like inflexible ropes with bulbous elbows, and their hands were a simple triple claw arrangement”; “both sides of the skull were extended cones that came out level with his shoulders. Skin, such as it was, was almost reptilian, and wrapped his body so tightly it could easily be mistaken for an exoskeleton shaded with subtle hues of blue and green”; “Olomo’s four eyes blinked simultaneously”",
      "Wiki article `pages/characters/olomo.html`",
    ],
    image: "assets/images/characters/olomo.jpg",
  },
  {
    slug: "sahdiah",
    title: "Sahdiah",
    kind: "character",
    clade: "Talloch-Te Celestial archon",
    role: "Archon of Talloch-Te nomad trader dominion; Traveler tasking",
    cues: [
      "**Primary biological body has five eyes** (book ch. 31 — confirmed)",
      "Multi-body Talloch-Te architecture: primary body, secondary bodies, mind partition/re-integration",
      "Can bodymorph; “gravity form” is the less-disturbing human-facing shape",
      "Not Imperial Crown two-eyed beauty; not Heresy hexapod (four arms)",
      "Nurture chamber context for the primary body",
      "Pronouns: she/her (confirmed from reading)",
    ],
    clothing: "Merchant-archon finery — bronze, void-black, ship-sigil jewellery (inference on cut and colour)",
    setting: "Nurture-chamber light on a trader flagship; upper-body portrait",
    prompt: `${STYLE_BASE} Upper-body portrait of Sahdiah, Talloch-Te Celestial archon: a non-human post-human trader intelligence whose primary biological body has exactly five eyes — count carefully: five eyes only, arranged on an elongated alien face, not a two-eyed human. Soft gravity-form silhouette that is still somewhat humanoid but clearly not Imperial Crown beauty and not a Heresy hexapod — no extra arms. Cool merchant-archon presence, bronze and void-black trader finery, subtle ship-sigil jewellery, calculating expression. Setting: dim shipboard nurture-chamber light with soft biotech housing glow behind her. Deniable power, not court pomp. ${NO_TEXT}`,
    inference: [
      "Skin tone, exact five-eye arrangement, and finery colour are not fixed by the novel — only eye count and multi-body clade are",
      "Gravity-form still reads as portraitable rather than fully non-humanoid horror (book distinguishes gravity form as less disturbing)",
    ],
    sources: [
      "Book 1 ch. 31 (five eyes / primary biological body / nurture chamber) — reader-confirmed",
      "Wiki `pages/characters/sahdiah.html`, `pages/factions/talloch-te-dominion.html`",
      "Fandom Talloch-Te Dominion (multi-body, bodymorph, gravity form — cross-check against the novel)",
    ],
    image: "assets/images/characters/sahdiah.jpg",
  },

  // —— Travelers / mercs / underworld ——
  {
    slug: "andino",
    title: "Andino",
    kind: "character",
    clade: "Traveler human captain",
    role: "Captain of Arcadia’s Moon",
    cues: [
      "**Andino is a woman** — she/her throughout, as her wiki article already has it",
      "**She has no eyes.** “Small black lens tubes protruded from the sockets”, and they whirr audibly as they focus",
      "**Slim pistons on either side of her neck**, which extend when she raises her head",
      "Heavily rebuilt: the viewpoint character wonders “what percentage of her skin” is still her own",
      "Working spacer, not court; enigmatic allegiance",
    ],
    clothing: "Traveler captain’s worn coat, harness, ship-tag jewellery",
    setting: "Arcadia’s Moon bridge",
    prompt: `${STYLE} Upper-body portrait of Andino, a WOMAN — a female Traveler starship captain, clearly and unambiguously feminine in face and build, not a man. SHE HAS NO EYES: in place of each eye a small black mechanical lens tube protrudes from an empty socket — do not draw human eyes, irises or pupils anywhere on her face. Slim metal pistons run up either side of her neck. A weathered woman, heavily cybernetic, much of her visible skin reading as synthetic. Worn captain’s coat and harness. Independent, unreadable, formidable. Completely plain dark uncluttered background: no console screens, no display panels, no readouts, no instrument text, no signage, no heraldic emblems, no crests, no patches, no repeated motifs. Absolutely no text, no captions, no labels, no lettering, no logos, no brand marks, no watermarks, no UI chrome.`,
    inference: [
      "Hair, age and the exact extent of the synthetic skin are not described — the lens tubes, the neck pistons and her sex are",
    ],
    sources: [
      "Novel, p. 243: “…eyes; instead small black lens tubes protruded from the sockets. He didn’t know what percentage of her skin…”; p. 297: “Andino raise her head, the slim pistons on either side of her neck extending slowly”; p. 430: “The captain’s eye lens tubes whirred smoothly”",
      "Wiki article `pages/characters/andino.html`",
    ],
    image: "assets/images/characters/andino.jpg",
  },
  {
    slug: "marcellu",
    title: "Marcellu",
    kind: "character",
    clade: "Traveler middleman",
    role: "Fixer for Sahdiah against Diligent ZPZ bid",
    cues: ["Traveler fixer / middleman", "Commercial-deniable look", "Dies by cherenkov blade"],
    clothing: "Sharp commercial spacer suit, too clean for a freighter hand",
    setting: "Dockside negotiation light",
    prompt: `${STYLE} Upper-body portrait of Marcellu, Traveler middleman and archon fixer: slick human man with a wary deal-maker expression, sharp commercial spacer suit, subtle high-tech earpiece. Deniable logistics broker. A dim dockside at night lit only by diffuse coloured haze and reflections — no shopfronts and no lit signs of any kind. ${NO_TEXT_ANYWHERE}`,
    inference: [],
    image: "assets/images/characters/marcellu.jpg",
  },
  {
    slug: "medusa",
    title: "Medusa",
    kind: "character",
    clade: "Human assassin / operative",
    role: "Assassin; Marcellu’s right hand then Sahdiah asset",
    cues: [
      "**Black skin** — the novel dresses her in “tight leather as black as her skin”",
      "**Rainbow hair in long braids threaded with mech filament, which writhe like serpents.** This is where the name comes from and the one thing the portrait cannot omit",
      "Ruthless field assassin; dangerous calm; habitually half an hour late",
    ],
    clothing: "Tight black leather, matched to her skin; knife harness",
    setting: "Dark corridor / ship berth",
    prompt: `${STYLE} Upper-body portrait of Medusa, ruthless human field assassin. HER SKIN IS DEEP BLACK AND HER LONG BRAIDED HAIR IS RAINBOW-COLOURED: many long braids in vivid rainbow colours, threaded with fine mechanical filament so that they stir and coil of their own accord like a nest of serpents. That hair is why she is called Medusa and it cannot be omitted or muted. A striking Black woman in tight black leather that matches her skin, cold calm expression, knife harness. Professional killer, dark corridor rim light. Plain even light, uncluttered background, no heraldic emblems, no crests, no repeated motifs, no banners, no murals, no floating symbols or runes. Absolutely no text, no captions, no labels, no lettering, no logos, no brand marks, no watermarks, no UI chrome.`,
    inference: [
      "Face shape and age are not described — her skin, her hair and her clothing are",
    ],
    sources: [
      "Novel, p. 427: “a vision in tight leather as black as her skin; rainbow hair sprouting long braids with integral mech threads that made them writhe like serpents”",
      "Wiki article `pages/characters/medusa.html`",
    ],
    image: "assets/images/characters/medusa.jpg",
  },
  {
    slug: "liliana",
    title: "Liliana",
    kind: "character",
    clade: "Human mercenary (Lidon-linked)",
    role: "Deniable operator; opens book dumping Finn; cherenkov blade",
    cues: [
      "**In the field she wears a lightweight bioware muscle outfit** that makes her “look like a beefed-up wrestler whose skin had been stripped away” — exposed musculature, not plate armour",
      "Off duty she dresses subdued and dark, and plays the coquette when a job needs it",
      "Mercenary face across decades of world-time; Lidon underworld chic",
    ],
    clothing:
      "Two distinct looks: the flayed-musculature bioware combat suit, and subdued dark civilian wear with a cherenkov-blade sheath",
    setting: "Aircraft hatch / Anoosha cloud haze memory",
    prompt: `${STYLE} Upper-body portrait of Liliana, Lidon-linked human mercenary. HER FIELD KIT IS A BIOWARE MUSCLE SUIT, NOT ARMOUR: a close-fitting lightweight suit of sculpted fibre bundles that reads as exposed anatomy — as though a powerfully built wrestler had been skinned — with NO plates, NO cuirass, NO rigid armour panels and no emblems anywhere on it. Striking woman with a cool professional expression, an exotic blade sheath at the hip holding a plain unmarked blade. Deniable operator, unsettling to look at. Windy hatch light and cloud haze. ${NO_TEXT_ANYWHERE}`,
    inference: [
      "Hair, skin and eye colour are not fixed. The “much broader nose, and a skin that was almost albino it was so pale” in the later chapters is a **disguise she puts on**, not her face",
    ],
    sources: [
      "Novel, p. 58: “Liliana’s lightweight bioware muscle outfit, which made her look like a beefed-up wrestler whose skin had been stripped away”",
      "Wiki article `pages/characters/liliana.html`",
    ],
    image: "assets/images/characters/liliana.jpg",
  },
  {
    slug: "tose",
    title: "Toše",
    kind: "character",
    clade: "Human mercenary / heavy weapons",
    role: "Sniper and heavy; kills Makaio-Faraji; loud half of Liliana’s work",
    cues: ["Heavy-weapons and sniper mercenary", "Physical bulk vs Liliana’s quiet style", "Field grit"],
    clothing: "Combat harness, ammo webbing, sniper-support kit, scarred armour plates",
    setting: "Roofline / Governor’s mansion lawn distance",
    prompt: `${STYLE} Upper-body portrait of Toše, heavy-weapons mercenary and sniper: rugged muscular man with a grim focused expression, scarred unmarked armour plates and a plain harness, short beard stubble. HIS KIT IS FAR-FUTURE, NOT MODERN MILITARY: no brass cartridges, no belt-fed ammunition, no magazine pouches or webbing of twenty-first-century pattern, no modern plate carrier, and no contemporary assault-rifle or sniper-rifle silhouette. His weapon is a long, heavy, unfamiliar thing of no recognisable present-day pattern, plain and unmarked. ${FAR_FUTURE_DRESS} NO TWENTIETH-CENTURY SOLDIER ICONOGRAPHY: no dog tags, no identity discs, no stencilled unit numbers, no rank chevrons, no crossed-weapon or skull tattoos or patches. Loud half of a deniable duo, harsh daylight and dust. ${NO_TEXT_ANYWHERE}`,
    inference: [],
    image: "assets/images/characters/tose.jpg",
  },
  {
    slug: "gyvoy-enfoe",
    title: "Gyvoy Enfoe",
    kind: "character",
    clade: "Offworld financier (human cover / Celestial imposture plot)",
    role: "Deal-maker attaching to Diligent; identity used by Celestial operator",
    cues: [
      "Public face: charming offworld financier",
      "Portrait as the human cover identity people meet",
      "Too-smooth deal-maker energy",
    ],
    clothing: "Expensive offworld financier suit, Traveler-adjacent luxury",
    setting: "Deal table with arkship model bokeh",
    prompt: `${STYLE} Upper-body portrait of Gyvoy Enfoe as the charming offworld financier cover identity: polished human man with a too-smooth confident smile and immaculate hair, wearing an exquisitely tailored dark coat-tunic with a standing collar and an asymmetric closure — expensive through cut, seam and fabric, with NO lapels, NO necktie and NO dress shirt. ${FAR_FUTURE_DRESS} Deal-maker who attaches to a liberation project. Warm light in a plain quiet room of bare undecorated walls — no dado rail, no wainscot, no cornice, no holographic displays, no data panels, no screens, no wrist readouts. ${NO_TEXT_ANYWHERE}`,
    inference: ["True operator may be Celestial (Dagon network) — illustrate the public Gyvoy face"],
    image: "assets/images/characters/gyvoy-enfoe.jpg",
  },

  // —— Ships ——
  {
    slug: "arkship-diligent",
    title: "Arkship Diligent",
    kind: "ship",
    clade: "Late human generation arkship",
    role: "Principal mobile setting; colony vessel",
    cues: [
      "Massive generation ship — city-scale modular hull",
      "Utilitarian human engineering, not elegant Celestial yacht",
      "Colony decks, radiator fins, docking rings, scarred from long voyage",
    ],
    clothing: "n/a",
    setting: "Deep space near a blue-white star, three-quarter exterior view",
    prompt: `${STYLE} Exterior plate of the arkship Diligent, a massive late-human generation arkship: enormous multi-kilometre modular hull with stacked colony cylinders, radiator fins, docking rings, utilitarian grey-and-white plating scarred by centuries of voyage, small escort craft for scale. Human megastructure engineering, not elegant alien yacht. Three-quarter view in deep space with a distant blue-white star.`,
    inference: [],
    image: "assets/images/ships/arkship-diligent.jpg",
  },
  {
    slug: "arcadias-moon",
    title: "Arcadia’s Moon",
    kind: "ship",
    clade: "Traveler charter starship (atypical architecture)",
    role: "Andino’s deniable hull; flies inside the *Infinite Totality* shell",
    companionImage:
      "`assets/images/ships/infinite-totality.jpg` — disguise shell (see `infinite-totality.md`)",
    cues: [
      "True hull (novel p. 241 / wiki): a **geodesic sphere of golden trusses** containing **eight ovoid elements** that move around inside the sphere and reconfigure their alignment depending on flight status",
      "**Atypical** for a Traveler spacecraft — not conventional freighter/salvage lines",
      "Silhouette is unmistakable enough that concealing it requires a full shell fuselage (*Infinite Totality*)",
    ],
    clothing: "n/a",
    setting: "Three-quarter view near a ringed gas giant; golden lattice and interior ovoids both readable",
    prompt: `${STYLE_BASE} Exterior plate of the Arcadia’s Moon, an atypical Traveler charter starship: open geodesic sphere of golden metallic trusses enclosing exactly eight sky-blue ovoid elements that can move around inside the sphere and reconfigure their alignment depending on flight status. Warm gold lattice cage, smooth sky-blue ovoid modules with subtle metallic sheen, not a conventional freighter and not a navy capital. Three-quarter view in deep space near a ringed gas giant. Absolutely no text of any kind: no captions, no labels, no lettering, no logos, no brand marks, no hull names, no UI chrome, no watermarks.`,
    inference: [
      "**Ovoid colour:** the novel does not fix a colour (p. 241). Secondary paraphrase (Fandom) adds “sky-blue”; the illustration uses sky-blue for that reason. Article prose deliberately omits the colour so it cannot invent a book fact",
      "Surface finish of the ovoids (smooth capsule vs panelled pod) is not fixed by the novel",
    ],
    sources: [
      "Wiki article `pages/locations/arcadias-moon.html`",
      "Book 1 p. 241 (geodesic golden trusses + eight ovoids that slide inside the sphere) — see `docs/external-sources-research.md`",
      "Sky-blue: secondary paraphrase only; used in art, not in article prose",
    ],
    image: "assets/images/ships/arcadias-moon.jpg",
  },
  {
    slug: "alumata",
    title: "Alumata",
    kind: "ship",
    clade: "Crown Celestial archon ship",
    role: "Makaio-Faraji’s intelligence yacht",
    cues: [
      "Sleek elegant Crown archon hull",
      "Smaller than Heresy capital ships",
      "Intelligence meeting ground — refined, not freighter",
    ],
    clothing: "n/a",
    setting: "Against starfield, polished hull reflections",
    prompt: `${STYLE} Exterior plate of the Alumata, a Crown Imperial Celestial archon’s ship: sleek elegant elongated hull of pearlescent silver-blue livestone-like plating, refined intelligence yacht lines, subtle glowing spine, smaller than capital warships. Three-quarter view against deep starfield, cool luminous lighting.`,
    inference: [],
    image: "assets/images/ships/alumata.jpg",
  },
  {
    slug: "cybeles-eagle",
    title: "Cybele’s Eagle",
    kind: "ship",
    clade: "Deniable passenger transport",
    role: "Passenger hull off Gondiar under navy lockdown; Liliana disguise route",
    cues: [
      "Compact civilian passenger transport",
      "Deniable, not military",
      "Commercial lines, modest size",
    ],
    clothing: "n/a",
    setting: "Leaving planetary orbit, atmosphere limb glow",
    prompt: `${STYLE} Exterior plate of Cybele’s Eagle, a compact deniable passenger starship: small-to-mid civilian transport with streamlined commercial hull, passenger windows, modest thrusters, cream and slate civilian livery. Not a warship. Three-quarter view leaving planetary orbit with atmosphere limb glow.`,
    inference: [],
    image: "assets/images/ships/cybeles-eagle.jpg",
  },
  {
    slug: "lestari",
    title: "Lestari",
    kind: "ship",
    clade: "Enfoe commercial starship",
    role: "Dynasty freighter; carries Finn and Ellie on ZPZ run",
    cues: [
      "Commercial dynasty freighter",
      "Traveler-adjacent commerce, not navy",
      "Larger working cargo capacity than Arcadia’s Moon",
    ],
    clothing: "n/a",
    setting: "Deep-space salvage theatre, cargo bay doors open",
    prompt: `${STYLE} Exterior plate of the Lestari, an Enfoe dynasty commercial starship: robust mid-large freighter with cargo spines, commercial markings without readable text, bronze-and-dark hull, Traveler-adjacent working commerce aesthetic. Three-quarter view in deep space with open cargo-bay light spill.`,
    inference: [],
    image: "assets/images/ships/lestari.jpg",
  },
  {
    slug: "polkadav",
    title: "Polkadav",
    kind: "ship",
    clade: "Human / Uranic transport · rendezvous hull",
    role: "Evacuates the Jalgori-Tobus from Gondiar to rendezvous with the *Diligent*",
    cues: [
      "Transport / rendezvous hull (wiki Type), not a navy capital and not a generation arkship",
      "Family escape vessel for Uranic client aristocracy after the mass-strike crackdown",
      "Parallel flight path to Andino’s disguised *Arcadia’s Moon* / *Infinite Totality*",
      "Practical passenger transport with enough capacity for Zelinda, Otylia and household, refined enough for estate nobility",
    ],
    clothing: "n/a (ship exterior plate)",
    setting:
      "Three-quarter exterior view leaving a planetary atmosphere / upper orbit toward deep space, rendezvous-scale (mid hull, not megastructure)",
    prompt: `${STYLE.replace(/.$/, "")}, no caption. Exterior plate of the Polkadav, a mid-size human transport and rendezvous hull used for aristocratic family evacuation: sleek private passenger transport with refined dark-bronze and cream plating, passenger windows, docking collar for arkship rendezvous, not a warship and not a generation arkship. Three-quarter view climbing from planetary orbit with atmosphere limb glow, ready for deep-space rendezvous.`,
    inference: [
      "Exact hull lines not described in the novel — mid-size private transport aesthetic between civilian yacht and freighter, Gondiar client-class polish rather than Traveler salvage grit or Crown livestone elegance",
    ],
    sources: [
      "Wiki article `pages/locations/polkadav.html`",
      "Locations hub Ships & vessels list",
      "Clade grammar: `docs/visual-briefs/README.md` (baseline/Uranic transport vs Traveler vs Celestial)",
    ],
    image: "assets/images/ships/polkadav.jpg",
  },
  {
    slug: "aeacus",
    title: "Aeacus",
    kind: "ship",
    clade: "Crown / Wynid Celestial household hull",
    role: "Lent by Neusch to Terence Wilson-Fletcher after Makaio-Faraji’s assassination",
    cues: [
      "Celestial hull from the Wynid archon household of Makaio-Faraji",
      "Material support for a human detective carrying the Makaio-Spirit — not Terence’s own ship",
      "Same late-turn support register as residual Makaio protocols (Neusch)",
      "Should read as Crown Celestial design language (elegant, livestone-adjacent), related to but distinct from *Alumata* (intelligence yacht of the archon himself) — more compact personal/household loaner",
    ],
    clothing: "n/a (ship exterior plate)",
    setting: "Three-quarter exterior against starfield; cool luminous Crown aesthetic",
    prompt: `${STYLE.replace(/.$/, "")}, no caption. Exterior plate of the Aeacus, a compact Crown Imperial Celestial household ship lent to a human investigator: elegant elongated pearlescent silver-violet hull with livestone-like plating, refined personal yacht lines smaller than a capital or freighter, subtle glowing spinal ridge, Wynid archon-household craft. Three-quarter view against deep starfield, cool luminous lighting.`,
    inference: [
      "Exact silhouette not in the novel — visual inference: smaller refined Celestial craft in the same design family as Crown archon ships, not Heresy-scale and not human freighter",
    ],
    sources: [
      "Wiki article `pages/locations/aeacus.html`",
      "Locations hub Ships & vessels list",
      "Related: Makaio / Neusch / *Alumata* (Crown archon design family)",
    ],
    image: "assets/images/ships/aeacus.jpg",
  },
];

function renderBrief(b) {
  return `# ${b.title}

| Field | Value |
|---|---|
| **Slug** | \`${b.slug}\` |
| **Kind** | ${b.kind} |
| **Clade / type** | ${b.clade} |
| **Role** | ${b.role} |
| **Image path** | \`${b.image}\` |${b.companionImage ? `\n| **Companion image** | ${b.companionImage} |` : ""}

## Physical / design cues (research)

${b.cues.map((c) => `- ${c}`).join("\n")}

## Clothing / finish

${b.clothing}

## Setting / composition

${b.setting}

## Inference flags

${
  b.inference.length
    ? b.inference.map((i) => `- ${i}`).join("\n")
    : "- **Everything visual here is inference.** No physical description has been recovered for this subject; the cues above are derived from role and clade grammar, not from the novel's text. That is not the same as the novel being silent — it means nobody has found a description yet."
}

## Generation prompt

\`\`\`
${b.prompt}
\`\`\`

## Sources

${(b.sources ?? [
  `Wiki article \`pages/${b.kind === "ship" ? "locations" : "characters"}/${b.slug}.html\``,
  "Clade grammar: `docs/visual-briefs/README.md`, faction pages (Celestials / Uranics / Travelers / Heresy)",
])
  .map((s) => `- ${s}`)
  .join("\n")}
`;
}

fs.mkdirSync(outDir, { recursive: true });
for (const b of briefs) {
  fs.writeFileSync(path.join(outDir, `${b.slug}.md`), renderBrief(b), "utf8");
}

// Machine-readable index for checks
fs.writeFileSync(
  path.join(outDir, "index.json"),
  JSON.stringify(
    {
      style: STYLE,
      count: briefs.length,
      subjects: briefs.map((b) => ({
        slug: b.slug,
        title: b.title,
        kind: b.kind,
        image: b.image,
        prompt: b.prompt,
        clade: b.clade,
      })),
    },
    null,
    2
  ),
  "utf8"
);

console.log(`Wrote ${briefs.length} briefs + index.json to ${outDir}`);
