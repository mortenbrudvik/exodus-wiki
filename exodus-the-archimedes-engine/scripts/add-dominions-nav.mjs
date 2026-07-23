import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".git" || e.name === "docs") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (e.name.endsWith(".html")) files.push(p);
  }
  return files;
}

const patterns = [
  [
    /(<li><a href="pages\/factions\/index\.html">Factions<\/a><\/li>)/,
    `$1\n          <li><a href="pages/factions/dominions-roster.html">Dominions</a></li>`,
  ],
  [
    /(<li><a href="factions\/index\.html">Factions<\/a><\/li>)/,
    `$1\n          <li><a href="factions/dominions-roster.html">Dominions</a></li>`,
  ],
  [
    /(<li><a href="\.\.\/factions\/index\.html">Factions<\/a><\/li>)/,
    `$1\n          <li><a href="../factions/dominions-roster.html">Dominions</a></li>`,
  ],
  [
    /(<li><a href="\{\{ROOT\}\}pages\/factions\/index\.html">Factions<\/a><\/li>)/,
    `$1\n          <li><a href="{{ROOT}}pages/factions/dominions-roster.html">Dominions</a></li>`,
  ],
];

const files = walk(root);
let updated = 0;
for (const f of files) {
  let html = fs.readFileSync(f, "utf8");
  if (html.includes('dominions-roster.html">Dominions</a>')) continue;
  let changed = false;
  for (const [re, rep] of patterns) {
    if (re.test(html)) {
      html = html.replace(re, rep);
      changed = true;
      break;
    }
  }
  if (changed) {
    fs.writeFileSync(f, html);
    updated++;
    console.log("updated", path.relative(root, f));
  } else if (html.includes("Factions</a>") && html.includes("site-sidebar")) {
    console.log("NO MATCH", path.relative(root, f));
  }
}
console.log("updated count:", updated);
