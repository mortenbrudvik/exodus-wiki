/**
 * Prompt clauses shared by both brief generators.
 *
 * These were local to write-visual-briefs.mjs, which has no main guard — importing that file
 * executes it and rewrites index.json from scratch, so write-extra-visual-briefs.mjs could not
 * reuse them and had to restate the clade rule inline. That is exactly the duplication the
 * bloodstone sweep failed at (the clause reached 6 of 16 briefs and was reported as reaching all
 * of them). One home instead.
 *
 * Every string here is load-bearing wording that a shipped image already violated once. Do not
 * paraphrase them to read better; the awkwardness is what makes them land.
 */

/**
 * Bloodstone in a prompt.
 *
 * The novel fixes its COLOUR per wearer — turquoise and gold, black and green, orange — and its
 * MATERIAL for everyone: a matte calcium growth of the body, never a cut gem.
 *
 * The ornament noun goes INSIDE the clause on purpose. This was a bare string that call sites
 * suffixed — `${BLOODSTONE} mantle` — which rendered as "…and never ruby or crimson mantle", so the
 * prohibition bound to the garment rather than to the growth. Every Celestial portrait in the sixth
 * pass came back the right colour and the wrong material.
 */
export const BLOODSTONE_MATERIAL =
  "a bone-like matte porous growth of the body, never a cut, faceted or polished gemstone, never set in metal like jewellery, and never red, rust, ruby, scarlet or crimson";

// The guard must name the colour it DOES want, not only the ones it forbids. Its first version said
// "never ruby or crimson" and nothing more, and Avone-Valerio came back with a red growth twice out
// of two — a negative alone leaves the generator free to pick the default it was always picking.
export const BLOODSTONE_GUARD = `any bloodstone visible is in faint turquoise and gold — pale blue-green and gold only, ${BLOODSTONE_MATERIAL}`;

/**
 * Imperial Celestial body plan. Applied per-subject four separate times — avone-valerio, radwarno,
 * siskala, inessa-pierina — each after a portrait shipped reading as an ordinary human. Swept across
 * every Imperial Celestial brief so there is no fifth instance. Deliberately states no height, so
 * subjects with one fixed in the novel (Helena at three metres, Stethos-Thierry at two and a half)
 * keep it.
 */
export const CELESTIAL_BODY =
  "This is an Imperial Celestial, not an ordinary human: unnaturally tall with elongated proportions, long limbs and a long neck, refined post-human features and bearing — never an ordinary human build, face or posture.";

/**
 * Period fit. Ten passes checked burned-in text, invented heraldry, canon and clade, and never once
 * asked whether the clothes belonged to the era. Gyvoy Enfoe shipped in a lounge suit and necktie —
 * an 1860s Western garment — in a story set around 42,000 AD. Marcellu is the counter-example worth
 * copying: mandarin collar, seamed panels, no lapels, and he still reads as a sharp commercial
 * operator without borrowing anything from Earth's recent past.
 */
export const FAR_FUTURE_DRESS =
  "Costume must belong to the far future, not to Earth's recent past: no lounge suit, no necktie, bow tie or cravat, no dress-shirt collar and cuffs of twentieth-century cut, no trench coat, no notch lapels, no dog tags, rank chevrons or webbing of modern military pattern, and no Georgian or Victorian interior mouldings such as dado rails, wainscot panelling or cornices. Convey status and role through cut, seam, fastening and material instead — standing or mandarin collars, asymmetric closures, seamed panels, unfamiliar fabrics.";
