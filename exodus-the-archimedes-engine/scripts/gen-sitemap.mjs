/**
 * Writes the site-root sitemap.xml and robots.txt.
 *
 * Both must live at the site root to be valid, so this script writes two directories up
 * from itself — it is the one piece of tooling here that is site-wide rather than
 * book-scoped. Re-run it whenever a page is added, renamed or removed.
 *
 * lastmod is deliberately omitted. The honest value is the file's last content change,
 * which would churn the sitemap on every commit; a faked or generation-time value is
 * worse than none, and Google ignores changefreq/priority.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadIndex, pageUrl, SITE, BOOK, NOINDEX_PAGES } from "./lib/seo.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.join(__dirname, "..", "..");

const urls = [
  // The hub, which is not in the book's search index.
  `${SITE}/`,
  ...loadIndex()
    .filter((e) => !NOINDEX_PAGES.has(e.path))
    .map((e) => pageUrl(e.path)),
];

const seen = new Set();
for (const u of urls) {
  if (seen.has(u)) throw new Error(`duplicate sitemap url: ${u}`);
  seen.add(u);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`;

const robots = `# ${SITE}/
User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

fs.writeFileSync(path.join(siteRoot, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(siteRoot, "robots.txt"), robots, "utf8");

const excluded = loadIndex().filter((e) => NOINDEX_PAGES.has(e.path)).length;
console.log(
  `gen-sitemap: ${urls.length} urls (1 hub + ${urls.length - 1} from ${BOOK}); ` +
    `${excluded} noindex page(s) excluded`
);
