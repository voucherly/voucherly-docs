// Checks the built site (run after `yarn build`): on every page of build/en and
// build/it the locale dropdown link to the other locale must equal that
// locale's hreflang alternate, the target must exist in the build, and the
// target's hreflang must point back (reciprocal). Exits 1 on any error.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const buildDir = 'build';
const locales = ['en', 'it'];
// The 404 page is not indexed and its hreflang is not a real page.
const skip = new Set(['404.html']);

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : [],
  );

const fileFor = (pathname) =>
  join(buildDir, pathname.endsWith('/') ? `${pathname}index.html` : pathname);

const pathOf = (file) => '/' + file.slice(buildDir.length + 1).replace(/index\.html$/, '');

const read = (file) => {
  const html = readFileSync(file, 'utf8');
  const hreflang = {};
  for (const [tag] of html.matchAll(/<link[^>]*rel="alternate"[^>]*>/g)) {
    const lang = tag.match(/hreflang="([^"]+)"/)?.[1];
    const href = tag.match(/href="([^"]+)"/)?.[1];
    if (lang && href) hreflang[lang] = new URL(href).pathname;
  }
  const dropdown = {};
  for (const [tag] of html.matchAll(/<a[^>]*class="dropdown__link[^"]*"[^>]*>/g)) {
    const lang = tag.match(/lang="([^"]+)"/)?.[1];
    const href = tag.match(/href="([^"]+)"/)?.[1];
    if (lang && href) dropdown[lang] = href;
  }
  return { hreflang, dropdown };
};

const errors = [];
let checked = 0;
for (const locale of locales) {
  const other = locales.find((l) => l !== locale);
  for (const file of walk(join(buildDir, locale))) {
    if (skip.has(file.slice(join(buildDir, locale).length + 1))) continue;
    checked++;
    const page = pathOf(file);
    const { hreflang, dropdown } = read(file);
    const link = dropdown[other];
    const alt = hreflang[other];
    if (!link) { errors.push(`${page}: no dropdown link to ${other}`); continue; }
    if (!alt) { errors.push(`${page}: no hreflang ${other}`); continue; }
    if (link !== alt) errors.push(`${page}: dropdown ${other} ${link} != hreflang ${alt}`);
    if (!existsSync(fileFor(alt))) { errors.push(`${page}: hreflang ${other} ${alt} not in build`); continue; }
    const back = read(fileFor(alt)).hreflang[locale];
    if (back !== page) errors.push(`${page}: ${alt} hreflang ${locale} is ${back}, not reciprocal`);
  }
}

console.log(`check-locale-links: ${checked} pages checked, ${errors.length} errors`);
for (const e of errors) console.log(`  ${e}`);
process.exit(errors.length ? 1 : 0);
