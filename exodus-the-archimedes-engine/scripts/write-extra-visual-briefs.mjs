/**
 * Visual briefs for second-pass subjects: major places, key tech, selective factions.
 * Merges into docs/visual-briefs/index.json without dropping character/ship entries.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "docs", "visual-briefs");
const STYLE =
  "Highly detailed cinematic sci-fi encyclopedia illustration, rich textures, sharp focus, painterly digital art with photographic detail, soft volumetric lighting.";
const NO_TEXT =
  "Absolutely no text of any kind: no captions, no labels, no lettering, no logos, no brand marks, no map names, no UI chrome, no watermarks.";

const extras = [
  // —— Places ——
  {
    slug: "gondiar",
    title: "Gondiar",
    kind: "location",
    clade: "Planet / Uranic client world",
    role: "Primary human-client world; Jalgori-Tobu home; Santa Rosa",
    image: "assets/images/locations/gondiar.jpg",
    prompt: `${STYLE} Wide establishing plate of Gondiar, a fertile Uranic client agricultural world under Celestial rule: green estates and farmland continents, a coastal administrative city with modest towers (Santa Rosa scale, not megacity), soft atmosphere haze, dual-tone day side. Human client planet, not alien godworld. Three-quarter orbital view. ${NO_TEXT}`,
  },
  {
    slug: "kelowan",
    title: "Kelowan",
    kind: "location",
    clade: "Capital system / imperial focus",
    role: "Crown Dominion capital focus; Imperial Palace; georing",
    image: "assets/images/locations/kelowan.jpg",
    prompt: `${STYLE} Wide establishing plate of the Kelowan capital world of a far-future imperial dominion: planet wrapped by a luminous georing with slender orbital towers rising from surface to ring, a vast mountain-engulfing Imperial Palace complex of pearlescent livestone architecture, helium-economy power and court grandeur. Three-quarter orbital view. ${NO_TEXT}`,
  },
  {
    slug: "dolod",
    title: "Dolod",
    kind: "location",
    clade: "Iron exotic gas giant",
    role: "Engine-steered strategic gas giant en route to Kelowan",
    image: "assets/images/locations/dolod.jpg",
    prompt: `${STYLE} Wide establishing plate of Dolod, an iron-exotic gas giant: dark metallic storm bands with iron-rich ochre and gunmetal clouds, subtle ancient megastructure rings or engine hardware faintly visible in the upper atmosphere, ominous strategic presence in deep space, cold starlight. Not a normal blue gas giant. Three-quarter view. ${NO_TEXT}`,
  },
  {
    slug: "anoosha",
    title: "Anoosha",
    kind: "location",
    clade: "Planet / client world",
    role: "Mining client world; Camurdy Mountains; Pana-Seak orbital city",
    image: "assets/images/locations/anoosha.jpg",
    prompt: `${STYLE} Wide establishing plate of Anoosha, a rough client mining world: rugged Camurdy mountain ranges, open-pit ore scars, industrial haze, a large orbital city structure in high orbit (Pana-Seak scale commercial hub), day side with harsh sunlight. Working frontier planet, not court capital. Three-quarter orbital view. ${NO_TEXT}`,
  },
  {
    slug: "hafnir",
    title: "Hafnir",
    kind: "location",
    clade: "Land / settlement domain on Gondiar",
    role: "Finn’s Minsterialis domain; Diligent settler land deal",
    image: "assets/images/locations/hafnir.jpg",
    prompt: `${STYLE} Wide establishing plate of the Hafnir domain on Gondiar: rolling agricultural estates, pale estate manors, empty settlement plots and new temporary settler camps for arkship colonists, green fields under a soft sky, human client-world countryside rather than a whole planet globe. Low aerial landscape view. ${NO_TEXT}`,
  },
  // —— Technology ——
  {
    slug: "archimedes-engine",
    title: "Archimedes Engine",
    kind: "technology",
    clade: "Orbital / planetary engineering megastructure",
    role: "Elohim Dawn Era world-steering engine (Dolod)",
    image: "assets/images/technology/archimedes-engine.jpg",
    prompt: `${STYLE} Concept plate of an Archimedes Engine: enormous ancient orbital megastructure girdling a dark iron-rich gas giant, massive curved spars and station rings, luminous energy conduits, Elohim deep-history engineering scale dwarfing any ship. No readable control panels or glyphs. Three-quarter space view. ${NO_TEXT}`,
  },
  {
    slug: "zpz-generator",
    title: "ZPZ generator",
    kind: "technology",
    clade: "Advanced drive / power plant",
    role: "Drive tech sought by Diligent for true deep-space ops",
    image: "assets/images/technology/zpz-generator.jpg",
    prompt: `${STYLE} Concept plate of a ZPZ generator: advanced compact starship power-drive core, nested exotic geometry coils and luminous zero-point field chambers, industrial salvage-bay lighting, human engineering scale (fits a large vessel, not a planet). No labels or gauges with numbers. Three-quarter hardware view. ${NO_TEXT}`,
  },
  {
    slug: "livestone",
    title: "Livestone",
    kind: "technology",
    clade: "Self-shaping silicate / programmable material",
    role: "Celestial architecture material shaped via neural interfaces",
    image: "assets/images/technology/livestone.jpg",
    prompt: `${STYLE} Close concept plate of livestone: living silicate architecture mid-reshape, pearlescent stone flowing into vaulted Celestial corridors under soft neural-glow light, surface texture between crystal and organic growth, no readable symbols. Material study / interior architectural detail. ${NO_TEXT}`,
  },
  {
    slug: "mindline",
    title: "Mindline",
    kind: "technology",
    clade: "Neural-cultural continuity / succession system",
    role: "Celestial queenship succession and identity transfer",
    image: "assets/images/technology/mindline.jpg",
    prompt: `${STYLE} Abstract concept plate of the mindline: ethereal neural transfer between two tall Imperial Celestial silhouettes, luminous threads of memory and identity flowing as light rather than wires, court chamber soft glow, no faces required to be photoreal, no text, no diagrams with labels. Symbolic succession moment. ${NO_TEXT}`,
  },
  // —— Factions ——
  {
    slug: "celestials",
    title: "Celestials",
    kind: "faction",
    clade: "Transhuman post-human clades",
    role: "Dominant engineered peoples of the Centauri Cluster",
    image: "assets/images/factions/celestials.jpg",
    prompt: `${STYLE} Culture plate for Celestials: distant view of tall elegant Imperial humanoid figures on a livestone palace terrace under star-ringed sky, bloodstone jewellery glints, post-human scale and court grandeur without focusing on one named character. Encyclopedia faction illustration. ${NO_TEXT}`,
  },
  {
    slug: "heresy-dominion",
    title: "Heresy Dominion",
    kind: "faction",
    clade: "Celestial dominion; hexapod citizens",
    role: "Peer dominion; research and heavy individual warships",
    image: "assets/images/factions/heresy-dominion.jpg",
    prompt: `${STYLE} Culture plate for the Heresy Dominion: a vast spindly hexapod Celestial silhouette (exactly four arms, two legs) before a huge research warship in cool blue dock light, refined alien architecture, lower temperature palette. Peer power aesthetic, not Crown gold. ${NO_TEXT}`,
  },
  {
    slug: "travelers",
    title: "Travelers",
    kind: "faction",
    clade: "Ship-centred human free agents",
    role: "Explorers, freighters, Remnant hunters",
    image: "assets/images/factions/travelers.jpg",
    prompt: `${STYLE} Culture plate for Travelers: mixed independent starships at a deep-space gate or salvage yard, worn freighter-explorer hulls, human crews as small figures, practical commercial grit, Gates of Heaven scale portal glow in the background. Freedom-of-the-void aesthetic. ${NO_TEXT}`,
  },
  {
    slug: "crown-dominion",
    title: "Crown Dominion",
    kind: "faction",
    clade: "Imperial alliance of Celestial royal houses",
    role: "Imperial Accord multi-system empire",
    image: "assets/images/factions/crown-dominion.jpg",
    prompt: `${STYLE} Culture plate for the Crown Dominion: Imperial Palace mountain complex and georing under multi-house fleet banners of abstract crystalline design (no readable heraldry text), five-house imperial grandeur, pearlescent and indigo court colours. Establishing political landscape. ${NO_TEXT}`,
  },
  // —— Third pass: remaining entity pages without plates ——
  {
    slug: "wynid",
    title: "Wynid",
    kind: "location",
    clade: "Royal system / queen’s seat",
    role: "Helena-Chione → Helena-Thyra royal seat; trials and coup",
    image: "assets/images/locations/wynid.jpg",
    prompt: `${STYLE} Wide establishing plate of Wynid, a Celestial royal-system capital world: pearlescent court architecture and a queen’s seat palace complex on mountain terraces, cool starlight, refined imperial client-scale grandeur smaller than Kelowan’s georing capital, deep indigo night side glow. Three-quarter orbital / high aerial view of a sovereign royal world. ${NO_TEXT}`,
  },
  {
    slug: "boksrock",
    title: "Boksrock",
    kind: "location",
    clade: "Body in Engine endgame geometry",
    role: "Target of Archimedes Engine momentum transfers; capital crisis",
    image: "assets/images/locations/boksrock.jpg",
    prompt: `${STYLE} Wide establishing plate of Boksrock, a dark rocky planetary body or large moon being violently redirected through space: strained luminous momentum-transfer beams or engine geometry lines from distant megastructure hardware, cold starfield, existential threat scale, iron-grey surface and fractured ice, ominous trajectory toward a bright capital system. No readable HUD. Three-quarter deep-space view. ${NO_TEXT}`,
  },
  {
    slug: "centauri-cluster",
    title: "Centauri Cluster",
    kind: "location",
    clade: "Star cluster / human settlement sphere",
    role: "Main stage of the novel; dense star field of the Dominions",
    image: "assets/images/locations/centauri-cluster.jpg",
    prompt: `${STYLE} Wide establishing plate of the Centauri Cluster: an extraordinarily dense glittering star field filling the frame, countless suns and faint nebular dust, a few tiny distant habitat rings and ship wakes for scale, sense of a crowded multi-polity settlement sphere rather than empty deep space. Epic encyclopedia space vista, cool blues and gold starlight. ${NO_TEXT}`,
  },
  {
    slug: "crown-dominion-systems",
    title: "Crown Dominion systems",
    kind: "location",
    clade: "Multi-system imperial alliance territory",
    role: "Six royal systems under Imperial Accord; capital focus Kelowan",
    image: "assets/images/locations/crown-dominion-systems.jpg",
    prompt: `${STYLE} Wide establishing plate of Crown Dominion multi-system territory: a chart-like space vista of several distinct star systems linked by faint imperial travel corridors and scattered fleets, one brighter capital system with a subtle georing glint, abstract multi-house crystalline fleet markers without readable heraldry, pearlescent and indigo imperial colours. Political geography as landscape, not a map with labels. ${NO_TEXT}`,
  },
  {
    slug: "entropy-drive",
    title: "Entropy drive",
    kind: "technology",
    clade: "Ship propulsion system",
    role: "Interstellar propulsion class; bargaining chip vs ZPZ plant",
    image: "assets/images/technology/entropy-drive.jpg",
    prompt: `${STYLE} Concept plate of an entropy drive: a large starship propulsion core mid-installation in a Traveler or Dominion engineering bay, nested heat-sink rings and exotic thermodynamic chambers glowing with deep amber-violet exhaust geometry, human engineers for scale, industrial salvage-bay lighting. Hardware study, no gauges with numbers. Three-quarter view. ${NO_TEXT}`,
  },
  {
    slug: "neural-interface",
    title: "Neural interface",
    kind: "technology",
    clade: "Brain-machine / bioware interface",
    role: "Ubiquitous Cluster bioware; livestone, piloting, coercion",
    image: "assets/images/technology/neural-interface.jpg",
    prompt: `${STYLE} Close concept plate of neural interface bioware: elegant temple and neck implant filaments, translucent induction pad resting near a human nape, soft bioluminescent neural threads under skin, clinical-cool product study on dark satin, no brand marks, no UI screens with readable glyphs. Encyclopedia hardware detail. ${NO_TEXT}`,
  },
  {
    slug: "uranics",
    title: "Uranics",
    kind: "faction",
    clade: "Intermediate human subspecies / client class",
    role: "Neural-interface client aristocrats under Celestial rule",
    image: "assets/images/factions/uranics.jpg",
    prompt: `${STYLE} Culture plate for Uranics: several elegant fully human client aristocrats on a Gondiar-style estate terrace at dusk, subtle neural interface ports at temples, tailored intermediate-status dress (rich but not Celestial god-scale), livestone contact-bulb tools nearby, human scale under distant Celestial palace light on the horizon. Encyclopedia faction illustration. ${NO_TEXT}`,
  },
  {
    slug: "elohim",
    title: "Elohim",
    kind: "faction",
    clade: "Ancient Dawn Era civilization",
    role: "Planetary engineers; Archimedes Engines; gone as a polity",
    image: "assets/images/factions/elohim.jpg",
    prompt: `${STYLE} Culture plate for the ancient Elohim legacy: colossal Dawn Era planetary-engineering works moving a world into a stellar life band, vast Archimedes Engine spars and luminous conduits around a blue-green terraforming planet, sense of a vanished godlike civilization with no living figures required in focus, deep-history awe, cool gold and void-black palette. ${NO_TEXT}`,
  },
  {
    slug: "changelings",
    title: "Changelings",
    kind: "faction",
    clade: "Engineered niche peoples",
    role: "Gath labour / Moaksha and other sideways-engineered underclass",
    image: "assets/images/factions/changelings.jpg",
    prompt: `${STYLE} Culture plate for Changelings: mixed engineered hominoid labour forms in an industrial client-world yard under harsh light — heavy-built Gath-like workers and more insectoid beetle-derived transport shapes in the mid-distance, clearly post-human niche engineering rather than baseline humans, no cruelty spectacle, encyclopedia seriousness, cool industrial haze. ${NO_TEXT}`,
  },
  {
    slug: "human-liberation",
    title: "Human liberation",
    kind: "faction",
    clade: "Overlapping resistance currents",
    role: "Regal Democrats, underground networks, Engine seizure politics",
    image: "assets/images/factions/human-liberation.jpg",
    prompt: `${STYLE} Culture plate for human liberation currents: a crowded late-arkship assembly hall and settler rally under dim bulkhead lights, baseline humans and a few Uranic sympathizers listening to an orator silhouette, protest energy without readable slogans or banners with lettering, worn work clothes and improvised meeting geometry, tense hopeful underground politics. ${NO_TEXT}`,
  },
  {
    slug: "mara-yama",
    title: "Mara Yama",
    kind: "faction",
    clade: "Nomadic Celestial threat culture",
    role: "Hidden space citadels; hardline Crown pretext and real pressure",
    image: "assets/images/factions/mara-yama.jpg",
    prompt: `${STYLE} Culture plate for the Mara Yama: a vast hidden space citadel of dark angular architecture hanging in shadowed void, predatory nomadic Celestial warships and refuel silhouettes near a cold gas giant, threatening external bogeyman aesthetic, no readable hull marks, cool lethal palette. Encyclopedia faction illustration. ${NO_TEXT}`,
  },
  {
    slug: "talloch-te-dominion",
    title: "Talloch-Te Dominion",
    kind: "faction",
    clade: "Nomadic trader / shipbuilder Celestial dominion",
    role: "Largest nearby shipyards; Sahdiah; Verak ally",
    image: "assets/images/factions/talloch-te-dominion.jpg",
    prompt: `${STYLE} Culture plate for the Talloch-Te Dominion: enormous commercial shipyards and scoop-fleet docks around a nomadic habitat cluster, sleek trader-Celestial figures small against hull fabrication scaffolds, helium commerce grit mixed with refined Celestial engineering, warm industrial amber against void, no readable ship names. Peer trading power aesthetic. ${NO_TEXT}`,
  },
  {
    slug: "gomatu-dominion",
    title: "Gomatu Dominion",
    kind: "faction",
    clade: "Celestial dominion; Dyson sphere project",
    role: "Megastructure builders; Dolod’s original destination vector",
    image: "assets/images/factions/gomatu-dominion.jpg",
    prompt: `${STYLE} Culture plate for the Gomatu Dominion: a partial Dyson sphere megastructure under construction around a bright star, incomplete lattice rings and swarm construction platforms, distant Celestial engineering vessels, cosmological scale awe, cool stellar white and gunmetal. Encyclopedia establishing plate. ${NO_TEXT}`,
  },
  {
    slug: "ratarajan-dominion",
    title: "Ratarajan Dominion",
    kind: "faction",
    clade: "Celestial dominion; Hoa Quinzu theatre",
    role: "Local authority warning Diligent of Mara Yama refuel",
    image: "assets/images/factions/ratarajan-dominion.jpg",
    prompt: `${STYLE} Culture plate for the Ratarajan Dominion: a Celestial authority station and patrol hulls in the Hoa Quinzu system near a gas giant used as a refuel point, alert watchful navy posture, cold blue system light, local dominion presence rather than capital pomp, no readable hull markings. ${NO_TEXT}`,
  },
  {
    slug: "uthara-dominion",
    title: "Uthara Dominion",
    kind: "faction",
    clade: "Celestial dominion; annexation target",
    role: "Named in Helena-Thyra expansion plans with Capo Frois",
    image: "assets/images/factions/uthara-dominion.jpg",
    prompt: `${STYLE} Culture plate for the Uthara Dominion: a contested Celestial frontier world and orbital habitats under tense multi-polity sky, distant fleet silhouettes suggesting annexation pressure, refined but less secure architecture than Crown capitals, amber dusk and wariness, no readable banners. Geopolitical pawn aesthetic. ${NO_TEXT}`,
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
| **Image path** | \`${b.image}\` |

## Physical / design cues (research)

- Drawn from wiki article \`pages/${
    b.kind === "location"
      ? "locations"
      : b.kind === "technology"
        ? "technology"
        : "factions"
  }/${b.slug}.html\` and clade grammar in README.

## Inference flags

- Visual inference where the book is silent; no invented labels, dates, or place-names in the image.

## Generation prompt

\`\`\`
${b.prompt}
\`\`\`
`;
}

fs.mkdirSync(outDir, { recursive: true });
const indexPath = path.join(outDir, "index.json");
const index = JSON.parse(fs.readFileSync(indexPath, "utf8"));
const bySlug = new Map(index.subjects.map((s) => [s.slug, s]));

for (const b of extras) {
  fs.writeFileSync(path.join(outDir, `${b.slug}.md`), renderBrief(b), "utf8");
  bySlug.set(b.slug, {
    slug: b.slug,
    title: b.title,
    kind: b.kind,
    image: b.image,
    prompt: b.prompt,
    clade: b.clade,
  });
}

index.subjects = [...bySlug.values()];
index.count = index.subjects.length;
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + "\n", "utf8");
console.log(`Wrote ${extras.length} extra briefs; index count=${index.count}`);
for (const b of extras) console.log(" ", b.kind, b.slug);
