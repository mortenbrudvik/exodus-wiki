import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "pages", "factions");
const needle = `<li><a href="index.html">Factions</a></li>`;
const insert = `${needle}\n          <li><a href="dominions-roster.html">Dominions</a></li>`;

let n = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".html"))) {
  const p = path.join(dir, f);
  let h = fs.readFileSync(p, "utf8");
  // Already has Dominions in the sidebar nav (after Factions)
  if (h.includes(`${needle}\n          <li><a href="dominions-roster.html">Dominions</a></li>`)) {
    continue;
  }
  if (!h.includes(needle)) continue;
  h = h.replace(needle, insert);
  fs.writeFileSync(p, h);
  n++;
  console.log("fixed", f);
}
console.log("done", n);
