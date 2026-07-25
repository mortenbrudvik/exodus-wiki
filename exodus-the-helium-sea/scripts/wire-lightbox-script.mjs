/**
 * Ensure every HTML page that loads search.js also loads lightbox.js
 * at the same relative depth. Idempotent.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

let changed = 0;
let skipped = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, "utf8");
  if (!/assets\/js\/search\.js/.test(html)) {
    skipped++;
    continue;
  }
  if (/assets\/js\/lightbox\.js/.test(html)) {
    skipped++;
    continue;
  }
  const next = html.replace(
    /(<script src="([^"]*)assets\/js\/search\.js"><\/script>)/,
    (m, full, prefix) => `${full}\n  <script src="${prefix}assets/js/lightbox.js"></script>`
  );
  if (next === html) {
    console.error("no replace match:", path.relative(root, file));
    process.exitCode = 1;
    continue;
  }
  fs.writeFileSync(file, next, "utf8");
  changed++;
  console.log("wired", path.relative(root, file));
}
console.log(`wire-lightbox-script: ${changed} updated, ${skipped} skipped`);
