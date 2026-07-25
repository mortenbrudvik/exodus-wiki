import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// WIKI_OUT_DIR lets check-wiki.mjs render into a scratch directory to prove the
// committed pages still match what this script produces.
const dir = process.env.WIKI_OUT_DIR || path.join(__dirname, "..", "pages", "factions");

const shell = (title, bodyMain) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} — Exodus Wiki</title>
  <link rel="stylesheet" href="../../assets/css/wiki.css">
  <link rel="icon" href="../../assets/icons/favicon.svg" type="image/svg+xml">
</head>
<body data-root="../../">
  <a class="skip-link" href="#main-content">Skip to content</a>
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
          <li><a href="../characters/index.html">Characters</a></li>
          <li><a href="../locations/index.html">Locations</a></li>
          <li><a href="index.html">Factions</a></li>
          <li><a href="dominions-roster.html">Dominions</a></li>
          <li><a href="../technology/index.html">Technology</a></li>
          <li><a href="../timeline.html">Timeline</a></li>
          <li><a href="../plot.html">Plot</a></li>
          <li><a href="../chapters.html">Chapters</a></li>
        </ul>
      </nav>
    </aside>
    <main class="content" id="main-content">
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
            <li><a href="dominions-roster.html">Dominions roster</a></li>
            <li><a href="celestials.html">Celestials</a></li>
            <li><a href="../characters/celestials-roster.html">Celestials roster</a></li>
          </ul>
        </section>

        <footer class="article-footer categories">
          Categories:
          <a href="index.html">Factions</a> ·
          <a href="dominions-roster.html">Dominions</a>
        </footer>
      </article>`;
  return shell(title, body);
}

const dominions = [
  {
    file: "heresy-dominion.html",
    title: "Heresy Dominion",
    h1: "Heresy Dominion",
    infobox: [
      ["Type", "Celestial dominion (peer of the Crown)"],
      ["Clade", "<a href=\"celestials.html\">Heresy Celestials</a> — tall hexapods (~3&nbsp;m; four arms, two legs)"],
      ["Known archon", "<a href=\"../characters/olomo.html\">Olomo</a>"],
      ["Crown alignment", "Favorable / occasional ally of Wynid Royal House"],
      ["Lifespan culture", "Centuries-scale lives; Crown mindline Celestials call them “children”"],
      ["Strengths", "Research reach; large individual warships; planetary engineering interest"],
      ["Book role", "First flags Dolod; Tinaja / HeSea science; endgame pursuit of <em>Diligent</em>"],
    ],
    lead: `The <strong>Heresy Dominion</strong> is a peer <a href="celestials.html">Celestial</a> power whose citizens consider themselves the most refined evolution of post-humanity. In <em>Exodus: The Archimedes Engine</em> it is represented chiefly by archon <a href="../characters/olomo.html">Olomo</a>, who warns Wynid about <a href="../locations/dolod.html">Dolod</a>, keeps Helium Sea watches in Tinaja, and burns hard for the <em>Diligent</em> when the Archimedes Engine crisis detonates.`,
    sections: [
      {
        h2: "People and self-image",
        paras: [
          `Heresy citizens are close to three meters tall with spindly six-limb builds (two legs, four arms), lower body temperatures, and expanded skulls. Their ships can outscale Crown counterparts such as the <em><a href="../locations/alumata.html">Alumata</a></em>; individual hulls carry heavy defensive systems because the Heresy fields fewer traditional war fleets.`,
          `Heresy culture claims greater distance from baseline human stock than the Crown. Imperial Celestials retort that without mindline immortality Heresy lives are short (a few centuries) and therefore “childish.” The rivalry is cultural as much as strategic.`,
        ],
      },
      {
        h2: "Alliance with Wynid",
        paras: [
          `The Heresy and the Wynid Royal House of the <a href="crown-dominion.html">Crown Dominion</a> regard each other favorably — a flexible Great Game alignment, not a permanent federation. Makaio-Yalbo notes the alliance would switch instantly if advantage demanded, just as he would switch the Crown’s. Verak’s opposite alignment with Talloch-Te frames helium and trade politics around the HeSea.`,
        ],
      },
      {
        h2: "Dolod, Elohim science, and the endgame",
        paras: [
          `Olomo’s research teams gain access to HeSea studies and long-range flights around the Pillar of Zeus. They identify Dolod’s track, its iron-exotic composition, and its Archimedes Engine course change seven thousand years ago toward Kelowan. Dumping that intelligence on Wynid is classic peer-dominion statecraft, forcing a Crown crisis without Heresy fingerprints on any Engine sabotage.`,
          `Late in the novel, Olomo spies on Kelowan naval exercises, receives Terence/Makaio-Spirit’s <a href="../characters/gyvoy-enfoe.html">Gyvoy</a> warning, intercepts toward the <em>Diligent</em>, quarrels with <a href="../characters/sahdiah.html">Sahdiah</a>, then tracks the arkship’s Capo Frois escape while hardline Crown forces treat foreign archons as problems to be chased.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="../characters/olomo.html">Olomo</a>',
      '<a href="talloch-te-dominion.html">Talloch-Te Dominion</a>',
      '<a href="crown-dominion.html">Crown Dominion</a>',
      '<a href="../locations/dolod.html">Dolod</a>',
    ],
  },
  {
    file: "talloch-te-dominion.html",
    title: "Talloch-Te Dominion",
    h1: "Talloch-Te Dominion",
    infobox: [
      ["Type", "Celestial dominion — nomadic / trader culture"],
      ["Also styled", "Talloch-Te; Tallach-Te (variant spelling)"],
      ["Profile", "Traders and shipbuilders; physically likened to the nomadic Mara Yama"],
      ["Known archon", "<a href=\"../characters/sahdiah.html\">Sahdiah</a>"],
      ["Crown alignment", "Aligned with Verak Royal House / <a href=\"../characters/carolien-amaia.html\">Carolien-Amaia</a>"],
      ["Economic edge", "Largest ship fabrication industry within ~20 light-years"],
      ["Book role", "HeSea access politics; ZPZ denial vs <em>Diligent</em>; Traveler tasking; Dolod chase"],
    ],
    lead: `The <strong>Talloch-Te Dominion</strong> is a nomadic, trade-focused <a href="celestials.html">Celestial</a> power whose archon <a href="../characters/sahdiah.html">Sahdiah</a> uses <a href="travelers.html">Traveler</a> cutouts to keep “random factors” out of Cluster politics. In the novel it is the Great Game counterweight to Heresy–Wynid friendship: Verak’s empress-era helium ambitions point toward Talloch-Te shipyards and scoop capacity.`,
    sections: [
      {
        h2: "Traders, ships, and nomad image",
        paras: [
          `The Talloch-Te are careful traders rather than open conquerors, with body plans and lifestyle comparable to the space-citadel nomadism of the Mara Yama. They consume large amounts of helium-3 and can supply scoopships and hulls at scale.`,
        ],
      },
      {
        h2: "Verak alignment and the HeSea",
        paras: [
          `Wynid aligns with the Heresy, and Verak with Talloch-Te. If iron-exotic Dolod cheapens Anoosha ore (Verak asset), Carolien as empress might favor Talloch-Te access to the Crown’s HeSea monopoly — a policy other queens would treat as Accord-breaking. Sahdiah’s intelligence work sits inside that economic war even when he never holds a Crown throne.`,
        ],
      },
      {
        h2: "Traveler deniability and Dolod",
        paras: [
          `Sahdiah tasks <a href="../characters/marcellu.html">Marcellu</a> and Andino to stop the <em>Diligent</em> from acquiring a ZPZ generator; after Marcellu’s murder he tasks <a href="../characters/medusa.html">Medusa</a> and later races Dolod when warned of Gyvoy imposture. Talloch-Te power in the novel is felt through archon errands and Traveler logistics more than through open fleet battles at Kelowan.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="../characters/sahdiah.html">Sahdiah</a>',
      '<a href="heresy-dominion.html">Heresy Dominion</a>',
      '<a href="mara-yama.html">Mara Yama</a>',
      '<a href="travelers.html">Travelers</a>',
      '<a href="../characters/carolien-amaia.html">Carolien-Amaia</a>',
    ],
  },
  {
    file: "mara-yama.html",
    title: "Mara Yama",
    h1: "Mara Yama",
    infobox: [
      ["Type", "Celestial dominion / threat culture (nomadic)"],
      ["Lifestyle", "Massive space citadels; no conventional planetary “homeworld”"],
      ["Reputation", "External bogeyman for Crown fleet massing; urban-myth fear even among Celestials"],
      ["Book role", "Pretext for queens’ fleets at Kelowan; Hoa Quinzu / de Verya refuel warnings; annexation rhetoric"],
    ],
    lead: `The <strong>Mara Yama</strong> are a nomadic <a href="celestials.html">Celestial</a> power treated in <em>The Archimedes Engine</em> less as fully staged characters and more as the external threat that justifies hardline Crown policy — fleet concentrations at <a href="../locations/kelowan.html">Kelowan</a>, annexation talk toward Capo Frois and Uthara, and “dynamic leadership” rhetoric after <a href="../characters/thyra.html">Thyra</a>’s coup.`,
    sections: [
      {
        h2: "Nomads of the citadel",
        paras: [
          `The Mara Yama are terrifying Celestials who live in hidden space citadels rather than ordinary territorial homeworlds. They and the Talloch-Te are nomadic body-plan cousins, and Celestial attitudes place them somewhere between strategic rival and horror story.`,
        ],
      },
      {
        h2: "Instrument of Crown hardliners",
        paras: [
          `Helena-Thyra cites increasing Mara Yama activity when seizing Wynid. She proposes annexing Capo Frois and the <a href="uthara-dominion.html">Uthara Dominion</a> (the Mara Yama’s original target before they “stopped” at Hoa Quinzu), false-flag destabilization, and massing all queens’ fleets at Kelowan a decade ahead of a supposed confrontation.`,
          `At Hoa Quinzu the Ratarajan warn the <em>Diligent</em> that Mara Yama forces orbit de Verya to refuel — a concrete theater touch that keeps the threat from being pure propaganda even while Thyra exploits it.`,
        ],
      },
      {
        h2: "What the novel does not resolve",
        paras: [
          `The book does not deliver a full Mara Yama invasion POV. Their narrative function is pressure: they make hardline expansion and fleet theater legible, and they keep Capo Frois / Hoa Quinzu on the strategic map when the <em>Diligent</em> flees. How much Mara Yama activity is real, and how much is inflated by <a href="../characters/bekket.html">Bekket</a>-network politics, is never resolved.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="crown-dominion.html">Crown Dominion</a>',
      '<a href="uthara-dominion.html">Uthara Dominion</a>',
      '<a href="ratarajan-dominion.html">Ratarajan Dominion</a>',
      '<a href="../characters/thyra.html">Thyra</a>',
      '<a href="talloch-te-dominion.html">Talloch-Te Dominion</a>',
    ],
  },
  {
    file: "gomatu-dominion.html",
    title: "Gomatu Dominion",
    h1: "Gomatu Dominion",
    infobox: [
      ["Type", "Celestial dominion"],
      ["Notable project", "Megastructure / Dyson sphere under construction"],
      ["Book link", "Original destination vector of gas giant Dolod before course change"],
      ["Role", "Background strategic context for Elohim / Archimedes Engine history"],
    ],
    lead: `The <strong>Gomatu Dominion</strong> is a <a href="celestials.html">Celestial</a> polity named in the novel’s prologue science brief: they are building a megastructure (a Dyson sphere) and were the apparent destination of iron-exotic gas giant <a href="../locations/dolod.html">Dolod</a> before an Archimedes Engine burn seven thousand years ago redirected the world toward Kelowan.`,
    sections: [
      {
        h2: "Mass hunger and Dolod’s old course",
        paras: [
          `Olomo tells Makaio that Dolod’s track once aligned on JK67b, where Gomatu Celestials construct a sphere that would need enormous mass. An Elohim Engine moving an iron exotic into that project would make sense; the later course change toward the Crown capital system is the political bomb.`,
          `Gomatu do not appear as on-page courtiers in the main plot. Their function is cosmological: they prove Dominions still pursue Dawn-scale engineering, and they explain why Dolod’s history is not a simple natural capture.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="../locations/dolod.html">Dolod</a>',
      '<a href="../technology/archimedes-engine.html">Archimedes Engine</a>',
      '<a href="heresy-dominion.html">Heresy Dominion</a>',
      '<a href="../characters/olomo.html">Olomo</a>',
    ],
  },
  {
    file: "uthara-dominion.html",
    title: "Uthara Dominion",
    h1: "Uthara Dominion",
    infobox: [
      ["Type", "Celestial dominion (annexation target in hardline plans)"],
      ["Book role", "Named with Capo Frois as region Thyra proposes to annex"],
      ["Strategic frame", "Mara Yama’s “original target” before Hoa Quinzu pause"],
    ],
    lead: `The <strong>Uthara Dominion</strong> is a neighboring <a href="celestials.html">Celestial</a> polity that appears in <a href="../characters/thyra.html">Helena-Thyra</a>’s expansion program: annex Capo Frois and Uthara to grow economy and workforce ahead of a future Mara Yama war — including false-flag talk that would destabilize the region on purpose.`,
    sections: [
      {
        h2: "Pawn on the hardline board",
        paras: [
          `Uthara’s court is barely staged. Its importance is geopolitical: hardliners treat it as annexable mass, and Mara Yama’s earlier vector runs toward Uthara before their activity concentrates near Hoa Quinzu. The <em>Diligent</em>’s late flight toward Capo Frois places human rebels on the edge of the same contested map.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="mara-yama.html">Mara Yama</a>',
      '<a href="../characters/thyra.html">Thyra</a>',
      '<a href="crown-dominion.html">Crown Dominion</a>',
    ],
  },
  {
    file: "ratarajan-dominion.html",
    title: "Ratarajan Dominion",
    h1: "Ratarajan Dominion",
    infobox: [
      ["Type", "Celestial dominion"],
      ["Book theater", "Hoa Quinzu system — warns <em>Diligent</em> of Mara Yama presence"],
      ["Role", "Local authority / intelligence touch during Kajval campaign"],
    ],
    lead: `The <strong>Ratarajan Dominion</strong> is the Celestial power that warns the <a href="../locations/arkship-diligent.html"><em>Diligent</em></a> in the Hoa Quinzu system that <a href="mara-yama.html">Mara Yama</a> forces are present — orbiting de Verya to refuel — just as Finn and Ellie’s team stage the Kajval Celestial dropship theft.`,
    sections: [
      {
        h2: "Hoa Quinzu contact",
        paras: [
          `The Ratarajan appearance is brief but structural: it proves Mara Yama activity is not only Wynid propaganda, and it raises the stakes of the Kajval extraction under ghost and saberstone fire. Ratarajan internal politics stay offstage; their role is that of the local dominion voice the <em>Diligent</em> must heed while deep in foreign space.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="mara-yama.html">Mara Yama</a>',
      '<a href="../characters/finn-jalgori-tobu.html">Finn Jalgori-Tobu</a>',
      '<a href="../characters/elsbeth-mcquillan.html">Elsbeth McQuillan</a>',
      '<a href="../locations/arkship-diligent.html">Arkship Diligent</a>',
    ],
  },
  {
    file: "elohim.html",
    title: "Elohim",
    h1: "Elohim",
    infobox: [
      ["Type", "Ancient Dawn Era civilization; predates human arrival in the Cluster"],
      ["Era", "Dawn / early Cluster terraforming ages — long before Crown Accord"],
      ["Legacy tech", "<a href=\"../technology/archimedes-engine.html\">Archimedes Engines</a>; Eden-world planetary engineering"],
      ["Book role", "Deep past that explains Dolod’s mobility and habitable-world abundance"],
      ["Status in novel present", "Gone as a living polity; works remain as Remnants / Engines"],
    ],
    lead: `The <strong>Elohim</strong> are the Dawn Era planetary engineers of the <a href="../locations/centauri-cluster.html">Centauri Cluster</a> — the ancient power that used Archimedes Engines to move worlds into stellar life bands and terraform millions of Eden planets. They are not a “current” dominion of the novel’s politics, but every Dominion lives in their architecture.`,
    sections: [
      {
        h2: "Engineers of Eden",
        paras: [
          `Olomo’s briefing explains that planets do not naturally sit in life bands, and that the Elohim moved them. Archimedes Engines still attached to bodies such as Dolod can perform momentum transfers millennia later. Crown and Heresy astronomers treat Elohim works as both resource and hazard.`,
        ],
      },
      {
        h2: "Remnant inheritance",
        paras: [
          `Traveler lore holds that today’s great Dominions are shadows of older empires, and that Remnants can save or destroy. The Elohim sit at the top of that inheritance stack — the reason livable worlds exist for Celestials to rule and late arkships to covet.`,
        ],
      },
    ],
    seeAlso: [
      '<a href="../technology/archimedes-engine.html">Archimedes Engine</a>',
      '<a href="../locations/dolod.html">Dolod</a>',
      '<a href="travelers.html">Travelers</a>',
    ],
  },
];

for (const d of dominions) {
  fs.writeFileSync(path.join(dir, d.file), page(d), "utf8");
  console.log("wrote", d.file);
}
console.log("done", dominions.length);
