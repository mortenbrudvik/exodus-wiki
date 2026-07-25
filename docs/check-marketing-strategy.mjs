/**
 * Structural gate for docs/marketing-strategy.md
 *
 * Proves the shipped strategy artifact meets the marketing-goal acceptance
 * criteria (audience segments, positioning, CTA, templates, constraints).
 * Run from repo root: node docs/check-marketing-strategy.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const STRATEGY = join(ROOT, "docs", "marketing-strategy.md");
const HUB_CTA = "https://mortenbrudvik.github.io/exodus-wiki/";

const failures = [];
function ok(cond, msg) {
  if (!cond) failures.push(msg);
}

if (!existsSync(STRATEGY)) {
  console.error(`FAIL: missing strategy file: ${STRATEGY}`);
  process.exit(1);
}

const text = readFileSync(STRATEGY, "utf8");
ok(text.trim().length > 500, "strategy must be non-empty substantial Markdown");

// Purpose: awareness among Exodus-interested people
ok(
  /aware|awareness|discover/i.test(text) && /wiki/i.test(text),
  "purpose must mention awareness/discovery of the wiki",
);
ok(
  /Exodus/i.test(text) && /(novel|book)/i.test(text),
  "must target Exodus novel/book interest",
);

// Audience: ≥3 segments including novel readers and game/franchise
const segmentHeads = [
  ...text.matchAll(/###\s+Segment\s+[A-Z]\s+[—–-]\s+(.+)/g),
].map((m) => m[1]);
ok(
  segmentHeads.length >= 3,
  `need ≥3 audience segments, found ${segmentHeads.length}`,
);
ok(
  segmentHeads.some((h) => /novel reader/i.test(h)),
  "must include a novel-readers segment",
);
ok(
  segmentHeads.some((h) => /game|franchise/i.test(h)),
  "must include a game/franchise segment",
);

// Each segment needs venue + tactic (table rows or explicit labels)
for (const letter of ["A", "B", "C"]) {
  const blockMatch = text.match(
    new RegExp(
      `###\\s+Segment\\s+${letter}[\\s\\S]*?(?=###\\s+Segment\\s+|##\\s+\\d|$)`,
    ),
  );
  ok(blockMatch, `Segment ${letter} block missing`);
  if (blockMatch) {
    const block = blockMatch[0];
    ok(
      /\*\*Where reachable\*\*/i.test(block) || /Where reachable/i.test(block),
      `Segment ${letter} needs a reachable venue`,
    );
    ok(
      /\*\*Tactic\*\*/i.test(block) || /Tactic/i.test(block),
      `Segment ${letter} needs a recommended tactic`,
    );
  }
}

// Positioning / messaging
ok(
  /full-spoiler/i.test(text) && /reading companion|novel/i.test(text),
  "must frame as full-spoiler novel reading companion",
);
ok(
  text.includes(HUB_CTA),
  `must include exact hub CTA ${HUB_CTA}`,
);
ok(
  /spoiler/i.test(text) && /finish(ed)? the book|finished-book/i.test(text),
  "must include spoiler / finished-book guidance",
);
ok(
  /not a (full |complete )?game/i.test(text) ||
    /novel[s]? only/i.test(text) ||
    /not.*game (lore )?wiki/i.test(text),
  "must state novel-vs-game scope (not a full game wiki)",
);

// Action plan + templates + constraints
ok(
  /Near-term/i.test(text) && /Later/i.test(text),
  "action plan needs near-term vs later priority",
);
const templateCount = [...text.matchAll(/###\s+Template\s+[A-Z]/g)].length;
ok(
  templateCount >= 2,
  `need ≥2 pitch/post templates, found ${templateCount}`,
);
ok(
  /unofficial|not affiliated|no.*endorsement|fake official/i.test(text),
  "must forbid inventing official endorsement",
);
ok(
  /piracy|unauthorized full|pirate/i.test(text),
  "must forbid piracy / unauthorized full-text links",
);
ok(
  /self-promo|90\/10|community/i.test(text),
  "must cover community self-promotion norms",
);
ok(
  /inferred.*not canonical|not canonical/i.test(text),
  "must require inferred-not-canonical framing for illustrations",
);

// Non-goals: strategy must not require product code or paid spam as done
ok(
  /does not run campaigns|strategy only|not.*paid ads|does not require paid/i.test(
    text,
  ),
  "must state strategy-only / no paid-spam dependency",
);
ok(
  /No product dependency|not blocked on new features|code changes|product non-goal/i.test(
    text,
  ) || /Marketing success is \*\*not\*\* blocked/i.test(text),
  "must not require wiki product changes as dependency of done",
);

// Named channels grounded in research
for (const channel of [
  "r/PeterFHamilton",
  "r/exodus",
  "Goodreads",
  "thisguise",
]) {
  ok(text.includes(channel), `strategy should name real channel: ${channel}`);
}

if (failures.length) {
  console.error("check-marketing-strategy: FAILED");
  for (const f of failures) console.error(" -", f);
  process.exit(1);
}

console.log("check-marketing-strategy: OK");
console.log(`  file: docs/marketing-strategy.md (${text.length} chars)`);
console.log(`  segments: ${segmentHeads.map((h) => h.trim()).join(" | ")}`);
console.log(`  templates: ${templateCount}`);
console.log(`  hub CTA present: ${HUB_CTA}`);
