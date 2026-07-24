import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "pages", "characters");

const shell = (title, bodyMain) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — Exodus Wiki</title>
  <link rel="stylesheet" href="../../assets/css/wiki.css">
</head>
<body data-root="../../">
  <header class="site-header">
    <button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-sidebar">Menu</button>
    <a class="site-title" href="../../index.html">Exodus Wiki</a>
    <form class="search-form" action="../../search.html" method="get" role="search">
      <input class="search-input" type="search" name="q" placeholder="Search wiki…" autocomplete="off" aria-label="Search">
      <button type="submit">Search</button>
      <div class="search-dropdown" hidden></div>
    </form>
  </header>
  <div class="layout">
    <aside class="sidebar" id="site-sidebar">
      <nav aria-label="Wiki">
        <ul>
          <li><a href="../../../index.html">All book wikis</a></li>
          <li><a href="../../index.html">Main Page</a></li>
          <li><a href="../book.html">Book</a></li>
          <li><a href="index.html">Characters</a></li>
          <li><a href="../locations/index.html">Locations</a></li>
          <li><a href="../factions/index.html">Factions</a></li>
          <li><a href="../factions/dominions-roster.html">Dominions</a></li>
          <li><a href="../technology/index.html">Technology</a></li>
          <li><a href="../timeline.html">Timeline</a></li>
          <li><a href="../plot.html">Plot</a></li>
          <li><a href="../chapters.html">Chapters</a></li>
        </ul>
      </nav>
    </aside>
    <main class="content">
${bodyMain}
    </main>
  </div>
  <script src="../../assets/data/search-index.js"></script>
  <script src="../../assets/js/search.js"></script>
</body>
</html>
`;

function page({ title, h1, infobox, lead, sections, seeAlso }) {
  const dl = infobox
    .map(([dt, dd]) => `            <dt>${dt}</dt>\n            <dd>${dd}</dd>`)
    .join("\n");
  const secs = sections
    .map(
      (s) => `
        <section>
          <h2>${s.h2}</h2>
          ${s.paras.map((p) => `<p>\n            ${p}\n          </p>`).join("\n")}
        </section>`
    )
    .join("\n");
  const see = seeAlso.map((a) => `            <li>${a}</li>`).join("\n");
  const body = `      <article class="article">
        <header>
          <h1>${h1}</h1>
        </header>
        <aside class="infobox">
          <h2>${h1}</h2>
          <dl>
${dl}
          </dl>
        </aside>
        <p class="lead">
          ${lead}
        </p>
${secs}

        <section>
          <h2>See also</h2>
          <ul>
${see}
            <li><a href="celestials-roster.html">Celestials roster</a></li>
            <li><a href="../factions/celestials.html">Celestials (faction)</a></li>
          </ul>
        </section>

        <footer class="article-footer categories">
          Categories:
          <a href="index.html">Characters</a> ·
          <a href="celestials-roster.html">Celestials</a>
        </footer>
      </article>`;
  return shell(title, body);
}

const celestials = [
  {
    file: "makaio.html",
    title: "Makaio",
    h1: "Makaio",
    infobox: [
      ["Mindline name", "Makaio-Yalbo → Makaio-Faraji (host succession)"],
      ["Role", "Archon / spymaster of Queen <a href=\"helena-chione.html\">Helena-Chione</a> of Wynid"],
      ["Brief", "Kelowan-system intelligence; later Wynid oversight until hardline purge"],
      ["Affiliation", "<a href=\"../factions/celestials.html\">Imperial Celestials</a>; Wynid / Crown Dominion"],
      ["Ship (excerpt)", "<em><a href=\"../locations/alumata.html\">Alumata</a></em>"],
      ["Successor hosts", "Faraji (selected son); residual Makaio-Spirit in <a href=\"terence-wilson-fletcher.html\">Terence</a>"],
      ["Son / ally", "Neusch (neural gifts; continues investigation)"],
    ],
    lead: `<strong>Makaio</strong> is a multi-host Wynid archon mindline — <strong>Makaio-Yalbo</strong> in the prologue, later <strong>Makaio-Faraji</strong> — whose spycraft spans the Dolod warning, Gondiar intelligence, and a dying neural transfer into detective <a href="terence-wilson-fletcher.html">Terence Wilson-Fletcher</a>.`,
    sections: [
      {
        h2: "Mindline succession",
        paras: [
          `Imperial Celestial naming keeps the originator name (Makaio) and changes the second element with each host. Excerpt lore shows Makaio-Yalbo preparing to gift his mindline into son Faraji amid bloodstone fashion and athanasia culture. Timeline recaps later use Makaio-Faraji for the same archon line at Gondiar and Wynid trials.`,
          `As one of Helena’s spymasters, his Kelowan brief makes him the Crown counterpart to foreign archons such as <a href="olomo.html">Olomo</a> (Heresy) and <a href="sahdiah.html">Sahdiah</a> (Talloch-Te).`,
        ],
      },
      {
        h2: "Dolod warning and long game",
        paras: [
          `Decades before Carolien’s coronation, Makaio-Yalbo meets Olomo at a remote Tinaja Lagrangian point. Olomo reveals gas giant <a href="../locations/dolod.html">Dolod</a> — an iron exotic with an Elohim <a href="../technology/archimedes-engine.html">Archimedes Engine</a> — is on course into Kelowan. That intelligence starts the novel’s strategic clock.`,
          `He reports through Chief Archon <a href="lord-gahiji.html">Gahiji-Calder</a> to Helena, who treats human impacts as secondary to queen-council economics.`,
        ],
      },
      {
        h2: "Gondiar, loyalty tests, and death",
        paras: [
          `Makaio-Faraji uses Terence as a human instrument: Wynid loyalty-test invitation during Thyra’s first combat trial; later meetings on the <em><a href="../locations/alumata.html">Alumata</a></em>; suspicion that <a href="gyvoy-enfoe.html">Gyvoy</a>/Bopbe networks may touch Mara Yama interests. Under hardline <a href="thyra.html">Helena-Thyra</a>, Uulana-Shoigu fires him from Wynid oversight and winds down his Gondiar task force.`,
          `<a href="tose.html">Toše</a> snipes him at the Governor’s mansion. Dying, he neurally transfers an aspect of himself into Terence — the <strong>Makaio-Spirit</strong> — which activates protocols with Neusch and drives the late Gyvoy / Diligent / Dolod manhunt.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="helena-chione.html">Helena-Chione</a>',
      '<a href="lord-gahiji.html">Lord Gahiji</a>',
      '<a href="olomo.html">Olomo</a>',
      '<a href="terence-wilson-fletcher.html">Terence Wilson-Fletcher</a>',
      '<a href="neusch.html">Neusch</a>',
    ],
  },
  {
    file: "sahdiah.html",
    title: "Sahdiah",
    h1: "Sahdiah",
    infobox: [
      ["Role", "Archon of the Talloch-Te (nomad trader dominion)"],
      ["Affiliation", "<a href=\"../factions/celestials.html\">Celestials</a> (Talloch-Te)"],
      ["Crown alignment", "Verak / <a href=\"carolien-amaia.html\">Carolien-Amaia</a> orbit (helium &amp; shipbuilding)"],
      ["Assets", "<a href=\"marcellu.html\">Marcellu</a>; <a href=\"medusa.html\">Medusa</a>; tasking via <a href=\"andino.html\">Andino</a>"],
      ["Agenda", "Suppress ZPZ “random factors”; investigate Marcellu’s murder; Dolod endgame"],
    ],
    lead: `<strong>Sahdiah</strong> is the Talloch-Te archon who uses Traveler logistics as deniable sensors — ordering interference against the <a href="../locations/arkship-diligent.html"><em>Diligent</em></a>’s ZPZ bid, tasking <a href="medusa.html">Medusa</a> after Marcellu’s death, and burning for <a href="../locations/dolod.html">Dolod</a> when Terence’s warning reaches him.`,
    sections: [
      {
        h2: "Talloch-Te and Crown politics",
        paras: [
          `Excerpt diplomacy frames Talloch-Te as a major ship-fabrication dominion and heavy helium-3 consumer. Verak aligns with Talloch-Te; Wynid with Heresy. Sahdiah is the Talloch-Te intelligence face of that rivalry.`,
        ],
      },
      {
        h2: "ZPZ denial and Marcellu",
        paras: [
          `Sahdiah asks <a href="marcellu.html">Marcellu</a> (with Andino on the <em><a href="../locations/arcadias-moon.html">Arcadia’s Moon</a></em>) to prevent the Diligent from acquiring a ZPZ generator. After <a href="liliana.html">Liliana</a> kills Marcellu with a cherenkov blade, Sahdiah summons Medusa, suspects <a href="olomo.html">Olomo</a>, and sets her to investigate.`,
        ],
      },
      {
        h2: "Endgame convergence",
        paras: [
          `Medusa’s late message sends Sahdiah toward Dolod. He and Olomo trade accusations before realizing neither authored the Engine crisis. Asahi-Iryna is later dispatched after both foreign archons and the fleeing arkship.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="olomo.html">Olomo</a>',
      '<a href="medusa.html">Medusa</a>',
      '<a href="marcellu.html">Marcellu</a>',
      '<a href="andino.html">Andino</a>',
      '<a href="asahi-iryna.html">Asahi-Iryna</a>',
    ],
  },
  {
    file: "lord-jolav.html",
    title: "Lord Jolav",
    h1: "Lord Jolav",
    infobox: [
      ["Full court style", "Jolav-Dabny"],
      ["Role", "Consort to <a href=\"helena-chione.html\">Helena-Chione</a>; father of <a href=\"clavissa.html\">Clavissa</a>"],
      ["Affiliation", "Wynid court; residual opposition under Helena-Thyra"],
      ["Allies after coup", "Gahiji-Calder; Makaio line; Clavissa as spy channel"],
    ],
    lead: `<strong>Lord Jolav</strong> (Jolav-Dabny) is consort to Queen <a href="helena-chione.html">Helena-Chione</a> and father of <a href="clavissa.html">Clavissa</a>. After Thyra’s mindline coup he becomes a quiet opposition node — comparing notes with sidelined archons and asking Clavissa to spy on Helena-Thyra’s early Kelowan fleet.`,
    sections: [
      {
        h2: "Consort and father",
        paras: [
          `Public lists place Jolav as Helena’s consort and Clavissa’s father, distinct from <a href="bekket.html">Bekket</a>’s liaison that produces Thyra. He represents the court family line that loses when Bekket’s daughter seizes the mindline.`,
        ],
      },
      {
        h2: "Opposition under Helena-Thyra",
        paras: [
          `Clavissa confides distrust of Thyra to Jolav. When Thyra’s fleet leaves early for Kelowan, Jolav asks Clavissa to spy and points her to Neusch. He joins Gahiji and Makaio as residual elites map Uulana-Shoigu’s infiltration.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="helena-chione.html">Helena-Chione</a>',
      '<a href="clavissa.html">Clavissa</a>',
      '<a href="bekket.html">Bekket</a>',
      '<a href="lord-gahiji.html">Lord Gahiji</a>',
    ],
  },
  {
    file: "siskala.html",
    title: "Siskala",
    h1: "Siskala",
    infobox: [
      ["Role", "Major of the Wynid Royal Tiger Guard"],
      ["Relation", "Daughter of <a href=\"helena-chione.html\">Helena-Chione</a>; “new life” (not mindline host)"],
      ["Affiliation", "Wynid court military"],
    ],
    lead: `<strong>Siskala</strong> is Major of the Wynid Royal Tiger Guard and a daughter of Queen <a href="helena-chione.html">Helena-Chione</a> classified as <em>new life</em> — not selected as mindline host. She is the court’s professional military face rather than a congregant-trial rival for the crown.`,
    sections: [
      {
        h2: "Tiger Guard and new life",
        paras: [
          `Imperial Celestial culture routes some offspring into mindline candidacy and others into “new life” careers. Siskala’s Tiger Guard majorate places her as a key military figure around Helena’s household and honor formations. Public materials give her less dialogue than Thyra or Clavissa; her importance is institutional armed continuity of Wynid queenship.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="helena-chione.html">Helena-Chione</a>',
      '<a href="thyra.html">Thyra</a>',
      '<a href="clavissa.html">Clavissa</a>',
    ],
  },
  {
    file: "acelynn.html",
    title: "Acelynn",
    h1: "Acelynn",
    infobox: [
      ["Role", "Chief Archon of Queen <a href=\"carolien-amaia.html\">Carolien-Amaia</a> of Verak"],
      ["Affiliation", "Verak court; Imperial Palace politics at Kelowan"],
      ["Mindline status", "Major mindline (public Celestial lists)"],
    ],
    lead: `<strong>Acelynn</strong> is Chief Archon to Now and Forever Queen <a href="carolien-amaia.html">Carolien-Amaia</a> of Verak — the Verak counterpart to Helena’s Gahiji. Public mindline lists place Acelynn among major Crown mindlines of the Archimedes Engine era.`,
    sections: [
      {
        h2: "Verak’s chief operator",
        paras: [
          `While detailed archon scenes often follow Wynid and foreign peers, Acelynn is the named institutional mind beside the rotating Empress. Carolien’s Gondiar crackdown, Kelowan fleet exercises, and collapse under kestrel-sprite sabotage all pass through Verak/imperial staff structures Acelynn represents. Soft uncertainty: lists confirm title more than full POV dialogue.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="carolien-amaia.html">Carolien-Amaia</a>',
      '<a href="lord-gahiji.html">Lord Gahiji</a>',
      '<a href="../factions/crown-dominion.html">Crown Dominion</a>',
    ],
  },
  {
    file: "ramona-ursule.html",
    title: "Ramona-Ursule",
    h1: "Ramona-Ursule",
    infobox: [
      ["Title", "Now and Forever Queen of Nizinsk"],
      ["Affiliation", "<a href=\"../factions/crown-dominion.html\">Crown Dominion</a> Imperial Accord"],
      ["Notable stage", "Politics trial hosting multi-house congregants (Thyra’s third trial)"],
    ],
    lead: `<strong>Ramona-Ursule</strong> is the Now and Forever Queen of <strong>Nizinsk</strong>. Her court hosts the multi-dominion politics trial where <a href="thyra.html">Thyra</a> wins elevation to princess.`,
    sections: [
      {
        h2: "Queen of Nizinsk",
        paras: [
          `Public lists group Ramona with Inessa and Luus as peer queens beside Helena (Wynid) and Carolien (Verak). Each holds a home system under the Imperial Accord and can host inter-house rituals that sort future princesses.`,
        ],
      },
      {
        h2: "Politics trial",
        paras: [
          `Thyra, Clavissa, Noasla, Salfina, and congregants from across Crown domains visit Ramona-Ursule’s court. Thyra wins by reconstructing House Vanovi’s financial discrepancies as ecological downturn — earning Helena’s deep mindline gift afterward.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="thyra.html">Thyra</a>',
      '<a href="helena-chione.html">Helena-Chione</a>',
      '<a href="inessa-pierina.html">Inessa-Pierina</a>',
      '<a href="luus.html">Luus</a>',
    ],
  },
  {
    file: "inessa-pierina.html",
    title: "Inessa-Pierina",
    h1: "Inessa-Pierina",
    infobox: [
      ["Title", "Now and Forever Queen of Cheluli"],
      ["Affiliation", "<a href=\"../factions/crown-dominion.html\">Crown Dominion</a>"],
      ["Also listed as", "Inessa (mindline originator name)"],
    ],
    lead: `<strong>Inessa-Pierina</strong> is the Now and Forever Queen of <strong>Cheluli</strong>, one of the Crown Dominion’s peer queens. She appears in public character lists as a full royal seat; the novel stages fewer on-page scenes at her court than at Wynid, Verak, or Nizinsk.`,
    sections: [
      {
        h2: "Peer queen of the Accord",
        paras: [
          `The Dominion’s balance depends on multiple Now and Forever Queens rotating the empress role and massing fleets at Kelowan. Soft uncertainty applies to Inessa’s private policies; confirmed is her status as major mindline queen of Cheluli.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="carolien-amaia.html">Carolien-Amaia</a>',
      '<a href="ramona-ursule.html">Ramona-Ursule</a>',
      '<a href="luus.html">Luus</a>',
    ],
  },
  {
    file: "luus.html",
    title: "Luus",
    h1: "Luus",
    infobox: [
      ["Mindline / styles", "Luus; Luus-Kinza (empress host); Luus-Marcela (some lists)"],
      ["Title", "Now and Forever Queen of Bassa; prior Empress"],
      ["Affiliation", "<a href=\"../factions/crown-dominion.html\">Crown Dominion</a>"],
      ["Succession beat", "Hands imperial throne to <a href=\"carolien-amaia.html\">Carolien-Amaia</a> for ~60 years"],
    ],
    lead: `<strong>Luus</strong> is the Now and Forever Queen of <strong>Bassa</strong> (styles include <strong>Luus-Kinza</strong> as empress and <strong>Luus-Marcela</strong> in some lists). She is the Empress who hands the rotating throne to Carolien-Amaia at the novel’s coronation hinge.`,
    sections: [
      {
        h2: "Empress of Bassa’s line",
        paras: [
          `Excerpt scenes place Empress Luus-Kinza commissioning palace expansions for beast handlers and Bassa security, with Master of the Imperial Court Lord Dinasel at Kelowan’s Queen’s Station. Helena privately calls Luus insecure about security.`,
          `Timeline: Luus-Kinza hands the throne to Carolien-Amaia for sixty years — the reset that also frames Bekket’s liaison with Helena and Thyra’s birth.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="carolien-amaia.html">Carolien-Amaia</a>',
      '<a href="helena-chione.html">Helena-Chione</a>',
      '<a href="zuberi-dulcina.html">Zuberi-Dulcina</a>',
    ],
  },
  {
    file: "zuberi-dulcina.html",
    title: "Zuberi-Dulcina",
    h1: "Zuberi-Dulcina",
    infobox: [
      ["Title", "Former Now and Forever Queen of Kelowan (deposed / deceased)"],
      ["Era", "Pre–Imperial Accord crisis (~7,000 years before main events)"],
      ["Legacy", "Neural weapons &amp; evolution dogma; Accord founded in reaction"],
      ["Fate", "Killed with family; no biology/neurology/princesses survived (Gahiji)"],
      ["Rumors", "Queen-in-exile / Malakbel threads in secondary lore"],
    ],
    lead: `<strong>Zuberi-Dulcina</strong> was Now and Forever Queen of <a href="../locations/kelowan.html">Kelowan</a>. Her campaign to “evolve” Imperial Celestials further ended in Alliance invasion, her death, and the Imperial Accord. She is the historical trauma living Crown queens refuse to forget.`,
    sections: [
      {
        h2: "War and the Accord",
        paras: [
          `Helena’s retained memories describe Kelowan in ruins on Accord day. The other queens allied against Zuberi’s neural weapons and deranged evolution dogma. Roughly seven thousand years of shared rule follow — balance without trust.`,
          `Gahiji later notes total mindline extinction: no biology, neurology, or young princesses survived.`,
        ],
      },
      {
        h2: "Echoes in the novel",
        paras: [
          `Zuberi’s palace mountain becomes the Imperial Palace. QIX (Queen In Exile) underworld sentiment keeps her name politically radioactive. Helena preserves Accord founding memories to prevent a Zuberi-style return.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="helena-chione.html">Helena-Chione</a>',
      '<a href="lord-gahiji.html">Lord Gahiji</a>',
      '<a href="../factions/crown-dominion.html">Crown Dominion</a>',
    ],
  },
  {
    file: "uulana.html",
    title: "Uulana",
    h1: "Uulana",
    infobox: [
      ["Figures", "Uulana-Lyon (investigator); Uulana-Shoigu (infiltrated chief archon)"],
      ["Relation", "Consort line / court parent; Lyon’s daughter Delfina dies in trials"],
      ["Shoigu true operator", "Iuntin-Detlef of Bekket’s Guillrameo network"],
      ["Affiliation", "Wynid court → hardline machinery under Helena-Thyra"],
    ],
    lead: `<strong>Uulana</strong> names a Wynid political cluster: <strong>Uulana-Lyon</strong>, who investigates Bekket and dies in a slowball ambush, and <strong>Uulana-Shoigu</strong> — Iuntin-Detlef wearing a stolen identity as chief archon under <a href="thyra.html">Helena-Thyra</a>.`,
    sections: [
      {
        h2: "Uulana-Lyon: investigator",
        paras: [
          `After Binji kills Lyon’s daughter Delfina, Uulana-Lyon suspects Bekket and Thyra. His Uixic inquiry ends in slowball assassination; he glimpses cloned-looking gallery figures before death. The wreck is discarded at Tonobo.`,
        ],
      },
      {
        h2: "Uulana-Shoigu: infiltrated chief archon",
        paras: [
          `Under Helena-Thyra, Gahiji is replaced by Uulana-Shoigu — Iuntin-Detlef after neural takeover. Shoigu fires Makaio, lies about red-dwarf Celestials, steers Carolien into Gondiar clampdowns, and rejoins Thyra’s fleet.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="bekket.html">Bekket</a>',
      '<a href="thyra.html">Thyra</a>',
      '<a href="lord-gahiji.html">Lord Gahiji</a>',
      '<a href="makaio.html">Makaio</a>',
    ],
  },
  {
    file: "valdier.html",
    title: "Lord Valdier",
    h1: "Lord Valdier",
    infobox: [
      ["Full style", "Lord Valdier-Mímir"],
      ["Role", "Father of <a href=\"helena-chione.html\">Helena-Chione</a>; Master of the Court"],
      ["Affiliation", "Wynid royal household"],
    ],
    lead: `<strong>Lord Valdier</strong> (Valdier-Mímir) is father of Queen <a href="helena-chione.html">Helena-Chione</a> and Master of the Court in coronation-era scenes — the older generation of Wynid protocol who introduces guests such as Count <a href="bekket.html">Bekket</a>.`,
    sections: [
      {
        h2: "Master of the Court",
        paras: [
          `Public lists place Valdier as Helena’s father and Master of the Court. Excerpt beats show him managing ballroom introductions as queens circulate with entourages. He is house etiquette continuity, distinct from Bekket’s later hardline master-of-court role under Helena-Thyra.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="helena-chione.html">Helena-Chione</a>',
      '<a href="bekket.html">Bekket</a>',
      '<a href="lord-jolav.html">Lord Jolav</a>',
    ],
  },
  {
    file: "stethos-thierry.html",
    title: "Lord Stethos-Thierry",
    h1: "Lord Stethos-Thierry",
    infobox: [
      ["Role", "Court datamaster to <a href=\"helena-chione.html\">Helena-Chione</a>"],
      ["Affiliation", "Wynid court"],
      ["Function", "Networked knowledge servant — queen need not connect personally"],
      ["Mindline list", "Stethos (minor mindline)"],
    ],
    lead: `<strong>Lord Stethos-Thierry</strong> is court datamaster to Queen Helena-Chione: a permanently interfaced information officer who answers her factual queries so she need not touch networks herself.`,
    sections: [
      {
        h2: "Datamaster of Wynid",
        paras: [
          `Excerpt: Stethos stands shorter than his ~3&nbsp;m queen, scarlet-and-gray robes, bloodstone petals, permanent connection bulb. He identifies Luus-Kinza’s palace expansions, offers archive searches, and fields reports including Makaio’s return and the Olomo meeting.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="helena-chione.html">Helena-Chione</a>',
      '<a href="lord-gahiji.html">Lord Gahiji</a>',
      '<a href="makaio.html">Makaio</a>',
    ],
  },
  {
    file: "asahi-iryna.html",
    title: "Asahi-Iryna",
    h1: "Asahi-Iryna",
    infobox: [
      ["Role", "Archon; replaces Makaio’s Wynid oversight under hardliners"],
      ["Affiliation", "Wynid / Crown hardline apparatus under Helena-Thyra"],
      ["Endgame task", "Dispatched after the <em>Diligent</em>, Olomo, and Sahdiah"],
    ],
    lead: `<strong>Asahi-Iryna</strong> is the archon who takes Wynid-related oversight after Makaio-Faraji is fired, and who is later ordered to pursue the fleeing <em>Diligent</em> and foreign archons during the Dolod endgame.`,
    sections: [
      {
        h2: "Hardline replacement and pursuit",
        paras: [
          `Under Uulana-Shoigu’s pressure, Makaio loses Wynid oversight; Asahi-Iryna becomes the named replacement. When the Diligent’s Capo Frois vector reads as guilt, Thyra’s apparatus sends Asahi-Iryna after the arkship and after Olomo and Sahdiah.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="makaio.html">Makaio</a>',
      '<a href="thyra.html">Thyra</a>',
      '<a href="olomo.html">Olomo</a>',
      '<a href="sahdiah.html">Sahdiah</a>',
    ],
  },
  {
    file: "avone-valerio.html",
    title: "Avone-Valerio",
    h1: "Avone-Valerio",
    infobox: [
      ["Rank", "General (hardline navy)"],
      ["Affiliation", "Crown Dominion navy under Empress Carolien’s crackdown"],
      ["Theater", "<a href=\"../locations/gondiar.html\">Gondiar</a> lockdown"],
      ["Mindline list", "Avone (minor mindline)"],
    ],
    lead: `<strong>General Avone-Valerio</strong> commands the hardline navy fleet that locks down Gondiar after Makaio’s murder — ghost units, awakened animals, navy HQ in Jalgori-Tobu spaces, and the occupation that radicalizes the liberation crisis.`,
    sections: [
      {
        h2: "Gondiar occupation",
        paras: [
          `Manipulated by Uulana-Shoigu, Empress <a href="carolien-amaia.html">Carolien-Amaia</a> dispatches Avone-Valerio. Josias’s strike broadcast, airstrikes killing the Marchioness, and the family’s flight all occur under this occupation.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="carolien-amaia.html">Carolien-Amaia</a>',
      '<a href="uulana.html">Uulana</a>',
      '<a href="josias-aponi.html">Josias Aponi</a>',
    ],
  },
  {
    file: "dagon.html",
    title: "Dagon",
    h1: "Dagon",
    infobox: [
      ["Nature", "Celestial-grade operator; offworld contact / imposture network"],
      ["Covers", "Operates the <a href=\"gyvoy-enfoe.html\">Gyvoy Enfoe</a> imposture"],
      ["Family reveal", "Thyra’s uncle (endgame recaps)"],
      ["Affiliation", "<a href=\"bekket.html\">Bekket</a> / Guillrameo extended network"],
      ["Human investigation", "Terence ordered not to pursue; later core manhunt target"],
    ],
    lead: `<strong>Dagon</strong> is the offworld Celestial-linked operator who enters Santa Rosa gang networks as <a href="gyvoy-enfoe.html">Gyvoy Enfoe</a>’s contact, operates the Gyvoy imposture that steers the Engine plot, and is revealed as <a href="thyra.html">Thyra</a>’s uncle.`,
    sections: [
      {
        h2: "Crime-network entry point",
        paras: [
          `Terence’s early case: Younes must introduce Dagon to Gyvoy; Younes dies; Colvin immolates. <a href="zelinda-jalgori-tobu.html">Zelinda</a> conveys the Governor’s order not to pursue Dagon.`,
        ],
      },
      {
        h2: "Imposture and Dolod",
        paras: [
          `Late investigation finds <a href="gyvoy-enfoe.html">Gyvoy</a>’s body as a discarded shell. Ellie recovers forced induction-pad memories. Endgame recaps: Dagon is Thyra’s uncle, binding Engine manipulation to Bekket’s dynasty war.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="gyvoy-enfoe.html">Gyvoy Enfoe</a>',
      '<a href="thyra.html">Thyra</a>',
      '<a href="bekket.html">Bekket</a>',
      '<a href="terence-wilson-fletcher.html">Terence Wilson-Fletcher</a>',
      '<a href="finn-jalgori-tobu.html">Finn Jalgori-Tobu</a>',
    ],
  },
  {
    file: "radwarno.html",
    title: "Radwarno",
    h1: "Radwarno",
    infobox: [
      ["Rank", "Commander, Verak fleet"],
      ["Affiliation", "Verak navy at Kelowan fleet exercises"],
      ["Orders", "Capture the <em>Diligent</em> during Dolod / Boksrock crisis"],
      ["Mindline list", "Radwarno (minor mindline)"],
    ],
    lead: `<strong>Commander Radwarno</strong> leads Verak fleet elements at Kelowan. <a href="thyra.html">Helena-Thyra</a> orders him to capture the <em>Diligent</em> once the Engine crisis breaks — a capture that fails when Finn’s ZPZ/anchor escape accelerates the arkship away.`,
    sections: [
      {
        h2: "Capture order and miss",
        paras: [
          `Thyra prefers Finn taken alive for narrative control of the “human rebel” story. The Diligent’s Engine-boosted departure forces a kill-order shift. Radwarno is also sent after the Diligent alongside Asahi-Iryna.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="thyra.html">Thyra</a>',
      '<a href="carolien-amaia.html">Carolien-Amaia</a>',
      '<a href="asahi-iryna.html">Asahi-Iryna</a>',
    ],
  },
  {
    file: "neusch.html",
    title: "Neusch",
    h1: "Neusch",
    infobox: [
      ["Relation", "Son of Makaio-Faraji; recipient of neural gifts"],
      ["Role", "Continues Makaio protocols after assassination"],
      ["Affiliation", "Wynid archon household; residual opposition"],
      ["Endgame", "Uixic investigation; provides Terence the <em>Aecus</em>; aids Clavissa"],
    ],
    lead: `<strong>Neusch</strong> is Makaio-Faraji’s son who already received neural gifts before the archon’s death. When the Makaio-Spirit activates inside Terence, Neusch becomes the living continuation of Makaio’s work.`,
    sections: [
      {
        h2: "Heir of a spymaster line",
        paras: [
          `Neusch provides Terence the <em>Aecus</em>, shares information with Clavissa, and carries residual requests to dig into Bekket-network crimes. He is Celestial youth pressed into adult Great Game residue.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="makaio.html">Makaio</a>',
      '<a href="terence-wilson-fletcher.html">Terence Wilson-Fletcher</a>',
      '<a href="clavissa.html">Clavissa</a>',
      '<a href="lord-jolav.html">Lord Jolav</a>',
    ],
  },
  {
    file: "malquilvo.html",
    title: "Malquilvo",
    h1: "Malquilvo",
    infobox: [
      ["Full style", "Malquilvo-Beaumont (recaps)"],
      ["Role", "Wynid court figure; parent of congregant Valeri"],
      ["Fate", "Killed after accusing foul play in survival trial"],
    ],
    lead: `<strong>Malquilvo</strong> is a Wynid court parent whose daughter Valeri dies in Thyra’s Binji survival trial. When he makes accusations, he is killed as punishment — a public lesson in congregant politics.`,
    sections: [
      {
        h2: "Trial collateral",
        paras: [
          `Thyra uses non-awakened bloodlines to kill sisters including Valeri while “saving” Clavissa for optics. Malquilvo’s protest ends in death; Uulana-Lyon’s parallel suspicion survives longer only to die offworld.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="thyra.html">Thyra</a>',
      '<a href="uulana.html">Uulana</a>',
      '<a href="clavissa.html">Clavissa</a>',
    ],
  },
];

for (const c of celestials) {
  fs.writeFileSync(path.join(dir, c.file), page(c), "utf8");
  console.log("wrote", c.file);
}
console.log("done", celestials.length);
