import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "pages", "factions");
const re = /(<li><a href="index\.html">Factions<\/a><\/li>)/;
const rep = `$1\n          <li><a href="dominions-roster.html">Dominions</a></li>`;

let n = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".html"))) {
  const p = path.join(dir, f);
  let h = fs.readFileSync(p, "utf8");
  if (h.includes('dominions-roster.html">Dominions</a>')) continue;
  if (re.test(h)) {
    fs.writeFileSync(p, h.replace(re, rep));
    n++;
    console.log("updated", f);
  }
}
console.log("done", n);
