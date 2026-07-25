/**
 * Writes research-grounded visual briefs under docs/visual-briefs/.
 * Source of truth for illustration intent (not reader-facing article prose).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "docs", "visual-briefs");

const STYLE =
  "Highly detailed cinematic sci-fi encyclopedia illustration, rich textures, sharp focus, painterly digital art with photographic detail, soft volumetric lighting, no text, no watermark, no UI chrome.";

/**
 * `sources` is optional and overrides the generic two-bullet default. Set it whenever a brief
 * cites a specific page or chapter of the novel — without it the citation lives only in the
 * generated .md and the next run of this script silently discards it.
 */
/** @typedef {{ slug: string, title: string, kind: 'character'|'ship', clade: string, role: string, cues: string[], clothing: string, setting: string, prompt: string, inference: string[], sources?: string[], image: string }} Brief */

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
    prompt: `${STYLE} Portrait of Finn Jalgori-Tobu, a 25-year-old Uranic human aristocrat from a far-future space empire: athletic young man with aristocratic East Asian features, straight black hair and warm medium skin tone, subtle neural interface ports at the temples, restless determined eyes, wearing a dark tailored spacer jacket over practical field layers. Client nobility aesthetic, not godlike alien. Upper-body three-quarter portrait, soft starfield and estate architecture behind him.`,
    inference: [
      "Hair/eye colour and ancestry are not fixed in the wiki. The delivered portrait's East Asian colouring is now stated in the prompt so that it is reproducible and so that his twin Otylia and sister Zelinda can be locked to the same family appearance",
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
      "Young woman ~23, competent military bearing",
      "Baseline human (no Celestial elongation, no bloodstone)",
      "Shipboard practicality over court beauty",
    ],
    clothing: "Late-arkship lieutenant uniform — functional jumpsuit/harness with Diligent crew insignia hints, utility straps",
    setting: "Arkship corridor lighting, cool metal bulkheads",
    prompt: `${STYLE} Portrait of Eleanor Ellie Aponi, a skilled 23-year-old lieutenant from a late-arriving human generation arkship: competent young woman with practical military bearing, baseline human features, short practical hair, wearing a functional grey-blue arkship lieutenant uniform with harness straps. Field partner energy, not court fashion. Upper-body portrait, cool bulkhead lighting.`,
    inference: ["Exact hair colour not specified — brown/dark practical cut"],
    image: "assets/images/characters/eleanor-aponi.jpg",
  },
  {
    slug: "josias-aponi",
    title: "Josias Aponi",
    kind: "character",
    clade: "Baseline late-arkship human (~51 intro)",
    role: "Owner-orator of Diligent; liberation agitator; Regal Democrats president",
    cues: [
      "Middle-aged man ~50s, forceful orator presence",
      "Political fire rather than soldier physique",
      "Baseline human settler culture",
    ],
    clothing: "Formal arkship-owner coat over practical layers — half statesman, half settler politician",
    setting: "Assembly-hall lighting with arkship windows",
    prompt: `${STYLE} Portrait of Josias Aponi, a 51-year-old human arkship owner and fiery political orator: middle-aged man with intense determined expression, greying temples, strong jaw, wearing a formal dark owner’s coat over practical settler layers. Liberation agitator energy. Upper-body portrait, warm assembly-hall light and arkship viewport glow.`,
    inference: [],
    image: "assets/images/characters/josias-aponi.jpg",
  },
  {
    slug: "dejean",
    title: "Dejean",
    kind: "character",
    clade: "Baseline late-arkship human (59)",
    role: "Captain of arkship Diligent",
    cues: [
      "Fifty-nine-year-old professional ship captain",
      "Weathered competence, steady not theatrical",
      "Shipboard hierarchy face of the Diligent",
    ],
    clothing: "Arkship captain’s uniform — clean lines, rank tabs, practical belt kit",
    setting: "Bridge console glow",
    prompt: `${STYLE} Portrait of Captain Dejean, a 59-year-old professional captain of a human generation arkship: weathered middle-aged man with calm competent expression, short greying hair, wearing a clean grey arkship captain’s uniform with subtle rank tabs. Steady professional, not politician. Upper-body portrait, cool bridge console lighting.`,
    inference: [],
    image: "assets/images/characters/dejean.jpg",
  },
  {
    slug: "elsbeth-mcquillan",
    title: "Elsbeth McQuillan",
    kind: "character",
    clade: "Baseline human specialist",
    role: "Owner-commander of tank Hell Welcomes Careful Drivers; drive-team boss",
    cues: [
      "Fearless ground-combat specialist",
      "Tank commander grit, not court elegance",
      "Hired heavy-mobility professional",
    ],
    clothing: "Armoured tanker coveralls, headset, gauntlets; dust and carbon scoring",
    setting: "Dim vehicle bay / red combat interior light",
    prompt: `${STYLE} Portrait of Elsbeth McQuillan, fearless tank commander of Hell Welcomes Careful Drivers: tough woman in armoured tanker coveralls and headset, gauntlets, carbon scoring on gear, confident battlefield expression. Ground-war specialist aesthetic. Upper-body portrait, red-tinged vehicle-bay lighting.`,
    inference: ["Age/look not specified — mid-thirties to forties professional"],
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
    prompt: `${STYLE} Portrait of Terence Wilson-Fletcher, a 24-year-old detective on a far-future colony city: sharp-eyed young man with thoughtful intense expression, short neat hair, wearing a dark detective coat over civilian layers, subtle earpiece. Human investigator aesthetic. Upper-body portrait, cool neon-rain city bokeh behind him.`,
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
    prompt: `${STYLE} Portrait of Otylia Jalgori-Tobu, a 25-year-old Uranic aristocratic twin sister and political manager: composed young woman with intelligent steady eyes, subtle neural interface ports, tailored ministerial coat in deep teal and black. She is the twin of Finn Jalgori-Tobu and must share his ancestry and colouring — the same East Asian features, straight black hair and warm medium skin tone — differing in affect, not in family resemblance. Institutional calm. Upper-body portrait, soft palace office light.`,
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
    prompt: `${STYLE} Portrait of Zelinda Jalgori-Tobu, Uranic aristocratic heir of a client noble family: composed young woman with pragmatic confident expression, subtle neural ports, elegant deep-burgundy formal gown with estate jewellery (not alien bloodstone). She is the elder sister of Finn and Otylia Jalgori-Tobu and shares the family's ancestry and colouring — East Asian features, straight black hair, warm medium skin tone. Upper-body portrait, warm salon light and subtle livestone wall texture.`,
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
      "Tall elegant post-human woman — elongated regal proportions",
      "Athanasy / mindline sovereign presence",
      "Court fashion includes bloodstone growths/jewellery",
      "Strategic calm, not Thyra’s hardline cruelty",
    ],
    clothing: "Imperial queen’s robes of pale gold and ivory with crystalline bloodstone accents along collar and arms",
    setting: "Wynid court livestone hall, cool luminous architecture",
    prompt: `${STYLE} Portrait of Helena-Chione, Imperial Celestial Now and Forever Queen of Wynid: extremely tall elegant post-human woman with elongated regal proportions, luminous pale skin, serene strategic expression, wearing ivory-and-gold queen’s robes with crystalline bloodstone jewellery growing along collar and wrists. Godlike court beauty. Upper-body portrait emphasizing height, soft livestone palace glow.`,
    inference: ["Exact face not described — serene post-human beauty as clade default"],
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
      "Same tall Imperial humanoid clade",
      "Bloodstone / court power symbols after usurpation",
    ],
    clothing: "Sharp black-and-crimson royal armour-robes, bloodstone crown-collar, military severity",
    setting: "Throne-side shadow with fleet viewport",
    prompt: `${STYLE} Portrait of Thyra as Helena-Thyra, Imperial Celestial usurper queen: tall post-human young woman with elongated elegant features, cold ruthless intelligent eyes, wearing sharp black and crimson armour-robes with a crystalline bloodstone collar-crown. Hardline power. Upper-body portrait, dramatic side lighting and fleet viewport glow.`,
    inference: ["Youth vs Helena — younger adult Celestial"],
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
    prompt: `${STYLE} Portrait of Clavissa, Imperial Celestial congregant daughter of a queen: tall elegant post-human young woman with careful wary expression, silver-blue court robes, modest crystalline jewellery, elongated proportions. Survivor of succession culture, not the usurper. Upper-body portrait, soft gallery light.`,
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
      "Peak Imperial Celestial sovereign at Kelowan Palace",
      "Empress-scale presence, tall humanoid",
      "Sixty-year imperial term dignity",
    ],
    clothing: "Imperial palace regalia — deep indigo and platinum, heavy bloodstone mantle",
    setting: "Imperial Palace mountain-engulfing architecture suggestion",
    prompt: `${STYLE} Portrait of Carolien-Amaia, Imperial Celestial empress of the Crown Dominion: extremely tall regal post-human woman with commanding calm expression, deep indigo and platinum imperial robes, heavy crystalline bloodstone mantle, elongated proportions. Peak court authority. Upper-body portrait, grand palace light.`,
    inference: [],
    image: "assets/images/characters/carolien-amaia.jpg",
  },
  {
    slug: "luus",
    title: "Luus",
    kind: "character",
    clade: "Imperial Celestial queen (Bassa)",
    role: "Now and Forever Queen of Bassa; prior empress at coronation hinge",
    cues: ["Peer queen of Crown Accord", "Imperial humanoid tall form", "Handing-throne elder dignity"],
    clothing: "Bassa royal colours — emerald and gold court robes with bloodstone diadem",
    setting: "Coronation-era court",
    prompt: `${STYLE} Portrait of Luus, Imperial Celestial Now and Forever Queen of Bassa: tall elegant post-human sovereign woman, mature dignified expression, emerald and gold robes with crystalline bloodstone diadem. Peer queen handing imperial rotation. Upper-body portrait, ceremonial light.`,
    inference: ["Mature relative to younger congregants"],
    image: "assets/images/characters/luus.jpg",
  },
  {
    slug: "inessa-pierina",
    title: "Inessa-Pierina",
    kind: "character",
    clade: "Imperial Celestial queen (Cheluli)",
    role: "Now and Forever Queen of Cheluli",
    cues: ["Peer queen seat under Imperial Accord", "Tall Imperial humanoid"],
    clothing: "Cheluli court white-and-copper robes, bloodstone shoulder growths",
    setting: "Formal queen portrait backdrop",
    prompt: `${STYLE} Portrait of Inessa-Pierina, Imperial Celestial queen of Cheluli: tall post-human regal woman, composed expression, white and copper court robes with crystalline bloodstone shoulder ornaments. Peer queen. Upper-body portrait, cool ceremonial lighting.`,
    inference: [],
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
    prompt: `${STYLE} Portrait of Ramona-Ursule, Imperial Celestial queen of Nizinsk: tall post-human woman with sharp assessing eyes, amethyst and silver robes, crystalline bloodstone collar. Host of multi-dominion politics trial. Upper-body portrait, cool chamber light.`,
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
    prompt: `${STYLE} Portrait of Zuberi-Dulcina, historical Imperial Celestial queen of Kelowan: tall post-human war sovereign with tragic commanding expression, blackened-gold armour robes, cracked crystalline bloodstone crown. Fallen empire grandeur. Upper-body portrait, smoky dramatic light.`,
    inference: ["Historical reconstruction — no contemporary portrait in book"],
    image: "assets/images/characters/zuberi-dulcina.jpg",
  },
  {
    slug: "bekket",
    title: "Bekket",
    kind: "character",
    clade: "Imperial Celestial lord (Uixic / Zuberi-linked)",
    role: "Father of Thyra (“Oneshot”); power behind Helena-Thyra court",
    cues: [
      "Male Imperial Celestial court figure",
      "Mocked as Oneshot for single-child siring vs clutch norms",
      "Political schemer presence",
    ],
    clothing: "Dark court suit with bloodstone cuff growths, Uixic noble cut",
    setting: "Shadowed court corridor",
    prompt: `${STYLE} Portrait of Lord Bekket, Imperial Celestial court schemer and father of a usurper queen: tall elegant post-human man with calculating half-smile, dark tailored court suit, crystalline bloodstone cuff ornaments. Political manipulator. Upper-body portrait, shadowed corridor light.`,
    inference: [],
    image: "assets/images/characters/bekket.jpg",
  },
  {
    slug: "lord-gahiji",
    title: "Lord Gahiji",
    kind: "character",
    clade: "Imperial Celestial archon",
    role: "Chief Archon to Helena-Chione; political acumen",
    cues: ["Senior male Celestial statesman", "Court mind, not battlefield glory", "Tall Imperial humanoid"],
    clothing: "Chief-archon formal robes in Wynid blue-grey with mindline sigils",
    setting: "Council chamber",
    prompt: `${STYLE} Portrait of Lord Gahiji, Chief Archon to an Imperial Celestial queen: tall post-human older man with shrewd political eyes, blue-grey archon robes, subtle crystalline accents, elongated proportions. Statesman not soldier. Upper-body portrait, cool council light.`,
    inference: ["Age as senior advisor"],
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
    prompt: `${STYLE} Portrait of Lord Jolav, Imperial Celestial consort to a queen: tall elegant post-human man with restrained worried dignity, silver-black consort robes, subtle crystalline jewellery. Quiet opposition energy. Upper-body portrait, soft anteroom light.`,
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
    prompt: `${STYLE} Portrait of Lord Valdier, elderly Imperial Celestial Master of the Court and royal father: tall post-human elder man with formal austere expression, heavy ceremonial robes, crystalline bloodstone protocol collar. Old-guard court. Upper-body portrait, formal gold light.`,
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
      "Information officer look — interface-heavy",
      "Permanently connected to networks",
      "Tall Imperial humanoid with visible neural hardware",
    ],
    clothing: "Datamaster habit — slim tech robes, glowing neural filaments at skull and neck",
    setting: "Data-hall soft hologlyphs (no readable text)",
    prompt: `${STYLE} Portrait of Lord Stethos-Thierry, Imperial Celestial court datamaster: tall post-human man with calm vacant-focused expression, slim tech robes, glowing neural filaments and interface hardware along scalp and neck. Permanently networked. Upper-body portrait, cool holographic bokeh without readable text.`,
    inference: [],
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
    prompt: `${STYLE} Portrait of Major Siskala of the Wynid Royal Tiger Guard: tall athletic Imperial Celestial woman warrior, sharp professional expression, dark gold and black guard armour with subtle tiger motif, helmet under arm. Court military, not queen. Upper-body portrait, cool corridor light.`,
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
      "Male archon intelligence officer",
      "Bloodstone fashion and athanasia culture (prologue host)",
      "Tall Imperial humanoid; spycraft severity",
    ],
    clothing: "Spymaster archon coat — charcoal with bloodstone growths on shoulders, mindline pin",
    setting: "Shipboard intelligence suite (Alumata feel)",
    prompt: `${STYLE} Portrait of Makaio, Imperial Celestial archon spymaster: tall post-human man with piercing analytical eyes, charcoal intelligence coat, crystalline bloodstone growths on shoulders, elongated regal proportions. Multi-host mindline power. Upper-body portrait, dim shipboard intelligence-suite light.`,
    inference: ["Composite of host line — Faraji-era adult male host"],
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
    prompt: `${STYLE} Portrait of Neusch, young Imperial Celestial son of a spymaster archon: tall young post-human man with intense focused eyes, dark slim coat, glowing neural-gift collar, elongated proportions. Investigator heir energy. Upper-body portrait, cool chamber light.`,
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
    prompt: `${STYLE} Portrait of Asahi-Iryna, hardline Imperial Celestial archon: tall post-human figure with severe expression, black and crimson archon uniform-robes, crystalline accents, elongated proportions. Ruthless oversight. Upper-body portrait, cold fleet light.`,
    inference: ["Gender presentation as androgynous-elegant Celestial unless wiki specifies; page name reads feminine — present as woman"],
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
    prompt: `${STYLE} Portrait of General Avone-Valerio, Imperial Celestial navy commander: tall post-human military leader with cold commanding face, angular steel-blue navy armour plates, rank ornaments without text. Occupation authority. Upper-body portrait, harsh navy bridge light.`,
    inference: ["Presented as masculine general"],
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
    prompt: `${STYLE} Portrait of Acelynn, Chief Archon to the Verak queen and imperial throne: tall post-human Celestial with composed political expression, indigo and silver archon robes, mindline crest jewellery. Senior crown mindline. Upper-body portrait, palace light.`,
    inference: ["Present as woman per name convention in wiki"],
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
    prompt: `${STYLE} Portrait of Commander Radwarno, Verak Imperial Celestial fleet officer: tall post-human man with stern focused expression, dark navy armour-coat with helium-blue accents, elongated proportions. Fleet capture authority. Upper-body portrait, starfield fleet light.`,
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
    prompt: `${STYLE} Portrait of Dagon, Imperial Celestial covert operator posing in human underworld networks: tall elegant man with predatory calm eyes, layered dark merchant coat over subtle high-tech under-armour, elongated post-human proportions barely hidden. Dual-face spy. Upper-body portrait, neon underworld bokeh.`,
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
    prompt: `${STYLE} Portrait of Malquilvo, Imperial Celestial court parent in mourning and accusation: tall post-human figure with anguished stern expression, grey court robes, crystalline tear-like bloodstone jewellery. Tragic court politics. Upper-body portrait, cold public-gallery light.`,
    inference: ["Present as masculine parent figure"],
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
    prompt: `${STYLE} Portrait of Uulana as Wynid Imperial Celestial investigator-archon type: tall post-human figure with sharp vigilant eyes, charcoal robes with crimson lining, crystalline accents. Political investigation under threat. Upper-body portrait, tense corridor light.`,
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
      "CRITICAL: spindly hexapod — two legs, FOUR arms, expanded skull",
      "~3 metres tall, lower body temperature vibe (cool skin tones)",
      "Not humanoid Crown form — clearly non-baseline post-human",
      "Research/intelligence severity",
    ],
    clothing: "Multi-limb archon vestments designed for four arms; dark research-lab finery",
    setting: "Large Heresy ship interior with cool blue light",
    prompt: `${STYLE} Portrait of Olomo, archon of the Heresy Dominion: a towering three-metre spindly hexapod post-human with TWO legs and FOUR long arms, expanded elongated skull, cool pale-blue skin, intelligent severe face, wearing multi-limb dark research robes tailored for four arms. Clearly non-humanoid Celestial. Upper body showing all four arms, cool blue starship light.`,
    inference: [],
    image: "assets/images/characters/olomo.jpg",
  },
  {
    slug: "sahdiah",
    title: "Sahdiah",
    kind: "character",
    clade: "Talloch-Te Celestial archon",
    role: "Archon of Talloch-Te nomad trader dominion; Traveler tasking",
    cues: [
      "Primary biological body has exactly five eyes (ch. 31)",
      "Multi-body Talloch-Te architecture; gravity form for human-facing presence",
      "Not Crown two-eyed humanoid; not Heresy hexapod",
    ],
    clothing: "Merchant-archon finery — bronze, void-black, ship-sigil jewellery",
    setting: "Nurture-chamber light on trader flagship",
    prompt: `${STYLE} Upper-body portrait of Sahdiah, Talloch-Te Celestial archon: a non-human post-human trader intelligence whose primary biological body has exactly five eyes — count carefully: five eyes only, arranged on an elongated alien face, not a two-eyed human. Soft gravity-form silhouette that is still somewhat humanoid but clearly not Imperial Crown beauty and not a Heresy hexapod — no extra arms. Cool merchant-archon presence, bronze and void-black trader finery, subtle ship-sigil jewellery, calculating expression. Setting: dim shipboard nurture-chamber light with soft biotech housing glow behind her. Deniable power, not court pomp. Absolutely no text, no captions, no labels, no lettering, no logos, no brand marks, no watermarks, no UI chrome.`,
    inference: [
      "Skin tone and exact eye arrangement not fixed by the novel",
      "Pronouns she/her (reader-confirmed)",
    ],
    sources: [
      "Book 1 ch. 31 (five eyes / primary biological body / nurture chamber) — reader-confirmed",
      "Book 1 (multi-body architecture, mind partition, bodymorph, gravity form) — reader-confirmed",
      "Wiki `pages/characters/sahdiah.html`, `pages/factions/talloch-te-dominion.html`",
      "Fandom Talloch-Te Dominion — agrees on the multi-body clade, but the book is the authority",
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
    cues: ["Ship captain of deniable Traveler hull", "Enigmatic allegiance", "Working spacer, not court"],
    clothing: "Traveler captain’s worn coat, harness, ship-tag jewellery",
    setting: "Arcadia’s Moon bridge",
    prompt: `${STYLE} Portrait of Andino, Traveler starship captain of Arcadia’s Moon: experienced human spacer with enigmatic half-smile, weathered captain’s coat and harness, practical short hair. Independent freighter-explorer captain. Upper-body portrait, warm bridge instrument glow.`,
    inference: [],
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
    prompt: `${STYLE} Portrait of Marcellu, Traveler middleman and archon fixer: slick human man with wary deal-maker expression, sharp commercial spacer suit, subtle high-tech earpiece. Deniable logistics broker. Upper-body portrait, dockside neon.`,
    inference: [],
    image: "assets/images/characters/marcellu.jpg",
  },
  {
    slug: "medusa",
    title: "Medusa",
    kind: "character",
    clade: "Human assassin / operative",
    role: "Assassin; Marcellu’s right hand then Sahdiah asset",
    cues: ["Ruthless field assassin", "Human-scale killer", "Dangerous calm"],
    clothing: "Black tactical bodysuit with knife harness, minimal reflective strips",
    setting: "Dark corridor / ship berth",
    prompt: `${STYLE} Portrait of Medusa, ruthless human field assassin: sharp-featured woman with cold calm eyes, black tactical bodysuit and knife harness, short practical hair. Professional killer. Upper-body portrait, dark corridor rim light.`,
    inference: [],
    image: "assets/images/characters/medusa.jpg",
  },
  {
    slug: "liliana",
    title: "Liliana",
    kind: "character",
    clade: "Human mercenary (Lidon-linked)",
    role: "Deniable operator; opens book dumping Finn; cherenkov blade",
    cues: ["Mercenary face across decades of world-time", "Lidon underworld chic", "Dangerous competence"],
    clothing: "Stylish mercenary coat over light armour, cherenkov-blade sheath on hip",
    setting: "Aircraft hatch / Anoosha cloud haze memory",
    prompt: `${STYLE} Portrait of Liliana, Lidon-linked human mercenary: striking woman with cool professional expression, stylish dark mercenary coat over light armour, exotic blade sheath on hip. Deniable operator chic. Upper-body portrait, windy hatch light and cloud haze.`,
    inference: [],
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
    prompt: `${STYLE} Portrait of Toše, heavy-weapons mercenary and sniper: rugged muscular man with grim focused expression, combat harness and scarred armour plates, ammo webbing, short beard stubble. Loud half of a deniable duo. Upper-body portrait, harsh daylight and dust.`,
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
    prompt: `${STYLE} Portrait of Gyvoy Enfoe as the charming offworld financier cover identity: polished human man with too-smooth confident smile, expensive dark suit with subtle high-tech cufflinks, immaculate hair. Deal-maker who attaches to a liberation project. Upper-body portrait, warm negotiation-room light.`,
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
    clade: "Traveler charter starship",
    role: "Andino’s deniable hull; flies inside the Infinite Totality shell",
    cues: [
      "Atypical Traveler architecture — not freighter lines",
      "Geodesic sphere of golden trusses",
      "Eight ovoid elements that reconfigure by flight status",
    ],
    clothing: "n/a",
    setting: "Near a gas giant ring, three-quarter view",
    prompt: `${STYLE} Exterior plate of the Arcadia’s Moon, an atypical Traveler charter starship: open geodesic sphere of golden metallic trusses enclosing exactly eight sky-blue ovoid elements that can move around inside the sphere and reconfigure their alignment depending on flight status. Warm gold lattice cage, smooth sky-blue ovoid modules with subtle metallic sheen, not a conventional freighter and not a navy capital. Three-quarter view in deep space near a ringed gas giant. Absolutely no text of any kind: no captions, no labels, no lettering, no logos, no brand marks, no hull names, no UI chrome, no watermarks.`,
    inference: [
      "Sky-blue ovoid colour is secondary paraphrase (Fandom); novel p. 241 does not fix colour — keep colour out of article prose",
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
    role: "Evacuates the Jalgori-Tobus from Gondiar to rendezvous with the Diligent",
    cues: [
      "Transport / rendezvous hull, not navy capital or generation arkship",
      "Family escape vessel for Uranic client aristocracy",
      "Parallel flight path to Arcadia's Moon / Infinite Totality",
      "Mid-size private transport with docking collar for arkship rendezvous",
    ],
    clothing: "n/a",
    setting: "Climbing from planetary orbit toward deep-space rendezvous",
    prompt: `${STYLE} Exterior plate of the Polkadav, a mid-size human transport and rendezvous hull used for aristocratic family evacuation: sleek private passenger transport with refined dark-bronze and cream plating, passenger windows, docking collar for arkship rendezvous, not a warship and not a generation arkship. Three-quarter view climbing from planetary orbit with atmosphere limb glow, ready for deep-space rendezvous.`,
    inference: [
      "Exact hull lines not in the novel — mid private transport between civilian yacht and freighter",
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
      "Celestial hull from Wynid archon household of Makaio-Faraji",
      "Material support for human detective carrying Makaio-Spirit",
      "Crown design language related to but distinct from Alumata — more compact loaner",
    ],
    clothing: "n/a",
    setting: "Against starfield, cool luminous Crown aesthetic",
    prompt: `${STYLE} Exterior plate of the Aeacus, a compact Crown Imperial Celestial household ship lent to a human investigator: elegant elongated pearlescent silver-violet hull with livestone-like plating, refined personal yacht lines smaller than a capital or freighter, subtle glowing spinal ridge, Wynid archon-household craft. Three-quarter view against deep starfield, cool luminous lighting.`,
    inference: [
      "Exact silhouette not in the novel — smaller refined Celestial craft in Crown archon design family",
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
| **Image path** | \`${b.image}\` |

## Physical / design cues (research)

${b.cues.map((c) => `- ${c}`).join("\n")}

## Clothing / finish

${b.clothing}

## Setting / composition

${b.setting}

## Inference flags

${b.inference.length ? b.inference.map((i) => `- ${i}`).join("\n") : "- None — cues grounded in wiki article + clade grammar."}

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
