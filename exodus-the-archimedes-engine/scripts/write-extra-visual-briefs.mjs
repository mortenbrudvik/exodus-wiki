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
