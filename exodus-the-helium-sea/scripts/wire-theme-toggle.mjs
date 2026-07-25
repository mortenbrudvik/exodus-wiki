/**
 * Adds the theme toggle to every page: the no-flash stamp in <head>, the button
 * in the header, and assets/js/theme.js at the end of <body>.
 *
 *   node scripts/wire-theme-toggle.mjs
 *
 * Idempotent — each insertion is guarded, so re-running over a wired site is a
 * no-op. Run it after the generators, not before: the generated pages already
 * carry the same three fragments from their own shells, so this script skips
 * them and the two stay in agreement.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SKIP_DIRS = new Set([".git", "docs", "node_modules", "scripts", "assets", "templates"]);

// Root-relative-free so the same string works at any nesting depth.
export const HEAD_STAMP =
  `  <script>(function(){try{var t=localStorage.getItem("wiki-theme");` +
  `if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})();</script>`;

export const TOGGLE_BUTTON =
  `    <button type="button" class="theme-toggle" data-theme-toggle hidden>Theme</button>`;

export const themeScriptTag = (root) => `  <script src="${root}assets/js/theme.js"></script>`;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), out);
    } else if (entry.name.endsWith(".html")) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

/** Returns the wired source, or null when nothing needed doing. */
export function wire(src) {
  let out = src;

  // 1. The stamp goes after the favicon link, the last thing in every <head>
  //    before </head>. It must run before first paint, so it cannot be deferred.
  if (!out.includes('localStorage.getItem("wiki-theme")')) {
    out = out.replace(/^([ \t]*<link[^>]+rel="icon"[^>]*>)$/m, `$1\n${HEAD_STAMP}`);
  }

  // 2. The button sits after the search form, so the mobile layout — where the
  //    form drops to its own row — keeps it beside the title.
  if (!out.includes("data-theme-toggle")) {
    out = out.replace(/^([ \t]*<\/form>)$/m, `$1\n${TOGGLE_BUTTON}`);
  }

  // 3. theme.js loads last; it only enhances a button that is already there.
  if (!/assets\/js\/theme\.js/.test(out)) {
    out = out.replace(
      /^([ \t]*<script src="([^"]*)assets\/js\/lightbox\.js"><\/script>)$/m,
      (_m, line, root) => `${line}\n${themeScriptTag(root)}`
    );
  }

  return out === src ? null : out;
}

// pathToFileURL, not a hand-built file:// string: on Windows an absolute path
// becomes file:///C:/… with three slashes, and the naive form never matches.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const pages = walk(ROOT).sort();
  let changed = 0;
  const missed = [];

  for (const p of pages) {
    const src = fs.readFileSync(p, "utf8");
    const next = wire(src);
    if (next) {
      fs.writeFileSync(p, next);
      changed += 1;
    }
    const check = next || src;
    const rel = path.relative(ROOT, p).replace(/\\/g, "/");
    if (
      !check.includes('localStorage.getItem("wiki-theme")') ||
      !check.includes("data-theme-toggle") ||
      !/assets\/js\/theme\.js/.test(check)
    ) {
      missed.push(rel);
    }
  }

  console.log(`wire-theme-toggle: ${changed} page(s) updated, ${pages.length - changed} already wired`);
  if (missed.length) {
    console.error(`FAILED to wire ${missed.length} page(s):`);
    for (const m of missed) console.error(`  ${m}`);
    process.exit(1);
  }
}
